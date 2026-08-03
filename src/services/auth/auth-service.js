import { http } from '../client.js'
import { createAuthService } from './auth-contract.js'

export { AUTH_ENDPOINTS, createAuthService } from './auth-contract.js'

export const authService = createAuthService(http)
