export type HitType = 'pageview' | 'event'

export interface FieldsObject {
  // readonly allowAnchor?: boolean
  readonly allowLinker?: boolean
  readonly cookieDomain?: string
  readonly cookieExpires?: number
  readonly cookieName?: string
  readonly cookiePath?: string
  readonly dimension1?: string
  readonly dimension2?: string
  readonly dimension3?: string
  readonly dimension4?: string
  readonly dimension5?: string
  readonly dimension6?: string
  readonly dimension7?: string
  readonly dimension8?: string
  readonly dimension9?: string
  readonly dimension10?: string
  readonly dimension11?: string
  readonly dimension12?: string
  readonly dimension13?: string
  readonly dimension14?: string
  readonly dimension15?: string
  readonly dimension16?: string
  readonly dimension17?: string
  readonly dimension18?: string
  readonly dimension19?: string
  readonly dimension20?: string
  readonly eventAction?: string
  readonly eventCategory?: string
  readonly eventLabel?: string
  readonly eventValue?: number
  readonly hitType?: HitType
  // readonly metric1?: number
  // readonly metric2?: number
  // readonly metric3?: number
  // readonly metric4?: number
  // readonly metric5?: number
  // readonly metric6?: number
  // readonly metric7?: number
  // readonly metric8?: number
  // readonly metric9?: number
  // readonly metric10?: number
  // readonly metric11?: number
  // readonly metric12?: number
  // readonly metric13?: number
  // readonly metric14?: number
  // readonly metric15?: number
  // readonly metric16?: number
  // readonly metric17?: number
  // readonly metric18?: number
  // readonly metric19?: number
  // readonly metric20?: number
  readonly name?: string
  readonly page?: string
  // readonly useBeacon?: boolean
}

export interface EventFieldsObject {
  readonly eventCategory: string
  readonly eventAction: string
  readonly eventLabel?: string
  readonly eventValue?: number
}

export interface EventFieldsObjectWithHitType extends EventFieldsObject {
  readonly hitType: 'event'
}

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

export interface USERDIVEApi {
  q: any[]
  (command: 'send', hitType: 'event', fieldsObject: EventFieldsObject): void
  (
    command: 'send',
    fieldsObject: EventFieldsObjectWithHitType | FieldsObject
  ): void
  (command: 'send', hitType: 'pageview', page?: string): void
  (command: 'require', pluginName: string, pluginOptions?: any): void
  (
    command: 'provide',
    pluginName: string,
    pluginConstructor: new (tracker: any, pluginOptions?: Object) => void // TODO
  ): void

  (
    command: 'create',
    trackingId: string,
    cookieDomain: string,
    fieldsObject?: FieldsObject
  ): void
  (
    command: 'create',
    trackingId: string,
    cookieDomain: string,
    name: string,
    fieldsObject?: FieldsObject
  ): void
  (command: 'set', fieldsObject: FieldsObject): void
  (command: 'set', key: Dimension, value: string): void
  // (command: "set", key: Metric, value: number): void
}
