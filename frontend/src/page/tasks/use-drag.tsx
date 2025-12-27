import { updateTaskAPI } from '@/api/tasks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

function useDrag() {
  const queryClient = useQueryClient()

  const updateStateMutation = useMutation({
    mutationFn: updateTaskAPI,
    mutationKey: ['update status'],
  })

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('opacity-[0.6]')
    e.currentTarget.classList.add('bg-gray-300')
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('opacity-[0.6]')
    e.currentTarget.classList.remove('bg-gray-300')
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.remove('opacity-[0.6]')
    e.currentTarget.classList.remove('bg-gray-300')
    console.log(e.dataTransfer.getData('text/plain'))

    const payload = JSON.parse(e.dataTransfer.getData('text/plain'))
    console.log(payload)
    const newStatus = e.currentTarget.dataset.status

    if (payload.status !== newStatus) {
      try {
        toast.info('Updating status')
        await updateStateMutation.mutateAsync({
          id: payload.id,
          data: {
            ...payload,
            status: newStatus,
          },
        })
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        })
        toast.success('Status Updated')
      } catch (error) {
        toast.error('Failed to update status')
      }
    }
  }

  return { handleDragOver, handleDragLeave, handleDrop }
}

export default useDrag
