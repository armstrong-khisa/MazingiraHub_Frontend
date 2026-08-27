import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ClipboardList, Gift, Settings, User } from 'lucide-react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getAdminStats } from '../../services/adminApi'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        setError('')
        const data = await getAdminStats()
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <Loading />

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#172033]">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Platform overview and administration tools
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
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <p className="text-sm font-medium text-gray-600">Total Organizations</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                {stats.totalOrganizations || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Active and verified
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Pending Applications</p>
              <p className="mt-2 text-3xl font-bold text-yellow-600">
                {stats.pendingApplications || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Awaiting review
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Total Donors</p>
              <p className="mt-2 text-3xl font-bold text-[#28a66a]">
                {stats.totalDonors || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Active contributors
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                KES {stats.totalDonations || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                All time
              </p>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/applications"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <ClipboardList className="mb-3 h-8 w-8 text-[#23945c]" aria-hidden="true" />
            <h3 className="font-semibold text-[#183b2b]">Applications</h3>
            <p className="mt-1 text-sm text-gray-600">
              Review pending organization applications
            </p>
          </Link>

          <Link
            to="/admin/organizations"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <Building2 className="mb-3 h-8 w-8 text-[#23945c]" aria-hidden="true" />
            <h3 className="font-semibold text-[#183b2b]">Organizations</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage all organizations on the platform
            </p>
          </Link>

          <Link
            to="/admin/donations"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <Gift className="mb-3 h-8 w-8 text-[#23945c]" aria-hidden="true" />
            <h3 className="font-semibold text-[#183b2b]">Donations</h3>
            <p className="mt-1 text-sm text-gray-600">
              View all donations and transactions
            </p>
          </Link>

          <Link
            to="/admin/profile"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <User className="mb-3 h-8 w-8 text-[#23945c]" aria-hidden="true" />
            <h3 className="font-semibold text-[#183b2b]">My Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              View and edit your administrator account
            </p>
          </Link>

          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <Settings className="mb-3 h-8 w-8 text-[#23945c]" aria-hidden="true" />
            <h3 className="font-semibold text-[#183b2b]">Settings</h3>
            <p className="mt-1 text-sm text-gray-600">
              Platform settings and configuration
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        {stats && (
          <Card>
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  This Month Donations
                </p>
                <p className="mt-2 text-2xl font-bold text-[#28a66a]">
                  KES {stats.thisMonthDonations || 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  Approved Organizations
                </p>
                <p className="mt-2 text-2xl font-bold text-[#183b2b]">
                  {stats.approvedOrganizations || 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  Platform Users
                </p>
                <p className="mt-2 text-2xl font-bold text-[#183b2b]">
                  {stats.totalUsers || 0}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
