/* @flow */
import { createElement } from './alias'

function get (url: string, query: Object): void {
  const a = createElement('a')
  a.href = url
  const queryArray = []
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  a.search = `?${queryArray.join('&')}`
  alert(a.href)
}

module.exports = {
  get
}
