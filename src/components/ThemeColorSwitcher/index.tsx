'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

const ThemeColorSwitcher = () => {
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const themeColor = currentTheme === 'dark' ? '#1e1e24' : '#e2e2e2';

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
  }, [theme, systemTheme]);

  return null;
};

export default ThemeColorSwitcher;
