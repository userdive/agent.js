const webpackConfig = require('./webpack.config')

const base = {
  basePath: '',
  frameworks: ['mocha'],
  files: [
    { pattern: 'test/*.test.js' }
  ],
  preprocessors: {
    'test/*.test.js': ['webpack']
  },
  webpack: {
    module: {
      rules: webpackConfig.module.rules.concat([{
        test: /\.js$/,
        use: 'babel-istanbul-loader',
        exclude: /node_modules/
      }])
    },
    node: { fs: 'empty' }
  },
  coverageReporter: {
    dir: './coverage/karma',
    reporters: [
      {type: 'lcov'},
      {type: 'text'}
    ]
  },
  webpackMiddleware: {
    noInfo: true,
    quiet: true,
    stats: {
      colors: true
    }
  },
  reporters: ['mocha', 'coverage'],
  browsers: ['PhantomJS'],
  singleRun: true
}

let override = {}

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY && process.env.CI_MODE === 'sauce') {
  const customLaunchers = require('./browser-providers.conf').customLaunchers
  override = Object.assign({}, {
    sauceLabs: {
      testName: '@userdive/agent',
      recordVideo: false,
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
      options: {
        'selenium-version': '3.1.0'
      }
    },
    concurrency: 1,
    customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['coverage', 'saucelabs']
  })
}

const setting = Object.assign({}, base, override)

module.exports = function (config) {
  config.set(setting)
}
