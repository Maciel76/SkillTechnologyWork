<template>
  <div class="portfolio-management">
    <div class="section-header">
      <h2>Gerenciamento de Portfólio</h2>
      <div class="header-actions">
        <button class="btn-save-all" @click="loadProjects" :disabled="loading">
          <i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-rotate'"></i>
          {{ loading ? "Carregando..." : "Recarregar" }}
        </button>
        <button class="btn-primary" @click="openCreateForm">
          <i class="fas fa-plus"></i> Novo Projeto
        </button>
      </div>
    </div>

    <!-- Mensagens -->
    <div v-if="successMessage" class="alert alert-success">
      <i class="fas fa-check-circle"></i> {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-error">
      <i class="fas fa-exclamation-circle"></i> {{ errorMessage }}
    </div>

    <!-- Modal de Criação/Edição -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingId ? "Editar Projeto" : "Criar Novo Projeto" }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form @submit.prevent="saveProject" class="modal-form">
          <div class="form-group">
            <label for="title">Título do projeto *</label>
            <input id="title" v-model="form.title" type="text" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="category">Categoria *</label>
              <select id="category" v-model="form.category" required>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="form-group">
              <label for="year">Ano</label>
              <input id="year" v-model="form.year" type="text" placeholder="2025" />
            </div>
          </div>

          <div class="form-group">
            <label>Imagem do projeto *</label>
            <div class="image-field">
              <div class="image-preview" v-if="form.thumbnail">
                <img :src="resolveImg(form.thumbnail)" alt="Prévia" @error="onImgError" />
              </div>
              <div class="image-inputs">
                <label class="btn-upload">
                  <i class="fas fa-upload"></i>
                  {{ uploading ? "Enviando..." : "Enviar imagem" }}
                  <input type="file" accept="image/*" class="file-input" @change="handleUpload" />
                </label>
                <input
                  v-model="form.thumbnail"
                  type="text"
                  class="url-input"
                  placeholder="ou cole a URL da imagem"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="excerpt">Resumo curto (aparece no card)</label>
            <input id="excerpt" v-model="form.excerpt" type="text" placeholder="Uma frase sobre o projeto" />
          </div>

          <div class="form-group">
            <label for="description">Descrição completa</label>
            <textarea id="description" v-model="form.description" rows="3"></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="clientName">Cliente</label>
              <input id="clientName" v-model="form.clientName" type="text" placeholder="Nome do cliente" />
            </div>
            <div class="form-group">
              <label for="accentColor">Cor de destaque</label>
              <input id="accentColor" v-model="form.accentColor" type="color" class="color-input" />
            </div>
          </div>

          <div class="form-group">
            <label for="technologies">Tecnologias (separadas por vírgula)</label>
            <input id="technologies" v-model="form.technologies" type="text" placeholder="Vue.js, Node.js, MongoDB" />
          </div>

          <div class="form-group">
            <label for="liveUrl">Link do projeto (opcional)</label>
            <input id="liveUrl" v-model="form.liveUrl" type="text" placeholder="https://..." />
          </div>

          <div class="checkbox-row">
            <label class="checkbox">
              <input type="checkbox" v-model="form.featured" />
              <span>Destaque (aparece em "Projetos Destaque")</span>
            </label>
            <label class="checkbox">
              <input type="checkbox" v-model="form.published" />
              <span>Publicar no site imediatamente</span>
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary" :disabled="saving">
              <i class="fas" :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"></i>
              {{ saving ? "Salvando..." : "Salvar" }}
            </button>
            <button type="button" class="btn-secondary" @click="closeModal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Filtros -->
    <div class="portfolio-filters">
      <button @click="activeFilter = ''" :class="{ active: activeFilter === '' }">Todos</button>
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeFilter = cat"
        :class="{ active: activeFilter === cat }"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading && !projects.length" class="state-box">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando projetos...</p>
    </div>

    <!-- Vazio -->
    <div v-else-if="!filteredProjects.length" class="state-box">
      <i class="fas fa-folder-open"></i>
      <h3>Nenhum projeto {{ activeFilter ? "nesta categoria" : "cadastrado" }}</h3>
      <p>Clique em "Novo Projeto" para adicionar o primeiro case ao seu portfólio.</p>
    </div>

    <!-- Grid -->
    <div v-else class="portfolio-grid">
      <div class="portfolio-item" v-for="item in filteredProjects" :key="item._id">
        <div class="portfolio-image">
          <img :src="resolveImg(item.thumbnail || (item.images && item.images[0]))" :alt="item.title" @error="onImgError" />
          <div class="card-badges">
            <span class="badge-pub" :class="item.published ? 'on' : 'off'">
              <i class="fas" :class="item.published ? 'fa-circle-check' : 'fa-circle-pause'"></i>
              {{ item.published ? "Publicado" : "Rascunho" }}
            </span>
            <span v-if="item.featured" class="badge-featured"><i class="fas fa-star"></i> Destaque</span>
          </div>
          <div class="portfolio-overlay">
            <button class="btn-edit" @click="openEditForm(item)" title="Editar"><i class="fas fa-edit"></i></button>
            <button
              class="btn-featured"
              @click="toggleFeatured(item)"
              :title="item.featured ? 'Remover destaque' : 'Marcar destaque'"
            >
              <i class="fas fa-star"></i>
            </button>
            <button class="btn-delete" @click="removeProject(item)" title="Excluir"><i class="fas fa-trash"></i></button>
          </div>
        </div>

        <div class="portfolio-info">
          <span class="cat-tag" :style="{ background: item.accentColor || '#0099dd' }">{{ item.category }}</span>
          <h3>{{ item.title || item.name }}</h3>
          <p class="project-description">{{ item.excerpt || item.description || "Sem descrição" }}</p>
        </div>

        <div class="service-footer">
          <button class="btn-publicar" :class="{ 'is-off': !item.published }" @click="togglePublish(item)">
            <i class="fas" :class="item.published ? 'fa-eye-slash' : 'fa-eye'"></i>
            {{ item.published ? "Despublicar" : "Publicar" }}
          </button>
          <button class="btn-editar" @click="openEditForm(item)"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-excluir" @click="removeProject(item)"><i class="fas fa-trash"></i> Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAgencyPortfolioStore } from "@/stores/agencyPortfolioStore";
