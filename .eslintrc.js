module.exports = {
  extends: 'next/core-web-vitals',
  ignorePatterns: ['**/*.d.ts', 'src/styles/icons/**/*'],
  rules: {
    'react-hooks/exhaustive-deps': 0,
  },
};
