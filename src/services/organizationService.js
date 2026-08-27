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

// Organization Profile
export async function getOrganizationProfile() {
  const data = await apiRequest('/organization/profile')
  return data.profile || data.organization || data.organisation || data.data || data
}

export async function updateOrganizationProfile(payload) {
  return apiRequest('/organization/profile', { method: 'PUT', body: payload })
}

// Organization Donors
export async function getOrganizationDonors(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/organization/donors${search ? `?${search}` : ''}`)
  return data.donors || data.data || data
}

export async function getDonorById(id) {
  const data = await apiRequest(`/organization/donors/${id}`)
  return data.donor || data.data || data
}

// Organization Stats
export async function getOrganizationStats() {
  const data = await apiRequest('/organization/stats')
  return data.stats || data.data || data
}

export async function getDonationStats(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/organization/donation-stats${search ? `?${search}` : ''}`)
  return data.stats || data.data || data
}
