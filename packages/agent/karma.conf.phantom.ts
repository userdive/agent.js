import { setting } from '../../karma.conf.base'

module.exports = function (config: any) {
  setting.browsers = ['PhantomJS']
  config.set(setting)
}
