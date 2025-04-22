# DriverPro

Site do DriverPro, sistema inteligente para motoristas de aplicativo com controle total pelo WhatsApp.

## Sobre o Projeto

DriverPro é uma solução para controle financeiro voltada para motoristas de aplicativo, permitindo o gerenciamento completo de finanças, tanto pela interface web quanto pelo WhatsApp.

## Principais Funcionalidades

- **Dashboard Completo**: Visão consolidada com indicadores financeiros e métricas de desempenho
- **Gestão de Metas**: Estabeleça e acompanhe metas financeiras com progresso em tempo real
- **Lançamentos Diários**: Registre e acompanhe lançamentos com cálculos automáticos de desempenho
- **Integração com WhatsApp**: Controle suas finanças diretamente pelo WhatsApp

## Tecnologias

Este site foi construído usando:

- VitePress
- Vue.js
- JavaScript/TypeScript

## Estrutura do Projeto

- `/docs`: Arquivos fonte do site
- `/docs/.vitepress/dist`: Versão compilada para produção

## Contato

- WhatsApp: [Clique aqui para conversar](https://api.whatsapp.com/send/?phone=5541999751171&text&type=phone_number&app_absent=0)
- Email: ramonpmendesx@gmail.com

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

