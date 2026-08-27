import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OrganizationCard from '../components/OrganizationCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getOrganizations } from '../services/organizationApi'
import DonationModal from '../modals/Donation'

const categories = [
	'All Organizations',
	'Forest Conservation',
	'Wildlife Conservation',
	'Ocean & Coast',
	'Clean Water',
	'Community',
]

function Organizations() {
	const [selectedCategory, setSelectedCategory] =
		useState('All Organizations')
	const [organizations, setOrganizations] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const [selectedOrganization, setSelectedOrganization] = useState(null)

	useEffect(() => {
		let active = true

		async function fetchOrganizations() {
			try {
				const data = await getOrganizations()
				if (active) setOrganizations(Array.isArray(data) ? data : [])
			} catch (err) {
				if (active) setError(err.message)
			} finally {
				if (active) setLoading(false)
			}
		}

		void fetchOrganizations()
		return () => {
			active = false
		}
	}, [])

	const filteredOrganizations =
		selectedCategory === 'All Organizations'
			? organizations
			: organizations.filter(
					(organization) =>
						organization.category === selectedCategory
				)

	if (loading) return <Loading />

	return (
		<>
			{error && (
				<div className="shell" role="alert">
					<ErrorMessage message={error} onDismiss={() => setError('')} />
				</div>
			)}
			{/* HERO */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-4xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
							EXPLORE ENVIRONMENTAL ACTION
						</p>

						<h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
							Organizations creating
							<br />
							change across Kenya.
						</h1>

						<p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
							Choose a cause that speaks to you. Each organization
							is working alongside communities to create
							measurable, lasting environmental impact.
						</p>
					</div>
				</div>
			</section>

			{/* FILTERS */}
			<section className="border-b border-gray-200 bg-white">
				<div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-6 lg:px-10">
					{categories.map((category) => (
						<button
							key={category}
							type="button"
							onClick={() => setSelectedCategory(category)}
							className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
								selectedCategory === category
									? 'bg-[#183b2b] text-white'
									: 'border border-gray-200 text-gray-600 hover:border-[#183b2b] hover:text-[#183b2b]'
							}`}
						>
							{category}
						</button>
					))}
				</div>
			</section>

			{/* ORGANIZATIONS */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
					<div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<p className="text-sm font-bold tracking-[0.15em] text-[#23945c]">
								VERIFIED ORGANIZATIONS
							</p>

							<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
								Find a cause to support.
							</h2>
						</div>

						<p className="text-sm text-gray-500">
							{filteredOrganizations.length}{' '}
							{filteredOrganizations.length === 1
								? 'organization'
								: 'organizations'}
						</p>
					</div>

					{filteredOrganizations.length === 0 ? (
						<div className="rounded-3xl bg-white p-12 text-center">
							<h3 className="text-2xl font-bold text-[#172033]">
								No organizations found
							</h3>

							<p className="mt-3 text-gray-500">
								Try selecting a different category.
							</p>
						</div>
					) : (
						<div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
							{filteredOrganizations.map((organization) => (
								<OrganizationCard
									key={organization._id || organization.id}
									organisation={organization}
									onDonate={setSelectedOrganization}
								/>
							))}
						</div>
					)}
					{selectedOrganization && <DonationModal organization={selectedOrganization} onClose={() => setSelectedOrganization(null)} />}
				</div>
			</section>

			{/* BOTTOM CTA */}
			<section className="bg-white">
				<div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
					<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
						READY TO MAKE A DIFFERENCE?
					</p>

					<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
						Your giving can help protect what matters.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
						Choose an organization, support their work, and follow
						the impact your contribution makes.
					</p>

					<Link
						to="/"
						className="mt-8 inline-flex rounded-full bg-[#183b2b] px-8 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
					>
						Back to Home
					</Link>
				</div>
			</section>
		</>
	)
}

export default Organizations
