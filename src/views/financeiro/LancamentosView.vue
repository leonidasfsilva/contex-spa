<script setup>
import {
    ArrowDownLeft,
    ArrowUpRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Copy,
    Eye,
    FileText,
    Home,
    LoaderCircle,
    MessageCircle,
    Repeat2,
    RefreshCw,
    Search,
    Save,
    SlidersHorizontal,
    WalletCards,
    X,
} from '@lucide/vue'
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'
import { lancamentosService } from '../../services/financeiro/lancamentos-client.js'
import { useAuthStore } from '../../stores/auth.js'

const auth = useAuthStore()
const router = useRouter()
const lancamentos = ref([])
const loading = ref(true)
const errorMessage = ref('')
const search = ref('')
const appliedSearch = ref('')
const sortDirection = ref('desc')
const selectedPeriod = ref({ month: null, year: null })
const periodPickerOpen = ref(false)
const filtersOpen = ref(false)
const financeMenuOpen = ref(false)
const financeCrumb = useTemplateRef('financeCrumb')
const pickerYear = ref(new Date().getFullYear())
const selectedLancamento = ref(null)
const mobileSummaryExpanded = ref(false)
const pagination = ref({ page: 1, perPage: 30, total: 0, totalPages: 0 })
let requestId = 0

const resultSummary = computed(() => {
    const { page, perPage, total } = pagination.value

    if (!total) return 'Nenhum lançamento'

    const start = (page - 1) * perPage + 1
    const end = Math.min(page * perPage, total)
    return `${start}–${end} de ${total} lançamentos`
})

const period = ref({ label: '', previous: {}, next: {} })
const summary = ref(null)
const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
]
const financeModules = [
    { label: 'Lançamentos', spaRoute: { name: 'lancamentos' } },
    { label: 'Faturas', href: '#' },
    { label: 'Cartões', href: '#' },
    { label: 'Despesas', href: '#' },
    { label: 'Investimentos', href: '#' },
    { label: 'Pendências', href: '#' },
]

const pickerYears = computed(() => {
    if (period.value.years?.length) return period.value.years

    const currentYear = new Date().getFullYear()
    return Array.from({ length: currentYear - 2019 + 4 }, (_, index) => 2019 + index)
})

function currency(amount) {
    const value = Number(amount)
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number.isFinite(value) ? value : 0)
}

function date(value) {
    if (!value) return 'Não informado'

    const [year, month, day] = value.split('-').map(Number)
    return new Intl.DateTimeFormat('pt-BR').format(new Date(year, month - 1, day))
}

function typeLabel(lancamento) {
    return lancamento.type === 1 ? 'Entrada' : 'Saída'
}

function apiErrorMessage(error) {
    if (error?.status === 403) {
        return 'Seu usuário não possui permissão para visualizar lançamentos.'
    }

    return (
        error?.data?.error?.message ||
        error?.message ||
        'Não foi possível carregar os lançamentos.'
    )
}

async function loadLancamentos(page = pagination.value.page) {
    const currentRequest = ++requestId
    loading.value = true
    errorMessage.value = ''

    try {
        const collection = await lancamentosService.list({
            page,
            perPage: pagination.value.perPage,
            search: appliedSearch.value || undefined,
            sortDirection: sortDirection.value,
            periodo: selectedPeriod.value.month ? 'mensal' : undefined,
            mesReferencia: selectedPeriod.value.month || undefined,
            anoReferencia: selectedPeriod.value.year || undefined,
        })

        if (currentRequest !== requestId) return

        lancamentos.value = collection.results
        pagination.value = collection.pagination
        period.value = collection.period
        summary.value = collection.summary
        selectedPeriod.value = {
            month: collection.period?.month ?? null,
            year: collection.period?.year ?? null,
        }
    } catch (error) {
        if (currentRequest !== requestId) return

        lancamentos.value = []
        errorMessage.value = apiErrorMessage(error)
    } finally {
        if (currentRequest === requestId) loading.value = false
    }
}

function submitSearch() {
    appliedSearch.value = search.value.trim()
    filtersOpen.value = false
    loadLancamentos(1)
}

function clearSearch() {
    search.value = ''
    appliedSearch.value = ''
    loadLancamentos(1)
}

function changeSort() {
    sortDirection.value = sortDirection.value === 'desc' ? 'asc' : 'desc'
    filtersOpen.value = false
    loadLancamentos(1)
}

function openFilters() {
    filtersOpen.value = true
}

function closeFilters() {
    filtersOpen.value = false
}

function toggleFinanceMenu() {
    financeMenuOpen.value = !financeMenuOpen.value
}

function openFinanceMenuOnHover() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        financeMenuOpen.value = true
    }
}

function closeFinanceMenuOnHover() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        financeMenuOpen.value = false
    }
}

function closeFinanceMenu() {
    financeMenuOpen.value = false
}

function handleDocumentPointerDown(event) {
    if (financeMenuOpen.value && !financeCrumb.value?.contains(event.target)) {
        closeFinanceMenu()
    }
}

function changePage(page) {
    if (page < 1 || page > pagination.value.totalPages || loading.value) return
    loadLancamentos(page)
    document.querySelector('#main-content')?.scrollTo({ top: 0, behavior: 'smooth' })
}

