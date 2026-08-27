import { apiRequest } from './Api'

export function registerAccount(payload) {
  return apiRequest('/api/auth/register', { method: 'POST', body: payload, token: null })
}

export function loginAccount(payload) {
  return apiRequest('/api/auth/login', { method: 'POST', body: payload, token: null })
}

export function getCurrentUser() {
  return apiRequest('/api/auth/me')
}
