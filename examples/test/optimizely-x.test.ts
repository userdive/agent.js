import { ABTestingTest } from './test-util'

import { baseUrl } from '../testcafe-conf'

fixture('optimizely x').page(`${baseUrl}/optimizely-x/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
