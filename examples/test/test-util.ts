import * as assert from 'assert'

import * as qs from 'query-string'
import { ClientFunction, Selector } from 'testcafe'

import { baseUrl } from '../testcafe-conf'

export const getLocation = ClientFunction(() => {
  return document.location.href
})

export const spaSelector = '#app a'
export const displayTop = () => {
  test('should display Top', async t => {
    const link = Selector(spaSelector)
    await t.expect(await link.innerText).eql('Sample2')
  })
}

export const changeToSample2 = (path: string) => {
  test('should change to Sample2', async t => {
    const link = Selector(spaSelector)
    await t.click(link)
    assert.strictEqual(await link.innerText, 'Sample1')
    assert.strictEqual(await getLocation(), `${baseUrl}${path}sample2`)
  })
}

export const spaTest = (path: string) => {
  displayTop()
  changeToSample2(path)
}

export const query = (request: RequestData) => {
  const query = request.url.split('?')[1]
  return query ? qs.parse(query) : null
}

export const ABTestingTest = (expectText: string, wait: number = 500) => {
  return async (t: TestController) => {
    const nav = Selector('.navbar-brand')
    await t.wait(wait)
    assert.strictEqual(await nav.innerText, expectText)
  }
}