function openDetails(lancamento) {
    selectedLancamento.value = lancamento
}

function loadPeriod(target) {
    selectedPeriod.value = { month: target.month, year: target.year }
    periodPickerOpen.value = false
    loadLancamentos(1)
}

function openPeriodPicker() {
    pickerYear.value = selectedPeriod.value.year || new Date().getFullYear()
    periodPickerOpen.value = true
}

function closePeriodPicker() {
    periodPickerOpen.value = false
}

function selectMonth(month) {
    loadPeriod({ month, year: Number(pickerYear.value) })
}

function openRow(event, lancamento) {
    if (event.target.closest('button, a, input, select, textarea')) return
    openDetails(lancamento)
}

function closeDetails() {
    selectedLancamento.value = null
}

async function handleLogout() {
    await auth.logout()
    await router.replace({ name: 'login' })
}

function handleEscape(event) {
    if (event.key !== 'Escape') return
    closeDetails()
    closePeriodPicker()
    closeFilters()
    closeFinanceMenu()
}

onMounted(() => {
    window.addEventListener('contex:logout', handleLogout)
    window.addEventListener('keydown', handleEscape)
    document.addEventListener('pointerdown', handleDocumentPointerDown)
    loadLancamentos(1)
})

onBeforeUnmount(() => {
    requestId += 1
    window.removeEventListener('contex:logout', handleLogout)
    window.removeEventListener('keydown', handleEscape)
    document.removeEventListener('pointerdown', handleDocumentPointerDown)
})
</script>

