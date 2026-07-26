import assert from 'node:assert/strict'
import test from 'node:test'
import { installSessionLifecycle } from '../src/services/session-lifecycle.js'

function createTarget(initial = {}) {
    const listeners = new Map()

    return {
        ...initial,
        addEventListener(name, listener) {
            listeners.set(name, listener)
        },
        removeEventListener(name) {
            listeners.delete(name)
        },
        dispatch(name, event = {}) {
            return listeners.get(name)?.(event)
        },
    }
}

test('revalidates once after a relevant background period', async () => {
    const windowTarget = createTarget()
    const documentTarget = createTarget({ hidden: false })
    let calls = 0
    let now = 1000
    const originalNow = Date.now
    Date.now = () => now

    const uninstall = installSessionLifecycle({
        backgroundThresholdMs: 100,
        documentTarget,
        windowTarget,
        isAuthenticated: () => true,
        revalidate: async () => {
            calls += 1
        },
    })

    documentTarget.hidden = true
    documentTarget.dispatch('visibilitychange')
    now += 200
    documentTarget.hidden = false
    await documentTarget.dispatch('visibilitychange')
    await windowTarget.dispatch('focus')

    assert.equal(calls, 1)

    uninstall()
    Date.now = originalNow
})
