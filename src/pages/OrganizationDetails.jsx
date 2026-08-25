import { useCallback, useEffect, useState } from 'react'
import { getOrganization } from '../services/organizationApi'

export default function OrganizationDetails({ organizationId }) {
  const [organisation, setOrganisation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const load = useCallback(async () => { setLoading(true); setError(''); try { setOrganisation(await getOrganization(organizationId)) } catch (err) { setError(err.message) } finally { setLoading(false) } }, [organizationId])
  useEffect(() => {
    let cancelled = false
    getOrganization(organizationId)
      .then((result) => { if (!cancelled) setOrganisation(result) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [organizationId])
  if (loading) return <main className="section shell"><p>Loading organization...</p></main>
  if (error) return <main className="section shell"><p className="form-error" role="alert">{error} <button type="button" onClick={load}>Try again</button></p></main>
  const name = organisation.name || organisation.organisationName
  const image = organisation.coverImage || organisation.image || organisation.imageUrl || organisation.logo
  const description = organisation.description || organisation.mission || organisation.about
  const location = organisation.location || organisation.county || organisation.address || 'Kenya'
  const areas = organisation.focusAreas || organisation.causes || organisation.categories || []
  return <><section className="detail-hero" style={image ? { backgroundImage: `linear-gradient(90deg, rgba(19, 53, 42, .94), rgba(19, 53, 42, .48)), url(${image})` } : undefined}><div className="shell"><a className="back-link" href="/organizations">← All organizations</a><p className="eyebrow light">{location}</p><h1>{name}</h1><p>{organisation.tagline || 'Creating a positive, lasting difference with community.'}</p></div></section><main className="section shell detail-grid"><article><p className="eyebrow">About the organization</p><h2>Work rooted in community.</h2><p className="detail-text">{description}</p>{organisation.website && <a className="text-link" href={organisation.website} target="_blank" rel="noreferrer">Visit website <span>↗</span></a>}</article><aside className="impact-box"><p className="eyebrow">At a glance</p><dl><div><dt>Location</dt><dd>{location}</dd></div>{areas.length > 0 && <div><dt>Focus areas</dt><dd>{Array.isArray(areas) ? areas.join(', ') : areas}</dd></div>}{organisation.email && <div><dt>Contact</dt><dd><a href={`mailto:${organisation.email}`}>{organisation.email}</a></dd></div>}</dl><a className="button full-button" href={organisation.donationUrl || '/register'}>{organisation.donationUrl ? 'Support this work' : 'Create an account to support'}</a></aside></main></>
}
