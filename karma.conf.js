const webpackConfig = require('./webpack.config')

const loaders = webpackConfig.module.loaders.concat([{
  test: /\.js$/,
  loader: 'babel-istanbul',
  exclude: /node_modules/,
  query: {
    cacheDirectory: true
  }
}])

console.log(loaders)

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
      module: { loaders },
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
