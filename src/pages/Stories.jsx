import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StoryCard from '../components/StoryCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getStories } from '../services/storyApi'

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
	const [stories, setStories] = useState([])
	const [category, setCategory] = useState('All Stories')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let active = true

		async function fetchStories() {
			try {
				const data = await getStories()
				if (active) setStories(Array.isArray(data) ? data : [])
			} catch (err) {
				if (active) setError(err.message)
			} finally {
				if (active) setLoading(false)
			}
		}

		void fetchStories()
		return () => {
			active = false
		}
	}, [])

	const visibleStories = category === 'All Stories'
		? stories
		: stories.filter((story) => (story.category || story.focusArea) === category)
	const featuredStory = visibleStories[0]

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
			{featuredStory && <section className="bg-white">
				<div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
					<StoryCard story={featuredStory} featured />
				</div>
			</section>}

			{/* FILTER */}
			<section className="border-y border-gray-200 bg-[#f7f8f3]">
				<div className="mx-auto max-w-7xl overflow-x-auto px-6 py-6 lg:px-10">
					<div className="flex min-w-max gap-3">
						{categories.map((category, index) => (
							<button
								key={category}
								onClick={() => setCategory(category)}
								className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
									category === categories[index]
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
						{visibleStories.slice(1).map((story) => (
							<StoryCard key={story._id || story.id} story={story} />
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
