import { baseUrl } from '../testcafe-conf'
import { spaTest as test } from './test-util'

const path = '/with-react/#/'

fixture('with react').page(`${baseUrl}${path}`)
test(path)
