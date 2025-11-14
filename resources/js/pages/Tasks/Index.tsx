import React, { ReactNode, FC } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';

interface Task {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  assigned_to?: number;
  created_by: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string;
  due_date?: string;
  completed_date?: string;
  estimated_hours?: number;
  actual_hours?: number;
  quality_score?: number;
  created_at: string;
  updated_at: string;
}

interface PageProps {
  tasks?: Task[];
  flash?: { success?: string };
}

interface TasksIndexType extends FC {
  layout?: (page: ReactNode) => ReactNode;
}

const TasksIndex: TasksIndexType = () => {
  const { tasks = [], flash } = usePage().props as PageProps;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      router.delete(`/tasks/${id}`);
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-200 text-green-800';
      case 'medium': return 'bg-blue-200 text-blue-800';
      case 'high': return 'bg-yellow-200 text-yellow-800';
      case 'urgent': return 'bg-red-200 text-red-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="w-full min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl font-extrabold">Tasks</h1>
        <Link
          href="/tasks/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Create Task
        </Link>
      </div>

      {flash?.success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-6">
          {flash.success}
        </div>
      )}

   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-700"
>
  <table className="min-w-full table-auto text-sm">
    <thead className="bg-gray-100 dark:bg-gray-700 text-left font-semibold text-gray-800 dark:text-gray-200">
      <tr>
        {['ID', 'Title', 'Description', 'Status', 'Priority', 'Start Date', 'Due Date', 'Completed Date', 'Est. Hrs', 'Act. Hrs', 'Quality', 'Created At', 'Updated At', 'Actions'].map(header => (
          <th key={header} className="px-3 py-2 border">{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tasks.map(task => (
        <motion.tr
          key={task.id}
          whileHover={{ scale: 1.01 }}
          className="transition hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
        >
          <td className="px-3 py-2 border">{task.id}</td>
          <td className="px-3 py-2 border font-semibold">{task.title}</td>
          <td className="px-3 py-2 border">{task.description || '-'}</td>
          <td className="px-3 py-2 border">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
          </td>
          <td className="px-3 py-2 border">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.toUpperCase()}
            </span>
          </td>
          <td className="px-3 py-2 border">{task.start_date || '-'}</td>
          <td className="px-3 py-2 border">{task.due_date || '-'}</td>
          <td className="px-3 py-2 border">{task.completed_date || '-'}</td>
          <td className="px-3 py-2 border">{task.estimated_hours ?? '-'}</td>
          <td className="px-3 py-2 border">{task.actual_hours ?? '-'}</td>
          <td className="px-3 py-2 border">{task.quality_score ?? '-'}</td>
          <td className="px-3 py-2 border">{new Date(task.created_at).toLocaleString()}</td>
          <td className="px-3 py-2 border">{new Date(task.updated_at).toLocaleString()}</td>
          <td className="px-3 py-2 border flex gap-1">
            <Link
              href={`/tasks/${task.id}/edit`}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(task.id)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
            >
              Delete
            </button>
          </td>
        </motion.tr>
      ))}
    </tbody>
  </table>
</motion.div>
    </div>
  );
};

TasksIndex.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }]}>{page}</AppLayout>
);

export default TasksIndex;
