import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import OrganizationCard from '../components/OrganizationCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getOrganizations } from '../services/organizationApi'

const stats = [
	{
		number: '42',
		label: 'Organizations Supported',
	},
	{
		number: 'KES 4.8M',
		label: 'Total Donations',
	},
	{
		number: '85',
		label: 'Environmental Projects',
	},
	{
		number: '3,600+',
		label: 'Active Donors',
	},
]

function Home() {
	const [organizations, setOrganizations] = useState([])
	const [loadingOrganizations, setLoadingOrganizations] = useState(true)
	const [organizationError, setOrganizationError] = useState('')

	useEffect(() => {
		let active = true
		getOrganizations()
			.then((data) => {
				if (active) setOrganizations(Array.isArray(data) ? data.slice(0, 3) : [])
			})
			.catch((err) => {
				if (active) setOrganizationError(err.message)
			})
			.finally(() => {
				if (active) setLoadingOrganizations(false)
			})
		return () => {
			active = false
		}
	}, [])

	return (
		<>
			{/* HERO */}
			<section className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 lg:grid-cols-2 lg:px-10 lg:py-16">
				<div className="max-w-2xl">
					<p className="mb-6 text-sm font-bold tracking-[0.2em] text-[#23945c]">
						ENVIRONMENTAL GIVING, MADE SIMPLE
					</p>

					<h1 className="text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-[#172033] sm:text-6xl lg:text-7xl">
						Give Today.
						<br />
						Protect Tomorrow.
					</h1>

					<p className="mt-7 max-w-xl text-base leading-7 text-gray-500 sm:text-lg sm:leading-8">
						MazingiraHub makes it easier to support verified
						environmental organizations through one-time and
						recurring donations—so every contribution can protect
						the places we all depend on.
					</p>

					<div className="mt-9 flex flex-wrap gap-4">
						<Link
							to="/organizations"
							className="rounded-full bg-[#183b2b] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#24543e]"
						>
							Donate Now
						</Link>

						<Link
							to="/organizations"
							className="rounded-full border border-[#183b2b] px-7 py-4 text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
						>
							Explore Organizations
						</Link>
					</div>

					<div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
						<span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#dff5e8] font-bold text-[#23945c]">
							✓
						</span>

						<span>
							Verified organizations. Clear impact. Meaningful
							giving.
						</span>
					</div>
				</div>

				{/* HERO IMAGE */}
				<div className="relative">
					<div className="overflow-hidden rounded-[2rem]">
						<img
							src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=90"
							alt="Forest"
							className="h-[500px] w-full object-cover sm:h-[600px]"
						/>
					</div>

					<div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.15)] sm:left-8 sm:right-auto sm:max-w-sm">
						<p className="text-xs font-bold tracking-[0.15em] text-[#23945c]">
							YOUR IMPACT STARTS HERE
						</p>

						<p className="mt-2 text-sm leading-6 text-gray-600">
							Support projects that protect ecosystems and
							strengthen communities.
						</p>
					</div>
				</div>
			</section>

			{/* STATS */}
			<section className="border-y border-gray-200 bg-white">
				<div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
					{stats.map((stat, index) => (
						<div
							key={stat.label}
							className={`px-6 py-10 lg:px-10 ${
								index !== stats.length - 1
									? 'border-r border-gray-200'
									: ''
							}`}
						>
							<p className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
								{stat.number}
							</p>

							<p className="mt-2 text-sm text-gray-500">
								{stat.label}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* FEATURED ORGANIZATIONS */}
			<section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
				<div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
					<div className="max-w-2xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							FEATURED ORGANIZATIONS
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Back people doing the work.
						</h2>

						<p className="mt-5 max-w-xl text-base leading-7 text-gray-500">
							Explore trusted projects restoring forests,
							protecting wildlife, and creating cleaner
							coastlines.
						</p>
					</div>

					<Link
						to="/organizations"
						className="w-fit rounded-full border border-[#183b2b] px-6 py-3 text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
					>
						View All Organizations
					</Link>
				</div>

				{/* ORGANIZATION CARDS */}
				{organizationError && <ErrorMessage message={organizationError} onDismiss={() => setOrganizationError('')} />}
				{loadingOrganizations ? <Loading /> : (
					<div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{organizations.map((organization) => (
							<OrganizationCard key={organization._id || organization.id} organisation={organization} />
						))}
					</div>
				)}
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10 lg:py-28">
					<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
						MAKE AN IMPACT
					</p>

					<h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Small actions can create lasting change.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
						Your contribution helps environmental organizations
						continue protecting forests, wildlife, communities,
						and our shared future.
					</p>

					<Link
						to="/organizations"
						className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
					>
						Start Giving
					</Link>
				</div>
			</section>
		</>
	)
}

export default Home
