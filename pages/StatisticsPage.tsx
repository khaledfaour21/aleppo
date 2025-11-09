
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { apiService } from '../services/apiService';
import { Statistics } from '../types';
import { ListChecks, Hourglass, Sigma } from 'lucide-react';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: number, className?: string }> = ({ icon, title, value, className }) => (
    <div className={`card bg-base-100 shadow-xl ${className}`}>
        <div className="card-body flex-row items-center">
            <div className="text-3xl">{icon}</div>
            <div className="ml-4">
                <div className="text-lg font-bold">{value}</div>
                <div className="text-sm opacity-70">{title}</div>
            </div>
        </div>
    </div>
);


const StatisticsPage: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await apiService.getStatistics();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch statistics", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (!stats) {
    return <div className="text-center">{t('error.loading')}</div>;
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];
  const pieData = [{name: t('statsPage.completed'), value: stats.completed}, {name: t('statsPage.pending'), value: stats.pending}]

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8">{t('statsPage.title')}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatCard icon={<Sigma />} title={t('statsPage.total')} value={stats.totalComplaints} className="bg-primary text-primary-content" />
        <StatCard icon={<ListChecks />} title={t('statsPage.completed')} value={stats.completed} className="bg-success text-success-content" />
        <StatCard icon={<Hourglass />} title={t('statsPage.pending')} value={stats.pending} className="bg-warning text-warning-content" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('statsPage.byCategory')}</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.byCategory.map(c => ({...c, name: t(`complaintTypes.${c.name}`)}))} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{t('complaintStatuses.Completed')} vs {t('complaintStatuses.New')}</h2>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        <Cell key={`cell-0`} fill={COLORS[1]} />
                        <Cell key={`cell-1`} fill={COLORS[2]} />
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
