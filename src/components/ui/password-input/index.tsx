import React, { ChangeEvent, ComponentProps, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import ComponentWithTooltip from '@/components/ComponentWithTooltip';
import { animateScrambleReveal } from '@/utils/helpers';
import { conditionsObj } from '@/constants';
import { IoEye } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import styles from './password-input.module.scss';

const cx = classNames.bind(styles);

interface PasswordInputProps extends Omit<ComponentProps<'input'>, 'type'> {
  showPasswordToggle?: boolean;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showPasswordToggle = true, onChange, value, ...props }, ref) => {
    const t = useTranslations();
    const [showPassword, setShowPassword] = useState(false);
    const [animatingValue, setAnimatingValue] = useState('');
    const [isEmpty, setIsEmpty] = useState<boolean>(!value || value.toString().length === 0);

    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.replace(/^\s+/, '');
      if (animatingValue) {
        setAnimatingValue('');
      }
      setIsEmpty(e.target.value.length === 0);
      onChange?.(e);
    };

    const togglePasswordVisibility = () => {
      if (!innerRef.current) return;
      const currentValue = innerRef.current.value;

      if (currentValue && !showPassword) {
        setShowPassword(true);

        const scrambleChars =
          conditionsObj.lowercase + conditionsObj.uppercase + conditionsObj.numbers + conditionsObj.symbols;

        animateScrambleReveal(currentValue, scrambleChars, (val) => {
          setAnimatingValue(val);
        });
      } else {
        setShowPassword(false);
        setAnimatingValue('');
      }
    };

    const inputValueProps = animatingValue ? { value: animatingValue } : {};

    return (
      <div className={cx('password__input__wrapper')}>
        <input
          ref={innerRef}
          type={showPassword ? 'text' : 'password'}
          className={cx('password__input', className, 'password__input--pr', {
            'password__input--invalid': props['aria-invalid'],
          })}
          onChange={handleChange}
          {...(value !== undefined && !animatingValue ? { value } : {})}
          {...props}
          {...inputValueProps}
        />
        {!isEmpty && showPasswordToggle && (
          <ComponentWithTooltip
            tooltip={showPassword ? t('homepage.tooltip.hide-password') : t('homepage.tooltip.show-password')}
          >
            <button
              type="button"
              className={cx('password__input__button', 'group')}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? t('homepage.tooltip.hide-password') : t('homepage.tooltip.show-password')}
              tabIndex={-1}
            >
              <IoEye />
              <motion.div
                className={cx('password__input__button--slash')}
                initial={{ width: 0 }}
                animate={{ width: showPassword ? '65%' : 0, display: showPassword ? 'block' : 'none' }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}
              />
            </button>
          </ComponentWithTooltip>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
