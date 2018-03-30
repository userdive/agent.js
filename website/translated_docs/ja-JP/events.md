---
id: イベント
title: イベントのトラッキング
---
| フィールド         | 型   | 必須  | 説明                              |
|:------------- |:--- |:--- |:------------------------------- |
| eventCategory | 文字列 | はい  | イベントのカテゴリを指定します。空白にすることはできません。  |
| eventAction   | 文字列 | はい  | イベントのアクションを指定します。空白にすることはできません。 |
| eventLabel    | 文字列 | いいえ | イベントのラベルを指定します。                 |
| eventValue    | 整数  | いいえ | イベントの値を指定します。負以外の値にしてください。      |

## イベントデータの送信

```js
_ud("send", "event", {
    eventCategory: "Category",
    eventAction: "Action",
    eventLabel: "Label",
    eventValue: 1000
});
```

```js
_ud("send", {
    hitType: "events",
    eventCategory: "Category",
    eventAction: "Action",
    eventLabel: "Label",
    eventValue: 1000
});
```