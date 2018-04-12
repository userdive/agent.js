module.exports = {
  linters: {
    '*.{ts,tsx}': ['prettier-eslint', 'tslint --fix', 'git add'],
    '*.js': [
      'prettier-eslint --eslint-config-path ./website/.eslintrc.json --write',
      'eslint ./website/.eslintrc.json',
      'git add'
    ],
    '*.pug': ['pug-lint'],
    '**/package.json': ['fixpack', 'git add'],
    '*.md': ['prettier --write', 'textlint', 'git add'],
    '*.css': ['prettier --write', 'stylelint --fix', 'git add']
  },
  ignore: ['CHANGELOG.md']
}
