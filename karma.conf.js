const webpackConfig = require('./webpack.config')

const base = {
  basePath: '',
  frameworks: ['mocha'],
  files: [{pattern: 'test/*.test.js'}],
  preprocessors: {
    'test/*.test.js': ['webpack']
  },
  webpack: {
    module: {
      rules: webpackConfig.module.rules
    },
    node: {fs: 'empty'}
  },
  coverageReporter: {
    reporters: [{type: 'lcov'}, {type: 'text'}]
  },
  webpackMiddleware: {
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  },
  reporters: ['mocha', 'coverage'],
  mochaReporter: {
    showDiff: true
  },
  browsers: ['PhantomJS'],
  singleRun: true
}

let override = {}

if (
  process.env.SAUCE_USERNAME &&
  process.env.SAUCE_ACCESS_KEY &&
  process.env.CI_MODE === 'sauce'
) {
  const customLaunchers = require('./browser-providers.conf').customLaunchers
  override = Object.assign(
    {},
    {
      sauceLabs: {
        testName: '@userdive/agent',
        recordVideo: false,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        options: {
          'selenium-version': '3.1.0',
          'command-timeout': 600,
          'idle-timeout': 600,
          'max-duration': 5400
        }
      },
      customLaunchers,
      concurrency: 3,
      captureTimeout: 180000,
      browserDisconnectTimeout: 180000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 300000,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage', 'saucelabs']
    }
  )
}

const setting = Object.assign({}, base, override)

module.exports = function (config) {
  config.set(setting)
}
