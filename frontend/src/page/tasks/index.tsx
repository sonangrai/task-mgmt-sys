import { getTaskAPI } from '@/api/tasks'
import Loader from '@/components/loader'
import TaskCard from '@/components/task-card'
import { useQuery } from '@tanstack/react-query'
import CreateModal from './create-modal'
import EditModal from './edit-modal'

const taskStatus = [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
  'on_hold',
]

function TasksPage() {
  const { data: taskData, isPending } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTaskAPI,
  })

  if (isPending) return <Loader />

  return (
    <>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-5 gap-4">
          {taskStatus.map((stat) => (
            <div key={stat} className="rounded-sm border px-4 py-2">
              <h2 className="capitalize font-medium bg-gray-100 py-1 px-2 rounded-sm">
                {stat.replace('_', ' ')}
              </h2>
              <div className="grid grid-cols-1 gap-2 py-2">
                {taskData &&
                  taskData.data.data
                    .filter((a) => a?.status == stat)
                    .map((task) => <TaskCard key={task.id} data={task} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CreateModal />
      <EditModal />
    </>
  )
}

export default TasksPage
