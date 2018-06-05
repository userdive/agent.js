import * as assert from 'assert'
import { Selector } from 'testcafe'
import { baseUrl, deployBaseUrl } from '../testcafe-conf'

fixture('local host').page(`${baseUrl}/kaizen-platform/`)

test('display original text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t
    .expect(await nav.innerText).eql('USERDIVE Integration example')
})

fixture('deploy host').page(`${deployBaseUrl}/kaizen-platform/`)

test('display experiment text', async (t) => {
  const nav = Selector('.navbar-brand')
  await t.wait(500)
  assert.equal(await nav.innerText, 'USERDIVE Kaizen Platform Integration example')
})
