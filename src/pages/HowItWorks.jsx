import { Link } from 'react-router-dom'

const steps = [
	{
		number: '01',
		title: 'Discover',
		description:
			'Explore verified environmental organizations and discover the causes, communities, and projects that matter to you.',
		icon: '⌕',
	},
	{
		number: '02',
		title: 'Choose',
		description:
			'Select an organization and choose how much you would like to contribute. Every gift can make a difference.',
		icon: '♡',
	},
	{
		number: '03',
		title: 'Give',
		description:
			'Make a secure donation directly through MazingiraHub. You can give once or choose to support a cause regularly.',
		icon: '↗',
	},
	{
		number: '04',
		title: 'Follow the impact',
		description:
			'Stay connected with the work your donation supports through stories, updates, and environmental progress.',
		icon: '◉',
	},
]

const benefits = [
	{
		title: 'Verified organizations',
		description:
			'Discover organizations that have been reviewed before being listed on the platform.',
	},
	{
		title: 'Clear information',
		description:
			'Learn about each organization, the work they do, and the projects they are trying to achieve.',
	},
	{
		title: 'Simple giving',
		description:
			'Choose a cause and contribute without having to navigate complicated donation processes.',
	},
]

function HowItWorks() {
	return (
		<>
			{/* HERO */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-4xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
							HOW IT WORKS
						</p>

						<h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
							A clearer way to care
							<br />
							for our shared home.
						</h1>

						<p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
							From discovering a cause to seeing its impact,
							MazingiraHub makes environmental giving simple,
							transparent, and meaningful.
						</p>
					</div>
				</div>
			</section>

			{/* STEPS */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-2xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							THE PROCESS
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Environmental giving in four simple steps.
						</h2>

						<p className="mt-5 text-base leading-7 text-gray-500">
							No complicated process. Find meaningful work,
							choose how you want to help, and stay connected to
							the impact.
						</p>
					</div>

					<div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{steps.map((step) => (
							<div
								key={step.number}
								className="group rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
							>
								<div className="flex items-start justify-between">
									<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e1f3e8] text-2xl font-bold text-[#23945c]">
										{step.icon}
									</div>

									<span className="text-sm font-bold text-gray-300">
										{step.number}
									</span>
								</div>

								<h3 className="mt-7 text-2xl font-bold text-[#172033]">
									{step.title}
								</h3>

								<p className="mt-4 text-sm leading-7 text-gray-500">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* HOW YOUR GIFT WORKS */}
			<section className="bg-white">
				<div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85"
							alt="Environmental conservation"
							className="h-[500px] w-full rounded-[2rem] object-cover"
						/>

						<div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white p-6 shadow-xl sm:right-auto sm:max-w-sm">
							<p className="text-xs font-bold tracking-[0.15em] text-[#23945c]">
								YOUR CONTRIBUTION
							</p>

							<p className="mt-2 text-sm leading-6 text-gray-600">
								Your support helps environmental organizations
								continue doing important work in their
								communities.
							</p>
						</div>
					</div>

					<div>
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							WHERE YOUR GIVING GOES
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Support work that matters.
						</h2>

						<p className="mt-6 text-base leading-8 text-gray-500">
							Environmental organizations use donations in
							different ways depending on their projects and
							communities.
						</p>

						<div className="mt-8 space-y-5">
							<div className="flex gap-4">
								<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-sm font-bold text-[#23945c]">
									✓
								</div>

								<div>
									<h3 className="font-bold text-[#172033]">
										Forest restoration
									</h3>

									<p className="mt-1 text-sm leading-6 text-gray-500">
										Tree planting, native seedlings,
										habitat restoration, and forest
										protection.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-sm font-bold text-[#23945c]">
									✓
								</div>

								<div>
									<h3 className="font-bold text-[#172033]">
										Wildlife conservation
									</h3>

									<p className="mt-1 text-sm leading-6 text-gray-500">
										Protecting habitats and supporting
										communities living alongside wildlife.
									</p>
								</div>
							</div>

							<div className="flex gap-4">
								<div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1f3e8] text-sm font-bold text-[#23945c]">
									✓
								</div>

								<div>
									<h3 className="font-bold text-[#172033]">
										Cleaner communities
									</h3>

									<p className="mt-1 text-sm leading-6 text-gray-500">
										Waste reduction, clean water projects,
										recycling, and environmental education.
									</p>
								</div>
							</div>
						</div>

						<Link
							to="/organizations"
							className="mt-9 inline-flex rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
						>
							Explore Organizations
						</Link>
					</div>
				</div>
			</section>

			{/* WHY MAZINGIRAHUB */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="text-center">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							WHY MAZINGIRAHUB
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Made for meaningful giving.
						</h2>

						<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500">
							We want supporting environmental work to feel
							clear, trustworthy, and accessible.
						</p>
					</div>

					<div className="mt-12 grid gap-6 md:grid-cols-3">
						{benefits.map((benefit, index) => (
							<div
								key={benefit.title}
								className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5"
							>
								<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#183b2b] text-sm font-bold text-white">
									0{index + 1}
								</div>

								<h3 className="mt-6 text-xl font-bold text-[#172033]">
									{benefit.title}
								</h3>

								<p className="mt-3 text-sm leading-7 text-gray-500">
									{benefit.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="bg-white">
				<div className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
					<div className="text-center">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							QUESTIONS
						</p>

						<h2 className="mt-4 text-4xl font-bold tracking-tight text-[#172033] sm:text-5xl">
							Common questions.
						</h2>
					</div>

					<div className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
						<details className="group py-6">
							<summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-[#172033]">
								Who can donate?

								<span className="text-2xl font-normal text-[#23945c] transition group-open:rotate-45">
									+
								</span>
							</summary>

							<p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
								Anyone who wants to support environmental work
								can contribute through MazingiraHub.
							</p>
						</details>

						<details className="group py-6">
							<summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-[#172033]">
								Can I donate regularly?

								<span className="text-2xl font-normal text-[#23945c] transition group-open:rotate-45">
									+
								</span>
							</summary>

							<p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
								Yes. Recurring giving can help organizations
								plan and sustain their environmental projects
								over a longer period.
							</p>
						</details>

						<details className="group py-6">
							<summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-[#172033]">
								How do I choose an organization?

								<span className="text-2xl font-normal text-[#23945c] transition group-open:rotate-45">
									+
								</span>
							</summary>

							<p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
								Visit the Organizations page to explore
								different environmental causes, locations,
								and projects before deciding where you would
								like to give.
							</p>
						</details>

						<details className="group py-6">
							<summary className="flex cursor-pointer list-none items-center justify-between text-lg font-bold text-[#172033]">
								Can organizations join MazingiraHub?

								<span className="text-2xl font-normal text-[#23945c] transition group-open:rotate-45">
									+
								</span>
							</summary>

							<p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
								Yes. Environmental organizations can apply to
								be listed on the platform through the
								organization application process.
							</p>
						</details>
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
					<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
						READY TO START?
					</p>

					<h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Find a cause worth supporting.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
						Explore environmental organizations and find a project
						where your contribution can make a difference.
					</p>

					<Link
						to="/organizations"
						className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
					>
						Explore Organizations
					</Link>
				</div>
			</section>
		</>
	)
}

export default HowItWorks
