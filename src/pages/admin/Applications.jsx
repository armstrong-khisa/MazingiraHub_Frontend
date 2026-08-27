import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import EmptyState from '../../components/EmptyState'
import {
  getApplications,
  approveApplication,
  rejectApplication,
} from '../../services/adminApi'

const DEFAULT_PAGE_SIZE = 10

export default function AdminApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filterStatus, setFilterStatus] = useState('pending')
  const [actionLoading, setActionLoading] = useState(null)
  const [rejectReason, setRejectReason] = useState({})
  const [showRejectForm, setShowRejectForm] = useState(null)

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getApplications({
        page,
        limit: DEFAULT_PAGE_SIZE,
        status: filterStatus !== 'all' ? filterStatus : undefined,
      })

      const list = Array.isArray(data) ? data : data.applications || []
      setApplications(list)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filterStatus, page])

  useEffect(() => {
    void Promise.resolve().then(fetchApplications)
  }, [fetchApplications])

  const handleApprove = async (id) => {
    if (!confirm('Are you sure you want to approve this application?')) return

    try {
      setActionLoading(id)
      setError('')
      await approveApplication(id)
      setSuccess('Application approved!')
      await fetchApplications()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject this application?')) return

    try {
      setActionLoading(id)
      setError('')
      await rejectApplication(id, { reason: rejectReason[id] || '' })
      setSuccess('Application rejected!')
      setShowRejectForm(null)
      setRejectReason({})
      await fetchApplications()
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
          <h1 className="text-3xl font-bold text-[#172033]">
            Organization Applications
          </h1>
          <p className="mt-2 text-gray-600">
            Review and manage organization applications
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

        {/* Filter */}
        <Card className="mb-8">
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
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none md:w-48"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">All</option>
            </select>
          </div>
        </Card>

        {/* Applications List */}
        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((application) => (
              <Card key={application._id || application.id}>
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#183b2b]">
                        {application.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {application.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {application.phone}
                      </p>
                    </div>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        application.status === 'approved'
                          ? 'bg-green-100 text-green-700'
                          : application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="mt-1 text-gray-700">{application.location}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Focus Area</p>
                    <p className="mt-1 text-gray-700">{application.focusArea}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-600">Description</p>
                    <p className="mt-1 text-gray-700">{application.description}</p>
                  </div>

                  {application.website && (
                    <div>
                      <p className="text-sm font-medium text-gray-600">Website</p>
                      <a
                        href={application.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-gray-700 text-[#28a66a] hover:underline"
                      >
                        {application.website}
                      </a>
                    </div>
                  )}

                  {application.appliedAt && (
                    <div>
                      <p className="text-xs text-gray-500">
                        Applied on{' '}
                        {new Date(application.appliedAt).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {application.status === 'pending' && (
                  <div className="mt-6 flex flex-col gap-2 border-t border-gray-200 pt-4 sm:flex-row">
                    <button
                      onClick={() => handleApprove(application._id || application.id)}
                      disabled={actionLoading === (application._id || application.id)}
                      className="flex-1 rounded-lg bg-green-100 px-4 py-2 font-semibold text-green-700 transition hover:bg-green-200 disabled:opacity-50"
                    >
                      {actionLoading === (application._id || application.id)
                        ? 'Approving...'
                        : 'Approve'}
                    </button>

                    <button
                      onClick={() =>
                        setShowRejectForm(
                          showRejectForm === (application._id || application.id)
                            ? null
                            : application._id || application.id
                        )
                      }
                      className="flex-1 rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* Reject Form */}
                {showRejectForm === (application._id || application.id) && (
                  <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Rejection Reason (Optional)
                      </label>
                      <textarea
                        value={rejectReason[application._id || application.id] || ''}
                        onChange={(e) =>
                          setRejectReason({
                            ...rejectReason,
                            [application._id || application.id]: e.target.value,
                          })
                        }
                        rows={3}
                        placeholder="Provide a reason for rejection..."
                        className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#183b2b] focus:outline-none"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReject(application._id || application.id)}
                        disabled={actionLoading === (application._id || application.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        {actionLoading === (application._id || application.id)
                          ? 'Rejecting...'
                          : 'Confirm Rejection'}
                      </button>
                      <button
                        onClick={() => setShowRejectForm(null)}
                        className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            ))}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        ) : (
          <EmptyState
            title="No applications found"
            message={filterStatus === 'pending' ? 'All applications have been reviewed' : 'No applications with this status'}
          />
        )}
      </div>
    </main>
  )
}
