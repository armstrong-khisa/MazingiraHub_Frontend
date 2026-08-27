import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const submit = async (event) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await register({ name: form.name, email: form.email, password: form.password })
      window.location.assign('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="form-card auth-card" onSubmit={submit}>
        <a className="brand auth-brand" href="/"><span>✦</span> MazingiraHub</a>
        <p className="eyebrow">Join the community</p>
        <h1>Make room for good work.</h1>
        <p>Create an account to connect with organisations and follow the impact you care about.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <label>Your name<input required name="name" autoComplete="name" value={form.name} onChange={update} /></label>
        <label>Email address<input required name="email" type="email" autoComplete="email" value={form.email} onChange={update} /></label>
        <label>Password<input required name="password" type="password" minLength="8" autoComplete="new-password" value={form.password} onChange={update} /></label>
        <label>Confirm password<input required name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={update} /></label>
        <button className="button" disabled={submitting}>{submitting ? 'Creating account...' : 'Create account'}</button>
        <p className="form-footer">Already have an account? <a href="/login">Log in</a></p>
      </form>
    </section>
  )
}
