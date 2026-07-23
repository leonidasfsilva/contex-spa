import { AxiosHttpClient } from './axios-http-client.js'
import { FetchHttpClient } from './fetch-http-client.js'

const HttpClient = AxiosHttpClient
let csrfToken = null

function notifyAuthFailure(status) {
    window.dispatchEvent(
        new CustomEvent('contex:http-auth-failure', {
            detail: { status },
        }),
    )
}

export const http = new HttpClient({
    getCsrfToken: () => csrfToken,
    onAuthFailure: notifyAuthFailure,
})

export function setHttpCsrfToken(token) {
    csrfToken = token || null
}

export { AxiosHttpClient, FetchHttpClient }
