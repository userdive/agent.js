module.exports = {
  linters: {
    '*.ts': [
      'prettier-eslint --write',
      'tslint --fix',
      'tslint',
      'git add'
    ],
    '*.tsx': [
      'prettier-eslint --eslint-config-path ./website/.eslintrc.json --write',
      'tslint --fix -c ./examples/tslint.json',
      'tslint -c ./examples/tslint.json',
      'git add'
    ],
    'website/**/*.js': [
      'prettier-eslint --eslint-config-path ./website/.eslintrc.json --write',
      'eslint ./website/.eslintrc.json',
      'git add'
    ],
    '*.pug': [
      'pug-lint'
    ],
    'package.json': [
      'fixpack',
      'git add'
    ],
    '*.md': [
      'prettier --write',
      'textlint',
      'git add'
    ],
    '*.css': [
      'prettier --write',
      'stylelint --fix',
      'git add'
    ]
  },
  'ignore': [
    'CHANGELOG.md'
  ]
}
