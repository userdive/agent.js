import { NightwatchAPI } from 'nightwatch'

const linkPramKey: string = '?__ud='
const testPath = '/plugin-linker/'
const linkSelector: string = '.navbar-nav li:nth-child(2) a'

export default {
  before: (_: any, done: () => void) => {
    done()
  },
  'click link': (browser: NightwatchAPI) =>
    browser
      .url(`${browser.launch_url}${testPath}`)
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .click(linkSelector)
      .assert.urlContains(linkPramKey)
      .end()
}
