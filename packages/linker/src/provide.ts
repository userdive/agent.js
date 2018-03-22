import { namespace, q } from 'userdive'
import { USERDIVEApi } from 'userdive/lib/types'

export default function (pluginName: string, pluginConstructor: any) {
  const element = document.querySelector(`[${namespace}]`) as HTMLElement
  const api = q(
    element.getAttribute(namespace) as string,
    window
  ) as USERDIVEApi
  api('provide', pluginName, pluginConstructor)
}
