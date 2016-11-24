/* @flow */
import type { Dimension, Metric } from './types'

type CustomQuery = {
  dimension?: Dimension,
  metric?: Metric
}

function get (url: string, query: Object, customQuery?: CustomQuery): void {
  const queryArray = []
  const img = document.createElement('img')
  img.onload = () => null
  img.onerror = () => null
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  img.src = `${url}?${queryArray.join('&')}`
}

module.exports = {
  get
}