<template>
    <div class="flex min-h-screen bg-background">
        <contex-sidebar active="lancamentos"></contex-sidebar>

        <div class="apex-content flex min-h-screen min-w-0 flex-1 flex-col">
            <apex-header></apex-header>

            <main id="main-content" class="min-w-0 flex-1 p-4 sm:p-6">
                <div class="page-heading">
                    <div>
                        <nav class="breadcrumb" aria-label="Navegação estrutural">
                            <router-link :to="{ name: 'dashboard' }" class="home-link" aria-label="Painel inicial"
                                title="Painel inicial">
                                <Home :size="14" aria-hidden="true" />
                            </router-link>
                            <ChevronRight :size="14" aria-hidden="true" />
                            <div ref="financeCrumb" class="finance-crumb" @mouseenter="openFinanceMenuOnHover"
                                @mouseleave="closeFinanceMenuOnHover">
                                <button type="button" aria-haspopup="menu" :aria-expanded="financeMenuOpen"
                                    @click="toggleFinanceMenu">
                                    Financeiro
                                </button>
                                <div v-if="financeMenuOpen" class="finance-menu" role="menu">
                                    <template v-for="module in financeModules" :key="module.label">
                                        <router-link v-if="module.spaRoute" :to="module.spaRoute" class="active"
                                            role="menuitem" @click="closeFinanceMenu">
                                            {{ module.label }}
                                        </router-link>
                                        <a v-else :href="module.href" role="menuitem" @click.prevent="closeFinanceMenu">
                                            {{ module.label }}
                                        </a>
                                    </template>
                                </div>
                            </div>
                            <ChevronRight :size="14" aria-hidden="true" />
                            <router-link :to="{ name: 'lancamentos' }" class="current-crumb">
                                Lançamentos
                            </router-link>
                        </nav>
                        <h1>Lançamentos</h1>
                        <!-- <p>Acompanhe entradas e saídas da sua conta.</p> -->
                    </div>
                    <button type="button" class="mobile-filter-button" aria-label="Abrir pesquisa e filtros"
                        :aria-expanded="filtersOpen" @click="openFilters">
                        <SlidersHorizontal :size="17" aria-hidden="true" />
                        <span v-if="appliedSearch || sortDirection === 'asc'" class="filter-indicator"></span>
                    </button>
                </div>

                <section class="toolbar" aria-label="Filtros de lançamentos">
                    <form class="search-form" role="search" @submit.prevent="submitSearch">
                        <label for="lancamentos-search" class="sr-only">
                            Pesquisar lançamentos
                        </label>
                        <Search :size="17" aria-hidden="true" />
                        <input id="lancamentos-search" v-model="search" type="search"
                            placeholder="Descrição, fornecedor ou observação" />
                        <button v-if="search" type="button" class="clear-search" aria-label="Limpar pesquisa"
                            @click="clearSearch">
                            <X :size="16" aria-hidden="true" />
                        </button>
                        <button class="search-button" type="submit">Pesquisar</button>
                    </form>

                    <button class="sort-button" type="button" @click="changeSort">
                        <CalendarDays :size="16" aria-hidden="true" />
                        {{ sortDirection === 'desc' ? 'Mais recentes' : 'Mais antigos' }}
                    </button>

                    <div v-if="period.label" class="period-bar" aria-label="Período dos lançamentos">
                        <button type="button" aria-label="Mês anterior" :disabled="!period.previous?.month"
                            @click="loadPeriod(period.previous)">
                            <ChevronLeft :size="17" aria-hidden="true" />
                        </button>
                        <button type="button" class="period-current" aria-haspopup="dialog"
                            :aria-expanded="periodPickerOpen" title="Selecionar um mês e ano específicos"
                            @click="openPeriodPicker">
                            {{ period.label }}
                        </button>
                        <button type="button" aria-label="Próximo mês" :disabled="!period.next?.month"
                            @click="loadPeriod(period.next)">
                            <ChevronRight :size="17" aria-hidden="true" />
                        </button>
                    </div>
                </section>

                <section class="results-card" aria-labelledby="results-title">
                    <header class="results-header">
                        <div>
                            <h2 id="results-title">Extrato de lançamentos</h2>
                            <p aria-live="polite">{{ resultSummary }}</p>
                        </div>
                        <div class="results-actions">
                            <button class="refresh-button" type="button" :disabled="loading"
                                aria-label="Atualizar lançamentos" @click="loadLancamentos()">
                                <RefreshCw :class="{ spinning: loading }" :size="17" aria-hidden="true" />
                            </button>
                            <button v-if="summary" class="summary-toggle" type="button"
                                :aria-expanded="mobileSummaryExpanded" aria-controls="period-summary"
                                :aria-label="mobileSummaryExpanded ? 'Ocultar resumo do período' : 'Exibir resumo do período'"
                                @click="mobileSummaryExpanded = !mobileSummaryExpanded">
                                <ChevronRight :class="{ expanded: mobileSummaryExpanded }" :size="17"
                                    aria-hidden="true" />
                            </button>
                        </div>
                    </header>

                    <div v-if="loading" class="state-panel" role="status">
                        <LoaderCircle class="spinning" :size="28" aria-hidden="true" />
                        <strong>Carregando lançamentos</strong>
                        <span>Consultando os dados mais recentes da sua conta.</span>
                    </div>

                    <div v-else-if="errorMessage" class="state-panel state-error" role="alert">
                        <WalletCards :size="30" aria-hidden="true" />
                        <strong>{{ errorMessage }}</strong>
                        <button type="button" @click="loadLancamentos()">Tentar novamente</button>
                    </div>

                    <div v-else-if="!lancamentos.length" class="state-panel">
                        <WalletCards :size="30" aria-hidden="true" />
                        <strong>Nenhum lançamento encontrado</strong>
                        <span v-if="appliedSearch">Tente pesquisar usando outros termos.</span>
                        <span v-else>Os lançamentos cadastrados aparecerão aqui.</span>
                        <button v-if="appliedSearch" type="button" @click="clearSearch">
                            Limpar pesquisa
                        </button>
                    </div>

                    <template v-else>
                        <div v-if="summary" id="period-summary" class="summary-grid"
                            :class="{ 'mobile-expanded': mobileSummaryExpanded }"
                            aria-label="Posição consolidada do período">
                            <div><span>Entradas</span><strong class="income-text">{{
                                currency(Number(summary.pendingIncome) + Number(summary.paidIncome)) }}</strong>
                            </div>
                            <div><span>Saídas</span><strong class="expense-text">{{
                                currency(Number(summary.pendingExpense) + Number(summary.paidExpense)) }}</strong>
                            </div>
                            <div><span>Total do período</span><strong>{{ currency(summary.total) }}</strong></div>
                        </div>
                        <div class="mobile-list" aria-label="Lançamentos">
                            <article v-for="lancamento in lancamentos" :key="lancamento.id"
                                class="transaction-card clickable-card" tabindex="0" role="button"
                                :aria-label="`Ver detalhes de ${lancamento.description}`"
                                @click="openRow($event, lancamento)" @keydown.enter="openDetails(lancamento)"
                                @keydown.space.prevent="openDetails(lancamento)">
                                <div class="transaction-main">
                                    <span class="type-icon" :class="lancamento.type === 1 ? 'income' : 'expense'">
                                        <ArrowDownLeft v-if="lancamento.type === 1" :size="18" aria-hidden="true" />
                                        <ArrowUpRight v-else :size="18" aria-hidden="true" />
                                    </span>
                                    <div class="transaction-copy">
                                        <h3>
                                            {{ lancamento.description }}
                                            <span v-if="lancamento.notes || lancamento.invoiceId || lancamento.expenseId"
                                                class="record-indicators">
                                                <MessageCircle v-if="lancamento.notes" :size="13"
                                                    aria-label="Possui observações" />
                                                <FileText v-if="lancamento.invoiceId" :size="13"
                                                    :aria-label="`Vinculado à fatura ${lancamento.invoiceId}`" />
                                                <Repeat2 v-if="lancamento.expenseId" :size="13"
                                                    :aria-label="`Vinculado à despesa ${lancamento.expenseId}`" />
                                            </span>
                                        </h3>
                                        <p>{{ lancamento.provider || 'Sem fornecedor informado' }}</p>
                                    </div>
                                </div>
                                <div class="transaction-footer">
                                    <div class="transaction-meta">
                                        <span>{{ date(lancamento.transactionDate) }}</span>
                                    </div>
                                    <div class="transaction-result">
                                        <span class="status-badge" :class="lancamento.paid ? 'paid' : 'pending'">
                                            {{ lancamento.paid ? 'Efetivado' : 'Pendente' }}
                                        </span>
                                        <strong class="footer-amount"
                                            :class="lancamento.type === 1 ? 'income-text' : 'expense-text'">
                                            {{ currency(lancamento.amount) }}
                                        </strong>
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div class="desktop-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Descrição<br>fornecedor</th>
                                        <th>Tipo<br>status</th>
                                        <th class="align-right">Valor</th>
                                        <th class="action-column">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="lancamento in lancamentos" :key="lancamento.id" class="clickable-row"
                                        tabindex="0" @click="openRow($event, lancamento)"
                                        @keydown.enter="openDetails(lancamento)"
                                        @keydown.space.prevent="openDetails(lancamento)">
                                        <td>{{ date(lancamento.transactionDate) }}</td>
                                        <td>
                                            <strong>
                                                {{ lancamento.description }}
                                                <span v-if="lancamento.notes || lancamento.invoiceId || lancamento.expenseId"
                                                    class="record-indicators">
                                                    <MessageCircle v-if="lancamento.notes" :size="13"
                                                        aria-label="Possui observações" />
                                                    <FileText v-if="lancamento.invoiceId" :size="13"
                                                        :aria-label="`Vinculado à fatura ${lancamento.invoiceId}`" />
                                                    <Repeat2 v-if="lancamento.expenseId" :size="13"
                                                        :aria-label="`Vinculado à despesa ${lancamento.expenseId}`" />
                                                </span>
                                            </strong>
                                            <span>{{ lancamento.provider || 'Sem fornecedor informado' }}</span>
                                        </td>
                                        <td>
                                            <span>{{ typeLabel(lancamento) }}</span>
                                            <span class="status-badge" :class="lancamento.paid ? 'paid' : 'pending'">
                                                {{ lancamento.paid ? 'Efetivado' : 'Pendente' }}
                                            </span>
                                        </td>
                                        <td class="align-right amount"
                                            :class="lancamento.type === 1 ? 'income-text' : 'expense-text'">
                                            {{ currency(lancamento.amount) }}
                                        </td>
                                        <td class="action-column">
                                            <button type="button" class="icon-button"
                                                :aria-label="`Ver detalhes de ${lancamento.description}`"
                                                @click="openDetails(lancamento)">
                                                <Eye :size="17" aria-hidden="true" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <footer class="pagination">
                            <span>{{ resultSummary }}</span>
                            <div>
                                <button type="button" :disabled="pagination.page <= 1" aria-label="Página anterior"
                                    @click="changePage(pagination.page - 1)">
                                    <ChevronLeft :size="17" aria-hidden="true" />
                                </button>
                                <span>Página {{ pagination.page }} de {{ pagination.totalPages }}</span>
                                <button type="button" :disabled="pagination.page >= pagination.totalPages"
                                    aria-label="Próxima página" @click="changePage(pagination.page + 1)">
                                    <ChevronRight :size="17" aria-hidden="true" />
                                </button>
                            </div>
                        </footer>
                    </template>
                </section>
            </main>
        </div>

        <div v-if="selectedLancamento" class="dialog-backdrop" @click.self="closeDetails">
            <section class="details-dialog" role="dialog" aria-modal="true" aria-labelledby="details-title">
                <header>
                    <div>
                        <p>Lançamento #{{ selectedLancamento.id }}</p>
                        <h2 id="details-title">{{ selectedLancamento.description }}</h2>
                    </div>
                    <button type="button" aria-label="Fechar detalhes" @click="closeDetails">
                        <X :size="20" aria-hidden="true" />
                    </button>
                </header>
                <dl>
                    <div class="full-row details-block-field">
                        <dt>Descrição</dt>
                        <dd>{{ selectedLancamento.description }}</dd>
                    </div>
                    <div class="full-row details-block-field">
                        <dt>Fornecedor</dt>
                        <dd>{{ selectedLancamento.provider || 'Não informado' }}</dd>
                    </div>
                    <div>
                        <dt>Valor</dt>
                        <dd>{{ currency(selectedLancamento.amount) }}</dd>
                    </div>
                    <div>
                        <dt>Data do lançamento</dt>
                        <dd>{{ date(selectedLancamento.transactionDate) }}</dd>
                    </div>
                    <div>
                        <dt>Tipo</dt>
                        <dd>{{ typeLabel(selectedLancamento) }}</dd>
                    </div>
                    <div>
                        <dt>Status</dt>
                        <dd>{{ selectedLancamento.paid ? 'Efetivado' : 'Pendente' }}</dd>
                    </div>
                    <div v-if="selectedLancamento.paid">
                        <dt>Data do pagamento</dt>
                        <dd>{{ date(selectedLancamento.paymentDate) }}</dd>
                    </div>
                    <div class="full-row details-block-field details-notes-field">
                        <dt>Observações</dt>
                        <dd>{{ selectedLancamento.notes || 'Sem observações.' }}</dd>
                    </div>
                </dl>
                <footer class="details-actions">
                    <button type="button" class="details-action details-action-close" @click="closeDetails">
                        <X :size="15" aria-hidden="true" />
                        Fechar
                    </button>
                    <a href="#" class="details-action details-action-copy">
                        <Copy :size="15" aria-hidden="true" />
                        Copiar
                    </a>
                    <a href="#" class="details-action details-action-save">
                        <Save :size="15" aria-hidden="true" />
                        Salvar
                    </a>
                </footer>
            </section>
        </div>

        <div v-if="filtersOpen" class="dialog-backdrop" @click.self="closeFilters">
            <section class="filters-dialog" role="dialog" aria-modal="true" aria-labelledby="filters-dialog-title">
                <header>
                    <div>
                        <p>Lançamentos</p>
                        <h2 id="filters-dialog-title">Pesquisar e ordenar</h2>
                    </div>
                    <button type="button" aria-label="Fechar filtros" @click="closeFilters">
                        <X :size="20" aria-hidden="true" />
                    </button>
                </header>
                <form class="dialog-search" role="search" @submit.prevent="submitSearch">
                    <label for="mobile-lancamentos-search">Descrição, fornecedor ou observação</label>
                    <div>
                        <Search :size="16" aria-hidden="true" />
                        <input id="mobile-lancamentos-search" v-model="search" type="search"
                            placeholder="Pesquisar lançamentos" />
                        <button type="submit">Pesquisar</button>
                    </div>
                </form>
                <footer>
                    <button v-if="appliedSearch" type="button" class="clear-filter" @click="clearSearch">
                        Limpar pesquisa
                    </button>
                    <button type="button" class="dialog-sort" @click="changeSort">
                        <CalendarDays :size="16" aria-hidden="true" />
                        {{ sortDirection === 'desc' ? 'Mais recentes' : 'Mais antigos' }}
                    </button>
                </footer>
            </section>
        </div>

        <div v-if="periodPickerOpen" class="dialog-backdrop" @click.self="closePeriodPicker">
            <section class="period-dialog" role="dialog" aria-modal="true" aria-labelledby="period-dialog-title">
                <header>
                    <div>
                        <p>Período dos lançamentos</p>
                        <h2 id="period-dialog-title">Selecione o mês e o ano</h2>
                    </div>
                    <button type="button" aria-label="Fechar seleção de período" @click="closePeriodPicker">
                        <X :size="20" aria-hidden="true" />
                    </button>
                </header>
                <div class="month-grid">
                    <button v-for="(month, index) in months" :key="month" type="button" :class="{
                        active:
                            selectedPeriod.month === index + 1 &&
                            selectedPeriod.year === Number(pickerYear),
                    }" @click="selectMonth(index + 1)">
                        {{ month }}
                    </button>
                </div>
                <footer>
                    <label for="period-year">Ano</label>
                    <select id="period-year" v-model.number="pickerYear">
                        <option v-for="year in pickerYears" :key="year" :value="year">
                            {{ year }}
                        </option>
                    </select>
                </footer>
            </section>
        </div>
    </div>
