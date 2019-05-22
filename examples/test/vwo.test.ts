import { ABTestingTest } from './test-util'

import { baseUrl } from '../testcafe-conf'

fixture('vwo').page(`${baseUrl}/vwo/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
