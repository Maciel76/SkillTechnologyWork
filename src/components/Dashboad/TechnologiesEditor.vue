<template>
  <div class="tech-editor">
    <!-- Header -->
    <div class="section-header">
      <div class="header-left">
        <h2><i class="fas fa-microchip"></i> Tecnologias do Hero</h2>
        <p class="subtitle">
          Gerencie os ícones e nomes que rolam na faixa de tecnologias da página inicial
        </p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="loadConfig" :disabled="saving || loading">
          <i class="fas fa-rotate"></i> Recarregar
        </button>
        <button class="btn-primary" @click="saveAll" :disabled="saving || loading">
          <i class="fas fa-save"></i> {{ saving ? "Salvando..." : "Salvar Tudo" }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando tecnologias...</p>
    </div>

    <template v-else>
      <!-- Preview do marquee -->
      <div class="preview-section">
        <h3><i class="fas fa-eye"></i> Pré-visualização</h3>
        <div class="marquee-preview">
          <div class="marquee">
            <div class="marquee-track">
              <div
                v-for="(tech, index) in previewList"
                :key="index"
                class="tech-chip"
              >
                <img
                  v-if="tech.icon"
                  :src="getImageUrl(tech.icon)"
                  :alt="tech.name"
                  class="chip-icon"
                  @error="handleImageError"
                />
                <i v-else class="fas fa-image chip-icon-placeholder"></i>
                <span class="chip-name">{{ tech.name || "Sem nome" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lista de tecnologias -->
      <div class="list-section">
        <div class="list-header">
          <h3>
            <i class="fas fa-layer-group"></i> Tecnologias ({{ technologies.length }})
          </h3>
          <button class="btn-add" @click="addNew">
            <i class="fas fa-plus"></i> Nova Tecnologia
          </button>
        </div>

        <div v-if="technologies.length === 0" class="empty-state">
          <i class="fas fa-microchip"></i>
          <h3>Nenhuma tecnologia cadastrada</h3>
          <p>Adicione a primeira tecnologia para exibir na faixa do Hero</p>
          <button class="btn-primary" @click="addNew">
            <i class="fas fa-plus"></i> Adicionar Tecnologia
          </button>
        </div>

        <div v-else class="tech-grid">
          <div
            v-for="(tech, index) in technologies"
            :key="index"
            class="tech-card"
          >
            <div class="card-top">
              <div class="card-thumb">
                <img
                  v-if="tech.icon"
                  :src="getImageUrl(tech.icon)"
                  :alt="tech.name"
                  @error="handleImageError"
                />
                <i v-else class="fas fa-image"></i>
              </div>
              <div class="card-order">
                <button
                  class="action-btn"
                  @click="move(index, -1)"
                  :disabled="index === 0"
                  title="Mover para a esquerda"
                >
                  <i class="fas fa-arrow-left"></i>
                </button>
                <button
                  class="action-btn"
                  @click="move(index, 1)"
                  :disabled="index === technologies.length - 1"
                  title="Mover para a direita"
                >
                  <i class="fas fa-arrow-right"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="remove(index)"
                  title="Excluir"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>Nome</label>
              <input
                v-model="tech.name"
                type="text"
                placeholder="Ex: Node.js"
              />
            </div>

            <div class="form-group">
              <label>Ícone</label>
              <div class="icon-input-row">
                <label class="btn-upload">
                  <i class="fas fa-upload"></i>
                  {{ uploadingIndex === index ? "Enviando..." : "Enviar" }}
                  <input
                    type="file"
                    accept="image/*"
                    class="file-input"
                    @change="handleFileSelect($event, index)"
                  />
                </label>
                <input
                  v-model="tech.icon"
                  type="text"
                  class="url-input"
                  placeholder="ou cole a URL / caminho do ícone"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toast.show" :class="['toast', toast.type]">
        <i
          :class="
            toast.type === 'success'
              ? 'fas fa-check-circle'
              : 'fas fa-exclamation-circle'
          "
        ></i>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script>
import heroService from "@/services/heroService";

export default {
  name: "TechnologiesEditor",
  data() {
    return {
      technologies: [],
      loading: true,
      saving: false,
      uploadingIndex: null,
      toast: { show: false, message: "", type: "success" },
    };
  },
  computed: {
    // Duplica para simular a rolagem infinita do site
    previewList() {
      if (this.technologies.length === 0) return [];
      return [...this.technologies, ...this.technologies];
    },
  },
  methods: {
    async loadConfig() {
      this.loading = true;
      try {
        const config = await heroService.getConfig();
        const techs = (config.technologies || [])
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        this.technologies = techs.map((t) => ({
          name: t.name || "",
          icon: t.icon || "",
        }));
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
        this.showToast("Erro ao carregar tecnologias", "error");
      } finally {
        this.loading = false;
      }
    },

    async saveAll() {
      // Valida nomes
      const invalid = this.technologies.some((t) => !t.name || !t.name.trim());
      if (invalid) {
        this.showToast("Todas as tecnologias precisam de um nome", "error");
        return;
      }
      this.saving = true;
      try {
        const payload = this.technologies.map((t, i) => ({
          name: t.name.trim(),
          icon: t.icon || "",
          order: i,
        }));
        const config = await heroService.updateTechnologies(payload);
        const techs = (config.technologies || [])
          .slice()
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        this.technologies = techs.map((t) => ({
          name: t.name || "",
          icon: t.icon || "",
        }));
        this.showToast("Tecnologias salvas com sucesso!", "success");
      } catch (error) {
        console.error("Erro ao salvar tecnologias:", error);
        this.showToast("Erro ao salvar tecnologias", "error");
      } finally {
        this.saving = false;
      }
    },

    addNew() {
      this.technologies.push({ name: "", icon: "" });
    },

    remove(index) {
      this.technologies.splice(index, 1);
    },

    move(index, direction) {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= this.technologies.length) return;
      const item = this.technologies[index];
      this.technologies.splice(index, 1);
      this.technologies.splice(newIndex, 0, item);
    },

    async handleFileSelect(event, index) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        this.showToast("Apenas imagens são permitidas", "error");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        this.showToast("Imagem muito grande (máx. 10MB)", "error");
        return;
      }
      this.uploadingIndex = index;
      try {
        const url = await heroService.uploadImage(file);
        this.technologies[index].icon = url;
        this.showToast("Ícone enviado com sucesso!", "success");
      } catch (error) {
        console.error("Erro no upload:", error);
        this.showToast("Erro ao enviar ícone", "error");
      } finally {
        this.uploadingIndex = null;
        event.target.value = "";
      }
    },

    getImageUrl(image) {
      if (!image) return "";
      if (image.startsWith("http") || image.startsWith("data:")) return image;
      if (image.startsWith("/uploads")) {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5006";
        return baseUrl.replace(/\/api$/, "") + image;
      }
      return image;
    },

    handleImageError(e) {
      e.target.style.opacity = "0.25";
    },

    showToast(message, type = "success") {
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
.tech-editor {
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

/* Preview marquee */
.preview-section {
  margin-bottom: 30px;
}

.preview-section h3,
.list-header h3 {
  font-size: 1.1rem;
  color: var(--gray-700);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.marquee-preview {
  background: linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%);
  border: 1px solid var(--gray-200);
  border-radius: var(--border-radius);
  padding: 26px 0;
  overflow: hidden;
}

.marquee {
  position: relative;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 8%,
    #000 92%,
    transparent
  );
}

.marquee-track {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

.tech-chip {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.1rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 153, 221, 0.12);
  border-radius: 50px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  white-space: nowrap;
}

.chip-icon {
  height: 26px;
  width: 26px;
  object-fit: contain;
}

.chip-icon-placeholder {
  color: var(--gray-300);
  font-size: 22px;
}

.chip-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #334155;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

/* Lista */
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.tech-card {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  padding: 18px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.tech-card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--gray-200);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-thumb {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 8px;
}

.card-thumb i {
  color: var(--gray-300);
  font-size: 20px;
}

.card-order {
  display: flex;
  gap: 6px;
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

.action-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.form-group {
  margin-bottom: 14px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 0.82rem;
  color: var(--gray-700);
  margin-bottom: 6px;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid var(--gray-200);
  border-radius: 10px;
  font-size: 0.9rem;
  font-family: inherit;
  transition: border-color 0.3s;
  background: white;
  color: var(--gray-800);
}

.form-group input[type="text"]:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.icon-input-row {
  display: flex;
  gap: 8px;
  align-items: stretch;
}

.btn-upload {
  background: var(--primary);
  color: white;
  padding: 0 14px;
  border-radius: 10px;
  font-size: 0.82rem;
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

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.url-input {
  flex: 1;
  min-width: 0;
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

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
