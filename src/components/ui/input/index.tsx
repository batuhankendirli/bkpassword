import React, { ComponentProps, forwardRef } from 'react';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '@/components/ComponentWithTooltip';
import { IoSearch } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

import styles from './input.module.scss';

const cx = classNames.bind(styles);

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, type = 'text', onChange, ...props }, ref) => {
    const t = useTranslations();
    return (
      <div
        className={cx('input__wrapper', {
          'input__wrapper--search': type === 'search',
        })}
      >
        <input
          ref={ref}
          className={cx(
            'input',
            {
              'input--pr': type === 'search',
              'input--invalid': props['aria-invalid'],
            },
            className,
          )}
          type={type}
          onChange={onChange}
          {...props}
        />
        {type === 'search' && (
          <ComponentWithTooltip tooltip={t('homepage.tooltip.search')}>
            <span className={cx('input__button')}>
              <IoSearch />
            </span>
          </ComponentWithTooltip>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
