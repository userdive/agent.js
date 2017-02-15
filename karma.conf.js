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

const setting = Object.assign({}, base, override)

module.exports = function (config) {
  config.set(setting)
}
