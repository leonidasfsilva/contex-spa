export function isApiUnavailable(route) {
    return route.query.unavailable === '1'
}
