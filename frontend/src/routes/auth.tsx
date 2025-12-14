import AuthPage from '@/page/auth'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ context }) => {
    const { auth } = context

    if (auth && auth.isAuthenticated) {
      throw redirect({
        to: '/tasks',
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return <AuthPage />
}
