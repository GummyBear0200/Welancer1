import React, { ReactNode } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

// Project type from backend
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
  progress: number;
  created_at: string;
  updated_at: string;
}

// Props from Laravel
interface PageProps {
  project: Project;
}

const Edit: React.FC = () => {
  const { project } = usePage<{ project: Project }>().props;

  // Use put() instead of post() for update
  const { data, setData, put, processing, errors } = useForm({
    name: project.name || '',
    description: project.description || '',
    status: project.status || 'pending',
    priority: project.priority || 'medium',
    start_date: project.start_date || '',
    due_date: project.due_date || '',
    completed_date: project.completed_date || '',
    progress: project.progress || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/projects/${project.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-4">
        <Link href="/projects" className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
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
              onChange={e => setData('status', e.target.value as Project['status'])}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on_hold">On Hold</option>
            </select>
          </div>
          <div>
            <label>Priority</label>
            <select
              value={data.priority}
              onChange={e => setData('priority', e.target.value as Project['priority'])}
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

        {/* Progress */}
        <div>
          <label>Progress (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={data.progress}
            onChange={e => setData('progress', Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.progress && <div className="text-red-500">{errors.progress}</div>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {processing ? 'Updating...' : 'Update Project'}
        </button>
      </form>
    </div>
  );
};

// Wrap page in layout
interface PageWithLayout extends React.FC {
  layout?: (page: ReactNode) => ReactNode;
}

const TypedEdit = Edit as PageWithLayout;
TypedEdit.layout = page => <AppLayout>{page}</AppLayout>;

export default TypedEdit;
