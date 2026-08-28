import { describe, expect, it, vi } from 'vitest'
import { loginAccount } from '../services/authApi'
import { apiRequest } from '../services/Api'

vi.mock('../services/Api', () => ({
  apiRequest: vi.fn(),
}))

describe('loginAccount', () => {
  it('sends credentials without an existing authentication token', async () => {
    const credentials = { email: 'donor@example.com', password: 'secret' }
    apiRequest.mockResolvedValue({ token: 'new-token' })

    await loginAccount(credentials)

    expect(apiRequest).toHaveBeenCalledWith('/api/auth/login', {
      method: 'POST',
      body: credentials,
      token: null,
    })
  })
})
