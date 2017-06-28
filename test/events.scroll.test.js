/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import assert from 'assert'

import EventEmitter from 'events'
import { UIEventObserver } from 'ui-event-observer'

describe('scroll', () => {
  const ScrollEvents = require('../src/events/scroll').default

  let instance, emitter

  beforeEach(() => {
    emitter = new EventEmitter()
    instance = new ScrollEvents(random.word(), emitter, new UIEventObserver())
  })

  it('validate', () => {
    assert(instance.validate() === false)
  })
})
