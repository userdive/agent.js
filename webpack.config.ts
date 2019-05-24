import * as path from 'path'

import * as TerserPlugin from 'terser-webpack-plugin'
import { BannerPlugin, Configuration, DefinePlugin } from 'webpack'

import { version } from './lerna.json'
import { author, license } from './package.json'

const date = new Date()

const config: Configuration = {
  entry: {
    'agent.d': path.join(__dirname, 'packages/agent/src/entrypoint/debug.ts'),
    agent: path.join(__dirname, 'packages/agent/src/entrypoint/index.ts'),
    linker: path.join(__dirname, 'packages/linker/src/index.ts'),
    'kaizenplatform-plugin': path.join(
      __dirname,
      'packages/kaizenplatform/src/index.ts'
    ),
    'vwo-plugin': path.join(__dirname, 'packages/vwo/src/index.ts'),
    'optimizely-x-plugin': path.join(
      __dirname,
      'packages/optimizely_x/src/index.ts'
    ),
  },
  output: {
    path: path.join(__dirname, 'cdn'),
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new BannerPlugin({
        banner: `@userdive/[name] ${version} | Copyright (c) ${date.getFullYear()} ${author} | License ${license}`,
      }),
    ],
    concatenateModules: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.VERSION': JSON.stringify(version),
      'process.env.RAVEN_DSN': JSON.stringify(process.env.RAVEN_DSN),
    }),
  ],
}

export default config
