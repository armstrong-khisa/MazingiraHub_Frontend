import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Clock3, RefreshCw, XCircle } from 'lucide-react'
import { getPaymentByDonation, queryMpesaPayment } from '../services/paymentApi'

const POLL_INTERVAL = 3000
const MAX_ATTEMPTS = 20

function getPaymentStatus(response) {
	const candidates = []
	const visit = (value, depth = 0) => {
		if (!value || typeof value !== 'object' || depth > 4) return
		candidates.push(value)
		Object.values(value).forEach((child) => visit(child, depth + 1))
	}
	visit(response)

	const payment = candidates.find((value) =>
		value.status || value.payment_status || value.paymentStatus
	) || {}
	const rawStatus = String(
		payment.status || payment.payment_status || payment.paymentStatus || ''
	).toLowerCase()
	const resultCodeValue = candidates.find((value) =>
		value.ResultCode !== undefined ||
		value.result_code !== undefined ||
		value.resultCode !== undefined ||
		value.ResponseCode !== undefined ||
		value.response_code !== undefined ||
		value.responseCode !== undefined
	)
	const resultCode = resultCodeValue?.ResultCode ?? resultCodeValue?.result_code ?? resultCodeValue?.resultCode ?? resultCodeValue?.ResponseCode ?? resultCodeValue?.response_code ?? resultCodeValue?.responseCode
	const callbackMessage = candidates
		.map((value) => value.ResultDesc || value.result_desc || value.message || '')
		.join(' ')
		.toLowerCase()

	if (resultCode !== undefined && resultCode !== null) {
		const normalizedResultCode = String(resultCode)
		if (normalizedResultCode === '0') return 'paid'
		if (normalizedResultCode === '1037') return 'pending'
		return 'cancelled'
	}

	if (['completed', 'complete', 'success', 'successful', 'paid'].includes(rawStatus)) return 'paid'
	if (['failed', 'failure', 'cancelled', 'canceled', 'rejected', 'declined'].includes(rawStatus)) return 'cancelled'
	if (/cancel|declin|reject|fail|insufficient|timeout/.test(callbackMessage)) return 'cancelled'
	return 'pending'
}

function DonationStatus() {
	const [searchParams] = useSearchParams()
	const donationId = searchParams.get('donationId')
	const checkoutRequestId = searchParams.get('checkoutRequestId')
	const amount = searchParams.get('amount')
	const organization = searchParams.get('organization') || 'your organization'
	const [status, setStatus] = useState('pending')
	const [attempt, setAttempt] = useState(0)

	useEffect(() => {
		let active = true
		let timer

		async function checkPayment() {
			if (!donationId && !checkoutRequestId) {
				setStatus('cancelled')
				return
			}

			try {
				const response = checkoutRequestId
					? await queryMpesaPayment(checkoutRequestId)
					: await getPaymentByDonation(donationId)
				const nextStatus = getPaymentStatus(response)

				if (!active) return
				setStatus(nextStatus)
				if (nextStatus === 'pending' && attempt < MAX_ATTEMPTS) {
					timer = setTimeout(() => setAttempt((value) => value + 1), POLL_INTERVAL)
				} else if (nextStatus === 'pending') {
					setStatus('timeout')
				}
			} catch {
				if (active && attempt < MAX_ATTEMPTS) {
					timer = setTimeout(() => setAttempt((value) => value + 1), POLL_INTERVAL)
				}
			}
		}

		void checkPayment()
		return () => {
			active = false
			clearTimeout(timer)
		}
	}, [attempt, checkoutRequestId, donationId])

	const isPaid = status === 'paid'
	const isCancelled = status === 'cancelled'
	const isTimeout = status === 'timeout'

	return (
		<main className="flex min-h-[72vh] items-center justify-center bg-[#f4f0e8] px-4 py-16">
			<section className="w-full max-w-lg rounded-2xl border border-[#d9ddd5] bg-white px-6 py-10 text-center shadow-lg sm:px-12">
				{isPaid ? <CheckCircle2 className="mx-auto h-16 w-16 text-[#23945c]" aria-hidden="true" /> : isCancelled ? <XCircle className="mx-auto h-16 w-16 text-[#c94f45]" aria-hidden="true" /> : <Clock3 className="mx-auto h-16 w-16 text-[#c8754d]" aria-hidden="true" />}
				<p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#c8754d]">{isPaid ? 'Payment paid' : isCancelled ? 'Payment cancelled' : 'Payment in progress'}</p>
				<h1 className="mt-3 text-3xl text-[#163f32]">{isPaid ? 'Thank you for your donation.' : isCancelled ? 'Your donation was cancelled.' : isTimeout ? 'We are still waiting for confirmation.' : 'Check your phone to approve the payment.'}</h1>
				<p className="mx-auto mt-4 max-w-md text-sm text-[#68736d]">{isPaid ? `Your KES ${Number(amount || 0).toLocaleString()} donation to ${organization} was received successfully.` : isCancelled ? 'The M-Pesa payment was cancelled, declined, or could not be processed.' : isTimeout ? 'Your M-Pesa prompt may still be awaiting confirmation. You can check your donation history shortly.' : 'An M-Pesa prompt has been sent. Enter your PIN on your phone while we wait for confirmation.'}</p>
				{status === 'pending' && <div className="mx-auto mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-[#68736d]"><RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> Waiting for M-Pesa...</div>}
				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Link to="/organizations" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#163f32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0d2d25]"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to organizations</Link>
					<Link to="/donor/donations" className="inline-flex items-center justify-center rounded-full border border-[#163f32] px-6 py-3 text-sm font-bold text-[#163f32]">View my donations</Link>
				</div>
			</section>
		</main>
	)
}

export default DonationStatus