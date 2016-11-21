/* @flow */
import { createElement } from './alias'

function get (url: string, query: Object): void {
  const img = createElement('img')
  const queryArray = []
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  img.src = `${url}?${queryArray.join('&')}`
}

module.exports = {
  get
}
