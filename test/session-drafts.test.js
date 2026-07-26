import assert from 'node:assert/strict'
import test from 'node:test'

const storage = new Map()
globalThis.sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    removeItem: (key) => storage.delete(key),
    setItem: (key, value) => storage.set(key, value),
    key: (index) => [...storage.keys()][index] ?? null,
    get length() {
        return storage.size
    },
}

const {
    consumeSessionDraft,
    findSessionDraftForRoute,
    readSessionDraft,
    saveSessionDraft,
} = await import('../src/services/session-drafts.js')

test.beforeEach(() => storage.clear())

test('stores only explicitly eligible fields and requires confirmation', () => {
    saveSessionDraft({
        key: 'purchase-new',
        route: '/purchases/new',
        data: { description: 'Lunch', amount: 45, ignored: 'value' },
        fields: ['description', 'amount'],
    })

    const draft = readSessionDraft('purchase-new')

    assert.deepEqual(draft.data, { description: 'Lunch', amount: 45 })
    assert.equal(draft.requiresConfirmation, true)
})

test('rejects sensitive fields', () => {
    assert.throws(
        () =>
            saveSessionDraft({
                key: 'unsafe',
                route: '/',
                data: { password: 'secret' },
                fields: ['password'],
            }),
        /not eligible/,
    )
})

test('consuming a draft removes it', () => {
    saveSessionDraft({
        key: 'purchase-new',
        route: '/purchases/new',
        data: { description: 'Lunch' },
        fields: ['description'],
    })

    assert.ok(consumeSessionDraft('purchase-new'))
    assert.equal(readSessionDraft('purchase-new'), null)
})

test('finds an eligible draft by its route', () => {
    saveSessionDraft({
        key: 'purchase-new',
        route: '/purchases/new',
        data: { description: 'Lunch' },
        fields: ['description'],
    })

    assert.equal(findSessionDraftForRoute('/purchases/new').key, 'purchase-new')
})
