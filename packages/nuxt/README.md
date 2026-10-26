# CodeX Icons Nuxt module

This module simplifies using the [`@davidabou/icons`](https://github.com/davidabou/codex-icons) pack (an extended fork of CodeX Icons) in Nuxt projects.

[![codex-icons-nuxt](./../../showcase.png "CodeX Icons showcase")](https://github.com/davidabou/codex-icons/tree/master/packages/nuxt)

## Features

1. 💖 Dynamic loading
2. 💝 Coloring
3. 💞 HMR (reloading on update in dev mode)

## Installation

1. Get the package

```bash
bun add @davidabou/nuxt-icons
```

2. Add module to the `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@davidabou/nuxt-icons'
  ]
})
```

## Usage

Use the `codex-icon` component with the `name` property which should be one of the [list](https://github.com/davidabou/codex-icons#list-of-icons).

```vue
<codex-icon name="IconHeart" />
```

## Properties

There are few properties available for component:

| prop | type | description |
| -- | -- | -- |
| `name` | string | Required. Name of icon from the `@davidabou/icons` pack |
| `class` | string | Class name to be added to the icon wrapper |
| `size` | number | Icon width and height value |

## Credits

Based on [`@codexteam/nuxt-icons`](https://github.com/codex-team/icons/tree/master/packages/nuxt) by [CodeX](https://codex.so), released under the MIT license. This fork is not affiliated with or endorsed by CodeX.
