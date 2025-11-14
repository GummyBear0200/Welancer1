import React, { ReactNode, FC } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeaderboardUser {
  id: number;
  name: string;
  email?: string;
  tasks_count: number;
  total_score: number;
}

interface PageProps {
  users: LeaderboardUser[];
  flash?: { success?: string };
  [key: string]: any;
}

const Leaderboard: FC & { layout?: (page: ReactNode) => ReactNode } = () => {
  const { users = [] } = usePage<PageProps>().props;
  const sortedUsers = [...users].sort((a, b) => b.total_score - a.total_score);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        duration: 0.5,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen p-8 bg-gray-50 dark:bg-gray-900"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3">
          <Trophy className="w-10 h-10 text-yellow-400" />
          Leaderboard
        </h1>
        <Link
          href="/tasks"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          Back to Tasks
        </Link>
      </div>

      {/* Card container */}
      <motion.div
        className="w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-lg">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left text-gray-800 dark:text-gray-200 font-bold text-xl">
              <tr>  
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">User</th>
                <th className="py-4 px-6">Tasks Completed</th>
                <th className="py-4 px-6">Total Score</th>
              </tr>
            </thead>
            <motion.tbody variants={containerVariants}>
              {sortedUsers.map((user, index) => {
                const rank = index + 1;
                let rankBadge = '';
                if (rank === 1) rankBadge = '🥇';
                else if (rank === 2) rankBadge = '🥈';
                else if (rank === 3) rankBadge = '🥉';

                return (
                  <motion.tr
                    key={user.id}
                    variants={rowVariants}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <td className="py-6 px-6 font-bold text-xl">{rankBadge || rank}</td>
                    <td className="py-6 px-6 flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-300">
                        {user.name[0].toUpperCase()}
                      </div>
                      <span className="text-lg md:text-xl font-medium">{user.name}</span>
                    </td>
                    <td className="py-6 px-6 text-lg">{user.tasks_count}</td>
                    <td className="py-6 px-6 text-lg font-semibold">{user.total_score}</td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

Leaderboard.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Leaderboard', href: '/leaderboard' }]}>
    {page}
  </AppLayout>
);

export default Leaderboard;
