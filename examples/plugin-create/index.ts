export class MyPlugin {
  tracker: any
  constructor (tracker: any) {
    this.tracker = tracker
  }
  echoId () {
    const element = document.getElementById('app') as HTMLElement
    element.innerHTML = `<p>linkerParam: ${this.tracker.get('linkerParam')}</p>`
  }
}
