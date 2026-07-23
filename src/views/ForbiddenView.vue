<script setup>
import { ShieldX } from '@lucide/vue'
</script>

<template>
    <main class="state-page">
        <section class="state-panel">
            <ShieldX :size="38" aria-hidden="true" />
            <p class="state-code">403</p>
            <h1>Acesso não autorizado</h1>
            <p>Seu usuário não possui permissão para acessar este recurso.</p>
            <RouterLink class="state-link" to="/">Voltar ao dashboard</RouterLink>
        </section>
    </main>
</template>

<style scoped>
.state-page {
    display: grid;
    min-height: 100vh;
    place-items: center;
    padding: 1.5rem;
    background: var(--background);
    color: var(--foreground);
}

.state-panel {
    width: min(100%, 28rem);
    padding: 2rem;
    text-align: center;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    background: var(--card);
}

.state-panel svg {
    margin: 0 auto 1rem;
    color: var(--destructive);
}

.state-code {
    color: var(--muted-foreground);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.15em;
}

.state-panel h1 {
    margin-top: 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.state-panel p {
    margin-top: 0.75rem;
    color: var(--muted-foreground);
}

.state-link {
    display: inline-flex;
    margin-top: 1.5rem;
    padding: 0.65rem 1rem;
    border-radius: 0.4rem;
    background: var(--primary);
    color: var(--primary-foreground);
    font-weight: 600;
}
</style>
