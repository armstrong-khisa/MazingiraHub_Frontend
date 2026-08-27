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

  const raised = Number(
    organisation.amountRaised || organisation.raised || 0
  )

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image}
            alt={`${name} logo`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
            <Heart className="h-12 w-12 text-emerald-600" aria-hidden="true" />
          </div>
        )}

      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-4 inline-flex w-fit items-center rounded-full bg-[#dcf8e6] px-3 py-1.5 text-xs font-bold text-[#168047]">
          <MapPin className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
          {location}
        </span>
        {/* Organization name */}
        <h3 className="mb-2 line-clamp-2 text-xl font-bold leading-tight text-gray-900">
          {name}
        </h3>

        {/* Mission */}
        <p className="mb-5 line-clamp-3 text-sm leading-6 text-gray-500">
          {mission}
        </p>

        <p className="mt-auto text-sm font-bold text-[#168047]">
          KES {raised.toLocaleString()} raised
        </p>

        {/* Actions */}
        {id && (
          <div className="mt-5 flex gap-3">
            <Link
              to={`/organizations/${id}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-50 hover:shadow-sm"
            >
              View organization
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
            {onDonate && (
              <button
                type="button"
                onClick={() => onDonate(organisation)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#145c35] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0d4528] hover:shadow-lg hover:shadow-emerald-600/20 active:scale-[0.98]"
              >
                Donate now
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
