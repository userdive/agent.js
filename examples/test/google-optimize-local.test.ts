import { ABTestingTest } from './test-util'

import { baseUrl } from '../testcafe-conf'

fixture('google optimize').page(`${baseUrl}/google-optimize/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
