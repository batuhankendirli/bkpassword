'use client';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { IoSunny, IoMoon } from 'react-icons/io5';
import { Switch } from '../switch';
import { useTheme } from 'next-themes';

import styles from './theme-switch.module.scss';

const cx = classNames.bind(styles);

const ThemeSwitch = () => {
  const { setTheme, theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark');

  const handleThemeChange = (e: boolean) => {
    setTheme(e ? 'dark' : 'light');
    setIsChecked(e);
  };

  useEffect(() => {
    setIsChecked(isDark);
    setMounted(true);
  }, [theme, mounted, systemTheme]);

  return (
    <Switch
      checked={isChecked}
      onCheckedChange={handleThemeChange}
      leftContent={<IoSunny className={cx('theme-switch__icon')} />}
      rightContent={<IoMoon className={cx('theme-switch__icon')} />}
    />
  );
};

export default ThemeSwitch;
