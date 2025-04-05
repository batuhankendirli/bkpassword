import classNames from 'classnames/bind';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { Input } from '../input';

import styles from './number-input.module.scss';

const cx = classNames.bind(styles);

export interface NumberInputProps {
  stepper?: number;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number;
  onValueChange?: (value: number | undefined) => void;
}

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      stepper,
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      onValueChange,
      value: controlledValue,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState<string>(String(controlledValue ?? defaultValue ?? min));

    const clampValue = useCallback(
      (value: number | undefined) => {
        if (value === undefined) return min;
        return Math.max(min, Math.min(value, max));
      },
      [min, max],
    );

    useEffect(() => {
      if (controlledValue !== undefined) {
        setInputValue(String(clampValue(controlledValue)));
      }
    }, [controlledValue, clampValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const numericValue = Number(rawValue);

      if (rawValue === '') {
        setInputValue(String(min));
        if (onValueChange) onValueChange(min);
        return;
      }

      const clampedValue = clampValue(numericValue);

      setInputValue(String(clampedValue));
      if (onValueChange) onValueChange(clampedValue);
    };

    const handleBlur = () => {
      const numericValue = Number(inputValue);
      const clampedValue = clampValue(numericValue);

      if (numericValue !== clampedValue) {
        setInputValue(String(clampedValue));
        if (onValueChange) onValueChange(clampedValue);
      }
    };

    return (
      <Input
        type="number"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        placeholder={placeholder}
        ref={ref}
        className={cx('number-input')}
        {...props}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
