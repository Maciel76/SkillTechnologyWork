<template>
  <div class="blog-management">
    <div class="section-header">
      <h2>Gerenciamento do Blog</h2>
      <button class="btn-primary" @click="openCreateModal">
        <i class="fas fa-plus"></i> Nova Postagem
      </button>
    </div>

    <!-- Lista de Artigos -->
    <div class="articles-grid">
      <div
        class="article-card"
        v-for="article in filteredArticles"
        :key="article.id"
        @click="viewArticle(article)"
      >
        <div class="article-image">
          <img :src="article.image" :alt="article.title" />
          <div class="article-status" :class="article.status">
            {{ article.status === "published" ? "Publicado" : "Rascunho" }}
          </div>
        </div>
        <div class="article-content">
          <h3>{{ article.title }}</h3>
          <p class="article-excerpt">{{ getExcerpt(article.content) }}</p>
          <div class="article-meta">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye"></i>
              <span>{{ article.views }} visualizações</span>
            </div>
          </div>
          <div class="article-tags">
            <span
              class="tag"
              v-for="tag in article.tags.slice(0, 3)"
              :key="tag"
            >
              {{ tag }}
            </span>
            <span v-if="article.tags.length > 3" class="tag-more">
              +{{ article.tags.length - 3 }}
            </span>
          </div>
        </div>
        <div class="article-actions">
          <button class="btn-edit" @click.stop="editArticle(article)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-delete" @click.stop="deleteArticle(article.id)">
            <i class="fas fa-trash"></i>
          </button>
          <button
            class="btn-publish"
            :class="{ published: article.status === 'published' }"
            @click.stop="togglePublish(article.id)"
          >
            <i
              class="fas"
              :class="
                article.status === 'published' ? 'fa-eye-slash' : 'fa-eye'
              "
            ></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de Criar/Editar Artigo -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content blog-modal" @click.stop>
        <div class="modal-header">
          <h3>{{ isEditing ? "Editar Artigo" : "Criar Novo Artigo" }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="saveArticle" class="article-form">
            <!-- Imagem Principal -->
            <div class="form-section">
              <h4>Imagem de Capa</h4>
              <div class="image-upload-section">
                <div class="image-preview" v-if="formData.image">
                  <img :src="formData.image" alt="Preview" />
                  <button
                    type="button"
                    class="btn-remove-image"
                    @click="formData.image = ''"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
                <div
                  class="upload-placeholder"
                  v-else
                  @click="triggerImageInput"
                >
                  <i class="fas fa-image"></i>
                  <p>Adicionar imagem de capa</p>
                </div>
                <input
                  type="url"
                  v-model="formData.image"
                  placeholder="Cole a URL da imagem aqui"
                  class="image-url-input"
                  @input="updateImagePreview"
                />
                <small class="help-text">
                  Use imagens com proporção 16:9 (recomendado: 800x450px)
                </small>
              </div>
            </div>

            <!-- Informações Básicas -->
            <div class="form-section">
              <h4>Informações Básicas</h4>
              <div class="form-group">
                <label for="articleTitle">Título do Artigo *</label>
                <input
                  id="articleTitle"
                  type="text"
                  v-model="formData.title"
                  placeholder="Digite o título do artigo"
                  required
                />
              </div>

              <div class="form-group">
                <label for="articleSlug">Slug (URL) *</label>
                <input
                  id="articleSlug"
                  type="text"
                  v-model="formData.slug"
                  placeholder="url-amigavel-do-artigo"
                  required
                />
                <small class="help-text">
                  https://seusite.com/blog/{{ formData.slug }}
                </small>
              </div>
            </div>

            <!-- Editor de Conteúdo -->
            <div class="form-section">
              <h4>Conteúdo do Artigo</h4>
              <div class="editor-container">
                <QuillEditor
                  v-model="formData.content"
                  contentType="html"
                  :options="editorOptions"
                  theme="snow"
                  @text-change="onContentChange"
                />
              </div>
            </div>

            <!-- Metadados -->
            <div class="form-section">
              <h4>Metadados</h4>
              <div class="form-row">
                <div class="form-group">
                  <label for="articleExcerpt">Resumo</label>
                  <textarea
                    id="articleExcerpt"
                    v-model="formData.excerpt"
                    placeholder="Breve descrição do artigo"
                    rows="3"
                    maxlength="200"
                  ></textarea>
                  <small class="char-count"
                    >{{ formData.excerpt.length }}/200</small
                  >
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="articleAuthor">Autor</label>
                  <input
                    id="articleAuthor"
                    type="text"
                    v-model="formData.author"
                    placeholder="Nome do autor"
                  />
                </div>

                <div class="form-group">
                  <label for="articleReadTime"
                    >Tempo de Leitura (minutos)</label
                  >
                  <input
                    id="articleReadTime"
                    type="number"
                    v-model="formData.readTime"
                    min="1"
                    placeholder="5"
                  />
                </div>
              </div>
            </div>

            <!-- Categorias e Tags -->
            <div class="form-section">
              <h4>Categorias e Tags</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Categorias</label>
                  <div class="category-list">
                    <div
                      class="category-item"
                      v-for="category in blogCategories"
                      :key="category.id"
                    >
                      <input
                        type="checkbox"
                        :id="'cat-' + category.id"
                        :value="category.id"
                        v-model="formData.categories"
                      />
                      <label :for="'cat-' + category.id">{{
                        category.name
                      }}</label>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Tags</label>
                  <div class="tags-input-container">
                    <div class="tags-input">
                      <input
                        type="text"
                        v-model="newTag"
                        placeholder="Digite uma tag"
                        @keypress.enter="addTag"
                      />
                      <button type="button" @click="addTag" :disabled="!newTag">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="tags-list">
                      <span class="tag" v-for="tag in formData.tags" :key="tag">
                        {{ tag }}
                        <i class="fas fa-times" @click="removeTag(tag)"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Configurações -->
            <div class="form-section">
              <h4>Configurações</h4>
              <div class="form-row">
                <div class="form-group">
                  <label for="articleStatus">Status</label>
                  <select id="articleStatus" v-model="formData.status">
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="checkbox-label">
                    <input type="checkbox" v-model="formData.featured" />
                    <span class="checkmark"></span>
                    Artigo em Destaque
                  </label>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" @click="closeModal">
                Cancelar
              </button>
              <button type="submit" class="btn-primary">
                {{ isEditing ? "Atualizar" : "Publicar" }} Artigo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal de Visualização do Artigo -->
    <div
      v-if="selectedArticle"
      class="article-modal-overlay"
      @click="closeArticleModal"
    >
      <div class="article-modal-content" @click.stop>
        <button class="close-article-modal" @click="closeArticleModal">
          <i class="fas fa-times"></i>
        </button>

        <div class="article-modal-header">
          <img :src="selectedArticle.image" :alt="selectedArticle.title" />
        </div>

        <div class="article-modal-body">
          <div class="article-meta-modal">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(selectedArticle.createdAt) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span>{{ selectedArticle.author }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ selectedArticle.readTime }} min de leitura</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye"></i>
              <span>{{ selectedArticle.views }} visualizações</span>
            </div>
          </div>

          <h1>{{ selectedArticle.title }}</h1>

          <div class="article-tags-modal">
            <span class="tag" v-for="tag in selectedArticle.tags" :key="tag">
              {{ tag }}
            </span>
          </div>

          <div
            class="article-content-modal"
            v-html="selectedArticle.content"
          ></div>

          <div class="article-modal-actions">
            <button class="btn-edit" @click="editArticle(selectedArticle)">
              <i class="fas fa-edit"></i> Editar Artigo
            </button>
            <button
              class="btn-delete"
              @click="deleteArticle(selectedArticle.id)"
            >
              <i class="fas fa-trash"></i> Excluir Artigo
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="showDeleteModal" class="modal-overlay" @click="closeDeleteModal">
      <div class="modal-content delete-modal" @click.stop>
        <div class="modal-header">
          <h3>Confirmar Exclusão</h3>
          <button class="close-btn" @click="closeDeleteModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Tem certeza que deseja excluir o artigo "<strong>{{
              articleToDelete?.title
            }}</strong
            >"?
          </p>
          <div class="form-actions">
            <button
              type="button"
              class="btn-secondary"
              @click="closeDeleteModal"
            >
              Cancelar
            </button>
            <button type="button" class="btn-danger" @click="confirmDelete">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "BlogManagement",
  components: {
    QuillEditor,
  },
  data() {
    return {
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      selectedArticle: null,
      articleToDelete: null,
      newTag: "",
      formData: {
        id: null,
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        author: "Admin User",
        readTime: 5,
        categories: [],
        tags: [],
        status: "draft",
        featured: false,
        views: 0,
        createdAt: null,
      },
      editorOptions: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
        placeholder: "Comece a escrever seu artigo aqui...",
        theme: "snow",
      },
      articles: [
        {
          id: 1,
          title: "Introdução ao Vue.js 3",
          slug: "introducao-ao-vuejs-3",
          content:
            "<h2>O que é Vue.js?</h2><p>Vue.js é um framework progressivo para construção de interfaces de usuário.</p><p>Diferente de outros frameworks monolíticos, Vue foi projetado desde sua concepção para ser adotável incrementalmente.</p>",
          excerpt:
            "Aprenda os conceitos básicos do Vue.js 3 e como começar a desenvolver aplicações modernas.",
          image:
            "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800",
          author: "Admin User",
          readTime: 5,
          categories: [1],
          tags: ["Vue.js", "JavaScript", "Frontend"],
          status: "published",
          featured: true,
          views: 1542,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: 2,
          title: "Design Responsivo com CSS Grid",
          slug: "design-responsivo-css-grid",
          content:
            "<h2>CSS Grid Layout</h2><p>O CSS Grid Layout é um sistema de layout bidimensional para a web.</p><p>Ele permite alinhar elementos em linhas e colunas, facilitando a criação de layouts complexos e responsivos.</p>",
          excerpt:
            "Domine o CSS Grid e crie layouts responsivos e modernos para suas aplicações web.",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
          author: "Admin User",
          readTime: 8,
          categories: [2],
          tags: ["CSS", "Design", "Responsivo"],
          status: "published",
          featured: false,
          views: 892,
          createdAt: new Date("2024-02-20"),
        },
        {
          id: 3,
          title: "Otimização de SEO para Desenvolvedores",
          slug: "otimizacao-seo-desenvolvedores",
          content:
            "<h2>SEO Técnico</h2><p>O SEO técnico é fundamental para o sucesso de qualquer site.</p><p>Desenvolvedores precisam entender os princípios básicos para criar sites otimizados desde o início.</p>",
          excerpt:
            "Princípios essenciais de SEO que todo desenvolvedor web deve conhecer.",
          image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
          author: "Admin User",
          readTime: 6,
          categories: [4],
          tags: ["SEO", "Marketing", "Web"],
          status: "draft",
          featured: false,
          views: 0,
          createdAt: new Date("2024-03-10"),
        },
      ],
      blogCategories: [
        { id: 1, name: "Desenvolvimento Web" },
        { id: 2, name: "Design" },
        { id: 3, name: "Marketing Digital" },
        { id: 4, name: "SEO" },
        { id: 5, name: "JavaScript" },
        { id: 6, name: "Vue.js" },
      ],
    };
  },
  computed: {
    filteredArticles() {
      return this.articles
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  },
  methods: {
    openCreateModal() {
      this.isEditing = false;
      this.formData = {
        id: null,
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image: "",
        author: "Admin User",
        readTime: 5,
        categories: [],
        tags: [],
        status: "draft",
        featured: false,
        views: 0,
        createdAt: new Date(),
      };
      this.showModal = true;
    },

    editArticle(article) {
      this.isEditing = true;
      this.formData = { ...article };
      this.closeArticleModal();
      this.showModal = true;
    },

    saveArticle() {
      if (!this.formData.title.trim()) {
        alert("O título é obrigatório");
        return;
      }

      // Gerar slug automaticamente se não preenchido
      if (!this.formData.slug.trim()) {
        this.formData.slug = this.generateSlug(this.formData.title);
      }

      if (this.isEditing) {
        // Atualizar artigo existente
        const index = this.articles.findIndex((a) => a.id === this.formData.id);
        if (index !== -1) {
          this.articles.splice(index, 1, { ...this.formData });
        }
      } else {
        // Criar novo artigo
        const newArticle = {
          ...this.formData,
          id: Date.now(),
          createdAt: new Date(),
          views: 0,
        };
        this.articles.push(newArticle);
      }

      this.closeModal();
    },

    deleteArticle(articleId) {
      this.articleToDelete = this.articles.find(
        (article) => article.id === articleId
      );
      this.showDeleteModal = true;
    },

    confirmDelete() {
      if (this.articleToDelete) {
        this.articles = this.articles.filter(
          (article) => article.id !== this.articleToDelete.id
        );
        this.closeDeleteModal();
        this.closeArticleModal();
      }
    },

    togglePublish(articleId) {
      const article = this.articles.find((a) => a.id === articleId);
      if (article) {
        article.status = article.status === "published" ? "draft" : "published";
      }
    },

    viewArticle(article) {
      // Incrementar visualizações
      article.views++;
      this.selectedArticle = article;
    },

    addTag() {
      if (
        this.newTag.trim() &&
        !this.formData.tags.includes(this.newTag.trim())
      ) {
        this.formData.tags.push(this.newTag.trim());
        this.newTag = "";
      }
    },

    removeTag(tag) {
      this.formData.tags = this.formData.tags.filter((t) => t !== tag);
    },

    generateSlug(title) {
      return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    },

    getExcerpt(content) {
      // Remover tags HTML e limitar o texto
      const div = document.createElement("div");
      div.innerHTML = content;
      const text = div.textContent || div.innerText || "";
      return text.length > 150 ? text.substring(0, 150) + "..." : text;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    onContentChange() {
      // Calcular tempo de leitura aproximado
      const wordCount = this.formData.content
        .replace(/<[^>]*>/g, "")
        .split(/\s+/).length;
      this.formData.readTime = Math.max(1, Math.ceil(wordCount / 200));

      // Gerar excerpt automaticamente se não preenchido
      if (!this.formData.excerpt) {
        this.formData.excerpt = this.getExcerpt(this.formData.content);
      }
    },

    triggerImageInput() {
      // Em uma implementação real, isso abriria um seletor de arquivos
      // Por enquanto, vamos apenas focar no input de URL
      const input = document.querySelector(".image-url-input");
      if (input) input.focus();
    },

    updateImagePreview() {
      // Validação básica de URL de imagem
      // Em produção, você pode adicionar validações mais robustas
    },

    closeModal() {
      this.showModal = false;
    },

    closeArticleModal() {
      this.selectedArticle = null;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.articleToDelete = null;
    },
  },
};
</script>

<style scoped>
.blog-management {
  padding: 20px;
}

/* Grid de Artigos */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--gray-200);
  position: relative;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.article-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.05);
}

