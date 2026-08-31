<template>
  <div class="services-editor">
    <div class="section-header">
      <div class="header-left">
        <h2><i class="fas fa-concierge-bell"></i> Serviços da Página</h2>
        <p class="subtitle">
          Gerencie os serviços que aparecem no slider da página de Serviços
        </p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary" @click="loadServices" :disabled="loading">
          <i class="fas fa-rotate"></i> Recarregar
        </button>
        <button class="btn-primary" @click="openCreate">
          <i class="fas fa-plus"></i> Novo Serviço
        </button>
      </div>
    </div>

    <div v-if="successMessage" class="alert success"><i class="fas fa-check-circle"></i> {{ successMessage }}</div>
    <div v-if="errorMessage" class="alert error"><i class="fas fa-exclamation-circle"></i> {{ errorMessage }}</div>

    <!-- Loading -->
    <div v-if="loading && !services.length" class="state-box">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando serviços...</p>
    </div>

    <!-- Vazio -->
    <div v-else-if="!services.length" class="state-box">
      <i class="fas fa-concierge-bell"></i>
      <h3>Nenhum serviço cadastrado</h3>
      <button class="btn-primary" @click="openCreate"><i class="fas fa-plus"></i> Adicionar serviço</button>
    </div>

    <!-- Grid -->
    <div v-else class="services-grid">
      <div class="service-card" v-for="(item, index) in services" :key="item._id" :style="{ '--sc': item.color || '#0099DD' }">
        <div class="card-media">
          <img :src="resolveImg(item.image)" :alt="item.title" @error="onImgError" />
          <span class="pub-badge" :class="item.published ? 'on' : 'off'">
            {{ item.published ? "Publicado" : "Oculto" }}
          </span>
          <div class="reorder">
            <button @click="move(index, -1)" :disabled="index === 0" title="Subir"><i class="fas fa-arrow-up"></i></button>
            <button @click="move(index, 1)" :disabled="index === services.length - 1" title="Descer"><i class="fas fa-arrow-down"></i></button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-title">
            <img v-if="item.icon" :src="item.icon" class="card-icon" :alt="item.title" />
            <h3>{{ item.title }}</h3>
          </div>
          <p class="card-desc">{{ item.description }}</p>
          <div class="card-feats">
            <span v-for="(f, i) in (item.features || []).slice(0, 3)" :key="i" class="feat-pill">{{ f }}</span>
            <span v-if="(item.features || []).length > 3" class="feat-more">+{{ item.features.length - 3 }}</span>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-pub" :class="{ off: !item.published }" @click="togglePublish(item)">
            <i class="fas" :class="item.published ? 'fa-eye-slash' : 'fa-eye'"></i>
            {{ item.published ? "Ocultar" : "Publicar" }}
          </button>
          <button class="btn-editar" @click="openEdit(item)"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-excluir" @click="remove(item)"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingId ? "Editar Serviço" : "Novo Serviço" }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <form class="modal-form" @submit.prevent="save">
          <div class="form-group">
            <label>Nome do serviço *</label>
            <input v-model="form.title" type="text" required placeholder="Ex: Sistemas Web" />
          </div>

          <div class="form-group">
            <label>Imagem do serviço</label>
            <div class="image-field">
              <div class="image-preview" v-if="form.image"><img :src="resolveImg(form.image)" @error="onImgError" /></div>
              <div class="image-inputs">
                <label class="btn-upload">
                  <i class="fas fa-upload"></i> {{ uploading ? "Enviando..." : "Enviar imagem" }}
                  <input type="file" accept="image/*" class="file-input" @change="handleUpload" />
                </label>
                <input v-model="form.image" type="text" class="url-input" placeholder="ou cole a URL da imagem" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Ícone (URL)</label>
              <input v-model="form.icon" type="text" placeholder="https://api.iconify.design/..." />
            </div>
            <div class="form-group">
              <label>Cor de destaque</label>
              <input v-model="form.color" type="color" class="color-input" />
            </div>
          </div>

          <div class="form-group">
            <label>Descrição</label>
            <textarea v-model="form.description" rows="3" placeholder="O que este serviço faz..."></textarea>
          </div>

          <div class="form-group">
            <label>Recursos (um por linha)</label>
            <textarea v-model="featuresText" rows="5" placeholder="Design responsivo&#10;SEO otimizado&#10;..."></textarea>
          </div>

          <div class="form-group">
            <label>Link do botão "Saiba mais"</label>
            <input v-model="form.link" type="text" placeholder="/contato" />
          </div>

          <label class="checkbox">
            <input type="checkbox" v-model="form.published" />
            <span>Publicar no site</span>
          </label>

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
  </div>
