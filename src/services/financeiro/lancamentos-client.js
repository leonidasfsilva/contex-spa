import { http } from '../client.js'
import { createLancamentosService } from './lancamentos-service.js'

export const lancamentosService = createLancamentosService(http)
