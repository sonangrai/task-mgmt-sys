import { useRouter, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

function useTasksCreate() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const search = useSearch({ from: '/tasks' })
  const router = useRouter()

  // Detecting search and opening modal
  useEffect(() => {
    const hasAdd = search.hasOwnProperty('add') && search.add == 'task'
    if (hasAdd) setOpenModal(true)
    return () => setOpenModal(false)
  }, [search])

  const closeModal = () => {
    setOpenModal(false)
    router.navigate({
      to: '.',
      search: (prev) => ({
        ...prev,
        add: undefined,
      }),
    })
  }

  return {
    openModal,
    closeModal,
  }
}

export default useTasksCreate
