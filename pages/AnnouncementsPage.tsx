
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from '../services/apiService';
import { Announcement } from '../types';
import { Megaphone, Calendar } from 'lucide-react';

const AnnouncementsPage: React.FC = () => {
  const { t } = useTranslation();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const data = await apiService.getAnnouncements();
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <Megaphone /> {t('announcementsPage.title')}
      </h1>
      
      {announcements.length === 0 ? (
        <p className="text-center text-lg">{t('common.noData')}</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{announcement.title}</h2>
                <div className="flex items-center gap-2 text-sm opacity-70 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{announcement.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