</template>

<style scoped>
.page-heading {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
}

.breadcrumb {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    color: var(--muted-foreground);
    font-size: 0.78rem;
}

.breadcrumb a {
    color: var(--muted-foreground);
    transition: color 150ms ease;
}

.breadcrumb .home-link {
    display: inline-grid;
    place-items: center;
}

.breadcrumb a:hover {
    color: var(--foreground);
}

.breadcrumb .current-crumb {
    color: var(--foreground);
    font-weight: 650;
}

.finance-crumb {
    position: relative;
}

.finance-crumb>button {
    color: var(--muted-foreground);
    cursor: pointer;
    transition: color 150ms ease;
}

.finance-crumb>button:hover,
.finance-crumb>button[aria-expanded='true'] {
    color: var(--foreground);
}

.finance-menu {
    position: absolute;
    z-index: 60;
    top: calc(100% + 0.35rem);
    left: -0.65rem;
    display: grid;
    width: 11rem;
    padding: 0.35rem;
    border: 1px solid var(--border);
    border-radius: 0.55rem;
    background: var(--popover);
    box-shadow: 0 12px 30px rgb(0 0 0 / 24%);
}

.finance-menu::before {
    position: absolute;
    top: -0.4rem;
    right: 0;
    left: 0;
    height: 0.4rem;
    content: '';
}

