---
layout: home

hero:
  name: "DriverPro"
  text: "Organize suas finanças e aumente seus lucros"
  tagline: "Sistema inteligente para motoristas de aplicativo - Controle total pelo WhatsApp!"
  image:
    src: https://i.imgur.com/GuQExvV.png
    alt: DriverPro Dashboard

---

<script setup>
import { ref, onMounted } from 'vue'

// Estado para o modal de imagem e vídeos
const activeImage = ref(null)
const isModalOpen = ref(false)
const zoomLevel = ref(1)
const isFullscreen = ref(false)
const isDragging = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const imagePosition = ref({ x: 0, y: 0 })

// Verificar se estamos no navegador
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

// Verificar se estamos na versão compilada (dist)
const isDistVersion = isBrowser && window.location.href.includes('/dist/')

// Função para abrir o modal de imagem
function openImageModal(imageUrl) {
  if (!isBrowser) return
  
  activeImage.value = imageUrl
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Impede rolagem
  zoomLevel.value = 1 // Reset zoom level
  isFullscreen.value = false // Reset fullscreen state
  imagePosition.value = { x: 0, y: 0 } // Reset da posição da imagem
}

// Função para fechar o modal de imagem
function closeImageModal() {
  if (!isBrowser) return
  
  isModalOpen.value = false
  document.body.style.overflow = '' // Restaura rolagem
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
}

// Funções para arrastar a imagem (pan)
function startDrag(event) {
  if (!isBrowser || zoomLevel.value <= 1) return // Não arrastar quando não está com zoom
  
  isDragging.value = true
  const pageX = event.pageX || event.touches?.[0].pageX
  const pageY = event.pageY || event.touches?.[0].pageY
  
  dragStart.value = { 
    x: pageX - imagePosition.value.x, 
    y: pageY - imagePosition.value.y 
  }
  
  // Mudar o cursor
  event.target.style.cursor = 'grabbing'
}

function doDrag(event) {
  if (!isBrowser || !isDragging.value) return
  
  const pageX = event.pageX || event.touches?.[0].pageX
  const pageY = event.pageY || event.touches?.[0].pageY
  
  // Calcular a nova posição
  imagePosition.value = {
    x: pageX - dragStart.value.x,
    y: pageY - dragStart.value.y
  }
  
  // Prevenir seleção de texto durante o arrasto
  event.preventDefault()
}

function stopDrag(event) {
  if (!isBrowser || !isDragging.value) return
  
  isDragging.value = false
  
  // Restaurar o cursor
  if (event.target) {
    event.target.style.cursor = 'grab'
  }
}

// Função para aumentar o zoom
function zoomIn() {
  if (zoomLevel.value < 3) {
    zoomLevel.value += 0.5
  }
}

// Função para diminuir o zoom
function zoomOut() {
  if (zoomLevel.value > 0.5) {
    zoomLevel.value -= 0.5
    
    // Se voltar para zoom normal, resetar a posição
    if (zoomLevel.value <= 1) {
      imagePosition.value = { x: 0, y: 0 }
    }
  }
}

// Função para resetar o zoom
function resetZoom() {
  zoomLevel.value = 1
  imagePosition.value = { x: 0, y: 0 }
}

// Função para alternar o modo de tela cheia
function toggleFullscreen() {
  if (!isBrowser) return

  if (!document.fullscreenElement) {
    const modalElement = document.querySelector('.image-modal')
    if (modalElement) {
      modalElement.requestFullscreen().catch(err => {
        console.error(`Erro ao tentar entrar em tela cheia: ${err.message}`)
      })
    }
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// Configurar animações de rolagem
function setupScrollAnimations() {
  if (!isBrowser) return
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated')
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el)
  })
}

