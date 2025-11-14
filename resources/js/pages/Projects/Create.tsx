import React, { useState, ReactNode } from 'react';
import axios from 'axios';
import { route } from 'ziggy-js';
import AppLayout from '@/layouts/app-layout';
import { Link, router } from '@inertiajs/react';

const Create: React.FC = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    description: '',
    created_by: 1, // Replace with actual user ID from auth context
    status: 'pending',
    priority: 'medium',
    start_date: '',
    due_date: '',
    completed_date: '',
    progress: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(route('projects.store'), form);
      setMessage('✅ Project created successfully!');

      // Redirect to projects index
      router.visit(route('projects.index'));
    } catch (error: any) {
      console.error(error);

      if (error.response?.data?.errors) {
        // Laravel validation errors
        const errors = error.response.data.errors;
        setMessage(
          '❌ Failed to create project: ' +
            Object.values(errors)
              .flat()
              .join(', ')
        );
      } else {
        setMessage('❌ Failed to create project. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-4">
        <Link href={route('projects.index')} className="text-blue-600 hover:underline">
          ← Back to Projects
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>

      {message && <p className="mb-4 text-sm text-gray-700">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <select name="status" value={form.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
        <select name="priority" value={form.priority} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input type="date" name="completed_date" value={form.completed_date} onChange={handleChange} className="w-full p-2 border rounded" />
        <input
          type="number"
          name="progress"
          value={form.progress}
          onChange={handleChange}
          min="0"
          max="100"
          step="0.01"
          className="w-full p-2 border rounded"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

// Wrap page with AppLayout to restore sidebar
interface PageWithLayout extends React.FC {
  layout?: (page: ReactNode) => ReactNode;
}
const TypedCreate = Create as PageWithLayout;
TypedCreate.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>;

export default TypedCreate;
