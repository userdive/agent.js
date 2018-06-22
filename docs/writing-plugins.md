---
id: writing-plugins
title: Plugins
---

Agent.js allows you to add custom scripts via a plugin architecture.
Plugins are useful to help solving problems or to aid measuring end-user actions.

## Defining a plugin

Plugins can register to agent via `provide` command.
It must invoke with the name of the plugin as the first argument followed by the plugin's constructor.
`provide` command register to agent with userdive command queue.

```js
class MyPlugin {
    constructor(tracker, options) {
        this.tracker = tracker;
    }
    echoId() {
        console.log(this.tracker.get("linkerParam"));
    }
}
```

```js
_ud("provide", pluginName, MyPlugin);
```

Plugin supply needs to invoke global function obtained through `data-ud-namespace`.
To resolve it, plugins should have check the object name, like below;

```js
import provide from "@userdive/provider";
import { MyPlugin } from "./path/to/MyPlugin";

provide("myplugin", MyPlugin);
```

Show [example](https://userdive.github.io/agent.js/plugin-create/)

## Use plugin

### Configuring plugin instance

You can configure plugin instance via `require` command argument.

```js
_ud("create", "id", "auto");
_ud("require", "myplugin");
_ud("send", "pageview");
```

### Call plugin methods

After invoke `require` command, you can invoke command to call the plugin method.

```js
_ud("myplugin:echoId");
```

### Load plugin file

Tipically, plugins will load separate file or bundled with your main application code.

```html
<script async src="./myplugin.js"></script>
```