// Carregar screenshots
function setupScreenshots() {
  if (!isBrowser) return
  
  // Apenas aplicar na versão publicada
  if (window.location.href.includes('/dist/') || document.location.pathname === '/' || document.location.pathname === '/index.html') {
    // Mapeamento das seções para URLs de imagens
    const screenshotUrls = {
      dashboard: 'https://i.imgur.com/jnaXVt6.png',
      lancamentos: 'https://i.imgur.com/OmB12bG.png',
      metas: 'https://i.imgur.com/mUW76mn.png'
    }
    
    // Selecionar todos os contêineres de screenshot
    const containers = document.querySelectorAll('.screenshot-container[data-section]')
    
    // Para cada contêiner, verificar a seção e adicionar a imagem correspondente
    containers.forEach(container => {
      const section = container.getAttribute('data-section')
      if (screenshotUrls[section]) {
        // Limpar o contêiner
        container.innerHTML = ''
        
        // Criar e adicionar a imagem
        const img = document.createElement('img')
        img.src = screenshotUrls[section]
        img.alt = `Screenshot da seção ${section}`
        img.loading = 'lazy'
        container.appendChild(img)
        
        // Adicionar a classe has-image
        container.classList.add('has-image')
        
        // Adicionar evento de clique para abrir o modal
        container.addEventListener('click', () => {
          openImageModal(screenshotUrls[section])
        })
      }
    })
  }
}

// Função para configurar vídeos responsivos
function setupResponsiveVideos() {
  if (!isBrowser) return
  
  const videoContainers = document.querySelectorAll('.video-container')
  
  videoContainers.forEach(container => {
    const iframe = container.querySelector('iframe')
    if (iframe) {
      // Ajustar tamanho baseado na proporção do vídeo
      const videoType = iframe.getAttribute('data-video-type')
      if (videoType === 'short') {
        // Implementação segura
      }
    }
  })
}

// Função para carregar a imagem do hero
function loadSavedHeroImage() {
  if (!isBrowser) return
  
  // Na versão dist, sempre usar a imagem fixa do hero
  if (window.location.href.includes('/dist/') || document.location.pathname === '/' || document.location.pathname === '/index.html') {
    setTimeout(() => {
      const heroImage = document.querySelector('.VPImage.image-src')
      if (heroImage) {
        heroImage.src = 'https://i.imgur.com/GuQExvV.png'
      }
    }, 500)
    return
  }
  
  try {
    const savedHeroImage = localStorage.getItem('hero_image')
    if (savedHeroImage) {
      try {
        // Tentar analisar como JSON primeiro (formato novo)
        const heroData = JSON.parse(savedHeroImage)
        // Atualizar imagem do hero
        setTimeout(() => {
          const heroImage = document.querySelector('.VPImage.image-src')
          if (heroImage) {
            heroImage.src = heroData.url
          }
        }, 500) // Pequeno delay para garantir que o DOM está pronto
      } catch (e) {
        // Formato antigo - apenas a URL
        setTimeout(() => {
          const heroImage = document.querySelector('.VPImage.image-src')
          if (heroImage) {
            heroImage.src = savedHeroImage
          }
        }, 500)
      }
    }
  } catch (e) {
    // Ignora erros
  }
}

// Na inicialização do componente
onMounted(() => {
  if (!isBrowser) return
  
  // Setup para animações de rolagem
  setupScrollAnimations()
  
  // Carregar e mostrar screenshots
  setupScreenshots()
  
  // Fechar o modal com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isModalOpen.value) {
      closeImageModal()
    }
  })
  
  // Configurar os iframes dos vídeos responsivamente
  setupResponsiveVideos()
  
  // Carregar a imagem do hero salva no localStorage
  loadSavedHeroImage()
})
</script>

<style>
/* Estilos para animações de scroll */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.show {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    transition: none;
  }
}

