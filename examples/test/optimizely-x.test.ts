import { baseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('optimizely x').page(`${baseUrl}/optimizely-x/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
