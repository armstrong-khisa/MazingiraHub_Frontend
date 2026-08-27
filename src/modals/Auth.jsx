import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function AuthModal({ onClose, onLoginSuccess }) {
	const [mode, setMode] = useState('login')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const { login, register } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		// Trim values before sending them
		const cleanName = name.trim()
		const cleanEmail = email.trim().toLowerCase()
		const cleanPassword = password

		// Basic validation
		if (!cleanEmail || !cleanPassword) {
			setError('Please enter your email and password.')
			return
		}

		if (mode === 'register' && !cleanName) {
			setError('Please enter your full name.')
			return
		}

		setLoading(true)

		try {
			let user

			if (mode === 'login') {
				user = await login({
					email: cleanEmail,
					password: cleanPassword,
				})
			} else {
				user = await register({
					full_name: cleanName,
					email: cleanEmail,
					password: cleanPassword,
				})
			}

			onLoginSuccess?.(user)
		} catch (err) {
			setError(
				err?.message ||
				(mode === 'login'
					? 'Login failed. Please check your email and password.'
					: 'Registration failed. Please try again.')
			)
		} finally {
			setLoading(false)
		}
	}

	const switchMode = (newMode) => {
		setMode(newMode)
		setError('')
	}

	return (
		<div
			className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close */}
				<button
					type="button"
					onClick={onClose}
					className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-2xl text-gray-400 hover:bg-gray-100 hover:text-gray-700"
					aria-label="Close"
				>
					<X className="h-4 w-4" aria-hidden="true" />
				</button>

				{/* Header */}
				<div className="mb-7 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#183b2b] text-xl text-white">
						<ArrowUpRight className="h-5 w-5" aria-hidden="true" />
					</div>

					<h2 className="text-2xl font-bold text-[#183b2b]">
						{mode === 'login'
							? 'Welcome back'
							: 'Create an account'}
					</h2>

					<p className="mt-2 text-sm text-gray-500">
						{mode === 'login'
							? 'Sign in to continue.'
							: 'Create an account to get started.'}
					</p>
				</div>

				{/* Error */}
				{error && (
					<div
						className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
						role="alert"
					>
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">
					{/* Full Name */}
					{mode === 'register' && (
						<div>
							<label
								htmlFor="name"
								className="mb-2 block text-sm font-medium text-gray-700"
							>
								Full name
							</label>

							<input
								id="name"
								name="full_name"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="John Doe"
								autoComplete="name"
								disabled={loading}
								className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20 disabled:bg-gray-100"
							/>
						</div>
					)}

					{/* Email */}
					<div>
						<label
							htmlFor="email"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Email address
						</label>

						<input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							autoComplete="email"
							disabled={loading}
							className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20 disabled:bg-gray-100"
						/>
					</div>

					{/* Password */}
					<div>
						<label
							htmlFor="password"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Password
						</label>

						<input
							id="password"
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							autoComplete={
								mode === 'login'
									? 'current-password'
									: 'new-password'
							}
							disabled={loading}
							className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20 disabled:bg-gray-100"
						/>
					</div>

					{/* Submit */}
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-lg bg-[#183b2b] px-4 py-3 font-semibold text-white transition hover:bg-[#24543e] disabled:cursor-not-allowed disabled:opacity-60"
					>
						{loading
							? 'Please wait...'
							: mode === 'login'
								? 'Sign In'
								: 'Create Account'}
					</button>
				</form>

				{/* Switch mode */}
				<div className="mt-6 text-center text-sm text-gray-500">
					{mode === 'login' ? (
						<>
							Don't have an account?{' '}
							<button
								type="button"
								onClick={() => switchMode('register')}
								className="font-semibold text-[#183b2b] hover:text-[#28a66a]"
							>
								Create account
							</button>
						</>
					) : (
						<>
							Already have an account?{' '}
							<button
								type="button"
								onClick={() => switchMode('login')}
								className="font-semibold text-[#183b2b] hover:text-[#28a66a]"
							>
								Sign in
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

export default AuthModal
