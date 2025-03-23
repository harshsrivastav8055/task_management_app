// src/pages/Dashboard.tsx
import { useState } from 'react';
import { Layout } from '../components/Layout';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';

export function Dashboard() {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const { tasks, isLoading, error, addTask, deleteTask } = useTasks();

  const handleAddTask = (task: Omit<Task, 'id' | 'user_id'>) => {
    addTask(task);
    setIsAddingTask(false);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <button
            onClick={() => setIsAddingTask(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New Task
          </button>
        </div>

        {isLoading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500">Error loading tasks: {error.message}</p>
        ) : (
          <>
            {isAddingTask && (
              <div className="mb-6">
                <TaskForm onSubmit={handleAddTask} onCancel={() => setIsAddingTask(false)} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tasks.length === 0 ? (
                <p>No tasks yet. Create your first task!</p>
              ) : (
                tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}