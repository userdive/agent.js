# userdive plugin create sample

[![CircleCI](https://circleci.com/gh/userdive/agent.js/tree/master.svg?style=svg)](https://circleci.com/gh/userdive/agent.js/tree/master)

```js
export class MyPlugin {
    constructor(tracker) {
        this.tracker = tracker;
    }
    echoId() {
        const element = document.getElementById("app");
        element.innerHTML = `<p>linkerParam: ${this.tracker.get(
            "linkerParam"
        )}</p>`;
    }
}
```
