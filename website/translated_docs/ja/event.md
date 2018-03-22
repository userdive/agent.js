---
id: event
title: Event Data
---
| Field    | Type    | Required | Description                                  |
|:-------- |:------- |:-------- |:-------------------------------------------- |
| category | String  | Yes      | Set the event category. Not be empty String. |
| action   | String  | Yes      | Set the event action. Not be empty String.   |
| label    | String  | No       | Set the event label.                         |
| value    | Integer | No       | Set the event action. Not be nagative.       |

## Send Event Data

```js
_ud("send", "event", {
    category: "Category",
    action: "Action",
    label: "Label",
    value: 1000
});
```