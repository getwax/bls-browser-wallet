module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/space-before-blocks': 'off',
    'no-param-reassign': 'off',
    'import/prefer-default-export': 'off',
  },
  ignorePatterns: [
    '.eslintrc.js',
    'tailwind.config.js',
    'config-overrides.js',
    'postcss.config.js'
  ]
};
