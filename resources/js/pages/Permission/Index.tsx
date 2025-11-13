// resources/js/pages/Roles/Index.tsx
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Roles', href: '/roles' }];

interface Role {
  id: number;
  name: string;
  permissions: string[];
  created_at: string;
  updated_at: string;
}

interface Props {
  roles: Role[];
}

export default function RolesIndex({ roles = [] }: Props) {
  const { flash } = usePage().props as any;

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      router.delete(`/roles/${id}`);
    }
  };

  const columns = ['id', 'name', 'permissions', 'created_at', 'updated_at'] as const;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles" />

      {/* Flash message */}
      {flash?.success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          {flash.success}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Roles</h1>
        <Link
          href="/roles/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create Role
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {key.replace(/_/g, ' ')}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {roles.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  {columns.map((key) => (
                    <td
                      key={key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                    >
                      {key === 'permissions'
                        ? role.permissions.join(', ') || '-'
                        : (role as any)[key]?.toString() || '-'}
                    </td>
                  ))}

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-3">
                    {/* Edit */}
                    <Link
                      href={`/roles/${role.id}/edit`}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(role.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
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
