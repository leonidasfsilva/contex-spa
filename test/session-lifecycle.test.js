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

async function backgroundAndResume(documentTarget, elapsed, setNow) {
  documentTarget.hidden = true
  documentTarget.dispatch('visibilitychange')
  setNow(elapsed)
  documentTarget.hidden = false
  await documentTarget.dispatch('visibilitychange')
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

  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  await windowTarget.dispatch('focus')

  assert.equal(calls, 1)

  uninstall()
  Date.now = originalNow
})

test('does not poll while the application remains visible', async () => {
  const windowTarget = createTarget()
  const documentTarget = createTarget({ hidden: false })
  let calls = 0

  installSessionLifecycle({
    documentTarget,
    windowTarget,
    isAuthenticated: () => true,
    revalidate: async () => {
      calls += 1
    },
  })

  await new Promise((resolve) => setTimeout(resolve, 20))
  assert.equal(calls, 0)
})

test('does not revalidate on resume while the lifecycle is suspended', async () => {
  const windowTarget = createTarget()
  const documentTarget = createTarget({ hidden: false })
  let suspended = true
  let calls = 0
  let now = 1000
  const originalNow = Date.now
  Date.now = () => now

  installSessionLifecycle({
    backgroundThresholdMs: 100,
    documentTarget,
    windowTarget,
    isAuthenticated: () => true,
    shouldRevalidate: () => !suspended,
    revalidate: async () => {
      calls += 1
    },
  })

  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 0)

  suspended = false
  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 1)

  Date.now = originalNow
})

test('revalidates on resume while the API is unavailable', async () => {
  const windowTarget = createTarget()
  const documentTarget = createTarget({ hidden: false })
  let apiUnavailable = true
  let calls = 0
  let now = 1000
  const originalNow = Date.now
  Date.now = () => now

  installSessionLifecycle({
    backgroundThresholdMs: 100,
    documentTarget,
    windowTarget,
    isAuthenticated: () => false,
    shouldMonitor: () => apiUnavailable,
    revalidate: async () => {
      calls += 1
    },
  })

  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 1)

  apiUnavailable = false
  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 1)

  Date.now = originalNow
})

test('can revalidate on resume from the login route before API availability is known', async () => {
  const windowTarget = createTarget()
  const documentTarget = createTarget({ hidden: false })
  let onLoginRoute = true
  let calls = 0
  let now = 1000
  const originalNow = Date.now
  Date.now = () => now

  installSessionLifecycle({
    backgroundThresholdMs: 100,
    documentTarget,
    windowTarget,
    isAuthenticated: () => false,
    shouldMonitor: () => onLoginRoute,
    revalidate: async () => {
      calls += 1
    },
  })

  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 1)

  onLoginRoute = false
  await backgroundAndResume(documentTarget, 200, (elapsed) => {
    now += elapsed
  })
  assert.equal(calls, 1)

  Date.now = originalNow
})
