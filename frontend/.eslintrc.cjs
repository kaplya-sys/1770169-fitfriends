/* eslint-env node */

module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    '../.eslintrc.cjs',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@nx/react',
    'plugin:react-hooks/recommended',
    'htmlacademy/react-typescript'
  ],
  ignorePatterns: ['!**/*', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  overrides: [
    {
      files: ['*test*'],
      rules: { '@typescript-eslint/unbound-method': 'off' }
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {}
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {}
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {}
    }
  ],
}
