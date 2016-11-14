/* @flow */
import api from './api'

declare var window: {
  USERDIVEObject: string;
};

type TaskQueue = any[]

function execute (): void {
  const r = []
  r.push.apply(r, arguments)
  const f = r.shift()
  api[f].apply(this, r)
}

if (window.USERDIVEObject && window[window.USERDIVEObject]) {
  const queue: Array<TaskQueue> = window[window.USERDIVEObject].q
  for (const args of queue) {
    execute.apply(this, args)
  }
  window[window.USERDIVEObject] = execute
}

module.exports = api
