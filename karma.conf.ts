import * as objectAssign from 'object-assign'
import { customLaunchers } from './browser-providers.conf'

let override = {}

if (
  process.env.SAUCE_USERNAME &&
  process.env.SAUCE_ACCESS_KEY &&
  process.env.CI_MODE === 'sauce'
) {
  override = objectAssign(
    {},
    {
      sauceLabs: {
        testName: '@userdive/agent',
        recordVideo: false,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        options: {
          'selenium-version': '3.1.0',
          'command-timeout': 600,
          'idle-timeout': 600,
          'max-duration': 5400
        }
      },
      customLaunchers,
      concurrency: 3,
      captureTimeout: 180000,
      browserDisconnectTimeout: 180000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 180000,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage-istanbul', 'saucelabs']
    }
  )
}

export const createSettings = (pattern: string = `test/**/*.test.ts`) =>
  objectAssign(
    {},
    {
      mime: {
        'text/x-typescript': ['ts']
      },
      basePath: '',
      frameworks: ['mocha', 'fixture'],
      files: [{ pattern }],
      preprocessors: {
        [pattern]: ['webpack']
      },
      webpack: {
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: ['webpack-espower-loader', 'ts-loader']
            },
            {
              test: /\.ts$/,
              enforce: 'post',
              use: { loader: 'istanbul-instrumenter-loader' },
              exclude: [/node_modules/, /test/]
            }
          ]
        },
        resolve: {
          extensions: ['.ts', '.js']
        },
        node: { fs: 'empty' }
      },
      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary']
      },
      webpackMiddleware: {
        stats: {
          colors: true
        }
      },
      reporters: ['mocha', 'coverage-istanbul'],
      mochaReporter: {
        showDiff: true
      },
      browsers: [process.env.CI_MODE === 'IE' ? 'IE' : 'PhantomJS'],
      singleRun: true
    },
    override
  )

export default (config: any) =>
  config.set(createSettings(`packages/*/test/**/*.ts`))
