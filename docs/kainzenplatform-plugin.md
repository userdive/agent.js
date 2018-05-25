---
id: kaizenplatform-plugin
title: Kaizen Platform
---

The Kaizen Platform plugin works A/B testing integration for Kaizen Platform.

This plugin will send A/B testing informaiton as [Event data](./field-reference.html#event-tracking).

| Field         | Assigned Value                                |
| :------------ | :-------------------------------------------- |
| eventCategory | Constant string as 'kaizenplatform'.          |
| eventAction   | The experimentType string in Kaizen Platform. |
| eventLabel    | The variationId for renderd.                  |
| eventValue    | _None_                                        |

## Provided Name

This plugin name is `kzs`.

You can register this plugin use this name.

```js
_ud("require", "kzs");
```

## Provided Functions

### getValiation

**Usage**

The Kaizen Platform script will inject kzs queue under window.
And variation data can collect by invoke Kaizen Platform [API](https://support.kaizenplatform.net/hc/en-us/articles/206075262-Collecting-Variation-data).
`getVariation` work as add task to this queue, sending event with variation data of Kaizen Platform.

```js
_ud("kzs:getVariation");
```
