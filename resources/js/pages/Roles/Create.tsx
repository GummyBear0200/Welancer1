import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { ArrowLeft } from 'lucide-react';
import React, { ReactNode } from 'react'; // ← ADD THIS LINE


const breadcrumbs = [
  { title: 'Roles', href: '/roles' },
  { title: 'Create', href: '/roles/create' },
];

const Create = ({ permissions }: { permissions: string[] }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    permissions: [] as string[],
  });

  const togglePermission = (perm: string) => {
    setData(
      'permissions',
      data.permissions.includes(perm)
        ? data.permissions.filter(p => p !== perm)
        : [...data.permissions, perm]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/roles');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center"
    >
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Role</h1>
          <Link href="/roles" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">Role Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Admin"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400"
              required
            />
            <InputError message={errors.name} className="mt-1" />
          </div>

          <div>
            <Label className="text-gray-700 font-medium">Permissions</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {permissions.map((perm) => (
                <div key={perm} className="flex items-center gap-2">
                  <Checkbox
                    id={perm}
                    checked={data.permissions.includes(perm)}
                    onCheckedChange={() => togglePermission(perm)}
                  />
                  <label htmlFor={perm} className="text-sm text-gray-700">{perm}</label>
                </div>
              ))}
            </div>
            <InputError message={errors.permissions} className="mt-1" />
          </div>

          <Button
            type="submit"
            disabled={processing}
            className="w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            {processing ? 'Creating...' : 'Create Role'}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

Create.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={breadcrumbs}>
    {page}
  </AppLayout>
);

export default Create;