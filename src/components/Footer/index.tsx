import React from 'react';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';

import styles from './footer.module.scss';

const cx = classNames.bind(styles);

const Footer = () => {
  const t = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cx('footer')}>
      <div className={cx('footer__container')}>
        <p>
          © {currentYear}{' '}
          <a href="https://batuhankendirli.vercel.app/" target="_blank" className={cx('footer__container__link')}>
            Batuhan Kendirli
          </a>
        </p>
        <span>•</span>
        <span>{t('footer.privacy')}</span>
      </div>
    </footer>
  );
};

export default Footer;
