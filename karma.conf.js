const config = require('./webpack.config')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/**/*.test.js'
    ],
    preprocessors: {
      'test/**/*test.js': ['webpack']
    },
    webpack: {
      module: config.module
    },
    webpackMiddleware: {
      noInfo: true,
      quiet: true,
      stats: {
        colors: true
      }
    },
    reporters: ['progress', 'coverage'],
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [{type: 'lcov'}]
    }
  })
}
