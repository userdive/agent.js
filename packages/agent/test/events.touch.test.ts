import * as assert from 'assert'
import { EventEmitter } from 'events'

import { random } from 'faker'
import 'mocha'
import { UIEventObserver } from 'ui-event-observer'

import { isTouchDevice } from './helpers/browser'

import TouchEvents from '../src/events/touch'

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
