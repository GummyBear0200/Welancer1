import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { PencilIcon } from '@heroicons/react/24/outline'; // For edit icon
import { EyeIcon } from '@heroicons/react/24/outline'; // Added for show/view icon

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
                <Link
                    href="/users/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Create User
                </Link>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {Object.keys(users[0] || {}).map((key) => (
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
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="hover:bg-gray-100 transition-colors duration-300"
                            >
                                {Object.values(user).map((value, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {value?.toString() || '-'}
                                    </td>
                                ))}
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-4">
                                    <Link
                                        href={`/users/${user.id}/edit`}
                                        className="text-blue-600 hover:text-blue-800"
                                        title="Edit User"
                                    >
                                        <PencilIcon className="h-5 w-5" />
                                    </Link>
                                    <Link
                                        href={`/users/${user.id}`}
                                        className="text-green-600 hover:text-green-800"
                                        title="View User Details"
                                    >
                                        <EyeIcon className="h-5 w-5" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}