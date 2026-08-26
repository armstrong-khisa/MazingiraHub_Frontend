import { Link, NavLink } from 'react-router-dom'

function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-black/5 bg-[#f7f8f3]/95 backdrop-blur">
			<div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
				
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

				<Link
					to="/organizations"
					className="rounded-full bg-[#183b2b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#24543e]"
				>
					Donate Now
				</Link>
			</div>
		</header>
	)
}

export default Navbar
