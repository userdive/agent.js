---
id: ud-command-queue
title: ud Command Queue
---

The `ud()` command queue provides an interface for executing process with agent.js.
Commonly, you should invoke the queue command to control agent behavior.

## Adding commands to the userdive queue

Invoking the ud command queue function like below will push commands onto the queue.
The queued commands will execute as agent’s function.

```js
_ud(command, [...fields], [fieldsObject]);
```

| Name                | Type   | Required | Description                                                 |
| :------------------ | :----- | :------- | :---------------------------------------------------------- |
| [command](#command) | String | Yes      | An identifier representing the command to add to the queue. |
| ...fields           | any    | No       | Able to set any custom variable. Max number of index: 20    |
| fieldsObject        | Object | No       | Able to set any custom variable. Max number of index: 20    |

### command

The comannd identifier signature is `[trackerName.][pluginName:]methodName`.

| Name        | Required | Description                                                                                   |
| :---------- | :------- | :-------------------------------------------------------------------------------------------- |
| trackerName | No       | The name of the tracker.                                                                      |
| pluginName  | No       | The name of an agent.js plugin. The plugin must register with `require` command before.       |
| methodName  | Yes      | The name of method. It must be one of the [command methods](#command-methods) describe below. |

## Command methods

### create

Creates a new tracker instance

**Usage**

```js
_ud("create", [trackingId], [cookieDomain], [name], [fieldsObject]);
```

**Parameters**

Please see create [field reference](./field-reference.html).

---

### send

**Usage**

```js
_ud("[trackerName.]send", [hitType], [fieldsObject]);
```

**Parameters**

| Hit Type | Fields Objet                         |
| :------- | ------------------------------------ |
| pageview | page                                 |
| event    | see [event tracking](./events.html). |

---

### set

**Usage**

```js
_ud("[trackerName.]set", fieldName, fieldValue);
```

```js
_ud("[trackerName.]set", fieldObject);
```

**Parameters**

Please see [fieldObject reference](./field-reference.html#fieldObject).

---

### require

**Usage**

> TBA

**Parameters**

---

### provide

**Usage**

> TBA

**Parameters**
