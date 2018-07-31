import { deployBaseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('vwo').page(`${deployBaseUrl}/vwo/`)
test('display experiment text', ABTestingTest('USERDIVE VWO Integration example', 3000))
