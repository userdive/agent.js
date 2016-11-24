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
  error: function (err: string | Error, options?: RavenOptions): void {
    const raven = getRaven(window, window.USERDIVEObject)
    if (typeof err === 'string') {
      raven.captureMessage(err, options)
      return
    }
    raven.captureException(err, options)
  }
}
