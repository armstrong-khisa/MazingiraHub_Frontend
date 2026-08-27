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

// Inventory
export async function getInventory(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/inventory${search ? `?${search}` : ''}`)
  return data.inventory || data.items || data.data || data
}

export async function getInventoryItemById(id) {
  const data = await apiRequest(`/inventory/${id}`)
  return data.item || data.data || data
}

export async function createInventoryItem(payload) {
  return apiRequest('/inventory', { method: 'POST', body: payload })
}

export async function updateInventoryItem(id, payload) {
  return apiRequest(`/inventory/${id}`, { method: 'PUT', body: payload })
}

export async function deleteInventoryItem(id) {
  return apiRequest(`/inventory/${id}`, { method: 'DELETE' })
}
