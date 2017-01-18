const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/**/*.test.js'
    ],
    preprocessors: {
      'test/**/*.test.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      node: { fs: 'empty' }
    },
    webpackMiddleware: {
      noInfo: true,
      quiet: true,
      stats: {
        colors: true
      }
    },
    singleRun: true,
    reporters: ['mocha'],
    browsers: ['Firefox']
  })
}
