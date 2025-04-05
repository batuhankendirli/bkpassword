import * as React from 'react';
import classNames from 'classnames/bind';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './badge.module.scss';

const cx = classNames.bind(styles);

const badgeVariants = cva('badge', {
  variants: {
    variant: {
      'very-weak': 'badge--very-weak',
      weak: 'badge--weak',
      good: 'badge--good',
      strong: 'badge--strong',
      'very-strong': 'badge--very-strong',
    },
  },
  defaultVariants: {
    variant: 'very-weak',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cx(badgeVariants({ variant }).split(' '), className)} {...props} />;
}

export { Badge, badgeVariants };
