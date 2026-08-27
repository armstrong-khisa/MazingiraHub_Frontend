import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthModal from '../modals/Auth'

function Navbar() {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user')

		if (!savedUser) return null

		try {
			return JSON.parse(savedUser)
		} catch {
			localStorage.removeItem('user')
			return null
		}
	})

	const profileRef = useRef(null)
	const navigate = useNavigate()

	// Close profile dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileRef.current &&
				!profileRef.current.contains(event.target)
			) {
				setIsProfileOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleLoginSuccess = (loggedInUser) => {
		setUser(loggedInUser)
		setIsAuthModalOpen(false)
	}

	const handleLogout = () => {
		localStorage.removeItem('user')
		setUser(null)
		setIsProfileOpen(false)
		navigate('/')
	}

	const handleDashboard = () => {
		setIsProfileOpen(false)
		navigate('/dashboard')
	}

	const handleDonate = () => {
		if (!user) {
			setIsAuthModalOpen(true)
			return
		}

		navigate('/organizations')
	}

	const getInitials = (name) => {
		if (!name) return 'U'

		return name
			.split(' ')
			.map((word) => word[0])
			.join('')
			.substring(0, 2)
			.toUpperCase()
	}

	return (
		<>
			<header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f8f3]/95 backdrop-blur">
				<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-3"
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#183b2b] text-xl text-white">
							↗
						</div>

						<span className="text-xl font-bold tracking-tight">
							MazingiraHub
						</span>
					</Link>

					{/* Navigation */}
					<nav className="hidden items-center gap-8 md:flex">

						<NavLink
							to="/"
							className={({ isActive }) =>
								`relative py-2 text-sm font-medium transition ${
									isActive
										? 'text-[#183b2b] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#28a66a]'
										: 'text-gray-500 hover:text-[#183b2b]'
								}`
							}
						>
							Home
						</NavLink>

						<NavLink
							to="/organizations"
							className={({ isActive }) =>
								`relative py-2 text-sm font-medium transition ${
									isActive
										? 'text-[#183b2b] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#28a66a]'
										: 'text-gray-500 hover:text-[#183b2b]'
								}`
							}
						>
							Organizations
						</NavLink>

						<NavLink
							to="/stories"
							className={({ isActive }) =>
								`relative py-2 text-sm font-medium transition ${
									isActive
										? 'text-[#183b2b] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#28a66a]'
										: 'text-gray-500 hover:text-[#183b2b]'
								}`
							}
						>
							Stories
						</NavLink>

						<NavLink
							to="/how-it-works"
							className={({ isActive }) =>
								`relative py-2 text-sm font-medium transition ${
									isActive
										? 'text-[#183b2b] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#28a66a]'
										: 'text-gray-500 hover:text-[#183b2b]'
								}`
							}
						>
							How It Works
						</NavLink>

						<NavLink
							to="/about"
							className={({ isActive }) =>
								`relative py-2 text-sm font-medium transition ${
									isActive
										? 'text-[#183b2b] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#28a66a]'
										: 'text-gray-500 hover:text-[#183b2b]'
								}`
							}
						>
							About
						</NavLink>

					</nav>

					{/* Right side */}
					<div className="flex items-center gap-3">

						{/* Sign In / Profile */}
						{!user ? (
							<button
								type="button"
								onClick={() => setIsAuthModalOpen(true)}
								className="rounded-full border border-[#183b2b] px-5 py-3 text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
							>
								Sign In
							</button>
						) : (
							<div
								ref={profileRef}
								className="relative"
							>
								<button
									type="button"
									onClick={() =>
										setIsProfileOpen(!isProfileOpen)
									}
									className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-[#183b2b] transition hover:border-[#28a66a]"
								>
									{/* Avatar */}
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#183b2b] text-xs font-bold text-white">
										{getInitials(user.name)}
									</div>

									<span className="hidden max-w-[120px] truncate sm:block">
										{user.name}
									</span>

									<svg
										className={`h-4 w-4 transition-transform ${
											isProfileOpen
												? 'rotate-180'
												: ''
										}`}
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="m19 9-7 7-7-7"
										/>
									</svg>
								</button>

								{/* Profile dropdown */}
								{isProfileOpen && (
									<div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl">

										{/* User information */}
										<div className="border-b border-gray-100 px-5 py-4">
											<p className="text-sm font-semibold text-[#183b2b]">
												{user.name}
											</p>

											<p className="mt-1 truncate text-xs text-gray-500">
												{user.email}
											</p>
										</div>

										{/* Dashboard */}
										<button
											type="button"
											onClick={handleDashboard}
											className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-700 transition hover:bg-[#f7f8f3] hover:text-[#183b2b]"
										>
											<span className="text-lg">
												⌂
											</span>
											Dashboard
										</button>

										{/* Logout */}
										<button
											type="button"
											onClick={handleLogout}
											className="flex w-full items-center gap-3 border-t border-gray-100 px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
										>
											<span className="text-lg">
												↪
											</span>
											Logout
										</button>
									</div>
								)}
							</div>
						)}

						{/* Donate */}
						<button
							type="button"
							onClick={handleDonate}
							className="rounded-full bg-[#183b2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24543e]"
						>
							Donate Now
						</button>

					</div>
				</div>
			</header>

			{/* Auth Modal */}
			{isAuthModalOpen && (
				<AuthModal
					onClose={() => setIsAuthModalOpen(false)}
					onLoginSuccess={handleLoginSuccess}
				/>
			)}
		</>
	)
}

export default Navbar
