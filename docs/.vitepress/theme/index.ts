import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import AdminPanel from './components/AdminPanel.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // Add any custom layout slots here if needed in the future
    })
  },
  enhanceApp({ app, router }) {
    // Registrar o componente AdminPanel globalmente
    app.component('AdminPanel', AdminPanel)
    
    // Register any Vue components or add router hooks here
    router.onAfterRouteChanged = () => {
      // Verificar se estamos em um ambiente de navegador e se IntersectionObserver está disponível
      if (typeof window !== 'undefined' && typeof document !== 'undefined' && 'IntersectionObserver' in window) {
        // Re-run intersection observer after route change
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('show')
            }
          })
        }, { threshold: 0.1 })

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          observer.observe(el)
        })
      }
    }
  }
}
