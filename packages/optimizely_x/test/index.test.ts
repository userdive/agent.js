import { random } from 'faker'
import 'mocha'
import userdive from 'userdive'

describe('@userdive/optimizely_x-plugin', () => {
  it('call', () => {
    userdive()('create', random.uuid(), 'auto')
    require('../src')
    userdive()('require', 'optimizely')
    userdive()('optimizely:getVariation', [window, 200, 10])
  })
})
