import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';

interface Role {
  id: number;
  name: string;
  permissions: string[];
}

interface Props {
  role: Role;
  permissions: string[];
}

export default function Edit({ role, permissions }: Props) {
  const [name, setName] = useState(role.name);
  const [selected, setSelected] = useState<string[]>(role.permissions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.put(`/roles/${role.id}`, {
      name,
      permissions: selected,
    });
  };

  const togglePermission = (perm: string) => {
    if (selected.includes(perm)) {
      setSelected(selected.filter((p) => p !== perm));
    } else {
      setSelected([...selected, perm]);
    }
  };

  return (
    <AppLayout>
      <Head title="Edit Role" />
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mt-8">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Edit Role</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {permissions.map((perm) => (
                <label key={perm} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(perm)}
                    onChange={() => togglePermission(perm)}
                    className="rounded"
                  />
                  <span>{perm}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link
              href="/roles"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Back
            </Link>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Role
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
