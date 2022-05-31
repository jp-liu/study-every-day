module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['**/*.spec.ts'],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    'no-extend-native': 0,
    'no-eval': 0,
    'no-var': 0,
    'no-proto': 0,
    'no-new-object': 0,
    'no-prototype-builtins': 0
  }
}
