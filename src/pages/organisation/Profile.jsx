import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import {
  getOrganizationProfile,
  updateOrganizationProfile,
} from '../../services/organizationService'

export default function OrganizationProfile() {
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getOrganizationProfile()
        setProfile(data)
        setFormData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      setError('')
      setSuccess('')

      await updateOrganizationProfile(formData)

      setProfile(formData)
      setIsEditing(false)
      setSuccess('Profile updated successfully!')

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#172033]">
            Organization Profile
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your organization's information
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

        {/* Profile Card */}
        <Card>
          {!isEditing ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#183b2b]">
                    {profile?.name || 'Organization Name'}
                  </h2>
                  <p className="mt-1 text-gray-600">{profile?.location || 'N/A'}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full bg-[#183b2b] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#24543e]"
                >
                  Edit
                </button>
              </div>

              <div className="mt-8 space-y-4 border-t border-gray-200 pt-8">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Organization Name
                  </p>
                  <p className="mt-1 text-lg text-[#183b2b]">
                    {profile?.name || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Email</p>
                  <p className="mt-1 text-lg text-[#183b2b]">
                    {profile?.email || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="mt-1 text-lg text-[#183b2b]">
                    {profile?.phone || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="mt-1 text-lg text-[#183b2b]">
                    {profile?.location || 'N/A'}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Focus Area</p>
                  <p className="mt-1 text-lg text-[#183b2b]">
                    {profile?.focusArea || 'N/A'}
                  </p>
                </div>

                {profile?.website && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">Website</p>
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-lg text-[#28a66a] hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}

                {profile?.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Description
                    </p>
                    <p className="mt-1 text-lg text-[#183b2b]">
                      {profile.description}
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Focus Area
                </label>
                <select
                  name="focusArea"
                  value={formData.focusArea || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                >
                  <option value="">Select a focus area</option>
                  <option value="Environment & conservation">
                    Environment & Conservation
                  </option>
                  <option value="Education">Education</option>
                  <option value="Health & wellbeing">
                    Health & Wellbeing
                  </option>
                  <option value="Livelihoods">Livelihoods</option>
                  <option value="Community development">
                    Community Development
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setFormData(profile)
                  }}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </main>
  )
}
