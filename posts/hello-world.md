---
title: HelloWorld
date: 2025-06-11
tags: [HelloWorld, vue]
pinned: true
head:
  - - meta
    - name: description
      content: Mozhai-theme-bluearchive HelloWorld
  - - meta
    - name: keywords
      content: Mozhai theme bluearchive HelloWorld
---
所有的起端都是从一个 HelloWorld 开始

---

# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by Mozhai.

## Syntax Highlighting

Mozhai provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
