import { spaTest as test } from './test-util'

import { baseUrl } from '../testcafe-conf'

const path = '/with-react/#/'

fixture('with react').page(`${baseUrl}${path}`)
test(path)