import heroService from "@/services/heroService";

const CATEGORIES = [
  "Sistemas Web",
  "Sites & Landing Pages",
  "E-commerce",
  "Aplicativos Mobile",
  "Automação & IA",
  "Identidade Visual",
];

function emptyForm() {
  return {
    title: "",
    category: "Sistemas Web",
    thumbnail: "",
    excerpt: "",
    description: "",
    year: new Date().getFullYear().toString(),
    clientName: "",
    accentColor: "#0099dd",
    technologies: "",
    liveUrl: "",
    featured: false,
    published: true,
  };
}

export default {
  name: "PortfolioManagement",
  data() {
    return {
      store: useAgencyPortfolioStore(),
      categories: CATEGORIES,
      activeFilter: "",
      showModal: false,
      editingId: null,
      saving: false,
      uploading: false,
      successMessage: "",
      errorMessage: "",
      form: emptyForm(),
    };
  },
  computed: {
    loading() {
      return this.store.loading;
    },
    projects() {
      return this.store.projects;
    },
    filteredProjects() {
      if (!this.activeFilter) return this.projects;
      return this.projects.filter((p) => p.category === this.activeFilter);
    },
  },
  methods: {
    async loadProjects() {
      try {
        await this.store.fetchAllProjects({ limit: 100 });
        if (this.store.error) this.flash(this.store.error, "error");
      } catch (e) {
        this.flash("Não foi possível carregar os projetos. O servidor está rodando?", "error");
      }
    },

    openCreateForm() {
      this.editingId = null;
      this.form = emptyForm();
      this.showModal = true;
    },

    openEditForm(project) {
      this.editingId = project._id;
      this.form = {
        title: project.title || project.name || "",
        category: project.category || "Sistemas Web",
        thumbnail: project.thumbnail || (project.images && project.images[0]) || "",
        excerpt: project.excerpt || "",
        description: project.description || "",
        year: project.year || new Date().getFullYear().toString(),
        clientName: (project.client && project.client.name) || "",
        accentColor: project.accentColor || "#0099dd",
        technologies: (project.technologies || []).join(", "),
        liveUrl: project.liveUrl || "",
        featured: !!project.featured,
        published: !!project.published,
      };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.editingId = null;
    },

    buildPayload() {
      const techs = this.form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      const desc = this.form.description || this.form.excerpt || `${this.form.title} — projeto desenvolvido pela nossa agência.`;
      return {
        title: this.form.title,
        name: this.form.title,
        category: this.form.category,
        excerpt: this.form.excerpt || desc.slice(0, 120),
        description: desc,
        client: { name: this.form.clientName || "Cliente", logo: "" },
        year: this.form.year || new Date().getFullYear().toString(),
        thumbnail: this.form.thumbnail,
        images: [this.form.thumbnail],
        accentColor: this.form.accentColor || "#0099dd",
        technologies: techs,
        challenge: desc,
        solution: [],
        results: [],
        features: [],
        liveUrl: this.form.liveUrl || "",
        githubUrl: "",
        published: this.form.published,
        featured: this.form.featured,
        agencyName: "SkillTechnology",
        agencyDescription: "Transformamos ideias em experiências digitais memoráveis",
        agencyContactInfo: {},
      };
    },

    async saveProject() {
      if (!this.form.thumbnail) {
        this.flash("Adicione uma imagem para o projeto.", "error");
        return;
      }
      this.saving = true;
      try {
        const payload = this.buildPayload();
        if (this.editingId) {
          await this.store.updateProject(this.editingId, payload);
          this.flash("Projeto atualizado e sincronizado com o site!", "success");
        } else {
          await this.store.createProject(payload);
          this.flash("Projeto criado com sucesso!", "success");
        }
        this.closeModal();
      } catch (e) {
        this.flash(this.store.error || "Erro ao salvar o projeto.", "error");
      } finally {
        this.saving = false;
      }
    },

    async togglePublish(item) {
      try {
        await this.store.togglePublish(item._id);
        this.flash(item.published ? "Projeto despublicado do site." : "Projeto publicado no site!", "success");
      } catch (e) {
        this.flash(this.store.error || "Erro ao alterar publicação.", "error");
      }
    },

    async toggleFeatured(item) {
      try {
        await this.store.toggleFeatured(item._id);
        this.flash(item.featured ? "Removido dos destaques." : "Marcado como destaque!", "success");
      } catch (e) {
        this.flash(this.store.error || "Erro ao alterar destaque.", "error");
      }
    },

    async removeProject(item) {
      if (!confirm(`Excluir o projeto "${item.title || item.name}"? Esta ação não pode ser desfeita.`)) return;
      try {
        await this.store.deleteProject(item._id);
        this.flash("Projeto excluído.", "success");
      } catch (e) {
        this.flash(this.store.error || "Erro ao excluir o projeto.", "error");
      }
    },

    async handleUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        this.flash("Selecione um arquivo de imagem.", "error");
        return;
      }
      this.uploading = true;
      try {
        const url = await heroService.uploadImage(file);
        this.form.thumbnail = url;
        this.flash("Imagem enviada!", "success");
      } catch (e) {
        this.flash("Erro ao enviar a imagem.", "error");
      } finally {
        this.uploading = false;
        event.target.value = "";
      }
    },

    resolveImg(image) {
      if (!image) return "";
      if (image.startsWith("http") || image.startsWith("data:")) return image;
      if (image.startsWith("/uploads")) {
        const base = (import.meta.env.VITE_API_URL || "http://localhost:5006").replace(/\/api$/, "");
        return base + image;
      }
      return image;
    },

    onImgError(e) {
      e.target.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+PC9zdmc+";
    },

    flash(message, type = "success") {
      if (type === "success") {
        this.successMessage = message;
        this.errorMessage = "";
      } else {
        this.errorMessage = message;
        this.successMessage = "";
      }
      setTimeout(() => {
        this.successMessage = "";
        this.errorMessage = "";
      }, 4000);
    },
  },
  mounted() {
    this.loadProjects();
  },
};
</script>

