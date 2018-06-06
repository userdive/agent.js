import * as assert from 'assert'
import { Selector } from 'testcafe'
import { baseUrl } from '../testcafe-conf'

fixture('local host').page(`${baseUrl}/kaizen-platform/`)

test('display original text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t.wait(500)
  assert.equal(await nav.innerText, 'USERDIVE Integration example')
})
