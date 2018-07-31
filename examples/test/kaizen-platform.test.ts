import { baseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('kaizen platform').page(`${baseUrl}/kaizen-platform/`)
test('display original text', ABTestingTest('USERDIVE Integration example', 3000))