<style scoped>
.portfolio-management {
  width: 100%;
  padding: 2rem;
  background: linear-gradient(135deg, var(--gray-50), #fff);
  min-height: 100vh;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-save-all {
  background: linear-gradient(135deg, #0ea5e9, #0284c7);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}
.btn-save-all:disabled { opacity: 0.6; cursor: not-allowed; }

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}
.btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4); }
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

/* Alerts */
.alert {
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
}
.alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
.alert-error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

.portfolio-filters {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}
.portfolio-filters button {
  background: white;
  border: 2px solid var(--gray-200);
  padding: 0.65rem 1.3rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--gray-700);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.portfolio-filters button:hover {
  border-color: var(--primary-light);
  background: var(--gray-50);
  transform: translateY(-2px);
}
.portfolio-filters button.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

/* State box */
.state-box {
  text-align: center;
  padding: 70px 20px;
  background: white;
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  color: var(--gray-500);
}
.state-box i { font-size: 2.5rem; color: var(--gray-300); margin-bottom: 14px; }
.state-box h3 { color: var(--gray-700); margin-bottom: 6px; }

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.portfolio-item {
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.portfolio-item:hover { transform: translateY(-6px); box-shadow: var(--shadow-xl); border-color: var(--primary-light); }

.portfolio-image { position: relative; height: 190px; overflow: hidden; }
.portfolio-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.portfolio-item:hover .portfolio-image img { transform: scale(1.08); }

.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 6px;
  z-index: 2;
}
.badge-pub, .badge-featured {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 11.5px;
  font-weight: 700;
  color: white;
  backdrop-filter: blur(4px);
}
.badge-pub.on { background: rgba(16, 185, 129, 0.92); }
.badge-pub.off { background: rgba(100, 116, 139, 0.9); }
.badge-featured { background: rgba(245, 158, 11, 0.95); }

.portfolio-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.4s ease;
}
.portfolio-item:hover .portfolio-overlay { opacity: 1; }
.portfolio-overlay button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 10px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 15px;
}
.portfolio-overlay button:hover { background: rgba(255, 255, 255, 0.35); transform: scale(1.08); }
.btn-edit { background: rgba(46, 204, 113, 0.85) !important; }
.btn-delete { background: rgba(231, 76, 60, 0.85) !important; }
.btn-featured { background: rgba(245, 158, 11, 0.9) !important; }

