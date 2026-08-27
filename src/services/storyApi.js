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

// Public Stories
export async function getStories(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/stories${search ? `?${search}` : ''}`, { token: null })
  return data.stories || data.data || data
}

export async function getStoryById(id) {
  const data = await apiRequest(`/stories/${id}`, { token: null })
  return data.story || data.data || data
}

// Organization Stories
export async function getOrganizationStories(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/organization/stories${search ? `?${search}` : ''}`)
  return data.stories || data.data || data
}

export async function createStory(payload) {
  return apiRequest('/organization/stories', { method: 'POST', body: payload })
}

export async function updateStory(id, payload) {
  return apiRequest(`/organization/stories/${id}`, { method: 'PUT', body: payload })
}

export async function deleteStory(id) {
  return apiRequest(`/organization/stories/${id}`, { method: 'DELETE' })
}

export async function publishStory(id) {
  return apiRequest(`/organization/stories/${id}/publish`, { method: 'PATCH' })
}

export async function unpublishStory(id) {
  return apiRequest(`/organization/stories/${id}/unpublish`, { method: 'PATCH' })
}
