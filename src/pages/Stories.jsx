import { Link } from 'react-router-dom'

const stories = [
	{
		id: 1,
		category: 'Forest Restoration',
		date: 'August 2026',
		readTime: '5 min read',
		title: 'Restoring the Mau Forest, one community at a time',
		description:
			'Local communities are helping restore degraded forest areas while creating sustainable opportunities for the people who depend on them.',
		image:
			'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=85',
	},

	{
		id: 2,
		category: 'Wildlife',
		date: 'July 2026',
		readTime: '4 min read',
		title: 'Protecting wildlife through community action',
		description:
			'Conservation becomes stronger when communities living alongside wildlife are part of the solution.',
		image:
			'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85',
	},

	{
		id: 3,
		category: 'Ocean & Coast',
		date: 'June 2026',
		readTime: '6 min read',
		title: 'Cleaner coastlines start with local action',
		description:
			'Coastal communities are finding new ways to reduce plastic pollution and protect the ecosystems around them.',
		image:
			'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
	},

	{
		id: 4,
		category: 'Sustainable Living',
		date: 'May 2026',
		readTime: '5 min read',
		title: 'Growing food while caring for the soil',
		description:
			'Regenerative farming practices are helping farmers improve soil health, protect water, and build more resilient livelihoods.',
		image:
			'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=85',
	},

	{
		id: 5,
		category: 'Clean Water',
		date: 'April 2026',
		readTime: '4 min read',
		title: 'Bringing cleaner water back to local communities',
		description:
			'Community-led river restoration is helping protect important water sources for people and wildlife.',
		image:
			'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1400&q=85',
	},

	{
		id: 6,
		category: 'Community',
		date: 'March 2026',
		readTime: '5 min read',
		title: 'When a neighborhood comes together for nature',
		description:
			'Small environmental projects can become powerful when neighbors work together around a shared vision.',
		image:
			'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=85',
	},
]

const categories = [
	'All Stories',
	'Forest Restoration',
	'Wildlife',
	'Ocean & Coast',
	'Sustainable Living',
	'Clean Water',
	'Community',
]

function Stories() {
	return (
		<>
			{/* HERO */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
					<div className="max-w-4xl">
						<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
							FROM THE FIELD
						</p>

						<h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
							The people and places
							<br />
							your giving reaches.
						</h1>

						<p className="mt-7 max-w-2xl text-base leading-8 text-gray-300 sm:text-lg">
							Read stories from communities and organizations
							turning environmental support into visible,
							lasting progress.
						</p>
					</div>
				</div>
			</section>

			{/* FEATURED STORY */}
			<section className="bg-white">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
					<div className="grid overflow-hidden rounded-[2rem] bg-[#f7f8f3] lg:grid-cols-2">
						<div className="min-h-[400px] overflow-hidden lg:min-h-[550px]">
							<img
								src={stories[0].image}
								alt={stories[0].title}
								className="h-full w-full object-cover transition duration-700 hover:scale-105"
							/>
						</div>

						<div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
							<div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
								<span className="text-[#23945c]">
									{stories[0].category}
								</span>

								<span className="text-gray-300">•</span>

								<span className="text-gray-400">
									{stories[0].date}
								</span>
							</div>

							<h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#172033] sm:text-5xl">
								{stories[0].title}
							</h2>

							<p className="mt-6 text-base leading-8 text-gray-500">
								{stories[0].description}
							</p>

							<div className="mt-8">
								<Link
									to={`/stories/${stories[0].id}`}
									className="inline-flex items-center rounded-full bg-[#183b2b] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#24543e]"
								>
									Read Story
									<span className="ml-2">→</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* FILTER */}
			<section className="border-y border-gray-200 bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl overflow-x-auto px-6 py-6 lg:px-10">
					<div className="flex min-w-max gap-3">
						{categories.map((category, index) => (
							<button
								key={category}
								className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
									index === 0
										? 'bg-[#183b2b] text-white'
										: 'border border-gray-200 bg-white text-gray-600 hover:border-[#183b2b] hover:text-[#183b2b]'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>
			</section>

			{/* STORIES GRID */}
			<section className="bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
					<div className="mb-10">
						<p className="text-sm font-bold tracking-[0.2em] text-[#23945c]">
							LATEST STORIES
						</p>

						<h2 className="mt-3 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
							Stories of change.
						</h2>
					</div>

					<div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
						{stories.slice(1).map((story) => (
							<article
								key={story.id}
								className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
							>
								<div className="overflow-hidden">
									<img
										src={story.image}
										alt={story.title}
										className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
									/>
								</div>

								<div className="p-6">
									<div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
										<span className="text-[#23945c]">
											{story.category}
										</span>

										<span className="text-gray-300">
											•
										</span>

										<span className="text-gray-400">
											{story.date}
										</span>
									</div>

									<h3 className="mt-4 text-2xl font-bold leading-tight text-[#172033]">
										{story.title}
									</h3>

									<p className="mt-3 text-sm leading-6 text-gray-500">
										{story.description}
									</p>

									<div className="mt-6 flex items-center justify-between">
										<span className="text-xs text-gray-400">
											{story.readTime}
										</span>

										<Link
											to={`/stories/${story.id}`}
											className="text-sm font-bold text-[#183b2b]"
										>
											Read story →
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* QUOTE / MISSION */}
			<section className="bg-white">
				<div className="mx-auto max-w-5xl px-6 py-20 text-center lg:py-28">
					<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e1f3e8] text-2xl text-[#23945c]">
						“
					</div>

					<blockquote className="mt-7 text-3xl font-bold leading-tight tracking-tight text-[#172033] sm:text-4xl lg:text-5xl">
						“Environmental change isn't just about protecting
						nature. It's about creating a future where people and
						nature can thrive together.”
					</blockquote>

					<p className="mt-6 text-sm font-semibold text-gray-400">
						— The MazingiraHub community
					</p>
				</div>
			</section>

			{/* CTA */}
			<section className="bg-[#183b2b]">
				<div className="mx-auto max-w-4xl px-6 py-20 text-center lg:py-28">
					<p className="text-sm font-bold tracking-[0.2em] text-[#74d39d]">
						BE PART OF THE STORY
					</p>

					<h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Your contribution can become part of the next chapter.
					</h2>

					<p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
						Support organizations working to protect forests,
						wildlife, waterways, coastlines, and communities.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-4">
						<Link
							to="/organizations"
							className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#183b2b] transition hover:bg-[#e8f5ed]"
						>
							Explore Organizations
						</Link>

						<Link
							to="/apply"
							className="rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
						>
							Share Your Story
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default Stories
