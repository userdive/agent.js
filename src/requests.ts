// https://developer.mozilla.org/ja/docs/Web/API/Navigator/doNotTrack
export function enable (): boolean {
  const w: any = window
  const dnt: string = w.navigator.doNotTrack || w.doNotTrack
  if (dnt === '1' || dnt === 'yes') {
    return false
  }
  return true
}

export function get (
  url: string,
  query: string[],
  onload: (this: HTMLElement, ev: Event) => any,
  onerror: (this: HTMLElement, ev: ErrorEvent) => any
): void {
  if (enable() && query.length > 0) {
    const img: HTMLImageElement = document.createElement('img')
    img.onload = onload
    img.onerror = onerror
    img.src = `${url}?${query.join('&')}`
  }
}

export function obj2query (data: { key: any; uriComponent: string }): string[] {
  const query: string[] = []
  Object.keys(data).forEach(key => {
    if (data.key) {
      query.push(`${key}=${encodeURIComponent(data.key)}`)
    }
  })
  return query
}
