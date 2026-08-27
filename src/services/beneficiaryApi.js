import { apiRequest } from './Api'

// Beneficiaries
export async function getBeneficiaries(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/beneficiaries${search ? `?${search}` : ''}`)
  return data.beneficiaries || data.data || data
}

export async function getBeneficiaryById(id) {
  const data = await apiRequest(`/api/beneficiaries/${id}`)
  return data.beneficiary || data.data || data
}

export async function createBeneficiary(payload) {
  return apiRequest('/api/beneficiaries', { method: 'POST', body: payload })
}

export async function updateBeneficiary(id, payload) {
  return apiRequest(`/api/beneficiaries/${id}`, { method: 'PUT', body: payload })
}

export async function deleteBeneficiary(id) {
  return apiRequest(`/api/beneficiaries/${id}`, { method: 'DELETE' })
}
