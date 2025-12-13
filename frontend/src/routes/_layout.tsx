import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout')({
  beforeLoad: async ({ context }) => {
    const { auth } = context

    if (auth && auth.isAuthenticated) {
      throw redirect({
        to: '/',
      })
    }
  },
  component: PublicLayout,
})

function PublicLayout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
