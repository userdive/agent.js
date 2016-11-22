/* @flow */
type RavenOptions = {
  // TODO
}

function getRaven (global: any, name: string) {
  let raven
  if (window[name] && global[name].Raven) {
    raven = global[name].Raven
  }
  if (raven && raven.isSetup()) {
    return raven
  }
  return {
    captureException: function () {},
    captureMessage: function () {}
  }
}

module.exports = {
  captureException: function (err: Error, options?: RavenOptions) {
    getRaven(window, window.USERDIVEObject).captureException(err, options)
  },
  captureMessage: function (msg: string, options?: RavenOptions) {
    getRaven(window, window.USERDIVEObject).captureMessage(msg, options)
  }
}
