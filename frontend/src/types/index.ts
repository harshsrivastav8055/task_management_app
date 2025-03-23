// frontend/src/types/index.ts
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string | null;
  created_at: string;
  updated_at: string;
  owner_id: number;
}

export interface TaskCreateInput {
  title: string;
  description: string;
  status: TaskStatus;
  due_date: string | null;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  due_date?: string | null;
}

export interface User {
  id: number;
  email: string;
  username: string;
  is_active: boolean;
}

export interface SignupInput {
  email: string;
  username: string;
  password: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}