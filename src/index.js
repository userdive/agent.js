/* @flow */
import api from './api'
module.exports = api

declare var window: any;

function execute (): void {
  const r = []
  r.push.apply(r, arguments)
  const f = r.shift()
  api[f].apply(this, r)
}

if (window.USERDIVEObject && window[window.USERDIVEObject]) {
  const queue = window[window.USERDIVEObject].q
  for (const args in queue) {
    execute.apply(this, args)
  }
  window[window.USERDIVEObject] = execute
}
