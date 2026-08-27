import { apiRequest } from './Api'

// Inventory
export async function getInventory(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/inventory${search ? `?${search}` : ''}`)
  return data.inventory || data.items || data.data || data
}

export async function getInventoryItemById(id) {
  const data = await apiRequest(`/api/inventory/${id}`)
  return data.item || data.data || data
}

export async function createInventoryItem(payload) {
  return apiRequest('/api/inventory', { method: 'POST', body: payload })
}

export async function updateInventoryItem(id, payload) {
  return apiRequest(`/api/inventory/${id}`, { method: 'PUT', body: payload })
}

export async function deleteInventoryItem(id) {
  return apiRequest(`/api/inventory/${id}`, { method: 'DELETE' })
}
