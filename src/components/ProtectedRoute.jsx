import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from './Loading'

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If a specific role is required, check if user has that role
  if (requiredRole) {
    const userRole = user?.role || user?.userType || ''
    const normalizedUserRole = userRole.toLowerCase()
    const normalizedRequiredRole = requiredRole.toLowerCase()

    if (normalizedUserRole !== normalizedRequiredRole) {
      return <Navigate to="/" replace />
    }
  }

  return children
}
