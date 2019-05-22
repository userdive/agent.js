import { ABTestingTest } from './test-util'

import { baseUrl } from '../testcafe-conf'

fixture('kaizen platform').page(`${baseUrl}/kaizen-platform/`)
test(
  'display original text',
  ABTestingTest('USERDIVE Integration example', 3000)
)
