'use client';

import classNames from 'classnames/bind';
import { IoClose } from 'react-icons/io5';
import { PiCheckBold } from 'react-icons/pi';
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';

import styles from './toaster.module.scss';

const cx = classNames.bind(styles);

export function Toaster() {
  const { toasts } = useToast();
  const toastIcon = {
    'toast-success': <PiCheckBold />,
    'toast-error': <IoClose />,
  };

  return (
    <ToastProvider duration={2000}>
      {toasts.map(function ({ id, title, description, icon, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className={cx('toaster')}>
              {icon && (
                <div
                  className={cx('toaster__icon', {
                    'toaster__icon--success': icon === 'toast-success',
                    'toaster__icon--error': icon === 'toast-error',
                  })}
                >
                  {toastIcon[icon as keyof typeof toastIcon]}
                </div>
              )}
              <div className={cx('toaster__content')}>
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
              </div>
            </div>

            {action}
          </Toast>
        );
      })}

      <ToastViewport />
    </ToastProvider>
  );
}
