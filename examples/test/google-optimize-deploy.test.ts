import { ABTestingTest } from './test-util'

import { deployBaseUrl } from '../testcafe-conf'

fixture('google optimize').page(`${deployBaseUrl}/google-optimize/`)
test(
  'display experiment text',
  ABTestingTest('Google Optimize Integration', 3000)
)
