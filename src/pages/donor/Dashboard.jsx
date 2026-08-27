import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getDonorStats } from '../../services/donorApi'
import { getDonorDonations } from '../../services/donationApi'

export default function DonorDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentDonations, setRecentDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const [statsData, donationsData] = await Promise.all([
          getDonorStats(),
          getDonorDonations({ limit: 5 }),
        ])

        setStats(statsData)
        setRecentDonations(Array.isArray(donationsData) ? donationsData : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#172033]">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your donation activity
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError('')}
          />
        )}

        {/* Stats Grid */}
        {stats && (
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="text-sm font-medium text-gray-600">Total Donated</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                KES {stats.totalDonated || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {stats.donationCount || 0} donations
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Active Recurring</p>
              <p className="mt-2 text-3xl font-bold text-[#28a66a]">
                {stats.activeRecurring || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Monthly contributions
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Organizations Supported</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                {stats.organizationsSupported || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Unique organizations
              </p>
            </Card>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/donor/profile"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">👤</div>
            <h3 className="font-semibold text-[#183b2b]">My Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              View and manage your profile information
            </p>
          </Link>

          <Link
            to="/donor/donations"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-semibold text-[#183b2b]">Donation History</h3>
            <p className="mt-1 text-sm text-gray-600">
              View all your donations
            </p>
          </Link>

          <Link
            to="/donor/recurring-donations"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="font-semibold text-[#183b2b]">Recurring Donations</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage monthly subscriptions
            </p>
          </Link>
        </div>

        {/* Recent Donations */}
        {recentDonations.length > 0 && (
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#183b2b]">Recent Donations</h2>
              <p className="mt-1 text-sm text-gray-600">
                Your latest 5 donations
              </p>
            </div>

            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation._id || donation.id}
                  className="flex items-center justify-between border-t border-gray-200 pt-4 first:border-t-0 first:pt-0"
                >
                  <div className="flex-1">
                    <p className="font-medium text-[#183b2b]">
                      {donation.organization?.name || 'Unknown Organization'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#28a66a]">
                      KES {donation.amount}
                    </p>
                    <p className="text-xs text-gray-500">
                      {donation.type || 'One-time'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/donor/donations"
              className="mt-6 inline-block rounded-full border border-[#183b2b] px-6 py-2 text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
            >
              View All Donations
            </Link>
          </Card>
        )}
      </div>
    </main>
  )
}
