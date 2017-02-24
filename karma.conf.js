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
    dir: './coverage/pc',
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
  browsers: ['Chrome', 'Firefox', 'PhantomJS'],
  singleRun: true
}

let override = {}

if (process.env.BROWSER === 'sp') {
  override = {
    browsers: ['PhantomJS'],
    coverageReporter: Object.assign({}, base.coverageReporter, { dir: './coverage/sp' })
  }
}

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
  let customLaunchers
  switch (process.env.BROWSER) {
    case 'sp':
      customLaunchers = require('./browser-providers.conf').customLauncherSP
      break
    case 'pc':
      customLaunchers = require('./browser-providers.conf').customLauncherPC
      break
  }
  override = Object.assign({}, {
    sauceLabs: {
      testName: '@userdive/agent',
      retryLimit: 3,
      startConnect: false,
      recordVideo: false,
      recordScreenshots: false,
      options: {
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
