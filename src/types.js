/* @flow */
export type Metric = {
  cm1?: number,
  cm2?: number,
  cm3?: number,
  cm4?: number,
  cm5?: number
}

export type Dimension = {
  cd1?: string,
  cd2?: string,
  cd3?: string,
  cd4?: string,
  cd5?: string
}

export type Options = {
  cookieDomain?: string,
  cookieExpires?: string,
  cookieName?: string
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