.finance-menu a {
    padding: 0.48rem 0.6rem;
    border-radius: 0.35rem;
    color: var(--muted-foreground);
    font-size: 0.75rem;
}

.finance-menu a:hover,
.finance-menu a.active {
    background: var(--accent);
    color: var(--foreground);
}

.page-heading h1 {
    margin-top: 0.2rem;
    font-size: clamp(1.55rem, 5vw, 2rem);
    font-weight: 750;
    letter-spacing: -0.025em;
}

.page-heading p:last-child,
.results-header p {
    margin-top: 0.25rem;
    color: var(--muted-foreground);
    font-size: 0.85rem;
}

.mobile-filter-button {
    position: relative;
    display: inline-grid;
    width: 2.1rem;
    height: 2.1rem;
    flex-shrink: 0;
    place-items: center;
    align-self: end;
    margin-bottom: 0.05rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    background: var(--card);
    color: var(--foreground);
    cursor: pointer;
}

.filter-indicator {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    width: 0.35rem;
    height: 0.35rem;
    border-radius: 50%;
    background: var(--primary);
}

.toolbar {
    display: grid;
    gap: 0.55rem;
    margin-bottom: 1rem;
}

.period-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.45rem;
}

.period-bar button {
    display: inline-grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    background: var(--card);
    cursor: pointer;
}

