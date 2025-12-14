import { getUserAPI } from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, type ReactNode } from 'react'

interface User {
  id: string
  email: string | undefined
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: userData,
    isPending,
    isFetched,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserAPI,
  })

  // Derive user directly from query data
  const user =
    isFetched && userData?.data?.session?.user
      ? {
          id: userData.data.session.user.id,
          email: userData.data.session.user.email,
        }
      : null

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading: isPending,
    error: error as Error | null,
  }

  return (
    <AuthContext.Provider value={value}>
      {isPending ? <>Loading...</> : <>{children}</>}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
