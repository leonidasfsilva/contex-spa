export function errorMessage(response, data) {
    if (data && typeof data === 'object') {
        return data.error?.message || data.message || response.statusText
    }

    return typeof data === 'string' && data ? data : response.statusText
}
