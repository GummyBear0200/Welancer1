import React, { ReactNode, useState } from 'react';
import { usePage, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Pencil, Trash2, FolderOpen, Calendar, Clock, AlertCircle, Plus } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string | null;
  progress: number | string;
  created_at: string;
}

const ProjectsIndex: React.FC = () => {
  const { projects } = usePage<{ projects: Project[] }>().props;
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    if (!confirm('Delete this project?')) return;
    setDeletingId(id);
    router.delete(`/projects/${id}`, {
      onFinish: () => setDeletingId(null),
      onError: () => {
        alert('Failed to delete.');
        setDeletingId(null);
      },
    });
  };

  const getStatusBadge = (status: Project['status']) => {
    const map: Record<Project['status'], { color: string; icon: React.FC<any> }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { color: 'bg-green-100 text-green-800', icon: FolderOpen },
      on_hold: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle },
    };
    const { color, icon: Icon } = map[status];
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <Icon className="w-3.5 h-3.5" />
        {status.replace('_', ' ')}
      </span>
    );
  };

  const getPriorityBadge = (priority: Project['priority']) => {
    const map: Record<Project['priority'], string> = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[priority]}`}>{priority.toUpperCase()}</span>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <FolderOpen className="w-9 h-9 text-yellow-500" />
              Projects
            </h1>
            <p className="text-gray-600 mt-1">Track progress, manage deadlines</p>
          </div>
          <Link
            href="/projects/create"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        </div>

        {/* Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <p className="text-sm font-medium text-gray-700">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Name', 'Status', 'Priority', 'Progress', 'Due', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-600">No projects yet</p>
                      <p className="text-sm text-gray-500 mt-1">Create your first project to get started</p>
                    </td>
                  </tr>
                ) : (
                  projects.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-gray-50/70 transition-all duration-150 group"
                    >
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-900">{p.name}</p>
                          {p.description && <p className="text-xs text-gray-500 mt-1 line-clamp-1">{p.description}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-5">{getStatusBadge(p.status)}</td>
                      <td className="px-6 py-5">{getPriorityBadge(p.priority)}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${Number(p.progress) || 0}%` }}
                              transition={{ duration: 0.7, delay: i * 0.05 }}
                              className="h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700 w-10 text-right">
                            {Number(p.progress).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {p.due_date ? (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(p.due_date).toLocaleDateString()}
                          </div>
                        ) : '—'}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/projects/${p.id}/edit`}
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition disabled:opacity-50"
                          >
                            {deletingId === p.id ? (
                              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                <Trash2 className="w-4 h-4" />
                              </motion.div>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

(ProjectsIndex as any).layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Projects', href: '/projects' }]}>{page}</AppLayout>
);

export default ProjectsIndex;