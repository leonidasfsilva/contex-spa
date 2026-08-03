import assert from 'node:assert/strict'
import test from 'node:test'
import { isApiUnavailableError } from '../src/services/auth/api-availability.js'

test('marks network and server errors as API unavailable', () => {
    assert.equal(isApiUnavailableError(new TypeError('Network error')), true)
    assert.equal(isApiUnavailableError({ status: 503 }), true)
    assert.equal(isApiUnavailableError({ status: 500 }), true)
})

test('does not mark authentication and validation errors as unavailable', () => {
    assert.equal(isApiUnavailableError({ status: 401 }), false)
    assert.equal(isApiUnavailableError({ status: 403 }), false)
    assert.equal(isApiUnavailableError({ status: 422 }), false)
})
