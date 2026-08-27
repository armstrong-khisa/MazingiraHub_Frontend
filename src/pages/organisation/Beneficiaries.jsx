import { useCallback, useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import {
  getBeneficiaries,
  createBeneficiary,
  updateBeneficiary,
  deleteBeneficiary,
} from '../../services/beneficiaryApi'

const DEFAULT_PAGE_SIZE = 10

export default function OrganizationBeneficiaries() {
  const [beneficiaries, setBeneficiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'active',
  })
  const [submitting, setSubmitting] = useState(false)

  const fetchBeneficiaries = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const data = await getBeneficiaries({
        page,
        limit: DEFAULT_PAGE_SIZE,
      })

      const list = Array.isArray(data) ? data : data.beneficiaries || []
      setBeneficiaries(list)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    void Promise.resolve().then(fetchBeneficiaries)
  }, [fetchBeneficiaries])

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

      if (editingId) {
        await updateBeneficiary(editingId, formData)
        setSuccess('Beneficiary updated successfully!')
      } else {
        await createBeneficiary(formData)
        setSuccess('Beneficiary created successfully!')
      }

      setFormData({ name: '', email: '', phone: '', location: '', status: 'active' })
      setEditingId(null)
      setShowForm(false)
      await fetchBeneficiaries()

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (beneficiary) => {
    setFormData(beneficiary)
    setEditingId(beneficiary._id || beneficiary.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this beneficiary?')) return

    try {
      setError('')
      await deleteBeneficiary(id)
      setSuccess('Beneficiary deleted successfully!')
      await fetchBeneficiaries()
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#172033]">Beneficiaries</h1>
            <p className="mt-2 text-gray-600">
              Manage your beneficiary database
            </p>
          </div>
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true)
                setEditingId(null)
                setFormData({ name: '', email: '', phone: '', location: '', status: 'active' })
              }}
              className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e]"
            >
              Add Beneficiary
            </button>
          )}
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

        {/* Form */}
        {showForm && (
          <Card className="mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#183b2b] focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white transition hover:bg-[#24543e] disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingId(null)
                    setFormData({ name: '', email: '', phone: '', location: '', status: 'active' })
                  }}
                  className="rounded-full border border-gray-300 px-6 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Card>
        )}

        {/* Beneficiaries List */}
        {beneficiaries.length > 0 ? (
          <div className="space-y-4">
            {beneficiaries.map((beneficiary) => (
              <Card key={beneficiary._id || beneficiary.id} hover>
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#183b2b]">
                      {beneficiary.name}
                    </h3>
                    {beneficiary.email && (
                      <p className="mt-1 text-sm text-gray-600">{beneficiary.email}</p>
                    )}
                    {beneficiary.phone && (
                      <p className="text-sm text-gray-600">{beneficiary.phone}</p>
                    )}
                    {beneficiary.location && (
                      <p className="text-sm text-gray-600">{beneficiary.location}</p>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        beneficiary.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {beneficiary.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(beneficiary)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(beneficiary._id || beneficiary.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
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
          !showForm && (
            <Card>
              <div className="text-center py-12">
                <p className="text-lg font-medium text-gray-600">
                  No beneficiaries yet
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Add your first beneficiary to get started
                </p>
              </div>
            </Card>
          )
        )}
      </div>
    </main>
  )
}
