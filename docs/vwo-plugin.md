---
id: vwo-plugin
title: Visual Website Optimizer
---

The VWO plugin works A/B testing integration for Visual Website Optimizer (VWO).

This plugin will send A/B testing informaiton as [Event data](./field-reference.html#event-tracking).

| Field         | Assigned Value                   |
| :------------ | :------------------------------- |
| eventCategory | Constant string as 'vwo'.        |
| eventAction   | The experiment ID string in VWO. |
| eventLabel    | The variation ID for renderd.    |
| eventValue    | _None_                           |

## Provided Name

This plugin name is `vwo`.

You can register to tracker via `require` API as below.

```js
_ud("require", "vwo");
```

## Provided Functions

### getValiation

The VWO script will inject \_vis_opt_queue queue under window.
And experiment ID and variation ID can gather from global variables.
`getVariation` push a task to this queue at intervals of configured millisecond.
The task will try gather these variables and send event once if get it.
In case of able to send event, this function will not push task.

**Usage**

```js
_ud("vwo:getVariation", [global], [interval], [maxTry]);
```

**Parameters**

| Name     | Type   | Required | Description                                        |
| :------- | :----- | :------- | :------------------------------------------------- |
| global   | any    | No       | The Object having \_vis_opt_queue. Default: window |
| interval | Number | No       | Interval to push task (milliseconds). Default: 200 |
| maxTry   | Number | No       | Number of times to try to gather data. Default: 10 |
