export type HitType = 'pageview' | 'event'

export interface FieldsObject {
  // allowAnchor?: boolean
  allowLinker?: boolean
  cookieName?: string
  cookieDomain?: string
  cookieExpires?: number
  // cookiePath?: string
  dimension1?: string
  dimension2?: string
  dimension3?: string
  dimension4?: string
  dimension5?: string
  dimension6?: string
  dimension7?: string
  dimension8?: string
  dimension9?: string
  dimension10?: string
  dimension11?: string
  dimension12?: string
  dimension13?: string
  dimension14?: string
  dimension15?: string
  dimension16?: string
  dimension17?: string
  dimension18?: string
  dimension19?: string
  dimension20?: string
  // eventAction?: string
  // eventCategory?: string
  // eventLabel?: string
  // eventValue?: number
  // hitType?: HitType
  metric1?: string | number
  metric2?: string | number
  metric3?: string | number
  metric4?: string | number
  metric5?: string | number
  metric6?: string | number
  metric7?: string | number
  metric8?: string | number
  metric9?: string | number
  metric10?: string | number
  metric11?: string | number
  metric12?: string | number
  metric13?: string | number
  metric14?: string | number
  metric15?: string | number
  metric16?: string | number
  metric17?: string | number
  metric18?: string | number
  metric19?: string | number
  metric20?: string | number
  name?: string
  // useBeacon?: boolean
}

export interface USERDIVEApi {
  q: any[]

  (
    command: 'send',
    hitType: 'event',
    fieldsObject: {
      eventCategory: string
      eventAction: string
      eventLabel?: string
      eventValue?: number
    }
  ): void
  (
    command: 'send',
    fieldsObject:
    | {
      hitType: 'event'
      eventCategory: string
      eventAction: string
      eventLabel?: string
      eventValue?: number
    }
    | FieldsObject
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
