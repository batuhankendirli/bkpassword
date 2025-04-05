'use client';

import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import { IoIosRefresh } from 'react-icons/io';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

import styles from '@/styles/pages/error-page.module.scss';

const cx = classNames.bind(styles);

const ErrorPage = () => {
  const t = useTranslations();

  useEffect(() => {
    document.title = t('500.page.title');
  }, []);

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className={cx('error-page')}>
      <Header />
      <main className={cx('error-page__container')}>
        <div className={cx('error-page__container__content')}>
          <h1 className={cx('error-page__container__content__status-code')}>{t('500.title')}</h1>
          <Separator orientation="vertical" className={cx('error-page__container__content__separator')} />
          <div className={cx('error-page__container__content__message')}>
            <h4 className={cx('error-page__container__content__message__title')}>{t('500.sub-title')}</h4>
            <div className={cx('error-page__container__content__message__description')}>
              <p className={cx('error-page__container__content__message__description__text')}>{t('500.description')}</p>
              <span className={cx('error-page__container__content__message__description__subtext')}>
                {t('500.sub-description')}
              </span>
            </div>
          </div>
        </div>
        <div className={cx('error-page__container__buttons')}>
          <Button variant="default" onClick={handleReset}>
            <IoIosRefresh className={cx('error-page__container__buttons__button__icon')} />
            {t('500.button.reload')}
          </Button>
          <Button variant="default" asChild>
            <Link href="/">
              <IoArrowBack className={cx('error-page__container__buttons__button__icon')} />
              {t('500.button.home')}
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
