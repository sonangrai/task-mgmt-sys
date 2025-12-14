import Header from '@/components/Header'
import TasksPage from '@/page/tasks'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks')({
  beforeLoad: ({ context }) => {
    const { auth } = context

    if (auth && !auth.isAuthenticated) {
      throw redirect({
        to: '/auth',
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <TasksPage />
    </>
  )
}
