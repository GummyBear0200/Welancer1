import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow"
        >
          {flash.success}
        </motion.div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Roles</h1>
        <Link
          href="/roles/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow transition"
        >
          + Create Role
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((key) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {key.replace(/_/g, ' ')}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {roles.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                  No roles found.
                </td>
              </tr>
            ) : (
              roles.map((role, index) => (
                <motion.tr
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="hover:bg-gray-50 hover:shadow-sm transition-transform transform hover:scale-[1.01]"
                >
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

                  <td className="px-6 py-4 whitespace-nowrap flex space-x-3">
                    <Link
                      href={`/roles/${role.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 transition"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(role.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
