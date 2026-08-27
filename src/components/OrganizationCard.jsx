import { Link } from 'react-router-dom'

export default function OrganizationCard({ organisation, onDonate }) {
  const id = organisation._id || organisation.id
  const name = organisation.name || organisation.organisationName || 'Community organisation'
  const location = organisation.location || organisation.county || organisation.address || 'Kenya'
  const mission = organisation.mission || organisation.description || organisation.summary || 'Working with communities to create lasting positive change.'
  const image = organisation.logo || organisation.image || organisation.imageUrl
  const raised = Number(organisation.amountRaised || organisation.raised || 0)
  const goal = Number(organisation.goal || organisation.targetAmount || 0)
  const percentage = goal ? Math.min(Math.round((raised / goal) * 100), 100) : 0

  return (
    <article className="organisation-card">
      {image && <div className="card-image" style={{ backgroundImage: `url(${image})` }} />}
      <div className="card-body">
        <p className="location-pill">{location}</p>
        <h3>{name}</h3>
        <p>{mission}</p>
        {goal > 0 && (
          <>
            <strong className="raised">KES {raised.toLocaleString()} raised</strong>
            <div className="organization-progress" aria-label={`${percentage}% funded`}>
              <span style={{ width: `${percentage}%` }} />
            </div>
            <p className="organization-goal">Goal: KES {goal.toLocaleString()}</p>
          </>
        )}
        {id && (
          onDonate ? <button className="button card-button" type="button" onClick={() => onDonate(organisation)}>Donate</button> : <Link className="button card-button" to={`/organizations/${id}`}>View organization</Link>
        )}
      </div>
    </article>
  )
}
