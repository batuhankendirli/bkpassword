const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx,html,scss}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
        mono: ['var(--font-noto)', ...fontFamily.sans],
      },
      screens: {
        xsm: '320px',
        sm: '520px',
        md: '720px',
        lg: '960px',
        laptop: '1024px',
        xl: '1140px',
        '2xl': '1280px',
        '3xl': '1445px',
        '4xl': '1660px',
        tall: { raw: '(max-height: 690px)' },
        'tall-sm': { raw: '(max-height: 565px)' },
        'tall-xs': { raw: '(max-height: 420px)' },
        'lg-short': { raw: '(min-width: 960px) and (max-height: 690px)' },
        '-sm': { max: '519px' },
        '-md': { max: '719px' },
        '-lg': { max: '959px' },
        '-laptop': { max: '1023px' },
        '-xl': { max: '1139px' },
        '-2xl': { max: '1279px' },
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'foreground-secondary': 'var(--foreground-secondary)',
        'foreground-tertiary': 'var(--foreground-tertiary)',
        'foreground-tertiary-50': 'var(--foreground-tertiary-50)',
        neutral: 'var(--neutral)',
        'neutral-dark': 'var(--neutral-dark)',
        'neutral-darker': 'var(--neutral-darker)',
        'badge-very-weak': 'var(--badge-very-weak)',
        'badge-very-weak-text': 'var(--badge-very-weak-text)',
        'badge-weak': 'var(--badge-weak)',
        'badge-weak-text': 'var(--badge-weak-text)',
        'badge-good': 'var(--badge-good)',
        'badge-good-text': 'var(--badge-good-text)',
        'badge-strong': 'var(--badge-strong)',
        'badge-strong-text': 'var(--badge-strong-text)',
        'badge-very-strong': 'var(--badge-very-strong)',
        'badge-very-strong-text': 'var(--badge-very-strong-text)',
        tooltip: 'var(--tooltip)',
        layer: 'var(--layer)',
        'toast-layer': 'var(--toast-layer)',
      },
      keyframes: {
        rotate360: {
          '0%': { transform: 'rotate(360deg) scaleX(-1)' },
          '100%': { transform: 'rotate(0deg) scaleX(-1)' },
        },
      },
      animation: {
        'rotate-360': 'rotate360 .3s ease-in',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
