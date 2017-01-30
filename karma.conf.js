const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
       { pattern: 'test/*.test.js' }
    ],
    preprocessors: {
      'test/*.test.js': ['webpack', 'coverage']
    },
    webpack: {
      module: {
        rules: webpackConfig.module.rules.concat([{
          test: /\.js$/,
          loader: 'babel-istanbul-loader',
          exclude: /node_modules/,
          query: {
            cacheDirectory: true
          }
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
    reporters: ['mocha'],
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    singleRun: true
  })
}
