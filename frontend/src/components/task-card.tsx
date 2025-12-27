import type { TTask, TTaskPriority } from '@/api/tasks'
import { Badge } from './ui/badge'
import { useNavigate } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Eye, Grip } from 'lucide-react'

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
    <div className="p-1 gap-1 border rounded-sm px-2 py-1 cursor-pointer">
      <div className="flex gap-2">
        <button className="flex cursor-grab mt-0.5">
          <Grip className="w-4 h-4" />
        </button>
        <h3 className="font-medium text-sm" onClick={openTask}>
          {data.title}
        </h3>
      </div>
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
