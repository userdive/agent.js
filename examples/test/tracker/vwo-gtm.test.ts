
import * as assert from 'assert'
import { RequestLogger } from 'testcafe'
import { deployBaseUrl, intRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const intLogger = RequestLogger(intRegex)

const l = `${deployBaseUrl}/vwo/`

fixture('vwo event').page(l)

test.requestHooks(intLogger)('multiple test events', async (t) => {
  await t.wait(5000)
  assert.ok(intLogger.requests.length === 2)
  for (let i = 0; i < intLogger.requests.length; i++) {
    const intRecord = intLogger.requests[i]
    assert.strictEqual(intRecord.request.method, 'get')
    const event = query(intRecord)['e'].split(',')
    assert.strictEqual(event[0], `${i + 1}`)
    assert.strictEqual(event[1], 'vwo')
    assert.ok(event[2])
    assert.ok(event[3])
  }
})
