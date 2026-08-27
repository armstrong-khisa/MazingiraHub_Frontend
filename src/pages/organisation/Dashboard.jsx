import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getOrganizationStats, getDonationStats } from '../../services/organizationService'

export default function OrganizationDashboard() {
  const [stats, setStats] = useState(null)
  const [donationStats, setDonationStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const [statsData, donationStatsData] = await Promise.all([
          getOrganizationStats(),
          getDonationStats(),
        ])

        setStats(statsData)
        setDonationStats(donationStatsData)
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
            Organization Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your organization and track your impact
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
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                KES {stats.totalDonations || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {stats.donationCount || 0} donations
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Active Donors</p>
              <p className="mt-2 text-3xl font-bold text-[#28a66a]">
                {stats.activeDonors || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Unique supporters
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Published Stories</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                {stats.publishedStories || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Impact narratives
              </p>
            </Card>

            <Card>
              <p className="text-sm font-medium text-gray-600">Beneficiaries</p>
              <p className="mt-2 text-3xl font-bold text-[#183b2b]">
                {stats.beneficiaries || 0}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                People impacted
              </p>
            </Card>
          </div>
        )}

        {/* Navigation Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/organization/profile"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">🏢</div>
            <h3 className="font-semibold text-[#183b2b]">My Profile</h3>
            <p className="mt-1 text-sm text-gray-600">
              View and edit organization information
            </p>
          </Link>

          <Link
            to="/organization/donors"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-[#183b2b]">Donors</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage and view your donor community
            </p>
          </Link>

          <Link
            to="/organization/donations"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">💝</div>
            <h3 className="font-semibold text-[#183b2b]">Donations</h3>
            <p className="mt-1 text-sm text-gray-600">
              Track donation patterns and trends
            </p>
          </Link>

          <Link
            to="/organization/beneficiaries"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-[#183b2b]">Beneficiaries</h3>
            <p className="mt-1 text-sm text-gray-600">
              Manage your beneficiary database
            </p>
          </Link>

          <Link
            to="/organization/inventory"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">📦</div>
            <h3 className="font-semibold text-[#183b2b]">Inventory</h3>
            <p className="mt-1 text-sm text-gray-600">
              Track resources and supplies
            </p>
          </Link>

          <Link
            to="/organization/stories"
            className="rounded-lg border border-gray-200 bg-white p-6 transition hover:border-gray-300 hover:shadow-md"
          >
            <div className="text-3xl mb-3">📖</div>
            <h3 className="font-semibold text-[#183b2b]">Stories</h3>
            <p className="mt-1 text-sm text-gray-600">
              Share your impact stories
            </p>
          </Link>
        </div>

        {/* Donation Trends */}
        {donationStats && (
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#183b2b]">Donation Overview</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Donation
                </p>
                <p className="mt-2 text-2xl font-bold text-[#28a66a]">
                  KES {donationStats.averageDonation || 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  Largest Donation
                </p>
                <p className="mt-2 text-2xl font-bold text-[#183b2b]">
                  KES {donationStats.largestDonation || 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  This Month
                </p>
                <p className="mt-2 text-2xl font-bold text-[#183b2b]">
                  KES {donationStats.thisMonth || 0}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recurring Donations
                </p>
                <p className="mt-2 text-2xl font-bold text-[#183b2b]">
                  {donationStats.recurringCount || 0}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  )
}
