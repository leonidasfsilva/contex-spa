<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.js'

const auth = useAuthStore()
</script>

<template>
    <div v-if="auth.revalidating" class="session-check" role="status">
        Verificando sessão...
    </div>
    <RouterView />
</template>

<style scoped>
.session-check {
    position: fixed;
    z-index: 1000;
    top: 1rem;
    left: 50%;
    padding: 0.6rem 0.9rem;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--background);
    box-shadow: 0 0.5rem 1.5rem rgb(0 0 0 / 12%);
    color: var(--foreground);
    font-size: 0.8rem;
    transform: translateX(-50%);
}
</style>
