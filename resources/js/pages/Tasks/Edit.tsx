// resources/js/pages/Tasks/Edit.tsx
import React, { ReactNode } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Backend types
interface Task {
  id: number;
  project_id: number;
  assigned_to?: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  start_date?: string | null;
  due_date?: string | null;
  completed_date?: string | null;
  estimated_hours?: number;
  actual_hours?: number;
  quality_score?: number;
}

interface Project { id: number; name: string; }
interface User { id: number; name: string; }

interface PageProps {
  task: Task;
  projects: Project[];
  users: User[];
  flash?: { success?: string };
  [key: string]: any; // satisfy Inertia PageProps
}

const Edit: React.FC & { layout?: (page: ReactNode) => ReactNode } = () => {
  const { task, projects, users, flash } = usePage<PageProps>().props;

  const { data, setData, put, processing, errors } = useForm({
    project_id: task.project_id,
    assigned_to: task.assigned_to ?? '',
    title: task.title,
    description: task.description ?? '',
    status: task.status,
    priority: task.priority,
    start_date: task.start_date ?? '',
    due_date: task.due_date ?? '',
    completed_date: task.completed_date ?? '',
    estimated_hours: task.estimated_hours ?? 0,
    actual_hours: task.actual_hours ?? 0,
    quality_score: task.quality_score ?? 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/tasks/${task.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <Link href="/tasks" className="text-blue-600 hover:underline">
          ← Back to Tasks
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>

      {flash?.success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{flash.success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project */}
        <div>
          <label className="block mb-1">Project</label>
          <select
            value={data.project_id}
            onChange={e => setData('project_id', Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.project_id && <div className="text-red-500">{errors.project_id}</div>}
        </div>

        {/* Assigned To */}
        <div>
          <label className="block mb-1">Assigned To</label>
          <select
            value={data.assigned_to}
            onChange={e => setData('assigned_to', Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Unassigned</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          {errors.assigned_to && <div className="text-red-500">{errors.assigned_to}</div>}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && <div className="text-red-500">{errors.title}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.description && <div className="text-red-500">{errors.description}</div>}
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Status</label>
            <select
              value={data.status}
              onChange={e => setData('status', e.target.value as Task['status'])}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          <div>
            <label>Priority</label>
            <select
              value={data.priority}
              onChange={e => setData('priority', e.target.value as Task['priority'])}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Start Date</label>
            <input
              type="date"
              value={data.start_date || ''}
              onChange={e => setData('start_date', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Due Date</label>
            <input
              type="date"
              value={data.due_date || ''}
              onChange={e => setData('due_date', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Completed Date</label>
            <input
              type="date"
              value={data.completed_date || ''}
              onChange={e => setData('completed_date', e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Numbers */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label>Estimated Hours</label>
            <input
              type="number"
              min={0}
              value={data.estimated_hours}
              onChange={e => setData('estimated_hours', Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Actual Hours</label>
            <input
              type="number"
              min={0}
              value={data.actual_hours}
              onChange={e => setData('actual_hours', Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label>Quality Score</label>
            <input
              type="number"
              min={0}
              max={100}
              value={data.quality_score}
              onChange={e => setData('quality_score', Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {processing ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  );
};

// Wrap page in layout
Edit.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default Edit;
