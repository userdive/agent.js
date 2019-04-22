
import * as assert from 'assert'
import { RequestLogger } from 'testcafe'
import { deployBaseUrl, intRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const intLogger = RequestLogger(intRegex)

const l = `${deployBaseUrl}/google-optimize/`

fixture`Getting Started`

fixture('google-optimize event').page(l)

test.requestHooks(intLogger)('tracking request', async (t) => {
  await t.wait(5000)
  assert.ok(intLogger.requests.length > 0)
  const intRecord = intLogger.requests[0]
  assert.strictEqual(intRecord.request.method, 'get')
  const event = query(intRecord)['e'].split(',')
  assert.strictEqual(event[0], '1')
  assert.strictEqual(event[1], 'optimize')
  assert.ok(event[2])
  assert.ok(event[3])
})
