import { Link } from 'react-router-dom'
import { ArrowRight, Heart, MapPin } from 'lucide-react'

export default function OrganizationCard({ organisation, onDonate }) {
	const id = organisation._id || organisation.id

	const name =
		organisation.name ||
		organisation.organisationName ||
		'Community organisation'

	const location =
		organisation.location ||
		organisation.county ||
		organisation.address ||
		'Kenya'

	const mission =
		organisation.mission ||
		organisation.description ||
		organisation.summary ||
		'Working with communities to create lasting positive change.'

	const image =
		organisation.logo ||
		organisation.image ||
		organisation.imageUrl

	// Support the different possible API field names
	const raised = Number(
		organisation.amountRaised ??
		organisation.raised ??
		organisation.totalRaised ??
		organisation.totalCollected ??
		organisation.amountCollected ??
		organisation.collectedAmount ??
		organisation.funding?.amountRaised ??
		organisation.funding?.raised ??
		0
	)

	return (
		<article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

			{/* IMAGE */}
			<div className="relative h-52 w-full overflow-hidden bg-gray-100">
				{image ? (
					<img
						src={image}
						alt={`${name} logo`}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
						<Heart
							className="h-12 w-12 text-emerald-600"
							aria-hidden="true"
						/>
					</div>
				)}
			</div>

			{/* CONTENT */}
			<div className="flex flex-1 flex-col p-6">

				{/* LOCATION */}
				<span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#dcf8e6] px-3 py-1.5 text-xs font-bold text-[#168047]">
					<MapPin
						className="mr-1.5 h-3.5 w-3.5"
						aria-hidden="true"
					/>
					{location}
				</span>

				{/* NAME */}
				<h3 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-gray-900">
					{name}
				</h3>

				{/* MISSION */}
				<p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-500">
					{mission}
				</p>

				{/* AMOUNT RAISED */}
				<div className="mt-auto border-t border-gray-100 pt-4">
					<p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
						Amount collected
					</p>

					<p className="mt-1 text-lg font-bold text-[#168047]">
						KES {raised.toLocaleString()}
					</p>
				</div>

				{/* ACTIONS */}
				{id && (
					<div className="mt-5 flex gap-3">

						<Link
							to={`/organizations/${id}`}
							className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
						>
							View organization

							<ArrowRight
								className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
								aria-hidden="true"
							/>
						</Link>

						{onDonate && (
							<button
								type="button"
								onClick={() => onDonate(organisation)}
								className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#145c35] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0d4528] hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
							>
								Donate now

								<ArrowRight
									className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
									aria-hidden="true"
								/>
							</button>
						)}

					</div>
				)}

			</div>
		</article>
	)
}
