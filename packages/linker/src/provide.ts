const NAMESPACE = 'data-ud-namespace'

export default function (pluginName: string, pluginConstructor: any) {
  const element: any = document.querySelector(`[${NAMESPACE}]`)
  const name: string = element.getAttribute(NAMESPACE)
  const w: any = window
  w[name] =
    w[name] ||
    function (...args: any[]) {
      (w[name].q = w[name].q || []).push(args)
    }

  w[name](pluginName, pluginConstructor)
}
