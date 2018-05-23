---
id: linker-plugin
title: Linker
---

The linker plugin simplifies the process of implementing cross-domain tracking for agent.js.

## Cross-domain tracking

Cross-domain tracking works by sharing a unique client ID between a source domain and a destination domain.

The linker add query parameter to URL to share ID. The tracker can use the parameter to identify client.

## Automatically adding linker parameters

### Set up

You can load script file that bundled linker like below.

```html
<script src="//cdn.userdive.com/linker.js" async></script>
```

And to use linker plugin, you should register it to agent via invoke `require` command.

```js
_ud("require", "linker");
```

---

### Linking with autoLink

To set up cross-domain auto linking on the source domain call `autoLink` method.

The `autoLink` method should be call via the [command queue](./command-queue.html#command-signature).

**Usage**

```js
_ud("[trackerName.]linker:autoLink", domains);
```

**Parameters**

| Name    | Type                 | Required | Description                                                       |
| :------ | :------------------- | :------- | :---------------------------------------------------------------- |
| domains | Array<string/RegExp> | Yes      | An array of strings or regular expressions, matching to hostname. |

## Configuring a site to accept linker parameters

For sharing client ID via [linker parameter](./field-reference.html#linker-name) on souce domain, use `autoLink` like below.

```js
// on source domain
_ud("create", "exampleid", "auto");
_ud("require", "linker");
_ud("linker:autoLink", ["destination-domain.example.com"]);
```

For identify client, [allowLinker field](./field-reference.html#allow-linker-parameter) must set to true on destination domain.

```js
// on destination domain
_ud("create", "exampleid", "auto", { allowLinker: true });
```

## Bi-directional cross-domain tracking

You should create tracker that allowed linker, and enable to auto linking.

**On a domain**

```js
_ud("create", "exampleid", "auto", { allowLinker: true });
_ud("require", "linker");
_ud("linker:autoLink", ["ther-first-domain.example.com"]);
```

**On another domain**

```js
_ud("create", "exampleid", "auto", { allowLinker: true });
_ud("require", "linker");
_ud("linker:autoLink", ["ther-second-domain.example.net"]);
```

### Using single snippet

The `autoLink` method can accept domains list including self one.
To simplify snippet for tracking, You can use same it in each domains, like below.

```js
_ud("create", "exampleid", "auto", { allowLinker: true });
_ud("require", "linker");
_ud("linker:autoLink", [
    "ther-first-domain.example.com",
    "ther-second-domain.example.net"
]);
```
