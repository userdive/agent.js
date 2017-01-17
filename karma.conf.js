module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
    ],
    preprocessors: {
    },
    reporters: ['progress', 'coverage'],
    browsers: ['Chrome'],
    coverageReporter: {
      reporters: [{type: 'lcov'}]
    }
  })
}
