// resources/js/pages/Permissions/Edit.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

interface Props {
  permission: { id: number; name: string };
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Permissions', href: '/permissions' },
  { title: 'Edit', href: '#' },
];

export default function Edit({ permission }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: permission.name,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('permissions.update', permission.id));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit: ${permission.name}`} />

      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Edit Permission</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Link
              href="/permissions"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={processing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}