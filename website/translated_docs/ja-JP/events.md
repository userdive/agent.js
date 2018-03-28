---
id: イベント
title: イベントのトラッキング
---
| フィールド         | 型       | 必須 | 説明                                     |
|:------------- |:------- |:-- |:-------------------------------------- |
| eventCategory | 文字列     | はい | イベントのカテゴリを指定します。空白にすることはできません。         |
| eventAction   | 文字列     | はい | イベントのアクションを指定します。空白にすることはできません。        |
| eventLabel    | String  | No | イベントのラベルを指定します。                        |
| eventValue    | Integer | No | Set the event action. Not be nagative. |

## Send Event Data

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