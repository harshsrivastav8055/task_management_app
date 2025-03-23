// frontend/src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: string | null): string => {
  if (!date) return 'No date specified';
  return new Date(date).toLocaleDateString();
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500 bg-yellow-100';
    case 'In Progress':
      return 'text-blue-500 bg-blue-100';
    case 'Completed':
      return 'text-green-500 bg-green-100';
    default:
      return 'text-gray-500 bg-gray-100';
  }
};