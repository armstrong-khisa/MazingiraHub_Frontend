import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getAllDonations } from '../../services/donationApi'

const DEFAULT_PAGE_SIZE = 10

export default function AdminDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('date')
  const [filterType, setFilterType] = useState('all')
  const [search, setSearch] = useState('')

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getAllDonations({
        page,
        limit: DEFAULT_PAGE_SIZE,
        sort: sortBy,
        type: filterType !== 'all' ? filterType : undefined,
        search,
      })

      const donationsList = Array.isArray(data) ? data : data.donations || []
      setDonations(donationsList)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filterType, page, search, sortBy])

  useEffect(() => {
    void Promise.resolve().then(fetchDonations)
  }, [fetchDonations])

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#172033]">All Donations</h1>
          <p className="mt-2 text-gray-600">
            View all donations across the platform
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {/* Filters */}
        <Card className="mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Filter by Type
              </label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value)
                  setPage(1)
                }}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none"
              >
                <option value="all">All Donations</option>
                <option value="one-time">One-time</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setPage(1)
                }}
                className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none"
              >
                <option value="date">Most Recent</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by donor or org..."
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

        {/* Donations List */}
        {donations.length > 0 ? (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation._id || donation.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium text-gray-600">
                          Donor
                        </p>
                        <p className="mt-1 font-semibold text-[#183b2b]">
                          {donation.donor?.name || 'Anonymous'}
                        </p>
                        {donation.donor?.email && (
                          <p className="text-sm text-gray-600">
                            {donation.donor.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-600">
                          Organization
                        </p>
                        <p className="mt-1 font-semibold text-[#183b2b]">
                          {donation.organization?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        }
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-bold text-[#28a66a]">
                      KES {donation.amount}
                    </p>
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                      {donation.type || 'One-time'}
                    </span>
                    {donation.status && (
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          donation.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : donation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {donation.status}
                      </span>
                    )}
                    {donation.transactionId && (
                      <p className="text-xs text-gray-500">
                        TXN: {donation.transactionId}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) =>
                    page <= 3 ? i + 1 : page - 2 + i
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`h-10 w-10 rounded-full font-semibold transition ${
                        page === p
                          ? 'bg-[#183b2b] text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="rounded-full border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <div className="text-center py-12">
              <p className="text-lg font-medium text-gray-600">
                No donations found
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
