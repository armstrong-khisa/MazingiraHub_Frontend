import { Link } from 'react-router-dom'

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
		<>
			{/* HERO */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
					<div>
						<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
							ABOUT MAZINGIRAHUB
						</p>

						<h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
							Making environmental
							<br />
							giving easier.
						</h1>

						<p className="mt-7 max-w-xl text-base leading-8 text-gray-300 sm:text-lg">
							MazingiraHub connects people who want to make a
							difference with environmental organizations doing
							practical work across Kenya.
						</p>

						<div className="mt-8 flex flex-wrap gap-4">
							<Link
								to="/organizations"
								className="rounded-full bg-white px-7 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
							>
								Explore Organizations
							</Link>

							<Link
								to="/how-it-works"
								className="rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
							>
								How It Works
							</Link>
						</div>
					</div>

					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85"
							alt="African landscape"
							className="h-[500px] w-full rounded-[2rem] object-cover"
						/>

						<div className="absolute bottom-6 left-6 rounded-2xl bg-white p-6 shadow-xl sm:max-w-xs">
							<p className="text-xs font-bold tracking-[0.15em] text-[#23945c]">
								OUR PURPOSE
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
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
						<div>
							<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
								WHY WE EXIST
							</p>

							<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
								Environmental action should be easier to
								support.
							</h2>
						</div>

						<div className="space-y-6 text-base leading-8 text-gray-500">
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
				<div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
					<div className="overflow-hidden rounded-[2rem]">
						<img
							src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=85"
							alt="People working together"
							className="h-[500px] w-full object-cover"
						/>
					</div>

					<div>
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							OUR MISSION
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Help good work reach further.
						</h2>

						<p className="mt-6 text-base leading-8 text-gray-500">
							We believe environmental protection is a shared
							responsibility. When individuals have a simple way
							to support credible organizations, collective action
							can become much more powerful.
						</p>

						<p className="mt-5 text-base leading-8 text-gray-500">
							MazingiraHub helps bridge that gap by creating a
							space where environmental organizations can share
							their work and donors can discover causes they care
							about.
						</p>

						<div className="mt-8">
							<Link
								to="/organizations"
								className="inline-flex rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
							>
								Find an Organization
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* VALUES */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-2xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							WHAT GUIDES US
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Built around meaningful impact.
						</h2>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-3">
						{values.map((value) => (
							<div
								key={value.number}
								className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-black/5"
							>
								<span className="text-sm font-bold text-[#23945c]">
									{value.number}
								</span>

								<h3 className="mt-6 text-2xl font-bold text-[#172033]">
									{value.title}
								</h3>

								<p className="mt-4 text-sm leading-7 text-gray-500">
									{value.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* IMPACT NUMBERS */}
			<section className="bg-white">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
					<div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
						<div>
							<p className="text-4xl font-bold text-[#183b2b]">
								42
							</p>

							<p className="mt-2 text-sm text-gray-500">
								Organizations
							</p>
						</div>

						<div>
							<p className="text-4xl font-bold text-[#183b2b]">
								85
							</p>

							<p className="mt-2 text-sm text-gray-500">
								Projects
							</p>
						</div>

						<div>
							<p className="text-4xl font-bold text-[#183b2b]">
								KES 4.8M
							</p>

							<p className="mt-2 text-sm text-gray-500">
								Donations
							</p>
						</div>

						<div>
							<p className="text-4xl font-bold text-[#183b2b]">
								3,600+
							</p>

							<p className="mt-2 text-sm text-gray-500">
								Donors
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
					<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
						JOIN THE MOVEMENT
					</p>

					<h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						There is a place for everyone in environmental action.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
						Whether you are giving, volunteering, or leading
						environmental work, your actions can help create a
						healthier future.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							to="/organizations"
							className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
						>
							Start Giving
						</Link>

						<Link
							to="/apply"
							className="rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Join as an Organization
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default About
