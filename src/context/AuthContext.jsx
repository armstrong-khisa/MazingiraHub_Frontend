/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginAccount, registerAccount } from '../services/authApi'

const AuthContext = createContext(null)
const TOKEN_KEY = 'mazingira_token'
const USER_KEY = 'mazingira_user'

function userFromResponse(response) {
  return response.user || response.data?.user || response.data || response
}

function tokenFromResponse(response) {
  return response.token || response.accessToken || response.data?.token || response.data?.accessToken
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
  })
  const [isLoading, setIsLoading] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)))

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (!token) return undefined

    getCurrentUser()
      .then((response) => {
        const currentUser = userFromResponse(response)
        setUser(currentUser)
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
        setUser(null)
      })
      .finally(() => setIsLoading(false))

    return undefined
  }, [])

  const startSession = useCallback((response) => {
    const token = tokenFromResponse(response)
    const currentUser = userFromResponse(response)
    if (token) localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
    setUser(currentUser)
    return currentUser
  }, [])

  const login = useCallback(async (credentials) => startSession(await loginAccount(credentials)), [startSession])
  const register = useCallback(async (details) => startSession(await registerAccount(details)), [startSession])
  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const value = useMemo(() => ({ user, isLoading, isAuthenticated: Boolean(user), login, register, logout }), [user, isLoading, login, register, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
