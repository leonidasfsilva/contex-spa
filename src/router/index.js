import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import DashboardView from '../views/DashboardView.vue'
import ForbiddenView from '../views/ForbiddenView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { guestOnly: true },
        },
        {
            path: '/',
            name: 'dashboard',
            component: DashboardView,
            meta: { requiresAuth: true },
        },
        {
            path: '/forbidden',
            name: 'forbidden',
            component: ForbiddenView,
            meta: { requiresAuth: true },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
})

router.beforeEach(async (to) => {
    const auth = useAuthStore()
    let unavailable = false

    if (!auth.restoreAttempted) {
        try {
            await auth.restoreSession()
        } catch {
            unavailable = true
        }
    }

    if (to.meta.requiresAuth && !auth.authenticated) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath,
                ...(unavailable ? { unavailable: '1' } : {}),
            },
        }
    }

    if (to.meta.guestOnly && auth.authenticated) {
        return { name: 'dashboard' }
    }

    return true
})

export default router
