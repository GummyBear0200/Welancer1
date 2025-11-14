// resources/js/pages/Tasks/Create.tsx
import React, { ReactNode, ChangeEvent } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { ArrowLeft, CheckCircle } from 'lucide-react';

// REMOVED: Textarea import (doesn't exist)
// We'll use native <textarea> with Shadcn-style classes

interface Project { id: number; name: string; }
interface User { id: number; name: string; }

interface PageProps {
  projects: Project[];
  users: User[];
}

const breadcrumbs = [
  { title: 'Tasks', href: '/tasks' },
  { title: 'Create', href: '/tasks/create' },
];

// Define allowed values
const statuses = ['pending', 'in_progress', 'completed', 'overdue'] as const;
const priorities = ['low', 'medium', 'high', 'urgent'] as const;

const Create: React.FC<PageProps> = ({ projects, users }) => {
  const { data, setData, post, processing, errors } = useForm({
    project_id: projects.length > 0 ? projects[0].id : 0,
    assigned_to: '',
    title: '',
    description: '',
    status: 'pending' as typeof statuses[number],
    priority: 'medium' as typeof priorities[number],
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

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData('description', e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-7 h-7 text-yellow-500" />
              Create Task
            </h1>
            <p className="text-sm text-gray-600 mt-1">Assign, prioritize, and track progress</p>
          </div>
          <Link
            href="/tasks"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project & Assigned To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="project_id" className="text-gray-700 font-medium">Project</Label>
              <Select
                value={data.project_id.toString()}
                onValueChange={(value) => setData('project_id', Number(value))}
              >
                <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.project_id} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="assigned_to" className="text-gray-700 font-medium">Assign To</Label>
              <Select
  value={data.assigned_to}
  onValueChange={(value) => setData('assigned_to', value)}
>
  <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400">
    <SelectValue placeholder="Unassigned" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="unassigned">Unassigned</SelectItem>
    {users.map((user) => (
      <SelectItem key={user.id} value={user.id.toString()}>
        {user.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
              <InputError message={errors.assigned_to} className="mt-1" />
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-gray-700 font-medium">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter task title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
            <InputError message={errors.title} className="mt-1" />
          </div>

          {/* Description - Native textarea with Shadcn styling */}
          <div>
            <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
            <textarea
              id="description"
              placeholder="What needs to be done?"
              value={data.description}
              onChange={handleDescriptionChange}
              className="mt-2 block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] resize-y"
            />
            <InputError message={errors.description} className="mt-1" />
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="status" className="text-gray-700 font-medium">Status</Label>
              <Select
                value={data.status}
                onValueChange={(value) => setData('status', value as typeof statuses[number])}
              >
                <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace('_', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.status} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="priority" className="text-gray-700 font-medium">Priority</Label>
              <Select
                value={data.priority}
                onValueChange={(value) => setData('priority', value as typeof priorities[number])}
              >
                <SelectTrigger className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <InputError message={errors.priority} className="mt-1" />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="start_date" className="text-gray-700 font-medium">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              />
              <InputError message={errors.start_date} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="due_date" className="text-gray-700 font-medium">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={data.due_date}
                onChange={(e) => setData('due_date', e.target.value)}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              />
              <InputError message={errors.due_date} className="mt-1" />
            </div>
          </div>

          {/* Hours & Quality */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="estimated_hours" className="text-gray-700 font-medium">Est. Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                min={0}
                step="0.5"
                value={data.estimated_hours}
                onChange={(e) => setData('estimated_hours', Number(e.target.value))}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              />
              <InputError message={errors.estimated_hours} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="actual_hours" className="text-gray-700 font-medium">Actual Hours</Label>
              <Input
                id="actual_hours"
                type="number"
                min={0}
                step="0.5"
                value={data.actual_hours}
                onChange={(e) => setData('actual_hours', Number(e.target.value))}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              />
              <InputError message={errors.actual_hours} className="mt-1" />
            </div>

            <div>
              <Label htmlFor="quality_score" className="text-gray-700 font-medium">Quality Score</Label>
              <Input
                id="quality_score"
                type="number"
                min={0}
                max={100}
                value={data.quality_score}
                onChange={(e) => setData('quality_score', Number(e.target.value))}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              />
              <InputError message={errors.quality_score} className="mt-1" />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={processing}
              className="w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Create Task
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

// FIXED: Proper layout typing
interface CreateWithLayout extends React.FC<PageProps> {
  layout?: (page: ReactNode) => ReactNode;
}

const CreateWithLayout = Create as CreateWithLayout;
CreateWithLayout.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);

export default CreateWithLayout;