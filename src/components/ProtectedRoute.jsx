import { Navigate } from 'react-router-dom'
import { getUserRole, useAuth } from '../context/AuthContext'
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
    const normalizedUserRole = getUserRole(user)
    const normalizedRequiredRole = requiredRole.toLowerCase().replace('organisation', 'organization')

    if (normalizedUserRole !== normalizedRequiredRole) {
      return <Navigate to="/" replace />
    }
  }

  return children
}
