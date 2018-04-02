import * as assert from 'assert'
import { lorem, random } from 'faker'
import 'mocha'
import userdive from 'userdive'

import provide from '../src'

describe('@userdive/provider', () => {
  it('plugin setting', () => {
    const name = lorem.word()
    class Plugin {
      tracker: any
      constructor (tracker: any) {
        assert(tracker.plugins[name])
      }
    }

    userdive()('create', random.uuid(), 'auto')
    provide(name, Plugin)
  })
})
