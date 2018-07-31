import { deployBaseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('kaizen platform').page(`${deployBaseUrl}/kaizen-platform/`)

test('display experiment text', ABTestingTest('USERDIVE Kaizen Platform Integration example', 3000))
