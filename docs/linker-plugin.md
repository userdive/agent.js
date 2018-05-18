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

### Allow linker

For identify client by [linker parameter](./field-reference.html#linker-name), [allowLinker field](./field-reference.html#allow-linker-parameter) must set to true.

```js
// on destination domain
_ud("create", "exampleid", "auto", { allowLinker: true });
```

---

## Linking with autoLink

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