.period-bar strong {
    min-width: 10rem;
    font-size: 0.82rem;
    text-align: center;
    text-transform: capitalize;
}

.period-bar .period-current {
    display: inline-flex;
    width: auto;
    min-width: 9rem;
    padding: 0 0.65rem;
    color: var(--foreground);
    font-size: 0.78rem;
    font-weight: 750;
    text-transform: uppercase;
}

.period-bar .period-current:hover {
    background: var(--accent);
}

.summary-grid {
    display: grid;
    gap: 1px;
    border-bottom: 1px solid var(--border);
    background: var(--border);
}

.summary-grid>div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: var(--card);
    font-size: 0.78rem;
}

.summary-grid span {
    color: var(--muted-foreground);
}

.results-actions {
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.summary-toggle {
    display: inline-grid;
    width: 2.25rem;
    height: 2.25rem;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    background: var(--card);
    color: var(--muted-foreground);
    cursor: pointer;
}

.summary-toggle svg {
    transform: rotate(90deg);
    transition: transform 150ms ease;
}

.summary-toggle svg.expanded {
    transform: rotate(-90deg);
}

.summary-toggle:hover {
    background: var(--accent);
    color: var(--foreground);
}

.results-actions .refresh-button {
    border: 1px solid var(--border);
    background: var(--card);
}

.search-form {
    position: relative;
    display: grid;
    min-width: 0;
    min-height: 2.35rem;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.55rem;
    padding-left: 0.8rem;
    border: 1px solid var(--border);
    border-radius: 0.55rem;
    background: var(--card);
    color: var(--muted-foreground);
}

.search-form:focus-within {
    border-color: var(--ring);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 15%, transparent);
}

.search-form input {
    min-width: 0;
    height: 2.25rem;
    outline: 0;
    background: transparent;
    color: var(--foreground);
    font-size: 0.85rem;
}

.clear-search,
.refresh-button,
.icon-button,
.details-dialog header button {
    display: inline-grid;
    width: 2.25rem;
    height: 2.25rem;
    place-items: center;
    border-radius: 0.4rem;
    color: var(--muted-foreground);
    cursor: pointer;
}

.search-form .clear-search {
    position: absolute;
    top: 50%;
    right: 5.9rem;
    transform: translateY(-50%);
}

.search-form:has(.clear-search) input {
    padding-right: 2.4rem;
}

.period-dialog header button {
    display: inline-grid;
    width: 2.25rem;
    height: 2.25rem;
    flex-shrink: 0;
    place-items: center;
    border-radius: 0.4rem;
    color: var(--muted-foreground);
    cursor: pointer;
}

.clear-search:hover,
.refresh-button:hover,
.icon-button:hover,
.details-dialog header button:hover {
    background: var(--accent);
    color: var(--foreground);
}

.search-button,
.sort-button {
    display: inline-flex;
    min-height: 2.35rem;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    padding: 0 0.85rem;
    border-radius: 0.5rem;
    font-size: 0.8rem;
    font-weight: 650;
    cursor: pointer;
}

.search-button {
    align-self: stretch;
    border-radius: 0 0.5rem 0.5rem 0;
    background: var(--primary);
    color: var(--primary-foreground);
}

.sort-button {
    border: 1px solid var(--border);
    background: var(--card);
    color: var(--foreground);
}

.results-card {
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    background: var(--card);
    box-shadow: 0 1px 3px rgb(0 0 0 / 6%);
}

.results-header {
    display: flex;
    min-height: 4.5rem;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--border);
}

.results-header h2 {
    font-size: 0.95rem;
    font-weight: 700;
}

.refresh-button:disabled {
    cursor: wait;
    opacity: 0.55;
}

.state-panel {
    display: flex;
    min-height: 18rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 2rem 1rem;
    color: var(--muted-foreground);
    text-align: center;
}

.state-panel strong {
    color: var(--foreground);
}

.state-panel span {
    max-width: 28rem;
    font-size: 0.82rem;
}

.state-panel button {
    margin-top: 0.5rem;
    padding: 0.55rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    color: var(--foreground);
    font-size: 0.8rem;
    font-weight: 650;
    cursor: pointer;
}

.state-error svg {
    color: var(--destructive);
}

.mobile-list {
    display: grid;
    gap: 0.25rem;
    padding: 0.3rem;
}

.transaction-card {
    position: relative;
    min-width: 0;
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    background: var(--background);
}

.clickable-card {
    cursor: pointer;
}

.clickable-card:hover {
    border-color: color-mix(in srgb, var(--primary) 45%, var(--border));
    background: color-mix(in srgb, var(--accent) 35%, var(--background));
}

.clickable-card:focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
}

.transaction-main {
    display: grid;
    min-width: 0;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 0.65rem;
}

.type-icon {
    display: grid;
    width: 2.15rem;
    height: 2.15rem;
    place-items: center;
    border-radius: 50%;
}

.type-icon.income {
    background: color-mix(in srgb, var(--success) 14%, transparent);
    color: var(--success);
}

