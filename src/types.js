/* @flow */
export type ClientEnvironments = {
  t: number,
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
  w: number,
  cd?: number,
  cm?: number;
}

export type Setting = {
  baseUrl: string,
  clientId?: string,
  id: string;
}
