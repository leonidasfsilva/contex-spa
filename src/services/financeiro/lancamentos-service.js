export const LANCAMENTOS_ENDPOINT = '/financeiro/lancamentos'

function normalizePagination(pagination = {}, query = {}) {
    return {
        page: Number(pagination.page ?? query.page ?? 1),
        perPage: Number(pagination.perPage ?? query.perPage ?? 30),
        total: Number(pagination.total ?? 0),
        totalPages: Number(pagination.totalPages ?? 0),
    }
}

export function normalizeLancamentosCollection(response, query = {}) {
    if (response?.success !== true || !Array.isArray(response?.data?.results)) {
        throw new TypeError('A resposta da listagem de lançamentos é inválida.')
    }

    return {
        results: response.data.results,
        summary: response.data.summary ?? null,
        period: response.data.period ?? { label: '', years: [], previous: {}, next: {} },
        paymentMethods: response.data.paymentMethods ?? [],
        pagination: normalizePagination(response.meta?.pagination, query),
        filters: response.meta?.filters ?? {},
        sort: Array.isArray(response.meta?.sort) ? response.meta.sort : [],
    }
}

export function createLancamentosService(client) {
    if (!client) {
        throw new TypeError('O serviço de lançamentos requer um cliente HTTP.')
    }

    return {
        async list(query = {}) {
            const response = await client.get(LANCAMENTOS_ENDPOINT, { query })
            return normalizeLancamentosCollection(response, query)
        },
    }
}
