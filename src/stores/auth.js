import { defineStore } from 'pinia'
import { authService } from '../services/auth-service.js'
import { setHttpCsrfToken } from '../services/client.js'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        permissions: [],
        csrfToken: null,
        authenticated: false,
        restoreAttempted: false,
        loading: false,
    }),

    actions: {
        applySession(session) {
            this.user = session.user
            this.permissions = session.permissions
            this.csrfToken = session.csrfToken
            this.authenticated = session.authenticated
            setHttpCsrfToken(session.csrfToken)
            window.contexAuthUser = session.user
        },

        clearSession() {
            this.user = null
            this.permissions = []
            this.csrfToken = null
            this.authenticated = false
            setHttpCsrfToken(null)
            window.contexAuthUser = null
        },

        async login(credentials) {
            this.loading = true

            try {
                const session = await authService.login(credentials)
                this.applySession(session)
                this.restoreAttempted = true
            } finally {
                this.loading = false
            }
        },

        async restoreSession() {
            if (this.restoreAttempted) {
                return
            }

            this.loading = true

            try {
                const session = await authService.restoreSession()
                this.applySession(session)
            } catch (error) {
                if (error?.status === 401) {
                    this.clearSession()
                    return
                }

                throw error
            } finally {
                this.restoreAttempted = true
                this.loading = false
            }
        },

        async logout() {
            this.loading = true

            try {
                await authService.logout()
            } finally {
                this.clearSession()
                this.restoreAttempted = true
                this.loading = false
            }
        },
    },
})
