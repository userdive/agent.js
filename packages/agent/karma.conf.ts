const webpackConfig = require('./webpack.config')
const path = require('path')
const { customLaunchers } = require('./browser-providers.conf')
const base = {
  mime: {
    'text/x-typescript': ['ts']
  },
  basePath: '',
  frameworks: ['mocha'],
  files: [{ pattern: 'test/**/*.test.ts' }],
  preprocessors: {
    'test/**/*.test.ts': ['webpack']
  },
  webpack: {
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ['webpack-espower-loader', 'ts-loader']
        },
        {
          test: /\.ts$/,
          enforce: 'post',
          use: { loader: 'istanbul-instrumenter-loader' },
          exclude: [/node_modules/, /test/]
        }
      ]
    },
    resolve: webpackConfig.resolve,
    node: { fs: 'empty' }
  },
  coverageIstanbulReporter: {
    reports: ['html', 'lcovonly', 'text-summary']
  },
  webpackMiddleware: {
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  },
  reporters: ['mocha', 'coverage-istanbul'],
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
      browserNoActivityTimeout: 180000,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage-istanbul', 'saucelabs']
    }
  )
}

const setting = Object.assign({}, base, override)

module.exports = function (config: any) {
  config.set(setting)
}
