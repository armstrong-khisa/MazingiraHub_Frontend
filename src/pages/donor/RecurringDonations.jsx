import { useCallback, useEffect, useState } from 'react'
import { Pause, Play, RefreshCw, X } from 'lucide-react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import EmptyState from '../../components/EmptyState'
import Card from '../../components/Card'
import {
  cancelRecurringDonation,
  getRecurringDonations,
  pauseRecurringDonation,
  resumeRecurringDonation,
  updateRecurringDonation,
} from '../../services/donationApi'

export default function DonorRecurringDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(null)

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getRecurringDonations()
      setDonations(Array.isArray(data) ? data : data.recurringDonations || [])
    } catch (err) {
      setError(err.message || 'Failed to load recurring donations.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(fetchDonations)
  }, [fetchDonations])

  const getId = (donation) => donation.id || donation._id || donation.recurring_donation_id
  const getStatus = (donation) => donation.status || (donation.is_active ? 'active' : 'paused')
  const getOrganization = (donation) => donation.organization?.name || donation.organization_name || 'Organization'

  const runAction = async (donation, action) => {
    const id = getId(donation)
    if (!id) return
    try {
      setActionLoading(id)
      setError('')
      if (action === 'pause') await pauseRecurringDonation(id)
      if (action === 'resume') await resumeRecurringDonation(id)
      if (action === 'cancel') await cancelRecurringDonation(id)
      await fetchDonations()
    } catch (err) {
      setError(err.message || 'Unable to update recurring donation.')
    } finally {
      setActionLoading(null)
    }
  }

  const updateReminder = async (donation, reminderTime) => {
    const id = getId(donation)
    if (!id || !reminderTime || reminderTime === donation.reminder_time) return
    try {
      setActionLoading(id)
      await updateRecurringDonation(id, { reminder_time: reminderTime })
      setDonations((current) => current.map((item) => getId(item) === id ? { ...item, reminder_time: reminderTime } : item))
    } catch (err) {
      setError(err.message || 'Unable to update reminder time.')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-[#f7f8f3]">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">Donor account</p>
          <h1 className="mt-2 text-3xl font-bold text-[#172033]">Recurring donations</h1>
          <p className="mt-2 text-sm text-gray-500">Manage monthly contributions and choose when reminders arrive.</p>
        </div>
        {error && <div className="mb-6"><ErrorMessage message={error} onDismiss={() => setError('')} /></div>}
        {donations.length === 0 ? (
          <EmptyState title="No recurring donations" message="Choose a monthly donation when supporting an organization." />
        ) : (
          <div className="space-y-4">
            {donations.map((donation) => {
              const id = getId(donation)
              const status = getStatus(donation)
              const busy = actionLoading === id
              return (
                <Card key={id}>
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="font-bold text-[#183b2b]">{getOrganization(donation)}</h2>
                      <p className="mt-1 text-sm text-gray-600">KES {Number(donation.amount || 0).toLocaleString()} monthly</p>
                      <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === 'active' ? 'bg-green-100 text-green-700' : status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{status}</span>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <label className="text-sm text-gray-600">Reminder<input type="time" defaultValue={donation.reminder_time || donation.reminderTime || '09:00'} onBlur={(event) => updateReminder(donation, event.target.value)} disabled={busy} className="ml-2 rounded-lg border border-gray-200 px-2 py-1 text-sm" /></label>
                      {status === 'active' && <button type="button" onClick={() => runAction(donation, 'pause')} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"><Pause className="h-4 w-4" />Pause</button>}
                      {status === 'paused' && <button type="button" onClick={() => runAction(donation, 'resume')} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#183b2b] px-4 py-2 text-sm font-semibold text-white"><Play className="h-4 w-4" />Resume</button>}
                      {status !== 'cancelled' && <button type="button" onClick={() => runAction(donation, 'cancel')} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700"><X className="h-4 w-4" />Cancel</button>}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
        <div className="mt-8 flex items-center gap-2 text-sm text-gray-500"><RefreshCw className="h-4 w-4" /> Reminders follow your local time.</div>
      </div>
    </main>
  )
}
