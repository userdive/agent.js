/* @flow */
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const version = require('./package.json').version

const date = new Date()

module.exports = {
  entry: {
    'agent.d': path.join(__dirname, 'src/entrypoint/debug.js'),
    'agent': path.join(__dirname, 'src/entrypoint/index.js')
  },
  output: {
    path: path.join(__dirname, 'lib/build/'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /logger\.js$/,
        loader: 'string-replace-loader',
        exclude: /node_modules/,
        options: {
          search: 'USERDIVE_AGENT_VERSION',
          replace: version
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false
    }),
    new webpack.BannerPlugin({banner: `@userdive/agent.js ${version} | Copyright (c) ${date.getFullYear()} UNCOVER TRUTH Inc.`})
  ]
}
