import assert from 'node:assert/strict'
import test from 'node:test'
import {
    AUTH_ENDPOINTS,
    createAuthService,
} from '../src/services/auth/auth-contract.js'

function createClient(response = {}) {
    const calls = []

    return {
        calls,
        async get(path) {
            calls.push({ method: 'get', path })
            return response
        },
        async post(path, body) {
            calls.push({ method: 'post', path, body })
            return response
        },
    }
}

test('login posts credentials and normalizes the session payload', async () => {
    const response = {
        authenticated: true,
        user: { id: 7, nome: 'Leonidas Ferreira' },
        permissions: ['vLancamentos'],
        csrfToken: 'csrf-token',
    }
    const client = createClient(response)
    const service = createAuthService(client)
    const credentials = { email: 'dev@example.com', password: 'secret' }

    const session = await service.login(credentials)

    assert.deepEqual(client.calls, [
        { method: 'post', path: AUTH_ENDPOINTS.login, body: credentials },
    ])
    assert.deepEqual(session, response)
})

test('restoreSession reads the current backend session', async () => {
    const client = createClient({
        data: {
            user: { id: 7, nome: 'Leonidas Ferreira' },
        },
    })
    const service = createAuthService(client)

    const session = await service.restoreSession()

    assert.deepEqual(client.calls, [
        { method: 'get', path: AUTH_ENDPOINTS.session },
    ])
    assert.equal(session.authenticated, true)
    assert.deepEqual(session.permissions, [])
    assert.equal(session.csrfToken, null)
})

test('logout posts to the versioned authentication route', async () => {
    const client = createClient()
    const service = createAuthService(client)

    await service.logout()

    assert.deepEqual(client.calls, [
        { method: 'post', path: AUTH_ENDPOINTS.logout, body: undefined },
    ])
})

test('authentication responses require a user object', async () => {
    const service = createAuthService(createClient({ authenticated: true }))

    await assert.rejects(
        () => service.restoreSession(),
        /must include the user/,
    )
})

test('the authentication service requires an HTTP client', () => {
    assert.throws(
        () => createAuthService(),
        /requires an HTTP client/,
    )
})
