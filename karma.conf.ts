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
        commandTimeout: 600,
        idleTimeout: 600,
        maxDuration: 5400
      },
      concurrency: 2,
      browserDisconnectTimeout: 10000,
      browserDisconnectTolerance: 5,
      browserNoActivityTimeout: 60000,
      browserConsoleLogOptions: { level: 'error', format: '%b %T: %m', terminal: true },
      customLaunchers,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage-istanbul', 'saucelabs']
    }
  )
} else {
  process.env.CHROME_BIN = puppeteer.executablePath()
  override = objectAssign(
    {},
    {
      customLaunchers: {
        ChromeHeadlessNoSandbox: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox',
            '--disable-web-security',
            '--enable-gpu'
          ]
        }
      },
      browsers: [process.env.CI_MODE === 'IE' ? 'IE' : 'ChromeHeadlessNoSandbox'],
      reporters: ['mocha', 'coverage-istanbul']
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
        node: { fs: 'empty' },
        mode: 'development'
      },
      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly', 'text-summary']
      },
      webpackMiddleware: {
        stats: 'errors-only'
      },
      mochaReporter: {
        showDiff: true
      },
      singleRun: true
    },
    override
  )

export default (config: any) =>
  config.set(createSettings(`packages/*/test/**/*.ts`))
