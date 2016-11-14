/* @flow */
import api from './api'
module.exports = api

declare var window: {
  USERDIVEObject: string;
};

type Queue = any[]

function execute (): void {
  const r = []
  r.push.apply(r, arguments)
  const f = r.shift()
  api[f].apply(this, r)
}

if (window.USERDIVEObject && window[window.USERDIVEObject]) {
  const queue: Array<Queue> = window[window.USERDIVEObject].q
  for (const args of queue) {
    execute.apply(this, args)
  }
  window[window.USERDIVEObject] = execute
}
