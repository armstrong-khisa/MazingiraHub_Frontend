import { apiRequest } from './Api'

// Public Stories
export async function getStories(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/stories${search ? `?${search}` : ''}`, { token: null })
  return data.stories || data.data || data
}

export async function getStoryById(id) {
  const data = await apiRequest(`/api/stories/${id}`, { token: null })
  return data.story || data.data || data
}

// Organization Stories
export async function getOrganizationStories(params = {}) {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== ''),
  ).toString()
  const data = await apiRequest(`/api/organization/stories${search ? `?${search}` : ''}`)
  return data.stories || data.data || data
}

export async function createStory(payload) {
  return apiRequest('/api/organization/stories', { method: 'POST', body: payload })
}

export async function updateStory(id, payload) {
  return apiRequest(`/api/organization/stories/${id}`, { method: 'PUT', body: payload })
}

export async function deleteStory(id) {
  return apiRequest(`/api/organization/stories/${id}`, { method: 'DELETE' })
}

export async function publishStory(id) {
  return apiRequest(`/api/organization/stories/${id}/publish`, { method: 'PATCH' })
}

export async function unpublishStory(id) {
  return apiRequest(`/api/organization/stories/${id}/unpublish`, { method: 'PATCH' })
}