.type-icon.expense {
    background: color-mix(in srgb, var(--destructive) 12%, transparent);
    color: var(--destructive);
}

.transaction-copy {
    min-width: 0;
}

.transaction-copy h3,
.transaction-copy p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.transaction-copy h3 {
    font-size: 0.68rem;
    font-weight: 700;
}

.record-indicators {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    margin-left: 0.2rem;
    color: var(--primary);
    vertical-align: -0.15rem;
}

.record-indicators svg {
    display: inline-block;
    flex: 0 0 auto;
}

.transaction-copy p {
    margin-top: 0.15rem;
    color: var(--muted-foreground);
    font-size: 0.68rem;
}

.amount,
.footer-amount {
    min-width: max-content;
    font-size: 0.78rem;
    font-variant-numeric: tabular-nums;
    text-align: right;
}

.income-text {
    color: var(--success);
}

.expense-text {
    color: var(--destructive);
}

.transaction-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    margin-top: 0.55rem;
    padding: 0.5rem 0 0;
    border-top: 1px solid var(--border);
}

.transaction-meta {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 0.5rem;
    color: var(--muted-foreground);
    font-size: 0.68rem;
}

.transaction-result {
    display: flex;
    min-width: 0;
    align-items: center;
    justify-content: flex-end;
    gap: 0.45rem;
}

.footer-amount {
    margin-left: auto;
}

.status-badge {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    padding: 0.18rem 0.45rem;
    border-radius: 999px;
    font-size: 0.66rem;
    font-weight: 700;
}

.status-badge.paid {
    background: color-mix(in srgb, var(--success) 14%, transparent);
    color: var(--success);
}

.status-badge.pending {
    background: color-mix(in srgb, var(--warning) 18%, transparent);
    color: color-mix(in srgb, var(--warning) 80%, var(--foreground));
}

.desktop-table {
    display: none;
}

.pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-top: 1px solid var(--border);
    color: var(--muted-foreground);
    font-size: 0.75rem;
}

.pagination div {
    display: flex;
    align-items: center;
    gap: 0.65rem;
}

.pagination button {
    display: inline-grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    border: 1px solid var(--border);
    border-radius: 0.4rem;
    background: var(--background);
    color: var(--foreground);
    cursor: pointer;
}

.pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.4;
}

.dialog-backdrop {
    position: fixed;
    z-index: 100;
    display: grid;
    place-items: end center;
    inset: 0;
    padding: 1rem 0 0;
    background: rgb(0 0 0 / 55%);
}

.details-dialog {
    width: 100%;
    max-height: 88vh;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 1rem 1rem 0 0;
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 25px 60px rgb(0 0 0 / 35%);
}

.filters-dialog {
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 1rem 1rem 0 0;
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 25px 60px rgb(0 0 0 / 35%);
}

.filters-dialog header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.9rem 1rem;
    border-bottom: 1px solid var(--border);
}

.filters-dialog header p,
.dialog-search label {
    color: var(--muted-foreground);
    font-size: 0.7rem;
}

.filters-dialog h2 {
    margin-top: 0.15rem;
    font-size: 1rem;
    font-weight: 700;
}

.filters-dialog header button {
    display: inline-grid;
    width: 2rem;
    height: 2rem;
    place-items: center;
    color: var(--muted-foreground);
    cursor: pointer;
}

.dialog-search {
    display: grid;
    gap: 0.35rem;
    padding: 0.9rem 1rem;
}

.dialog-search>div {
    display: grid;
    min-width: 0;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 0.5rem;
    padding-left: 0.7rem;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    color: var(--muted-foreground);
}

.dialog-search input {
    min-width: 0;
    height: 2.25rem;
    outline: none;
    background: transparent;
    color: var(--foreground);
    font-size: 0.78rem;
}

.dialog-search button,
.dialog-sort,
.clear-filter {
    min-height: 2.25rem;
    padding: 0 0.75rem;
    font-size: 0.75rem;
    font-weight: 650;
    cursor: pointer;
}

.dialog-search button {
    border-radius: 0 0.45rem 0.45rem 0;
    background: var(--primary);
    color: var(--primary-foreground);
}

.filters-dialog footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0 1rem 0.9rem;
}

.dialog-sort,
.clear-filter {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    background: var(--card);
}

.clear-filter {
    color: var(--muted-foreground);
}

.period-dialog {
    width: min(28rem, calc(100% - 2rem));
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 0.8rem;
    background: var(--popover);
    color: var(--popover-foreground);
    box-shadow: 0 25px 60px rgb(0 0 0 / 35%);
}

.period-dialog header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
}

.period-dialog header p {
    color: var(--muted-foreground);
    font-size: 0.7rem;
}

.period-dialog h2 {
    margin-top: 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
}

.month-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.5rem;
    padding: 1rem;
}

.month-grid button {
    min-height: 2.5rem;
    padding: 0.4rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    background: var(--card);
    font-size: 0.75rem;
    font-weight: 650;
    cursor: pointer;
}

.month-grid button:hover,
.month-grid button.active {
    border-color: var(--primary);
    background: color-mix(in srgb, var(--primary) 14%, var(--card));
    color: var(--primary);
}

