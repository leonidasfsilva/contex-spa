import { createSearchParams } from './query-params.js'
import { saveSessionDraft } from './session-drafts.js'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured.')
}

export class HttpError extends Error {
    constructor(message, { status, data, response }) {
        super(message)
        this.name = 'HttpError'
        this.status = status
        this.data = data
        this.response = response
    }
}

function buildUrl(path, query) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    const url = new URL(`${apiBaseUrl}${normalizedPath}`)

    url.search = createSearchParams(query).toString()

    return url
}

async function parseResponse(response) {
    if (response.status === 204) {
        return null
    }

    const contentType = response.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
        return response.json()
    }

    const text = await response.text()
    return text || null
}

function errorMessage(response, data) {
    if (data && typeof data === 'object') {
        return data.message || data.error || response.statusText
    }

    return typeof data === 'string' && data ? data : response.statusText
}

async function request(method, path, options = {}, config = {}) {
    const { query, body, headers, sessionDraft, ...fetchOptions } = options
    const normalizedMethod = method.toUpperCase()

    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(normalizedMethod)) {
        await config.beforeWrite?.({ method: normalizedMethod, path })
    }

    const csrfToken = config.getCsrfToken?.()
    const requestHeaders = new Headers({
        Accept: 'application/json',
        ...headers,
    })

    if (csrfToken) {
        requestHeaders.set('X-CSRF-TOKEN', csrfToken)
    }

    const hasJsonBody = body !== undefined && !(body instanceof FormData)

    if (hasJsonBody && !requestHeaders.has('Content-Type')) {
        requestHeaders.set('Content-Type', 'application/json')
    }

    const response = await fetch(buildUrl(path, query), {
        ...fetchOptions,
        method: normalizedMethod,
        headers: requestHeaders,
        credentials: 'include',
        body: body === undefined ? undefined : hasJsonBody ? JSON.stringify(body) : body,
    })
    const data = await parseResponse(response)

    if (!response.ok) {
        if (response.status === 401 && sessionDraft) {
            saveSessionDraft({
                ...sessionDraft,
                data: sessionDraft.data ?? body,
            })
        }

        if ([401, 403, 419].includes(response.status)) {
            config.onAuthFailure?.(response.status, {
                code: data?.code,
                draftKey: sessionDraft?.key,
            })
        }

        throw new HttpError(errorMessage(response, data), {
            status: response.status,
            data,
            response,
        })
    }

    return data
}

export function createFetchHttpClient(config = {}) {
    return {
        get(path, options) {
            return request('GET', path, options, config)
        },
        post(path, body, options = {}) {
            return request('POST', path, { ...options, body }, config)
        },
        put(path, body, options = {}) {
            return request('PUT', path, { ...options, body }, config)
        },
        patch(path, body, options = {}) {
            return request('PATCH', path, { ...options, body }, config)
        },
        delete(path, options) {
            return request('DELETE', path, options, config)
        },
    }
}

export const http = createFetchHttpClient()
