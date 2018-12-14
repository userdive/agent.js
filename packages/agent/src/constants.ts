import { SettingFieldsObject } from './types'
const intervals: number[] = []
function push (t: number, n: number) {
  for (let i = 0; i < n; i++) {
    intervals.push(t)
  }
}
push(2, 300)

export const MAX_INTERACTION_SEQUENCE = 300
export const INTERACTION_EMIT_INTERVAL = 2 * 1000 // 2 secs
export const INTERACTION_TYPE_ACTION = 'a'
export const INTERACTION_TYPE_LOOK = 'l'
export const CUSTOM_INDEX = 20
export const INTERACT = 5
export const INTERVAL = intervals.sort()
export const LISTENER = ['addEventListener', 'removeEventListener']
export const NAMESPACE = `data-ud-namespace`
export const SCROLL = ['pageXOffset', 'pageYOffset']
export const CLICK_EVENTS = ['onclick']
export const MOUSE_EVENTS = ['onmousedown', 'onmousemove', 'onmouseup']
export const POINTER_EVENTS = ['onpointerdown', 'onpointermove', 'onpointerup']
export const TOUCH = ['ontouchstart', 'ontouchmove', 'ontouchend']
export const TOUCH_EVENTS = TOUCH
export const SCROLL_PROPERTIES = ['onscroll', 'pageXOffset', 'pageYOffset', 'innerWidth', 'innerHeight']
export const VERSION = 2
export const SETTINGS: SettingFieldsObject = {
  allowLinker: false,
  linkerName: '__ud',
  baseUrl: 'https://v1.userdive.com',
  cookiePath: '/',
  cookieDomain: '',
  cookieExpires: 730, // TODO
  cookieName: '_ud2',
  Raven: undefined
}
export const MAX_EVENT_SEQ = 10