/* Ajuste da imagem do hero */
:root {
  --vp-home-hero-image-background-image: linear-gradient(-45deg, #3451b2 50%, #4f74ff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

.VPHomeHero .container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.VPHomeHero .main {
  max-width: 40%;
  flex: 1;
}

.VPHomeHero .image {
  max-width: 60%;
  flex: 1;
  position: relative;
}

.VPHomeHero .image-container {
  max-width: 100%;
  height: auto;
}

.VPHomeHero .image-src {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

@media (max-width: 960px) {
  .VPHomeHero .container {
    flex-direction: column;
  }
  
  .VPHomeHero .main {
    max-width: 100%;
    text-align: center;
  }
  
  .VPHomeHero .image {
    max-width: 80%;
    margin-top: 2rem;
  }
}

/* Estilos para seções */
.section {
  padding: 4rem 0;
  scroll-margin-top: 4rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Estilos para cards de recursos */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.feature-card {
  padding: 2rem;
  border-radius: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Ícone do WhatsApp para o card de lançamentos */
.whatsapp-icon-feature {
  display: inline-flex;
  width: 40px;
  height: 40px;
  background-color: #25D366;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  box-shadow: 0 3px 10px rgba(37, 211, 102, 0.3);
}

.whatsapp-icon-feature svg {
  width: 24px;
  height: 24px;
}

/* Ícone do Calendário para o card de lançamentos */
.calendar-icon-feature {
  display: inline-flex;
  width: 40px;
  height: 40px;
  background-color: #4F74FF;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  box-shadow: 0 3px 10px rgba(79, 116, 255, 0.3);
}

.calendar-icon-feature svg {
  width: 24px;
  height: 24px;
}

/* Estilos para contêineres de screenshots */
.screenshot-container {
  border-radius: 8px;
  overflow: hidden;
  margin: 1rem 0;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.screenshot-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.screenshot-container img {
  width: 100%;
  display: block;
  transition: transform 0.3s;
}

.screenshot-container:hover img {
  transform: scale(1.05);
}

.screenshot-container::after {
  content: "Clique para ampliar";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s;
}

.screenshot-container:hover::after {
  opacity: 1;
}

.screenshot-container:not(.has-image)::after {
  content: "Sem imagem disponível";
  opacity: 1;
  background: transparent;
  color: var(--vp-c-text-2);
}

/* Modal de imagem */
.image-modal {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
  padding: 1rem;
  box-sizing: border-box;
  overflow: hidden;
}

.image-modal.active {
  opacity: 1;
  visibility: visible;
}

.image-modal-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-modal-content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  transform-origin: center;
  cursor: grab;
  user-select: none;
  -webkit-user-drag: none;
}

.image-modal-content img:active {
  cursor: grabbing;
}

.fullscreen .image-modal-content img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.image-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
  z-index: 10001;
}

.image-modal-close:hover {
  transform: rotate(90deg);
  background: rgba(255, 0, 0, 0.5);
}

.image-modal-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 10001;
}

.image-modal-button {
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s;
}

.image-modal-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.image-modal-button svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

@media (max-width: 768px) {
  .image-modal-controls {
    bottom: 10px;
  }
  
  .image-modal-close {
    top: 10px;
    right: 10px;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .section {
    padding: 2rem 0;
  }
}

/* Nova seção de vídeos demonstração */
.videos-demo {
  margin: 3rem auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.videos-demo h2 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
}

.videos-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.video-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  background: var(--vp-c-bg-soft);
  padding-bottom: 1rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.video-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.video-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.video-wrapper iframe {
  border: none;
  width: 100%;
}

.video-info {
  padding: 1rem;
}

.video-info h3 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.video-info p {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Estilos para a nova seção simplificada de WhatsApp */
.whatsapp-simplificado {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #f0f4f9, #e6eef8);
  margin: 4rem 0;
  border-radius: 12px;
  text-align: center;
}

.whatsapp-simplificado h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #25D366, #128C7E);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.whatsapp-simplificado p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.whatsapp-features {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-item {
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  width: 220px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: transform 0.3s;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item .icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.whatsapp-action {
  margin-top: 2rem;
}

.whatsapp-action .cta-button {
  background: linear-gradient(90deg, #25D366, #128C7E);
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 8px;
  text-decoration: none;
  display: inline-block;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  transition: all 0.3s;
}

.whatsapp-action .cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.4);
}

/* Estilos para os cards de contato */
.contact-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.contact-icon {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-icon svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.whatsapp-icon {
  background-color: rgba(37, 211, 102, 0.1);
}

.email-icon {
  background-color: rgba(66, 133, 244, 0.1);
}

.contact-link {
  margin-top: 1rem;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
  text-decoration: none;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.contact-link:hover {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-card.contact-card h3 {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}
</style>

<!-- Seção de Vídeos Demonstração -->
<div class="videos-demo animate-on-scroll">
  <h2>Vídeos Demonstração</h2>
  <div class="videos-container">
    <div class="video-container">
      <div class="video-wrapper">
        <iframe 
          width="560" 
          height="315" 
          src="https://www.youtube.com/embed/rjY3rwkuBBI" 
          title="Uso da plataforma DriverPro" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          data-video-type="normal">
        </iframe>
      </div>
      <div class="video-info">
        <h3>Uso da plataforma</h3>
        <p>Veja como é fácil utilizar o sistema DriverPro para gerenciar suas finanças</p>
      </div>
    </div>
    <div class="video-container">
      <div class="video-wrapper">
        <iframe 
          width="315" 
          height="560" 
          src="https://www.youtube.com/embed/8hdOoWCJTjg" 
          title="Uso do DriverPro via WhatsApp" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen
          data-video-type="short">
        </iframe>
      </div>
      <div class="video-info">
        <h3>Uso via WhatsApp</h3>
        <p>Veja como é simples gerenciar suas finanças diretamente pelo WhatsApp</p>
      </div>
    </div>
  </div>
</div>

<div class="section animate-on-scroll" id="problema">
  <div class="container">
    <h2>O Problema</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>Desorganização Financeira</h3>
        <p>Motoristas de aplicativo enfrentam dificuldades para controlar gastos e receitas, perdendo dinheiro por falta de visibilidade clara sobre suas finanças.</p>
      </div>
      <div class="feature-card">
        <h3>Falta de Planejamento</h3>
        <p>Ausência de metas claras e estratégias objetivas para maximizar ganhos, resultando em jornadas excessivas e baixa rentabilidade.</p>
      </div>
      <div class="feature-card">
        <h3>Decisões Imprecisas</h3>
        <p>Sem dados consolidados, motoristas tomam decisões baseadas em intuição, não conseguindo identificar padrões e oportunidades de otimização.</p>
      </div>
    </div>
  </div>
</div>

<!-- Nova seção simplificada de WhatsApp -->
<div class="whatsapp-simplificado">
  <h2>Gestão financeira pelo WhatsApp</h2>
  <p>Controle suas finanças sem complicação, diretamente no app que você já usa todos os dias</p>
  
  <div class="whatsapp-features">
    <div class="feature-item">
      <div class="icon">📸</div>
      <p>Envie <strong>fotos</strong> dos comprovantes</p>
    </div>
    <div class="feature-item">
      <div class="icon">🎙️</div>
      <p>Mande <strong>áudios</strong> com seus ganhos</p>
    </div>
    <div class="feature-item">
      <div class="icon">📊</div>
      <p>Receba <strong>relatórios</strong> diários</p>
    </div>
    <div class="feature-item">
      <div class="icon">💸</div>
      <p>Acompanhe seus <strong>lucros reais</strong></p>
    </div>
  </div>
  
  <div class="whatsapp-action">
    <a href="https://api.whatsapp.com/send/?phone=5541999751171&text&type=phone_number&app_absent=0" class="cta-button">Experimente Grátis por 7 Dias</a>
  </div>
</div>

<div class="section animate-on-scroll" id="features">
  <div class="container">
    <h2>Funcionalidades</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>📊 Dashboard Completo</h3>
        <p>Visão consolidada com indicadores financeiros, métricas de desempenho e visualizações gráficas para tomada de decisões informadas.</p>
        <ul>
          <li>Indicadores em tempo real</li>
          <li>Análise de lucro por km</li>
          <li>Comparativo meta vs. realizado</li>
        </ul>
        <div class="screenshot-container" data-section="dashboard">
          <div>Sem imagem disponível</div>
        </div>
      </div>
      <div class="feature-card">
        <h3>🎯 Gestão de Metas</h3>
        <p>Estabeleça e acompanhe metas financeiras com progresso em tempo real e recomendações personalizadas.</p>
        <ul>
          <li>Metas diárias e semanais</li>
          <li>Análise de desempenho</li>
          <li>Notificações motivacionais</li>
        </ul>
        <div class="screenshot-container" data-section="metas">
          <div>Sem imagem disponível</div>
        </div>
      </div>
      <div class="feature-card">
        <h3>
          <div class="calendar-icon-feature">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#FFFFFF" d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v320c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64h-40V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 448V192h416v256c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16zm96-192h64c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16h-64c-8.8 0-16-7.2-16-16v-64c0-8.8 7.2-16 16-16z"/></svg>
          </div>
          Resultados Diários
        </h3>
        <p>Pensada para <strong>registrar e acompanhar os lançamentos diários</strong> com cálculos automáticos e de desempenho.</p>
        <ul>
          <li>KM rodado e horas trabalhadas</li>
          <li>Cálculo automático de custos, ganhos por KM e por hora</li>
          <li>Gráficos de desempenho diário</li>
        </ul>
        <div class="screenshot-container" data-section="lancamentos">
          <div>Sem imagem disponível</div>
        </div>
      </div>
    </div>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>📈 Análise Inteligente</h3>
        <p>Relatórios detalhados e insights que revelam tendências e oportunidades para otimizar seus ganhos.</p>
        <ul>
          <li>Análise de custos por km</li>
          <li>Horários mais rentáveis</li>
          <li>Comparativos históricos</li>
        </ul>
      </div>
      <div class="feature-card">
        <h3>⚙️ Automatização</h3>
        <p>Recursos automáticos que economizam seu tempo e tornam a gestão financeira mais simples e eficiente.</p>
        <ul>
          <li>Cálculo automático de custos</li>
          <li>Sugestão inteligente de categorias</li>
          <li>Lembretes personalizados</li>
        </ul>
      </div>
      <div class="feature-card">
        <h3>📲 Acessibilidade</h3>
        <p>Use nossa plataforma do seu jeito, com diferentes opções de acesso para se adaptar à sua rotina.</p>
        <ul>
          <li>Interface amigável no app</li>
          <li>Integração com WhatsApp</li>
          <li>Notificações personalizáveis</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div class="section animate-on-scroll" id="planos">
  <div class="container">
    <h2>Planos</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <h3>Básico</h3>
        <p><strong>R$ 14,99/mês</strong></p>
        <p>Comece a organizar suas finanças</p>
        <ul>
          <li>✅ Lançamentos manuais via app</li>
          <li>✅ Dashboard básico</li>
          <li>✅ Controle de metas simples</li>
          <li>✅ Relatórios essenciais</li>
          <li>✅ Suporte por e-mail</li>
          <li>❌ Lançamentos e Resultados Diários via WhatsApp</li>
          <li>❌ Reconhecimento de comprovantes</li>
        </ul>
        <a href="#" class="cta-button">Assinar Agora</a>
      </div>
      <div class="feature-card highlighted">
        <h3>Pro</h3>
        <p><strong>R$ 19,99/mês</strong></p>
        <p>Controle completo e automação</p>
        <ul>
          <li>✅ Todas as funcionalidades do plano Básico</li>
          <li>✅ Lançamentos e Resultados Diários via WhatsApp</li>
          <li>✅ Reconhecimento de comprovantes</li>
          <li>✅ Dashboard completo</li>
          <li>✅ Metas avançadas</li>
          <li>✅ Relatórios detalhados</li>
          <li>✅ Suporte prioritário</li>
        </ul>
        <a href="#" class="cta-button primary">Assinar Agora</a>
      </div>
      <div class="feature-card">
        <h3>Premium</h3>
        <p><strong>Em breve</strong></p>
        <p>Experiência VIP com recursos exclusivos</p>
        <ul>
          <li>✅ Todas as funcionalidades do plano Pro</li>
          <li>✅ Recursos avançados de gestão</li>
          <li>✅ Relatórios personalizados</li>
          <li>✅ Suporte VIP</li>
          <li>✅ Funcionalidades exclusivas</li>
        </ul>
        <a href="#" class="cta-button">Lista de Espera</a>
      </div>
    </div>
  </div>
</div>

<div class="section animate-on-scroll" id="contato">
  <div class="container">
    <h2>Entre em Contato</h2>
    <div class="feature-grid">
      <div class="feature-card contact-card">
        <div class="contact-icon whatsapp-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="48" height="48"><path fill="#25D366" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
        </div>
        <h3>WhatsApp</h3>
        <p>Fale conosco pelo WhatsApp</p>
        <a href="https://wa.me/5541999751171" target="_blank" rel="noopener" class="contact-link">Enviar mensagem</a>
      </div>
      <div class="feature-card contact-card">
        <div class="contact-icon email-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="48" height="48"><path fill="#4285F4" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>
        </div>
        <h3>Email</h3>
        <p>Envie-nos um email</p>
        <a href="mailto:ramonpmendesx@gmail.com" class="contact-link">ramonpmendesx@gmail.com</a>
      </div>
    </div>
  </div>
</div>

<div class="section animate-on-scroll testimonial-section" id="depoimentos">
  <div class="container">
    <h2>O Que Os Motoristas Estão Dizendo</h2>
    <div class="feature-grid">
      <div class="feature-card testimonial">
        <div class="testimonial-content">
          <p>"Com o DriverPro, finalmente sei quanto estou lucrando de verdade. Parei de trabalhar horas extras desnecessárias e aumentei meu lucro em 30%. Melhor investimento que já fiz!"</p>
        </div>
        <div class="testimonial-author">
          <p><strong>Carlos S.</strong> - Motorista há 3 anos</p>
        </div>
      </div>
      <div class="feature-card testimonial">
        <div class="testimonial-content">
          <p>"O sistema de Lançamentos e Resultados Diários é simplesmente revolucionário! Envio uma foto do painel, lanço meus dados e já vejo todos os cálculos prontos. Economizo pelo menos 30 minutos por dia com isso."</p>
        </div>
        <div class="testimonial-author">
          <p><strong>Ana P.</strong> - Motorista há 2 anos</p>
        </div>
      </div>
      <div class="feature-card testimonial">
        <div class="testimonial-content">
          <p>"Experimentei com a garantia de 7 dias, achando que pediria reembolso. Hoje, não consigo imaginar trabalhar sem o DriverPro. Completamente transformou minha visão financeira!"</p>
        </div>
        <div class="testimonial-author">
          <p><strong>Marcos L.</strong> - Motorista há 5 anos</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal para visualização de imagens -->
<div class="image-modal" :class="{ active: isModalOpen, fullscreen: isFullscreen }">
  <div class="image-modal-content">
    <button class="image-modal-close" @click="closeImageModal" title="Fechar (ESC)">×</button>
    <img 
      v-if="activeImage" 
      :src="activeImage" 
      alt="Imagem ampliada" 
      :style="{ 
        transform: `scale(${zoomLevel})`, 
        translate: `${imagePosition.x}px ${imagePosition.y}px` 
      }" 
      @mousedown="startDrag"
      @mousemove="doDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @touchstart="startDrag"
      @touchmove="doDrag"
      @touchend="stopDrag"
    />
    <div class="image-modal-controls">
      <button class="image-modal-button" @click="zoomOut" title="Diminuir zoom">
        <svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"></path></svg>
      </button>
      <button class="image-modal-button" @click="resetZoom" title="Resetar zoom">
        <svg viewBox="0 0 24 24"><path d="M15,3l2.3,2.3l-2.89,2.87l1.42,1.42L18.7,6.7L21,9V3H15z M3,9l2.3-2.3l2.87,2.89l1.42-1.42L6.7,5.3L9,3H3V9z M9,21 l-2.3-2.3l2.89-2.87l-1.42-1.42L5.3,17.3L3,15v6H9z M21,15l-2.3,2.3l-2.87-2.89l-1.42,1.42l2.89,2.87L15,21h6V15z"></path></svg>
      </button>
      <button class="image-modal-button" @click="zoomIn" title="Aumentar zoom">
        <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
      </button>
      <button class="image-modal-button" @click="toggleFullscreen" title="Tela cheia">
        <svg v-if="!isFullscreen" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path></svg>
        <svg v-else viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></path></svg>
      </button>
    </div>
  </div>
</div>
