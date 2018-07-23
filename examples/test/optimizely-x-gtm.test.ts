import * as assert from 'assert'
import { Selector } from 'testcafe'
import { deployBaseUrl } from '../testcafe-conf'

fixture('optimizely x').page(`${deployBaseUrl}/optimizely-x/`)

test('display experiment text', async (t) => {
  const nav = await Selector('.navbar-brand')
  await t.wait(3000)
  assert.equal(await nav.innerText, 'Optimizely X Integration example')
})
