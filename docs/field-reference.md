---
id: field-reference
title: Field reference
---

## Fields for Create

### Project ID

The Project ID of USERDIVE. The ID associate all tracking data.

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| projectId  | String | _None_        |

**Usage**

```js
_ud("create", "exampleid", "auto");
```

---

### Client ID

The Client ID for USERDIVE. The ID will write to cookie as value.

| Field Name | Type   | Default Value      |
| :--------- | :----- | :----------------- |
| clientId   | String | _genereated value_ |

**Usage**

```js
_ud("create", "exampleid", "auto");
```

---

### Tracker Name

The name of tracker.

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| name       | String | 'default'     |

**Usage**

```js
_ud("create", "exampleid", "auto", { name: "myAgent" });
```

---

### Allow Linker Parameter

If set true, you can share client ID by query parameter in cross-domain tracking.

| Field Name  | Type    | Default Value |
| :---------- | :------ | :------------ |
| allowLinker | boolean | false         |

**Usage**

```js
_ud("create", "exampleid", "auto", { allowLinker: true });
```

---

### Linker Name

The name of client ID query parameter.

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| linkerName | String | '\_\_ud'      |

**Usage**

```js
_ud("create", "exampleid", "auto", {
    allowLinker: true,
    linkerName: "__udshare"
});
```

---

### Base URL

The URL to send tracking data. Almost cases, _DON'T_ need specify this feild.

| Field Name | Type   | Default Value             |
| :--------- | :----- | :------------------------ |
| baseUrl    | String | 'https://v1.userdive.com' |

---

### Cookie Domain

The domain used to store the agent cookie.
You can using `'auto'` as this field value.
When using 'auto', agent automatically determine the best cookie domain to use.

| Field Name   | Type   | Default Value |
| :----------- | :----- | :------------ |
| cookieDomain | String | _None_        |

**Usage**

```js
_ud("create", "exampleid", "developers.userdive.com");
```

---

### Cookie Expires

The expires times of agent cookie (days).

| Field Name    | Type    | Default Value |
| :------------ | :------ | :------------ |
| cookieExpires | Integer | 730           |

**Usage**

```js
_ud("create", "exampleid", "auto", { cookieExpires: 900 });
```

---

### Cookie Name

The name of agent cookie.

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| cookieName | String | '\_ud2'       |

**Usage**

```js
_ud("create", "exampleid", "auto", { coookieName: "ud_agent" });
```

---

## Field Object

### Custom Dimensions

You defined analytics dimension.

| Field Name       | Type   | Default Value |
| :--------------- | :----- | :------------ |
| dimensions[0-9]+ | String | _None_        |

For detail, please see [custom dimensions](./custom-variables.html).

---

### Page

Specify the full URL to associate for tracking.

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| page       | String | location.href |

**Usage**

```js
_ud("set", "page", "http://developers.userdive.com/page/?p=1");
```

---

## Event Tracking

Agent can track events in page. The event data does not cache, and the send process will take immediate.
For detail, please see [Event Tracking](./events.html).

```js
_ud("send", "event", {
    eventCategory: "Category",
    eventAction: "Action",
    eventLabel: "Label",
    eventValue: 1000
});
```

### Event Category

Specifies event category. Must not be empty.

| Field         | Type   | Default Value | MaxLength |
| :------------ | :----- | :------------ | :-------- |
| eventCategory | String | _None_        | 150       |

### Event Action

Specifies event action. Must not be empty.

| Field       | Type   | Default Value | MaxLength |
| :---------- | :----- | :------------ | :-------- |
| eventAction | String | _None_        | 500       |

### Event Label

Specifies event label. Optional feild.

| Field      | Type   | Default Value | MaxLength |
| :--------- | :----- | :------------ | :-------- |
| eventLabel | String | _None_        | 500       |

### Event Value

Specifies event value. Optional, and must not be negative value.

| Field      | Type    | Default Value | MaxLength |
| :--------- | :------ | :------------ | :-------- |
| eventValue | Integer | _None_        | -         |
