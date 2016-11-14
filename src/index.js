/* @flow */
import api from './api'

declare var window: {
  USERDIVEObject: string;
};

type TaskQueue = any[]

function execute (): void {
  const taskQueue = []
  taskQueue.push.apply(taskQueue, arguments)
  const apiName = taskQueue.shift()
  api[apiName].apply(this, taskQueue)
}

if (window.USERDIVEObject && window[window.USERDIVEObject]) {
  const queue: Array<TaskQueue> = window[window.USERDIVEObject].q
  for (const args of queue) {
    execute.apply(this, args)
  }
  window[window.USERDIVEObject] = execute
}

module.exports = api
