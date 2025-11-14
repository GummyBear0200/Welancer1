import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Users', href: '/users' }];

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Props {
  users: User[];
}

export default function UsersIndex({ users = [] }: Props) {
  const { flash } = usePage().props as any;

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      router.delete(`/users/${id}`);
    }
  };

  const columns = [
    'id',
    'name',
    'email',
    'email_verified_at',
    'two_factor_confirmed_at',
    'created_at',
    'updated_at',
  ] as const;

  const formatStatus = (value: string | null) => 
    value ? <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">Yes</span>
          : <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full text-xs font-medium">No</span>;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users" />

      {flash?.success && (
        <div className="mb-6 p-3 bg-green-100 text-green-800 rounded shadow-sm">
          {flash.success}
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
        <Link
          href="/users/create"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Create User
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-x-auto border border-gray-200 dark:border-gray-700"
      >
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-left font-semibold text-gray-800 dark:text-gray-200">
            <tr>
              {columns.map((key) => (
                <th key={key} className="px-3 py-2 border uppercase tracking-wider">{key.replace(/_/g, ' ')}</th>
              ))}
              <th className="px-3 py-2 border uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="px-3 py-12 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map(user => (
                <motion.tr
                  key={user.id}
                  whileHover={{ scale: 1.01 }}
                  className="transition hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <td className="px-3 py-2 border">{user.id}</td>
                  <td className="px-3 py-2 border font-semibold">{user.name}</td>
                  <td className="px-3 py-2 border">{user.email}</td>
                  <td className="px-3 py-2 border">{formatStatus(user.email_verified_at)}</td>
                  <td className="px-3 py-2 border">{formatStatus(user.two_factor_confirmed_at)}</td>
                  <td className="px-3 py-2 border">{new Date(user.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2 border">{new Date(user.updated_at).toLocaleString()}</td>
                  <td className="px-3 py-2 border flex gap-1">
                    <Link
                      href={`/users/${user.id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 text-xs"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/users/${user.id}`}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </AppLayout>
  );
}
