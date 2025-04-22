import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'pt-BR',
  title: 'DriverPro',
  description: 'Sistema completo de gestão financeira para motoristas de aplicativo',
  appearance: true,

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }],
    ['meta', { name: 'theme-color', content: '#3451B2' }],
  ],

  themeConfig: {
    nav: [
      { text: 'Início', link: '/' },
      { text: 'Problema', link: '/#problema' },
      { text: 'Solução', link: '/#solucao' },
      { text: 'Funcionalidades', link: '/#features' },
      { text: 'Planos', link: '/#planos' },
      { text: 'Contato', link: '/#contato' },
      { text: 'Admin', link: '/admin' },
    ],

    footer: {
      message: 'Desenvolvido com ❤️ pela equipe DriverPro',
      copyright: '© ' + new Date().getFullYear() + ' DriverPro. Todos os direitos reservados.'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geekan/MetaGPT' },
    ],
  },

  vite: {
    server: {
      strictPort: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./docs/.vitepress/theme/styles/vars.scss";
          `
        }
      }
    }
  },
});
