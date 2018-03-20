---
id: plugins
title: Plugins
---

You can write functionaly scripts as plugin to help solve probrem and to aid in measure the action.

## Defining a plugin

Plugins can registere to agent via `provide` command.
It must invoke with the name of the plugin as the first argument followed by the plugin's constructor.
`provide` command register to agent with userdive command queue.

```js
// Plugin Construtor
function MyPlugin() {
    console.log("use plugin");
}
// Register the plugin to agent
_ud("provide", "myplugin", MyPlugin);
```

Plugin supply needs to invoke global object obtained through `data-ud-namespace`.
To resolve it, plugins should have check the object name, like below;

```js
// in plugin code
function providePlugin(pluginName, pluginConstrucor) {
    var name = document
        .querySelector("data-ud-namespace")
        .getAttribute("data-ud-namespace");
    var ud =
        window[name] ||
        function() {
            (window[name].q = window[name].q || []).push(arguments);
        };
    ud("provide", "myplugin", MyPlugin);
}
```

## Use plugin

### Congiguring via require

You can configure plugin instance via `require` command argument.

```js
_ud("create", "id", "auto");
_ud("require", "pluginName", { egg: "small", spam: true });
_ud("send", "pageview");
```

### Call plugin methods

After invoke `require` command, you can invoke command to call the plugin method.

```js
_ud("create", "id", "auto");
_ud("require", "somePlugin", { egg: "small", spam: true });
å;
_ud("somePlugin:methodName", ...args);
```

### Load plugin file

Tipically, plugins will load separate file or bundled with your main application code.

```html
<script async src="myplugin.js"></script>
```
