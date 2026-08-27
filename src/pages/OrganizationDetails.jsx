import { Link, useParams } from 'react-router-dom'

const organizations = [
	{
		id: 1,
		name: 'Green Earth Kenya',
		location: 'Nairobi',
		category: 'Forest Conservation',
		description:
			'Protecting forests and restoring degraded ecosystems through community-led tree planting, seedling care, and environmental education.',
		image:
			'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85',
		raised: 850000,
		goal: 1500000,
		about:
			'Green Earth Kenya works with local communities to restore forests, protect biodiversity, and create a healthier environment for future generations.',
		impact: [
			'Planting and caring for native trees',
			'Restoring degraded forest areas',
			'Supporting local environmental education',
			'Working with communities on conservation',
		],
	},

	{
		id: 2,
		name: 'Blue Planet Coast',
		location: 'Mombasa',
		category: 'Ocean & Coast',
		description:
			'Working with coastal communities to protect shorelines, reduce plastic pollution, and restore marine ecosystems.',
		image:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
		raised: 420000,
		goal: 800000,
		about:
			'Blue Planet Coast works with coastal communities to protect marine ecosystems and build cleaner, healthier coastlines.',
		impact: [
			'Reducing plastic pollution',
			'Restoring coastal ecosystems',
			'Organizing community clean-ups',
			'Supporting marine conservation education',
		],
	},

	{
		id: 3,
		name: 'Wildlife Guardians',
		location: 'Tsavo',
		category: 'Wildlife Conservation',
		description:
			'Safeguarding wildlife habitats and supporting communities living alongside elephants and other vital species.',
		image:
			'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1400&q=85',
		raised: 1250000,
		goal: 2000000,
		about:
			'Wildlife Guardians works to protect wildlife habitats while helping communities and wildlife coexist sustainably.',
		impact: [
			'Protecting wildlife habitats',
			'Supporting conservation communities',
			'Promoting human-wildlife coexistence',
			'Supporting wildlife education',
		],
	},

	{
		id: 4,
		name: 'Green Communities Initiative',
		location: 'Kisumu',
		category: 'Community',
		description:
			'Helping communities build greener neighborhoods through waste management, tree planting, and environmental education.',
		image:
			'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1400&q=85',
		raised: 310000,
		goal: 600000,
		about:
			'Green Communities Initiative helps communities create cleaner and greener neighborhoods through practical local projects.',
		impact: [
			'Community tree planting',
			'Waste management programs',
			'Environmental education',
			'Greener neighborhood projects',
		],
	},

	{
		id: 5,
		name: 'Savannah Conservation Trust',
		location: 'Nakuru',
		category: 'Wildlife Conservation',
		description:
			'Protecting important habitats while supporting sustainable livelihoods for communities surrounding conservation areas.',
		image:
			'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
		raised: 690000,
		goal: 1200000,
		about:
			'Savannah Conservation Trust protects important habitats while supporting sustainable livelihoods for surrounding communities.',
		impact: [
			'Habitat protection',
			'Wildlife conservation',
			'Community livelihood programs',
			'Environmental education',
		],
	},

	{
		id: 6,
		name: 'Clean Rivers Kenya',
		location: 'Nairobi',
		category: 'Clean Water',
		description:
			'Restoring rivers and waterways by reducing pollution and working with local communities on long-term conservation.',
		image:
			'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1400&q=85',
		raised: 275000,
		goal: 500000,
		about:
			'Clean Rivers Kenya works with communities to restore waterways and protect important sources of clean water.',
		impact: [
			'River restoration',
			'Pollution reduction',
			'Community clean-ups',
			'Clean water education',
		],
	},
]

