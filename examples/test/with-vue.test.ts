import { baseUrl } from '../testcafe-conf'
import { spaTest as test } from './test-util'

const path = '/with-vue/#/'

fixture('with vue').page(`${baseUrl}${path}`)
test(path)
