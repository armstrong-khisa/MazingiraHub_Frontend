export default function OrganizationCard({ organisation }) {
  const id = organisation._id || organisation.id
  const name = organisation.name || organisation.organisationName || 'Community organisation'
  const location = organisation.location || organisation.county || organisation.address || 'Kenya'
  const mission = organisation.mission || organisation.description || organisation.summary || 'Working with communities to create lasting positive change.'
  const image = organisation.logo || organisation.image || organisation.imageUrl || 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=80'
  const raised = organisation.amountRaised || organisation.raised || 'KES 850,000 raised'
  return <article className="organisation-card"><div className="card-image" style={{ backgroundImage: `url(${image})` }} /><div className="card-body"><p className="location-pill">{location}</p><h3>{name}</h3><p>{mission}</p><strong className="raised">{raised}</strong><a className="button card-button" href={`/organizations/${id}`}>Donate</a></div></article>
}
