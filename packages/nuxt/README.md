# CodeX Icons Nuxt module

[![npm](https://img.shields.io/npm/v/@davidabou/nuxt-icons)](https://www.npmjs.com/package/@davidabou/nuxt-icons)
[![npm downloads](https://img.shields.io/npm/dm/@davidabou/nuxt-icons)](https://www.npmjs.com/package/@davidabou/nuxt-icons)
[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js)](https://nuxt.com)

This module simplifies using the [`@davidabou/icons`](https://github.com/davidabou/icons) pack (an extended fork of CodeX Icons) in Nuxt projects.

[![nuxt-icons](https://raw.githubusercontent.com/davidabou/icons/master/showcase.png "CodeX Icons showcase")](https://github.com/davidabou/icons/tree/master/packages/nuxt)

## Features

1. 💖 Auto-imported `<DaIcon>` component, rendered on the server
2. 💝 Coloring through `currentColor`
3. 💞 Typed icon names, with autocompletion and type errors on unknown names

Requires Nuxt 4.

## Installation

1. Get the package

```bash
bun add @davidabou/nuxt-icons
```

2. Add module to the `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@davidabou/nuxt-icons'
  ]
})
```

## Usage

Use the `DaIcon` component (or `da-icon` in kebab-case) with the `name` property which should be one of the [list](https://github.com/davidabou/icons#list-of-icons).

```vue
<DaIcon name="IconHeart" />
<da-icon name="IconSparkles" :size="20" class="text-primary" />
<DaIcon :name="isOpen ? 'IconChevronUp' : 'IconChevronDown'" />
```

The icon takes the current text color, so it can be colored with CSS `color` or any utility class.

## Properties

| prop | type | description |
| -- | -- | -- |
| `name` | `DaIconName` | Required. Name of icon from the `@davidabou/icons` pack |
| `size` | number | Icon width and height value, `24` by default |

Any other attribute (`class`, `style`, `aria-label`…) is passed to the icon wrapper.

The `DaIconName` type can be imported to type your own props:

```ts
import type { DaIconName } from '@davidabou/nuxt-icons'
```

## Development

```bash
bun install
bun run dev          # playground with hot reload
bun run test:types   # type-check the module and the playground
bun run prepack      # build the module into dist/
```

## Credits

Based on [`@codexteam/nuxt-icons`](https://github.com/codex-team/icons/tree/master/packages/nuxt) by [CodeX](https://codex.so), released under the MIT license. This fork is not affiliated with or endorsed by CodeX.
