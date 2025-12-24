import type { AxiosResponse } from 'axios'
import axiosInstance, { type TResponse } from './config'

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

export const getTaskAPI = async (): Promise<AxiosResponse<TaskResponse>> => {
  const res = await axiosInstance.get('/task')
  return res
}
