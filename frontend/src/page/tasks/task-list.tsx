import type { TTask } from '@/api/tasks'
import TaskCard from '@/components/task-card'
import useDrag from './use-drag'

function TaskList({
  stat,
  taskData,
}: {
  stat: string
  taskData: TTask[] | undefined
}) {
  const { handleDragLeave, handleDragOver, handleDrop } = useDrag()

  return (
    <div
      className="flex flex-col gap-2 py-2 h-full"
      id={`dropzone-${stat}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-status={stat}
    >
      {taskData &&
        taskData
          .filter((a) => a?.status == stat)
          .map((task) => <TaskCard key={task.id} data={task} />)}
    </div>
  )
}

export default TaskList
