const config = require('@uncovertruth/textlint-config-en')
config.rules['incremental-headers'] = 1

config.rules['no-dead-link'] = Object.assign({}, config.rules['no-dead-link'], {
  ignore: [
    'https://www.wantedly.com/companies/uncovertruth/projects',
    'https://v1.userdive.com',
    'https://codebeat.co/**/*',
    'https://app.codacy.com/**/*',
    'https://www.codefactor.io/**/*',
    'https://david-dm.org/**/*'
  ]
})

module.exports = config
