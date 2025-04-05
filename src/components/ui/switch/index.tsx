'use client';

import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import classNames from 'classnames/bind';

import styles from './switch.module.scss';

const cx = classNames.bind(styles);

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, leftContent, rightContent, ...props }, ref) => (
    <SwitchPrimitives.Root className={cx('switch', 'peer', className)} {...props} ref={ref}>
      {leftContent}
      <SwitchPrimitives.Thumb className={cx('switch__thumb')} />
      {rightContent}
    </SwitchPrimitives.Root>
  ),
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
