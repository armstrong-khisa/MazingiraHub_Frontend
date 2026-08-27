import { useState } from 'react'
import { Link } from 'react-router-dom'

const organizations = [
	{
		id: 1,
		name: 'Green Earth Kenya',
		location: 'Nairobi',
		category: 'Forest Conservation',
		description:
			'Protecting forests and restoring degraded ecosystems through community-led tree planting, seedling care, and environmental education.',
		image:
			'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85',
		raised: 850000,
		goal: 1500000,
	},

	{
		id: 2,
		name: 'Blue Planet Coast',
		location: 'Mombasa',
		category: 'Ocean & Coast',
		description:
			'Working with coastal communities to protect shorelines, reduce plastic pollution, and restore marine ecosystems.',
		image:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
		raised: 420000,
		goal: 800000,
	},

	{
		id: 3,
		name: 'Wildlife Guardians',
		location: 'Tsavo',
		category: 'Wildlife Conservation',
		description:
			'Safeguarding wildlife habitats and supporting communities living alongside elephants and other vital species.',
		image:
			'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=85',
		raised: 1250000,
		goal: 2000000,
	},

	{
		id: 4,
		name: 'Green Communities Initiative',
		location: 'Kisumu',
		category: 'Community',
		description:
			'Helping communities build greener neighborhoods through waste management, tree planting, and environmental education.',
		image:
			'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1200&q=85',
		raised: 310000,
		goal: 600000,
	},

	{
		id: 5,
		name: 'Savannah Conservation Trust',
		location: 'Nakuru',
		category: 'Wildlife Conservation',
		description:
			'Protecting important habitats while supporting sustainable livelihoods for communities surrounding conservation areas.',
		image:
			'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85',
		raised: 690000,
		goal: 1200000,
	},

	{
		id: 6,
		name: 'Clean Rivers Kenya',
		location: 'Nairobi',
		category: 'Clean Water',
		description:
			'Restoring rivers and waterways by reducing pollution and working with local communities on long-term conservation.',
		image:
			'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=85',
		raised: 275000,
		goal: 500000,
	},
]

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

	const filteredOrganizations =
		selectedCategory === 'All Organizations'
			? organizations
			: organizations.filter(
					(organization) =>
						organization.category === selectedCategory
				)

	const formatMoney = (amount) => {
		return `KES ${amount.toLocaleString()}`
	}

	return (
		<>
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
							{filteredOrganizations.map((organization) => {
								const percentage = Math.min(
									Math.round(
										(organization.raised /
											organization.goal) *
											100
									),
									100
								)

								return (
									<article
										key={organization.id}
										className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
									>
										{/* IMAGE */}
										<div className="relative overflow-hidden">
											<img
												src={organization.image}
												alt={organization.name}
												className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
											/>

											<div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#183b2b] shadow-sm">
												{organization.category}
											</div>
										</div>

										{/* CONTENT */}
										<div className="p-6">
											<div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#23945c]">
												<span>●</span>
												{organization.location}
											</div>

											<h3 className="mt-3 text-2xl font-bold text-[#172033]">
												{organization.name}
											</h3>

											<p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-500">
												{organization.description}
											</p>

											{/* PROGRESS */}
											<div className="mt-6">
												<div className="mb-2 flex items-center justify-between text-xs">
													<span className="font-semibold text-gray-700">
														{formatMoney(
															organization.raised
														)}{' '}
														raised
													</span>

													<span className="text-gray-400">
														{percentage}%
													</span>
												</div>

												<div className="h-2 overflow-hidden rounded-full bg-gray-100">
													<div
														className="h-full rounded-full bg-[#28a66a] transition-all duration-500"
														style={{
															width: `${percentage}%`,
														}}
													/>
												</div>

												<p className="mt-2 text-xs text-gray-400">
													Goal:{' '}
													{formatMoney(
														organization.goal
													)}
												</p>
											</div>

											{/* ACTIONS */}
											<div className="mt-6 flex gap-3">
												<Link
													to={`/organizations/${organization.id}`}
													className="flex-1 rounded-full border border-[#183b2b] px-4 py-3 text-center text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
												>
													View Details
												</Link>

												<Link
													to={`/organizations/${organization.id}/donate`}
													className="rounded-full bg-[#183b2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#24543e]"
												>
													Donate
												</Link>
											</div>
										</div>
									</article>
								)
							})}
						</div>
					)}
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
