import React from 'react';
import classNames from 'classnames/bind';
import { Checkbox } from '../ui/checkbox';
import { handleDisabiling } from '@/utils/helpers';
import { IConditions } from '@/types';
import { options } from '@/constants';
import { useTranslations } from 'next-intl';

import styles from './password-conditions.module.scss';

const cx = classNames.bind(styles);

interface Props {
  checkedConditions: IConditions;
  setCheckedConditions: React.Dispatch<React.SetStateAction<IConditions>>;
}

const PasswordConditions = ({ checkedConditions, setCheckedConditions }: Props) => {
  const t = useTranslations();
  const handleCheckedChange = (id: keyof IConditions, checked: boolean) => {
    setCheckedConditions((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className={cx('conditions')}>
      <p className={cx('conditions__label')}>{t('homepage.conditions.characters')}:</p>
      <div className={cx('conditions__wrapper')}>
        {options.map((item) => (
          <div key={item.id} className={cx('conditions__wrapper__option')}>
            <Checkbox
              id={item.id}
              defaultChecked
              checked={checkedConditions[item.id]}
              onCheckedChange={(e) => handleCheckedChange(item.id, e as boolean)}
              disabled={handleDisabiling(item.id, checkedConditions)}
            />
            <label
              htmlFor={item.id}
              className={cx('conditions__wrapper__option__label', {
                'conditions__wrapper__option__label--disabled': handleDisabiling(item.id, checkedConditions),
              })}
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordConditions;
