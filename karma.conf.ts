import * as objectAssign from 'object-assign'
import * as puppeteer from 'puppeteer'
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
        recordScreenshots: false,
        tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER,
        options: {
          'selenium-version': '3.1.0',
          'command-timeout': 600,
          'idle-timeout': 600,
          'max-duration': 5400
        }
      },
      customLaunchers,
      browserDisconnectTimeout: 300000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 300000,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage-istanbul', 'saucelabs']
    }
  )
} else {
  process.env.CHROME_BIN = puppeteer.executablePath()
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
        stats: 'errors-only'
      },
      reporters: ['mocha', 'coverage-istanbul'],
      mochaReporter: {
        showDiff: true
      },
      browsers: [process.env.CI_MODE === 'IE' ? 'IE' : 'ChromeHeadless'],
      singleRun: true
    },
    override
  )

export default (config: any) =>
  config.set(createSettings(`packages/*/test/**/*.ts`))
