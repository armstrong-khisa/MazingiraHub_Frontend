import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Gift, Heart, Leaf, RefreshCw, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import Card from '../../components/Card'
import { getDonorStats } from '../../services/donorApi'
import { getDonorDonations } from '../../services/donationApi'

export default function DonorDashboard() {
  const { user } = useAuth()

  const [stats, setStats] = useState({
    totalDonated: 0,
    donationCount: 0,
    activeRecurring: 0,
    organizationsSupported: 0,
  })

  const [recentDonations, setRecentDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------

  const getUserName = () => {
    return (
      user?.full_name ||
      user?.fullName ||
      user?.name ||
      user?.username ||
      user?.email?.split('@')[0] ||
      'Donor'
    )
  }

  const extractData = (response) => {
    if (!response) {
      return null
    }

    // Backend response:
    // { success: true, data: [...] }
    if (
      typeof response === 'object' &&
      !Array.isArray(response) &&
      response.data !== undefined
    ) {
      return response.data
    }

    // Direct array/object
    return response
  }

  const formatAmount = (amount) => {
    const number = Number(amount || 0)

    return number.toLocaleString('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return 'Date unavailable'
    }

    const date = new Date(dateValue)

    if (Number.isNaN(date.getTime())) {
      return 'Date unavailable'
    }

    return date.toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getDonationOrganization = (donation) => {
    return (
      donation?.organization?.name ||
      donation?.organization_name ||
      donation?.organizationName ||
      donation?.project?.organization?.name ||
      'Unknown Organization'
    )
  }

  const getDonationDate = (donation) => {
    return (
      donation?.created_at ||
      donation?.createdAt ||
      donation?.date ||
      donation?.donated_at ||
      donation?.donatedAt
    )
  }

  const getDonationType = (donation) => {
    return (
      donation?.donation_type ||
      donation?.donationType ||
      donation?.type ||
      'One-time'
    )
  }

  const getDonationAmount = (donation) => {
    return (
      donation?.amount ||
      donation?.total_amount ||
      donation?.totalAmount ||
      0
    )
  }

  const getDonationId = (donation, index) => {
    return (
      donation?.id ||
      donation?._id ||
      donation?.donation_id ||
      `donation-${index}`
    )
  }

  // ------------------------------------------------------------
  // Fetch dashboard data
  // ------------------------------------------------------------

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError('')

        const [statsResponse, donationsResponse] = await Promise.all([
          getDonorStats(),
          getDonorDonations({ limit: 5 }),
        ])

        if (!mounted) {
          return
        }

        // ------------------------------------------------------
        // Stats
        // ------------------------------------------------------

        const statsData = extractData(statsResponse) || {}

        setStats({
          totalDonated:
            Number(
              statsData.totalDonated ??
              statsData.total_donated ??
              statsData.total ??
              0
            ),

          donationCount:
            Number(
              statsData.donationCount ??
              statsData.donation_count ??
              statsData.count ??
              0
            ),

          activeRecurring:
            Number(
              statsData.activeRecurring ??
              statsData.active_recurring ??
              0
            ),

          organizationsSupported:
            Number(
              statsData.organizationsSupported ??
              statsData.organizations_supported ??
              0
            ),
        })

        // ------------------------------------------------------
        // Donations
        // ------------------------------------------------------

        const donationsData = extractData(donationsResponse)

        let donations = []

        if (Array.isArray(donationsData)) {
          donations = donationsData
        } else if (
          donationsData &&
          Array.isArray(donationsData.donations)
        ) {
          donations = donationsData.donations
        } else if (
          donationsData &&
          Array.isArray(donationsData.items)
        ) {
          donations = donationsData.items
        } else if (
          donationsData &&
          Array.isArray(donationsData.results)
        ) {
          donations = donationsData.results
        }

        setRecentDonations(donations.slice(0, 5))
      } catch (err) {
        if (!mounted) {
          return
        }

        console.error('Failed to load donor dashboard:', err)

        setError(
          err?.message ||
          'Unable to load your donation dashboard. Please try again.'
        )
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [])

  // ------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------

  if (loading) {
    return <Loading />
  }

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#172033] sm:text-4xl">
            Welcome back, {getUserName()}!
          </h1>

          <p className="mt-2 text-gray-600">
            Here's an overview of your donation activity.
          </p>
        </div>

        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mb-8">
            <ErrorMessage
              message={error}
              onDismiss={() => setError('')}
            />
          </div>
        )}

        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* Total Donated */}

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Donated
                </p>

                <p className="mt-2 text-2xl font-bold text-[#183b2b] sm:text-3xl">
                  KES {formatAmount(stats.totalDonated)}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Across all donations
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-xl">
                <Heart className="h-5 w-5 text-green-600" aria-hidden="true" />
              </div>
            </div>
          </Card>

          {/* Donation Count */}

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Donations
                </p>

                <p className="mt-2 text-2xl font-bold text-[#183b2b] sm:text-3xl">
                  {stats.donationCount}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Contributions made
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-50 text-xl">
                <Gift className="h-5 w-5 text-pink-600" aria-hidden="true" />
              </div>
            </div>
          </Card>

          {/* Recurring */}

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Recurring
                </p>

                <p className="mt-2 text-2xl font-bold text-[#28a66a] sm:text-3xl">
                  {stats.activeRecurring}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Monthly contributions
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-xl">
                <RefreshCw className="h-5 w-5 text-blue-600" aria-hidden="true" />
              </div>
            </div>
          </Card>

          {/* Organizations */}

          <Card>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Organizations Supported
                </p>

                <p className="mt-2 text-2xl font-bold text-[#183b2b] sm:text-3xl">
                  {stats.organizationsSupported}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Unique organizations
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-50 text-xl">
                <Leaf className="h-5 w-5 text-yellow-600" aria-hidden="true" />
              </div>
            </div>
          </Card>
        </div>

        {/* ======================================================
            NAVIGATION CARDS
        ====================================================== */}

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <Link
            to="/donor/profile"
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#28a66a] hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-2xl transition group-hover:bg-[#183b2b]">
              <User className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="font-semibold text-[#183b2b]">
              My Profile
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              View and manage your profile information.
            </p>
          </Link>

          <Link
            to="/donor/donations"
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#28a66a] hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-2xl transition group-hover:bg-[#183b2b]">
              <Gift className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="font-semibold text-[#183b2b]">
              Donation History
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              View all your donations and their status.
            </p>
          </Link>

          <Link
            to="/donor/recurring-donations"
            className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[#28a66a] hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl transition group-hover:bg-[#183b2b]">
              <RefreshCw className="h-6 w-6" aria-hidden="true" />
            </div>

            <h3 className="font-semibold text-[#183b2b]">
              Recurring Donations
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Manage your recurring contributions.
            </p>
          </Link>
        </div>

        {/* ======================================================
            RECENT DONATIONS
        ====================================================== */}

        <Card>
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-[#183b2b]">
                Recent Donations
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Your latest contributions.
              </p>
            </div>

            {recentDonations.length > 0 && (
              <Link
                to="/donor/donations"
                className="text-sm font-semibold text-[#183b2b] hover:text-[#28a66a]"
              >
                View all <ArrowRight className="ml-1 inline-block h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>

          {recentDonations.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <div className="mb-4 text-4xl">
                <Heart className="mx-auto h-10 w-10 text-green-600" aria-hidden="true" />
              </div>

              <h3 className="font-semibold text-[#183b2b]">
                No donations yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                Your donation history will appear here once you make your
                first contribution.
              </p>

              <Link
                to="/projects"
                className="mt-5 inline-block rounded-full bg-[#183b2b] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24543e]"
              >
                Explore Projects
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentDonations.map((donation, index) => (
                <div
                  key={getDonationId(donation, index)}
                  className="flex flex-col gap-4 border-t border-gray-200 pt-4 first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Organization */}

                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-50 text-lg">
                      <Leaf className="h-5 w-5 text-green-600" aria-hidden="true" />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium text-[#183b2b]">
                        {getDonationOrganization(donation)}
                      </p>

                      <p className="mt-1 text-sm text-gray-600">
                        {formatDate(getDonationDate(donation))}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}

                  <div className="text-left sm:text-right">
                    <p className="font-bold text-[#28a66a]">
                      KES {formatAmount(getDonationAmount(donation))}
                    </p>

                    <p className="mt-1 text-xs capitalize text-gray-500">
                      {getDonationType(donation)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recentDonations.length > 0 && (
            <Link
              to="/donor/donations"
              className="mt-6 inline-block rounded-full border border-[#183b2b] px-6 py-2 text-sm font-semibold text-[#183b2b] transition hover:bg-[#183b2b] hover:text-white"
            >
              View All Donations
            </Link>
          )}
        </Card>
      </div>
    </main>
  )
}
