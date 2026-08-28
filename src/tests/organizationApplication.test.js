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
      description: 'Restoring native forests',
      registration_docs_url: 'https://example.com/registration.pdf',
      ignoredField: 'not sent',
    }
    apiRequest.mockResolvedValue({ success: true })

    await applyAsOrganization(application)

    expect(apiRequest).toHaveBeenCalledWith('/organizations/applications', {
      method: 'POST',
      body: {
        org_name: 'Green Kenya',
        description: 'Restoring native forests',
        registration_docs_url: 'https://example.com/registration.pdf',
      },
    })
  })
})
