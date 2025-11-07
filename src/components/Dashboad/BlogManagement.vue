<template>
  <div class="blog-management">
    <!-- Header com Estatísticas -->
    <div class="stats-header">
      <div class="stat-card">
        <div class="stat-icon published">
          <img
            src="@/assets/svg/icons/blogicons/publicados.svg"
            width="35px"
            alt=""
          />
        </div>
        <div class="stat-content">
          <h3>{{ stats.publicados }}</h3>

          <p>Publicados1</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon draft">
          <img
            src="@/assets/svg/icons/blogicons/rascunho.svg"
            width="35px"
            alt=""
          />
        </div>
        <div class="stat-content">
          <h3>{{ stats.rascunhos }}</h3>
          <p>Rascunhos</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon views">
          <img
            src="@/assets/svg/icons/blogicons/visualizacao.svg"
            width="35px"
            alt=""
          />
        </div>
        <div class="stat-content">
          <h3>{{ stats.totalVisualizacoes }}</h3>
          <p>Visualizações</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon total">
          <img
            src="@/assets/svg/icons/blogicons/artigos.svg"
            width="35px"
            alt=""
          />
        </div>
        <div class="stat-content">
          <h3>{{ stats.total }}</h3>
          <p>Total de Artigos</p>
        </div>
      </div>
    </div>

    <!-- Header com Ações -->
    <div class="section-header">
      <div class="header-left">
        <h2>Gerenciamento do Blog</h2>
        <div class="filter-tabs">
          <button
            :class="{ active: currentFilter === 'all' }"
            @click="currentFilter = 'all'"
          >
            Todos
          </button>
          <button
            :class="{ active: currentFilter === 'published' }"
            @click="currentFilter = 'published'"
          >
            Publicados
          </button>
          <button
            :class="{ active: currentFilter === 'draft' }"
            @click="currentFilter = 'draft'"
          >
            Rascunhos
          </button>
        </div>
      </div>
      <button class="btn-primary create-btn" @click="openCreateModal">
        <img
          src="@/assets/svg/icons/blogicons/rascunho.svg"
          width="25px"
          alt=""
        />
        Nova Postagem
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Carregando artigos...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredArticles.length === 0" class="empty-state">
      <img
        src="../../assets/svg/icons/blogicons/notfound.svg"
        width="50px"
        alt=""
      />
      <h3>Nenhum artigo encontrado</h3>
      <p>
        {{
          currentFilter === "all"
            ? "Comece criando sua primeira postagem!"
            : `Você não possui artigos ${
                currentFilter === "published" ? "publicados" : "em rascunho"
              }.`
        }}
      </p>
      <button class="btn-primary" @click="openCreateModal">
        <img src="../../assets/svg/icons/blogicons/plus.svg" alt="" /> Criar
        Primeiro Artigo
      </button>
    </div>

    <!-- Lista de Artigos -->
    <div v-else class="articles-grid">
      <div
        class="article-card"
        v-for="article in filteredArticles"
        :key="article._id"
      >
        <!-- Badge de Destaque -->
        <div v-if="article.destaque" class="featured-badge">
          <i class="fas fa-star"></i>
          Destaque
        </div>

        <div class="article-image" @click="viewArticle(article)">
          <img
            :src="article.imagem || article.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'"
            :alt="article.titulo || article.title"
            @error="handleImageError"
          />
          <div class="article-status" :class="article.status">
            {{
              article.status === "published"
                ? "Publicado"
                : article.status === "draft"
                ? "Rascunho"
                : "Arquivado"
            }}
          </div>
        </div>
        <div class="article-content" @click="viewArticle(article)">
          <h3>{{ article.titulo || article.title }}</h3>
          <p class="article-excerpt">
            {{ article.resumo || article.summary || getExcerpt(article.conteudo || article.content) }}
          </p>
          <div class="article-meta">
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span>{{ formatDate(article.createdAt) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye"></i>
              <span>{{ article.views || 0 }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ article.tempoLeitura || 5 }}min</span>
            </div>
          </div>
          <div class="article-tags" v-if="article.tags && article.tags.length">
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
          <button
            class="btn-icon btn-feature"
            :class="{ active: article.destaque }"
            @click.stop="toggleFeature(article)"
            title="Marcar como Destaque"
          >
            <i class="fas fa-star"></i>
          </button>
          <button
            class="btn-icon btn-edit"
            @click.stop="editArticle(article)"
            title="Editar"
          >
            <i class="fas fa-edit"></i>
          </button>
          <button
            class="btn-icon btn-delete"
            @click.stop="deleteArticle(article)"
            title="Excluir"
          >
            <i class="fas fa-trash"></i>
          </button>
          <button
            class="btn-icon btn-publish"
            :class="{ published: article.status === 'published' }"
            @click.stop="togglePublish(article)"
            :title="article.status === 'published' ? 'Despublicar' : 'Publicar'"
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

    <!-- Modal/Overlay de Criar/Editar Artigo -->
    <transition name="overlay">
      <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <transition name="slide-up">
          <div v-if="showModal" class="modal-content blog-modal" @click.stop>
            <div class="modal-header">
              <h3>{{ isEditing ? "Editar Artigo" : "Criar Novo Artigo" }}</h3>
              <button class="close-btn" @click="closeModal">
                <img src="../../assets/svg/icons/blogicons/close.svg" alt="" />
              </button>
            </div>

            <div class="modal-body">
              <form @submit.prevent="saveArticle" class="article-form">
                <!-- Imagem Principal -->
                <div class="form-section">
                  <h4>Imagem de Capa</h4>
                  <div class="image-upload-section">
                    <div class="image-preview" v-if="formData.imagem">
                      <img :src="formData.imagem" alt="Preview" />
                      <button
                        type="button"
                        class="btn-remove-image"
                        @click="formData.imagem = ''"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                    <div class="upload-placeholder" v-else>
                      <img
                        src="../../assets/svg/icons/blogicons/image.svg"
                        width="40px"
                        alt=""
                      />
                      <p>Adicionar imagem de capa</p>
                    </div>
                    <input
                      type="url"
                      v-model="formData.imagem"
                      placeholder="Cole a URL da imagem aqui"
                      class="image-url-input"
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
                      v-model="formData.titulo"
                      placeholder="Digite o título do artigo"
                      required
                      @input="autoGenerateSlug"
                    />
                  </div>

                  <div class="form-group">
                    <label for="articleSlug">Slug (URL)</label>
                    <input
                      id="articleSlug"
                      type="text"
                      v-model="formData.slug"
                      placeholder="url-amigavel-do-artigo"
                    />
                    <small class="help-text">
                      Deixe vazio para gerar automaticamente
                    </small>
                  </div>
                </div>

                <!-- Editor de Conteúdo -->
                <div class="form-section">
                  <h4>Conteúdo do Artigo</h4>
                  <div class="editor-container">
                    <QuillEditor
                      v-model:content="formData.conteudo"
                      contentType="html"
                      :options="editorOptions"
                      theme="snow"
                      @textChange="onContentChange"
                    />
                  </div>
                </div>

                <!-- Metadados -->
                <div class="form-section">
                  <h4>Metadados</h4>
                  <div class="form-group">
                    <label for="articleExcerpt">Resumo</label>
                    <textarea
                      id="articleExcerpt"
                      v-model="formData.resumo"
                      placeholder="Breve descrição do artigo"
                      rows="3"
                      maxlength="500"
                    ></textarea>
                    <small class="char-count"
                      >{{ formData.resumo.length }}/500</small
                    >
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label for="articleAuthor">Autor</label>
                      <input
                        id="articleAuthor"
                        type="text"
                        v-model="formData.autor"
                        placeholder="Nome do autor"
                      />
                    </div>

                    <div class="form-group">
                      <label for="articleReadTime"
                        >Tempo de Leitura (min)</label
                      >
                      <input
                        id="articleReadTime"
                        type="number"
                        v-model="formData.tempoLeitura"
                        min="1"
                        placeholder="5"
                      />
                      <small class="help-text">Calculado automaticamente</small>
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
                          :key="category.value"
                        >
                          <input
                            type="checkbox"
                            :id="'cat-' + category.value"
                            :value="category.value"
                            v-model="formData.categorias"
                          />
                          <label :for="'cat-' + category.value">{{
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
                            placeholder="Digite uma tag e pressione Enter"
                            @keypress.enter.prevent="addTag"
                          />
                          <button
                            type="button"
                            @click="addTag"
                            :disabled="!newTag.trim()"
                          >
                            <img
                              src="../../assets/svg/icons/blogicons/plus1.svg"
                              width="25px"
                              alt=""
                            />
                          </button>
                        </div>
                        <div class="tags-list" v-if="formData.tags.length">
                          <span
                            class="tag"
                            v-for="tag in formData.tags"
                            :key="tag"
                          >
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
                        <option value="archived">Arquivado</option>
                      </select>
                    </div>

                    <div class="form-group checkbox-group">
                      <label class="checkbox-label">
                        <input type="checkbox" v-model="formData.destaque" />
                        <span class="checkmark"></span>
                        <span class="label-text">
                          <i class="fas fa-star"></i> Marcar como Destaque
                        </span>
                      </label>
                      <small class="help-text">
                        O artigo em destaque aparecerá no topo do blog
                      </small>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button
                    type="button"
                    class="btn-secondary"
                    @click="closeModal"
                  >
                    Cancelar
                  </button>
                  <button type="submit" class="btn-primary" :disabled="saving">
                    <i
                      class="fas"
                      :class="saving ? 'fa-spinner fa-spin' : 'fa-save'"
                    ></i>
                    {{
                      saving
                        ? "Salvando..."
                        : isEditing
                        ? "Atualizar"
                        : "Publicar"
                    }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Modal de Confirmação de Exclusão -->
    <transition name="overlay">
      <div
        v-if="showDeleteModal"
        class="modal-overlay"
        @click="closeDeleteModal"
      >
        <transition name="scale">
          <div
            v-if="showDeleteModal"
            class="modal-content delete-modal"
            @click.stop
          >
            <div class="modal-header">
              <h3>Confirmar Exclusão</h3>
              <button class="close-btn" @click="closeDeleteModal">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="modal-body">
              <div class="delete-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <p>
                  Tem certeza que deseja excluir o artigo
                  <strong>"{{ articleToDelete?.titulo }}"</strong>?
                </p>
                <p class="warning-text">Esta ação não pode ser desfeita.</p>
              </div>
              <div class="form-actions">
                <button
                  type="button"
                  class="btn-secondary"
                  @click="closeDeleteModal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  class="btn-danger"
                  @click="confirmDelete"
                  :disabled="deleting"
                >
                  <i
                    class="fas"
                    :class="deleting ? 'fa-spinner fa-spin' : 'fa-trash'"
                  ></i>
                  {{ deleting ? "Excluindo..." : "Excluir Artigo" }}
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <i
          class="fas"
          :class="{
            'fa-check-circle': toast.type === 'success',
            'fa-exclamation-circle': toast.type === 'error',
            'fa-info-circle': toast.type === 'info',
          }"
        ></i>
        <span>{{ toast.message }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import articleService from "@/services/articleService";

export default {
  name: "BlogManagement",
  components: {
    QuillEditor,
  },
  data() {
    return {
      loading: false,
      saving: false,
      deleting: false,
      showModal: false,
      showDeleteModal: false,
      isEditing: false,
      currentFilter: "all",
      articleToDelete: null,
      newTag: "",
      articles: [],
      stats: {
        total: 0,
        publicados: 0,
        rascunhos: 0,
        arquivados: 0,
        totalVisualizacoes: 0,
      },
      formData: {
        _id: null,
        titulo: "",
        slug: "",
        conteudo: "",
        resumo: "",
        imagem: "",
        autor: "Admin",
        tempoLeitura: 5,
        categorias: [],
        tags: [],
        status: "draft",
        destaque: false,
      },
      editorOptions: {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
          ],
        },
        placeholder: "Comece a escrever seu artigo incrível aqui...",
        theme: "snow",
      },
      blogCategories: [
        { value: "tecnologia", name: "Tecnologia" },
        { value: "negocios", name: "Negócios" },
        { value: "marketing", name: "Marketing" },
        { value: "design", name: "Design" },
        { value: "dicas", name: "Dicas" },
        { value: "tutoriais", name: "Tutoriais" },
        { value: "noticias", name: "Notícias" },
        { value: "geral", name: "Geral" },
      ],
      toast: {
        show: false,
        message: "",
        type: "success", // success, error, info
      },
    };
  },
  computed: {
    filteredArticles() {
      if (this.currentFilter === "all") {
        return this.articles;
      }
      return this.articles.filter(
        (article) => article.status === this.currentFilter
      );
    },
  },
  async mounted() {
    await this.loadArticles();
    await this.loadStats();
  },
  methods: {
    async loadArticles() {
      try {
        this.loading = true;
        const response = await articleService.getArticles({
          limite: 100,
          pagina: 1,
        });
        this.articles = response.artigos;
      } catch (error) {
        console.error("Erro ao carregar artigos:", error);
        this.showToast("Erro ao carregar artigos", "error");
      } finally {
        this.loading = false;
      }
    },

    async loadStats() {
      try {
        const stats = await articleService.getStats();
        this.stats = stats;
      } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
      }
    },

    openCreateModal() {
      this.isEditing = false;
      this.formData = {
        _id: null,
        titulo: "",
        slug: "",
        conteudo: "",
        resumo: "",
        imagem: "",
        autor: "Admin",
        tempoLeitura: 5,
        categorias: [],
        tags: [],
        status: "draft",
        destaque: false,
      };
      this.showModal = true;
    },

    editArticle(article) {
      this.isEditing = true;
      this.formData = {
        _id: article._id,
        titulo: article.titulo,
        slug: article.slug,
        conteudo: article.conteudo,
        resumo: article.resumo,
        imagem: article.imagem,
        autor: article.autor || "Admin",
        tempoLeitura: article.tempoLeitura,
        categorias: article.categorias || [],
        tags: article.tags || [],
        status: article.status,
        destaque: article.destaque || false,
      };
      this.showModal = true;
    },

    async saveArticle() {
      console.log("🔍 Validando formulário...");
      console.log("Título:", this.formData.titulo);
      console.log("Conteúdo (raw):", this.formData.conteudo);
      console.log("Conteúdo (length):", this.formData.conteudo?.length);

      if (!this.formData.titulo.trim()) {
        this.showToast("O título é obrigatório", "error");
        return;
      }

      // Verifica se o conteúdo tem texto real (remove tags HTML vazias)
      const cleanContent = this.formData.conteudo
        ?.replace(/<p><br><\/p>/g, '')
        ?.replace(/<p><\/p>/g, '')
        ?.replace(/<br>/g, '')
        ?.trim();

      console.log("Conteúdo (após limpeza):", cleanContent);
      console.log("Conteúdo (length após limpeza):", cleanContent?.length);

      if (!cleanContent || cleanContent.length === 0) {
        this.showToast("O conteúdo não pode estar vazio", "error");
        console.error("❌ Conteúdo vazio detectado!");
        return;
      }

      try {
        this.saving = true;

        // Preparar dados
        const articleData = {
          titulo: this.formData.titulo.trim(),
          slug: this.formData.slug || undefined,
          conteudo: this.formData.conteudo,
          resumo: this.formData.resumo || undefined,
          imagem: this.formData.imagem || undefined,
          autor: this.formData.autor,
          tempoLeitura: this.formData.tempoLeitura,
          categorias: this.formData.categorias,
          tags: this.formData.tags,
          status: this.formData.status,
          destaque: this.formData.destaque,
        };

        console.log("📤 Enviando dados:", articleData);

        if (this.isEditing) {
          // Atualizar artigo existente
          await articleService.updateArticle(this.formData._id, articleData);
          this.showToast("Artigo atualizado com sucesso!", "success");
        } else {
          // Criar novo artigo
          await articleService.createArticle(articleData);
          this.showToast("Artigo criado com sucesso!", "success");
        }

        this.closeModal();
        await this.loadArticles();
        await this.loadStats();
      } catch (error) {
        console.error("Erro ao salvar artigo:", error);
        this.showToast(error.message || "Erro ao salvar artigo", "error");
      } finally {
        this.saving = false;
      }
    },

    deleteArticle(article) {
      this.articleToDelete = article;
      this.showDeleteModal = true;
    },

    async confirmDelete() {
      if (!this.articleToDelete) return;

      try {
        this.deleting = true;
        await articleService.deleteArticle(this.articleToDelete._id);
        this.showToast("Artigo excluído com sucesso!", "success");
        this.closeDeleteModal();
        await this.loadArticles();
        await this.loadStats();
      } catch (error) {
        console.error("Erro ao excluir artigo:", error);
        this.showToast(error.message || "Erro ao excluir artigo", "error");
      } finally {
        this.deleting = false;
      }
    },

    async togglePublish(article) {
      try {
        const newStatus =
          article.status === "published" ? "draft" : "published";
        await articleService.updateArticle(article._id, { status: newStatus });
        this.showToast(
          `Artigo ${
            newStatus === "published" ? "publicado" : "despublicado"
          } com sucesso!`,
          "success"
        );
        await this.loadArticles();
        await this.loadStats();
      } catch (error) {
        console.error("Erro ao alterar status:", error);
        this.showToast("Erro ao alterar status do artigo", "error");
      }
    },

    async toggleFeature(article) {
      try {
        if (!article.destaque) {
          await articleService.featureArticle(article._id);
          this.showToast("Artigo marcado como destaque!", "success");
        } else {
          await articleService.updateArticle(article._id, { destaque: false });
          this.showToast("Artigo removido dos destaques", "info");
        }
        await this.loadArticles();
      } catch (error) {
        console.error("Erro ao alterar destaque:", error);
        this.showToast("Erro ao alterar destaque do artigo", "error");
      }
    },

    viewArticle(article) {
      // Abrir em nova aba
      const route = this.$router.resolve({ path: `/blog/${article._id}` });
      window.open(route.href, "_blank");
    },

    addTag() {
      const tag = this.newTag.trim().toLowerCase();
      if (tag && !this.formData.tags.includes(tag)) {
        this.formData.tags.push(tag);
        this.newTag = "";
      }
    },

    removeTag(tag) {
      this.formData.tags = this.formData.tags.filter((t) => t !== tag);
    },

    autoGenerateSlug() {
      if (!this.isEditing) {
        this.formData.slug = this.generateSlug(this.formData.titulo);
      }
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
      const div = document.createElement("div");
      div.innerHTML = content;
      const text = div.textContent || div.innerText || "";
      return text.length > 150 ? text.substring(0, 150) + "..." : text;
    },

    formatDate(date) {
      if (!date) return "";
      return new Date(date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    },

    handleImageError(event) {
      event.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800';
    },

    onContentChange() {
      // Calcular tempo de leitura (200 palavras por minuto)
      const text = this.formData.conteudo.replace(/<[^>]*>/g, "");
      const wordCount = text.trim().split(/\s+/).length;
      this.formData.tempoLeitura = Math.max(1, Math.ceil(wordCount / 200));

      // Gerar resumo automaticamente se vazio
      if (!this.formData.resumo) {
        this.formData.resumo = this.getExcerpt(this.formData.conteudo);
      }
    },

    closeModal() {
      this.showModal = false;
    },

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.articleToDelete = null;
    },

    showToast(message, type = "success") {
      this.toast = {
        show: true,
        message,
        type,
      };

      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.blog-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Stats Header */
.stats-header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
}

.stat-icon.published {
  background: linear-gradient(135deg, #10b981, #059669);
}

.stat-icon.draft {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.stat-icon.views {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

.stat-icon.total {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.stat-content p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
  flex-wrap: wrap;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.header-left h2 {
  margin: 0;
  font-size: 1.8rem;
  color: #1f2937;
}

.filter-tabs {
  display: flex;
  gap: 8px;
}

.filter-tabs button {
  padding: 8px 16px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;
}

.filter-tabs button:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.filter-tabs button.active {
  background: #6366f1;
  border-color: #6366f1;
  color: white;
}

.create-btn {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-state i {
  font-size: 4rem;
  color: #d1d5db;
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 8px;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 24px;
}

/* Articles Grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.article-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #e5e7eb;
  position: relative;
  display: flex;
  flex-direction: column;
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  border-color: #3b82f6;
}

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
}

.article-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease, opacity 0.3s ease;
}

.article-card:hover .article-image img {
  transform: scale(1.1);
  opacity: 0.95;
}

.article-status {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  z-index: 2;
}

.article-status.published {
  background: rgba(16, 185, 129, 0.9);
  color: white;
}

.article-status.draft {
  background: rgba(245, 158, 11, 0.9);
  color: white;
}

.article-status.archived {
  background: rgba(107, 114, 128, 0.9);
  color: white;
}

.article-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
}

.article-content h3 {
  margin: 0;
  font-weight: 700;
  color: #111827;
  font-size: 1.3rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.article-card:hover .article-content h3 {
  color: #3b82f6;
}

.article-excerpt {
  color: #6b7280;
  margin-bottom: 16px;
  line-height: 1.5;
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.85rem;
  color: #9ca3af;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item i {
  width: 14px;
  color: #6366f1;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.article-tags .tag {
  background: #f3f4f6;
  color: #4b5563;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-more {
  background: #e5e7eb;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.article-actions {
  display: flex;
  gap: 8px;
  padding: 16px 20px;
  background: #ffffff;
  border-top: 1px solid #e5e7eb;
}

.btn-icon {
  flex: 1;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  color: #6b7280;
  font-weight: 600;
  min-height: 44px;
}

.btn-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.btn-icon:active {
  transform: translateY(-1px);
}

.btn-feature {
  color: #f59e0b;
  border-color: #fcd34d;
}

.btn-feature:hover {
  background: #fffbeb;
  border-color: #f59e0b;
}

.btn-feature.active {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.btn-edit {
  color: #3b82f6;
  border-color: #93c5fd;
}

.btn-edit:hover {
  background: #eff6ff;
  border-color: #3b82f6;
}

.btn-delete {
  color: #ef4444;
  border-color: #fca5a5;
}

.btn-delete:hover {
  background: #fef2f2;
  border-color: #ef4444;
}

.btn-publish {
  color: #10b981;
  border-color: #6ee7b7;
}

.btn-publish:hover {
  background: #f0fdf4;
  border-color: #10b981;
}

.btn-publish.published {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-publish.published:hover {
  background: linear-gradient(135deg, #059669, #047857);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
}

.blog-modal {
  max-width: 1100px;
  width: 100%;
  max-height: 90vh;
  margin: auto;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 24px 30px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(90deg);
}

.modal-body {
  padding: 30px;
  overflow-y: auto;
  max-height: calc(90vh - 80px);
}

/* Form Styles */
.article-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 2px solid #f3f4f6;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.form-section h4 {
  margin: 0 0 20px 0;
  color: #1f2937;
  font-weight: 600;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 8px;
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
  margin-bottom: 8px;
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s;
  background: white;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
  line-height: 1.6;
}

.help-text {
  display: block;
  margin-top: 6px;
  color: #9ca3af;
  font-size: 0.85rem;
}

.char-count {
  display: block;
  text-align: right;
  color: #9ca3af;
  font-size: 0.85rem;
  margin-top: 4px;
}

/* Image Upload */
.image-upload-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 250px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.btn-remove-image {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remove-image:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.upload-placeholder {
  width: 100%;
  height: 250px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9ca3af;
  transition: all 0.2s;
}

.upload-placeholder:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.upload-placeholder i {
  font-size: 3rem;
}

.image-url-input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s;
}

.image-url-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Editor */
.editor-container {
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  transition: all 0.3s;
}

.editor-container:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Categories & Tags */
.category-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
}

.category-item:hover {
  background: #f9fafb;
}

.category-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.category-item label {
  cursor: pointer;
  margin: 0;
  font-weight: 500;
}

.tags-input-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tags-input {
  display: flex;
  gap: 8px;
}

.tags-input input {
  flex: 1;
  padding: 10px 14px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.3s;
}

.tags-input input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.tags-input button {
  padding: 10px 18px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.tags-input button:hover:not(:disabled) {
  background: #4f46e5;
  transform: translateY(-1px);
}

.tags-input button:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tags-list .tag {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.tags-list .tag:hover {
  background: linear-gradient(135deg, #bfdbfe, #93c5fd);
  transform: translateY(-1px);
}

.tags-list .tag i {
  cursor: pointer;
  font-size: 0.75rem;
  padding: 3px;
  border-radius: 50%;
  transition: background 0.2s;
}

.tags-list .tag i:hover {
  background: rgba(0, 0, 0, 0.15);
}

/* Checkbox Group */
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin: 0;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.label-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  color: #374151;
}

.label-text i {
  color: #f59e0b;
}

/* Form Actions */
.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 2px solid #f3f4f6;
}

.btn-primary,
.btn-secondary,
.btn-danger {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Delete Modal */
.delete-modal {
  max-width: 500px;
}

.delete-warning {
  text-align: center;
  padding: 20px 0;
}

.delete-warning i {
  font-size: 4rem;
  color: #f59e0b;
  margin-bottom: 16px;
}

.delete-warning p {
  color: #374151;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 8px;
}

.warning-text {
  color: #ef4444;
  font-weight: 600;
  font-size: 0.9rem;
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: white;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  min-width: 300px;
  border-left: 4px solid;
}

.toast.success {
  border-left-color: #10b981;
}

.toast.success i {
  color: #10b981;
}

.toast.error {
  border-left-color: #ef4444;
}

.toast.error i {
  color: #ef4444;
}

.toast.info {
  border-left-color: #3b82f6;
}

.toast.info i {
  color: #3b82f6;
}

.toast i {
  font-size: 1.5rem;
}

.toast span {
  flex: 1;
  font-weight: 500;
  color: #1f2937;
}

/* Animations */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-leave-active {
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}

@keyframes slideUp {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.scale-enter-active {
  animation: scale 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-leave-active {
  animation: scale 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}

@keyframes scale {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.toast-enter-active {
  animation: toastSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  animation: toastSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1) reverse;
}

@keyframes toastSlide {
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .blog-management {
    padding: 16px;
  }

  .stats-header {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .create-btn {
    width: 100%;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    padding: 20px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .form-actions button {
    width: 100%;
  }

  .toast {
    right: 16px;
    left: 16px;
    bottom: 16px;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .stats-header {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: 16px;
  }

  .filter-tabs {
    flex-wrap: wrap;
    width: 100%;
  }

  .filter-tabs button {
    flex: 1;
  }

  .article-content {
    padding: 16px;
  }

  .article-actions {
    flex-wrap: wrap;
  }

  .btn-icon {
    flex: 1 1 calc(50% - 4px);
  }
}
</style>
