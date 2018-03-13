import { NightwatchAPI } from 'nightwatch'

const email: string = 'userdive@example.com'
const formQuery: string = '.form-group:first-of-type .form-controll'

export default {
  before: (_: any, done: Function) => {
    done()
  },
  'set input form elements': (browser: NightwatchAPI) =>
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .setValue(formQuery, email)
      .assert.value(formQuery, email)
      .end(),
  'select a value': (browser: NightwatchAPI) =>
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .click('select[class="form-control"] option:nth-child(2)')
      .assert.value('select[class="form-control"]', 'example2')
      .end()
}
