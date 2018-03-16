# @userdive/linker

[![npm version](https://badge.fury.io/js/%40userdive%2Flinker.svg)](https://www.npmjs.com/package/@userdive/linker)
[![Build Status](https://travis-ci.org/userdive/agent.js.svg?branch=master)](https://travis-ci.org/userdive/agent.js)
[![codecov](https://codecov.io/gh/userdive/agent.js/branch/master/graph/badge.svg)](https://codecov.io/gh/userdive/agent.js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![codebeat badge](https://codebeat.co/badges/248f31a1-c73e-45e4-b1e0-a6154c1baaca)](https://codebeat.co/projects/github-com-userdive-agent-js-master)
[![CodeFactor](https://www.codefactor.io/repository/github/userdive/agent.js/badge)](https://www.codefactor.io/repository/github/userdive/agent.js)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/007cedb2144843ebb45db871c04a0045)](https://app.codacy.com/app/USERDIVE/agent.js/dashboard)
[![BCH compliance](https://bettercodehub.com/edge/badge/userdive/agent.js?branch=master)](https://bettercodehub.com/)

[![Build Status](https://saucelabs.com/browser-matrix/userdive.svg)](https://saucelabs.com/open_sauce/user/userdive/builds)

> TBA

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
