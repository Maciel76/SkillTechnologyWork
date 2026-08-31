<template>
  <div class="hero-editor">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2><i class="fas fa-images"></i> Editor do Hero Section</h2>
        <p class="subtitle">Gerencie os slides do banner principal do site</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="resetToDefaults" :disabled="saving">
          <i class="fas fa-undo"></i> Restaurar Padrão
        </button>
        <button class="btn-primary" @click="saveAll" :disabled="saving">
          <i class="fas fa-save"></i> {{ saving ? 'Salvando...' : 'Salvar Tudo' }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando slides...</p>
    </div>

    <!-- Preview do Hero -->
    <div v-if="!loading" class="hero-preview-section">
      <h3><i class="fas fa-eye"></i> Pré-visualização</h3>
      <div class="hero-preview">
        <div class="preview-slider">
          <div class="preview-slide" v-if="slides.length > 0">
            <img
              :src="getImageUrl(slides[previewIndex]?.image)"
              :alt="slides[previewIndex]?.alt"
              class="preview-image"
              @error="handleImageError"
            />
            <div class="preview-overlay">
              <div class="preview-content">
                <h1 v-html="slides[previewIndex]?.h1"></h1>
                <p v-html="slides[previewIndex]?.p"></p>
                <div class="preview-buttons">
                  <span class="preview-cta">{{ slides[previewIndex]?.ctaText }}</span>
                  <span class="preview-cta secondary">Fale Conosco</span>
                </div>
              </div>
            </div>
          </div>
          <div class="preview-nav" v-if="slides.length > 1">
            <button @click="prevPreview" class="preview-nav-btn">
              <i class="fas fa-chevron-left"></i>
            </button>
            <div class="preview-indicators">
              <span
                v-for="(_, idx) in slides"
                :key="idx"
                :class="['indicator', { active: previewIndex === idx }]"
                @click="previewIndex = idx"
              ></span>
            </div>
            <button @click="nextPreview" class="preview-nav-btn">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Slides -->
    <div v-if="!loading" class="slides-section">
      <div class="slides-header">
        <h3><i class="fas fa-layer-group"></i> Slides ({{ slides.length }})</h3>
        <button class="btn-add" @click="addNewSlide">
          <i class="fas fa-plus"></i> Novo Slide
        </button>
      </div>

      <div class="slides-list">
        <div
          v-for="(slide, index) in slides"
          :key="slide._id || index"
          class="slide-card"
          :class="{ 'editing': editingIndex === index }"
        >
          <!-- Slide Header -->
          <div class="slide-card-header" @click="toggleEdit(index)">
            <div class="slide-info">
              <div class="slide-thumbnail">
                <img
                  :src="getImageUrl(slide.image)"
                  :alt="slide.alt"
                  @error="handleImageError"
                />
              </div>
              <div class="slide-meta">
                <span class="slide-number">Slide {{ index + 1 }}</span>
                <span class="slide-title" v-html="stripHtml(slide.h1)"></span>
              </div>
            </div>
            <div class="slide-actions">
              <button
                class="action-btn move"
                @click.stop="moveSlide(index, -1)"
                :disabled="index === 0"
                title="Mover para cima"
              >
                <i class="fas fa-arrow-up"></i>
              </button>
              <button
                class="action-btn move"
                @click.stop="moveSlide(index, 1)"
                :disabled="index === slides.length - 1"
                title="Mover para baixo"
              >
                <i class="fas fa-arrow-down"></i>
              </button>
              <button
                class="action-btn preview-btn"
                @click.stop="previewIndex = index"
                title="Pré-visualizar"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                class="action-btn delete"
                @click.stop="removeSlide(index)"
                title="Remover slide"
              >
                <i class="fas fa-trash"></i>
              </button>
              <i :class="['fas', editingIndex === index ? 'fa-chevron-up' : 'fa-chevron-down']" class="expand-icon"></i>
            </div>
          </div>

          <!-- Slide Editor (expandível) -->
          <div v-if="editingIndex === index" class="slide-editor">
            <!-- Upload de imagem -->
            <div class="form-group image-upload-group">
              <label>Imagem do Slide</label>
              <div class="image-upload-area">
                <div class="current-image" v-if="slide.image">
                  <img :src="getImageUrl(slide.image)" :alt="slide.alt" @error="handleImageError" />
                  <button class="remove-image-btn" @click="slide.image = ''" title="Remover imagem">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div class="upload-zone" v-else @dragover.prevent @drop.prevent="handleDrop($event, index)">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <p>Arraste uma imagem ou clique para selecionar</p>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleFileSelect($event, index)"
                    class="file-input"
                  />
                </div>
                <div class="upload-actions">
                  <label class="btn-upload">
                    <i class="fas fa-upload"></i> Enviar Imagem
                    <input
                      type="file"
                      accept="image/*"
                      @change="handleFileSelect($event, index)"
                      class="file-input"
                    />
                  </label>
                  <span class="or-divider">ou</span>
                  <input
                    v-model="slide.image"
                    type="text"
                    placeholder="Cole a URL da imagem"
                    class="url-input"
                  />
                </div>
                <div v-if="uploadingIndex === index" class="upload-progress">
                  <div class="progress-bar">
                    <div class="progress-fill"></div>
                  </div>
                  <span>Enviando imagem...</span>
                </div>
              </div>
            </div>

            <!-- Texto alt -->
            <div class="form-group">
              <label>Texto Alternativo (alt)</label>
              <input v-model="slide.alt" type="text" placeholder="Descrição da imagem para acessibilidade" />
            </div>

            <!-- Título H1 -->
            <div class="form-group">
              <label>
                Título (H1)
                <span class="hint">Use <code>&lt;span class='highlight'&gt;texto&lt;/span&gt;</code> para destaque</span>
              </label>
              <textarea v-model="slide.h1" rows="2" placeholder="Título principal do slide"></textarea>
              <div class="preview-text">
                <small>Preview:</small>
                <span v-html="slide.h1"></span>
              </div>
            </div>

            <!-- Parágrafo -->
            <div class="form-group">
              <label>
                Descrição
                <span class="hint">Use <code>&lt;span class='highlight'&gt;texto&lt;/span&gt;</code> para destaque</span>
              </label>
              <textarea v-model="slide.p" rows="2" placeholder="Descrição do slide"></textarea>
              <div class="preview-text">
                <small>Preview:</small>
                <span v-html="slide.p"></span>
              </div>
            </div>

            <!-- Link do CTA -->
            <div class="form-row">
              <div class="form-group">
                <label>Link do Botão</label>
                <input v-model="slide.link" type="text" placeholder="/contato" />
              </div>
              <div class="form-group">
                <label>Texto do Botão (CTA)</label>
                <input v-model="slide.ctaText" type="text" placeholder="Saiba Mais" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-if="slides.length === 0" class="empty-state">
        <i class="fas fa-images"></i>
        <h3>Nenhum slide configurado</h3>
        <p>Adicione slides para o banner principal do site</p>
        <button class="btn-primary" @click="addNewSlide">
          <i class="fas fa-plus"></i> Adicionar Primeiro Slide
        </button>
      </div>
    </div>

    <!-- Mensagem de sucesso/erro -->
    <transition name="toast">
      <div v-if="toast.show" :class="['toast', toast.type]">
        <i :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import heroService from '@/services/heroService';

export default {
  name: 'HeroSectionEditor',
  data() {
    return {
      slides: [],
      loading: true,
      saving: false,
      editingIndex: null,
      previewIndex: 0,
      uploadingIndex: null,
      toast: {
        show: false,
        message: '',
        type: 'success',
      },
    };
  },
  methods: {
    async loadConfig() {
      this.loading = true;
      try {
        const config = await heroService.getConfig();
        this.slides = config.slides || [];
      } catch (error) {
        console.error('Erro ao carregar config do hero:', error);
        this.showToast('Erro ao carregar slides', 'error');
      } finally {
        this.loading = false;
      }
    },

    async saveAll() {
      this.saving = true;
      try {
        const config = await heroService.updateConfig(this.slides);
        this.slides = config.slides;
        this.showToast('Slides salvos com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao salvar:', error);
        this.showToast('Erro ao salvar slides', 'error');
      } finally {
        this.saving = false;
      }
    },

    addNewSlide() {
      this.slides.push({
        image: '',
        alt: '',
        h1: "Seu Título Aqui com <span class='highlight'>Destaque</span>",
        p: 'Descrição do seu slide aqui.',
        link: '/contato',
        ctaText: 'Saiba Mais',
        order: this.slides.length,
      });
      this.editingIndex = this.slides.length - 1;
      this.previewIndex = this.slides.length - 1;
    },

    removeSlide(index) {
      if (this.slides.length <= 1) {
        this.showToast('É necessário ter pelo menos 1 slide', 'error');
        return;
      }
      this.slides.splice(index, 1);
      // Reordenar
      this.slides.forEach((s, i) => (s.order = i));
      if (this.previewIndex >= this.slides.length) {
        this.previewIndex = this.slides.length - 1;
      }
      if (this.editingIndex === index) {
        this.editingIndex = null;
      }
    },

    moveSlide(index, direction) {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= this.slides.length) return;
      const temp = this.slides[index];
      this.slides.splice(index, 1);
      this.slides.splice(newIndex, 0, temp);
      // Reordenar
      this.slides.forEach((s, i) => (s.order = i));
      if (this.editingIndex === index) {
        this.editingIndex = newIndex;
      }
    },

    toggleEdit(index) {
      this.editingIndex = this.editingIndex === index ? null : index;
    },

    async handleFileSelect(event, index) {
      const file = event.target.files[0];
      if (!file) return;
      await this.uploadFile(file, index);
    },

    async handleDrop(event, index) {
      const file = event.dataTransfer.files[0];
      if (!file) return;
      await this.uploadFile(file, index);
    },

    async uploadFile(file, index) {
      if (!file.type.startsWith('image/')) {
        this.showToast('Apenas imagens são permitidas', 'error');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.showToast('Imagem muito grande (máx. 10MB)', 'error');
        return;
      }

      this.uploadingIndex = index;
      try {
        const url = await heroService.uploadImage(file);
        this.slides[index].image = url;
        this.showToast('Imagem enviada com sucesso!', 'success');
      } catch (error) {
        console.error('Erro no upload:', error);
        this.showToast('Erro ao enviar imagem', 'error');
      } finally {
        this.uploadingIndex = null;
      }
    },

    async resetToDefaults() {
      if (!confirm('Tem certeza que deseja restaurar os slides padrão? As alterações serão perdidas.')) return;
      this.saving = true;
      try {
        const config = await heroService.reset();
        this.slides = config.slides;
        this.previewIndex = 0;
        this.editingIndex = null;
        this.showToast('Slides restaurados ao padrão!', 'success');
      } catch (error) {
        console.error('Erro ao resetar:', error);
        this.showToast('Erro ao restaurar slides padrão', 'error');
      } finally {
        this.saving = false;
      }
    },

    getImageUrl(image) {
      if (!image) return '';
      // Se começa com http ou data:, usa direto
      if (image.startsWith('http') || image.startsWith('data:')) return image;
      // Se começa com /uploads, monta URL do backend
      if (image.startsWith('/uploads')) {
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5006';
        // Remove /api do baseUrl se existir
        return baseUrl.replace(/\/api$/, '') + image;
      }
      // Se é um path de asset estático
      return image;
    },

    handleImageError(e) {
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+';
    },

    stripHtml(html) {
      if (!html) return '';
      return html.replace(/<[^>]*>/g, '');
    },

    prevPreview() {
      this.previewIndex = (this.previewIndex - 1 + this.slides.length) % this.slides.length;
    },

    nextPreview() {
      this.previewIndex = (this.previewIndex + 1) % this.slides.length;
    },

    showToast(message, type = 'success') {
      this.toast = { show: true, message, type };
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },

  mounted() {
    this.loadConfig();
  },
};
</script>

<style scoped>
.hero-editor {
  position: relative;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left h2 {
  font-size: 1.6rem;
  color: var(--gray-900);
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-left h2 i {
  color: var(--primary);
}

.subtitle {
  color: var(--gray-500);
  font-size: 0.9rem;
  margin-top: 4px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Loading */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: var(--gray-500);
}

.loading-state i {
  font-size: 2rem;
  margin-bottom: 12px;
  color: var(--primary);
}

/* Preview Section */
.hero-preview-section {
  margin-bottom: 30px;
}

.hero-preview-section h3 {
  font-size: 1.1rem;
  color: var(--gray-700);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hero-preview {
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background: #1a1a2e;
}

.preview-slider {
  position: relative;
}

.preview-slide {
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: center;
  padding: 40px;
}

.preview-content {
  color: white;
  max-width: 600px;
}

.preview-content h1 {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 12px;
  line-height: 1.3;
}

.preview-content h1 :deep(.highlight) {
  color: #0099dd;
}

.preview-content p {
  font-size: 0.95rem;
  opacity: 0.9;
  margin-bottom: 20px;
  line-height: 1.5;
}

.preview-buttons {
  display: flex;
  gap: 12px;
}

.preview-cta {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--primary);
  color: white;
}

.preview-cta.secondary {
  background: transparent;
  border: 2px solid white;
}

.preview-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.3);
}

.preview-nav-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.preview-nav-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

.preview-indicators {
  display: flex;
  gap: 8px;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

/* Slides Section */
.slides-section {
  margin-top: 10px;
}

.slides-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.slides-header h3 {
  font-size: 1.1rem;
  color: var(--gray-700);
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-add {
  background: linear-gradient(135deg, var(--success), #059669);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

/* Slide Card */
.slides-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.slide-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.slide-card:hover {
  box-shadow: var(--shadow-md);
}

.slide-card.editing {
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.slide-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  transition: background 0.2s;
}

.slide-card-header:hover {
  background: var(--gray-50);
}

.slide-info {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}

.slide-thumbnail {
  width: 80px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--gray-100);
}

.slide-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.slide-number {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.slide-title {
  font-size: 0.9rem;
  color: var(--gray-700);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.slide-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn {
  background: var(--gray-100);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-600);
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--gray-200);
  color: var(--gray-800);
}

.action-btn.delete:hover {
  background: #fef2f2;
  color: var(--danger);
}

.action-btn.preview-btn:hover {
  background: #eff6ff;
  color: var(--info);
}

.action-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.expand-icon {
  color: var(--gray-400);
  font-size: 0.8rem;
  margin-left: 4px;
  transition: transform 0.3s;
}

/* Slide Editor */
.slide-editor {
  padding: 24px;
  border-top: 1px solid var(--gray-200);
  background: var(--gray-50);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--gray-700);
  margin-bottom: 8px;
}

.hint {
  font-weight: 400;
  font-size: 0.75rem;
  color: var(--gray-400);
  display: block;
  margin-top: 2px;
}

.hint code {
  background: var(--gray-200);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.7rem;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 10px 14px;
  border: 2px solid var(--gray-200);
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.3s;
  background: white;
  color: var(--gray-800);
}

.form-group input[type="text"]:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
}

.preview-text {
  margin-top: 8px;
  padding: 10px 14px;
  background: white;
  border-radius: 8px;
  border: 1px dashed var(--gray-300);
  font-size: 0.85rem;
  color: var(--gray-700);
}

.preview-text small {
  color: var(--gray-400);
  margin-right: 8px;
  font-weight: 600;
}

.preview-text :deep(.highlight) {
  color: #0099dd;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Image Upload */
.image-upload-area {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid var(--gray-200);
}

.current-image {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 12px;
  max-height: 200px;
}

.current-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-image-btn:hover {
  background: var(--danger);
  transform: scale(1.1);
}

.upload-zone {
  border: 2px dashed var(--gray-300);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: var(--gray-400);
  transition: all 0.3s;
  position: relative;
  cursor: pointer;
  margin-bottom: 12px;
}

.upload-zone:hover {
  border-color: var(--primary);
  background: rgba(99, 102, 241, 0.03);
}

.upload-zone i {
  font-size: 2rem;
  margin-bottom: 8px;
  color: var(--primary);
}

.upload-zone p {
  font-size: 0.85rem;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-upload {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  white-space: nowrap;
}

.btn-upload:hover {
  background: var(--primary-dark);
}

.btn-upload .file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.or-divider {
  color: var(--gray-400);
  font-size: 0.8rem;
}

.url-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px !important;
  border: 2px solid var(--gray-200) !important;
  border-radius: 8px !important;
  font-size: 0.85rem !important;
}

.upload-progress {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: var(--gray-200);
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: 3px;
  animation: progress 1.5s infinite;
}

@keyframes progress {
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
}

.upload-progress span {
  font-size: 0.8rem;
  color: var(--gray-500);
  white-space: nowrap;
}

/* Empty state */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
}

.empty-state i {
  font-size: 3rem;
  color: var(--gray-300);
  margin-bottom: 16px;
}

.empty-state h3 {
  color: var(--gray-700);
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--gray-500);
  margin-bottom: 20px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 14px 24px;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 9999;
  box-shadow: var(--shadow-xl);
}

.toast.success {
  background: linear-gradient(135deg, var(--success), #059669);
}

.toast.error {
  background: linear-gradient(135deg, var(--danger), #dc2626);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Responsive */
@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .preview-slide {
    height: 220px;
  }

  .preview-content h1 {
    font-size: 1.2rem;
  }

  .slide-actions .action-btn.move {
    display: none;
  }

  .upload-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .url-input {
    min-width: auto !important;
  }
}
</style>
