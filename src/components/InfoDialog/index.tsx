'use client';

import React, { memo } from 'react';
import classNames from 'classnames/bind';
import Logo from '@/components/Logo';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import styles from './info-dialog.module.scss';

const cx = classNames.bind(styles);

interface Props {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const InfoDialog = ({ isOpen, setIsOpen }: Props) => {
  const t = useTranslations();
  const { theme, systemTheme } = useTheme();

  const isLight = theme === 'light' || (theme === 'system' && systemTheme === 'light');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Logo
          className={cx('info-dialog__logo', {
            'info-dialog__logo--light': isLight,
          })}
        />
        <DialogHeader>
          <DialogTitle className={cx('info-dialog__title')}>{t('homepage.info-dialog.title')}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className={cx('info-dialog__description')}>
            <p>{t('homepage.info-dialog.description')}</p>
            <ul className={cx('info-dialog__description__list')}>
              <li dangerouslySetInnerHTML={{ __html: t.raw('homepage.info-dialog.list-1') }} />
              <li dangerouslySetInnerHTML={{ __html: t.raw('homepage.info-dialog.list-2') }} />
              <li dangerouslySetInnerHTML={{ __html: t.raw('homepage.info-dialog.list-3') }} />
            </ul>
            <p>{t('homepage.info-dialog.description-bottom')}</p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default memo(InfoDialog);
