import * as assert from 'assert'
import { Selector } from 'testcafe'
import { baseUrl } from '../testcafe-conf'
import { getLocation } from './test-util'

const path = '/with-angular/#/'
export const link = Selector('#app a')

fixture('with angular').page(`${baseUrl}${path}`)

test('should change to Sample2', async (t) => {
  await t
  .click(link)
  assert.equal(await link.innerText, 'Sample1')
  assert.equal(await getLocation(), `${baseUrl}${path}sample2`)
})

test('should display Top', async (t) => {
  await t
  .expect(await link.innerText).eql('Sample2')
})
