// resources/js/pages/Permissions/Show.tsx
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  permission: Permission;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Permissions', href: '/permissions' },
  { title: 'View', href: '#' },
];

export default function Show({ permission }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Permission: ${permission.name}`} />

      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Permission Details</h1>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">ID:</span>
            <span className="text-gray-900">{permission.id}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900">{permission.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium text-gray-700">Created At:</span>
            <span className="text-gray-900">{permission.created_at}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="font-medium text-gray-700">Updated At:</span>
            <span className="text-gray-900">{permission.updated_at}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href={route('permissions.index')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Permissions
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}