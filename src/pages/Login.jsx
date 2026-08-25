import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth(); const [form, setForm] = useState({ email: '', password: '' }); const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false)
  const submit = async (event) => { event.preventDefault(); setSubmitting(true); setError(''); try { await login(form); window.location.assign('/') } catch (err) { setError(err.message) } finally { setSubmitting(false) } }
  return <section className="auth-page"><form className="form-card auth-card" onSubmit={submit}><a className="brand auth-brand" href="/"><span>✦</span> MazingiraHub</a><p className="eyebrow">Welcome back</p><h1>Log in to your account.</h1><p>Continue supporting the work that matters to you.</p>{error && <p className="form-error" role="alert">{error}</p>}<label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })}/></label><label>Password<input required type="password" autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })}/></label><button className="button" disabled={submitting}>{submitting ? 'Logging in...' : 'Log in'}</button><p className="form-footer">New to MazingiraHub? <a href="/register">Create an account</a></p></form></section>
}
