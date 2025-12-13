import { getUserAPI } from '@/api/auth'
import { useQuery } from '@tanstack/react-query'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface User {
  id: string
  email: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const {
    data: userData,
    isPending,
    isFetched,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUserAPI,
  })

  useEffect(() => {
    if (!isPending && isFetched)
      setUser({
        id: userData?.data.session?.user.id as string,
        email: userData?.data.session?.user.email as string,
      })
  }, [userData, isFetched, isPending])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading: isPending,
      }}
    >
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
