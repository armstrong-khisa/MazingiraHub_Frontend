import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function AuthModal({ onClose, onLoginSuccess }) {
	const [mode, setMode] = useState('login')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const { login, register } = useAuth()

	const handleSubmit = (e) => {
		e.preventDefault()
		setError('')

		if (!email || !password) {
			setError('Please enter your email and password.')
			return
		}

		if (mode === 'register' && !name) {
			setError('Please enter your name.')
			return
		}

		setLoading(true)
		const action = mode === 'login'
			? login({ email, password })
			: register({ name, email, password })
		action
			.then((user) => onLoginSuccess?.(user))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false))
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
				>
					×
				</button>

				{/* Header */}
				<div className="mb-7 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#183b2b] text-xl text-white">
						↗
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
					<div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-5">

					{/* Name */}
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
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="John Doe"
								className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20"
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
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="you@example.com"
							className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20"
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
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#28a66a] focus:ring-2 focus:ring-[#28a66a]/20"
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
								onClick={() => {
									setMode('register')
									setError('')
								}}
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
								onClick={() => {
									setMode('login')
									setError('')
								}}
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
