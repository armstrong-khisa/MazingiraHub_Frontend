import { describe, expect, it, vi } from 'vitest'
import { applyAsOrganization } from '../services/organizationApi'
import { apiRequest } from '../services/Api'

vi.mock('../services/Api', () => ({
  apiRequest: vi.fn(),
}))

describe('applyAsOrganization', () => {
  it('maps application details to the backend contract', async () => {
    const application = {
      name: 'Green Kenya',
      email: 'green@example.com',
      password: 'Secret123!',
      description: 'Restoring native forests',
      image_url: 'https://example.com/logo.jpg',
      ignoredField: 'not sent',
    }
    apiRequest.mockResolvedValue({ success: true })

    await applyAsOrganization(application)

    expect(apiRequest).toHaveBeenCalledWith('/organizations/applications', {
      method: 'POST',
      body: {
        org_name: 'Green Kenya',
        email: 'green@example.com',
        password: 'Secret123!',
        description: 'Restoring native forests',
        image_url: 'https://example.com/logo.jpg',
      },
    })
  })
})
