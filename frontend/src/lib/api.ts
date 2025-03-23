// frontend/src/lib/api.ts
import axios from 'axios';
import { Task, TaskCreateInput, TaskUpdateInput, SignupInput, LoginInput, AuthResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for cookies
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  signup: async (data: SignupInput) => {
    const response = await api.post<any>('/auth/signup', data);
    return response.data;
  },
  
  login: async (data: LoginInput) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    const response = await api.post<AuthResponse>('/auth/token', formData);
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getAllTasks: async (status?: string) => {
    const params = status ? { status } : {};
    const response = await api.get<Task[]>('/tasks', { params });
    return response.data;
  },
  
  getTask: async (id: number) => {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },
  
  createTask: async (data: TaskCreateInput) => {
    const response = await api.post<Task>('/tasks', data);
    return response.data;
  },
  
  updateTask: async (id: number, data: TaskUpdateInput) => {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },
  
  deleteTask: async (id: number) => {
    await api.delete(`/tasks/${id}`);
    return id;
  },
};