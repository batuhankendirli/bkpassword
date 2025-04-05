import React from 'react';
import classNames from 'classnames/bind';
import Header from '@/components/Header';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IoArrowBack } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

import styles from '@/styles/pages/error-page.module.scss';

const cx = classNames.bind(styles);

const NotFound = () => {
  const t = useTranslations();

  return (
    <div className={cx('error-page')}>
      <Header />
      <main className={cx('error-page__container')}>
        <div className={cx('error-page__container__content')}>
          <h1 className={cx('error-page__container__content__status-code')}>{t('404.title')}</h1>
          <Separator orientation="vertical" className={cx('error-page__container__content__separator')} />
          <div className={cx('error-page__container__content__message')}>
            <h4 className={cx('error-page__container__content__message__title')}>{t('404.sub-title')}</h4>
            <div className={cx('error-page__container__content__message__description')}>
              <p className={cx('error-page__container__content__message__description__text')}>{t('404.description')}</p>
              <span
                className={cx('error-page__container__content__message__description__subtext')}
                dangerouslySetInnerHTML={{ __html: t.raw('404.sub-description') }}
              />
            </div>
          </div>
        </div>
        <Button variant="default" asChild>
          <Link href="/">
            <IoArrowBack className={cx('error-page__container__buttons__button__icon')} />
            {t('404.button')}
          </Link>
        </Button>
      </main>
    </div>
  );
};

export default NotFound;
