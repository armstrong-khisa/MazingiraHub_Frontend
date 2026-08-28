import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from '../services/Api'

describe('apiRequest', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a friendly error when the server cannot be reached', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'))

    await expect(apiRequest('/organizations')).rejects.toThrow(
      'Unable to reach the server. Please check your connection and try again.',
    )
  })
})
