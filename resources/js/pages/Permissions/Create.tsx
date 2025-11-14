// resources/js/pages/Permissions/Create.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Permissions', href: '/permissions' },
  { title: 'Create', href: '/permissions/create' },
];

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('permissions.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Permission" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6 flex items-center justify-center"
      >
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Permission</h1>
            <Link href="/permissions" className="text-gray-600 hover:text-gray-800 flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-medium">Permission Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g., users.delete"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-2 h-12 rounded-xl border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
              <InputError message={errors.name} className="mt-1" />
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            >
              {processing ? 'Creating...' : (
                <>
                  <Save className="w-5 h-5" />
                  Create Permission
                </>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </AppLayout>
  );
}