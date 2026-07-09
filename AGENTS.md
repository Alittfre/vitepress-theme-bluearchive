# AGENTS.md

## Commands

```bash
pnpm install          # required package manager (pnpm-lock.yaml)
pnpm run dev          # start dev server
pnpm run build        # build to .vitepress/dist
pnpm run preview      # preview built output
pnpm exec prettier --write .   # format (no lint/typecheck/test scripts exist)
```

No tsconfig.json, no ESLint, no tests. Less is used for styles, not SCSS.

## Architecture

This is a **VitePress 1.x custom theme** — not a standalone app. The theme entrypoint is `.vitepress/theme/index.ts` (exports `Layout` + `enhanceApp`).

### Key files

| Path | Role |
|---|---|
| `.vitepress/config.mts` | VitePress config, `ThemeConfig` interface, markdown plugins |
| `.vitepress/theme/Layout.vue` | Root layout, routes by `page.filePath` (`index.md` / `tags/index.md` / post) |
| `.vitepress/theme/utils/posts.data.mts` | VitePress data loader — reads `posts/*.md`, parses frontmatter with `gray-matter`, populates `data` export |
| `.vitepress/theme/store/index.ts` | Vue 3 reactive state (selectedPosts, currTag, currPage, splashLoading, fireworksEnabled, etc.) |

### Data flow

- Posts live as `.md` files in `posts/`. Frontmatter fields: `title`, `date`, `tags`, `pinned`, `cover`, `excerpt` (before `---` separator in body).
- `posts.data.mts` loads all posts at build time, sorts pinned-first, then by date descending. The `data` export is consumed by Vue components directly.
- Pagination is client-side with URL query params (`?page=N`, `?tag=X`). The store drives current page/tag state.

### Styling

- **Less** (not SCSS), with scoped styles in Vue SFCs.
- Theme colors are CSS custom properties defined in `.vitepress/theme/styles/vars.less`.
- **Dark mode** uses `html[theme='dark']` selector (not `:root[theme='dark']` or class-based). The `darkMode` state in the store tracks `'light' | 'dark' | 'system'`.
- Background: banner images go in `.vitepress/theme/assets/banner/` (`banner.webp` / `banner_dark.webp`). Background music at same path as `bgm.mp3`.

### Markdown

- Custom plugin: `markdown-it-custom-attrs` adds `data-fancybox="gallery"` to all images (Fancybox lightbox).
- Math: `markdown-it-mathjax3` enabled via `math: true` in config.
- Code highlighting: `solarized-dark` theme, line numbers on.

### Template repo

This repo is designed to be used via "Use this template" on GitHub. Users customize:
- `.vitepress/config.mts` — site title, social links, Gitalk credentials, etc.
- `.vitepress/theme/assets/banner/` — banner images and bgm
- `posts/` — blog content

## Gotchas

- The `ignoreDeadLinks: true` config is set — dead internal links won't break builds.
- The Splash screen blocks scroll during animation; uses `animejs` for fade-out after 1.2–1.5s random delay.
- Spine character player is wrapped in `<ClientOnly>` (SSR-incompatible).
- The `ConvertWebp.sh` script is a todo/helper, not part of the build pipeline.
- Package `type: "module"` — all `.mts`/`.mjs` files use ESM. `__dirname` is polyfilled via `fileURLToPath`.
- `Blueaka` / `Blueaka_Bold` are custom fonts loaded from `public/font/`.
