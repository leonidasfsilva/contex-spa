const STORAGE_PREFIX = 'contex:session-draft:'
const DEFAULT_TTL_MS = 30 * 60 * 1000
const BLOCKED_FIELD_PATTERN = /password|senha|secret|token|authorization|cookie|file|arquivo/i

function storageKey(key) {
    return `${STORAGE_PREFIX}${key}`
}

function isSerializableValue(value) {
    if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
        return true
    }

    if (Array.isArray(value)) {
        return value.every(isSerializableValue)
    }

    if (Object.getPrototypeOf(value) !== Object.prototype) {
        return false
    }

    return Object.values(value).every(isSerializableValue)
}

function selectEligibleFields(data, fields) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new TypeError('Draft data must be a plain object.')
    }

    if (!Array.isArray(fields) || fields.length === 0) {
        throw new TypeError('Draft fields must be explicitly allowed.')
    }

    return Object.fromEntries(
        fields.map((field) => {
            if (BLOCKED_FIELD_PATTERN.test(field)) {
                throw new TypeError(`Draft field "${field}" is not eligible for storage.`)
            }

            const value = data[field]

            if (!isSerializableValue(value)) {
                throw new TypeError(`Draft field "${field}" is not serializable.`)
            }

            return [field, value]
        }),
    )
}

export function saveSessionDraft({
    key,
    route,
    data,
    fields,
    ttlMs = DEFAULT_TTL_MS,
}) {
    const draft = {
        route,
        data: selectEligibleFields(data, fields),
        requiresConfirmation: true,
        expiresAt: Date.now() + ttlMs,
    }

    sessionStorage.setItem(storageKey(key), JSON.stringify(draft))

    return draft
}

export function readSessionDraft(key) {
    const serialized = sessionStorage.getItem(storageKey(key))

    if (!serialized) {
        return null
    }

    try {
        const draft = JSON.parse(serialized)

        if (!draft.expiresAt || draft.expiresAt <= Date.now()) {
            removeSessionDraft(key)
            return null
        }

        return draft
    } catch {
        removeSessionDraft(key)
        return null
    }
}

export function consumeSessionDraft(key) {
    const draft = readSessionDraft(key)

    if (draft) {
        removeSessionDraft(key)
    }

    return draft
}

export function findSessionDraftForRoute(route) {
    for (let index = 0; index < sessionStorage.length; index += 1) {
        const key = sessionStorage.key(index)

        if (!key?.startsWith(STORAGE_PREFIX)) {
            continue
        }

        const draftKey = key.slice(STORAGE_PREFIX.length)
        const draft = readSessionDraft(draftKey)

        if (draft?.route === route) {
            return { key: draftKey, draft }
        }
    }

    return null
}

export function removeSessionDraft(key) {
    sessionStorage.removeItem(storageKey(key))
}
