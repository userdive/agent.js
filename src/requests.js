/* @flow */
export function get (url: string, query: string[]): void {
  const img = document.createElement('img')
  img.onload = () => null
  img.onerror = () => null
  img.src = `${url}?${query.join('&')}`
}

export function obj2query (data: Object): string[] {
  const query = []
  Object.keys(data).forEach(key => {
    query.push(`${key}=${encodeURIComponent(data[key])}`)
  })
  return query
}
