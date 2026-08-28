import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import { getStoryById } from '../services/storyApi'

function StoryDetails() {
	const { id } = useParams()
	const [story, setStory] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')

	useEffect(() => {
		let active = true

		async function fetchStory() {
			try {
				setLoading(true)
				setError('')

				const data = await getStoryById(id)

				if (active) {
					setStory(data)
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

		void fetchStory()

		return () => {
			active = false
		}
	}, [id])

	if (loading) return <Loading />

	if (error) {
		return (
			<main className="bg-white px-6 py-20">
				<div className="mx-auto max-w-6xl">
					<ErrorMessage message={error} />
				</div>
			</main>
		)
	}

	if (!story) {
		return (
			<main className="flex min-h-[70vh] items-center justify-center bg-[#effbf4] px-6">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-[#172033]">
						Story not found
					</h1>

					<Link
						to="/stories"
						className="mt-7 inline-flex items-center rounded-full bg-[#183b2b] px-7 py-3.5 text-sm font-bold text-white"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Stories
					</Link>
				</div>
			</main>
		)
	}

	const title =
		story.title || 'A community making progress'

	const content =
		story.content ||
		story.description ||
		story.story ||
		story.excerpt ||
		''

	const category =
		story.category ||
		story.focusArea ||
		'Environmental Action'

	const date =
		story.date ||
		story.publishedAt ||
		story.createdAt

	const image =
		story.image ||
		story.imageUrl ||
		story.coverImage

	/* Organization connected to this story */
	const organization =
		story.organization ||
		story.organisation

	const organizationId =
		organization?._id ||
		organization?.id ||
		story.organizationId ||
		story.organisationId

	const organizationName =
		organization?.name ||
		organization?.organizationName ||
		organization?.organisationName ||
		story.organizationName ||
		story.organisationName ||
		'View Organization'

	const formattedDate = date
		? new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			})
		: null

	return (
		<main className="min-h-screen bg-white">

			{/* TOP BACK LINK */}
			<div className="mx-auto max-w-[1148px] px-6 pt-10 lg:px-0">
				<Link
					to="/stories"
					className="inline-flex items-center text-sm font-semibold text-[#258a56] transition hover:text-[#183b2b]"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					Back to Stories
				</Link>
			</div>

			{/* STORY */}
			<section className="mx-auto max-w-[1148px] px-6 py-12 lg:px-0 lg:py-16">
				<div className="grid items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">

					{/* LEFT — WORDING */}
					<div>

						<p className="text-[13px] font-bold uppercase tracking-[0.18em] text-[#258a56]">
							{category}
						</p>

						{formattedDate && (
							<p className="mt-4 text-sm text-[#89919a]">
								{formattedDate}
							</p>
						)}

						<h1 className="mt-4 text-[40px] font-bold leading-[1.1] tracking-[-0.025em] text-[#172033] sm:text-[48px]">
							{title}
						</h1>

						{/* PARAGRAPHS */}
						<div className="mt-7 space-y-5">
							{content
								.split(/\n\s*\n/)
								.filter(Boolean)
								.map((paragraph, index) => (
									<p
										key={index}
										className="text-[16px] leading-[1.75] text-[#626c77]"
									>
										{paragraph.trim()}
									</p>
								))}
						</div>

						{/* VIEW ORGANIZATION */}
						{organizationId && (
							<div className="mt-9">
								<Link
									to={`/organizations/${organizationId}`}
									className="inline-flex items-center rounded-full bg-[#183b2b] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#24523d]"
								>
									{organizationName !== 'View Organization'
										? `View ${organizationName}`
										: 'View Organization'}

									<ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</div>
						)}

					</div>

					{/* RIGHT — IMAGE */}
					<div className="overflow-hidden rounded-[18px]">
						{image ? (
							<img
								src={image}
								alt={title}
								className="h-[420px] w-full object-cover sm:h-[500px] lg:h-[570px]"
							/>
						) : (
							<div className="flex h-[420px] items-center justify-center bg-[#eff8f2] text-[#258a56] sm:h-[500px] lg:h-[570px]">
								<span className="text-sm font-semibold">
									No story image available
								</span>
							</div>
						)}
					</div>

				</div>
			</section>

		</main>
	)
}

export default StoryDetails
