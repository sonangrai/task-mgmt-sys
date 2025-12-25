import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import TaskForm from './task-form'
import useTasksView from './use-tasks-view'

function EditModal() {
  const { openModal, closeModal, activeTask } = useTasksView()

  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="w-4xl sm:max-w-[unset]">
        <DialogHeader>
          <DialogTitle>Create Tasks</DialogTitle>
        </DialogHeader>

        <TaskForm data={activeTask} />
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
