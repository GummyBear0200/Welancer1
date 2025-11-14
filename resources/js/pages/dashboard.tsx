import { usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
  const { tasks = [], projects = [] } = usePage().props as any;

  // Aggregate task statuses
  const statusData = [
    { status: 'pending', count: tasks.filter((t: any) => t.status === 'pending').length },
    { status: 'in_progress', count: tasks.filter((t: any) => t.status === 'in_progress').length },
    { status: 'completed', count: tasks.filter((t: any) => t.status === 'completed').length },
    { status: 'overdue', count: tasks.filter((t: any) => t.status === 'overdue').length },
  ];

  // Top performers by completed tasks or quality score
  const leaderboard = projects
    .map((p: any) => ({
      name: p.name,
      completedTasks: tasks.filter((t: any) => t.project_id === p.id && t.status === 'completed').length,
      avgQuality: Number(
        (tasks
          .filter((t: any) => t.project_id === p.id && t.quality_score !== null)
          .reduce((acc: number, t: any) => acc + t.quality_score, 0) /
          tasks.filter((t: any) => t.project_id === p.id && t.quality_score !== null).length || 0
        ).toFixed(2)
      ),
    }))
    .sort((a: any, b: any) => b.completedTasks - a.completedTasks);

  const COLORS = ['#FACC15', '#3B82F6', '#10B981', '#EF4444']; // yellow, blue, green, red

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="flex flex-col gap-6 p-4">
        {/* Status Graph */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Leaderboard - Top Projects</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Tasks</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Quality Score</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leaderboard.map((p: any, index: number) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">{p.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{p.completedTasks}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">{p.avgQuality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
