export class MyPlugin {
  public tracker: any
  public constructor(tracker: any) {
    this.tracker = tracker
  }
  public echoId() {
    const element = document.getElementById('app') as HTMLElement
    element.innerHTML = `<p>linkerParam: ${this.tracker.get('linkerParam')}</p>`
  }
}
