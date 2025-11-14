// resources/js/pages/Tasks/Create.tsx
import React, { ReactNode } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Project { id: number; name: string; }
interface User { id: number; name: string; }

interface PageProps {
  projects: Project[];
  users: User[];
}

const Create: React.FC<PageProps> & { layout?: (page: ReactNode) => ReactNode } = ({ projects, users }) => {
  const { data, setData, post, errors, processing } = useForm({
    project_id: projects.length > 0 ? projects[0].id : 0,
    assigned_to: '', // ✅ add this field
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    start_date: '',
    due_date: '',
    estimated_hours: 0,
    actual_hours: 0,
    quality_score: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/tasks');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Task</h1>
        <Link
          href="/tasks"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Tasks
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        {/* Project */}
        <div>
          <label className="block font-medium mb-1">Project</label>
          <select
            value={data.project_id}
            onChange={e => setData('project_id', Number(e.target.value))}
            className="w-full border rounded px-3 py-2"
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>{project.name}</option>
            ))}
          </select>
          {errors.project_id && <div className="text-red-600 mt-1">{errors.project_id}</div>}
        </div>

        {/* Assigned To */}
        <div>
          <label className="block font-medium mb-1">Assign To</label>
          <select
            value={data.assigned_to}
            onChange={e => setData('assigned_to', e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Unassigned</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {errors.assigned_to && <div className="text-red-600 mt-1">{errors.assigned_to}</div>}
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => setData('title', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.title && <div className="text-red-600 mt-1">{errors.title}</div>}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={data.description}
            onChange={e => setData('description', e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.description && <div className="text-red-600 mt-1">{errors.description}</div>}
        </div>

        {/* Status & Priority */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Status</label>
            <select
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-1">Priority</label>
            <select
              value={data.priority}
              onChange={e => setData('priority', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={data.start_date}
              onChange={e => setData('start_date', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Due Date</label>
            <input
              type="date"
              value={data.due_date}
              onChange={e => setData('due_date', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Numbers */}
        <div className="flex gap-4">
          <div>
            <label className="block font-medium mb-1">Estimated Hours</label>
            <input
              type="number"
              min={0}
              value={data.estimated_hours}
              onChange={e => setData('estimated_hours', Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Actual Hours</label>
            <input
              type="number"
              min={0}
              value={data.actual_hours}
              onChange={e => setData('actual_hours', Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Quality Score</label>
            <input
              type="number"
              min={0}
              max={100}
              value={data.quality_score}
              onChange={e => setData('quality_score', Number(e.target.value))}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {processing ? 'Saving...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

Create.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Tasks', href: '/tasks' }, { title: 'Create', href: '/tasks/create' }]}>
    {page}
  </AppLayout>
);

export default Create;
