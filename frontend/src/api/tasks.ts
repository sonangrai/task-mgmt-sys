import type { AxiosResponse } from 'axios'
import axiosInstance, { type TResponse } from './config'
import type { taskFormSchema } from '@/page/tasks/task-form'
import * as z from 'zod'

export const TaskStatusEnum = [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
  'on_hold',
]

export type TTaskStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'on_hold'

export const TaskPriorityEnum = ['urgent', 'high', 'medium', 'moderate', 'low']

export type TTaskPriority = 'urgent' | 'high' | 'medium' | 'moderate' | 'low'

export type TTask = {
  id: string
  userId: string
  title: string
  description: string
  status: TTaskStatus
  priority: TTaskPriority
  due: string
  completedOn: string | null
  updated_at: string | null
  created_at: string
  deleted_at: string | null
}

type TaskResponse = TResponse<TTask[]>

// Get tasks
export const getTaskAPI = async (): Promise<AxiosResponse<TaskResponse>> => {
  const res = await axiosInstance.get('/task')
  return res
}

// Create task
export const createTaskAPI = async (
  data: z.infer<typeof taskFormSchema>,
): Promise<AxiosResponse<TaskResponse>> => {
  const res = await axiosInstance.post('/task', JSON.stringify(data))
  return res
}
