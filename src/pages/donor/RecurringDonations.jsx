import { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import {
	getDonorProfile,
	updateDonorProfile,
} from '../../services/donorApi'

export default function DonorProfile() {
	const { user } = useAuth()

	const [profile, setProfile] = useState(null)
	const [isEditing, setIsEditing] = useState(false)
	const [formData, setFormData] = useState({})
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				setLoading(true)
				setError('')

				const data = await getDonorProfile()

				setProfile(data)
				setFormData(data)
			} catch (err) {
				setError(err.message || 'Failed to load profile.')
			} finally {
				setLoading(false)
			}
		}

		fetchProfile()
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			setSubmitting(true)
			setError('')
			setSuccess('')

			await updateDonorProfile(formData)

			setProfile(formData)
			setIsEditing(false)
			setSuccess('Profile updated successfully.')

			setTimeout(() => {
				setSuccess('')
			}, 3000)
		} catch (err) {
			setError(err.message || 'Failed to update profile.')
		} finally {
			setSubmitting(false)
		}
	}

	const handleCancel = () => {
		setIsEditing(false)
		setFormData(profile || {})
		setError('')
	}

	const displayName = profile?.name || user?.name || 'Donor'
	const email = profile?.email || user?.email || ''

	const getInitials = (name) => {
		return (
			name
				.split(' ')
				.filter(Boolean)
				.slice(0, 2)
				.map((part) => part[0])
				.join('')
				.toUpperCase() || 'D'
		)
	}

	if (loading) {
		return <Loading />
	}

	return (
		<main className="min-h-screen bg-[#f7f8f3]">
			<div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">

				{/* HEADER */}
				<div className="mb-7">
					<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#23945c]">
						Account
					</p>

					<h1 className="mt-2 text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl">
						My Profile
					</h1>

					<p className="mt-2 text-sm text-gray-500">
						Manage your personal information and account details.
					</p>
				</div>

				{/* ERROR */}
				{error && (
					<div className="mb-5">
						<ErrorMessage
							message={error}
							onDismiss={() => setError('')}
						/>
					</div>
				)}

				{/* SUCCESS */}
				{success && (
					<div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
							<Check className="h-4 w-4" aria-hidden="true" />
						</span>

						{success}
					</div>
				)}

				{!isEditing ? (
					<div className="grid gap-5 lg:grid-cols-[280px_1fr]">

						{/* PROFILE SUMMARY */}
						<Card className="h-fit border border-gray-200 bg-white shadow-sm">
							<div className="flex flex-col items-center text-center">
								<div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#183b2b] text-2xl font-bold text-white shadow-sm">
									{getInitials(displayName)}
								</div>

								<h2 className="mt-4 text-xl font-bold text-[#172033]">
									{displayName}
								</h2>

								<p className="mt-1 max-w-full truncate text-sm text-gray-500">
									{email}
								</p>

								<span className="mt-4 inline-flex rounded-full bg-[#e1f3e8] px-3 py-1 text-xs font-bold text-[#23945c]">
									Donor
								</span>

								<button
									type="button"
									onClick={() => setIsEditing(true)}
									className="mt-6 w-full rounded-full bg-[#183b2b] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#24543e]"
								>
									Edit Profile
								</button>
							</div>
						</Card>

						{/* PERSONAL INFORMATION */}
						<Card className="border border-gray-200 bg-white shadow-sm">
							<div className="flex items-center justify-between border-b border-gray-100 pb-4">
								<div>
									<h2 className="text-lg font-bold text-[#172033]">
										Personal Information
									</h2>

									<p className="mt-1 text-xs text-gray-500">
										Your account details
									</p>
								</div>
							</div>

							<div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">

								<div>
									<p className="text-xs font-bold uppercase tracking-wide text-gray-400">
										Full Name
									</p>

									<p className="mt-1.5 text-sm font-semibold text-[#183b2b]">
										{profile?.name || 'Not provided'}
									</p>
								</div>

								<div>
									<p className="text-xs font-bold uppercase tracking-wide text-gray-400">
										Email
									</p>

									<p className="mt-1.5 break-all text-sm font-semibold text-[#183b2b]">
										{profile?.email || 'Not provided'}
									</p>
								</div>

								<div>
									<p className="text-xs font-bold uppercase tracking-wide text-gray-400">
										Phone
									</p>

									<p className="mt-1.5 text-sm font-semibold text-[#183b2b]">
										{profile?.phone || 'Not provided'}
									</p>
								</div>

								<div>
									<p className="text-xs font-bold uppercase tracking-wide text-gray-400">
										Location
									</p>

									<p className="mt-1.5 text-sm font-semibold text-[#183b2b]">
										{profile?.location || 'Not provided'}
									</p>
								</div>
							</div>

							{profile?.bio && (
								<div className="mt-6 border-t border-gray-100 pt-5">
									<p className="text-xs font-bold uppercase tracking-wide text-gray-400">
										About
									</p>

									<p className="mt-2 text-sm leading-6 text-gray-600">
										{profile.bio}
									</p>
								</div>
							)}
						</Card>
					</div>
				) : (
					<div>
						{/* EDIT PROFILE */}
						<Card className="border border-gray-200 bg-white shadow-sm">
							<div className="border-b border-gray-100 pb-5">
								<h2 className="text-lg font-bold text-[#172033]">
									Edit Profile
								</h2>

								<p className="mt-1 text-sm text-gray-500">
									Update your personal information below.
								</p>
							</div>

							<form
								onSubmit={handleSubmit}
								className="mt-6"
							>
								<div className="grid gap-5 sm:grid-cols-2">

									{/* NAME */}
									<div>
										<label
											htmlFor="name"
											className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
										>
											Full Name
										</label>

										<input
											id="name"
											type="text"
											name="name"
											value={formData.name || ''}
											onChange={handleChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
											placeholder="Your full name"
										/>
									</div>

									{/* EMAIL */}
									<div>
										<label
											htmlFor="email"
											className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
										>
											Email
										</label>

										<input
											id="email"
											type="email"
											name="email"
											value={formData.email || ''}
											onChange={handleChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
											placeholder="you@example.com"
										/>
									</div>

									{/* PHONE */}
									<div>
										<label
											htmlFor="phone"
											className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
										>
											Phone
										</label>

										<input
											id="phone"
											type="tel"
											name="phone"
											value={formData.phone || ''}
											onChange={handleChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
											placeholder="Phone number"
										/>
									</div>

									{/* LOCATION */}
									<div>
										<label
											htmlFor="location"
											className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
										>
											Location
										</label>

										<input
											id="location"
											type="text"
											name="location"
											value={formData.location || ''}
											onChange={handleChange}
											className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
											placeholder="City or county"
										/>
									</div>

									{/* BIO */}
									<div className="sm:col-span-2">
										<label
											htmlFor="bio"
											className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500"
										>
											About You
										</label>

										<textarea
											id="bio"
											name="bio"
											value={formData.bio || ''}
											onChange={handleChange}
											rows={4}
											className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm leading-6 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#23945c] focus:bg-white focus:ring-2 focus:ring-[#23945c]/10"
											placeholder="Tell us a little about yourself..."
										/>
									</div>
								</div>

								{/* BUTTONS */}
								<div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
									<button
										type="button"
										onClick={handleCancel}
										className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
									>
										Cancel
									</button>

									<button
										type="submit"
										disabled={submitting}
										className="rounded-full bg-[#183b2b] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#24543e] disabled:cursor-not-allowed disabled:opacity-50"
									>
										{submitting
											? 'Saving...'
											: 'Save Changes'}
									</button>
								</div>
							</form>
						</Card>
					</div>
				)}
			</div>
		</main>
	)
}
