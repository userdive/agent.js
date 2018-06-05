import * as assert from 'assert'
import { Selector } from 'testcafe'
import { deployBaseUrl } from '../testcafe-conf'

fixture('deploy host').page(`${deployBaseUrl}/kaizen-platform/`)

test('display experiment text', async (t) => {
  const nav = await Selector('.navbar-brand')
  await t.wait(3000)
  assert.equal(await nav.innerText, 'USERDIVE Kaizen Platform Integration example')
})
