import { NightwatchAPI } from 'nightwatch'

const kaizenTestingPath = 'https://userdive.github.io/agent.js'
const selector = '.navbar-brand'

const toUrl = (base: string) => `${base}/kaizen-platform/`
export default {
  before: (_: any, done: () => void) => {
    done()
  },
  'original': (browser: NightwatchAPI) =>
    browser
      .url(toUrl(browser.launch_url))
      .waitForElementVisible(selector, 1000)
      .assert.containsText(selector, 'USERDIVE Integration example')
      .end(),
  'kaizen experiment': (browser: NightwatchAPI) =>
      browser
        .url(toUrl(kaizenTestingPath))
        .waitForElementVisible(selector, 1000)
        .pause(1000)
        .assert.containsText(selector, 'USERDIVE Kaizen Platform Integration example')
        .end()
}
