import { api } from '@/api/api';
import type { Task, TasksResponse } from '@/types/task';

export async function getTasks(page = 1, limit = 10) {
  const res = await api.get<TasksResponse>('/tasks', {
    params: { page, limit },
  });
  return res.data;
}

export type CreateTaskDto = {
  title: string;
  description?: string;
  performerId?: number;
};

export async function createTask(dto: CreateTaskDto) {
  const res = await api.post<Task>('/tasks', dto);
  return res.data;
}

export type UpdateTaskDto = Partial<CreateTaskDto>;

export async function updateTask(id: number, dto: UpdateTaskDto) {
  const res = await api.patch<Task>(`/tasks/${id}`, dto);
  return res.data;
}

export async function deleteTask(id: number) {
  await api.delete(`/tasks/${id}`);
}
