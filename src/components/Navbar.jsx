import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { House, LogOut, Menu, X } from 'lucide-react'
import AuthModal from '../modals/Auth'
import { getUserRole, useAuth } from '../context/AuthContext'

function Navbar() {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	const { user, isAuthenticated, logout } = useAuth()

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

	// Close auth modal and send authenticated users to their dashboard
	const handleLoginSuccess = (authenticatedUser) => {
		setIsAuthModalOpen(false)

		const role = getUserRole(authenticatedUser)
		const dashboardPath =
			role === 'admin'
				? '/admin/dashboard'
				: role === 'organization'
					? '/organization/dashboard'
					: '/donor/dashboard'

		navigate(dashboardPath, { replace: true })
	}

	// Logout and return to home page
	const handleLogout = () => {
		logout()
		setIsProfileOpen(false)

		// Send user back to the home page
		// replace prevents going back to the protected page
		navigate('/', { replace: true })
	}

	const closeMobileMenu = () => setIsMobileMenuOpen(false)

	// Navigate to the correct dashboard based on role
	const handleDashboard = () => {
		setIsProfileOpen(false)

		const role = getUserRole(user)

		if (role === 'admin') {
			navigate('/admin/dashboard')
		} else if (role === 'organization') {
			navigate('/organization/dashboard')
		} else {
			navigate('/donor/dashboard')
		}
	}

	// Handle Donate button
	const handleDonate = () => {
		if (!isAuthenticated) {
			setIsAuthModalOpen(true)
			return
		}

		navigate('/organizations')
	}

	// Generate user initials
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
						<svg
							className="h-10 w-10 shrink-0"
							viewBox="0 0 40 40"
							role="img"
							aria-label="MazingiraHub logo"
						>
							<rect width="40" height="40" rx="11" fill="#145c36" />
							<path
								d="M11.7 23.3c0-7.3 5.8-12 16.7-13.4 1.4 10.9-3.4 16.7-10.6 16.7-2.2 0-4.3-.7-6.1-3.3Z"
								fill="none"
								stroke="#ffffff"
								strokeWidth="2.2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M11.8 29.1c2.5-6.6 7.5-10.6 14.6-12"
								fill="none"
								stroke="#ffffff"
								strokeWidth="2.2"
								strokeLinecap="round"
							/>
							<path
								d="M16.8 22.7c-.3-2.1.1-4 1.2-5.7"
								fill="none"
								stroke="#ffffff"
								strokeWidth="2.2"
								strokeLinecap="round"
							/>
						</svg>

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

					<nav className={`${isMobileMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 flex-col gap-2 border-b border-black/5 bg-[#f7f8f3] px-6 py-4 shadow-lg md:hidden`}>
						{['/', '/organizations', '/stories', '/how-it-works', '/about'].map((path) => {
							const labels = { '/': 'Home', '/organizations': 'Organizations', '/stories': 'Stories', '/how-it-works': 'How It Works', '/about': 'About' }
							return <NavLink key={path} to={path} onClick={closeMobileMenu} className="rounded-lg px-3 py-3 text-sm font-semibold text-gray-600 hover:bg-white hover:text-[#183b2b]">{labels[path]}</NavLink>
						})}
					</nav>

					{/* Right side */}
					<div className="flex items-center gap-3">
						<button type="button" onClick={() => setIsMobileMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#183b2b] md:hidden" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>

						{/* Sign In / Profile */}
						{!isAuthenticated ? (
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
								{/* Profile button */}
								<button
									type="button"
									onClick={() =>
										setIsProfileOpen((prev) => !prev)
									}
									className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-[#183b2b] transition hover:border-[#28a66a]"
								>
									{/* Avatar */}
									<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#183b2b] text-xs font-bold text-white">
										{getInitials(user?.name)}
									</div>

									<span className="hidden max-w-[120px] truncate sm:block">
										{user?.name || 'User'}
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
									<div className="absolute right-0 mt-3 w-[min(16rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-xl">

										{/* User information */}
										<div className="border-b border-gray-100 px-5 py-4">
											<p className="text-sm font-semibold text-[#183b2b]">
												{user?.name || 'User'}
											</p>

											<p className="mt-1 truncate text-xs text-gray-500">
												{user?.email || ''}
											</p>
										</div>

										{/* Dashboard */}
										<button
											type="button"
											onClick={handleDashboard}
											className="flex w-full items-center gap-3 px-5 py-3 text-left text-sm text-gray-700 transition hover:bg-[#f7f8f3] hover:text-[#183b2b]"
										>
											<House className="h-4 w-4" aria-hidden="true" />

											Dashboard
										</button>

										{/* Logout */}
										<button
											type="button"
											onClick={handleLogout}
											className="flex w-full items-center gap-3 border-t border-gray-100 px-5 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
										>
											<LogOut className="h-4 w-4" aria-hidden="true" />

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
