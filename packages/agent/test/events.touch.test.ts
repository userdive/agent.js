import * as assert from 'assert'
import { random } from 'faker'
import 'mocha'

import { EventEmitter } from 'events'
import { isTouchDevice } from './helpers/browser'

function describeExcludeTouch (): Function {
  return !isTouchDevice() ? describe.skip : describe
}

describeExcludeTouch()('touch', () => {
  const { UIEventObserver } = require('ui-event-observer')
  const TouchEvents = require('../src/events/touch').default

  let instance

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
