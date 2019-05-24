import * as assert from 'assert'

import { RequestLogger, Selector } from 'testcafe'

import { baseUrl, envRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const envLogger = RequestLogger(envRegex)
const search = '?q=e2e'
const l = `${baseUrl}/simple/page.html${search}`
const override = `${baseUrl}/orverride${search}`

fixture('env specified page option').page(l)

test.requestHooks(envLogger)('override location with click', async t => {
  await t.wait(2000)
  assert.strictEqual(envLogger.requests.length, 1)
  const originalRecord = envLogger.requests[0]
  const originalQuery = query(originalRecord) as { l: string }
  assert.strictEqual(originalQuery.l, l)

  await t.click(Selector('#page')).wait(2000)
  assert.strictEqual(envLogger.requests.length, 2)
  const overrideRecord = envLogger.requests[1]
  const overrideQuery = query(overrideRecord) as { l: string }
  assert.strictEqual(overrideQuery.l, override)
})
