# CLAUDE.md

Fork of [`@codexteam/icons`](https://github.com/codex-team/icons). Goal of this fork: **grow the icon library** while staying strictly faithful to the existing style. A new icon must be visually indistinguishable from the ones already in the set.

## Structure

- `src/icons/*.svg` — **single source of truth**. This is the only place where icons are added or modified.
- `bin/generate.js` — optimizes the SVGs (svgo), generates `src/index.ts`, `dist/icons/Icon*.svg`, the icon table in `README.md` and the `showcase.png` preview (all icons as a grid, rendered with `@resvg/resvg-js`).
- `src/index.ts`, `dist/`, `showcase.png`, the `<!-- BEGIN TABLE_OF_ICONS -->` section of the README — **generated, never edit by hand**.
- `packages/nuxt/` — Nuxt module (`<da-icon name="IconHeart" />`), consumes the main package.

## Commands

```sh
bun run generate   # regenerates index.ts, dist/icons and the README table
bun run build      # generate + vite build (dist/index.mjs, index.umd.js, index.d.ts)
```

After adding an icon: run `bun run build` and check that the report prints `N of N icons were generated`.

## Naming

- File name in **kebab-case**, in English: `arrow-left.svg`, `table-with-headings.svg`.
- The export name is derived automatically: `arrow-left.svg` → `IconArrowLeft`. Do not prefix the file with `icon-`.
- Name = what the icon represents or the action it triggers (`trash`, `copy`, `search`), not its shape.
- Variants: descriptive suffix (`menu` / `menu-small`, `chevron-up` / `chevron-down`, `direction-up-right`).
- Check that no existing icon already covers the need before creating a new one.

## Style guide (strictly enforced)

Values measured on the existing icons (`check`, `plus`, `search`, `picture`, `warning`, `align-left`…).

### Canvas

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
```

- Always **24×24**, `viewBox="0 0 24 24"`, `fill="none"` on the root element.
- **Live area ≈ 14×14, from 5 to 19** on each axis (5px padding). The path (stroke centerline) stays within this area: icons are intentionally **small and airy** inside their square. Do not fill the canvas edge to edge.
- Simple shapes can be even smaller (e.g. `plus` / `cross` / `check`: 7→17 or 8→16; `dot-circle`: circle r=4).
- Optically center the icon on (12, 12).

### Stroke

- `stroke="black"` — svgo converts it to `currentColor` during generation. Never use any other color (no grey, no `#hex`).
- `stroke-width="2"` — **standard weight, non-negotiable**.
- `stroke-linecap="round"` on every open stroke (lines, unclosed paths).
- `stroke-linejoin="round"` whenever a path has corners.
- **No fills**: 100% outline style. Solid dots are drawn with a near-zero-length stroke (see below). Only exception: the media controls (see below).

### Recurring shapes

- **Container rectangle** (picture frame, warning…): `<rect x="5" y="5" width="14" height="14" rx="4" .../>` — rounded corners `rx="4"`.
- **Dots** (menus, "etc."): a near-zero-length path with a thicker stroke:
  ```svg
  <path d="M12.01 12H12" stroke="black" stroke-width="2.6" stroke-linecap="round"/>
  ```
  `2.6` is the **only** allowed exception to `stroke-width="2"`, and only for dots.
- **Small accent dot** (sun in `picture`, dot in `warning`): near-zero-length path with `stroke-width="2"`.
- **Text lines** (`align-*`, `list-*`): horizontal lines spaced 5px apart (y = 7, 12, 17), from x=5 to x=17/19.
- **Curves**: prefer soft curves and rounded ends; no harsh sharp angles.

### Media controls (filled exception)

`play`, `pause` and `stop` are **solid shapes without a container**, by convention for player controls. Each shape uses `fill="black"` **plus** a matching `stroke="black" stroke-width="2" stroke-linejoin="round"`, which rounds its corners; svgo turns both into `currentColor`. All three share the same visible height (6→18). Do not extend this filled style to other icons.

### Forbidden

- No colored `fill`, gradients, shadows, filters, `<style>`, CSS classes, `<mask>`/`<clipPath>` unless absolutely necessary.
- No text (`<text>`): letters (H1, B, I…) are drawn as paths.
- No complex `transform` when direct coordinates would do.
- No canvas size other than 24×24, no stroke width other than 2 (except 2.6 for dots).

## Adding an icon — checklist

1. Pick 2–3 similar existing icons (same family or same complexity) as references and re-read them before drawing.
2. Create `src/icons/<kebab-name>.svg` with the canvas above, paths within the 5→19 area, `stroke="black"`, `stroke-width="2"`, `round` caps/joins, no `fill`.
3. Readable coordinates: round to 2 decimals max when possible; snap straight lines to integers/half-integers (crisp rendering).
4. Check consistency with a quick sanity check:
   ```sh
   grep -L 'viewBox="0 0 24 24"' src/icons/*.svg          # should list nothing
   grep -oh 'stroke-width="[^"]*"' src/icons/*.svg | sort | uniq -c
   ```
5. `bun run build`, then visually check the new icon in `showcase.png`, next to the existing ones (also check `dist/icons/Icon<Name>.svg` at 24px **and** 16px).
6. Commit the source SVG **and** the regenerated files (`src/index.ts`, `dist/`, `README.md`, `showcase.png`).

## Misc

- 2-space indentation, LF, final newline (`.editorconfig`).
- The project's package manager is **Bun** (CI: `bun install && bun run build`).
- The generator sorts icons explicitly (code-point order, so `H1`…`H6` come first) and writes POSIX paths in the README, so its output is identical on Windows and Linux. CI regenerates and commits the build on every PR.
- devDependency versions are pinned by `bun.lock`. `vite-plugin-dts@1.x` breaks with recent `@microsoft/api-extractor` versions: do not regenerate the lockfile from scratch without checking `bun run build`.
- Keep upstream compatibility: do not rename/remove existing icons (that would be a breaking change for `IconXxx` imports).
