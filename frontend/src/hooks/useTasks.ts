// frontend/src/hooks/useTasks.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { tasksAPI } from '../lib/api';
import { TaskCreateInput, TaskStatus, TaskUpdateInput } from '../types';

export const useTasks = (status?: TaskStatus) => {
  const queryClient = useQueryClient();
  
  // Fetch tasks
  const { data: tasks = [], isLoading, error } = useQuery({
    queryKey: ['tasks', status],
    queryFn: () => tasksAPI.getAllTasks(status),
  });
  
  // Create task
  const createMutation = useMutation({
    mutationFn: (newTask: TaskCreateInput) => tasksAPI.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  // Update task
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskUpdateInput }) => 
      tasksAPI.updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  // Delete task
  const deleteMutation = useMutation({
    mutationFn: (id: number) => tasksAPI.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
  
  return {
    tasks,
    isLoading,
    error,
    createTask: createMutation.mutate,
    updateTask: updateMutation.mutate,
    deleteTask: deleteMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
};

export const useTask = (id: number) => {
  const { data: task, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksAPI.getTask(id),
    enabled: !!id,
  });
  
  return {
    task,
    isLoading,
    error,
  };
};