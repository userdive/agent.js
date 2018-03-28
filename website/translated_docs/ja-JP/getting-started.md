---
id: はじめに
title: はじめに
---
USERDIVE でアクションを測定するために[agent.js](https://cdn.userdive.com/agent.js) を使用します。 以下に、サイトへの追加方法を記載します。

## `<script>` タグの設定

トラッキング対象のサイトに`<script>` タグを設定する方法をいかに示します。 サイトHTML内の`</body>` タグよりも前に記述することを推奨します。

The following `id` is ID published by every project. An account of USERDIVE is necessary to publish it.

```html
<script>
!function(e,t,s,n,a,r,c,i){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},c=t.createElement(s),i=t.getElementsByTagName(s)[0],
c.async=1,c.src=n,c.charset=r,c.setAttribute("data-ud-namespace",a),i.parentNode.insertBefore(c,i)}
(window,document,"script","https://cdn.userdive.com/agent.js","_ud","UTF-8");
_ud("create","id","auto");
_ud("send","pageview");
</script>
```