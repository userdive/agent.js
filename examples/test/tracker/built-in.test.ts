import * as assert from 'assert'

import { RequestLogger } from 'testcafe'

import { baseUrl, envRegex } from '../../testcafe-conf'
import { query } from '../test-util'

const envLogger = RequestLogger(envRegex)
const l = `${baseUrl}/built-in/`

fixture('built-in tracker').page(l)

test.requestHooks(envLogger)('environment request', async t => {
  await t.wait(2000)
  assert.strictEqual(envLogger.requests.length, 1)
  const envRecord = envLogger.requests[0]
  assert.strictEqual(envRecord.request.method, 'get')
  const q = query(envRecord) as { l: string }
  assert.strictEqual(q.l, l)
})
