import type { TTask, TTaskPriority } from '@/api/tasks'
import { Badge } from './ui/badge'
import { useNavigate } from '@tanstack/react-router'
import { Grip } from 'lucide-react'
import { cn } from '@/lib/utils'

type TaskCardProp = {
  data: TTask
}

const getBadgeType = (pr: TTaskPriority): any => {
  let tp = 'bg-primary'
  switch (pr) {
    case 'urgent':
      tp = 'bg-red-500'
      break

    case 'high':
      tp = 'bg-pink-500'
      break

    case 'medium':
      tp = 'bg-blue-500'
      break

    case 'moderate':
      tp = 'bg-yellow-500'
      break

    case 'low':
      tp = 'bg-cyan-500'
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '0.5'
    e.dataTransfer.setData('text/plain', JSON.stringify(data))
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1'
  }

  return (
    <div
      className="p-1 gap-1 border rounded-sm px-2 py-1 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      id={data.id}
    >
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
        <Badge className={cn(getBadgeType(data.priority), 'rounded-sm')}>
          {data.priority}
        </Badge>
      </div>
    </div>
  )
}

export default TaskCard
