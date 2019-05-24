import { spaTest as test } from './test-util'

import { baseUrl } from '../testcafe-conf'

const path = '/with-vue/#/'

fixture('with vue').page(`${baseUrl}${path}`)
test(path)
