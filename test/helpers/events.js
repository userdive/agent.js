/* @flow */

export default function eventFactory (name: 'scroll') {
  let trigger
  try {
    trigger = new Event(name)
  } catch (err) {
    trigger = document.createEvent('Event')
    trigger.initEvent(name, false, false)
  }
  return trigger
}
