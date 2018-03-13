const config = require('@uncovertruth/textlint-config-en')
config.rules['incremental-headers'] = 1

if (process.env.CI) {
  config.rules['no-dead-link'] = Object.assign(
    {},
    config.rules['no-dead-link'],
    {
      ignore: ['https://www.wantedly.com/companies/uncovertruth/projects']
    }
  )
}
module.exports = config
