import * as assert from 'assert'
import { Selector } from 'testcafe'
import { deployBaseUrl } from '../testcafe-conf'

fixture('deploy host').page(`${deployBaseUrl}/google-optimize/`)

test('display original text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t.wait(3000)
  assert.equal(await nav.innerText, 'Google Optimize Integration')
})
