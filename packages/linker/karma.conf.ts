import { setting } from '../../karma.conf.base'
export default function (config: any) {
  setting.frameworks.push('fixture')
  config.set(setting)
}
