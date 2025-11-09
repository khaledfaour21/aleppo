
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FilePenLine, Search, BarChart2, Megaphone, Trophy, HelpCircle } from 'lucide-react';

interface ActionCardProps {
    to: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ to, icon, title, description }) => (
    <Link to={to} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="card-body items-center text-center">
            <div className="text-primary">{icon}</div>
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
        </div>
    </Link>
);


const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="hero min-h-[40vh] bg-base-200 rounded-box">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-5xl font-bold">{t('home.title')}</h1>
            <p className="py-6">{t('home.intro')}</p>
            <div className="flex gap-4 justify-center">
                <Link to="/submit" className="btn btn-primary">{t('home.submitAction')}</Link>
                <Link to="/track" className="btn btn-outline">{t('home.trackAction')}</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <ActionCard to="/submit" icon={<FilePenLine size={48} />} title={t('nav.submit')} description="Got an issue? Report it here." />
        <ActionCard to="/track" icon={<Search size={48} />} title={t('nav.track')} description="Check the status of your submitted complaint." />
        <ActionCard to="/statistics" icon={<BarChart2 size={48} />} title={t('nav.stats')} description="View public data and trends about complaints." />
        <ActionCard to="/announcements" icon={<Megaphone size={48} />} title={t('nav.announcements')} description="Stay updated with official notices." />
        <ActionCard to="/achievements" icon={<Trophy size={48} />} title={t('nav.achievements')} description="See the positive changes in our community." />
        <ActionCard to="/faq" icon={<HelpCircle size={48} />} title={t('nav.faq')} description="Find answers to common questions." />
      </div>
    </div>
  );
};

export default HomePage;
