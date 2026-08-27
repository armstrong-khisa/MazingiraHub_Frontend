import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getOrganizationDonors } from '../../services/organizationService'

const DEFAULT_PAGE_SIZE = 10

export default function OrganizationDonors() {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        setLoading(true)
        setError('')

        const data = await getOrganizationDonors({
          page,
          limit: DEFAULT_PAGE_SIZE,
          search,
        })

        const donorsList = Array.isArray(data) ? data : data.donors || []
        setDonors(donorsList)
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDonors()
  }, [page, search])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1)
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#172033]">Donors</h1>
          <p className="mt-2 text-gray-600">
            Manage and view your donor community
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {/* Search */}
        <Card className="mb-8">
          <input
            type="text"
            placeholder="Search by donor name or email..."
            value={search}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
          />
        </Card>

        {/* Donors List */}
        {donors.length > 0 ? (
          <div className="space-y-4">
            {donors.map((donor) => (
              <Card key={donor._id || donor.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#183b2b]">
                      {donor.name || 'Unknown Donor'}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{donor.email}</p>
                    {donor.location && (
                      <p className="mt-1 text-sm text-gray-600">{donor.location}</p>
                    )}
                  </div>

                  <div className="grid gap-2 text-right sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500">Total Donated</p>
                      <p className="font-bold text-[#28a66a]">
                        KES {donor.totalDonated || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Donations</p>
                      <p className="font-bold text-[#183b2b]">
                        {donor.donationCount || 0}
                      </p>
                    </div>
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
                No donors found
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Your donors will appear here once they make donations
              </p>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
