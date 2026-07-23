import { AxiosHttpClient } from './axios-http-client.js'
import { FetchHttpClient } from './fetch-http-client.js'

const HttpClient = AxiosHttpClient

export const http = new HttpClient()

export { AxiosHttpClient, FetchHttpClient }
