export function isApiUnavailableError(error) {
    return !error?.status || error.status >= 500
}
