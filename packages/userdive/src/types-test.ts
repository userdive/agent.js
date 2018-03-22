import factory from './index'

const _ud = factory()
_ud('create', 'af57h6gb', 'auto')
_ud('create', 'af57h6gb', {
  cookieName: '__ud_example',
  cookieDomain: '.userdive.github.io',
  cookieExpires: 0 // Time in seconds.
})
_ud('create', 'af57h6gb', 'auto', 'myTracker', {
  allowLinker: true,
  dimension1: 'cd1'
})
_ud('create', {
  trackingId: 'af57h6gb',
  cookieDomain: 'auto',
  name: 'myTracker'
})
_ud('create', 'af57h6gb', {
  name: 'myTracker2',
  allowLinker: true,
  dimension20: 'cd1'
})
_ud('send', 'pageview')
_ud('send', 'event', {
  eventCategory: 'c1',
  eventAction: 'a1'
})

_ud('send', 'event', {
  eventCategory: 'c1',
  eventAction: 'a1',
  eventLabel: 'l1',
  eventValue: 1
})

_ud('send', {
  hitType: 'event',
  eventCategory: 'c1',
  eventAction: 'a1'
})

_ud('require', 'somePlugin')
_ud('require', 'somePlugin', 'option')
_ud('require', 'somePlugin', { some: 'options' })
