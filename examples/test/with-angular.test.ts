import { spaTest as test } from './test-util'

import { baseUrl } from '../testcafe-conf'

const path = '/with-angular/#/'

fixture('with angular').page(`${baseUrl}${path}`)
test(path)
