export function safeRedirectPath(value, fallback = '/') {
    if (
        typeof value !== 'string' ||
        !value.startsWith('/') ||
        value.startsWith('//') ||
        value.startsWith('/api/')
    ) {
        return fallback
    }

    return value
}
