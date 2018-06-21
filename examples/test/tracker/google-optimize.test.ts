
import * as assert from 'assert'
import { RequestLogger } from 'testcafe'
import { deployBaseUrl, intRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const intLogger = RequestLogger(intRegex)

const l = `${deployBaseUrl}/google-optimize/`

fixture('vwo event').page(l)

test.requestHooks(intLogger)('tracking request', async (t) => {
  await t.wait(5000)
  assert.ok(intLogger.requests.length > 0)
  const intRecord = intLogger.requests[0]
  assert.equal(intRecord.request.method, 'get')
  const event = query(intRecord)['e'].split(',')
  assert.equal(event[0], '1')
  assert.equal(event[1], 'optimize')
  assert.ok(event[2])
  assert.ok(event[3])
})
