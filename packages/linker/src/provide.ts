import { q } from 'userdive'

export const NAMESPACE = 'data-ud-namespace'
export default function (pluginName: string, pluginConstructor: any) {
  const element = document.querySelector(`[${NAMESPACE}]`) as HTMLElement
  const name: string = element.getAttribute(NAMESPACE) || '_ud'
  const w: any = window
  q(name, w)
  w[name]('provide', pluginName, pluginConstructor)
}
