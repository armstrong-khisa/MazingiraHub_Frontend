import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function StoryCard({ story = {}, reverse = false }) {
	const id = story._id || story.id

	const title =
		story.title ||
		'A community making progress'

	const body =
		story.excerpt ||
		story.description ||
		story.content ||
		story.story ||
		'Discover how communities are creating positive environmental change.'

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

	const formattedDate = date
		? new Date(date).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
			})
		: null

	const card = (
		<article
			className={`
				group flex w-full overflow-hidden
				rounded-[16px]
				border border-[#e5e7eb]
				bg-white
				${reverse ? 'flex-col lg:flex-row-reverse' : 'flex-col lg:flex-row'}
			`}
		>
			{/* IMAGE */}
			<div className="h-[270px] w-full shrink-0 overflow-hidden lg:h-[315px] lg:w-[48%]">
				{image ? (
					<img
						src={image}
						alt={title}
						className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
						loading="lazy"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-[#edf7f0] text-[#258a56]">
						<Leaf className="h-12 w-12" strokeWidth={1.5} />
					</div>
				)}
			</div>

			{/* CONTENT */}
			<div className="flex min-w-0 flex-1 flex-col justify-center px-7 py-8 lg:px-[38px] lg:py-10">
				{/* CATEGORY */}
				<div>
					<span className="inline-flex rounded-full bg-[#dff7e8] px-[13px] py-[7px] text-[13px] font-semibold leading-none text-[#237b4b]">
						{category}
					</span>
				</div>

				{/* DATE */}
				{formattedDate && (
					<p className="mt-7 text-[14px] font-medium text-[#7b8490]">
						{formattedDate}
					</p>
				)}

				{/* TITLE */}
				<h2 className="mt-3 max-w-[500px] text-[27px] font-bold leading-[1.2] tracking-[-0.02em] text-[#172033]">
					{title}
				</h2>

				{/* DESCRIPTION */}
				<p className="mt-5 max-w-[500px] text-[15px] leading-[1.45] text-[#707987]">
					{body}
				</p>
			</div>
		</article>
	)

	/*
	 * Only make the card clickable when an ID exists.
	 * This preserves your existing /stories/:id route.
	 */
	if (id) {
		return (
			<Link
				to={`/stories/${id}`}
				className="block rounded-[16px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#258a56] focus-visible:ring-offset-4"
			>
				{card}
			</Link>
		)
	}

	return card
}
