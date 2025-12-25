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
  due: String
  completedOn: String | null
  updated_at: String | null
  created_at: String
  deleted_at: String | null
}

export type TaskResponse = TResponse<TTask[]>

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

// Update task
export const updateTaskAPI = async ({
  id,
  data,
}: {
  id: string
  data: Partial<z.infer<typeof taskFormSchema>>
}): Promise<AxiosResponse<TaskResponse>> => {
  const res = await axiosInstance.put(`/task/${id}`, JSON.stringify(data))
  return res
}
