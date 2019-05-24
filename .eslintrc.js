module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    mocha: true,
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/prefer-interface': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-return-assign': 0,
    'no-console': [2, { allow: ["warn", "error"] }],
    'no-else-return': 2,
    'no-var': 2,
    'prefer-const': 2,
    'valid-jsdoc': 2,
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
        'newlines-between': 'always',
      },
    ],
    'import/no-named-export': 0,
    'import/newline-after-import': 2,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', 'json'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'json'],
      },
    },
  },
}
