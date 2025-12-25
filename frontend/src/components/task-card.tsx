import type { TTask, TTaskPriority } from '@/api/tasks'
import { Badge } from './ui/badge'

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
  return (
    <div className="p-1 gap-1 border rounded-sm px-2 py-1">
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
