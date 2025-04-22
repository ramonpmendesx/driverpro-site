<template>
  <div class="admin-panel">
    <h1 class="admin-title">Imagens</h1>
    <p class="admin-description">Faça upload de imagens ou utilize links externos para exibir nas respectivas seções da página principal.</p>

    <!-- Área de Notificações -->
    <div v-if="notification" class="admin-notification" :class="notification.type">
      <span>{{ notification.message }}</span>
      <button @click="clearNotification" class="admin-notification-close">&times;</button>
    </div>

    <!-- Formulário de Upload -->
    <div class="admin-form">
      <div class="admin-form-group">
        <label for="section-select">Selecione a seção:</label>
        <select id="section-select" v-model="selectedSection" class="admin-select">
          <option value="">Escolha uma seção</option>
          <option v-for="section in sections" :key="section.id" :value="section.id">
            {{ section.name }}
          </option>
        </select>
      </div>

      <!-- Seleção do tipo de origem (upload ou url) -->
      <div class="admin-form-group">
        <label>Escolha a origem da imagem:</label>
        <div class="admin-toggle-group">
          <button 
            @click="imageSource = 'upload'" 
            class="admin-toggle-button" 
            :class="{ active: imageSource === 'upload' }"
          >
            Upload de Arquivo
          </button>
          <button 
            @click="imageSource = 'url'" 
            class="admin-toggle-button" 
            :class="{ active: imageSource === 'url' }"
          >
            Link Externo
          </button>
        </div>
      </div>

      <!-- Input para upload de arquivo -->
      <div v-if="imageSource === 'upload'" class="admin-form-group">
        <label for="image-upload">Selecione uma imagem:</label>
        <input 
          type="file" 
          id="image-upload" 
          ref="fileInput"
          @change="handleFileChange" 
          accept="image/*" 
          class="admin-file-input"
        />
        <p class="admin-hint">Recomendamos imagens em alta resolução para melhor qualidade visual.</p>
      </div>

      <!-- Input para URL externa -->
      <div v-if="imageSource === 'url'" class="admin-form-group">
        <label for="image-url">Informe a URL da imagem:</label>
        <input 
          type="url" 
          id="image-url" 
          v-model="imageUrl" 
          @input="handleUrlChange"
          placeholder="https://exemplo.com/imagem.jpg" 
          class="admin-text-input"
        />
        <p class="admin-hint">Certifique-se de que a URL seja válida e aponte diretamente para uma imagem.</p>
      </div>

      <!-- Pré-visualização -->
      <div v-if="imagePreview" class="admin-preview">
        <h3>Pré-visualização:</h3>
        <div class="admin-preview-container">
          <img :src="imagePreview" alt="Pré-visualização" />
        </div>
      </div>

      <div class="admin-form-group">
        <button 
          @click="saveImage" 
          :disabled="!selectedSection || !imagePreview || isSaving" 
          class="admin-button admin-button-primary"
        >
          {{ isSaving ? 'Salvando...' : 'Salvar Imagem' }}
        </button>
      </div>
    </div>

    <!-- Debug Info - Ajuda a diagnosticar problemas -->
    <div class="admin-debug-info">
      <details>
        <summary>Informações de Debug</summary>
        <p>Seção selecionada: {{ selectedSection || 'Nenhuma' }}</p>
        <p>Origem da imagem: {{ imageSource }}</p>
        <p>Prévia de imagem: {{ imagePreview ? 'Disponível' : 'Não disponível' }}</p>
        <p>URL da imagem: {{ imageUrl || 'Nenhuma' }}</p>
        <p>Imagens salvas: {{ Object.keys(savedImages).join(', ') || 'Nenhuma' }}</p>
        <p>Salvamento em progresso: {{ isSaving ? 'Sim' : 'Não' }}</p>
        <p v-if="lastError">Último erro: {{ lastError }}</p>
        <button @click="clearAllStoredImages" class="admin-button admin-button-danger admin-button-small">
          🧹 Limpar todas as imagens (Emergência)
        </button>
      </details>
    </div>

    <!-- Lista de Imagens Salvas -->
    <div class="admin-saved-images">
      <h2>Imagens Salvas</h2>
      
      <div v-if="!hasImages" class="admin-no-images">
        <p>Nenhuma imagem foi salva ainda.</p>
      </div>
      
      <div v-else class="admin-image-grid">
        <div 
          v-for="(imageData, section) in savedImages" 
          :key="section" 
          class="admin-image-card"
        >
          <div class="admin-image-preview">
            <img :src="imageData.url" :alt="getSectionName(section)" />
          </div>
          <div class="admin-image-info">
            <h3>{{ getSectionName(section) }}</h3>
            <p class="admin-image-source">
              <span v-if="imageData.type === 'url'">🔗 Link Externo</span>
              <span v-else>📁 Upload Local</span>
            </p>
            <div class="admin-image-actions">
              <a :href="imageData.url" target="_blank" class="admin-button admin-button-small">Ver</a>
              <button 
                @click="deleteImage(section)" 
                class="admin-button admin-button-small admin-button-danger"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPanel',
  data() {
    return {
      sections: [
        { id: 'dashboard', name: 'Dashboard' },
        { id: 'lancamentos', name: 'Lançamentos' },
        { id: 'metas', name: 'Metas' },
        { id: 'hero_image', name: 'Imagem Título' }
      ],
      selectedSection: '',
      imageSource: 'upload', // 'upload' ou 'url'
      imageUrl: '',
      imagePreview: null,
      savedImages: {},
      notification: null,
      isSaving: false,
      lastError: null
    }
  },
  computed: {
    hasImages() {
      return Object.keys(this.savedImages).length > 0
    }
  },
  mounted() {
    this.loadImages()
    this.loadSavedHeroImage()
    
    // Verificação de integridade das imagens salvas
    console.log('Status das imagens carregadas:')
    this.sections.forEach(section => {
      const key = section.id === 'hero_image' ? 'hero_image' : `screenshot_${section.id}`
      const hasImage = localStorage.getItem(key) !== null
      console.log(`${section.name}: ${hasImage ? 'Presente' : 'Ausente'}`)
    })
  },
  methods: {
    // Carregar imagens do localStorage
    loadImages() {
      try {
        // Limpar o estado atual para garantir um carregamento limpo
        this.savedImages = {}
        
        // Carregar screenshots normais
        this.sections.forEach(section => {
          const sectionId = section.id
          const storageKey = sectionId === 'hero_image' ? 'hero_image' : `screenshot_${sectionId}`
          const imageDataJson = localStorage.getItem(storageKey)
          
          if (imageDataJson) {
            try {
              // Tentar analisar como JSON primeiro (formato novo)
              const imageData = JSON.parse(imageDataJson)
              this.savedImages[sectionId] = imageData
              console.log(`Imagem carregada como objeto para ${section.name}`)
            } catch (e) {
              // Se falhar, é o formato antigo (apenas string de url)
              this.savedImages[sectionId] = {
                url: imageDataJson,
                type: imageDataJson.startsWith('data:') ? 'upload' : 'url'
              }
              console.log(`Imagem carregada como URL para ${section.name} (formato antigo)`)
            }
          }
        })
        
        console.log('Imagens carregadas:', Object.keys(this.savedImages))
      } catch (error) {
        console.error('Erro ao carregar imagens:', error)
        this.showNotification('Erro ao carregar imagens', 'error')
        this.lastError = error.message
      }
    },
    
    // Manipular seleção de arquivo
    handleFileChange(event) {
      console.log('Arquivo selecionado')
      const file = event.target.files[0]
      if (!file) return
      
      if (!this.selectedSection) {
        this.showNotification('Selecione uma seção antes de fazer upload de uma imagem', 'error')
        this.$refs.fileInput.value = ''
        return
      }
      
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
        this.imageUrl = '' // Limpa o URL quando faz upload
        console.log('Prévia da imagem gerada')
      }
      reader.readAsDataURL(file)
    },

    // Manipular mudança de URL
    handleUrlChange() {
      if (!this.imageUrl) {
        this.imagePreview = null
        return
      }
      
      if (!this.selectedSection) {
        this.showNotification('Selecione uma seção antes de informar uma URL', 'error')
        return
      }
      
      // Testar se a URL é válida
      try {
        new URL(this.imageUrl)
        
        // Pré-carregar a imagem para testar e gerar preview
        const img = new Image()
        img.onload = () => {
          this.imagePreview = this.imageUrl
          console.log('Prévia da imagem por URL gerada')
        }
        img.onerror = () => {
          this.imagePreview = null
          this.showNotification('URL de imagem inválida ou inacessível', 'error')
        }
        img.src = this.imageUrl
      } catch (e) {
        this.imagePreview = null
        this.showNotification('URL inválida', 'error')
      }
    },
    
    // Resetar formulário
    resetForm() {
      console.log('Resetando formulário')
      this.selectedSection = ''
      this.imagePreview = null
      this.imageUrl = ''
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    
    // Verificar salvamento
    verifySave(sectionId) {
      let storageKey = sectionId === 'hero_image' ? 'hero_image' : `screenshot_${sectionId}`
      let savedData = localStorage.getItem(storageKey)
      
      if (!savedData) {
        console.error(`Verificação falhou: Imagem para ${sectionId} não encontrada no localStorage`)
        return false
      }
      
      console.log(`Verificação sucedida: Imagem para ${sectionId} encontrada no localStorage`)
      return true
    },
    
    // Método de salvamento direto sem estado
    directSave(sectionId, imageData) {
      // Determinar a chave de armazenamento
      const storageKey = sectionId === 'hero_image' ? 'hero_image' : `screenshot_${sectionId}`
      
      try {
        // Salvar objeto com tipo e URL no localStorage
        localStorage.setItem(storageKey, JSON.stringify(imageData))
        
        // Verificar se foi salvo
        const savedData = localStorage.getItem(storageKey)
        if (!savedData) {
          throw new Error(`Falha ao verificar dados salvos para ${sectionId}`)
        }
        
        console.log(`Imagem salva com sucesso para ${sectionId} usando método direto`)
        return true
      } catch (error) {
        console.error(`Erro ao salvar diretamente para ${sectionId}:`, error)
        return false
      }
    },
    
    // Salvar imagem
    async saveImage() {
      if (this.isSaving) {
        console.log('Operação de salvamento já em andamento, aguarde...')
        return
      }
      
      console.log('Tentando salvar imagem para seção:', this.selectedSection)
      
      if (!this.selectedSection || !this.imagePreview) {
        this.showNotification('Selecione uma seção e uma imagem', 'error')
        return
      }
      
      try {
        this.isSaving = true
        this.lastError = null
        
        // Fazer uma cópia dos valores atuais antes de qualquer operação
        const sectionToUpdate = this.selectedSection
        const imageToUpdate = this.imagePreview
        
        // Criar o objeto de dados da imagem
        const imageData = {
          url: imageToUpdate,
          type: this.imageSource,
          timestamp: new Date().toISOString()
        }
        
        console.log(`Iniciando salvamento para seção ${sectionToUpdate}`)
        
        // Usar o método de salvamento direto
        const saveResult = this.directSave(sectionToUpdate, imageData)
        
        if (!saveResult) {
          throw new Error(`Falha ao salvar para ${sectionToUpdate} usando método direto`)
        }
        
        // Atualizar a interface se aplicável
        if (sectionToUpdate === 'hero_image') {
          // Atualizar o hero na página principal se estiver visível
          const heroImage = document.querySelector('.VPImage.image-src')
          if (heroImage) {
            heroImage.src = imageToUpdate
            console.log('Imagem do hero atualizada na página')
          }
        } else {
          // Atualizar screenshots se estiverem visíveis
          const containers = document.querySelectorAll(`.screenshot-container[data-section="${sectionToUpdate}"]`)
          containers.forEach(container => {
            const imgElement = document.createElement('img')
            imgElement.src = imageToUpdate
            imgElement.alt = `${sectionToUpdate} screenshot`
            
            // Limpar o container e adicionar a imagem
            container.innerHTML = ''
            container.appendChild(imgElement)
            container.classList.add('has-image')
          })
        }
        
        // Verificar novamente o salvamento
        if (!this.verifySave(sectionToUpdate)) {
          throw new Error(`Verificação de salvamento falhou para ${sectionToUpdate}`)
        }
        
        // Atualizar o estado local
        this.$nextTick(() => {
          this.savedImages = {
            ...this.savedImages,
            [sectionToUpdate]: imageData
          }
          console.log('Estado de imagens salvas atualizado:', Object.keys(this.savedImages))
        })
        
        // Feedback e reset
        this.showNotification(`Imagem salva com sucesso para ${this.getSectionName(sectionToUpdate)}!`, 'success')
        
        // Resetar formulário após o salvamento estar concluído
        setTimeout(() => {
          this.resetForm()
          this.loadImages() // Recarregar para garantir consistência
          this.isSaving = false
        }, 500)
      } catch (error) {
        console.error('Erro detalhado ao salvar imagem:', error)
        this.lastError = error.message
        this.showNotification(`Falha ao salvar imagem: ${error.message}`, 'error')
        this.isSaving = false
      }
    },
    
    // Excluir imagem
    deleteImage(section) {
      if (confirm(`Deseja realmente excluir a imagem da seção ${this.getSectionName(section)}?`)) {
        try {
          if (section === 'hero_image') {
            localStorage.removeItem('hero_image')
            
            // Resetar a imagem do hero se estiver visível
            const heroImage = document.querySelector('.VPImage.image-src')
            if (heroImage) {
              heroImage.src = '/hero-image.png' // Voltar para a imagem padrão
            }
          } else {
            localStorage.removeItem(`screenshot_${section}`)
            
            // Resetar screenshots se estiverem visíveis
            const containers = document.querySelectorAll(`.screenshot-container[data-section="${section}"]`)
            containers.forEach(container => {
              container.innerHTML = '<div>Sem imagem disponível</div>'
              container.classList.remove('has-image')
            })
          }
          
          const newImages = { ...this.savedImages }
          delete newImages[section]
          this.savedImages = newImages
          
          this.showNotification('Imagem removida com sucesso', 'success')
        } catch (error) {
          console.error('Erro ao excluir imagem:', error)
          this.showNotification('Falha ao excluir imagem', 'error')
          this.lastError = error.message
        }
      }
    },
    
    // Gerenciar notificações
    showNotification(message, type = 'success') {
      this.notification = { message, type }
      setTimeout(() => {
        this.notification = null
      }, 5000)
    },
    
    clearNotification() {
      this.notification = null
    },
    
    // Obter nome da seção pelo ID
    getSectionName(sectionId) {
      const section = this.sections.find(s => s.id === sectionId)
      return section ? section.name : sectionId
    },

    // Função para carregar a imagem do hero salva anteriormente
    loadSavedHeroImage() {
      const savedHeroData = localStorage.getItem('hero_image')
      if (savedHeroData) {
        try {
          // Tentar analisar como JSON
          const heroData = JSON.parse(savedHeroData)
          
          // Atualizar a imagem do hero na página
          const heroImage = document.querySelector('.VPImage.image-src')
          if (heroImage) {
            heroImage.src = heroData.url
          }
        } catch (e) {
          // Formato antigo - apenas a URL
          const heroImage = document.querySelector('.VPImage.image-src')
          if (heroImage) {
            heroImage.src = savedHeroData
          }
        }
      }
    },
    
    // Método de emergência para limpar o localStorage
    clearAllStoredImages() {
      if (confirm('ATENÇÃO: Isso removerá TODAS as imagens salvas. Continuar?')) {
        try {
          this.sections.forEach(section => {
            if (section.id === 'hero_image') {
              localStorage.removeItem('hero_image')
            } else {
              localStorage.removeItem(`screenshot_${section.id}`)
            }
          })
          
          this.savedImages = {}
          this.showNotification('Todas as imagens foram removidas', 'success')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        } catch (error) {
          console.error('Erro ao limpar imagens:', error)
          this.showNotification('Falha ao limpar imagens', 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: var(--vp-c-text-1);
}

.admin-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.admin-description {
  margin-bottom: 2rem;
  color: var(--vp-c-text-2);
}

/* Notificações */
.admin-notification {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-notification.success {
  background-color: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.admin-notification.error {
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.admin-notification-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: inherit;
}

/* Formulário */
.admin-form {
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.admin-form-group {
  margin-bottom: 1.5rem;
}

.admin-form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.admin-select,
.admin-file-input,
.admin-text-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

.admin-select:focus,
.admin-text-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 2px rgba(52, 81, 178, 0.2);
}

.admin-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}

/* Botões de alternância */
.admin-toggle-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.admin-toggle-button {
  flex: 1;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.admin-toggle-button.active {
  background-color: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

/* Informações de Debug */
.admin-debug-info {
  margin-bottom: 2rem;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.admin-debug-info details {
  border: 1px dashed var(--vp-c-divider);
  padding: 0.75rem;
  border-radius: 6px;
}

.admin-debug-info summary {
  cursor: pointer;
  font-weight: 600;
}

.admin-debug-info p {
  margin: 0.5rem 0;
}

/* Botões */
.admin-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
  text-decoration: none;
}

.admin-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.admin-button-small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.admin-button-primary {
  background-color: var(--vp-c-brand);
  color: white;
}

.admin-button-primary:hover:not(:disabled) {
  background-color: var(--vp-c-brand-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.admin-button-danger {
  background-color: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.admin-button-danger:hover {
  background-color: rgba(239, 68, 68, 0.1);
}

/* Pré-visualização */
.admin-preview {
  margin-bottom: 1.5rem;
}

.admin-preview h3 {
  margin-bottom: 0.75rem;
}

.admin-preview-container {
  max-height: 400px;
  overflow: hidden;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-preview-container img {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

/* Grid de imagens salvas */
.admin-saved-images {
  margin-top: 3rem;
}

.admin-saved-images h2 {
  margin-bottom: 1.5rem;
}

.admin-no-images {
  background-color: var(--vp-c-bg-soft);
  padding: 2rem;
  text-align: center;
  border-radius: 6px;
  color: var(--vp-c-text-2);
  border: 1px solid var(--vp-c-divider);
}

.admin-image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.admin-image-card {
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
  transition: transform 0.3s, box-shadow 0.3s;
}

.admin-image-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.admin-image-preview {
  height: 200px;
  overflow: hidden;
  position: relative;
}

.admin-image-preview::after {
  content: "Clique para ver";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-weight: 500;
  opacity: 0;
  transition: opacity 0.3s;
}

.admin-image-preview:hover::after {
  opacity: 1;
}

.admin-image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.admin-image-preview:hover img {
  transform: scale(1.05);
}

.admin-image-info {
  padding: 1rem;
}

.admin-image-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.admin-image-source {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
}

.admin-image-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.admin-image-actions a,
.admin-image-actions button {
  flex: 1;
  text-align: center;
}

/* Responsividade */
@media (max-width: 768px) {
  .admin-image-grid {
    grid-template-columns: 1fr;
  }
  
  .admin-button {
    width: 100%;
  }
  
  .admin-form {
    padding: 1rem;
  }
}

/* Modo escuro */
.dark .admin-preview-container {
  background-color: rgba(255, 255, 255, 0.05);
}
</style> 