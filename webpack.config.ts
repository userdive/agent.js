// TODO migrate to typescript
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const { packageName, version, author, license } = require('./package.json')

const date = new Date()

module.exports = {
  entry: {
    'agent.d': path.join(__dirname, 'src/entrypoint/debug.ts'),
    agent: path.join(__dirname, 'src/entrypoint/index.ts')
  },
  output: {
    path: path.join(__dirname, 'lib/build/'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /logger\.ts$/,
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
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false
    }),
    new webpack.BannerPlugin({
      banner: `${packageName} ${version} | Copyright (c) ${date.getFullYear()} ${author} | License ${license}`
    })
  ]
}
