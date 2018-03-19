# userdive

[![npm version](https://badge.fury.io/js/userdive.svg)](https://www.npmjs.com/package/userdive)
[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Official USERDIVE loader from cdn.userdive.com

## Table of Contents

*   [Install](#install)
*   [Usage](#usage)
*   [Contribute](#contribute)
*   [License](#license)

## Install

```sh
npm install userdive --save
```

## Usage

```js
import factory from "userdive";

// create global entrypoint & load agent.js from cdn
const _ud = factory();

_ud("create", "id", "auto");
_ud("send", "pageview");
```

```js
import factory from "userdive";

const myTracker = factory("myTracker"); // customize global name
myTracker("create", "id", "auto");
myTracker("send", "pageview");
```

more [examples](https://github.com/userdive/agent.js/tree/master/examples)

## Contribute

PRs accepted. [join us](https://www.wantedly.com/companies/uncovertruth/projects)

## License

GPLv3. Full license text is available in [LICENSE](https://github.com/userdive/agent.js/blob/master/packages/userdive/LICENSE)
