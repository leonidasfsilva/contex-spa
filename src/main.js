import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { safeRedirectPath } from './router/safe-redirect.js'
import { installSessionLifecycle } from './services/session-lifecycle.js'
import { installAuthHttpGuard, useAuthStore } from './stores/auth.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const auth = useAuthStore(pinia)
installAuthHttpGuard(auth)
installSessionLifecycle({
    isAuthenticated: () => auth.authenticated,
    shouldMonitor: () =>
        auth.authenticated ||
        auth.apiUnavailable ||
        router.currentRoute.value.name === 'login',
    shouldRevalidate: () => !auth.logoutInProgress && !auth.intentionalLogout,
    revalidate: async () => {
        try {
            await auth.restoreSession({ force: true })
        } catch (error) {
            if (!auth.apiUnavailable) {
                throw error
            }

            const currentRoute = router.currentRoute.value
            const redirect =
                currentRoute.name === 'login'
                    ? currentRoute.query.redirect
                    : currentRoute.fullPath
            const sessionExpired = currentRoute.query.sessionExpired

            auth.clearSession()

            if (currentRoute.name !== 'login') {
                await router.replace({
                    name: 'login',
                    query: {
                        ...(redirect ? { redirect } : {}),
                        ...(sessionExpired === '1'
                            ? { sessionExpired: '1' }
                            : {}),
                    },
                })
            }

            return
        }

        if (
            auth.authenticated &&
            router.currentRoute.value.name === 'login'
        ) {
            await router.replace(
                safeRedirectPath(router.currentRoute.value.query.redirect),
            )
            return
        }

        if (
            !auth.logoutInProgress &&
            !auth.intentionalLogout &&
            !auth.authenticated &&
            router.currentRoute.value.name !== 'login'
        ) {
            await router.push({
                name: 'login',
                query: {
                    redirect: router.currentRoute.value.fullPath,
                    sessionExpired: '1',
                },
            })
        }
    },
})

window.addEventListener('contex:http-auth-failure', ({ detail }) => {
    const auth = useAuthStore(pinia)

    if (detail.status === 401) {
        if (detail.path === '/auth/session') {
            return
        }

        if (auth.logoutInProgress || auth.intentionalLogout) {
            if (router.currentRoute.value.name === 'login') {
                router.replace({ name: 'login' })
            }

            return
        }

        const redirect = router.currentRoute.value.fullPath

        if (auth.authenticated || detail.code === 'API_SESSION_REVOKED') {
            auth.markSessionExpired()
        }

        auth.clearSession()

        if (router.currentRoute.value.name !== 'login') {
            router.push({
                name: 'login',
                query: {
                    redirect,
                    sessionExpired: '1',
                    ...(detail.draftKey ? { draft: detail.draftKey } : {}),
                },
            })
        }
    }

    if (
        detail.status === 403 &&
        detail.code !== 'CSRF_TOKEN_INVALID' &&
        auth.authenticated
    ) {
        router.push({ name: 'forbidden' })
    }
})

app.mount('#app')
