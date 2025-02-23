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
        mono: ['var(--font-inconsolata)', ...fontFamily.mono],
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
        '-sm': { max: '519px' },
        '-md': { max: '719px' },
        '-lg': { max: '959px' },
        '-laptop': { max: '1023px' },
        '-xl': { max: '1139px' },
        '-2xl': { max: '1279px' },
      },
    },
  },
  plugins: [],
};
