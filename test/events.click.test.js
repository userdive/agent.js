/* @flow */
import { describe, it, beforeEach } from 'mocha'
import { random } from 'faker'
import { spy as sinonSpy } from 'sinon'
import assert from 'assert'

describe('click', () => {
  const mitt = require('mitt')
  const UIEventObserver = require('ui-event-observer').UIEventObserver
  const ClickEvents = require('../src/events/click').default

  let instance

  beforeEach(() => {
    instance = new ClickEvents(
      random.word(),
      mitt(),
      new UIEventObserver()
    )
  })

  it('validate', () => {
    assert(instance.validate())
  })

  it('on', () => {
    const spy = sinonSpy(instance, 'emit')
    instance.on()

    const e = document.createEvent('MouseEvents')
    e.initEvent('click', false, true)
    const body: any = document.body
    body.dispatchEvent(e)

    assert(spy.called)
    spy.restore()
  })
})
