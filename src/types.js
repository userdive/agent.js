/* @flow */
import Raven from 'raven-js'
export type Options = {
  baseUrl: string,
  cookieDomain: string,
  cookieExpires: number,
  cookieName: string,
  RAVEN_DSN: string,
  Raven: ?Raven
}

export type Point = {
  x: number,
  y: number
}

export type Size = {
  h: number,
  w: number
}

export type SendType = 'pageview'
export type Dimension = 'dimension1' | 'dimension2' | 'dimension3' | 'dimension4' | 'dimension5'
export type Metric = 'metric1' | 'metric2' | 'metric3' | 'metric4' | 'metric5'
export type SetType = 'page' | Dimension | Metric

export type CustomData = {
  cd1?: string,
  cd2?: string,
  cd3?: string,
  cd4?: string,
  cd5?: string,
  cm1?: number,
  cm2?: number,
  cm3?: number,
  cm4?: number,
  cm5?: number
}

export type Custom = {
  type: 'custom',
  data: CustomData
}

export type ClientEnvironmentsData = {
  v: number,
  uid?: number,
  l?: string,
  n?: string,
  r?: string,
  sw: number,
  sh: number,
  ww: number,
  wh: number,
  h: number,
  w: number
}

export type ClientEnvironments = {
  type: 'env',
  data: ClientEnvironmentsData
}

export type State = {
  env: ClientEnvironmentsData,
  custom: CustomData
}

export type InteractType = 'l' | 'a'

export type Interact = {
  x: number,
  y: number,
  time: number,
  type: InteractType,
  left: number,
  top: number
}

export type EventType = 'mousemove' | 'click' | 'scroll' | 'touchend'
export type CustomError = string | Error
