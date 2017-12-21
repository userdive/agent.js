export default class DummyPlugin {
  private id: string
  constructor () {
    this.id = 'id'
  }
  injectNumber (num: number) {
    window['checkNumber'] = num
  }
}
