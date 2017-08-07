/* @flow */

// https://developer.mozilla.org/ja/docs/Web/API/Navigator/doNotTrack
export function enable (): boolean {
  const dnt = navigator.doNotTrack || window.doNotTrack
  if (dnt === '1' || dnt === 'yes') {
    return false
  }
  return true
}

export function get (
  url: string,
  query: string[],
  onload: Function = () => null,
  onerror: Function = () => null
): void {
  if (enable() && query.length > 0) {
    const img = document.createElement('img')
    img.onload = onload
    img.onerror = onerror
    img.src = `${url}?${query.join('&')}`
  }
}

export function obj2query (data: Object): string[] {
  const query = []
  Object.keys(data).forEach(key => {
    query.push(`${key}=${encodeURIComponent(data[key])}`)
  })
  return query
}
