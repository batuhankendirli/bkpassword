import * as React from 'react';
import classNames from 'classnames/bind';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button--default',
      outline: 'button--outline',
      warning: 'button--warning',
    },
    size: {
      default: 'button__size--default',
      icon: 'button__size--icon',
      'icon-sm': 'button__size--icon--sm',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cx(buttonVariants({ variant, size, className }).split(' '))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
