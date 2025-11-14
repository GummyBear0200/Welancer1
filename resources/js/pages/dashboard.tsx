import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChartBar, Users, DollarSign } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export default function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 p-4 shadow-sm transition hover:shadow-lg dark:border-sidebar-border">
            <div className="rounded-full bg-blue-500 p-3 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Users</h3>
              <p className="text-gray-500 dark:text-gray-400">1,234</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 p-4 shadow-sm transition hover:shadow-lg dark:border-sidebar-border">
            <div className="rounded-full bg-green-500 p-3 text-white">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-gray-500 dark:text-gray-400">$12,345</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl border border-sidebar-border/70 p-4 shadow-sm transition hover:shadow-lg dark:border-sidebar-border">
            <div className="rounded-full bg-purple-500 p-3 text-white">
              <ChartBar className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Analytics</h3>
              <p className="text-gray-500 dark:text-gray-400">Active</p>
            </div>
          </div>
        </div>

        {/* Main Chart / Content Area */}
        <div className="relative min-h-[400px] overflow-hidden rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
            <p>Main Dashboard Chart / Content</p>
          </div>
        </div>

        {/* Optional secondary section */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
              Secondary Info Box
            </div>
          </div>
          <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 shadow-sm dark:border-sidebar-border">
            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
              Secondary Info Box
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
