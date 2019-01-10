import { RavenStatic } from 'raven-js'
import { Dimension, FieldsObject, Metric } from 'userdive/lib/types'

export interface SettingFieldsObject extends FieldsObject {
  readonly baseUrl: string
  readonly cookieDomain: string
  readonly cookieExpires: number
  readonly cookieName: string
  readonly linkerName: string
  readonly clientId?: string
  Raven?: RavenStatic
}

export type InteractionType = 'l' | 'a'

export type InteractionPoint = {
  readonly type: InteractionType
  readonly x: number
  readonly y: number
}

export type Size = {
  readonly h: number
  readonly w: number
}

export type SetType = 'page' | Dimension | Metric

export type CustomData = {
  cd1?: string
  cd2?: string
  cd3?: string
  cd4?: string
  cd5?: string
  cd6?: string
  cd7?: string
  cd8?: string
  cd9?: string
  cd10?: string
  cd11?: string
  cd12?: string
  cd13?: string
  cd14?: string
  cd15?: string
  cd16?: string
  cd17?: string
  cd18?: string
  cd19?: string
  cd20?: string
  cm1?: number
  cm2?: number
  cm3?: number
  cm4?: number
  cm5?: number
  cm6?: number
  cm7?: number
  cm8?: number
  cm9?: number
  cm10?: number
  cm11?: number
  cm12?: number
  cm13?: number
  cm14?: number
  cm15?: number
  cm16?: number
  cm17?: number
  cm18?: number
  cm19?: number
  cm20?: number
}

export type Custom = {
  type: 'custom'
  data: CustomData
}

export type StateKey = 'env' | 'custom' | 'clientId'

export type ClientEnvironmentsData = {
  readonly v: number
  readonly uid?: number
  l: string
  readonly n: string
  readonly r: string
  readonly sw: number
  readonly sh: number
  readonly ww: number
  readonly wh: number
  readonly h: number
  readonly w: number
}

export type ClientEnvironments = {
  type: 'env'
  data: ClientEnvironmentsData
}

export type State = {
  clientId: string
  env: ClientEnvironmentsData
  custom: CustomData
}

export type Interaction = {
  id: number
  readonly left: number
  readonly top: number
  readonly type: InteractionType
  readonly x: number
  readonly y: number
}

export type EventType =
  | 'mousemove'
  | 'click'
  | 'scroll'
  | 'touchend'
  | 'touchstart'
  | 'touchmove'

export type TaskQueue = {
  name: string
  method: string
  args: any[]
}
