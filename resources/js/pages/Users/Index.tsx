import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { UserCheck, UserX, Eye, Pencil, Trash2, Plus } from 'lucide-react';
import React, { ReactNode } from 'react'; // ← ADD THIS LINE

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  two_factor_confirmed_at: string | null;
  created_at: string;
}

export default function UsersIndex({ users = [] }: { users: User[] }) {
  const { flash } = usePage().props as any;

  const handleDelete = (id: number) => {
    if (confirm('Delete user?')) router.delete(`/users/${id}`);
  };

  const StatusBadge = ({ verified }: { verified: boolean }) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {verified ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
      {verified ? 'Yes' : 'No'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {flash?.success && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl shadow-sm border border-green-200 flex items-center gap-2">
            {flash.success}
          </motion.div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Users</h1>
          
          <Link href="/users/create" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
            <Plus className="w-5 h-5" /> Add User
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <p className="text-sm font-medium text-gray-700">{users.length} user{users.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  {['Name', 'Email', 'Email Verified', '2FA', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center">
                      <UserX className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium text-gray-600">No users</p>
                    </td>
                  </tr>
                ) : (
                  users.map((u, i) => (
                    <motion.tr key={u.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50/70 group">
                      <td className="px-6 py-5 font-semibold text-gray-900">{u.name}</td>
                      <td className="px-6 py-5 text-gray-700">{u.email}</td>
                      <td className="px-6 py-5"><StatusBadge verified={!!u.email_verified_at} /></td>
                      <td className="px-6 py-5"><StatusBadge verified={!!u.two_factor_confirmed_at} /></td>
                      <td className="px-6 py-5 text-sm text-gray-600">{new Date(u.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/users/${u.id}`} className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100">
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link href={`/users/${u.id}/edit`} className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button onClick={() => handleDelete(u.id)} className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

(UsersIndex as any).layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Users', href: '/users' }]}>{page}</AppLayout>
);