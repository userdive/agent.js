/* @flow */

// https://developer.mozilla.org/ja/docs/Web/API/Navigator/doNotTrack
function isEnableTracking (): boolean {
  const doNotTrack = navigator.doNotTrack || window.doNotTrack
  if (doNotTrack === '1' || doNotTrack === 'yes') {
    return false
  }
  return true
};

export function get (url: string, query: string[]): boolean {
  if (isEnableTracking()) {
    const img = document.createElement('img')
    img.onload = () => null
    img.onerror = () => null
    img.src = `${url}?${query.join('&')}`
    return true
  }
  return false
}

export function obj2query (data: Object): string[] {
  const query = []
  Object.keys(data).forEach(key => {
    query.push(`${key}=${encodeURIComponent(data[key])}`)
  })
  return query
}
