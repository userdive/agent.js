import { baseUrl } from '../testcafe-conf'
import { spaTest as test } from './test-util'

const path = '/with-angular/#/'

fixture('with angular').page(`${baseUrl}${path}`)
test(path)
