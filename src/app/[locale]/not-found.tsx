import React from 'react';
import classNames from 'classnames/bind';
import { FiChevronLeft } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

import styles from '@/styles/pages/error-page.module.scss';

const cx = classNames.bind(styles);

const NotFound = () => {
  const t = useTranslations();

  return (
    <div className={cx('error-page')}>
      <h1 className={cx('error-page__404')}>
        <span className={cx('error-page__404__number')}>4</span>
        <span className={cx('error-page__404__number')}>0</span>
        <span className={cx('error-page__404__number')}>4</span>
      </h1>
      <p className={cx('error-page__desc')}>Page not found</p>
      <a href="/" className={cx('error-page__button')}>
        <FiChevronLeft /> Go Home
      </a>
    </div>
  );
};

export default NotFound;
