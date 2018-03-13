const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const { author, license } = require('./package.json')
const { version } = require('./lerna.json')

const date = new Date()

module.exports = {
  entry: {
    'agent.d': path.join(__dirname, 'packages/agent/src/entrypoint/debug.ts'),
    agent: path.join(__dirname, 'packages/agent/src/entrypoint/index.ts'),
    linker: path.join(__dirname, 'packages/linker/src/index.ts')
  },
  output: {
    path: path.join(__dirname, 'cdn'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(version)
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    }),
    new webpack.BannerPlugin({
      banner: `@userdive/[name] ${version} | Copyright (c) ${date.getFullYear()} ${author} | License ${license}`
    })
  ]
}
