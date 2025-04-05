import React, { useState } from 'react';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '../ComponentWithTooltip';
import { Button } from '../ui/button';
import { copyToClipboard } from '@/utils/helpers';
import { IoCopyOutline } from 'react-icons/io5';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useTranslations } from 'next-intl';

import styles from './button-copy.module.scss';

const cx = classNames.bind(styles);

interface Props {
  password: string;
  rotate?: boolean;
  size?: 'icon' | 'icon-sm';
  disabled?: boolean;
  className?: string;
}

const ButtonCopy = ({ password, rotate, size = 'icon', disabled, className }: Props) => {
  const t = useTranslations();
  const [copyAlert, setCopyAlert] = useState<boolean>(false);

  return (
    <Popover open={copyAlert}>
      <ComponentWithTooltip tooltip={t('homepage.tooltip.copy')}>
        <PopoverTrigger asChild>
          <Button
            size={size}
            className={cx('group', className)}
            onClick={() => {
              copyToClipboard(password, setCopyAlert, 1000);
            }}
            disabled={rotate || copyAlert || disabled}
          >
            <IoCopyOutline className={cx('button-copy__icon')} />
          </Button>
        </PopoverTrigger>
      </ComponentWithTooltip>
      <PopoverContent onCloseAutoFocus={(e) => e.preventDefault()} side="top">
        {t('homepage.tooltip.copy-success')}
      </PopoverContent>
    </Popover>
  );
};

export default ButtonCopy;
