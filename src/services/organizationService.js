import { apiRequest } from './Api'

// Organization Profile
export async function getOrganizationProfile() {
  const data = await apiRequest('/api/organization/profile')
  return data.profile || data.organization || data.organisation || data.data || data
}

export async function updateOrganizationProfile(payload) {
  const data = await apiRequest('/api/organization/profile', { method: 'PUT', body: payload })
  return data.profile || data.organization || data.organisation || data.data || data
}

// Organization Donors
export async function getOrganizationDonors(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/organization/donors${search ? `?${search}` : ''}`)
  return data.donors || data.data || data
}

export async function getDonorById(id) {
  const data = await apiRequest(`/api/organization/donors/${id}`)
  return data.donor || data.data || data
}

// Organization Stats
export async function getOrganizationStats() {
  const data = await apiRequest('/api/organization/stats')
  return data.stats || data.data || data
}

export async function getDonationStats(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/organization/donation-stats${search ? `?${search}` : ''}`)
  return data.stats || data.data || data
}
