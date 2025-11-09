
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContextProvider } from './context/AppContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SubmitComplaintPage from './pages/SubmitComplaintPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import StatisticsPage from './pages/StatisticsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AchievementsPage from './pages/AchievementsPage';
import FAQPage from './pages/FAQPage';

const AppContent: React.FC = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitComplaintPage />} />
          <Route path="/track" element={<TrackComplaintPage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContextProvider>
  );
};

export default App;
