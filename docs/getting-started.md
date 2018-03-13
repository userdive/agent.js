---
id: getting-started
title: Getting started
---

You use [agent.js](https://cdn.userdive.com/agent.js) to measure the action of USERDIVE’s user.
In the following, I explain a method to add to for a site.

## Setting of the HTML `<script>` tag

We explain a method to set the following HTML `<script>` tag for tracking the site.
We recommend that you list this before `</body>` tag of the site.

The following `id` is ID published by every project.
An account of USERDIVE is necessary to publish it.

```html
<script>
!function(e,t,s,n,a,r,c,i){e[a]=e[a]||function(){(e[a].q=e[a].q||[]).push(arguments)},c=t.createElement(s),i=t.getElementsByTagName(s)[0],
c.async=1,c.src=n,c.charset=r,c.setAttribute("data-ud-namespace",a),i.parentNode.insertBefore(c,i)}
(window,document,"script","https://cdn.userdive.com/agent.js","_ud","UTF-8");
_ud("create","id","auto");
_ud("send","pageview");
</script>
```
