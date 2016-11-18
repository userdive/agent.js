/* @flow */
const timestamp = (): number => {
  return Date.now()
}

const sendBeacon = () => {
  return navigator.sendBeacon
}

const bodyAlias = (body => {
  function resourceHeight (): number {
    return body.clientHeight
  }
  function resourceWidth (): number {
    return body.clientWidth
  }
  return {
    resourceHeight,
    resourceWidth
  }
})(document.body)

const screenAlias = (s => {
  function screenHeight (): number {
    return s.height
  }
  function screenWidth (): number {
    return s.width
  }
  return {
    screenHeight,
    screenWidth
  }
})(screen)

const windowAlias = (w => {
  function windowHeight (): number {
    return w.innerHeight
  }
  function windowWidth (): number {
    return w.innerWidth
  }
  return {
    windowHeight,
    windowWidth
  }
})(window)

function xhr () {
  return new XMLHttpRequest()
}

module.exports = Object.assign({},
  {
    timestamp,
    sendBeacon,
    xhr
  },
  bodyAlias,
  screenAlias,
  windowAlias,
)
