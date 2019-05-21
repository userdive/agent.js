module.exports = {
  linters: {
    '*.{ts,tsx}': ['eslint --fix', 'git add'],
    '*.js': ['eslint --fix', 'git add'],
    '*.pug': ['pug-lint'],
    '**/package.json': ['fixpack', 'git add'],
    '*.md': ['prettier --write', 'textlint', 'git add'],
    '*.css': ['prettier --write', 'stylelint --fix', 'git add'],
  },
  ignore: ['CHANGELOG.md'],
}
