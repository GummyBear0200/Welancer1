import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';  // Added Link import

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
    user: User;
}

export default function Show({ user }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />

            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
                <h1 className="text-2xl font-semibold mb-6 text-gray-800">User Details</h1>

                <div className="space-y-4">
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

                <div className="mt-6">
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