</template>

<script>
import servicesService from "@/services/servicesService";

function emptyForm() {
  return {
    title: "",
    image: "",
    icon: "https://api.iconify.design/heroicons:sparkles.svg",
    color: "#0099DD",
    description: "",
    features: [],
    link: "/contato",
    published: true,
  };
}

export default {
  name: "ServicesEditor",
  data() {
    return {
      services: [],
      loading: false,
      saving: false,
      uploading: false,
      showModal: false,
      editingId: null,
      form: emptyForm(),
      featuresText: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async loadServices() {
      this.loading = true;
      try {
        this.services = await servicesService.getAll();
      } catch (e) {
        this.flash("Não foi possível carregar os serviços. O servidor está rodando?", "error");
      } finally {
        this.loading = false;
      }
    },
    openCreate() {
      this.editingId = null;
      this.form = emptyForm();
      this.featuresText = "";
      this.showModal = true;
    },
    openEdit(item) {
      this.editingId = item._id;
      this.form = {
        title: item.title || "",
        image: item.image || "",
        icon: item.icon || "",
        color: item.color || "#0099DD",
        description: item.description || "",
        features: item.features || [],
        link: item.link || "/contato",
        published: !!item.published,
      };
      this.featuresText = (item.features || []).join("\n");
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.editingId = null;
    },
    payload() {
      return {
        ...this.form,
        features: this.featuresText
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean),
      };
    },
    async save() {
      if (!this.form.title) {
        this.flash("Informe o nome do serviço.", "error");
        return;
      }
      this.saving = true;
      try {
        if (this.editingId) {
          await servicesService.update(this.editingId, this.payload());
          this.flash("Serviço atualizado e sincronizado com o site!", "success");
        } else {
          await servicesService.create(this.payload());
          this.flash("Serviço criado com sucesso!", "success");
        }
        this.closeModal();
        await this.loadServices();
      } catch (e) {
        this.flash("Erro ao salvar o serviço.", "error");
      } finally {
        this.saving = false;
      }
    },
    async togglePublish(item) {
      try {
        await servicesService.togglePublish(item._id);
        item.published = !item.published;
        this.flash(item.published ? "Serviço publicado no site!" : "Serviço ocultado do site.", "success");
      } catch (e) {
        this.flash("Erro ao alterar publicação.", "error");
      }
    },
    async remove(item) {
      if (!confirm(`Excluir o serviço "${item.title}"?`)) return;
      try {
        await servicesService.remove(item._id);
        this.services = this.services.filter((s) => s._id !== item._id);
        this.flash("Serviço excluído.", "success");
      } catch (e) {
        this.flash("Erro ao excluir o serviço.", "error");
      }
    },
    async move(index, dir) {
      const newIndex = index + dir;
      if (newIndex < 0 || newIndex >= this.services.length) return;
      const arr = this.services.slice();
      const [moved] = arr.splice(index, 1);
      arr.splice(newIndex, 0, moved);
      this.services = arr;
      try {
        await servicesService.reorder(arr.map((s) => s._id));
      } catch (e) {
        this.flash("Erro ao reordenar.", "error");
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
        this.form.image = await servicesService.uploadImage(file);
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
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4=";
    },
    flash(message, type = "success") {
      if (type === "success") { this.successMessage = message; this.errorMessage = ""; }
      else { this.errorMessage = message; this.successMessage = ""; }
      setTimeout(() => { this.successMessage = ""; this.errorMessage = ""; }, 4000);
    },
  },
  mounted() {
    this.loadServices();
  },
};
</script>

<style scoped>
.services-editor { position: relative; }
.section-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 28px; flex-wrap: wrap; gap: 16px;
}
.header-left h2 { font-size: 1.6rem; color: var(--gray-900); display: flex; align-items: center; gap: 12px; }
.header-left h2 i { color: var(--primary); }
.subtitle { color: var(--gray-500); font-size: 0.9rem; margin-top: 4px; }
.header-actions { display: flex; gap: 12px; }

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: #fff; border: none; padding: 12px 22px; border-radius: 12px;
  font-weight: 600; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px;
}
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.btn-secondary {
  background: #fff; color: var(--primary); border: 2px solid var(--gray-200);
  padding: 10px 18px; border-radius: 12px; font-weight: 600; font-size: 14px; cursor: pointer;
  display: flex; align-items: center; gap: 8px;
}

