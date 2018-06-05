
import * as assert from 'assert'
import { RequestLogger } from 'testcafe'
import { baseUrl, envRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const trackingLogger = RequestLogger(envRegex, {
  logResponseHeaders: true,
  logResponseBody:    true
})

const l = `${baseUrl}/simple/`

fixture('basic tracker').page(l)

test.requestHooks(trackingLogger)('tracking request', async (t) => {
  await t.wait(2000)
  assert.equal(trackingLogger.requests.length, 1)
  const envRecord = trackingLogger.requests[0]
  assert.equal(envRecord.request.method, 'get')
  const q = query(envRecord)
  assert(q.l, l)
})
