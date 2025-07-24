module.exports = {
  extends: [
    '../../.eslintrc.cjs',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'htmlacademy/node'
  ],
  ignorePatterns: ['!**/*', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  overrides: [
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
