/* @flow */
const timestamp = (): number => {
  return Date.now()
}

const sendBeacon = () => {
  return navigator.sendBeacon
}

const bodyAlias = (body => {
  return {
    resourceHeight: (): number => body.clientHeight,
    resourceWidth: (): number => body.clientWidth
  }
})(document.body)

const screenAlias = (s => {
  return {
    screenHeight: (): number => s.height,
    screenWidth: (): number => s.width
  }
})(screen)

const windowAlias = (w => {
  return {
    windowHeight: (): number => w.innerHeight,
    windowWidth: (): number => w.innerWidth
  }
})(window)

module.exports = Object.assign({}, {
  timestamp,
  sendBeacon
}, bodyAlias, screenAlias, windowAlias)
