import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
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
    revalidate: async () => {
        await auth.restoreSession({ force: true })

        if (!auth.authenticated && router.currentRoute.value.name !== 'login') {
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
        const redirect = router.currentRoute.value.fullPath

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
