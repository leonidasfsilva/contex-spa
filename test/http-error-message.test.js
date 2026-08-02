import assert from 'node:assert/strict'
import test from 'node:test'
import { errorMessage } from '../src/services/http-error.js'

test('usa a mensagem do envelope público de erro da API', async () => {
    const message = errorMessage(
        { statusText: 'Bad Request' },
        {
            success: false,
            error: {
                code: 'INVALID_QUERY_PARAMETER',
                message: 'Um ou mais parâmetros da consulta são inválidos.',
            },
        },
    )

    assert.equal(message, 'Um ou mais parâmetros da consulta são inválidos.')
})
