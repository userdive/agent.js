import { spaTest as test } from './test-util'

import { baseUrl } from '../testcafe-conf'

const path = '/with-angular1/#!/'

fixture('with angular1').page(`${baseUrl}${path}`)
test(path)
