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
  captureTimeout: 180000,
  browserDisconnectTimeout: 180000,
  browserDisconnectTolerance: 3,
  browserNoActivityTimeout: 300000,
  singleRun: true
}

let override = {}

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
  const customLaunchers = require('./browser-providers.conf').customLaunchers
  override = Object.assign({}, {
    sauceLabs: {
      testName: '@userdive/agent',
      retryLimit: 3,
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      options: {
        'selenium-version': '2.53.0',
        'command-timeout': 600,
        'idle-timeout': 600,
        'max-duration': 5400
      }
    },
    customLaunchers,
    browsers: Object.keys(customLaunchers),
    reporters: ['mocha', 'coverage', 'saucelabs']
  })
}

const setting = Object.assign({}, base, override)

module.exports = function (config) {
  config.set(setting)
}
