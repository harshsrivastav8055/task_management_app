// frontend/src/components/TaskCard.tsx
import React from 'react';
import { Link } from '@tanstack/react-router';
import { Task } from '../types';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { formatDate, getStatusColor } from '../lib/utils';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: 'Pending' | 'In Progress' | 'Completed') => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onStatusChange }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{task.title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
        
        {task.due_date && (
          <p className="text-xs text-gray-500">
            Due: {formatDate(task.due_date)}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onDelete(task.id)}
          >
            Delete
          </Button>
          <Link to={`/tasks/${task.id}/edit`}>
            <Button variant="outline" size="sm">Edit</Button>
          </Link>
        </div>
        
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as any)}
          className="text-sm border rounded px-2 py-1"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;