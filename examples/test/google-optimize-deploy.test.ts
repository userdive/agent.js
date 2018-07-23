import * as assert from 'assert'
import { Selector } from 'testcafe'
import { deployBaseUrl } from '../testcafe-conf'

fixture('google optimize').page(`${deployBaseUrl}/google-optimize/`)

test('display experiment text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t.wait(3000)
  assert.equal(await nav.innerText, 'Google Optimize Integration')
})
