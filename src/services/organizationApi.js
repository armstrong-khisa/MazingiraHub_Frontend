import { apiRequest } from './Api'

// Public platform-wide stats (no auth required)
export async function getPublicStats() {
  const data = await apiRequest('/api/stats')
  return data.stats || data.data || data
}

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
      email: payload.email,
      password: payload.password,
      description: payload.description,
      image_url: payload.image_url || undefined,
    },
  })
}
