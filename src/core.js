import mitt from 'mitt'
import cookies from 'js-cookie'
import { v4 as uuid } from 'uuid'

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

let emitter: mitt
let BASE_URL: string
let LOAD_TIME: number
let EVENT_ID: number = 0
const interacts: Interact[] = []
const events: any[] = []

function findOrCreateClientId (name: string): string {
  const c = cookies.get(name)
  if (c) {
    return c
  }
  return uuid().replace(/-/g, '')
}

function createInteractData (data: Interact): string {
  return `${data.type},${data.time},{data.x},{data.y},${data.left},${data.top}`
}

function saveInteract (data: Interact): void {
  interacts.push(data)

  // TODO skip

  const query: string[] = []
  interacts.forEach(data => {
    query.push(`d=${createInteractData(data)}`)
  })

  get(`${BASE_URL}/${LOAD_TIME}/interact/${EVENT_ID}.gif`, query)
  interacts.length = 0
  EVENT_ID++
}

export default class Agent extends Store {
  logger: Logger
  loaded: boolean
  constructor (id: string, eventsClass: [], opt: Options): void {
    super()
    BASE_URL = `${opt.baseUrl}/${id}/${findOrCreateClientId(opt.cookieName)}/`
    emitter = mitt()
    this.logger = new Logger(opt.Raven)
    eventsClass.forEach(Class => {
      events.push(new Class(EMIT_NAME, emitter, this.logger, [2000]))
    })
  }
  send (type: SendType): void {
    switch (type) {
      case 'pageview':
        const state: State = this.merge({
          type: 'env',
          data: ((windowSize: Size, resourceSize: Size, screenSize: Size): ClientEnvironmentsData => {
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
        const query: string[] = []
        const data = Object.assign({}, state.env, state.custom)
        Object.keys(data).forEach(key => {
          query.push(`${key}=${encodeURIComponent(data[key])}`)
        })

        LOAD_TIME = Date.now()
        get(`${BASE_URL}/${LOAD_TIME}/env.gif`, query)
        this.listen()
        this.loaded = true
    }
  }
  destroy (): void {
    emitter.off('*', saveInteract)
    events.forEach(e => {
      e.unbind()
    })
  }
  listen (): void {
    if (!this.loaded) {
      return
    }
    emitter.on(EMIT_NAME, saveInteract)
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
