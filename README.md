# VitePress Project Template

This is a VitePress-based static site generator template, ideal for quickly building documentation websites or blogs.

The core functionality is to write content using Markdown, and Vue components are only necessary when customizing the themes or adding specific features.

For user-uploaded Markdown files, can directly copy them to the `docs` appropriate subdirectory and display them.


## Project Structure

```
.
├── .vitepress/            # VitePress configuration files
│   ├── config.ts          # Site configuration
│   └── theme/             # Custom theme
├── public/                # Static assets
├── docs/                  # Documentation content
│   ├── index.md           # Homepage
│   └── guide/             # Guide documentation
└── package.json           # Project dependencies
```

## Install

```shell
pnpm install
```

## Dev
```shell
pnpm run docs:dev
```

## Build

```shell
pnpm run docs:build
```

The build output location for the site is `./.vitepress/dist`

