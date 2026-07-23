export const AUTH_ENDPOINTS = Object.freeze({
    login: '/auth/login',
    session: '/auth/session',
    logout: '/auth/logout',
})

function requireSessionPayload(response) {
    const payload = response?.data ?? response

    if (!payload || typeof payload !== 'object') {
        throw new TypeError('The authentication response must be an object.')
    }

    if (!payload.user || typeof payload.user !== 'object') {
        throw new TypeError('The authentication response must include the user.')
    }

    return {
        authenticated: payload.authenticated !== false,
        user: payload.user,
        permissions: Array.isArray(payload.permissions) ? payload.permissions : [],
        csrfToken: payload.csrfToken ?? null,
    }
}

export function createAuthService(client) {
    if (!client) {
        throw new TypeError('The authentication service requires an HTTP client.')
    }

    return {
        async login(credentials) {
            return requireSessionPayload(
                await client.post(AUTH_ENDPOINTS.login, credentials),
            )
        },

        async restoreSession() {
            return requireSessionPayload(await client.get(AUTH_ENDPOINTS.session))
        },

        async logout() {
            await client.post(AUTH_ENDPOINTS.logout)
        },
    }
}
