---
id: field-reference
title: Field Reference
---

## Agent.js field reference

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

If set true, you can share userId by query parameter in cross-domain tracking.

| Field Name  | Type    | Default Value |
| :---------- | :------ | :------------ |
| allowLinker | boolean | false         |

**Usage**

```js
_ud("create", "exampleid", "auto", { allowLinker: true });
```

---

### Linker Name

The name of userId query parameter.

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
_ud("create", "exampleid", "auto", { cookieDomain: "developers.userdive.com" });
```

---

### Cookie Expires

The expires times of agent cookie (seconds).

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
| cookieName | String | '\_ud'        |

**Usage**

```js
_ud("create", "exampleid", "auto", { coookieName: "ud_agent" });
```

---

### Field Object
