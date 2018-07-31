import { deployBaseUrl } from '../testcafe-conf'
import { ABTestingTest } from './test-util'

fixture('optimizely x').page(`${deployBaseUrl}/optimizely-x/`)

test('display experiment text', ABTestingTest('Optimizely X Integration example', 3000))