.portfolio-info { padding: 18px 20px 0; }
.cat-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  color: white;
  font-size: 11.5px;
  font-weight: 700;
  margin-bottom: 10px;
}
.portfolio-info h3 { margin: 0 0 8px; font-weight: 700; color: var(--gray-900); font-size: 1.2rem; }
.project-description { color: var(--gray-600); margin: 0; line-height: 1.55; font-size: 14px; }

.service-footer { padding: 18px 20px; margin-top: auto; display: flex; gap: 0.6rem; }
.service-footer button {
  flex: 1;
  padding: 0.7rem 0.4rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  color: white;
}
.btn-publicar { background: linear-gradient(135deg, #27ae60, #2ecc71); }
.btn-publicar.is-off { background: linear-gradient(135deg, #64748b, #475569); }
.btn-publicar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3); }
.btn-editar { background: linear-gradient(135deg, #3498db, #2980b9); }
.btn-editar:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3); }
.btn-excluir { background: linear-gradient(135deg, #e74c3c, #c0392b); }
.btn-excluir:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3); }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}
.modal-content {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--gray-200);
  position: sticky;
  top: 0;
  background: white;
}
.modal-header h3 { margin: 0; font-size: 1.3rem; color: var(--gray-900); }
.close-btn {
  background: none;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  color: var(--gray-500);
  width: 32px;
  height: 32px;
}
.close-btn:hover { color: var(--gray-800); }

.modal-form { padding: 24px; }
.form-group { margin-bottom: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.form-group label { display: block; margin-bottom: 7px; font-weight: 600; color: var(--gray-800); font-size: 14px; }
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  font-size: 14.5px;
  font-family: inherit;
  transition: border-color 0.3s;
  box-sizing: border-box;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}
.color-input { height: 44px; padding: 4px; cursor: pointer; }

.image-field { display: flex; gap: 14px; align-items: flex-start; }
.image-preview {
  width: 90px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--gray-100);
  border: 1px solid var(--gray-200);
}
.image-preview img { width: 100%; height: 100%; object-fit: cover; }
.image-inputs { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.btn-upload {
  background: var(--primary);
  color: white;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  justify-content: center;
}
.btn-upload:hover { background: var(--primary-dark); }
.file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.url-input { width: 100%; }

.checkbox-row { display: flex; flex-direction: column; gap: 10px; margin: 4px 0 20px; }
.checkbox { display: flex; align-items: center; gap: 10px; font-weight: 500; color: var(--gray-700); cursor: pointer; }
.checkbox input { width: 18px; height: 18px; cursor: pointer; }

.form-actions { display: flex; gap: 12px; justify-content: flex-end; }
.btn-secondary {
  background: var(--gray-200);
  color: var(--gray-800);
  border: none;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-secondary:hover { background: var(--gray-300); }

@media (max-width: 768px) {
  .portfolio-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .header-actions { flex-direction: column; align-items: stretch; }
  .btn-save-all, .btn-primary { width: 100%; justify-content: center; }
}
</style>
