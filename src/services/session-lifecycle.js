const DEFAULT_BACKGROUND_THRESHOLD_MS = 60 * 1000
const DEFAULT_REVALIDATION_INTERVAL_MS = 10 * 1000

export function installSessionLifecycle({
    revalidate,
    isAuthenticated,
    backgroundThresholdMs = DEFAULT_BACKGROUND_THRESHOLD_MS,
    revalidationIntervalMs = DEFAULT_REVALIDATION_INTERVAL_MS,
    windowTarget = window,
    documentTarget = document,
}) {
    let backgroundedAt = documentTarget.hidden ? Date.now() : null
    let resumePromise = null

    async function resumeIfNeeded() {
        if (!isAuthenticated() || backgroundedAt === null) {
            return
        }

        const backgroundDuration = Date.now() - backgroundedAt
        backgroundedAt = null

        if (backgroundDuration < backgroundThresholdMs) {
            return
        }

        resumePromise ??= Promise.resolve(revalidate()).finally(() => {
            resumePromise = null
        })

        return resumePromise
    }

    function onVisibilityChange() {
        if (documentTarget.hidden) {
            backgroundedAt = Date.now()
            return
        }

        return resumeIfNeeded()
    }

    function onPageShow(event) {
        if (event.persisted && backgroundedAt === null) {
            backgroundedAt = 0
        }

        return resumeIfNeeded()
    }

    documentTarget.addEventListener('visibilitychange', onVisibilityChange)
    windowTarget.addEventListener('focus', resumeIfNeeded)
    windowTarget.addEventListener('pageshow', onPageShow)

    const revalidationTimer = windowTarget.setInterval(() => {
        if (!documentTarget.hidden && isAuthenticated()) {
            Promise.resolve(revalidate()).catch(() => {})
        }
    }, revalidationIntervalMs)

    return () => {
        documentTarget.removeEventListener('visibilitychange', onVisibilityChange)
        windowTarget.removeEventListener('focus', resumeIfNeeded)
        windowTarget.removeEventListener('pageshow', onPageShow)
        windowTarget.clearInterval(revalidationTimer)
    }
}
