import type { TTask, TTaskPriority } from '@/api/tasks'
import { Badge } from './ui/badge'
import { useNavigate } from '@tanstack/react-router'

type TaskCardProp = {
  data: TTask
}

const getBadgeType = (pr: TTaskPriority): any => {
  let tp = 'default'
  switch (pr) {
    case 'urgent':
      tp = 'destructive'
      break

    case 'high':
      tp = 'destructive'
      break

    case 'medium':
      tp = 'secondary'
      break

    case 'moderate':
      tp = 'outline'
      break

    case 'low':
      tp = 'outline'
      break
  }

  return tp
}

function TaskCard({ data }: TaskCardProp) {
  const navigate = useNavigate()

  const openTask = () => {
    navigate({
      to: '/tasks',
      search: (prev) => ({
        ...prev,
        task: data.id,
      }),
    })
  }
  return (
    <div
      className="p-1 gap-1 border rounded-sm px-2 py-1 cursor-pointer"
      onClick={openTask}
    >
      <h3 className="font-medium text-sm">{data.title}</h3>
      <div className="overflow-hidden text-xs my-2 text-gray-500">
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="inline-block max-h-10 overflow-hidden"
        />
      </div>
      <div>
        <Badge className="rounded-sm" variant={getBadgeType(data.priority)}>
          {data.priority}
        </Badge>
      </div>
    </div>
  )
}

export default TaskCard
