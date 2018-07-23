import * as assert from 'assert'
import { Selector } from 'testcafe'
import { baseUrl } from '../testcafe-conf'

fixture('google optimize').page(`${baseUrl}/google-optimize/`)

test('display original text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t.wait(1000)
  assert.equal(await nav.innerText, 'USERDIVE Integration example')
})
