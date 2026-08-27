const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '')

async function apiRequest(path, options = {}) {
  const { body, headers = {}, token = localStorage.getItem('mazingira_token'), ...rest } = options
  const requestHeaders = { Accept: 'application/json', ...headers }
  if (body !== undefined) requestHeaders['Content-Type'] = 'application/json'
  if (token) requestHeaders.Authorization = `Bearer ${token}`

  let response
  try { response = await fetch(`${API_BASE_URL}${path}`, { ...rest, headers: requestHeaders, body: body === undefined ? undefined : JSON.stringify(body) }) } catch { throw new Error('Unable to reach the server. Please check your connection and try again.') }
  const data = response.headers.get('content-type')?.includes('application/json') ? await response.json().catch(() => ({})) : await response.text()
  if (!response.ok) throw new Error(data?.message || data?.error || 'Something went wrong. Please try again.')
  return data
}

// Organization Applications
export async function getApplications(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/admin/applications${search ? `?${search}` : ''}`)
  return data.applications || data.data || data
}

export async function getApplicationById(id) {
  const data = await apiRequest(`/admin/applications/${id}`)
  return data.application || data.data || data
}

export async function approveApplication(id, payload = {}) {
  return apiRequest(`/admin/applications/${id}/approve`, { method: 'PATCH', body: payload })
}

export async function rejectApplication(id, payload = {}) {
  return apiRequest(`/admin/applications/${id}/reject`, { method: 'PATCH', body: payload })
}

// Organizations Management
export async function getOrganizations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/admin/organizations${search ? `?${search}` : ''}`)
  return data.organizations || data.organisations || data.data || data
}

export async function getOrganizationById(id) {
  const data = await apiRequest(`/admin/organizations/${id}`)
  return data.organization || data.organisation || data.data || data
}

export async function updateOrganizationStatus(id, status) {
  return apiRequest(`/admin/organizations/${id}/status`, { method: 'PATCH', body: { status } })
}

export async function deactivateOrganization(id) {
  return apiRequest(`/admin/organizations/${id}/deactivate`, { method: 'PATCH' })
}

export async function activateOrganization(id) {
  return apiRequest(`/admin/organizations/${id}/activate`, { method: 'PATCH' })
}

// Admin Dashboard Stats
export async function getAdminStats() {
  const data = await apiRequest('/admin/stats')
  return data.stats || data.data || data
}

export async function getRecentActivity(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/admin/activity${search ? `?${search}` : ''}`)
  return data.activity || data.data || data
}
