// RolesIndex.tsx
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Users, Pencil, Trash2, Plus } from 'lucide-react';
import React, { ReactNode } from 'react'; // ← ADD THIS LINE

interface Role { id: number; name: string; permissions: string[]; }

export default function RolesIndex({ roles = [] }: { roles: Role[] }) {
  const { flash } = usePage().props as any;
  const handleDelete = (id: number) => confirm('Delete role?') && router.delete(`/roles/${id}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {flash?.success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl shadow-sm border border-green-200">{flash.success}</motion.div>}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-9 h-9 text-yellow-500" /> Roles
          </h1>
          <Link href="/roles/create" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-xl shadow-lg transition-all transform hover:scale-105 flex items-center gap-2">
            <Plus className="w-5 h-5" /> New Role
          </Link>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50"><p className="text-sm font-medium text-gray-700">{roles.length} role{roles.length !== 1 ? 's' : ''}</p></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-gray-200">
                {['Name', 'Permissions', 'Actions'].map(h => <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {roles.length === 0 ? (
                  <tr><td colSpan={3} className="px-6 py-20 text-center"><Users className="w-16 h-16 mx-auto mb-4 text-gray-300" /><p className="text-lg font-medium text-gray-600">No roles</p></td></tr>
                ) : roles.map((r, i) => (
                  <motion.tr key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="hover:bg-gray-50/70 group">
                    <td className="px-6 py-5 font-medium text-gray-900">{r.name}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {r.permissions.length ? r.permissions.map(p => <span key={p} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{p}</span>) : <span className="text-gray-400 text-xs">—</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/roles/${r.id}/edit`} className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100"><Pencil className="w-4 h-4" /></Link>
                        <button onClick={() => handleDelete(r.id)} className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

(RolesIndex as any).layout = (page: ReactNode) => <AppLayout breadcrumbs={[{ title: 'Roles', href: '/roles' }]}>{page}</AppLayout>;