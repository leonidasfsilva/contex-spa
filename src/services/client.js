import { AxiosHttpClient } from './axios-http-client.js'
import { FetchHttpClient } from './fetch-http-client.js'

const HttpClient = AxiosHttpClient
let csrfToken = null
let beforeWrite = null

function notifyAuthFailure(status, context = {}) {
    window.dispatchEvent(
        new CustomEvent('contex:http-auth-failure', {
            detail: { status, ...context },
        }),
    )
}

export const http = new HttpClient({
    getCsrfToken: () => csrfToken,
    onAuthFailure: notifyAuthFailure,
    beforeWrite: (request) => beforeWrite?.(request),
})

export function setHttpCsrfToken(token) {
    csrfToken = token || null
}

export function setHttpBeforeWrite(handler) {
    beforeWrite = typeof handler === 'function' ? handler : null
}

export { AxiosHttpClient, FetchHttpClient }
