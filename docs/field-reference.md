---
id: field-reference
title: Field Reference
---

## Agent.js field reference

### Fields for Create

#### Tracking ID

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| trackingId | String | _None_        |

---

#### Cookie Domain

| Field Name   | Type   | Default Value |
| :----------- | :----- | :------------ |
| cookieDomain | String | _None_        |

You can using `'auto'` as this field value.
When using 'auto', agent automatically determine the best cookie domain to use.

---

#### Tracker Name

| Field Name | Type   | Default Value |
| :--------- | :----- | :------------ |
| name       | String | 'default'     |

---

#### Setting Fields Object

| Field Name    | Type    | Default Value             |
| :------------ | :------ | :------------------------ |
| allowLinker   | boolean | false                     |
| linkerName    | String  | '\_\_ud'                  |
| baseUrl       | String  | 'https://v1.userdive.com' |
| cookieDomain  | String  | _None_                    |
| cookieExpires | Integer | 730                       |
| cookieName    | String  | '\_ud'                    |

### Field Object
