/* @flow */
const timestamp = (): number => {
  return Date.now()
}

const sendBeacon = () => {
  return navigator.sendBeacon
}

const bodyAlias = (body => {
  return {
    clientHeight: (): number => body.clientHeight,
    clientWidth: (): number => body.clientWidth
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
    innerHeight: (): number => w.innerHeight,
    innerWidth: (): number => w.innerWidth
  }
})(window)

module.exports = Object.assign({}, {
  timestamp,
  sendBeacon
}, bodyAlias, screenAlias, windowAlias)
