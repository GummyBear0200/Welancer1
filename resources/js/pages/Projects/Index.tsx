import React, { ReactNode, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  description?: string;
  created_by: number;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string | null;
  due_date?: string | null;
  completed_date?: string | null;
  progress: number | string;
  created_at: string;
  updated_at: string;
}

const Index: React.FC = () => {
  const { projects } = usePage<{ projects: Project[] }>().props;
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    setLoadingDelete(id);
    try {
      await fetch(`/projects/${id}`, { method: 'DELETE' });
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete project', error);
    } finally {
      setLoadingDelete(null);
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
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
        <h1 className="text-4xl font-extrabold">Projects</h1>
        <Link
          href="/projects/create"
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          + Create New Project
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-x-auto border border-gray-200 dark:border-gray-700"
      >
        <table className="min-w-full table-auto text-lg">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left font-bold text-gray-800 dark:text-gray-200">
            <tr>
              {['ID', 'Name', 'Description', 'Created By', 'Status', 'Priority', 'Start Date', 'Due Date', 'Completed', 'Progress', 'Created At', 'Updated At', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-4 border">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <motion.tr
                key={project.id}
                whileHover={{ scale: 1.01 }}
                className="transition hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-4 border">{project.id}</td>
                <td className="px-4 py-4 border font-semibold">{project.name}</td>
                <td className="px-4 py-4 border">{project.description ?? '-'}</td>
                <td className="px-4 py-4 border">{project.created_by}</td>
                <td className="px-4 py-4 border">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-4 py-4 border">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-4 border">{project.start_date ?? '-'}</td>
                <td className="px-4 py-4 border">{project.due_date ?? '-'}</td>
                <td className="px-4 py-4 border">{project.completed_date ?? '-'}</td>
                <td className="px-4 py-4 border w-32">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full">
                    <div
                      className="h-3 rounded-full bg-blue-500"
                      style={{ width: `${Number(project.progress) || 0}%` }}
                    />
                  </div>
                  <span className="text-sm ml-2">{Number(project.progress).toFixed(2)}%</span>
                </td>
                <td className="px-4 py-4 border">{new Date(project.created_at).toLocaleString()}</td>
                <td className="px-4 py-4 border">{new Date(project.updated_at).toLocaleString()}</td>
                <td className="px-4 py-4 border flex gap-2">
                  <Link
                    href={`/projects/${project.id}/edit`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={loadingDelete === project.id}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    {loadingDelete === project.id ? 'Deleting...' : 'Delete'}
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

// Wrap with layout
interface PageWithLayout extends React.FC {
  layout?: (page: ReactNode) => ReactNode;
}
const TypedIndex = Index as PageWithLayout;
TypedIndex.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default TypedIndex;
