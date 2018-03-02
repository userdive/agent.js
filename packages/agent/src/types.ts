import * as Raven from 'raven-js'
export type Settings = {
  readonly auto: boolean
  readonly baseUrl: string
  readonly cookieDomain: string
  readonly cookieExpires: number
  readonly cookieName: string
  readonly RAVEN_DSN: string
  readonly allowLink: boolean
  readonly Raven?: Raven.RavenStatic
}

export type Point = {
  readonly x: number
  readonly y: number
}

export type Size = {
  readonly h: number
  readonly w: number
}

export type SendType = 'pageview'
export type Dimension =
  | 'dimension1'
  | 'dimension2'
  | 'dimension3'
  | 'dimension4'
  | 'dimension5'
  | 'dimension6'
  | 'dimension7'
  | 'dimension8'
  | 'dimension9'
  | 'dimension10'
  | 'dimension11'
  | 'dimension12'
  | 'dimension13'
  | 'dimension14'
  | 'dimension15'
  | 'dimension16'
  | 'dimension17'
  | 'dimension18'
  | 'dimension19'
  | 'dimension20'
export type Metric =
  | 'metric1'
  | 'metric2'
  | 'metric3'
  | 'metric4'
  | 'metric5'
  | 'metric6'
  | 'metric7'
  | 'metric8'
  | 'metric9'
  | 'metric10'
  | 'metric11'
  | 'metric12'
  | 'metric13'
  | 'metric14'
  | 'metric15'
  | 'metric16'
  | 'metric17'
  | 'metric18'
  | 'metric19'
  | 'metric20'
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
  userId: string
  env: ClientEnvironmentsData
  custom: CustomData
}

export type InteractType = 'l' | 'a'

export type Interact = {
  readonly id: number
  readonly left: number
  readonly top: number
  readonly type: InteractType
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
export type CustomError = string | Error

export type TaskQueue = {
  name: string
  method: string
  args: any[]
}
