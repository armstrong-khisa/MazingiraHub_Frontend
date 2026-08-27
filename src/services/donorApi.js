import { apiRequest } from './Api'

// Donor Profile
export async function getDonorProfile() {
  const data = await apiRequest('/api/donor/profile')
  return data.profile || data.donor || data.user || data.data || data
}

export async function updateDonorProfile(payload) {
  return apiRequest('/api/donor/profile', { method: 'PUT', body: payload })
}

export async function getDonorStats() {
  const data = await apiRequest('/api/donor/stats')
  return data.stats || data.data || data
}
