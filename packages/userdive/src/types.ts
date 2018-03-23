export type HitType = 'pageview' | 'event'

export interface FieldsObject {
  // allowAnchor?: boolean
  readonly allowLinker?: boolean
  readonly cookieName?: string
  readonly cookieDomain?: string
  readonly cookieExpires?: number
  // cookiePath?: string
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
  // eventAction?: string
  // eventCategory?: string
  // eventLabel?: string
  // eventValue?: number
  // hitType?: HitType
  readonly metric1?: string | number
  readonly metric2?: string | number
  readonly metric3?: string | number
  readonly metric4?: string | number
  readonly metric5?: string | number
  readonly metric6?: string | number
  readonly metric7?: string | number
  readonly metric8?: string | number
  readonly metric9?: string | number
  readonly metric10?: string | number
  readonly metric11?: string | number
  readonly metric12?: string | number
  readonly metric13?: string | number
  readonly metric14?: string | number
  readonly metric15?: string | number
  readonly metric16?: string | number
  readonly metric17?: string | number
  readonly metric18?: string | number
  readonly metric19?: string | number
  readonly metric20?: string | number
  readonly name?: string
  // useBeacon?: boolean
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
    cookieDomain?: string,
    name?: string,
    fieldsObject?: FieldsObject
  ): void
}
