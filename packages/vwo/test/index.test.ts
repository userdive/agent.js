import { random } from 'faker'
import 'mocha'
import userdive from 'userdive'

describe('@userdive/vwo-plugin', () => {
  it('call', () => {
    userdive()('create', random.uuid(), 'auto')
    require('../src')
    userdive()('require', 'vwo')
    userdive()('vwo:getVariation', [window, 200, 10])
  })
})
