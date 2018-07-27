---
id: optimizely_x-plugin
title: Optimizely X
---

The Optimizely X plugin works A/B testing integration for Optimizely X.

This plugin will send A/B testing informaiton as [Event data](./field-reference.html#event-tracking).

| Field         | Assigned Value                            |
| :------------ | :---------------------------------------- |
| eventCategory | Constant string as 'optimizely'.          |
| eventAction   | The experiment ID string in Optimizely X. |
| eventLabel    | The variation ID for rendered.            |
| eventValue    | _None_                                    |

Show [example](https://userdive.github.io/agent.js/optimizely-x/)

## Provided Name

This plugin name is `optimizely`.

You can register to tracker via `require` API as below.

```js
_ud("require", "optimizely");
```

## Provided Functions

### getValiation

The Optimizely X provide javascript [API](https://developers.optimizely.com/x/solutions/javascript/reference/index.html#reading-data).
The API belonged Object named 'optimizely' under `window`.
And experiment ID and variation ID can get via `getCampaignStates()` function.
This plugin provide `getVariation` that invoke polling task.
The task call the API to identify A/B testing IDs, and send once as event if get.
After send event, the task stop polling.

**Usage**

```js
_ud("optimizely:getVariation", [global], [interval], [maxTry]);
```

**Parameters**

| Name     | Type   | Required | Description                                        |
| :------- | :----- | :------- | :------------------------------------------------- |
| global   | any    | No       | Global object. Default: window                     |
| interval | Number | No       | Interval to push task (milliseconds). Default: 100 |
| maxTry   | Number | No       | Number of times to try to gather data. Default: 3  |
