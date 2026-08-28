import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProtectedRoute from '../components/ProtectedRoute'
import { useAuth } from '../context/AuthContext'

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
  getUserRole: (user) =>
    (user?.role || '').toLowerCase().replace('organisation', 'organization'),
}))

function renderRoute(authState, requiredRole = 'donor') {
  useAuth.mockReturnValue(authState)

  return render(
    <MemoryRouter initialEntries={['/protected']}>
      <Routes>
        <Route
          path="/protected"
          element={
            <ProtectedRoute requiredRole={requiredRole}>
              <p>Protected content</p>
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<p>Home page</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading while authentication is being checked', () => {
    renderRoute({ isLoading: true, isAuthenticated: false, user: null })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('redirects unauthenticated users to home', () => {
    renderRoute({ isLoading: false, isAuthenticated: false, user: null })

    expect(screen.getByText('Home page')).toBeInTheDocument()
  })

  it('redirects authenticated users with the wrong role', () => {
    renderRoute(
      { isLoading: false, isAuthenticated: true, user: { role: 'admin' } },
      'donor',
    )

    expect(screen.getByText('Home page')).toBeInTheDocument()
  })

  it('renders protected content for the required role', () => {
    renderRoute(
      { isLoading: false, isAuthenticated: true, user: { role: 'organisation' } },
      'organization',
    )

    expect(screen.getByText('Protected content')).toBeInTheDocument()
  })
})
