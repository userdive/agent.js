import { NightwatchAPI, NightwatchTests } from 'nightwatch'

const linkQuery: string = '#app a'

export default function (suffix: string): NightwatchTests {
  const toUrl = (base: string) => `${base}${suffix}`
  return {
    before: (_: any, done: () => void) => {
      done()
    },
    'should change to Sample2': (browser: NightwatchAPI) =>
      browser
        .url(toUrl(browser.launch_url))
        .click(linkQuery)
        .pause(500)
        .assert.containsText(linkQuery, 'Sample1')
        .assert.urlEquals(`${toUrl(browser.launch_url)}sample2`)
        .end(),
    'should display Top': (browser: NightwatchAPI) =>
      browser
        .url(toUrl(browser.launch_url))
        .waitForElementVisible(linkQuery, 5000)
        .assert.containsText(linkQuery, 'Sample2')
        .end()
  }
}
