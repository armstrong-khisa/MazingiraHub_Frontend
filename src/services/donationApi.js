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

// Donor Donations
export async function getDonorDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getDonorDonationById(id) {
  const data = await apiRequest(`/donations/${id}`)
  return data.donation || data.data || data
}

// Recurring Donations
export async function getRecurringDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/recurring-donations${search ? `?${search}` : ''}`)
  return data.recurringDonations || data.data || data
}

export async function createRecurringDonation(payload) {
  return apiRequest('/recurring-donations', { method: 'POST', body: payload })
}

export async function updateRecurringDonation(id, payload) {
  return apiRequest(`/recurring-donations/${id}`, { method: 'PUT', body: payload })
}

export async function pauseRecurringDonation(id) {
  return apiRequest(`/recurring-donations/${id}/pause`, { method: 'PATCH' })
}

export async function resumeRecurringDonation(id) {
  return apiRequest(`/recurring-donations/${id}/resume`, { method: 'PATCH' })
}

export async function cancelRecurringDonation(id) {
  return apiRequest(`/recurring-donations/${id}/cancel`, { method: 'PATCH' })
}

// Organization Donations (for org dashboard)
export async function getOrganizationDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/organization/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getOrganizationDonationStats() {
  const data = await apiRequest('/organization/donations/stats')
  return data.stats || data.data || data
}

// Admin Donations
export async function getAllDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/admin/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getDonationById(id) {
  const data = await apiRequest(`/admin/donations/${id}`)
  return data.donation || data.data || data
}
