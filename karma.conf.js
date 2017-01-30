const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
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
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    singleRun: true
  })
}
