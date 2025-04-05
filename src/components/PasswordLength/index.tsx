import React from 'react';
import classNames from 'classnames/bind';
import { IPassword } from '@/types';
import { NumberInput } from '../ui/number-input';
import { Slider } from '../ui/slider';
import { useTranslations } from 'next-intl';

import styles from './password-length.module.scss';

const cx = classNames.bind(styles);

interface Props {
  passwordLength: number;
  handleSetPassword: <P extends keyof IPassword>(key: P, value: IPassword[P]) => void;
  min: number;
  max: number;
}

const PasswordLength = ({ passwordLength, handleSetPassword, min, max }: Props) => {
  const t = useTranslations();

  return (
    <div className={cx('password-area')}>
      <p className={cx('password-area__label')}>{t('homepage.conditions.password-length')}:</p>
      <Slider
        defaultValue={[passwordLength]}
        min={min}
        max={max}
        step={1}
        onValueChange={(e) => handleSetPassword('length', e[0])}
        value={[passwordLength]}
      />
      <NumberInput
        min={min}
        max={max}
        value={passwordLength}
        defaultValue={passwordLength}
        onValueChange={(e) => handleSetPassword('length', e as number)}
      />
    </div>
  );
};

export default PasswordLength;
