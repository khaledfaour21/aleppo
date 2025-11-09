
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Globe, Menu, ShieldAlert } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const appContext = useContext(AppContext);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/submit', label: t('nav.submit') },
    { path: '/track', label: t('nav.track') },
    { path: '/statistics', label: t('nav.stats') },
    { path: '/announcements', label: t('nav.announcements') },
    { path: '/achievements', label: t('nav.achievements') },
    { path: '/faq', label: t('nav.faq') },
  ];

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Menu />
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks.map(link => (
              <li key={link.path}><NavLink to={link.path}>{link.label}</NavLink></li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          <ShieldAlert className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">{t('appName').split('–')[0]}</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map(link => (
            <li key={link.path}><NavLink to={link.path} className={({ isActive }) => isActive ? 'active' : ''}>{link.label}</NavLink></li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Language Switcher */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <Globe />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
            <li><button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>English</button></li>
            <li><button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? 'active' : ''}>العربية</button></li>
          </ul>
        </div>

        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost">
          <input type="checkbox" onChange={appContext?.toggleTheme} checked={appContext?.theme === 'dark'} />
          <Sun className="swap-on fill-current w-5 h-5" />
          <Moon className="swap-off fill-current w-5 h-5" />
        </label>
      </div>
    </div>
  );
};

export default Navbar;
