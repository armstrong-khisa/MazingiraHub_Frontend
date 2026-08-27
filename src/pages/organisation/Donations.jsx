import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getOrganizationDonations } from '../../services/donationApi'

const DEFAULT_PAGE_SIZE = 10

export default function OrganizationDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('date')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getOrganizationDonations({
          page,
          limit: DEFAULT_PAGE_SIZE,
          sort: sortBy,
          type: filterType !== 'all' ? filterType : undefined,
        })

        const donationsList = Array.isArray(data) ? data : data.donations || []
        setDonations(donationsList)
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [page, sortBy, filterType])

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#172033]">Donations</h1>
          <p className="mt-2 text-gray-600">
            Track all donations received by your organization
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
          <div className="grid gap-4 md:grid-cols-2">
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
          </div>
        </Card>

        {/* Donations List */}
        {donations.length > 0 ? (
          <div className="space-y-4">
            {donations.map((donation) => (
              <Card key={donation._id || donation.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#183b2b]">
                      {donation.donor?.name || 'Anonymous Donor'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {donation.donor?.email || 'No email'}
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      {new Date(donation.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
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
                    {donation.transactionId && (
                      <p className="text-xs text-gray-500">
                        ID: {donation.transactionId}
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
                No donations yet
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Donations will appear here once you receive them
              </p>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
