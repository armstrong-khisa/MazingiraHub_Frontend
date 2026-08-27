import { useState } from 'react'
import AuthModal from './Auth'
import { useAuth } from '../context/AuthContext'
import { createDonation } from '../services/donationApi'

export default function DonationModal({ organization, onClose, onSuccess }) {
	const [amount, setAmount] = useState('')
	const [projectId, setProjectId] = useState('')
	const [anonymous, setAnonymous] = useState(false)
	const [error, setError] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const { isAuthenticated } = useAuth()
	const [authenticated, setAuthenticated] = useState(isAuthenticated)
	const organizationId = organization._id || organization.id

	if (!authenticated) {
		return <AuthModal onClose={onClose} onLoginSuccess={() => setAuthenticated(true)} />
	}

	async function handleSubmit(event) {
		event.preventDefault()
		setSubmitting(true)
		setError('')
		try {
			await createDonation({
				organization_id: Number(organizationId),
				...(projectId && { project_id: Number(projectId) }),
				amount: Number(amount),
				currency: 'KES',
				donation_type: 'one-time',
				is_anonymous: anonymous,
			})
			onSuccess?.()
			onClose()
		} catch (err) {
			setError(err.message)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm" onClick={onClose}>
			<div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl" onClick={(event) => event.stopPropagation()}>
				<button type="button" onClick={onClose} className="absolute right-5 top-5 text-2xl text-gray-400" aria-label="Close donation form">×</button>
				<p className="eyebrow">MAKE AN IMPACT</p>
				<h2 className="text-2xl font-bold text-[#183b2b]">Support {organization.name}</h2>
				{error && <p className="form-error" role="alert">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					<label>Amount in KES<input required min="1" step="1" type="number" value={amount} onChange={(event) => setAmount(event.target.value)} /></label>
					<label>Project ID (optional)<input min="1" type="number" value={projectId} onChange={(event) => setProjectId(event.target.value)} /></label>
					<label className="checkbox-label"><input type="checkbox" checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} /> Make this donation anonymous</label>
					<button className="button" type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit donation'}</button>
				</form>
			</div>
		</div>
	)
}
