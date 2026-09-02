<template>
  <div class="authors-management">
    <div class="section-header">
      <div>
        <h2>Autores e Portfólios Pessoais</h2>
        <p class="subtitle">
          Cadastre os desenvolvedores da agência. Ao marcar um autor em um
          projeto, ele aparece automaticamente na página pessoal dele.
        </p>
      </div>
      <button class="btn-primary-new" @click="openCreateModal">
        <i class="fas fa-user-plus"></i> Criar Autor
      </button>
    </div>

    <!-- Loading -->
    <div v-if="authorStore.loading && !authorStore.authors.length" class="loading-container">
      <div class="spinner"></div>
      <p>Carregando autores...</p>
    </div>

    <!-- Erro -->
    <div v-if="authorStore.error" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      {{ authorStore.error }}
      <button @click="authorStore.clearError" class="btn-close-error">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Vazio -->
    <div
      v-if="!authorStore.loading && !authorStore.authors.length"
      class="empty-state"
    >
      <i class="fas fa-users"></i>
      <h3>Nenhum autor cadastrado</h3>
      <p>
        Crie o primeiro autor para começar a marcar quem assinou cada projeto.
      </p>
      <button class="btn-primary-new" @click="openCreateModal">
        <i class="fas fa-user-plus"></i> Criar Autor
      </button>
    </div>

    <!-- Grid de autores -->
    <div v-if="authorStore.authors.length" class="authors-grid">
      <div
        v-for="author in authorStore.authors"
        :key="author._id"
        class="author-card"
      >
        <div class="author-card-top">
          <div class="author-avatar">
            <img v-if="author.avatar" :src="author.avatar" :alt="author.name" />
            <span v-else>{{ iniciais(author.name) }}</span>
          </div>
          <div class="author-identity">
            <h3>{{ author.name }}</h3>
            <p v-if="author.role">{{ author.role }}</p>
            <span
              class="author-status"
              :class="{ published: author.published }"
            >
              {{ author.published ? "Perfil no ar" : "Perfil oculto" }}
            </span>
          </div>
        </div>

        <div class="author-stats">
          <span>
            <i class="fas fa-folder-open"></i>
            {{ author.projectsCount || 0 }}
            {{ (author.projectsCount || 0) === 1 ? "projeto" : "projetos" }}
          </span>
          <span><i class="fas fa-sort-numeric-down"></i> Posição {{ author.position ?? 0 }}</span>
        </div>

        <div v-if="author.skills && author.skills.length" class="author-skills">
          <span v-for="(skill, i) in author.skills.slice(0, 4)" :key="i">
            {{ skill }}
          </span>
          <span v-if="author.skills.length > 4" class="mais">
            +{{ author.skills.length - 4 }}
          </span>
        </div>

        <a
          v-if="author.slug"
          class="author-link"
          :href="`/portfolio/autor/${author.slug}`"
          target="_blank"
          rel="noopener"
        >
          <i class="fas fa-external-link-alt"></i>
          /portfolio/autor/{{ author.slug }}
        </a>

        <div class="author-actions">
          <button class="btn-edit" @click="editAuthor(author)">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button
            class="btn-toggle"
            :class="{ off: !author.published }"
            @click="togglePublish(author)"
          >
            <i :class="author.published ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            {{ author.published ? "Ocultar" : "Publicar" }}
          </button>
          <button class="btn-delete" @click="askDelete(author)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de criação/edição -->
    <div v-if="showModal" class="modal-overlay-new" @click.self="closeModal">
      <div class="modal-container-new">
        <div class="modal-header-new">
          <div>
            <h2>{{ isEditing ? "Editar Autor" : "Novo Autor" }}</h2>
            <p>
              Estes dados montam a página pessoal em
              <strong>/portfolio/autor/{{ slugPrevisto || "..." }}</strong>
            </p>
          </div>
          <button class="close-btn-new" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body-new">
          <form @submit.prevent="saveAuthor">
            <!-- Identidade -->
            <h3 class="form-section-title">
              <i class="fas fa-id-badge"></i> Identidade
            </h3>

            <div class="avatar-uploader">
              <div class="avatar-preview">
                <img v-if="formData.avatar" :src="formData.avatar" alt="Avatar" />
                <span v-else>{{ iniciais(formData.name) || "?" }}</span>
                <span v-if="uploading" class="avatar-carregando">
                  <i class="fas fa-spinner fa-spin"></i>
                </span>
              </div>

              <div class="avatar-actions">
                <div class="avatar-botoes">
                  <button
                    type="button"
                    class="btn-upload"
                    :disabled="uploading"
                    @click="abrirSeletorDeFoto"
                  >
                    <i class="fas fa-upload"></i>
                    {{ uploading ? "Enviando..." : formData.avatar ? "Trocar foto" : "Enviar foto" }}
                  </button>

                  <button
                    v-if="formData.avatar && !uploading"
                    type="button"
                    class="btn-link-danger"
                    @click="formData.avatar = ''"
                  >
                    Remover foto
                  </button>
                </div>

                <input
                  ref="avatarInput"
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  class="input-arquivo"
                  @change="uploadAvatar"
                />

                <p v-if="erroUpload" class="upload-erro">
                  <i class="fas fa-triangle-exclamation"></i> {{ erroUpload }}
                </p>
                <p v-else class="upload-hint">
                  PNG, JPG, WEBP ou GIF, até {{ limiteMb }}MB. Quadrada fica melhor.
                </p>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group-new">
                <label for="authorName"><i class="fas fa-user"></i> Nome *</label>
                <input
                  id="authorName"
                  v-model="formData.name"
                  type="text"
                  placeholder="Ex: Maciel Ribeiro"
                  required
                />
              </div>

              <div class="form-group-new">
                <label for="authorRole"><i class="fas fa-briefcase"></i> Cargo</label>
                <input
                  id="authorRole"
                  v-model="formData.role"
                  type="text"
                  placeholder="Ex: Desenvolvedor Full Stack"
                />
              </div>

              <div class="form-group-new">
                <label for="authorSlug">
                  <i class="fas fa-link"></i> Link da página (slug)
                </label>
                <input
                  id="authorSlug"
                  v-model="formData.slug"
                  type="text"
                  :placeholder="slugPrevisto || 'gerado a partir do nome'"
                />
                <small class="field-hint">
                  Só o final da URL, sem espaços. Deixe vazio para gerar pelo nome.
                </small>
              </div>

              <div class="form-group-new">
                <label for="authorPosition">
                  <i class="fas fa-sort-numeric-down"></i> Posição na lista
                </label>
                <input
                  id="authorPosition"
                  v-model.number="formData.position"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                />
                <small class="field-hint">Começa em 0. Menor número aparece primeiro.</small>
              </div>

              <div class="form-group-new full-width">
                <label for="authorHeadline">
                  <i class="fas fa-quote-left"></i> Frase de apresentação
                </label>
                <input
                  id="authorHeadline"
                  v-model="formData.headline"
                  type="text"
                  placeholder="Ex: Transformo ideias em sistemas que rodam de verdade"
                />
              </div>

              <div class="form-group-new full-width">
                <label for="authorBio"><i class="fas fa-align-left"></i> Sobre</label>
                <textarea
                  id="authorBio"
                  v-model="formData.bio"
                  rows="5"
                  placeholder="Conte a trajetória, especialidades e o que gosta de construir."
                ></textarea>
              </div>

              <div class="form-group-new">
                <label for="authorEmail"><i class="fas fa-envelope"></i> E-mail</label>
                <input
                  id="authorEmail"
                  v-model="formData.email"
                  type="email"
                  placeholder="nome@empresa.com"
                />
              </div>

              <div class="form-group-new">
                <label for="authorLocation">
                  <i class="fas fa-map-marker-alt"></i> Localização
                </label>
                <input
                  id="authorLocation"
                  v-model="formData.location"
                  type="text"
                  placeholder="Ex: São Paulo, SP"
                />
              </div>
            </div>

            <!-- Habilidades -->
            <h3 class="form-section-title"><i class="fas fa-code"></i> Habilidades</h3>

            <div class="form-group-new full-width">
              <div v-if="formData.skills.length" class="chips">
                <span v-for="(skill, i) in formData.skills" :key="i" class="chip">
                  {{ skill }}
                  <button type="button" @click="removeSkill(i)">
                    <i class="fas fa-times"></i>
                  </button>
                </span>
              </div>
              <div class="inline-input">
                <input
                  v-model="skillInput"
                  type="text"
                  placeholder="Digite uma habilidade e pressione Enter"
                  @keydown.enter.prevent="addSkill"
                />
                <button
                  type="button"
                  class="btn-add"
                  :disabled="!skillInput.trim()"
                  @click="addSkill"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Destaques -->
            <h3 class="form-section-title">
              <i class="fas fa-chart-simple"></i> Números de destaque
              <span class="section-hint">(até 4)</span>
            </h3>

            <div class="form-group-new full-width">
              <div v-if="formData.highlights.length" class="highlights-list">
                <div
                  v-for="(item, i) in formData.highlights"
                  :key="i"
                  class="highlight-row"
                >
                  <strong>{{ item.value }}</strong>
                  <span>{{ item.label }}</span>
                  <button type="button" @click="removeHighlight(i)">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="inline-input">
                <input
                  v-model="highlightValue"
                  type="text"
                  placeholder="Ex: 8 anos"
                  class="short"
                />
                <input
                  v-model="highlightLabel"
                  type="text"
                  placeholder="Ex: de experiência"
                />
                <button
                  type="button"
                  class="btn-add"
                  :disabled="
                    !highlightValue.trim() ||
                    !highlightLabel.trim() ||
                    formData.highlights.length >= 4
                  "
                  @click="addHighlight"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <!-- Redes -->
            <h3 class="form-section-title"><i class="fas fa-share-nodes"></i> Contato e redes</h3>

            <div class="form-grid">
              <div
                v-for="rede in redes"
                :key="rede.chave"
                class="form-group-new"
              >
                <label :for="`social-${rede.chave}`">
                  <i :class="rede.icone"></i> {{ rede.rotulo }}
                </label>
                <input
                  :id="`social-${rede.chave}`"
                  v-model="formData.socials[rede.chave]"
                  type="text"
                  :placeholder="rede.exemplo"
                />
              </div>
            </div>

            <!-- Visibilidade -->
            <h3 class="form-section-title"><i class="fas fa-eye"></i> Visibilidade</h3>

            <div class="toggles">
              <label class="checkbox-container">
                <input type="checkbox" v-model="formData.published" />
                <span class="checkbox-label">
                  <i class="fas fa-globe"></i> Publicar a página pessoal
                </span>
              </label>

              <label class="checkbox-container">
                <input type="checkbox" v-model="formData.available" />
                <span class="checkbox-label">
                  <i class="fas fa-circle-check"></i> Disponível para novos projetos
                </span>
              </label>

              <label class="checkbox-container">
                <input type="checkbox" v-model="formData.featured" />
                <span class="checkbox-label">
                  <i class="fas fa-star"></i> Destacar na lista de autores
                </span>
              </label>
            </div>

            <div class="modal-footer-new">
              <button type="button" class="btn-secondary-new" @click="closeModal">
                Cancelar
              </button>
              <button
                type="submit"
                class="btn-success-new"
                :disabled="isSaving || uploading || !formData.name"
              >
                <i class="fas fa-save"></i>
                {{
                  uploading
                    ? "Aguarde a foto..."
                    : isSaving
                    ? "Salvando..."
                    : isEditing
                    ? "Salvar alterações"
                    : "Criar autor"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Confirmação de exclusão -->
    <div v-if="authorToDelete" class="modal-overlay-new" @click.self="authorToDelete = null">
      <div class="modal-container-new small">
        <div class="modal-header-new">
          <div>
            <h2>Excluir autor</h2>
            <p>Esta ação não pode ser desfeita.</p>
          </div>
          <button class="close-btn-new" @click="authorToDelete = null">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body-new">
          <p class="delete-text">
            Remover <strong>{{ authorToDelete.name }}</strong>? A página pessoal
            sai do ar e a marcação dele é retirada dos projetos. Os projetos em
            si continuam publicados.
          </p>
          <div class="modal-footer-new">
            <button class="btn-secondary-new" @click="authorToDelete = null">
              Cancelar
            </button>
            <button class="btn-danger-new" :disabled="isDeleting" @click="confirmDelete">
              <i class="fas fa-trash"></i>
              {{ isDeleting ? "Excluindo..." : "Excluir" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuthorStore } from "@/stores/authorStore";
import authorService from "@/services/authorService";

/** Espelha o gerarSlug do backend para mostrar a URL antes de salvar. */
function paraSlug(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function formVazio() {
  return {
    name: "",
    slug: "",
    role: "",
    headline: "",
    bio: "",
    avatar: "",
    cover: "",
    email: "",
    location: "",
    skills: [],
    highlights: [],
    socials: {
      github: "",
      linkedin: "",
      instagram: "",
      behance: "",
      website: "",
      whatsapp: "",
    },
    available: false,
    featured: false,
    published: true,
    position: 0,
  };
}

export default {
  name: "AuthorsManagement",

  setup() {
    const authorStore = useAuthorStore();
    return { authorStore };
  },

  data() {
    return {
      showModal: false,
      isEditing: false,
      isSaving: false,
      isDeleting: false,
      uploading: false,
      erroUpload: "",
      limiteMb: 10,
      authorToDelete: null,
      skillInput: "",
      highlightValue: "",
      highlightLabel: "",
      redes: [
        { chave: "github", rotulo: "GitHub", icone: "fab fa-github", exemplo: "https://github.com/usuario" },
        { chave: "linkedin", rotulo: "LinkedIn", icone: "fab fa-linkedin", exemplo: "https://linkedin.com/in/usuario" },
        { chave: "instagram", rotulo: "Instagram", icone: "fab fa-instagram", exemplo: "https://instagram.com/usuario" },
        { chave: "behance", rotulo: "Behance", icone: "fab fa-behance", exemplo: "https://behance.net/usuario" },
        { chave: "website", rotulo: "Site pessoal", icone: "fas fa-globe", exemplo: "https://seusite.com" },
        { chave: "whatsapp", rotulo: "WhatsApp", icone: "fab fa-whatsapp", exemplo: "5511999999999" },
      ],
      formData: formVazio(),
    };
  },

  computed: {
    slugPrevisto() {
      return paraSlug(this.formData.slug || this.formData.name);
    },
  },

  mounted() {
    this.authorStore.fetchAllAuthors();
  },

  methods: {
    iniciais(nome) {
      return String(nome || "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte.charAt(0).toUpperCase())
        .join("");
    },

    // Sugere a próxima posição livre para um autor novo
    proximaPosicao() {
      const posicoes = (this.authorStore.authors || []).map((autor) =>
        Number.isFinite(Number(autor.position)) ? Number(autor.position) : 0
      );
      return posicoes.length ? Math.max(...posicoes) + 1 : 0;
    },

    openCreateModal() {
      this.isEditing = false;
      this.formData = { ...formVazio(), position: this.proximaPosicao() };
      this.erroUpload = "";
      this.skillInput = "";
      this.highlightValue = "";
      this.highlightLabel = "";
      this.showModal = true;
    },

    editAuthor(author) {
      this.isEditing = true;
      this.formData = {
        ...formVazio(),
        ...author,
        skills: [...(author.skills || [])],
        highlights: (author.highlights || []).map((item) => ({ ...item })),
        socials: { ...formVazio().socials, ...(author.socials || {}) },
        position: Number.isFinite(Number(author.position)) ? Number(author.position) : 0,
      };
      this.erroUpload = "";
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.erroUpload = "";
      this.formData = formVazio();
    },

    addSkill() {
      const valor = this.skillInput.trim();
      if (valor && !this.formData.skills.includes(valor)) {
        this.formData.skills.push(valor);
      }
      this.skillInput = "";
    },

    removeSkill(index) {
      this.formData.skills.splice(index, 1);
    },

    addHighlight() {
      const value = this.highlightValue.trim();
      const label = this.highlightLabel.trim();
      if (!value || !label || this.formData.highlights.length >= 4) return;
      this.formData.highlights.push({ value, label });
      this.highlightValue = "";
      this.highlightLabel = "";
    },

    removeHighlight(index) {
      this.formData.highlights.splice(index, 1);
    },

    abrirSeletorDeFoto() {
      this.erroUpload = "";
      this.$refs.avatarInput?.click();
    },

    async uploadAvatar(event) {
      const input = event.target;
      const file = input.files?.[0];

      // Sempre libera o input: sem isso, reescolher o mesmo arquivo nao dispara change
      input.value = "";

      if (!file) return;

      this.erroUpload = "";

      // Barrado aqui em vez de no servidor: a resposta e imediata e a mensagem
      // e especifica sobre o que deu errado com o arquivo escolhido.
      if (!/^image\//.test(file.type)) {
        this.erroUpload = "Esse arquivo não é uma imagem. Escolha um PNG, JPG, WEBP ou GIF.";
        return;
      }

      if (file.size > this.limiteMb * 1024 * 1024) {
        const tamanho = (file.size / (1024 * 1024)).toFixed(1);
        this.erroUpload = `A imagem tem ${tamanho}MB e o limite é ${this.limiteMb}MB. Reduza o tamanho e tente de novo.`;
        return;
      }

      this.uploading = true;
      try {
        const { url } = await authorService.uploadImage(file);
        this.formData.avatar = url;
      } catch (error) {
        console.error("Erro ao enviar a foto:", error);
        // Dentro do modal: o aviso do topo da pagina fica escondido atras dele
        this.erroUpload = error.message || "Não foi possível enviar a foto. Tente de novo.";
      } finally {
        this.uploading = false;
      }
    },

    async saveAuthor() {
      if (this.isSaving || this.uploading || !this.formData.name) return;

      this.isSaving = true;

      const posicao = Number(this.formData.position);
      const payload = {
        ...this.formData,
        slug: paraSlug(this.formData.slug),
        position: Number.isFinite(posicao) && posicao >= 0 ? Math.floor(posicao) : 0,
      };

      try {
        if (this.isEditing && payload._id) {
          await this.authorStore.updateAuthor(payload._id, payload);
        } else {
          const { _id, projectsCount, ...novo } = payload;
          await this.authorStore.createAuthor(novo);
        }
        // Recarrega para trazer slug definitivo e contagem de projetos.
        await this.authorStore.fetchAllAuthors();
        this.closeModal();
      } catch (error) {
        console.error("Erro ao salvar autor:", error);
      } finally {
        this.isSaving = false;
      }
    },

    async togglePublish(author) {
      try {
        await this.authorStore.togglePublish(author._id);
      } catch (error) {
        console.error("Erro ao alternar publicação:", error);
      }
    },

    askDelete(author) {
      this.authorToDelete = author;
    },

    async confirmDelete() {
      if (!this.authorToDelete || this.isDeleting) return;

      this.isDeleting = true;
      try {
        await this.authorStore.deleteAuthor(this.authorToDelete._id);
        this.authorToDelete = null;
      } catch (error) {
        console.error("Erro ao excluir autor:", error);
      } finally {
        this.isDeleting = false;
      }
    },
  },
};
</script>

<style scoped>
.authors-management {
  padding: 4px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 1.75rem;
  margin-bottom: 4px;
  color: #111827;
}

.subtitle {
  color: #6b7280;
  font-size: 0.95rem;
  max-width: 560px;
  line-height: 1.5;
}

/* Botões */
.btn-primary-new {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary-new:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary-new {
  background: #f3f4f6;
  color: #374151;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary-new:hover {
  background: #e5e7eb;
}

.btn-success-new {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.btn-success-new:hover:not(:disabled) {
  transform: translateY(-2px);
}

.btn-success-new:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-danger-new {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-danger-new:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Estados */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 60px 20px;
  color: #6b7280;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e5e7eb;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 14px 18px;
  border-radius: 8px;
  margin-bottom: 24px;
}

.btn-close-error {
  margin-left: auto;
  background: none;
  border: none;
  color: #b91c1c;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 70px 20px;
  background: #fff;
  border: 2px dashed #e5e7eb;
  border-radius: 16px;
}

.empty-state i {
  font-size: 2.6rem;
  color: #c7d2fe;
  margin-bottom: 16px;
}

.empty-state h3 {
  color: #111827;
  margin-bottom: 8px;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 22px;
}

/* Grid de autores */
.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.author-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease;
}

.author-card:hover {
  transform: translateY(-3px);
  border-color: #c7d2fe;
  box-shadow: 0 12px 30px rgba(102, 126, 234, 0.15);
}

.author-card-top {
  display: flex;
  gap: 14px;
  align-items: center;
}

.author-avatar {
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-identity h3 {
  margin: 0 0 2px;
  font-size: 1.05rem;
  color: #111827;
}

.author-identity p {
  margin: 0 0 6px;
  font-size: 0.85rem;
  color: #6b7280;
}

.author-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  background: #f3f4f6;
  color: #6b7280;
}

.author-status.published {
  background: #d1fae5;
  color: #047857;
}

.author-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  font-size: 0.83rem;
  color: #6b7280;
}

.author-stats i {
  color: #667eea;
  margin-right: 4px;
}

.author-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.author-skills span {
  background: #eef2ff;
  color: #4338ca;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.author-skills .mais {
  background: #f3f4f6;
  color: #6b7280;
}

.author-link {
  font-size: 0.8rem;
  color: #667eea;
  text-decoration: none;
  word-break: break-all;
}

.author-link:hover {
  text-decoration: underline;
}

.author-actions {
  display: flex;
  gap: 8px;
  margin-top: auto;
  padding-top: 4px;
}

.author-actions button {
  border: none;
  border-radius: 8px;
  padding: 9px 14px;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #eef2ff;
  color: #4338ca;
  flex: 1;
}

.btn-edit:hover {
  background: #e0e7ff;
}

.btn-toggle {
  background: #ecfdf5;
  color: #047857;
}

.btn-toggle.off {
  background: #fffbeb;
  color: #b45309;
}

.btn-delete {
  background: #fef2f2;
  color: #b91c1c;
}

.btn-delete:hover {
  background: #fee2e2;
}

/* Modal */
.modal-overlay-new {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.modal-container-new {
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-container-new.small {
  max-width: 520px;
}

.modal-header-new {
  padding: 24px 32px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.modal-header-new h2 {
  font-size: 1.5rem;
  margin-bottom: 4px;
  color: #111827;
}

.modal-header-new p {
  color: #6b7280;
  font-size: 0.9rem;
}

.close-btn-new {
  background: #f3f4f6;
  border: none;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
}

.close-btn-new:hover {
  background: #e5e7eb;
  color: #111827;
}

.modal-body-new {
  padding: 32px;
  overflow-y: auto;
}

.form-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #111827;
  margin: 32px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
}

.form-section-title:first-of-type {
  margin-top: 0;
}

.form-section-title i {
  color: #667eea;
}

.section-hint {
  font-weight: 400;
  font-size: 0.82rem;
  color: #9ca3af;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.form-group-new {
  display: flex;
  flex-direction: column;
}

.form-group-new.full-width {
  grid-column: 1 / -1;
}

.form-group-new label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.form-group-new label i {
  color: #667eea;
  width: 16px;
}

.form-group-new input,
.form-group-new textarea {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group-new input:focus,
.form-group-new textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.field-hint {
  display: block;
  margin-top: 6px;
  font-size: 0.78rem;
  line-height: 1.4;
  color: #9ca3af;
}

/* Avatar */
.avatar-uploader {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  padding: 18px;
  background: #f9fafb;
  border-radius: 12px;
}

.avatar-preview {
  width: 84px;
  height: 84px;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.avatar-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
}

.avatar-preview {
  position: relative;
}

.avatar-carregando {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, 0.55);
  color: #fff;
  font-size: 1.1rem;
}

.avatar-botoes {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-upload {
  background: #eef2ff;
  color: #4338ca;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s ease;
}

.btn-upload:hover:not(:disabled) {
  background: #e0e7ff;
}

.btn-upload:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Fica fora do fluxo mas continua acionavel por click() */
.input-arquivo {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.upload-erro {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  max-width: 380px;
  font-size: 0.82rem;
  line-height: 1.45;
  color: #b91c1c;
}

.btn-link-danger {
  background: none;
  border: none;
  color: #b91c1c;
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;
}

.upload-hint {
  font-size: 0.8rem;
  color: #6b7280;
}

/* Chips e listas */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.chip {
  background: #eef2ff;
  color: #4338ca;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.83rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.chip button {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0;
}

.inline-input {
  display: flex;
  gap: 8px;
}

.inline-input input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: inherit;
}

.inline-input input.short {
  max-width: 160px;
}

.inline-input input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  width: 46px;
  cursor: pointer;
  flex-shrink: 0;
}

.btn-add:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.highlights-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.highlight-row {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.9rem;
}

.highlight-row strong {
  color: #4338ca;
}

.highlight-row span {
  color: #6b7280;
}

.highlight-row button {
  margin-left: auto;
  background: none;
  border: none;
  color: #b91c1c;
  cursor: pointer;
}

/* Toggles */
.toggles {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-container input {
  width: 18px;
  height: 18px;
  accent-color: #667eea;
  cursor: pointer;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.92rem;
  color: #374151;
}

.checkbox-label i {
  color: #667eea;
}

.modal-footer-new {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
  padding-top: 22px;
  border-top: 1px solid #e5e7eb;
}

.delete-text {
  color: #374151;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .modal-body-new {
    padding: 22px;
  }

  .inline-input {
    flex-wrap: wrap;
  }

  .inline-input input.short {
    max-width: none;
  }
}
</style>
