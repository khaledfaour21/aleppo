
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/apiService';
import { Achievement } from '../types';
import { Trophy, Calendar } from 'lucide-react';

const AchievementsPage: React.FC = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await apiService.getAchievements();
        setAchievements(data);
      } catch (error) {
        console.error("Failed to fetch achievements", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <Trophy /> {t('achievementsPage.title')}
      </h1>
      
      {achievements.length === 0 ? (
        <p className="text-center text-lg">{t('common.noData')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="card bg-base-100 shadow-xl image-full">
              <figure><img src={achievement.imageUrl} alt={achievement.title} /></figure>
              <div className="card-body justify-end">
                <div>
                  <h2 className="card-title">{achievement.title}</h2>
                  <p>{achievement.description}</p>
                   <div className="flex items-center gap-2 text-xs opacity-80 mt-2">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(achievement.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
