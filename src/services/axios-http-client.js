import axios from 'axios'
import { HttpError } from './http.js'
import { createSearchParams } from './query-params.js'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

if (!apiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not configured.')
}

export class AxiosHttpClient {
    constructor(config = {}) {
        const { getCsrfToken, onAuthFailure, ...axiosConfig } = config

        this.getCsrfToken = getCsrfToken
        this.onAuthFailure = onAuthFailure
        this.client = axios.create({
            baseURL: apiBaseUrl,
            withCredentials: true,
            headers: {
                Accept: 'application/json',
            },
            paramsSerializer: {
                serialize: (params) => createSearchParams(params).toString(),
            },
            ...axiosConfig,
        })
    }

    async request(method, path, options = {}) {
        const { query, body, ...config } = options
        const csrfToken = this.getCsrfToken?.()
        const headers = {
            ...config.headers,
            ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
        }

        try {
            const response = await this.client.request({
                ...config,
                headers,
                method,
                url: path,
                params: query,
                data: body,
            })

            return response.status === 204 ? null : response.data
        } catch (error) {
            if (!axios.isAxiosError(error) || !error.response) {
                throw error
            }

            const { data, status } = error.response

            if ([401, 403, 419].includes(status)) {
                this.onAuthFailure?.(status)
            }

            const message =
                data && typeof data === 'object'
                    ? data.message || data.error || error.message
                    : typeof data === 'string' && data
                      ? data
                      : error.message

            throw new HttpError(message, {
                status,
                data,
                response: error.response,
            })
        }
    }

    get(path, options = {}) {
        return this.request('GET', path, options)
    }

    post(path, body, options = {}) {
        return this.request('POST', path, { ...options, body })
    }

    put(path, body, options = {}) {
        return this.request('PUT', path, { ...options, body })
    }

    patch(path, body, options = {}) {
        return this.request('PATCH', path, { ...options, body })
    }

    delete(path, options = {}) {
        return this.request('DELETE', path, options)
    }
}
