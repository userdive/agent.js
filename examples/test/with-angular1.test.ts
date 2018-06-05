import { baseUrl } from '../testcafe-conf'
import { spaTest as test } from './test-util'

const path = '/with-angular1/#!/'

fixture('with angular1').page(`${baseUrl}${path}`)
test(path)
