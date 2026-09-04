import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage'
import { applyAsOrganization } from '../services/organizationApi'

export default function ApplyOrganization() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		description: '',
		image_url: '',
	})
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')
	const [submitting, setSubmitting] = useState(false)

	const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

	const submit = async (event) => {
		event.preventDefault()
		setSubmitting(true)
		setError('')
		try {
			await applyAsOrganization(form)
			setSubmitted(true)
		} catch (err) {
			setError(err.message || 'Unable to submit application.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<main className="mx-auto max-w-2xl px-6 py-12">
			<h1 className="text-3xl font-bold text-[#172033]">Organization Application</h1>
			{submitted ? (
				<p className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">Application submitted successfully.</p>
			) : (
				<form onSubmit={submit} className="mt-8 space-y-5">
					{error && <ErrorMessage message={error} onDismiss={() => setError('')} />}
					<label className="block text-sm font-medium text-gray-700">Organization name
						<input required name="name" value={form.name} onChange={update} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">Organization email
						<input required type="email" name="email" value={form.email} onChange={update} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">Organization password
						<input required type="password" name="password" value={form.password} onChange={update} minLength={8} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">Description
						<textarea required name="description" value={form.description} onChange={update} rows={5} className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
					</label>
					<label className="block text-sm font-medium text-gray-700">Image URL (optional)
						<input type="url" name="image_url" value={form.image_url} onChange={update} placeholder="https://example.org/logo.jpg" className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2" />
					</label>
					<button disabled={submitting} className="rounded-full bg-[#183b2b] px-6 py-2 font-semibold text-white">{submitting ? 'Submitting...' : 'Submit Application'}</button>
				</form>
			)}
		</main>
	)
}
