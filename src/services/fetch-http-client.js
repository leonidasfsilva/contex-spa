import { http as fetchHttp } from './http.js'

export class FetchHttpClient {
    get(...args) {
        return fetchHttp.get(...args)
    }

    post(...args) {
        return fetchHttp.post(...args)
    }

    put(...args) {
        return fetchHttp.put(...args)
    }

    patch(...args) {
        return fetchHttp.patch(...args)
    }

    delete(...args) {
        return fetchHttp.delete(...args)
    }
}
