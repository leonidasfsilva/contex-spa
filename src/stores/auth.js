import { defineStore } from 'pinia'
import { authService } from '../services/auth-service.js'
import { isApiUnavailableError } from '../services/api-availability.js'
import { setHttpBeforeWrite, setHttpCsrfToken } from '../services/client.js'

const SESSION_FRESHNESS_MS = 60 * 1000
let revalidationPromise = null

export class SessionExpiredError extends Error {
    constructor() {
        super('Sua sessão expirou. Entre novamente para continuar.')
        this.name = 'SessionExpiredError'
        this.status = 401
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        permissions: [],
        csrfToken: null,
        authenticated: false,
        restoreAttempted: false,
        loading: false,
        revalidating: false,
        intentionalLogout: false,
        logoutInProgress: false,
        lastValidatedAt: null,
        apiUnavailable: false,
        sessionExpired: false,
    }),

    actions: {
        applySession(session) {
            this.user = session.user
            this.permissions = session.permissions
            this.csrfToken = session.csrfToken
            this.authenticated = session.authenticated
            this.apiUnavailable = false
            this.intentionalLogout = false
            this.logoutInProgress = false
            this.sessionExpired = false
            this.lastValidatedAt = Date.now()
            setHttpCsrfToken(session.csrfToken)
            window.contexAuthUser = session.user
        },

        clearSession() {
            this.user = null
            this.permissions = []
            this.csrfToken = null
            this.authenticated = false
            this.lastValidatedAt = null
            setHttpCsrfToken(null)
            window.contexAuthUser = null
        },

        markSessionExpired() {
            this.sessionExpired = true
        },

        async login(credentials) {
            this.loading = true

            try {
                const session = await authService.login(credentials)
                this.applySession(session)
                this.restoreAttempted = true
            } catch (error) {
                this.apiUnavailable = isApiUnavailableError(error)
                throw error
            } finally {
                this.loading = false
            }
        },

        async restoreSession({ force = false } = {}) {
            if (this.restoreAttempted && !force) {
                return
            }

            if (revalidationPromise) {
                return revalidationPromise
            }

            this.loading = !force
            this.revalidating = force

            revalidationPromise = (async () => {
                try {
                    const session = await authService.restoreSession()
                    this.applySession(session)
                    return session
                } catch (error) {
                    if (error?.status === 401) {
                        const sessionWasAuthenticated = this.authenticated

                        this.apiUnavailable = false
                        this.clearSession()

                        if (
                            !this.intentionalLogout &&
                            (sessionWasAuthenticated ||
                            error?.data?.code === 'SPA_SESSION_REVOKED'
                            )
                        ) {
                            this.markSessionExpired()
                        }

                        return null
                    }

                    this.apiUnavailable = isApiUnavailableError(error)

                    throw error
                } finally {
                    this.restoreAttempted = true
                    this.loading = false
                    this.revalidating = false
                    revalidationPromise = null
                }
            })()

            return revalidationPromise
        },

        async ensureSessionFresh() {
            const sessionIsFresh =
                this.authenticated &&
                this.lastValidatedAt &&
                Date.now() - this.lastValidatedAt < SESSION_FRESHNESS_MS

            if (sessionIsFresh) {
                return true
            }

            await this.restoreSession({ force: true })
            return this.authenticated
        },

        async logout() {
            this.loading = true
            this.logoutInProgress = true
            this.sessionExpired = false
            let completed = false

            try {
                await authService.logout()
                completed = true
            } finally {
                this.intentionalLogout = completed
                this.logoutInProgress = false
                this.clearSession()
                this.restoreAttempted = true
                this.loading = false
            }
        },
    },
})

export function installAuthHttpGuard(auth) {
    setHttpBeforeWrite(async ({ path }) => {
        if (path === '/auth/login') {
            return
        }

        await auth.ensureSessionFresh()

        if (!auth.authenticated) {
            window.dispatchEvent(
                new CustomEvent('contex:http-auth-failure', {
                    detail: { status: 401 },
                }),
            )
            throw new SessionExpiredError()
        }
    })
}
