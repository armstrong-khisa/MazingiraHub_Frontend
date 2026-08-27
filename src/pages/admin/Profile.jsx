import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getAdminProfile, updateAdminProfile } from '../../services/adminApi'

export default function AdminProfile() {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    getAdminProfile()
      .then((data) => {
        setProfile(data)
        setFormData(data)
      })
      .catch((err) => setError(err.message || 'Failed to load profile.'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSubmitting(true)
      setError('')
      const data = await updateAdminProfile(formData)
      setProfile(data)
      setFormData(data)
      setIsEditing(false)
      setSuccess('Profile updated successfully.')
    } catch (err) {
      setError(err.message || 'Failed to update profile.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-10">
        <h1 className="text-3xl font-bold text-[#172033]">Admin Profile</h1>
        <p className="mt-2 text-gray-600">Manage your administrator account</p>
        {error && <div className="mt-6"><ErrorMessage message={error} onDismiss={() => setError('')} /></div>}
        {success && <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">{success}</div>}
        <Card className="mt-8">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-gray-700">Full name
                <input name="full_name" value={formData.full_name || ''} onChange={(event) => setFormData({ ...formData, full_name: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" required />
              </label>
              <label className="block text-sm font-medium text-gray-700">Phone
                <input name="phone" value={formData.phone || ''} onChange={(event) => setFormData({ ...formData, phone: event.target.value })} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
              </label>
              <div className="flex gap-3">
                <button disabled={submitting} className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white">{submitting ? 'Saving...' : 'Save Changes'}</button>
                <button type="button" onClick={() => { setIsEditing(false); setFormData(profile) }} className="rounded-full border border-gray-300 px-6 py-2 font-semibold text-gray-700">Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#183b2b]">{profile?.full_name || 'Administrator'}</h2>
                  <p className="mt-1 text-gray-600">{profile?.email || 'N/A'}</p>
                </div>
                <button onClick={() => setIsEditing(true)} className="rounded-full bg-[#183b2b] px-4 py-2 text-sm font-semibold text-white">Edit</button>
              </div>
              <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                <p><span className="block text-sm font-medium text-gray-600">Full Name</span><span className="text-lg text-[#183b2b]">{profile?.full_name || 'N/A'}</span></p>
                <p><span className="block text-sm font-medium text-gray-600">Email</span><span className="text-lg text-[#183b2b]">{profile?.email || 'N/A'}</span></p>
                <p><span className="block text-sm font-medium text-gray-600">Phone</span><span className="text-lg text-[#183b2b]">{profile?.phone || 'N/A'}</span></p>
                <p><span className="block text-sm font-medium text-gray-600">Role</span><span className="text-lg capitalize text-[#183b2b]">{profile?.role || 'admin'}</span></p>
              </div>
            </>
          )}
        </Card>
      </div>
    </main>
  )
}