.period-dialog footer {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem 1rem;
    border-top: 1px solid var(--border);
}

.period-dialog footer label {
    color: var(--muted-foreground);
    font-size: 0.78rem;
    font-weight: 650;
}

.period-dialog select {
    min-height: 2.5rem;
    flex: 1;
    padding: 0 0.7rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    background: var(--card);
    color: var(--foreground);
}

.details-dialog header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border);
}

.details-dialog header p {
    color: var(--muted-foreground);
    font-size: 0.7rem;
}

.details-dialog h2 {
    margin-top: 0.2rem;
    font-size: 1.05rem;
    font-weight: 700;
}

.details-dialog dl {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem 1rem;
    padding: 1rem;
}

.details-dialog .full-row {
    grid-column: 1 / -1;
}

.details-block-field {
    display: block;
    margin-inline: -1rem;
    padding-inline: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border);
}

.details-notes-field {
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    border-bottom: 0;
}

.details-notes-field dd {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
}

.details-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--border);
}

.details-action {
    display: inline-flex;
    min-height: 2rem;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    padding: 0 0.75rem;
    border: 1px solid var(--border);
    border-radius: 0.45rem;
    font-size: 0.75rem;
    font-weight: 650;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.details-action-copy {
    background: var(--card);
    color: var(--foreground);
}

.details-action-close {
    background: var(--card);
    color: var(--foreground);
}

.details-action-copy:hover,
.details-action-close:hover {
    border-color: color-mix(in srgb, var(--primary) 40%, var(--border));
    background: var(--accent);
    color: var(--accent-foreground);
}

.details-action-save:hover {
    background: color-mix(in srgb, var(--primary) 88%, black);
}

.details-action-save {
    border-color: var(--primary);
    background: var(--primary);
    color: var(--primary-foreground);
}

.details-dialog dt {
    color: var(--muted-foreground);
    font-size: 0.7rem;
}

.details-dialog dd {
    margin-top: 0.2rem;
    font-size: 0.88rem;
    font-weight: 600;
}

.spinning {
    animation: spin 0.8s linear infinite;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media (min-width: 640px) {
    .pagination {
        flex-direction: row;
    }

    .details-dialog {
        width: min(32rem, calc(100% - 2rem));
        margin: auto;
        border-radius: 0.8rem;
    }

    .filters-dialog {
        width: min(30rem, calc(100% - 2rem));
        margin: auto;
        border-radius: 0.8rem;
    }

    .details-dialog dl {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .details-dialog .full-row {
        grid-column: 1 / -1;
    }

    .dialog-backdrop {
        place-items: center;
        padding: 1rem;
    }
}

@media (min-width: 900px) {
    .mobile-filter-button {
        display: none;
    }

    .toolbar {
        grid-template-columns: minmax(18rem, 1fr) auto auto;
        max-width: 58rem;
        align-items: stretch;
    }

    .search-form,
    .sort-button,
    .period-bar {
        height: 2.9rem;
    }

    .search-button,
    .sort-button {
        min-height: 100%;
    }

    .search-button {
        align-self: center;
    }
}

@media (max-width: 899px) {
    .page-heading {
        margin-bottom: 0.65rem;
    }

    .toolbar .search-form,
    .toolbar>.sort-button {
        display: none;
    }

    .toolbar {
        margin-bottom: 0.65rem;
    }

    .summary-grid {
        display: none;
    }

    .summary-grid.mobile-expanded {
        display: grid;
    }
}

@media (min-width: 768px) {
    .summary-toggle {
        display: none;
    }

    .mobile-list {
        display: none;
    }

    .desktop-table {
        display: block;
        overflow-x: auto;
    }

    .desktop-table table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.8rem;
    }

    .desktop-table th {
        padding: 0.75rem 1rem;
        background: var(--muted);
        color: var(--muted-foreground);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-align: left;
        text-transform: uppercase;
    }

    .desktop-table td {
        padding: 0.45rem 1rem;
        border-top: 1px solid var(--border);
        vertical-align: middle;
    }

    .desktop-table tbody tr:hover {
        background: color-mix(in srgb, var(--accent) 65%, transparent);
    }

    .clickable-row {
        cursor: pointer;
    }

    .clickable-row:focus-visible {
        outline: 2px solid var(--ring);
        outline-offset: -2px;
    }

    .summary-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .desktop-table td strong,
    .desktop-table td>span {
        display: block;
    }

    .desktop-table td>span:not(.status-badge) {
        margin-top: 0.05rem;
        color: var(--muted-foreground);
        font-size: 0.72rem;
    }

    .desktop-table .status-badge {
        margin-top: 0.15rem;
    }

    .desktop-table .align-right {
        text-align: right;
    }

    .desktop-table .action-column {
        width: 5rem;
        text-align: center;
    }

    .desktop-table .amount {
        white-space: nowrap;
    }
}

@media (max-width: 420px) {
    .search-button {
        width: 2.75rem;
        overflow: hidden;
        color: transparent;
        font-size: 0;
    }

    .search-button::after {
        content: '→';
        color: var(--primary-foreground);
        font-size: 1rem;
    }
}
</style>