.article-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.article-status.published {
  background: var(--success);
  color: white;
}

.article-status.draft {
  background: var(--warning);
  color: white;
}

.article-content {
  padding: 20px;
}

.article-content h3 {
  margin-bottom: 12px;
  font-weight: 600;
  color: var(--gray-900);
  font-size: 1.2rem;
  line-height: 1.3;
}

.article-excerpt {
  color: var(--gray-600);
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 0.95rem;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: var(--gray-500);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item i {
  width: 14px;
  color: var(--primary);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.article-tags .tag {
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-more {
  background: var(--gray-200);
  color: var(--gray-600);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.article-actions {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  background: var(--gray-50);
  border-top: 1px solid var(--gray-200);
}

.article-actions button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-edit {
  background: var(--info);
  color: white;
}

.btn-edit:hover {
  background: #1a6bc4;
}

.btn-delete {
  background: var(--danger);
  color: white;
}

.btn-delete:hover {
  background: #dc2626;
}

.btn-publish {
  background: var(--gray-300);
  color: var(--gray-700);
}

.btn-publish.published {
  background: var(--success);
  color: white;
}

.btn-publish:hover {
  opacity: 0.9;
}

/* Modal do Blog */
.blog-modal {
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-section {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--gray-200);
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h4 {
  margin-bottom: 16px;
  color: var(--gray-800);
  font-weight: 600;
  font-size: 1.1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: var(--gray-700);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 2px solid var(--gray-200);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s;
  background: white;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.char-count {
  display: block;
  text-align: right;
  color: var(--gray-500);
  font-size: 0.8rem;
  margin-top: 4px;
}

/* Editor Quill */
.editor-container {
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid var(--gray-200);
}

.editor-container:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* Categorias e Tags */
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 8px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-item input[type="checkbox"] {
  width: auto;
}

.tags-input-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tags-input {
  display: flex;
  gap: 8px;
}

.tags-input input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid var(--gray-200);
  border-radius: 6px;
}

.tags-input button {
  padding: 8px 16px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.tags-input button:hover:not(:disabled) {
  background: var(--primary-dark);
}

.tags-input button:disabled {
  background: var(--gray-400);
  cursor: not-allowed;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags-list .tag {
  background: #f0f7ff;
  color: var(--primary);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.tags-list .tag:hover {
  background: #e0effe;
}

.tags-list .tag i {
  cursor: pointer;
  font-size: 0.7rem;
  padding: 2px;
  border-radius: 50%;
  transition: background 0.3s;
}

.tags-list .tag i:hover {
  background: rgba(0, 0, 0, 0.1);
}

/* Modal de Visualização do Artigo */
.article-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.article-modal-content {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
}

.close-article-modal {
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;
}

.close-article-modal:hover {
  background: rgba(0, 0, 0, 0.9);
}

.article-modal-header {
  position: relative;
  height: 300px;
}

.article-modal-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-modal-body {
  padding: 32px;
}

.article-meta-modal {
  display: flex;
  gap: 20px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--gray-200);
  flex-wrap: wrap;
}

.article-meta-modal .meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-600);
  font-size: 0.95rem;
}

.article-meta-modal .meta-item i {
  width: 16px;
  color: var(--primary);
}

.article-modal-body h1 {
  margin-bottom: 16px;
  color: var(--gray-900);
  font-size: 2.2rem;
  line-height: 1.2;
  font-weight: 700;
}

.article-tags-modal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.article-tags-modal .tag {
  background: var(--gray-100);
  color: var(--gray-700);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

.article-content-modal {
  line-height: 1.7;
  color: var(--gray-700);
  margin-bottom: 32px;
}

.article-content-modal >>> h2 {
  margin: 24px 0 16px 0;
  color: var(--gray-900);
  font-size: 1.5rem;
}

.article-content-modal >>> h3 {
  margin: 20px 0 12px 0;
  color: var(--gray-900);
  font-size: 1.3rem;
}

.article-content-modal >>> p {
  margin-bottom: 16px;
}

.article-content-modal >>> ul,
.article-content-modal >>> ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.article-content-modal >>> li {
  margin-bottom: 8px;
}

.article-content-modal >>> blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 16px;
  margin: 20px 0;
  font-style: italic;
  color: var(--gray-600);
}

.article-content-modal >>> code {
  background: var(--gray-100);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
}

.article-modal-actions {
  display: flex;
  gap: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--gray-200);
}

.article-modal-actions button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.article-modal-actions .btn-edit {
  background: var(--info);
  color: white;
}

.article-modal-actions .btn-edit:hover {
  background: #1a6bc4;
}

.article-modal-actions .btn-delete {
  background: var(--danger);
  color: white;
}

.article-modal-actions .btn-delete:hover {
  background: #dc2626;
}

/* Responsive */
@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .article-modal-content {
    margin: 10px;
  }

  .article-modal-body {
    padding: 24px;
  }

  .article-modal-body h1 {
    font-size: 1.8rem;
  }

  .article-meta-modal {
    flex-direction: column;
    gap: 12px;
  }

  .article-modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .blog-management {
    padding: 10px;
  }

  .article-content {
    padding: 16px;
  }

  .article-actions {
    flex-direction: column;
  }

  .article-actions button {
    padding: 10px;
  }
}
</style>
