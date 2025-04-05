import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '../ComponentWithTooltip';
import { Badge } from '../ui/badge';
import { IoReload } from 'react-icons/io5';
import { selectArea } from '@/utils/helpers';
import { TPasswordStrength } from '@/types';
import { useTranslations } from 'next-intl';

import styles from './password-area.module.scss';

const cx = classNames.bind(styles);

interface Props {
  password: string;
  passwordStrength: TPasswordStrength;
  refreshPassword: () => void;
  rotate: boolean;
  displayBadge?: boolean;
}

const PasswordArea = ({ password, passwordStrength, refreshPassword, rotate, displayBadge = false }: Props) => {
  const t = useTranslations();
  const passwordRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cx('password-area')}>
      <p
        className={cx('password-area__password', {
          'password-area__password--disabled': rotate,
        })}
        onClick={() => selectArea(passwordRef)}
        ref={passwordRef}
      >
        {password}
      </p>

      {displayBadge && <Badge variant={passwordStrength}>{t(`homepage.strength.${passwordStrength}`)}</Badge>}

      <ComponentWithTooltip tooltip={t('homepage.tooltip.refresh')}>
        <button className={cx('password-area__refresh')} onClick={refreshPassword} disabled={rotate}>
          <IoReload
            className={cx('password-area__refresh__icon', {
              'password-area__refresh__icon--rotate': rotate,
            })}
          />
        </button>
      </ComponentWithTooltip>
    </div>
  );
};

export default PasswordArea;
