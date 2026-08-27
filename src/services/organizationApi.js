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
  return apiRequest('/organizations/applications', {
    method: 'POST',
    body: {
      org_name: payload.name,
      description: payload.description,
      registration_docs_url: payload.registration_docs_url,
    },
  })
}
