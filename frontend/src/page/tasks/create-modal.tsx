import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useTasksCreate from './use-tasks-create'

function CreateModal() {
  const { openModal, closeModal } = useTasksCreate()

  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Tasks</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CreateModal
