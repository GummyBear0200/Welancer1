import React, { FC } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Check } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
}

const EmployeeTask: FC = () => {
  const { tasks = [], flash } = usePage<{ tasks: Task[]; flash?: { success?: string } }>().props;

  const updateStatus = (taskId: number, status: 'pending' | 'in_progress' | 'completed') => {
    router.post(`/employee/tasks/${taskId}/status`, { status });
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'My Tasks', href: '/employee/tasks' }]}>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">My Tasks</h1>

        {flash?.success && (
          <div className="bg-green-100 text-green-800 p-4 rounded">{flash.success}</div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-left text-gray-800 font-semibold">
              <tr>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{task.title}</td>
                  <td className="py-3 px-4">{task.description || '-'}</td>
                  <td className="py-3 px-4 capitalize">{task.status.replace('_', ' ')}</td>
                  <td className="py-3 px-4">{task.due_date || '-'}</td>
                  <td className="py-3 px-4 flex gap-2">
                    {task.status !== 'completed' ? (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                        onClick={() => updateStatus(task.id, 'completed')}
                      >
                        <Check className="w-4 h-4" /> Mark Completed
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No tasks assigned.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default EmployeeTask;
