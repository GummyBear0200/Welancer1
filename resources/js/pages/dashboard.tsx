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
  PieChart,
  Pie,
} from 'recharts';
import {
  Trophy,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart3,
  Award,
  Target,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
  const { tasks = [], projects = [] } = usePage().props as any;

  // Aggregate task statuses
  const statusData = [
    { status: 'Pending', count: tasks.filter((t: any) => t.status === 'pending').length, color: '#FACC15' },
    { status: 'In Progress', count: tasks.filter((t: any) => t.status === 'in_progress').length, color: '#3B82F6' },
    { status: 'Completed', count: tasks.filter((t: any) => t.status === 'completed').length, color: '#10B981' },
    { status: 'Overdue', count: tasks.filter((t: any) => t.status === 'overdue').length, color: '#EF4444' },
  ];

  // Totals
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t: any) => t.status === 'in_progress').length;
  const overdueTasks = tasks.filter((t: any) => t.status === 'overdue').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Leaderboard
  const leaderboard = projects
    .map((p: any) => ({
      name: p.name,
      completedTasks: tasks.filter((t: any) => t.project_id === p.id && t.status === 'completed').length,
      avgQuality: Number(
        (
          tasks
            .filter((t: any) => t.project_id === p.id && t.quality_score !== null)
            .reduce((acc: number, t: any) => acc + t.quality_score, 0) /
          (tasks.filter((t: any) => t.project_id === p.id && t.quality_score !== null).length || 1)
        ).toFixed(2)
      ),
    }))
    .sort((a: any, b: any) => b.completedTasks - a.completedTasks)
    .slice(0, 5);

  // Medal helpers
  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-800';
    return 'from-blue-400 to-blue-600';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-700" />;
    return null;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 ml-1">
              Track your progress and performance
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{totalTasks}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{completedTasks}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</h3>
              <div className="mt-2 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span>{completionRate}% completion rate</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{inProgressTasks}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</h3>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-3xl font-bold text-gray-800 dark:text-white">{overdueTasks}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</h3>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Task Status Overview
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="status" tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                  <YAxis tick={{ fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ payload }) => `${payload.status} ${(payload.percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Leaderboard — FULLY FIXED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Top Projects
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Rank</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Project</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Completed Tasks</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Avg Quality Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-garay-700">
                   {leaderboard.map((project, index) => {
  const rank = index + 1;
  return (
    <motion.tr
      key={project.name}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
      className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          {getRankIcon(rank)}
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">{rank}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div
            className={`h-10 w-10 bg-gradient-to-br ${getMedalColor(rank)} rounded-full flex items-center justify-center text-base font-bold text-white shadow`}
          >
            {project.name[0].toUpperCase()}
          </div>
          <span className="text-base font-medium text-gray-800 dark:text-gray-200">
            {project.name}
          </span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-base text-gray-700 dark:text-gray-300">{project.completedTasks}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
          <Award className="w-4 h-4" />
          {project.avgQuality || 'N/A'}
        </div>
      </td>
    </motion.tr>
  );
})}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {leaderboard.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No projects yet</h3>
                  <p className="text-gray-500 dark:text-gray-500">Start adding projects to see them here!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}