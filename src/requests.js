/* @flow */

function get (url: string, query: Object): void {
  const queryArray = []
  for (const key in query) {
    queryArray.push(`${key}=${encodeURIComponent(query[key])}`)
  }
  (new Image()).src = `${url}?${queryArray.join('&')}`
}

module.exports = {
  get
}
