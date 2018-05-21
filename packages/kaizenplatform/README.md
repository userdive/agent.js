# @userdive/kaizenplatform-events-plugin

[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![Build Status](https://saucelabs.com/browser-matrix/userdive.svg)](https://saucelabs.com/open_sauce/user/userdive/builds)

## Table of Contents

*   [Install](#install)
*   [Usage](#usage)
*   [Contribute](#contribute)
*   [License](#license)

## Install

    npm install @userdive/kaizenplatform-plugin

## Usage

```js
import Agent from "@userdive/agent";
import Plugin from "@userdive/kaizenplatform-plugin";

const agent = new Agent("projectId", "auto");
agent.provide("kaizenplatform-plugin", Plugin);
agent.require("kaizenplatform-plugin");
```

## Contribute

PRs accepted. [join us](https://www.wantedly.com/companies/uncovertruth/projects)

## License

GPLv3. Full license text is available in [LICENSE](https://github.com/userdive/agent.js/blob/master/LICENSE)
