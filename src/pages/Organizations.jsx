import { useCallback, useEffect, useState } from 'react'
import OrganizationCard from '../components/OrganizationCard'
import { getOrganizations } from '../services/organizationApi'

export default function Organizations() {
  const [organisations, setOrganisations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const load = useCallback(async () => { setLoading(true); setError(''); try { const results = await getOrganizations(); setOrganisations(Array.isArray(results) ? results : []) } catch (err) { setError(err.message) } finally { setLoading(false) } }, [])
  useEffect(() => {
    let cancelled = false
    getOrganizations()
      .then((results) => { if (!cancelled) setOrganisations(Array.isArray(results) ? results : []) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])
  const shown = organisations.filter((organisation) => `${organisation.name || organisation.organisationName || ''} ${organisation.location || organisation.county || ''}`.toLowerCase().includes(search.toLowerCase()))
  return <><section className="page-hero organisations-hero"><div className="shell"><p className="eyebrow light">Explore environmental action</p><h1>Organizations creating change across Kenya.</h1><p>Choose a cause that speaks to you. Each organization is working alongside communities to create measurable, lasting environmental impact.</p></div></section><main className="organisations-body"><div className="shell"><label className="search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search organizations or locations" aria-label="Search organizations" /></label>{loading ? <p>Finding organizations...</p> : error ? <p className="form-error" role="alert">{error} <button type="button" onClick={load}>Try again</button></p> : shown.length ? <div className="card-grid">{shown.map((organization) => <OrganizationCard key={organization._id || organization.id} organisation={organization} />)}</div> : <p>{search ? 'No organizations match your search.' : 'Approved organizations will appear here soon.'}</p>}</div></main></>
}