.alert { padding: 14px 18px; border-radius: 12px; margin-bottom: 18px; display: flex; align-items: center; gap: 10px; font-weight: 500; }
.alert.success { background: #d4edda; color: #155724; }
.alert.error { background: #f8d7da; color: #721c24; }

.state-box { text-align: center; padding: 60px 20px; background: #fff; border-radius: 16px; border: 1px solid var(--gray-200); color: var(--gray-500); }
.state-box i { font-size: 2.4rem; color: var(--gray-300); margin-bottom: 12px; }
.state-box h3 { color: var(--gray-700); margin-bottom: 14px; }

.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
.service-card {
  background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm); display: flex; flex-direction: column; transition: all 0.3s ease;
}
.service-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-4px); }
.card-media { position: relative; height: 150px; overflow: hidden; background: var(--gray-100); }
.card-media img { width: 100%; height: 100%; object-fit: cover; }
.pub-badge { position: absolute; top: 10px; left: 10px; padding: 4px 12px; border-radius: 20px; font-size: 11.5px; font-weight: 700; color: #fff; }
.pub-badge.on { background: rgba(16,185,129,0.92); }
.pub-badge.off { background: rgba(100,116,139,0.9); }
.reorder { position: absolute; top: 10px; right: 10px; display: flex; gap: 6px; }
.reorder button {
  width: 30px; height: 30px; border-radius: 8px; border: none; cursor: pointer;
  background: rgba(255,255,255,0.9); color: var(--gray-700); display: flex; align-items: center; justify-content: center;
}
.reorder button:disabled { opacity: 0.4; cursor: not-allowed; }

.card-body { padding: 16px 18px; flex: 1; }
.card-title { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.card-icon { width: 26px; height: 26px; object-fit: contain; }
.card-title h3 { font-size: 1.15rem; color: var(--gray-900); margin: 0; }
.card-desc { color: var(--gray-600); font-size: 13.5px; margin-bottom: 12px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
.card-feats { display: flex; flex-wrap: wrap; gap: 6px; }
.feat-pill { padding: 3px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 600; background: var(--gray-50); color: var(--sc); border: 1px solid var(--gray-200); }
.feat-more { padding: 3px 10px; border-radius: 12px; font-size: 11.5px; font-weight: 600; background: var(--gray-100); color: var(--gray-500); }

.card-footer { padding: 14px 18px; display: flex; gap: 8px; border-top: 1px solid var(--gray-100); }
.card-footer button { border: none; border-radius: 10px; padding: 9px 10px; font-weight: 600; font-size: 13px; cursor: pointer; color: #fff; display: flex; align-items: center; justify-content: center; gap: 6px; }
.btn-pub { flex: 1; background: linear-gradient(135deg, #27ae60, #2ecc71); }
.btn-pub.off { background: linear-gradient(135deg, #64748b, #475569); }
.btn-editar { flex: 1; background: linear-gradient(135deg, #3498db, #2980b9); }
.btn-excluir { background: linear-gradient(135deg, #e74c3c, #c0392b); width: 42px; }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
.modal-content { background: #fff; border-radius: 16px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid var(--gray-200); position: sticky; top: 0; background: #fff; }
.modal-header h3 { margin: 0; font-size: 1.3rem; color: var(--gray-900); }
.close-btn { background: none; border: none; font-size: 1.6rem; cursor: pointer; color: var(--gray-500); }
.modal-form { padding: 24px; }
.form-group { margin-bottom: 18px; }
.form-row { display: grid; grid-template-columns: 1fr 160px; gap: 14px; }
.form-group label { display: block; margin-bottom: 7px; font-weight: 600; color: var(--gray-800); font-size: 14px; }
.form-group input, .form-group textarea {
  width: 100%; padding: 11px 12px; border: 1px solid var(--gray-300); border-radius: 8px;
  font-size: 14.5px; font-family: inherit; box-sizing: border-box;
}
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
.color-input { height: 44px; padding: 4px; cursor: pointer; }
.image-field { display: flex; gap: 14px; align-items: flex-start; }
.image-preview { width: 90px; height: 90px; border-radius: 10px; overflow: hidden; flex-shrink: 0; background: var(--gray-100); border: 1px solid var(--gray-200); }
.image-preview img { width: 100%; height: 100%; object-fit: cover; }
.image-inputs { flex: 1; display: flex; flex-direction: column; gap: 10px; }
.btn-upload { background: var(--primary); color: #fff; padding: 10px 14px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 8px; position: relative; overflow: hidden; }
.file-input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
.checkbox { display: flex; align-items: center; gap: 10px; font-weight: 500; color: var(--gray-700); cursor: pointer; margin-bottom: 20px; }
.checkbox input { width: 18px; height: 18px; }
.form-actions { display: flex; gap: 12px; justify-content: flex-end; }

@media (max-width: 768px) {
  .services-grid { grid-template-columns: 1fr; }
  .form-row { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; }
  .header-actions { width: 100%; }
}
</style>
