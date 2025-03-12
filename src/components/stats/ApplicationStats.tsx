'use client';

import { useEffect, useState } from 'react';
import { Star, Users, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

type StatsData = {
    totalApplications: number;
    acceptedApplications: number;
};

export default function ApplicationStats() {
    const [stats, setStats] = useState<StatsData>({
        totalApplications: 0,
        acceptedApplications: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // リアルタイムで統計を取得
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/stats');
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

        // 定期的なポーリングで更新
        const interval = setInterval(fetchStats, 30000); // 30秒ごとに更新

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-xl p-6 md:p-8 shadow-glow-sm border border-white/10 mb-8 backdrop-blur-md"
        >
            <h2 className="text-xl font-bold mb-6 text-center text-glow">
                <div className="flex items-center justify-center">
                    <Star className="mr-2 h-5 w-5 text-primary-300 animate-pulse-glow" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-slate-900">
            現在の応募状況
          </span>
                </div>
            </h2>

            {loading ? (
                <div className="flex justify-center py-6">
                    <div className="w-12 h-12 rounded-full border-2 border-primary-300 border-t-transparent animate-spin"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="glass border border-white/5 rounded-lg p-5 text-center hover:shadow-glow-sm transition-all duration-300"
                    >
                        <p className="text-sm text-foreground/70 mb-2">総応募数</p>
                        <div className="flex items-center justify-center">
                            <Users className="text-primary-300 h-6 w-6 mr-2" />
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-slate-900">
                {stats.totalApplications}
              </span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="glass border border-white/5 rounded-lg p-5 text-center hover:shadow-glow-sm transition-all duration-300"
                    >
                        <p className="text-sm text-foreground/70 mb-2">参加決定者数</p>
                        <div className="flex items-center justify-center">
                            <UserCheck className="text-accent h-6 w-6 mr-2" />
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-950 to-slate-900">
                {stats.acceptedApplications}
              </span>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}