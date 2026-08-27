import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import EmptyState from '../../components/EmptyState'
import { getDonorDonations } from '../../services/donationApi'

const DEFAULT_PAGE_SIZE = 10

export default function DonorMyDonations() {
	const [donations, setDonations] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)
	const [sortBy, setSortBy] = useState('date')
	const [filterStatus, setFilterStatus] = useState('all')

	useEffect(() => {
		const fetchDonations = async () => {
			try {
				setLoading(true)
				setError('')

				const data = await getDonorDonations({
					page,
					limit: DEFAULT_PAGE_SIZE,
					sort: sortBy,
					status: filterStatus !== 'all' ? filterStatus : undefined,
				})

				const donationsList = Array.isArray(data)
					? data
					: data.donations || []

				setDonations(donationsList)
				setTotalPages(data.totalPages || 1)
			} catch (err) {
				setError(err.message || 'Failed to load donations.')
			} finally {
				setLoading(false)
			}
		}

		fetchDonations()
	}, [page, sortBy, filterStatus])

	const handleStatusChange = (e) => {
		setFilterStatus(e.target.value)
		setPage(1)
	}

	const handleSortChange = (e) => {
		setSortBy(e.target.value)
		setPage(1)
	}

	const getStatusStyles = (status) => {
		switch (status?.toLowerCase()) {
			case 'completed':
				return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'

			case 'pending':
				return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'

			case 'failed':
				return 'bg-red-50 text-red-700 ring-1 ring-red-200'

			default:
				return 'bg-gray-100 text-gray-600 ring-1 ring-gray-200'
		}
	}

	const formatDate = (date) => {
		if (!date) return 'Date unavailable'

		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
	}

	const formatAmount = (amount) => {
		const value = Number(amount || 0)

		return value.toLocaleString('en-KE', {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		})
	}

	if (loading) {
		return <Loading />
	}

	return (
		<main className="min-h-screen bg-[#f7f8f3]">
			<div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">

				{/* HEADER */}
				<div className="mb-7">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
						Your giving
					</p>

					<div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
						<div>
							<h1 className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
								Donation History
							</h1>

							<p className="mt-2 text-sm text-gray-500">
								Keep track of your contributions and their
								current status.
							</p>
						</div>

						{donations.length > 0 && (
							<div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-gray-500 ring-1 ring-gray-200">
								{donations.length}{' '}
								{donations.length === 1
									? 'donation'
									: 'donations'}
							</div>
						)}
					</div>
				</div>

				{/* ERROR */}
				{error && (
					<div className="mb-6">
						<ErrorMessage
							message={error}
							onDismiss={() => setError('')}
						/>
					</div>
				)}

				{/* FILTERS */}
				<div className="mb-7 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
					<div className="grid gap-4 sm:grid-cols-2">
						<div>
							<label
								htmlFor="status"
								className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
							>
								Status
							</label>

							<select
								id="status"
								value={filterStatus}
								onChange={handleStatusChange}
								className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
							>
								<option value="all">All Donations</option>
								<option value="completed">Completed</option>
								<option value="pending">Pending</option>
								<option value="failed">Failed</option>
							</select>
						</div>

						<div>
							<label
								htmlFor="sort"
								className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
							>
								Sort by
							</label>

							<select
								id="sort"
								value={sortBy}
								onChange={handleSortChange}
								className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm font-medium text-gray-700 outline-none transition focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
							>
								<option value="date">Most Recent</option>
								<option value="amount-high">
									Amount: High to Low
								</option>
								<option value="amount-low">
									Amount: Low to High
								</option>
							</select>
						</div>
					</div>
				</div>

				{/* DONATIONS */}
				{donations.length > 0 ? (
					<div className="space-y-3">
						{donations.map((donation) => {
							const status = donation.status || 'Unknown'
							const organization =
								donation.organization?.name ||
								'Unknown Organization'

							return (
								<Card
									key={donation._id || donation.id}
									hover
									className="border border-gray-200 bg-white shadow-sm transition hover:border-[#b9dec7] hover:shadow-md"
								>
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

										{/* LEFT */}
										<div className="min-w-0 flex-1">
											<div className="flex items-start gap-3">
												<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e1f3e8] text-[#23945c]">
													<Heart className="h-5 w-5" aria-hidden="true" />
												</div>

												<div className="min-w-0">
													<h3 className="truncate text-base font-bold text-[#183b2b]">
														{organization}
													</h3>

													<p className="mt-1 text-xs text-gray-500">
														{formatDate(
															donation.createdAt
														)}
													</p>
												</div>
											</div>

											{donation.description && (
												<p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-500 sm:ml-[52px]">
													{donation.description}
												</p>
											)}

											{donation.transactionId && (
												<p className="mt-2 text-[11px] text-gray-400 sm:ml-[52px]">
													Transaction:{' '}
													<span className="font-medium text-gray-500">
														{donation.transactionId}
													</span>
												</p>
											)}
										</div>

										{/* RIGHT */}
										<div className="flex items-center justify-between gap-5 border-t border-gray-100 pt-3 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
											<div className="text-left sm:text-right">
												<p className="text-xl font-bold tracking-tight text-[#183b2b]">
													KES{' '}
													{formatAmount(
														donation.amount
													)}
												</p>

												<span
													className={`mt-1.5 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${getStatusStyles(
														status
													)}`}
												>
													{status}
												</span>
											</div>
										</div>
									</div>
								</Card>
							)
						})}

						{/* PAGINATION */}
						<div className="pt-4">
							<Pagination
								page={page}
								totalPages={totalPages}
								onPageChange={setPage}
							/>
						</div>
					</div>
				) : (
					<div className="rounded-2xl border border-gray-200 bg-white py-4 shadow-sm">
						<EmptyState
							title="No donations yet"
							message="Start supporting environmental organizations today."
						/>
					</div>
				)}
			</div>
		</main>
	)
}
