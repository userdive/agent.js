import { NAMESPACE } from './constants'

type TaskQueue = any[]

export default function (Agent: any) {
  const agents: any = {}

  function execute (): any {
    const tasks: any[] = []
    tasks.push.apply(tasks, arguments)
    let name = 'default'
    let api: string[] = []
    const t: string | undefined = tasks.shift()
    if (t !== undefined) {
      api = t.split('.')
      if (api.length === 2) {
        name = api[1]
      }
    }

    if (!agents[name]) {
      agents[name] = new Agent()
    }

    return agents[name][api[0]](...tasks)
  }

  ((global: any) => {
    const element: any = document.querySelector(`[${NAMESPACE}]`)
    const name: string = element.getAttribute(NAMESPACE)
    if (global[name] && global[name].q) {
      const queue: TaskQueue[] = global[name].q
      for (let i = 0; i < queue.length; i++) {
        execute.apply(this, queue[i])
      }
      global[name] = execute
    }
  })(window)
}
