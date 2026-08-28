import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import EmptyState from '../../components/EmptyState'
import {
  getOrganizations,
  deactivateOrganization,
  activateOrganization,
  deleteOrganization,
} from '../../services/adminApi'

const DEFAULT_PAGE_SIZE = 10

export default function AdminOrganisations() {
  const [organizations, setOrganizations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterStatus, setFilterStatus] = useState('active')
  const [search, setSearch] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getOrganizations({
        page,
        limit: DEFAULT_PAGE_SIZE,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        search,
      })

      const list = Array.isArray(data) ? data : data.organizations || []
      setOrganizations(list)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filterStatus, page, search])

  useEffect(() => {
    void Promise.resolve().then(fetchOrganizations)
  }, [fetchOrganizations])

  const handleDeactivate = async (id) => {
    if (!confirm('Are you sure you want to deactivate this organization?')) return

    try {
      setActionLoading(id)
      setError('')
      await deactivateOrganization(id)
      setSuccess('Organization deactivated!')
      await fetchOrganizations()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleActivate = async (id) => {
    try {
      setActionLoading(id)
      setError('')
      await activateOrganization(id)
      setSuccess('Organization activated!')
      await fetchOrganizations()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to permanently delete this organization?')) return

    try {
      setActionLoading(id)
      setError('')
      await deleteOrganization(id)
      setSuccess('Organization deleted!')
      await fetchOrganizations()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#172033]">Organizations</h1>
          <p className="mt-2 text-gray-600">
            Manage all organizations on the platform
          </p>
        </div>

        {/* Messages */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value)
                  setPage(1)
                }}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="all">All</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none"
              />
            </div>
          </div>
        </Card>

        {/* Organizations List */}
        {organizations.length > 0 ? (
          <div className="space-y-4">
            {organizations.map((org) => (
              <Card key={org._id || org.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#183b2b]">
                      {org.name || org.organisationName}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{org.email}</p>
                    {org.phone && (
                      <p className="text-sm text-gray-600">{org.phone}</p>
                    )}
                    <p className="mt-2 text-sm text-gray-600">
                      {org.location || org.county}
                    </p>
                    {org.focusArea && (
                      <p className="text-sm text-gray-600">{org.focusArea}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        org.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {org.status || 'active'}
                    </span>

                    <div className="flex flex-col gap-2">
                      {org.status === 'active' ? (
                        <button
                          onClick={() => handleDeactivate(org._id || org.id)}
                          disabled={actionLoading === (org._id || org.id)}
                          className="text-sm text-red-600 hover:underline disabled:opacity-50"
                        >
                          {actionLoading === (org._id || org.id)
                            ? 'Deactivating...'
                            : 'Deactivate'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivate(org._id || org.id)}
                          disabled={actionLoading === (org._id || org.id)}
                          className="text-sm text-green-600 hover:underline disabled:opacity-50"
                        >
                          {actionLoading === (org._id || org.id)
                            ? 'Activating...'
                            : 'Activate'}
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(org._id || org.id)}
                        disabled={actionLoading === (org._id || org.id)}
                        className="text-sm text-red-700 hover:underline disabled:opacity-50"
                      >
                        {actionLoading === (org._id || org.id)
                          ? 'Deleting...'
                          : 'Delete permanently'}
                      </button>
                    </div>

                    {org.totalDonations && (
                      <p className="text-sm text-right">
                        <span className="text-xs text-gray-600">Total: </span>
                        <span className="font-bold text-[#28a66a]">
                          KES {org.totalDonations}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        ) : (
          <EmptyState title="No organizations found" message="Try adjusting your search or filters" />
        )}
      </div>
    </main>
  )
}
