import * as objectAssign from 'object-assign'
import * as puppeteer from 'puppeteer'
import { customLaunchers } from './browser-providers.conf'

let override = {}

if (process.env.CI_MODE === 'testingbot') {
  override = objectAssign(
    {},
    {
      testingbot: {
        recordScreenshots: false
      },
      customLaunchers,
      browserDisconnectTimeout: 300000,
      browserDisconnectTolerance: 3,
      browserNoActivityTimeout: 300000,
      browsers: Object.keys(customLaunchers),
      reporters: ['mocha', 'coverage-istanbul', 'testingbot'],
      options: {
        'selenium-version': '3.1.0',
        'idletimeout': 600
      }
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
      browsers: ['ChromeHeadlessNoSandbox'],
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
        node: { fs: 'empty' }
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
