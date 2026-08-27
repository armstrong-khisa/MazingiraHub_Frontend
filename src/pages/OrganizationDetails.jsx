import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getOrganization } from '../services/organizationApi'

function OrganizationDetails() {
	const { id } = useParams()
	const [organization, setOrganization] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let active = true
		getOrganization(id)
			.then((data) => {
				if (active) setOrganization(data)
			})
			.catch((err) => {
				if (active) setError(err.message)
			})
			.finally(() => {
				if (active) setLoading(false)
			})
		return () => {
			active = false
		}
	}, [id])

	const formatMoney = (amount) => {
		return `KES ${Number(amount || 0).toLocaleString()}`
	}

	if (loading) return <Loading />
	if (error) return <ErrorMessage message={error} />

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

	const raised = Number(organization.amountRaised || organization.raised || 0)
	const goal = Number(organization.goal || organization.targetAmount || 0)
	const percentage = goal ? Math.min(Math.round((raised / goal) * 100), 100) : 0
	const remaining = Math.max(goal - raised, 0)
	const organizationId = organization._id || organization.id || id
	const image = organization.logo || organization.image || organization.imageUrl
	const impact = Array.isArray(organization.impact) ? organization.impact : []
	const about = organization.about || organization.description || ''

	return (
		<>
			{/* HERO IMAGE */}
			<section className="relative">
				<div className="h-[420px] overflow-hidden lg:h-[520px]">
					<img
						src={image}
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
								{about}
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
								{impact.map((item) => (
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
											raised
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
									Goal: {formatMoney(goal)}
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
								to={`/organizations/${organizationId}/donate`}
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
						to={`/organizations/${organizationId}/donate`}
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
