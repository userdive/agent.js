export function createEvent (eventInterface: string, eventName: string) {
  let e
  if (typeof Event === 'function') {
    e = new Event(eventName)
  } else {
    e = document.createEvent(eventInterface)
    e.initEvent(eventName, true, true)
  }
  return e
}
