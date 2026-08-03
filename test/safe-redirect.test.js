import assert from 'node:assert/strict'
import test from 'node:test'
import { safeRedirectPath } from '../src/router/safe-redirect.js'

test('accepts internal SPA paths', () => {
    assert.equal(safeRedirectPath('/orders/42?tab=items'), '/orders/42?tab=items')
})

test('rejects external and API destinations', () => {
    assert.equal(safeRedirectPath('https://example.com'), '/')
    assert.equal(safeRedirectPath('//example.com'), '/')
    assert.equal(safeRedirectPath('/api/frontend/v1/auth/session'), '/')
})
