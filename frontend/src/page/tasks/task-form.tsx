import { createTaskAPI, TaskPriorityEnum, TaskStatusEnum } from '@/api/tasks'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { add } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  status: z.enum(TaskStatusEnum as [string, ...string[]]),
  priority: z.enum(TaskPriorityEnum as [string, ...string[]]),
  due: z.date(),
  completedOn: z.date().nullable(),
})

const minDue = () => {
  const today = new Date()
  return add(today, { days: 7 })
}

function TaskForm() {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'low',
      due: minDue(),
      completedOn: null,
    },
  })

  const createTaskMutation = useMutation({
    mutationKey: ['create task'],
    mutationFn: createTaskAPI,
  })

  const handleSubmit = async (data: z.infer<typeof taskFormSchema>) => {
    try {
      await createTaskMutation.mutateAsync(data)
      await queryClient.invalidateQueries({
        queryKey: ['tasks'],
        refetchType: 'all',
      })
      toast.success('Created a task')

      form.reset()
    } catch (error) {
      toast.error('not created')
    }
  }

  return (
    <form className="flex gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="grow-2 space-y-4">
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp">Title</FieldLabel>
                <Input {...field} />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="otp">Description</FieldLabel>
                <Textarea {...field} rows={300} className="min-h-[300px]" />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </div>

      <div className="w-[30%] space-y-4">
        <FieldGroup>
          <Controller
            name="status"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="status" />
                  </SelectTrigger>
                  <SelectContent>
                    {TaskStatusEnum.map((status) => (
                      <SelectItem
                        value={status}
                        key={status}
                        className="capitalize"
                      >
                        {status.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="priority"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="priority">Priority</FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {TaskPriorityEnum.map((priority) => (
                      <SelectItem
                        value={priority}
                        key={priority}
                        className="capitalize"
                      >
                        {priority.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="due"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="due">Due Date</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date)
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="completedOn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="completedOn">Completed Date</FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString()
                        : 'Select date'}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        field.onChange(date)
                      }}
                    />
                  </PopoverContent>
                </Popover>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Button type="submit" disabled={createTaskMutation.isPending}>
          {createTaskMutation.isPending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </form>
  )
}

export default TaskForm
