import { apiRequest } from './Api'

// Organization Applications
export async function getApplications(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/admin/applications${search ? `?${search}` : ''}`)
  return data.applications || data.data || data
}

export async function getApplicationById(id) {
  const data = await apiRequest(`/api/admin/applications/${id}`)
  return data.application || data.data || data
}

export async function approveApplication(id, payload = {}) {
  return apiRequest(`/api/admin/applications/${id}/approve`, { method: 'PATCH', body: payload })
}

export async function rejectApplication(id, payload = {}) {
  return apiRequest(`/api/admin/applications/${id}/reject`, { method: 'PATCH', body: payload })
}

// Organizations Management
export async function getOrganizations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/admin/organizations${search ? `?${search}` : ''}`)
  return data.organizations || data.organisations || data.data || data
}

export async function getOrganizationById(id) {
  const data = await apiRequest(`/api/admin/organizations/${id}`)
  return data.organization || data.organisation || data.data || data
}

export async function updateOrganizationStatus(id, status) {
  return apiRequest(`/api/admin/organizations/${id}/status`, { method: 'PATCH', body: { status } })
}

export async function deactivateOrganization(id) {
  return apiRequest(`/api/admin/organizations/${id}/deactivate`, { method: 'PATCH' })
}

export async function activateOrganization(id) {
  return apiRequest(`/api/admin/organizations/${id}/activate`, { method: 'PATCH' })
}

// Admin Dashboard Stats
export async function getAdminStats() {
  const data = await apiRequest('/api/admin/stats')
  return data.stats || data.data || data
}

export async function getRecentActivity(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/admin/activity${search ? `?${search}` : ''}`)
  return data.activity || data.data || data
}
