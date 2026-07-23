import assert from 'node:assert/strict'
import test from 'node:test'

import { createSearchParams } from '../src/services/query-params.js'

test('serializes scalar values', () => {
    const params = createSearchParams({ page: 2, search: 'mercado', active: false })

    assert.equal(params.toString(), 'page=2&search=mercado&active=false')
})

test('serializes arrays as repeated query parameters', () => {
    const params = createSearchParams({ status: ['pending', 'paid'] })

    assert.equal(params.toString(), 'status=pending&status=paid')
})

test('ignores empty, null and undefined values consistently', () => {
    const params = createSearchParams({
        search: '',
        account: null,
        page: undefined,
        status: ['pending', '', null, undefined, 'paid'],
    })

    assert.equal(params.toString(), 'status=pending&status=paid')
})
