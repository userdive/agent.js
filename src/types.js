/* @flow */
export type Options = {
  baseUrl: string,
  cookieDomain: string,
  cookieExpires: number,
  cookieName: string
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

export type ClientEnvironments = {
  v: number,
  uid?: number,
  l?: number,
  n?: string,
  r?: string,
  sw: number,
  sh: number,
  ww: number,
  wh: number,
  h: number,
  w: number
}

export type State = {
  env: ClientEnvironments,
  custom: CustomData
}
