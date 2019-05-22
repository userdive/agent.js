import { ABTestingTest } from './test-util'

import { deployBaseUrl } from '../testcafe-conf'

fixture('kaizen platform').page(`${deployBaseUrl}/kaizen-platform/`)

test(
  'display experiment text',
  ABTestingTest('USERDIVE Kaizen Platform Integration example', 3000)
)
