import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const values = [
	{
		number: '01',
		title: 'Transparency',
		description:
			'We make it easier for donors to understand who they are supporting, what they are working on, and the impact their giving can create.',
	},
	{
		number: '02',
		title: 'Community',
		description:
			'Environmental protection works best when local communities are at the heart of the solution and have a meaningful role in creating change.',
	},
	{
		number: '03',
		title: 'Long-term impact',
		description:
			'We support environmental work designed to create lasting benefits for ecosystems, communities, and future generations.',
	},
]

function About() {
	return (
		<div className="overflow-hidden">
			{/* HERO */}
			<section className="bg-[#183b2b] text-white">
				<div className="mx-auto grid min-h-[430px] max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:px-10">
					<div>
						<p className="text-xs font-bold uppercase tracking-[0.25em] text-[#74d39d]">
							About MazingiraHub
						</p>

						<h1 className="mt-4 max-w-2xl text-5xl font-semibold leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[68px]">
							Making environmental giving easier.
						</h1>

						<p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
							MazingiraHub connects people who want to make a
							difference with environmental organizations doing
							practical work across Kenya.
						</p>

						<div className="mt-7 flex flex-wrap gap-3">
							<Link
								to="/organizations"
								className="rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
							>
								Explore Organizations
							</Link>

							<Link
								to="/how-it-works"
								className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
							>
								How It Works
							</Link>
						</div>
					</div>

					<div className="relative hidden lg:block">
						<img
							src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85"
							alt="African landscape"
							className="h-[360px] w-full rounded-3xl object-cover"
						/>

						<div className="absolute bottom-5 left-5 max-w-xs rounded-2xl bg-white p-5 shadow-xl">
							<p className="text-xs font-bold uppercase tracking-[0.15em] text-[#23945c]">
								Our purpose
							</p>

							<p className="mt-2 text-sm leading-6 text-gray-600">
								Connecting people, communities, and
								environmental action.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* INTRODUCTION */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
					<div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
								Why we exist
							</p>

							<h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl">
								Environmental action should be easier to
								support.
							</h2>
						</div>

						<div className="space-y-5 text-sm leading-7 text-gray-500 sm:text-base">
							<p>
								Across Kenya, people and organizations are
								doing important work to protect forests,
								wildlife, waterways, coastlines, and
								communities.
							</p>

							<p>
								But finding trustworthy organizations and
								understanding where your contribution can make
								a difference isn't always simple.
							</p>

							<p>
								MazingiraHub was created to make that connection
								easier. We bring environmental organizations and
								people who care about the planet together in one
								place.
							</p>

							<p>
								Our goal is simple: make environmental giving
								more accessible, transparent, and meaningful.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* MISSION */}
			<section className="bg-white">
				<div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
					<div className="overflow-hidden rounded-3xl">
						<img
							src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=85"
							alt="People working together"
							className="h-[380px] w-full object-cover sm:h-[420px]"
						/>
					</div>

					<div>
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							Our mission
						</p>

						<h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl">
							Help good work reach further.
						</h2>

						<p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
							We believe environmental protection is a shared
							responsibility. When individuals have a simple way
							to support credible organizations, collective
							action can become much more powerful.
						</p>

						<p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
							MazingiraHub helps bridge that gap by creating a
							space where environmental organizations can share
							their work and donors can discover causes they care
							about.
						</p>

						<Link
							to="/organizations"
							className="mt-7 inline-flex items-center rounded-full bg-[#183b2b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#24543e]"
						>
							Find an Organization
							<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
						</Link>
					</div>
				</div>
			</section>

			{/* VALUES */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
					<div className="max-w-2xl">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							What guides us
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Built around meaningful impact.
						</h2>
					</div>

					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{values.map((value) => (
							<div
								key={value.number}
								className="group rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b9dec7] hover:shadow-md"
							>
								<div className="flex items-center justify-between">
									<span className="text-xs font-bold tracking-widest text-[#23945c]">
										{value.number}
									</span>

									<span className="h-2 w-2 rounded-full bg-[#74d39d] opacity-50 transition group-hover:opacity-100" />
								</div>

								<h3 className="mt-5 text-xl font-bold text-[#172033]">
									{value.title}
								</h3>

								<p className="mt-3 text-sm leading-6 text-gray-500">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* IMPACT NUMBERS */}
			<section className="bg-white">
				<div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
					<div className="grid grid-cols-2 divide-x divide-gray-200 lg:grid-cols-4">
						<div className="px-5 first:pl-0 lg:px-8">
							<p className="text-3xl font-bold tracking-tight text-[#183b2b]">
								42
							</p>
							<p className="mt-1 text-xs text-gray-500 sm:text-sm">
								Organizations
							</p>
						</div>

						<div className="px-5 lg:px-8">
							<p className="text-3xl font-bold tracking-tight text-[#183b2b]">
								85
							</p>
							<p className="mt-1 text-xs text-gray-500 sm:text-sm">
								Projects
							</p>
						</div>

						<div className="mt-8 px-5 lg:mt-0 lg:px-8">
							<p className="text-3xl font-bold tracking-tight text-[#183b2b]">
								KES 4.8M
							</p>
							<p className="mt-1 text-xs text-gray-500 sm:text-sm">
								Donations
							</p>
						</div>

						<div className="mt-8 px-5 lg:mt-0 lg:px-8">
							<p className="text-3xl font-bold tracking-tight text-[#183b2b]">
								3,600+
							</p>
							<p className="mt-1 text-xs text-gray-500 sm:text-sm">
								Donors
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#74d39d]">
						Join the movement
					</p>

					<h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						There is a place for everyone in environmental action.
					</h2>

					<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
						Whether you are giving, volunteering, or leading
						environmental work, your actions can help create a
						healthier future.
					</p>

					<div className="mt-7 flex flex-wrap justify-center gap-3">
						<Link
							to="/organizations"
							className="rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
						>
							Start Giving
						</Link>

						<Link
							to="/apply"
							className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Join as an Organization
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default About
