import { ABTestingTest } from './test-util'

import { deployBaseUrl } from '../testcafe-conf'

fixture('vwo').page(`${deployBaseUrl}/vwo/`)
test(
  'display experiment text',
  ABTestingTest('USERDIVE VWO Integration example', 3000)
)
