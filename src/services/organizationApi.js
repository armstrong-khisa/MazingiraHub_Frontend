import { apiRequest } from './Api'

export async function getOrganizations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/organizations${search ? `?${search}` : ''}`)
  return data.organizations || data.organisations || data.data || data
}

export async function getOrganization(id) {
  const data = await apiRequest(`/organizations/${id}`)
  return data.organization || data.organisation || data.data || data
}

export function applyAsOrganization(payload) {
  return apiRequest('/api/organizations/apply', { method: 'POST', body: payload })
}
