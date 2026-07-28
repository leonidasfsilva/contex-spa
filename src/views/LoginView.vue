<script setup>
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, Zap } from '@lucide/vue'
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { safeRedirectPath } from '../router/safe-redirect.js'
import { readSessionDraft } from '../services/session-drafts.js'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const showPassword = ref(false)
const errorMessage = ref('')
const form = reactive({
    email: '',
    password: '',
})

const unavailable = computed(() => auth.apiUnavailable)
const sessionExpired = computed(() => route.query.sessionExpired === '1')

async function submit() {
    if (unavailable.value) {
        return
    }

    errorMessage.value = ''

    try {
        await auth.login(form)
        const destination = safeRedirectPath(route.query.redirect)
        await router.replace(destination)

        if (typeof route.query.draft === 'string') {
            const draft = readSessionDraft(route.query.draft)

            if (draft?.route === destination) {
                window.dispatchEvent(
                    new CustomEvent('contex:session-draft-restored', {
                        detail: { key: route.query.draft, draft },
                    }),
                )
            }
        }
    } catch (error) {
        if (auth.apiUnavailable) {
            errorMessage.value = ''
            return
        }

        if (error?.status === 401) {
            errorMessage.value = 'E-mail ou senha inválidos.'
            return
        }

        if (error?.status === 403 || error?.status === 419) {
            errorMessage.value =
                'A validação de segurança expirou. Atualize a página e tente novamente.'
            return
        }

        errorMessage.value =
            error?.message || 'Não foi possível conectar ao Contex neste momento.'
    }
}
</script>

<template>
    <main class="login-page">
        <aside class="login-brand" aria-label="Contex SPA">
            <div class="brand-mark"><Zap :size="25" aria-hidden="true" /></div>
            <div>
                <p class="brand-name">Contex</p>
                <p class="brand-product">Single Page Application</p>
            </div>
            <div class="brand-copy">
                <p class="brand-eyebrow">Gestão financeira</p>
                <h1>Seus dados, sua rotina, uma interface mais fluida.</h1>
                <p>
                    Acesse o mesmo Contex com uma experiência preparada para desktop,
                    tablet e smartphone.
                </p>
            </div>
        </aside>

        <section class="login-content">
            <form class="login-form" @submit.prevent="submit">
                <div class="mobile-brand">
                    <div class="brand-mark"><Zap :size="21" aria-hidden="true" /></div>
                    <span>Contex SPA</span>
                </div>

                <div class="form-heading">
                    <p class="form-eyebrow">Bem-vindo de volta</p>
                    <h2>Acesse sua conta</h2>
                    <p>Use as mesmas credenciais do Contex.</p>
                </div>

                <p v-if="unavailable && !errorMessage" class="form-alert" role="alert">
                    API indisponível no momento. Tente novamente mais tarde.
                </p>
                <p v-if="sessionExpired && !errorMessage" class="form-alert" role="alert">
                    Sua sessão expirou. Entre novamente para continuar.
                </p>
                <p v-if="errorMessage" class="form-alert" role="alert">
                    {{ errorMessage }}
                </p>

                <label class="field">
                    <span>E-mail</span>
                    <span class="field-control">
                        <Mail :size="18" aria-hidden="true" />
                        <input
                            v-model.trim="form.email"
                            name="email"
                            type="email"
                            autocomplete="username"
                            required
                            autofocus
                        />
                    </span>
                </label>

                <label class="field">
                    <span>Senha</span>
                    <span class="field-control">
                        <LockKeyhole :size="18" aria-hidden="true" />
                        <input
                            v-model="form.password"
                            name="password"
                            :type="showPassword ? 'text' : 'password'"
                            autocomplete="current-password"
                            required
                        />
                        <button
                            class="password-toggle"
                            type="button"
                            :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                            @click="showPassword = !showPassword"
                        >
                            <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
                            <Eye v-else :size="18" aria-hidden="true" />
                        </button>
                    </span>
                </label>

                <button
                    class="submit-button"
                    :class="{
                        'is-loading': auth.loading,
                        'is-unavailable': unavailable,
                    }"
                    type="submit"
                    :disabled="auth.loading || unavailable"
                >
                    <LoaderCircle
                        v-if="auth.loading"
                        class="spinner"
                        :size="18"
                        aria-hidden="true"
                    />
                    {{
                        auth.loading
                            ? 'Entrando...'
                            : unavailable
                              ? 'API indisponível'
                              : 'Entrar'
                    }}
                </button>
            </form>
        </section>
    </main>
