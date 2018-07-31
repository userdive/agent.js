import { baseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('google optimize').page(`${baseUrl}/google-optimize/`)
test('display original text', ABTestingTest('USERDIVE Integration example'))
