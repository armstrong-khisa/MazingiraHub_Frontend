import { Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'
import Organizations from './pages/Organizations'
import OrganizationDetails from './pages/OrganizationDetails'
import Stories from './pages/Stories'
import StoryDetails from './pages/StoryDetails'
import ApplyOrganization from './pages/ApplyOrganization'
import NotFound from './pages/NotFound'

// Donor pages
import DonorDashboard from './pages/donor/Dashboard'
import DonorProfile from './pages/donor/Profile'
import DonorMyDonations from './pages/donor/MyDonations'
import DonorRecurringDonations from './pages/donor/RecurringDonations'

// Organization pages
import OrganizationDashboard from './pages/organisation/Dashboard'
import OrganizationProfile from './pages/organisation/Profile'
import OrganizationDonors from './pages/organisation/Donors'
import OrganizationDonations from './pages/organisation/Donations'
import OrganizationBeneficiaries from './pages/organisation/Beneficiaries'
import OrganizationInventory from './pages/organisation/Inventory'
import OrganizationStories from './pages/organisation/Stories'

// Admin pages
import AdminDashboard from './pages/admin/Dashboard'
import AdminApplications from './pages/admin/Applications'
import AdminOrganisations from './pages/admin/Organisations'
import AdminDonations from './pages/admin/Donations'
import AdminProfile from './pages/admin/Profile'

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route
          path="/organizations/:id"
          element={<OrganizationDetails />}
        />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetails />} />
        <Route
          path="/apply-organization"
          element={<ApplyOrganization />}
        />

        {/* Donor Routes */}
        <Route
          path="/donor/dashboard"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/profile"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/donations"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorMyDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/donor/recurring-donations"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonorRecurringDonations />
            </ProtectedRoute>
          }
        />

        {/* Organization Routes */}
        <Route
          path="/organization/dashboard"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/profile"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/donors"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationDonors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/donations"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/beneficiaries"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationBeneficiaries />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/inventory"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationInventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/organization/stories"
          element={
            <ProtectedRoute requiredRole="organization">
              <OrganizationStories />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/applications"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/organizations"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminOrganisations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDonations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminProfile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </AuthProvider>
  )
}

export default App
