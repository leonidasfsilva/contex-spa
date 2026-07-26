import assert from 'node:assert/strict'
import test from 'node:test'
import { isApiUnavailable } from '../src/services/api-availability.js'

test('marks the API unavailable only for the explicit router flag', () => {
    assert.equal(isApiUnavailable({ query: { unavailable: '1' } }), true)
    assert.equal(isApiUnavailable({ query: { unavailable: '0' } }), false)
    assert.equal(isApiUnavailable({ query: {} }), false)
})