function OrganizationDetails() {
	const { id } = useParams()

	const organization = organizations.find(
		(item) => item.id === Number(id)
	)

	const formatMoney = (amount) => {
		return `KES ${amount.toLocaleString()}`
	}

	// If organization doesn't exist
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
						className="mt-8 inline-flex rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white"
					>
						Back to Organizations
					</Link>
				</div>
			</section>
		)
	}

	const percentage = Math.min(
		Math.round((organization.raised / organization.goal) * 100),
		100
	)

	const remaining = Math.max(
		organization.goal - organization.raised,
		0
	)

	return (
		<>
			{/* HERO IMAGE */}
			<section className="relative">
				<div className="h-[420px] overflow-hidden lg:h-[520px]">
					<img
						src={organization.image}
						alt={organization.name}
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

				<div className="absolute bottom-0 left-0 right-0">
					<div className="mx-auto max-w-7xl px-6 pb-12 lg:px-10">
						<div className="max-w-4xl">
							<span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#183b2b]">
								{organization.category}
							</span>

							<h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
								{organization.name}
							</h1>

							<div className="mt-4 flex items-center gap-2 text-sm font-medium text-white/80">
								<span>●</span>
								{organization.location}, Kenya
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* MAIN CONTENT */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_380px] lg:px-10 lg:py-24">
					{/* LEFT */}
					<div>
						<div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
							<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
								ABOUT THE ORGANIZATION
							</p>

							<h2 className="mt-4 text-3xl font-bold text-[#172033]">
								{organization.name}
							</h2>

							<p className="mt-6 text-base leading-8 text-gray-500">
								{organization.about}
							</p>

							<p className="mt-5 text-base leading-8 text-gray-500">
								{organization.description}
							</p>
						</div>

						{/* IMPACT */}
						<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
							<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
								WHAT YOUR SUPPORT HELPS WITH
							</p>

							<h2 className="mt-4 text-3xl font-bold text-[#172033]">
								Our environmental impact
							</h2>

							<div className="mt-7 space-y-4">
								{organization.impact.map((item) => (
									<div
										key={item}
										className="flex items-start gap-4"
									>
										<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-sm font-bold text-[#23945c]">
											✓
										</div>

										<p className="text-sm leading-7 text-gray-600">
											{item}
										</p>
									</div>
								))}
							</div>
						</div>

						{/* LOCATION */}
						<div className="mt-7 rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-10">
							<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
								WHERE WE WORK
							</p>

							<h2 className="mt-4 text-3xl font-bold text-[#172033]">
								{organization.location}, Kenya
							</h2>

							<p className="mt-4 text-sm leading-7 text-gray-500">
								Our work is focused on creating positive
								environmental change together with local
								communities.
							</p>
						</div>
					</div>

					{/* DONATION CARD */}
					<aside className="lg:sticky lg:top-8 lg:h-fit">
						<div className="rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5">
							<p className="text-sm font-bold tracking-[0.15em] text-[#23945c]">
								PROJECT FUNDING
							</p>

							<div className="mt-5 flex items-end justify-between">
								<div>
									<p className="text-3xl font-bold text-[#172033]">
										{formatMoney(
											organization.raised
										)}
									</p>

									<p className="mt-1 text-sm text-gray-500">
										raised so far
									</p>
								</div>

								<p className="text-sm font-bold text-[#23945c]">
									{percentage}%
								</p>
							</div>

							{/* PROGRESS BAR */}
							<div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-100">
								<div
									className="h-full rounded-full bg-[#28a66a] transition-all"
									style={{
										width: `${percentage}%`,
									}}
								/>
							</div>

							<div className="mt-3 flex justify-between text-xs text-gray-400">
								<span>
									Goal: {formatMoney(organization.goal)}
								</span>

								<span>
									{formatMoney(remaining)} left
								</span>
							</div>

							<div className="my-7 border-t border-gray-100" />

							<h3 className="text-xl font-bold text-[#172033]">
								Support this organization
							</h3>

							<p className="mt-2 text-sm leading-6 text-gray-500">
								Your contribution can help support the work
								being done by this organization.
							</p>

							<Link
								to={`/organizations/${organization.id}/donate`}
								className="mt-6 flex w-full items-center justify-center rounded-full bg-[#183b2b] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
							>
								Donate Now
							</Link>

							<p className="mt-4 text-center text-xs text-gray-400">
								Every contribution makes a difference.
							</p>
						</div>

						<Link
							to="/organizations"
							className="mt-4 flex w-full items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-4 text-sm font-semibold text-gray-600 transition hover:border-[#183b2b] hover:text-[#183b2b]"
						>
							← Back to Organizations
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
						Help {organization.name} continue its work.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
						Your support can help create lasting environmental
						change for communities and ecosystems.
					</p>

					<Link
						to={`/organizations/${organization.id}/donate`}
						className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
					>
						Donate to {organization.name}
					</Link>
				</div>
			</section>
		</>
	)
}

export default OrganizationDetails
