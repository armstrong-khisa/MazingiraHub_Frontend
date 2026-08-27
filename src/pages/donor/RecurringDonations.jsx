import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import EmptyState from '../../components/EmptyState'
import {
  getRecurringDonations,
  pauseRecurringDonation,
  resumeRecurringDonation,
  cancelRecurringDonation,
} from '../../services/donationApi'

export default function DonorRecurringDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getRecurringDonations()
      setDonations(Array.isArray(data) ? data : data.recurringDonations || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(fetchDonations)
  }, [fetchDonations])

  const handleAction = async (donationId, action) => {
    try {
      setActionLoading(donationId)
      setError('')

      if (action === 'pause') {
        await pauseRecurringDonation(donationId)
      } else if (action === 'resume') {
        await resumeRecurringDonation(donationId)
      } else if (action === 'cancel') {
        if (
          !confirm(
            'Are you sure you want to cancel this recurring donation? This action cannot be undone.'
          )
        ) {
          return
        }
        await cancelRecurringDonation(donationId)
      }

      setSuccess(`Donation ${action}ed successfully`)
      await fetchDonations()

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
            Recurring Donations
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your monthly contributions to environmental organizations
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

        {/* Donations List */}
        {donations.length > 0 ? (
          <div className="space-y-6">
            {donations.map((donation) => (
              <Card key={donation._id || donation.id}>
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#183b2b]">
                      {donation.organization?.name || 'Unknown Organization'}
                    </h3>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Monthly Amount
                        </p>
                        <p className="mt-1 text-xl font-bold text-[#28a66a]">
                          KES {donation.amount}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Frequency
                        </p>
                        <p className="mt-1 text-lg font-semibold text-[#183b2b]">
                          {donation.frequency || 'Monthly'}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Start Date
                        </p>
                        <p className="mt-1 text-lg text-[#183b2b]">
                          {new Date(donation.startDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Next Donation
                        </p>
                        <p className="mt-1 text-lg text-[#183b2b]">
                          {donation.nextDonationDate
                            ? new Date(donation.nextDonationDate).toLocaleDateString()
                            : 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-600">Status</p>
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          donation.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : donation.status === 'paused'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {donation.status || 'Unknown'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 sm:w-40">
                    {donation.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleAction(donation._id || donation.id, 'pause')}
                          disabled={actionLoading === (donation._id || donation.id)}
                          className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-700 transition hover:bg-yellow-100 disabled:opacity-50"
                        >
                          {actionLoading === (donation._id || donation.id)
                            ? 'Pausing...'
                            : 'Pause'}
                        </button>

                        <button
                          onClick={() => handleAction(donation._id || donation.id, 'cancel')}
                          disabled={actionLoading === (donation._id || donation.id)}
                          className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {actionLoading === (donation._id || donation.id)
                            ? 'Cancelling...'
                            : 'Cancel'}
                        </button>
                      </>
                    )}

                    {donation.status === 'paused' && (
                      <button
                        onClick={() => handleAction(donation._id || donation.id, 'resume')}
                        disabled={actionLoading === (donation._id || donation.id)}
                        className="rounded-lg bg-[#28a66a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1f7d4d] disabled:opacity-50"
                      >
                        {actionLoading === (donation._id || donation.id)
                          ? 'Resuming...'
                          : 'Resume'}
                      </button>
                    )}

                    {donation.status === 'cancelled' && (
                      <span className="rounded-lg bg-gray-100 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No active recurring donations"
            message="Set up a recurring donation to support environmental organizations on a monthly basis"
          />
        )}
      </div>
    </main>
  )
}
