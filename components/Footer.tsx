
import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>{t('footer.copy')}</p>
      </div>
    </footer>
  );
};

export default Footer;
