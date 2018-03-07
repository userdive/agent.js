const intervals: number[] = []
function push (t: number, n: number) {
  for (let i = 0; i < n; i++) {
    intervals.push(t)
  }
}
push(2, 300)

export const LINKER = '_ud' // TODO
export const CUSTOM_INDEX = 20
export const INTERACT = 5
export const INTERVAL = intervals.sort()
export const LISTENER = ['addEventListener', 'removeEventListener']
export const NAMESPACE = `data-ud-namespace`
export const SCROLL = ['pageXOffset', 'pageYOffset']
export const TOUCH = ['ontouchstart', 'ontouchmove', 'ontouchend']
export const VERSION = 1
export const SETTINGS = {
  auto: false,
  baseUrl: 'https://v1.userdive.com',
  cookieName: '_ud',
  cookieDomain: '',
  cookieExpires: 730, // TODO
  RAVEN_DSN: '',
  Raven: undefined,
  allowLink: false
}
