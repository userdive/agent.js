---
id: plugins
title: Plugins
---
Agent.js allows you to add custom scripts via a plugin architecture. Plugins are useful to help solving problems or to aid measuring end-user actions.

## Defining a plugin

Plugins can register to agent via `provide` command. It must invoke with the name of the plugin as the first argument followed by the plugin's constructor. `provide` command register to agent with userdive command queue.

```js
// Plugin Construtor
function MyPlugin() {
    console.log("use plugin");
}
// Register the plugin to agent
_ud("provide", "myplugin", MyPlugin);
```

Plugin supply needs to invoke global function obtained through `data-ud-namespace`. To resolve it, plugins should have check the object name, like below;

```js
// in plugin code
function providePlugin(pluginName, pluginConstrucor) {
    var name = document
        .querySelector("[data-ud-namespace]")
        .getAttribute("data-ud-namespace");
    var ud =
        window[name] ||
        function() {
            (window[name].q = window[name].q || []).push(arguments);
        };
    ud("provide", pluginName, pluginConstrucor);
}
```

## Use plugin

### Configuring plugin instance

You can configure plugin instance via `require` command argument.

```js
_ud("create", "id", "auto");
_ud("require", "pluginName", { egg: "small", spam: true });
_ud("send", "pageview");
```

### Call plugin methods

After invoke `require` command, you can invoke command to call the plugin method.

```js
_ud("somePlugin:methodName", { egg: "large" });
```

### Load plugin file

Tipically, plugins will load separate file or bundled with your main application code.

```html
<script async src="myplugin.js"></script>
```