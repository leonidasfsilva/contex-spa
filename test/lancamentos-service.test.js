import assert from 'node:assert/strict'
import test from 'node:test'
import {
    LANCAMENTOS_ENDPOINT,
    createLancamentosService,
    normalizeLancamentosCollection,
} from '../src/services/financeiro/lancamentos-service.js'

test('lista lançamentos usando os parâmetros públicos do contrato', async () => {
    const calls = []
    const response = {
        success: true,
        data: { results: [{ id: 12, description: 'Mercado' }] },
        meta: {
            pagination: { page: 2, perPage: 10, total: 15, totalPages: 2 },
            filters: { search: 'mercado' },
            sort: [{ field: 'transactionDate', direction: 'desc' }],
        },
    }
    const client = {
        async get(path, options) {
            calls.push({ path, options })
            return response
        },
    }
    const service = createLancamentosService(client)
    const query = { page: 2, perPage: 10, search: 'mercado', sortDirection: 'desc' }

    const collection = await service.list(query)

    assert.deepEqual(calls, [
        { path: LANCAMENTOS_ENDPOINT, options: { query } },
    ])
    assert.deepEqual(collection.results, response.data.results)
    assert.deepEqual(collection.pagination, response.meta.pagination)
})

test('preserva período e posição consolidada entregues pelo controller MVC', () => {
    const response = {
        success: true,
        data: {
            results: [],
            period: {
                month: 7,
                year: 2026,
                label: 'JULHO / 2026',
                previous: { month: 6, year: 2026 },
                next: { month: 8, year: 2026 },
            },
            summary: { total: '125.90' },
        },
        meta: { pagination: { page: 1, perPage: 30, total: 0, totalPages: 0 } },
    }

    const collection = normalizeLancamentosCollection(response)

    assert.equal(collection.period.label, 'JULHO / 2026')
    assert.equal(collection.summary.total, '125.90')
})

test('rejeita uma resposta que não respeita o envelope de coleção', () => {
    assert.throws(
        () => normalizeLancamentosCollection({ success: true, data: {} }),
        /resposta da listagem de lançamentos é inválida/,
    )
})
