function hasValue(value) {
    return value !== undefined && value !== null && value !== ''
}

export function createSearchParams(query = {}) {
    const searchParams = new URLSearchParams()

    Object.entries(query).forEach(([key, value]) => {
        const values = Array.isArray(value) ? value : [value]

        values.filter(hasValue).forEach((item) => {
            searchParams.append(key, item)
        })
    })

    return searchParams
}
