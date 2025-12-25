import Header from '@/components/Header'
import TasksPage from '@/page/tasks'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { z } from 'zod'

const searchSchema = z.object({
  add: z.string().optional(),
  task: z.string().optional(),
})

export const Route = createFileRoute('/tasks')({
  validateSearch: searchSchema,
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
