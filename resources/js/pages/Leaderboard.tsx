import React, { ReactNode, FC } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Trophy, Medal, Star, TrendingUp, Award, Crown } from 'lucide-react';
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

  // Removed animation variants to fix bugs

  // Get medal color based on rank
  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-400 to-yellow-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-800';
    return 'from-blue-400 to-blue-600';
  };

  // Get rank badge
  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-700" />;
    return null;
  };

  // Top 3 users for podium
  const topThree = sortedUsers.slice(0, 3);
  const restUsers = sortedUsers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3 text-gray-800 dark:text-white mb-2">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              Leaderboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 ml-1">
              Compete with others and climb to the top!
            </p>
          </div>
          <Link
            href="/tasks"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
          >
            Back to Tasks
          </Link>
        </motion.div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* 2nd Place */}
              {topThree[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:order-1 order-2"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                          {topThree[1].name[0].toUpperCase()}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                          <Medal className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-400 mb-2">2nd</div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {topThree[1].name}
                      </h3>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {topThree[1].total_score}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {topThree[1].tasks_count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:order-2 order-1"
              >
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 shadow-xl border-2 border-yellow-400 dark:border-yellow-600 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-400/20 to-transparent rounded-full -ml-16 -mb-16"></div>
                  
                  <div className="text-center relative z-10">
                    <div className="relative inline-block mb-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-yellow-200 dark:ring-yellow-800">
                        {topThree[0].name[0].toUpperCase()}
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                        <Crown className="w-7 h-7 text-yellow-500" />
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2 flex items-center justify-center gap-2">
                      <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                      1st
                      <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                      {topThree[0].name}
                    </h3>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                          {topThree[0].total_score}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Score</div>
                      </div>
                      <div className="w-px h-10 bg-yellow-300 dark:bg-yellow-700"></div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                          {topThree[0].tasks_count}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Tasks</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3rd Place */}
              {topThree[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="md:order-3 order-3"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                          {topThree[2].name[0].toUpperCase()}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                          <Award className="w-6 h-6 text-amber-700" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-amber-700 mb-2">3rd</div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                        {topThree[2].name}
                      </h3>
                      <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {topThree[2].total_score}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 dark:text-white">
                            {topThree[2].tasks_count}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Tasks</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Rest of the users */}
        {restUsers.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              All Rankings
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-750 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Rank
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        User
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Tasks Completed
                      </th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Total Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {restUsers.map((user, index) => {
                      const rank = index + 4;
                      return (
                        <motion.tr
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                {rank}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className={`h-10 w-10 bg-gradient-to-br ${getMedalColor(rank)} rounded-full flex items-center justify-center text-base font-bold text-white shadow`}>
                                {user.name[0].toUpperCase()}
                              </div>
                              <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-base text-gray-700 dark:text-gray-300">
                              {user.tasks_count}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-base font-semibold text-blue-600 dark:text-blue-400">
                              {user.total_score}
                            </span>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {sortedUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Trophy className="w-20 h-20 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-2">
              No rankings yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Complete tasks to appear on the leaderboard!
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

Leaderboard.layout = (page: ReactNode) => (
  <AppLayout breadcrumbs={[{ title: 'Leaderboard', href: '/leaderboard' }]}>
    {page}
  </AppLayout>
);

export default Leaderboard;