<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const firstName = computed(
    () => (auth.user?.nome || auth.user?.name)?.split(' ')[0] || 'usuário',
)

async function handleLogout() {
    await auth.logout()
    await router.replace({ name: 'login' })
}

onMounted(() => window.addEventListener('contex:logout', handleLogout))
onBeforeUnmount(() => window.removeEventListener('contex:logout', handleLogout))
</script>

<template>
    <div class="flex min-h-screen bg-background">
        <contex-sidebar active="index.html"></contex-sidebar>

        <div class="apex-content flex min-h-screen flex-1 flex-col">
            <apex-header></apex-header>

            <main id="main-content" class="flex-1 p-4 sm:p-6">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Bem-vindo de volta, {{ firstName }}.
                    </p>
                </div>

                <apex-stats-cards></apex-stats-cards>

                <div class="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-12">
                    <apex-revenue-chart></apex-revenue-chart>
                    <apex-side-panel></apex-side-panel>
                </div>

                <div class="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-12">
                    <apex-orders-table></apex-orders-table>
                    <apex-activity-feed></apex-activity-feed>
                </div>
            </main>
        </div>
    </div>
</template>
