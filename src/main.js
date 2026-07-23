import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { useAuthStore } from './stores/auth.js'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

window.addEventListener('contex:http-auth-failure', ({ detail }) => {
    const auth = useAuthStore(pinia)

    if (detail.status === 401) {
        const redirect = router.currentRoute.value.fullPath

        auth.clearSession()

        if (router.currentRoute.value.name !== 'login') {
            router.push({
                name: 'login',
                query: { redirect },
            })
        }
    }

    if (detail.status === 403 && auth.authenticated) {
        router.push({ name: 'forbidden' })
    }
})

app.mount('#app')
