import { deployBaseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('google optimize').page(`${deployBaseUrl}/google-optimize/`)
test('display experiment text', ABTestingTest('Google Optimize Integration', 3000))
