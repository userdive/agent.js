import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'
import { UIEventObserver } from 'ui-event-observer'

import { EventEmitter } from 'events'
import TouchEvents from '../src/events/touch'
import { isTouchDevice } from './helpers/browser'

const describeExcludeTouch = () => (!isTouchDevice() ? describe.skip : describe)

describeExcludeTouch()('touch', () => {
  let instance: any

  beforeEach(() => {
    instance = new TouchEvents(
      random.word(),
      new EventEmitter(),
      new UIEventObserver()
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })
})
