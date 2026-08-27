import { useState } from 'react'
import { X } from 'lucide-react'
import AuthModal from './Auth'
import { useAuth } from '../context/AuthContext'
import { createDonation } from '../services/donationApi'
import { initiateMpesaPayment } from '../services/paymentApi'

export default function DonationModal({
	organization,
	onClose,
	onSuccess,
}) {
	const [amount, setAmount] = useState('')
	const [projectId, setProjectId] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const [anonymous, setAnonymous] = useState(false)
	const [error, setError] = useState('')
	const [submitting, setSubmitting] = useState(false)

	const { isAuthenticated, user } = useAuth()
	const [authenticated, setAuthenticated] = useState(isAuthenticated)

	const organizationId = organization?._id || organization?.id

	function normalizePhone(value) {
		const digits = value.replace(/\D/g, '')
		if (digits.startsWith('254')) return digits
		if (digits.startsWith('0')) return `254${digits.slice(1)}`
		return digits
	}

	if (!authenticated) {
		return (
			<AuthModal
				onClose={onClose}
				onLoginSuccess={() => setAuthenticated(true)}
			/>
		)
	}

	async function handleSubmit(event) {
		event.preventDefault()

		if (!amount || Number(amount) <= 0) {
			setError('Please enter a valid donation amount.')
			return
		}

		const normalizedPhone = normalizePhone(phoneNumber || user?.phone || '')
		if (!/^2547\d{8}$/.test(normalizedPhone)) {
			setError('Enter a valid Kenyan phone number, for example 0712345678.')
			return
		}

		setSubmitting(true)
		setError('')

		try {
			const donationResponse = await createDonation({
				organization_id: Number(organizationId),
				...(projectId && {
					project_id: Number(projectId),
				}),
				amount: Number(amount),
				currency: 'KES',
				donation_type: 'one-time',
				is_anonymous: anonymous,
			})
			const donationId = donationResponse.donation?.id || donationResponse.id
			if (!donationId) throw new Error('Donation was created without an ID.')

			await initiateMpesaPayment({
				donation_id: donationId,
				phone_number: normalizedPhone,
			})

			onSuccess?.()
			onClose()
		} catch (err) {
			setError(err.message || 'Unable to process your donation.')
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-[#10251c]/60 px-4 py-6 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative max-h-[calc(100vh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
				onClick={(event) => event.stopPropagation()}
			>
				{/* HEADER */}
				<div className="border-b border-gray-100 bg-[#f7f8f3] px-6 py-4">
					<button
						type="button"
						onClick={onClose}
						className="absolute right-5 top-4 flex h-8 w-8 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-white hover:text-gray-700"
						aria-label="Close donation form"
					>
						<X className="h-4 w-4" aria-hidden="true" />
					</button>

					<p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#23945c]">
						Make an impact
					</p>

					<h2 className="mt-1.5 pr-8 text-xl font-bold tracking-tight text-[#183b2b]">
						Support {organization?.name || 'this organization'}
					</h2>

					<p className="mt-1 text-sm text-gray-500">
						Every contribution helps support environmental work.
					</p>
				</div>

				{/* FORM */}
				<form
					onSubmit={handleSubmit}
					className="space-y-4 px-6 py-4"
				>
					{/* ERROR */}
					{error && (
						<div
							className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
							role="alert"
						>
							{error}
						</div>
					)}

					{/* AMOUNT */}
					<div>
						<label
							htmlFor="donation-amount"
							className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
						>
							Donation Amount
						</label>

						<div className="relative">
							<span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
								KES
							</span>

							<input
								id="donation-amount"
								required
								min="1"
								step="1"
								type="number"
								value={amount}
								onChange={(event) =>
									setAmount(event.target.value)
								}
								placeholder="1,000"
								className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-14 pr-4 text-lg font-semibold text-[#183b2b] outline-none transition placeholder:text-gray-300 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
							/>
						</div>

						{/* QUICK AMOUNTS */}
						<div className="mt-2.5 flex gap-2">
							{[500, 1000, 2500, 5000].map((value) => (
								<button
									key={value}
									type="button"
									onClick={() =>
										setAmount(String(value))
									}
									className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition ${
										amount === String(value)
											? 'border-[#183b2b] bg-[#183b2b] text-white'
											: 'border-gray-200 bg-white text-gray-600 hover:border-[#23945c] hover:text-[#183b2b]'
									}`}
								>
									{value.toLocaleString()}
								</button>
							))}
						</div>
					</div>

					{/* PROJECT */}
					<div>
						<label
							htmlFor="project-id"
							className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
						>
							Project ID
							<span className="ml-1 font-normal normal-case text-gray-400">
								(Optional)
							</span>
						</label>

						<input
							id="project-id"
							min="1"
							type="number"
							value={projectId}
							onChange={(event) =>
								setProjectId(event.target.value)
							}
							placeholder="Enter project ID"
							className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
						/>
					</div>

					<div>
						<label
							htmlFor="donation-phone"
							className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
						>
							M-Pesa Phone Number
						</label>
						<input
							id="donation-phone"
							required
							type="tel"
							value={phoneNumber || user?.phone || ''}
							onChange={(event) => setPhoneNumber(event.target.value)}
							placeholder="0712345678"
							className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
						/>
					</div>

					{/* ANONYMOUS */}
					<label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3.5 transition hover:border-[#d4e8dc] hover:bg-[#f7fbf8]">
						<input
							type="checkbox"
							checked={anonymous}
							onChange={(event) =>
								setAnonymous(event.target.checked)
							}
							className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#183b2b] accent-[#183b2b] focus:ring-[#23945c]"
						/>

						<span>
							<span className="block text-sm font-semibold text-gray-700">
								Make this donation anonymous
							</span>

							<span className="mt-0.5 block text-xs leading-5 text-gray-400">
								Your name won't be displayed publicly.
							</span>
						</span>
					</label>

					{/* SUBMIT */}
					<button
						type="submit"
						disabled={submitting}
						className="flex w-full items-center justify-center rounded-full bg-[#183b2b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#24543e] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
					>
						{submitting ? (
							<>
								<span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
								Processing...
							</>
						) : (
							'Continue with Donation'
						)}
					</button>

					<p className="text-center text-[11px] leading-5 text-gray-400">
						Your donation will be processed securely.
					</p>
				</form>
			</div>
		</div>
	)
}
