
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'
import About from './pages/About'
import ApplyOrganization from './pages/ApplyOrganization'
import Home from './pages/Home'
import HowItWorks from './pages/HowItWorks'
import Login from './pages/Login'
import OrganizationDetails from './pages/OrganizationDetails'
import Organizations from './pages/Organizations'
import Register from './pages/Register'
import Stories from './pages/Stories'

function PublicPage() {
  const path = window.location.pathname
  const detailMatch = path.match(/^\/organizations\/([^/]+)$/)

  if (detailMatch) return <OrganizationDetails organizationId={detailMatch[1]} />
  if (path === '/about') return <About />
  if (path === '/apply') return <ApplyOrganization />
  if (path === '/how-it-works') return <HowItWorks />
  if (path === '/login') return <Login />
  if (path === '/organizations') return <Organizations />
  if (path === '/register') return <Register />
  if (path === '/stories') return <Stories />
  return <Home />
}

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <PublicPage />
      <Footer />
    </AuthProvider>
  )
}

export default App