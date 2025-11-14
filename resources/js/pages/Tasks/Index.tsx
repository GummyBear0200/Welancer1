import React, { ReactNode } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Pencil, Trash2, Plus } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
}

const TasksIndex = () => {
  const { tasks = [], flash } = usePage<{ tasks: Task[]; flash?: { success?: string } }>().props;

  const handleDelete = (id: number) => {
    if (confirm('Delete task?')) router.delete(`/tasks/${id}`);
  };

  const getBadge = (type: 'status' | 'priority', value: Task['status'] | Task['priority']) => {
    const statusMap = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      in_progress: { color: 'bg-blue-100 text-blue-800', icon: Clock },
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      overdue: { color: 'bg-red-100 text-red-800', icon: AlertCircle },
    } as const;

    const priorityMap = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-blue-100 text-blue-800',
      high: 'bg-yellow-100 text-yellow-800',
      urgent: 'bg-red-100 text-red-800',
    } as const;

    if (type === 'status') {
      const item = statusMap[value as keyof typeof statusMap];
      const Icon = item.icon;
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${item.color}`}>
          <Icon className="w-3.5 h-3.5" />
          {value.replace('_', ' ')}
        </span>
      );
    } else {
      const color = priorityMap[value as keyof typeof priorityMap];
      return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
          {value.toUpperCase()}
        </span>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {flash?.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl shadow-sm border border-green-200"
          >
            {flash.success}
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tasks</h1>
          <Link
            href="/tasks/create"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> New Task
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Title', 'Status', 'Priority', 'Due', 'Actions'].map(h => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-600">No tasks</p>
                    </td>
                  </tr>
                ) : (
                  tasks.map((task, i) => (
                    <motion.tr
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-gray-50/70 group transition-all"
                    >
                      <td className="px-6 py-5 font-medium text-gray-900">{task.title}</td>
                      <td className="px-6 py-5">{getBadge('status', task.status)}</td>
                      <td className="px-6 py-5">{getBadge('priority', task.priority)}</td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        {task.due_date ? new Date(task.due_date).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/tasks/${task.id}/edit`}
                            className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
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

(TasksIndex as any).layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }]}>{page}</AppLayout>
);

export default TasksIndex;