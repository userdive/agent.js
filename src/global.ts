import { NAMESPACE } from './constants'

type TaskQueue = any[]

export default function (Agent: any) {
  const agents: Object = {}

  function execute (): any {
    const tasks: string[] = []
    tasks.push.apply(tasks, arguments)
    const task = tasks.shift()
    let api: string[] = []
    if (task) {
      api = task.split('.')
    }
    let name = 'default'
    if (api.length === 2) {
      name = api[1]
    }

    if (!agents[name]) {
      agents[name] = new Agent()
    }
    return agents[name][api[0]](...tasks)
  }

  ((global: Window) => {
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    if (global[name] && global[name].q) {
      const queue: any = global[name].q ? global[name].q : Array<TaskQueue>()
      for (let i = 0; i < queue.length; i++) {
        execute.apply(queue[i])
      }
      global[name] = execute
    }
  })(window)
}
