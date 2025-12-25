import type { TTask, TaskResponse } from '@/api/tasks'
import type { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

function useTasksView() {
  const [activeTask, setActiveTask] = useState<TTask | null>(null)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const search = useSearch({ from: '/tasks' })
  const router = useRouter()
  const queryClient = useQueryClient()

  // Detecting search and opening modal
  useEffect(() => {
    const hasAdd = search.hasOwnProperty('task')
    if (hasAdd) {
      const taskId = search.task
      setOpenModal(true)
      const tasksCache: AxiosResponse<TaskResponse> | undefined =
        queryClient.getQueryData(['tasks'])

      if (tasksCache) {
        const task = tasksCache.data.data.find((el) => el.id === taskId)
        if (task) setActiveTask(task)
      }
    }
    return () => setOpenModal(false)
  }, [search])

  const closeModal = () => {
    setOpenModal(false)
    router.navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        task: undefined,
      }),
    })
  }

  return {
    openModal,
    closeModal,
    activeTask,
  }
}

export default useTasksView
