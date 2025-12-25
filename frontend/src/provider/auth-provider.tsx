import { getUserAPI } from '@/api/auth'
import { Toaster } from '@/components/ui/sonner'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, type ReactNode } from 'react'

interface User {
  id: string
  email: string | undefined
}

type AuthContextType = {
  user: User | null
  token: string | null
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
    token: userData?.data.session?.access_token as string,
    isAuthenticated: !!user,
    isLoading: isPending,
    error: error as Error | null,
  }

  return (
    <AuthContext.Provider value={value}>
      {isPending ? <>Loading...</> : <>{children}</>}
      <Toaster />
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
