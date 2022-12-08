module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['turbo', 'prettier'],
  plugins: ['import-helpers', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: 'function', next: 'function' },
    ],
    'no-unused-vars': 'off',
    'no-underscore-dangle': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['module', 'parent', 'sibling', 'index'],
        alphabetize: {
          order: 'asc',
          ignoreCase: true,
        },
      },
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
