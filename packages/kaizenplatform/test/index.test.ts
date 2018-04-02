import { random } from 'faker'
import 'mocha'
import userdive from 'userdive'

describe('@userdive/kaizenplatform-event-plugin', () => {
  it('call', () => {
    userdive()('create', random.uuid(), 'auto')
    require('../src')
    userdive()('require', 'kzs')
    userdive()('kzs:getVariation')
  })
})
