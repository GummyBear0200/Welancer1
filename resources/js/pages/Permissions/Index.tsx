import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Permissions', href: '/permissions' }];

interface Permission {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  permissions: Permission[];
}

export default function PermissionsIndex({ permissions = [] }: Props) {
  const { flash } = usePage().props as any;

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      router.delete(`/permissions/${id}`, {
        preserveScroll: true,
        onError: () => alert('Failed to delete permission.'),
      });
    }
  };

  const columns = ['ID', 'Name', 'Created At', 'Updated At'];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Permissions" />

      {/* Flash */}
      {flash?.success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-sm border border-green-200">
          {flash.success}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Permissions</h1>
        <Link
          href="/permissions/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow transition transform hover:scale-105"
        >
          + Create Permission
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition"
                >
                  {col}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {permissions.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                  No permissions found.
                </td>
              </tr>
            ) : (
              permissions.map((permission) => (
                <tr
                  key={permission.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{permission.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{permission.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{permission.created_at}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{permission.updated_at}</td>

                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <Link
                      href={`/permissions/${permission.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 transition transform hover:scale-110"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>

                    <button
                      onClick={() => handleDelete(permission.id)}
                      className="text-red-600 hover:text-red-800 transition transform hover:scale-110"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
