import AuthPage from '@/page/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return <AuthPage />
}
