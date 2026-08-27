import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Eye, Heart, Search } from 'lucide-react'

const steps = [
	{
		number: '01',
		title: 'Discover',
		description:
			'Explore verified environmental organizations and discover the causes, communities, and projects that matter to you.',
		icon: Search,
	},
	{
		number: '02',
		title: 'Choose',
		description:
			'Select an organization and choose how much you would like to contribute.',
		icon: Heart,
	},
	{
		number: '03',
		title: 'Give',
		description:
			'Make a secure donation through MazingiraHub. Give once or support a cause regularly.',
		icon: ArrowUpRight,
	},
	{
		number: '04',
		title: 'See the impact',
		description:
			'Stay connected through stories, updates, and environmental progress.',
		icon: Eye,
	},
]

const benefits = [
	{
		number: '01',
		title: 'Verified organizations',
		description:
			'Discover organizations that have been reviewed before being listed on the platform.',
	},
	{
		number: '02',
		title: 'Clear information',
		description:
			'Learn about each organization, the work they do, and the projects they support.',
	},
	{
		number: '03',
		title: 'Simple giving',
		description:
			'Choose a cause and contribute without navigating complicated donation processes.',
	},
]

function HowItWorks() {
	return (
		<div className="overflow-hidden">
			{/* HERO */}
			<section className="bg-[#183b2b] text-white">
				<div className="mx-auto flex min-h-[400px] max-w-7xl items-center px-6 py-16 sm:min-h-[420px] lg:px-10">
					<div className="max-w-4xl">
						<p className="text-xs font-bold uppercase tracking-[0.25em] text-[#74d39d] sm:text-sm">
							How it works
						</p>

						<h1 className="mt-4 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[72px]">
							A clearer way to care
							<br className="hidden sm:block" />
							for our shared home.
						</h1>

						<p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
							From discovering a cause to seeing its impact,
							MazingiraHub makes environmental giving simple,
							transparent, and meaningful.
						</p>
					</div>
				</div>
			</section>

			{/* STEPS */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
					<div className="max-w-2xl">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							The process
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Environmental giving, simplified.
						</h2>

						<p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
							Find meaningful work, choose how you want to help,
							and stay connected to the impact.
						</p>
					</div>

					<div className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{steps.map((step) => (
							<div
								key={step.number}
								className="group relative rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#b9dec7] hover:shadow-md"
							>
								<div className="flex items-center justify-between">
									<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e5f4ea] text-xl text-[#23945c]">
										<step.icon className="h-5 w-5" aria-hidden="true" />
									</div>

									<span className="text-xs font-bold tracking-wider text-gray-300">
										{step.number}
									</span>
								</div>

								<h3 className="mt-6 text-xl font-bold text-[#172033]">
									{step.title}
								</h3>

								<p className="mt-3 text-sm leading-6 text-gray-500">
									{step.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* WHERE YOUR GIVING GOES */}
			<section className="bg-white">
				<div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-20">
					<div className="relative">
						<img
							src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=85"
							alt="Environmental conservation"
							className="h-[400px] w-full rounded-3xl object-cover sm:h-[450px]"
						/>

						<div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur sm:left-6 sm:right-auto sm:max-w-sm">
							<p className="text-xs font-bold uppercase tracking-[0.15em] text-[#23945c]">
								Your contribution
							</p>

							<p className="mt-2 text-sm leading-6 text-gray-600">
								Your support helps environmental organizations
								continue important work in their communities.
							</p>
						</div>
					</div>

					<div>
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							Where your giving goes
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Support work that matters.
						</h2>

						<p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
							Your donation can support different types of
							environmental work depending on the organization
							and its community.
						</p>

						<div className="mt-7 space-y-5">
							{[
								[
									'Forest restoration',
									'Tree planting, native seedlings, habitat restoration, and forest protection.',
								],
								[
									'Wildlife conservation',
									'Protecting habitats and supporting communities living alongside wildlife.',
								],
								[
									'Cleaner communities',
									'Waste reduction, clean water projects, recycling, and environmental education.',
								],
							].map(([title, description]) => (
								<div key={title} className="flex gap-4">
									<div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e5f4ea] text-xs font-bold text-[#23945c]">
										<Check className="h-4 w-4" aria-hidden="true" />
									</div>

									<div>
										<h3 className="text-sm font-bold text-[#172033]">
											{title}
										</h3>

										<p className="mt-1 text-sm leading-6 text-gray-500">
											{description}
										</p>
									</div>
								</div>
							))}
						</div>

						<Link
							to="/organizations"
							className="mt-8 inline-flex rounded-full bg-[#183b2b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#24543e]"
						>
							Explore Organizations
							<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
						</Link>
					</div>
				</div>
			</section>

			{/* WHY MAZINGIRAHUB */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
					<div className="text-center">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							Why MazingiraHub
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Made for meaningful giving.
						</h2>

						<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
							Supporting environmental work should feel clear,
							trustworthy, and accessible.
						</p>
					</div>

					<div className="mt-10 grid gap-4 md:grid-cols-3">
						{benefits.map((benefit) => (
							<div
								key={benefit.title}
								className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
							>
								<span className="text-xs font-bold tracking-widest text-[#23945c]">
									{benefit.number}
								</span>

								<h3 className="mt-5 text-lg font-bold text-[#172033]">
									{benefit.title}
								</h3>

								<p className="mt-2 text-sm leading-6 text-gray-500">
									{benefit.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="bg-white">
				<div className="mx-auto max-w-3xl px-6 py-16 lg:py-20">
					<div className="text-center">
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
							Questions
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Common questions.
						</h2>
					</div>

					<div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
						{[
							[
								'Who can donate?',
								'Anyone who wants to support environmental work can contribute through MazingiraHub.',
							],
							[
								'Can I donate regularly?',
								'Yes. Recurring giving can help organizations plan and sustain their environmental projects over a longer period.',
							],
							[
								'How do I choose an organization?',
								'Visit the Organizations page to explore causes, locations, and projects before deciding where you would like to give.',
							],
							[
								'Can organizations join MazingiraHub?',
								'Yes. Environmental organizations can apply to be listed on the platform through the organization application process.',
							],
						].map(([question, answer]) => (
							<details key={question} className="group py-5">
								<summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-base font-bold text-[#172033]">
									{question}

									<span className="shrink-0 text-xl font-normal text-[#23945c] transition group-open:rotate-45">
										+
									</span>
								</summary>

								<p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
									{answer}
								</p>
							</details>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-3xl px-6 py-16 text-center lg:py-20">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#74d39d]">
						Ready to start?
					</p>

					<h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
						Find a cause worth supporting.
					</h2>

					<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
						Explore environmental organizations and find a project
						where your contribution can make a difference.
					</p>

					<Link
						to="/organizations"
						className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
					>
						Explore Organizations
						<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
					</Link>
				</div>
			</section>
		</div>
	)
}

export default HowItWorks
