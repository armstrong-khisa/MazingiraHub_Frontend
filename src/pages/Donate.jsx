import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { createDonation } from '../services/donationApi'
import { getOrganization } from '../services/organizationApi'

export default function Donate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [organization, setOrganization] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    amount: '',
    project_id: '',
    currency: 'KES',
    donation_type: 'one-time',
    is_anonymous: false,
  })

  useEffect(() => {
    let active = true
    getOrganization(id)
      .then((data) => {
        if (active) setOrganization(data)
      })
      .catch((err) => {
        if (active) setError(err.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const organizationId = organization._id || organization.id || id
      await createDonation({
        organization_id: Number(organizationId),
        ...(formData.project_id && { project_id: Number(formData.project_id) }),
        amount: Number(formData.amount),
        currency: formData.currency,
        donation_type: formData.donation_type,
        is_anonymous: formData.is_anonymous,
      })
      navigate('/donation-success')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loading />
  if (error && !organization) return <ErrorMessage message={error} />
  if (!organization) return <ErrorMessage message="Organization not found." />

  return (
    <main className="auth-page">
      <section className="auth-card form-card">
        <p className="eyebrow">MAKE AN IMPACT</p>
        <h1>Support {organization.name}</h1>
        <p>Enter your contribution details below.</p>
        {error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
        <form onSubmit={handleSubmit}>
          <label>
            Amount
            <input name="amount" type="number" min="1" step="1" value={formData.amount} onChange={handleChange} required />
          </label>
          <label>
            Project ID (optional)
            <input name="project_id" type="number" min="1" value={formData.project_id} onChange={handleChange} />
          </label>
          <label>
            Donation type
            <select name="donation_type" value={formData.donation_type} onChange={handleChange}>
              <option value="one-time">One-time</option>
              <option value="recurring">Recurring</option>
            </select>
          </label>
          <label className="checkbox-label">
            <input name="is_anonymous" type="checkbox" checked={formData.is_anonymous} onChange={handleChange} />
            Make this donation anonymous
          </label>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit donation'}
          </button>
        </form>
        <Link className="form-footer" to={`/organizations/${id}`}>Back to organization</Link>
      </section>
    </main>
  )
}