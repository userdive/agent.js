/* @flow */
const timestamp = (): number => {
  return Date.now()
}

const sendBeacon = () => {
  return navigator.sendBeacon
}

const bodyAlias = (body => {
  return {
    h: (): number => body.clientHeight,
    w: (): number => body.clientWidth
  }
})(document.body)

const screenAlias = (s => {
  return {
    sh: (): number => s.height,
    sw: (): number => s.width
  }
})(screen)

const windowAlias = (w => {
  return {
    wh: (): number => w.innerHeight,
    ww: (): number => w.innerWidth
  }
})(window)

module.exports = Object.assign({}, {
  timestamp,
  sendBeacon
}, bodyAlias, screenAlias, windowAlias)
