/* @flow */
export function get (url: string, query: string[]): void {
  const img = document.createElement('img')
  img.onload = () => null
  img.onerror = () => null
  img.src = `${url}?${query.join('&')}`
}
