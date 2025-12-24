import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useTasksCreate from './use-tasks-create'
import TaskForm from './task-form'

function CreateModal() {
  const { openModal, closeModal } = useTasksCreate()

  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="w-4xl sm:max-w-[unset]">
        <DialogHeader>
          <DialogTitle>Create Tasks</DialogTitle>
        </DialogHeader>

        <TaskForm />
      </DialogContent>
    </Dialog>
  )
}

export default CreateModal
