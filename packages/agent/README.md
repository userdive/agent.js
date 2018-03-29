<p align='center'>
<a href="https://app.userdive.com/signup" alt="USERDIVE logo" target="_blank"><img src="http://style.uncovertruth.co.jp/assets/images/userdive/logo-text.svg" height="100"></a>
</p>

# @userdive/agent

[![npm version](https://badge.fury.io/js/%40userdive%2Fagent.svg)](https://www.npmjs.com/package/@userdive/agent)
[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![Build Status](https://saucelabs.com/browser-matrix/userdive.svg)](https://saucelabs.com/open_sauce/user/userdive/builds)

> Official USERDIVE module for webpage analytics

## Table of Contents

*   [Install](#install)
*   [Usage](#usage)
*   [Contribute](#contribute)
*   [License](#license)

## Install

```sh
npm install @userdive/agent --save
```

## Usage

### Basic Usage

```js
import Agent from "@userdive/agent";

const agent = new Agent("projectId", "auto");
agent.send("pageview");
```

### Custom Dimensions

[docs](https://developers.userdive.com/docs/en/custom-variables.html)

```js
import Agent from "@userdive/agent";

const agent = new Agent("projectId", "auto");
agent.send("pageview", {
    dimension15: "My Custom Dimension"
});
```

```js
agent.set({
    dimension15: "My Custom Dimension"
});

agent.set("dimension15", "My Custom Dimension");
```

### Send Event

```js
import Agent from "@userdive/agent";

const agent = new Agent("projectId", "auto");
agent.send("pageview");
agent.send("event", {
    eventCategory: "EC",
    eventAction: "Cart",
    eventLabel: "add",
    eventValue: 2000
});
```

#### Register Plugin ( in plugin code )

```js
class MyPlugin {
    constructor(agent, opts) {
        this.opts = opts || { msg: "hi" };
    }

    greeting(target) {
        const name = target || "user";
        console.log(this.opts.msg + ", " + name);
    }
}
```

#### Use Plugin

```js
import Agent from "@userdive/agent";
import Myplugin from "path/to/plugin";

const agent = new Agent("projectId", "auto");
agent.provide("myplugin", MyPlugin);
agent.require("myplugin", { msg: "hello" }); // provided name
agent.run("myplugin", "greeting", "everyone");
// => output 'hello, everyone'
```

## Contribute

PRs accepted. [join us](https://www.wantedly.com/companies/uncovertruth/projects)

## License

GPLv3. Full license text is available in [LICENSE](https://github.com/userdive/agent.js/blob/master/packages/linker/LICENSE)
