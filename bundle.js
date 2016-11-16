/* @flow */
const fs = require('fs')
const licensify = require('licensify')
const browserify = require('browserify')

browserify('./src/index.js')
  .transform('babelify')
  .plugin(licensify)
  .bundle()
  .pipe(fs.createWriteStream('./dist/agent.js'))
