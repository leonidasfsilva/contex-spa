import { HttpError, createFetchHttpClient } from './http.js'

export class FetchHttpClient {
    constructor(config = {}) {
        this.client = createFetchHttpClient(config)
    }

    get(...args) {
        return this.client.get(...args)
    }

    post(...args) {
        return this.client.post(...args)
    }

    put(...args) {
        return this.client.put(...args)
    }

    patch(...args) {
        return this.client.patch(...args)
    }

    delete(...args) {
        return this.client.delete(...args)
    }
}

export { HttpError }
