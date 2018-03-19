# @userdive/linker

[![npm version](https://badge.fury.io/js/%40userdive%2Flinker.svg)](https://www.npmjs.com/package/@userdive/linker)
[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

[![Build Status](https://saucelabs.com/browser-matrix/userdive.svg)](https://saucelabs.com/open_sauce/user/userdive/builds)

> CORS domain tracking using query parameter plugin

## Table of Contents

*   [Install](#install)
*   [Usage](#usage)
*   [Contribute](#contribute)
*   [License](#license)

## Install

    npm install @userdive/linker

## Usage

```js
import Agent from "@userdive/agent";
import Linker from "@userdive/linker";

const agent = new Agent("projectId", "auto");
agent.provide("linker", Linker);
agent.require("linker");
agent.run("linker", "autoLink", ["developers.userdive.com"]);
```

## Contribute

PRs accepted. [join us](https://www.wantedly.com/companies/uncovertruth/projects)

## License

GPLv3. Full license text is available in [LICENSE](https://github.com/userdive/agent.js/blob/master/packages/linker/LICENSE)
