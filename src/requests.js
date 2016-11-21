/* @flow */
import { createElement } from './alias'

function get (url: string, query: Object): void {
  console.log(arguments)
  const a = createElement('a')
  a.href = url
  const queryArray = []
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  a.search = '?' + queryArray.join('&') + a.search.replace(/^\?/, '&')
  alert(a.href)
}

module.exports = {
  get
}
