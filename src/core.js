import mitt from 'mitt'

import Logger from './logger'
import Store from './store'
import { get } from './requests'
import { VERSION as v } from './constants'
import type {
  ClientEnvironmentsData,
  Interact,
  Options,
  SendType,
  State
} from './types'

type Size = {
  h: number,
  w: number
}

const SIZE: Size = {
  h: 0,
  w: 0
}

const EMIT_NAME = 'POINT'

let emitter
const interacts: Interact[] = []
const events: any[] = []

function setInteract (data: Interact): void {
  interacts.push(data)
}

export default class Agent extends Store {
  logger: Logger
  loaded: boolean
  constructor (id: string, eventsClass: [], options: Options): void {
    super(id, options.baseUrl, options.cookieName)
    emitter = mitt()
    this.logger = new Logger(options.Raven)
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, this.logger, [2000]))
    })
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        const state: State = this.merge({
          type: 'env',
          data: ((windowSize, resourceSize, screenSize): ClientEnvironmentsData => {
            return {
              v,
              sh: screenSize.h,
              sw: screenSize.w,
              wh: windowSize.h,
              ww: windowSize.w,
              h: resourceSize.h,
              w: resourceSize.w
            }
          })(this.getWindowSize(window), this.getResourceSize(document), this.getScreenSize(screen))
        })
        get(`${this.baseUrl}/env.gif`, state.env, state.custom)
        this.listen()
        this.loaded = true
    }
  }
  destroy (): void {
    emitter.off('*', setInteract)
    events.forEach(e => {
      e.unbind()
    })
  }
  listen (): void {
    if (!this.loaded) {
      return
    }
    emitter.on(EMIT_NAME, setInteract)
    events.forEach(e => {
      e.bind()
    })
  }
  getWindowSize (w: {innerHeight: number, innerWidth: number}): Size {
    return {
      h: w.innerHeight,
      w: w.innerWidth
    }
  }
  getResourceSize ({ body }: Document): Size {
    if (!body) {
      return SIZE
    }
    return {
      h: body.clientHeight,
      w: body.clientWidth
    }
  }
  getScreenSize (s: {height: number, width: number}): Size {
    return {
      h: s.height,
      w: s.width
    }
  }
}
