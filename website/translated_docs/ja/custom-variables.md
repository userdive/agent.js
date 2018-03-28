---
id: カスタム変数
title: カスタムディメンション
---
| フィールド            | 型   | 必須  | 説明                             |
|:---------------- |:--- |:--- |:------------------------------ |
| dimensions[0-9]+ | 文字列 | いいえ | カスタム変数をセットできます。最大のインデックスは20です。 |

## データ送信

```js
_ud("send", "pageview", {
    dimension15: "custom dimension 15 data"
});
```

## データセット

```js
_ud("set", "dimension5", "custom dimension data");
```

複数のディメンションを`set`するには、以下のようにします

```js
_ud("set", {
    dimension5: "custom dimension data",
    dimension10: "custom dimension data"
});
```