</template>

<style scoped>
.login-page {
    display: grid;
    min-height: 100vh;
    grid-template-columns: minmax(22rem, 0.9fr) minmax(30rem, 1.1fr);
    background: var(--background);
    color: var(--foreground);
}

.login-brand {
    position: relative;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    gap: 0.75rem;
    overflow: hidden;
    padding: 2.5rem;
    background: #050807;
    color: #f8fafc;
}

.brand-mark {
    display: grid;
    width: 2.75rem;
    height: 2.75rem;
    place-items: center;
    border-radius: 0.5rem;
    background: #10b981;
    color: #02130d;
}

.brand-name {
    font-size: 1.1rem;
    font-weight: 700;
}

.brand-product {
    color: #718096;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.brand-copy {
    z-index: 1;
    max-width: 34rem;
    margin-top: auto;
    margin-bottom: 5vh;
}

.brand-eyebrow,
.form-eyebrow {
    color: #10b981;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.brand-copy h1 {
    margin-top: 0.75rem;
    font-size: clamp(2rem, 3.5vw, 3.75rem);
    font-weight: 750;
    line-height: 1.08;
}

.brand-copy > p:last-child {
    max-width: 30rem;
    margin-top: 1rem;
    color: #94a3b8;
    line-height: 1.7;
}

.login-content {
    display: grid;
    min-height: 100vh;
    place-items: center;
    padding: 2rem;
}

.login-form {
    width: min(100%, 27rem);
}

.mobile-brand {
    display: none;
}

.form-heading {
    margin-bottom: 2rem;
}

.form-heading h2 {
    margin-top: 0.4rem;
    font-size: 2rem;
    font-weight: 750;
}

.form-heading > p:last-child {
    margin-top: 0.45rem;
    color: var(--muted-foreground);
}

.form-alert {
    margin-bottom: 1.25rem;
    padding: 0.8rem 0.9rem;
    border: 1px solid color-mix(in srgb, var(--destructive) 35%, transparent);
    border-radius: 0.4rem;
    background: color-mix(in srgb, var(--destructive) 8%, transparent);
    color: var(--destructive);
    font-size: 0.85rem;
}

.field {
    display: block;
    margin-top: 1.1rem;
}

.field > span:first-child {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.82rem;
    font-weight: 600;
}

.field-control {
    display: grid;
    min-height: 2.8rem;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.65rem;
    padding: 0 0.8rem;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    background: var(--background);
    color: var(--muted-foreground);
}

.field-control:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent);
}

.field-control input {
    min-width: 0;
    height: 2.7rem;
    border: 0;
    outline: 0;
    background: transparent;
    color: var(--foreground);
}

.password-toggle {
    padding: 0.35rem;
    border-radius: 0.3rem;
    cursor: pointer;
}

.password-toggle:hover {
    color: var(--foreground);
}

.submit-button {
    display: flex;
    width: 100%;
    min-height: 2.8rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    border-radius: 0.4rem;
    background: var(--primary);
    color: var(--primary-foreground);
    font-weight: 700;
    cursor: pointer;
}

.submit-button:disabled {
    opacity: 0.65;
}

.submit-button.is-loading {
    cursor: wait;
}

.submit-button.is-unavailable {
    cursor: not-allowed;
}

.spinner {
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 800px) {
    .login-page {
        grid-template-columns: 1fr;
    }

    .login-brand {
        display: none;
    }

    .login-content {
        padding: 1.25rem;
    }

    .mobile-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 3rem;
        font-size: 0.95rem;
        font-weight: 700;
    }

    .mobile-brand .brand-mark {
        width: 2.4rem;
        height: 2.4rem;
    }
}
</style>
