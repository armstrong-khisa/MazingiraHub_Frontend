import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, MapPin, Target } from 'lucide-react'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getOrganization } from '../services/organizationApi'
import DonationModal from '../modals/Donation'

function OrganizationDetails() {
	const { id } = useParams()

	const [organization, setOrganization] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [donationOpen, setDonationOpen] = useState(false)

	useEffect(() => {
		let active = true

		async function fetchOrganization() {
			try {
				const data = await getOrganization(id)

				if (!active) return

				setOrganization(data)
				setError('')
				setLoading(false)
			} catch (err) {
				if (!active) return

				setError(
					err?.message ||
						'Failed to load organization details.'
				)

				setLoading(false)
			}
		}

		void fetchOrganization()

		return () => {
			active = false
		}
	}, [id])

	const formatMoney = (amount) => {
		return `KES ${Number(amount || 0).toLocaleString()}`
	}

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <ErrorMessage message={error} />
	}

	if (!organization) {
		return (
			<section className="flex min-h-[70vh] items-center justify-center bg-[#f7f8f3] px-6">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-[#172033]">
						Organization not found
					</h1>

					<p className="mt-4 text-gray-500">
						The organization you are looking for does not exist.
					</p>

					<Link
						to="/organizations"
						className="mt-8 inline-flex items-center rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Organizations
					</Link>
				</div>
			</section>
		)
	}

	/*
	 * Backend response:
	 *
	 * {
	 *   id: 1,
	 *   name: "Green Future Kenya",
	 *   description: "...",
	 *   mission: "...",
	 *   image_url: "...",
	 *   location: "Nairobi, Kenya",
	 *   moneyRaised: 17500,
	 *   approved: true,
	 *   approved_by: 1,
	 *   user_id: 9
	 * }
	 */

	const name = organization.name || 'Organization'

	const description =
		organization.description ||
		'This organization is working to create positive environmental change.'

	const mission =
		organization.mission ||
		'Working with communities to create lasting environmental change.'

	const location = organization.location || 'Kenya'

	const image = organization.image_url || null

	const moneyRaised = Number(organization.moneyRaised || 0)

	return (
		<>
			<main className="bg-[#f7f8f3]">
				{/* BACK TO ORGANIZATIONS */}
				<div className="mx-auto max-w-7xl px-6 pt-8 lg:px-10 lg:pt-10">
					<Link
						to="/organizations"
						className="inline-flex items-center text-sm font-semibold text-[#23945c] transition hover:text-[#183b2b]"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Organizations
					</Link>
				</div>

				{/* MAIN CONTENT */}
				<section>
					<div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_380px] lg:px-10 lg:py-16">
						{/* LEFT COLUMN */}
						<div>
							{/* ORGANIZATION HEADER */}
							<div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
								<div className="grid gap-8 md:grid-cols-[1fr_280px] md:items-center">
									{/* ORGANIZATION INFORMATION */}
									<div>
										<span className="inline-flex rounded-full bg-[#e1f3e8] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#183b2b]">
											Environmental Organization
										</span>

										<h1 className="mt-5 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
											{name}
										</h1>

										<div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-500">
											<MapPin
												className="h-4 w-4 text-[#23945c]"
												aria-hidden="true"
											/>

											<span>{location}</span>
										</div>

										{organization.approved && (
											<div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e1f3e8] px-4 py-2 text-xs font-bold text-[#183b2b]">
												<div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#23945c] text-white">
													<Check
														className="h-3 w-3"
														aria-hidden="true"
													/>
												</div>

												Verified Organization
											</div>
										)}
									</div>

									{/* ORGANIZATION IMAGE */}
									<div className="overflow-hidden rounded-2xl">
										{image ? (
											<img
												src={image}
												alt={name}
												className="h-[220px] w-full object-cover transition duration-500 hover:scale-[1.02]"
											/>
										) : (
											<div className="flex h-[220px] items-center justify-center bg-[#e8f5ed]">
												<div className="text-center">
													<MapPin className="mx-auto h-8 w-8 text-[#23945c]" />

													<span className="mt-2 block text-sm font-semibold text-[#23945c]">
														No image available
													</span>
												</div>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* ABOUT */}
							<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
								<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
									ABOUT THE ORGANIZATION
								</p>

								<h2 className="mt-4 text-3xl font-bold text-[#172033]">
									About {name}
								</h2>

								<p className="mt-6 text-base leading-8 text-gray-500">
									{description}
								</p>
							</div>

							{/* MISSION */}
							<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
								<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
									OUR MISSION
								</p>

								<h2 className="mt-4 text-3xl font-bold text-[#172033]">
									What we aim to achieve
								</h2>

								<div className="mt-6 rounded-2xl bg-[#f1f8f3] p-6">
									<div className="flex items-start gap-4">
										<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8]">
											<Target
												className="h-5 w-5 text-[#23945c]"
												aria-hidden="true"
											/>
										</div>

										<p className="text-base leading-8 text-gray-600">
											{mission}
										</p>
									</div>
								</div>
							</div>

							{/* ENVIRONMENTAL IMPACT */}
							<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
								<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
									ENVIRONMENTAL IMPACT
								</p>

								<h2 className="mt-4 text-3xl font-bold text-[#172033]">
									Creating positive change
								</h2>

								<div className="mt-7 space-y-4">
									<div className="flex items-start gap-4">
										<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-[#23945c]">
											<Check
												className="h-4 w-4"
												aria-hidden="true"
											/>
										</div>

										<p className="text-sm leading-7 text-gray-600">
											Supporting practical environmental
											action within local communities.
										</p>
									</div>

									<div className="flex items-start gap-4">
										<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-[#23945c]">
											<Check
												className="h-4 w-4"
												aria-hidden="true"
											/>
										</div>

										<p className="text-sm leading-7 text-gray-600">
											Promoting sustainable solutions
											that protect communities and
											ecosystems.
										</p>
									</div>

									<div className="flex items-start gap-4">
										<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-[#23945c]">
											<Check
												className="h-4 w-4"
												aria-hidden="true"
											/>
										</div>

										<p className="text-sm leading-7 text-gray-600">
											Working together with communities
											to build a more sustainable
											future.
										</p>
									</div>
								</div>
							</div>

							{/* LOCATION */}
							<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
								<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
									WHERE WE WORK
								</p>

								<div className="mt-4 flex items-center gap-3">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8]">
										<MapPin
											className="h-5 w-5 text-[#23945c]"
											aria-hidden="true"
										/>
									</div>

									<h2 className="text-3xl font-bold text-[#172033]">
										{location}
									</h2>
								</div>

								<p className="mt-5 text-sm leading-7 text-gray-500">
									This organization operates in{' '}
									{location}, working with local communities
									to create positive environmental change.
								</p>
							</div>
						</div>

						{/* RIGHT COLUMN — DONATION CARD */}
						<aside className="lg:sticky lg:top-8 lg:h-fit">
							<div className="rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5">
								<p className="text-sm font-bold tracking-[0.15em] text-[#23945c]">
									COMMUNITY SUPPORT
								</p>

								<div className="mt-5">
									<p className="text-sm font-medium text-gray-500">
										Total contributions raised
									</p>

									<p className="mt-2 text-4xl font-bold text-[#172033]">
										{formatMoney(moneyRaised)}
									</p>
								</div>

								<div className="my-7 border-t border-gray-100" />

								<h3 className="text-xl font-bold text-[#172033]">
									Support {name}
								</h3>

								<p className="mt-2 text-sm leading-6 text-gray-500">
									Your contribution can help support the
									environmental work being carried out by
									this organization.
								</p>

								<button
									type="button"
									onClick={() => setDonationOpen(true)}
									className="mt-6 flex w-full items-center justify-center rounded-full bg-[#183b2b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
								>
									Donate Now
								</button>

								<p className="mt-4 text-center text-xs text-gray-400">
									Every contribution makes a difference.
								</p>
							</div>

							{/* BACK BUTTON */}
							<Link
								to="/organizations"
								className="mt-4 flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-600 transition hover:border-[#183b2b] hover:text-[#183b2b]"
							>
								<ArrowLeft
									className="mr-2 h-4 w-4"
									aria-hidden="true"
								/>
								Back to Organizations
							</Link>
						</aside>
					</div>
				</section>

				{/* CTA */}
				<section className="bg-[#183b2b]">
					<div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-24">
						<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
							MAKE AN IMPACT
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
							Help {name} continue its work.
						</h2>

						<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
							Your support can help create lasting environmental
							change for communities and ecosystems.
						</p>

						<button
							type="button"
							onClick={() => setDonationOpen(true)}
							className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
						>
							Donate to {name}
						</button>
					</div>
				</section>
			</main>

			{/* DONATION MODAL */}
			{donationOpen && (
				<DonationModal
					organization={organization}
					onClose={() => setDonationOpen(false)}
				/>
			)}
		</>
	)
}

export default OrganizationDetails
