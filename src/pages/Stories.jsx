import { useEffect, useState } from 'react'
import StoryCard from '../components/StoryCard'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getStories } from '../services/storyApi'

function Stories() {
	const [stories, setStories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let active = true

		async function fetchStories() {
			try {
				const data = await getStories()

				if (active) {
					setStories(Array.isArray(data) ? data : [])
				}
			} catch (err) {
				if (active) {
					setError(err.message)
				}
			} finally {
				if (active) {
					setLoading(false)
				}
			}
		}

		void fetchStories()

		return () => {
			active = false
		}
	}, [])

	if (loading) {
		return <Loading />
	}

	return (
		<div className="min-h-screen bg-white">
			{/* ERROR */}
			{error && (
				<div className="mx-auto max-w-[1148px] px-6 pt-6 lg:px-0">
					<ErrorMessage
						message={error}
						onDismiss={() => setError('')}
					/>
				</div>
			)}

			{/* HERO */}
			<section className="bg-[#effbf4]">
				<div className="mx-auto max-w-[1148px] px-6 py-[68px] lg:px-0">
					<div className="max-w-[760px]">
						<p className="text-[14px] font-bold tracking-[0.18em] text-[#258a56]">
							FROM THE FIELD
						</p>

						<h1 className="mt-5 text-[42px] font-bold leading-[1.08] tracking-[-0.025em] text-[#111827] sm:text-[48px] lg:text-[52px]">
							The people and places your giving reaches.
						</h1>

						<p className="mt-6 max-w-[690px] text-[16px] leading-[1.55] text-[#74808d] sm:text-[17px]">
							Read how committed communities are turning
							environmental support into visible, lasting
							progress.
						</p>
					</div>
				</div>
			</section>

			{/* STORIES */}
			<section className="bg-white">
				<div className="mx-auto max-w-[1148px] px-6 py-[76px] lg:px-0">
					<div className="space-y-9">
						{stories.map((story, index) => (
							<StoryCard
								key={story._id || story.id || index}
								story={story}
								featured={index === 0}
								reverse={index % 2 === 1}
							/>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}

export default Stories
