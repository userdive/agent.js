# @userdive/vwo-plugin

[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![Build Status](https://saucelabs.com/browser-matrix/userdive.svg)](https://saucelabs.com/open_sauce/user/userdive/builds)

> TBA

## Table of Contents

*   [Install](#install)
*   [Usage](#usage)
*   [Contribute](#contribute)
*   [License](#license)

## Install

    npm install @userdive/vwo-plugin

## Usage

```js
import Agent from "@userdive/agent";
import Plugin from "@userdive/vwo-plugin";

const agent = new Agent("projectId", "auto");
agent.provide("vwo", Plugin);
agent.require("vwo");
agent.run("vwo:getVariation", [window, 200, 10]);
```

## Contribute

PRs accepted. [join us](https://www.wantedly.com/companies/uncovertruth/projects)

## License

GPLv3. Full license text is available in [LICENSE](https://github.com/userdive/agent.js/blob/master/LICENSE)
