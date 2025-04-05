'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import classNames from 'classnames/bind';

import styles from './slider.module.scss';

const cx = classNames.bind(styles);

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root ref={ref} className={cx('slider', className)} {...props}>
    <SliderPrimitive.Track className={cx('slider__track')}>
      <SliderPrimitive.Range className={cx('slider__track__range')} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cx('slider__thumb')} />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
