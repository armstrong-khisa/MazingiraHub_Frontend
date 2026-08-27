import { apiRequest } from './Api'

export function createDonation(payload) {
  return apiRequest('/api/donations', { method: 'POST', body: payload })
}

// Donor Donations
export async function getDonorDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getDonorDonationById(id) {
  const data = await apiRequest(`/api/donations/${id}`)
  return data.donation || data.data || data
}

// Recurring Donations
export async function getRecurringDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/recurring-donations${search ? `?${search}` : ''}`)
  return data.recurringDonations || data.data || data
}

export async function createRecurringDonation(payload) {
  return apiRequest('/api/recurring-donations', { method: 'POST', body: payload })
}

export async function updateRecurringDonation(id, payload) {
  return apiRequest(`/api/recurring-donations/${id}`, { method: 'PATCH', body: payload })
}

export async function pauseRecurringDonation(id) {
  return apiRequest(`/api/recurring-donations/${id}/pause`, { method: 'PATCH' })
}

export async function resumeRecurringDonation(id) {
  return apiRequest(`/api/recurring-donations/${id}/resume`, { method: 'PATCH' })
}

export async function cancelRecurringDonation(id) {
  return apiRequest(`/api/recurring-donations/${id}/cancel`, { method: 'PATCH' })
}

// Organization Donations (for org dashboard)
export async function getOrganizationDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/organization/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getOrganizationDonationStats() {
  const data = await apiRequest('/api/organization/donations/stats')
  return data.stats || data.data || data
}

// Admin Donations
export async function getAllDonations(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/admin/donations${search ? `?${search}` : ''}`)
  return data.donations || data.data || data
}

export async function getDonationById(id) {
  const data = await apiRequest(`/api/admin/donations/${id}`)
  return data.donation || data.data || data
}
