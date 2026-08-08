import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  {
    ignores: ['**/*.d.ts', 'src/styles/icons/**/*', 'build/**'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      'react-hooks/exhaustive-deps': 0,
    },
  },
];

export default config;
