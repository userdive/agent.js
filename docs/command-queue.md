---
id: command-queue
title: Command Queue
---

The `ud()` command queue function provides an interface for executing process with agent.js.
Commonly, you should invoke the queue command to control agent behavior.

## Adding commands to the userdive queue

Invoking the ud command queue function like below will push commands onto the queue.
The queued commands will execute as agent’s function.

```js
_ud(command, [...fields], [fieldsObject]);
```

| Name                | Type   | Required | Description                                                                                     |
| :------------------ | :----- | :------- | :---------------------------------------------------------------------------------------------- |
| [command](#command) | String | Yes      | An identifier representing the command to add to the queue.                                     |
| ...fields           | any    | No       | Optional parameters for specifying common fields. Depending on the command method being called. |
| fieldsObject        | Object | No       | An object for specifying agent's fields.                                                        |

### command

The command identifier signature is `[trackerName.][pluginName:]methodName`.

| Name        | Required | Description                                                                                   |
| :---------- | :------- | :-------------------------------------------------------------------------------------------- |
| trackerName | No       | The name of the tracker.                                                                      |
| pluginName  | No       | The name of an agent.js plugin. The plugin must register with `require` command before.       |
| methodName  | Yes      | The name of method. It must be one of the [command methods](#command-methods) describe below. |

## Command methods

### create

Creates a new tracker instance.

**Usage**

```js
_ud("create", [trackingId], [cookieDomain], [name], [fieldsObject]);
```

**Parameters**

Please see create [field reference](./field-reference.html#create-only-fields).

---

### send

Sends tacking data to USERDIVE.

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

Please see [fieldObject reference](field-reference.html#field-object).

---

### require

**Usage**

```js
_ud("[trackerName.]require", pluginName, [pluginOptions]);
```

**Parameters**

| Name          | Type   | Required | Description                                                    |
| :------------ | :----- | :------- | :------------------------------------------------------------- |
| pluginName    | String | Yes      | The name of plugin named with `require` API by plugin vendor.  |
| pluginOptions | Object | No       | An object to use in the plugin constructor upon instantiation. |

---

### provide

**Usage**

```js
_ud("provide", pluginName, pluginConstuctor);
```

##### Note: `provide` api does not accept a tracker name.

**Parameters**

| Name             | Type   | Required | Description                                                                                                            |
| :--------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------- |
| pluginName       | String | Yes      | The name of plugin. The name must be the same name used by [`require`](#require) api.                                  |
| pluginConstuctor | Object | No       | A constructor function the provides plugin. It will be invoked with pluginOptions object in [`require`](#require) api. |
