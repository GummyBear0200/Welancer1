import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react';

const breadcrumbs = [
  { title: 'Users', href: '/users' },
  { title: 'Create', href: '/users/create' },
];

const Create = ({ roles }: { roles: { id: number; name: string }[] }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/users');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create User</h1>
          <Link href="/users" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-2 h-12 rounded-xl"
              required
            />
            <InputError message={errors.name} className="mt-1" />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="mt-2 h-12 rounded-xl"
              required
            />
            <InputError message={errors.email} className="mt-1" />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role_id">Select Role</Label>
            <select
              id="role_id"
              value={data.role_id}
              onChange={(e) => setData('role_id', e.target.value)}
              className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-3"
              required
            >
              <option value="">Choose a Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <InputError message={errors.role_id} className="mt-1" />
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="mt-2 h-12 rounded-xl"
              required
            />
            <InputError message={errors.password} className="mt-1" />
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="password_confirmation">Confirm Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="mt-2 h-12 rounded-xl"
              required
            />
            <InputError message={errors.password_confirmation} className="mt-1" />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={processing}
            className="w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md transition-all"
          >
            {processing ? 'Creating...' : 'Create User'}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

Create.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>{page}</AppLayout>
);

export default Create;
