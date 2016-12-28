/* @flow */
import type { CustomData } from './types'

export function get (url: string, data: Object, customData: CustomData): void {
  const query = Object.assign(customData, data)
  const queryArray = []
  const img = document.createElement('img')
  img.onload = () => null
  img.onerror = () => null
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  img.src = `${url}?${queryArray.join('&')}`
}
