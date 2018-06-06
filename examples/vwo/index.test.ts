import { NightwatchAPI } from 'nightwatch'

const selector = '.navbar-brand'

export default {
  before: (_: any, done: () => void) => {
    done()
  },
  'original': (browser: NightwatchAPI) =>
    browser
      .url(browser.launch_url)
      .waitForElementVisible(selector, 1000)
      .end()
}
