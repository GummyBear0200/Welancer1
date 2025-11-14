import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface Role {
    id: number;
    name: string;
}

interface Permission {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
    permissions: Permission[];
}

interface Props {
    user: User;
}

export default function Show({ user }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />

            <div className="max-w-3xl mx-auto mt-6 space-y-6">
                {/* User Info */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-2xl font-semibold mb-4 text-gray-800">User Details</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-700">ID:</span>
                            <span className="text-gray-900">{user.id}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-700">Name:</span>
                            <span className="text-gray-900">{user.name}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-700">Email Verified At:</span>
                            <span className="text-gray-900">{user.email_verified_at || '-'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-medium text-gray-700">Created At:</span>
                            <span className="text-gray-900">{user.created_at}</span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <span className="font-medium text-gray-700">Updated At:</span>
                            <span className="text-gray-900">{user.updated_at}</span>
                        </div>
                    </div>
                </div>

                {/* Roles */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Roles</h2>
                    {user.roles.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                            {user.roles.map(role => (
                                <li key={role.id} className="text-gray-900">{role.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No roles assigned.</p>
                    )}
                </div>

                {/* Permissions */}
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">Permissions</h2>
                    {user.permissions.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                            {user.permissions.map(permission => (
                                <li key={permission.id} className="text-gray-900">{permission.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No permissions assigned.</p>
                    )}
                </div>

                {/* Back Button */}
                <div className="flex justify-start">
                    <Link
                        href="/users"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                        Back to Users
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
