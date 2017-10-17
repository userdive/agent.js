const webpackConfig = require('./webpack.config')

const base = {
  mime: {
    'text/x-typescript': ['ts', 'tsx']
  },
  basePath: '',
  frameworks: ['mocha', 'karma-typescript'],
  files: [{ pattern: 'src/**/*.ts' }, { pattern: 'test/**/*.test.ts' }],
  preprocessors: {
    'src/**/*.ts': ['karma-typescript', 'coverage'],
    'test/**/*.test.ts': ['karma-typescript']
  },
  webpack: {
    module: {
      rules: webpackConfig.module.rules
    },
    node: { fs: 'empty' }
  },
  karmaTypescriptConfig: {
    tsconfig: './tsconfig.test.json'
  },
  coverageReporter: {
    reporters: [{ type: 'lcov' }, { type: 'text' }]
  },
  webpackMiddleware: {
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  },
  reporters: ['mocha', 'coverage', 'karma-typescript'],
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
