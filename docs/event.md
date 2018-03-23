---
id: event
title: Event Tracking
---

| Field         | Type    | Required | Description                                  |
| :------------ | :------ | :------- | :------------------------------------------- |
| eventCategory | String  | Yes      | Set the event category. Not be empty String. |
| eventAction   | String  | Yes      | Set the event action. Not be empty String.   |
| eventLabel    | String  | No       | Set the event label.                         |
| eventValue    | Integer | No       | Set the event action. Not be nagative.       |

## Send Event Data

```js
_ud("send", "event", {
    eventCategory: "Category",
    eventAction: "Action",
    eventLabel: "Label",
    eventValue: 1000
});
```
