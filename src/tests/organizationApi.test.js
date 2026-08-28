import { afterEach, describe, expect, it, vi } from 'vitest'
import { getOrganizations } from '../services/organizationApi'

describe('getOrganizations', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('builds query parameters and normalizes the backend organisations response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ organisations: [{ id: 'org-1' }] }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    )

    const organizations = await getOrganizations({ page: 2, search: 'forest', empty: '' })

    expect(fetch).toHaveBeenCalledWith(
      'https://mazingirahub-backend.onrender.com/organizations?page=2&search=forest',
      { headers: { Accept: 'application/json' }, body: undefined },
    )
    expect(organizations).toEqual([{ id: 'org-1' }])
  })
})
