import { baseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('vwo').page(`${baseUrl}/vwo/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
