<template>
  <div class="blog-post-page">
    <!-- Reading Progress Bar -->
    <div class="reading-progress" :style="{ width: readingProgress + '%' }"></div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Carregando artigo...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="not-found">
      <h2>Artigo não encontrado</h2>
      <p>{{ error || "O artigo que você procura não está disponível." }}</p>
      <router-link to="/blog" class="back-link">Voltar ao Blog</router-link>
    </div>

    <!-- Post Content -->
    <main v-else class="blog-post-container">
      <article class="blog-post">
        <!-- Post Header -->
        <header class="post-header">
          <div class="breadcrumb">
            <router-link to="/blog">Blog</router-link>
            <span>/</span>
            <span>{{ post.category }}</span>
          </div>

          <h1>{{ post.title }}</h1>

          <div class="post-meta">
            <div class="meta-item">
              <i class="fas fa-user"></i>
              <span class="author">{{ post.author }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-calendar"></i>
              <span class="date">{{ formatDate(post.date) }}</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-clock"></i>
              <span>{{ post.readTime }} min de leitura</span>
            </div>
            <div class="meta-item">
              <i class="fas fa-eye"></i>
              <span>{{ post.views }} visualizações</span>
            </div>
          </div>

          <div v-if="post.tags && post.tags.length" class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">
              <i class="fas fa-tag"></i>
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- Featured Image -->
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="post-image"
        />

        <!-- Post Summary -->
        <div v-if="post.summary" class="post-summary">
          {{ post.summary }}
        </div>

        <!-- Table of Contents -->
        <nav v-if="tableOfContents.length > 0" class="table-of-contents">
          <h3><i class="fas fa-list"></i> Índice</h3>
          <ul>
            <li
              v-for="(heading, index) in tableOfContents"
              :key="index"
              :class="'toc-level-' + heading.level"
            >
              <a :href="'#' + heading.id" @click.prevent="scrollToHeading(heading.id)">
                {{ heading.text }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Post Content (HTML dinâmico da API) -->
        <div class="post-content" ref="postContentRef" v-html="processedContent"></div>

        <!-- Share Buttons -->
        <div class="share-buttons">
          <h3>Compartilhar</h3>
          <div class="buttons">
            <button class="share-btn facebook" @click="shareOnFacebook">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
            <button class="share-btn twitter" @click="shareOnTwitter">
              <i class="fab fa-twitter"></i>
              Twitter
            </button>
            <button class="share-btn linkedin" @click="shareOnLinkedIn">
              <i class="fab fa-linkedin-in"></i>
              LinkedIn
            </button>
            <button class="share-btn whatsapp" @click="shareOnWhatsApp">
              <i class="fab fa-whatsapp"></i>
              WhatsApp
            </button>
            <button class="share-btn copy" @click="copyLink">
              <i class="fas fa-link"></i>
              Copiar Link
            </button>
          </div>
        </div>

        <!-- Comments Section -->
        <section class="comments-section">
          <h2>Comentários ({{ post.comments ? post.comments.length : 0 }})</h2>

          <!-- Comment Form -->
          <div class="comment-form">
            <h3>Deixe seu comentário</h3>
            <form @submit.prevent="submitComment">
              <div class="form-row">
                <div class="form-group">
                  <label for="author">Nome *</label>
                  <input
                    id="author"
                    type="text"
                    v-model="newComment.author"
                    placeholder="Seu nome"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="email">E-mail *</label>
                  <input
                    id="email"
                    type="email"
                    v-model="newComment.email"
                    placeholder="Seu e-mail"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="content">Comentário *</label>
                <textarea
                  id="content"
                  v-model="newComment.content"
                  placeholder="Escreva seu comentário..."
                  required
                ></textarea>
              </div>

              <button type="submit" :disabled="isSubmitting" class="submit-btn">
                <i
                  class="fas"
                  :class="
                    isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'
                  "
                ></i>
                {{ isSubmitting ? "Enviando..." : "Enviar Comentário" }}
              </button>
            </form>
          </div>

          <!-- Comments List -->
          <div
            v-if="post.comments && post.comments.length"
            class="comments-list"
          >
            <div
              v-for="comment in post.comments"
              :key="comment._id || comment.id"
              class="comment"
            >
              <div class="comment-header">
                <div class="comment-author">
                  <i class="fas fa-user-circle"></i>
                  <strong>{{
                    comment.nome || comment.author || "Anônimo"
                  }}</strong>
                </div>
                <span class="comment-date">{{
                  formatDate(comment.data || comment.date)
                }}</span>
              </div>
              <div class="comment-content">
                {{ comment.comentario || comment.content }}
              </div>
            </div>
          </div>

          <div v-else class="no-comments">
            <i class="fas fa-comments"></i>
            <p>Seja o primeiro a comentar!</p>
          </div>
        </section>

        <!-- Related Posts -->
        <section v-if="relatedPosts.length" class="related-posts">
          <h2>Artigos Relacionados</h2>
          <div class="related-posts-grid">
            <router-link
              v-for="related in relatedPosts"
              :key="related.id"
              :to="`/blog/${related.id}`"
              class="related-post-card"
            >
              <img :src="related.image" :alt="related.title" />
              <div class="related-post-info">
                <span class="related-category">{{ related.category }}</span>
                <h3>{{ related.title }}</h3>
                <p>{{ related.summary }}</p>
                <div class="related-meta">
                  <span>{{ formatDate(related.date) }}</span>
                  <span>{{ related.views }} visualizações</span>
                </div>
              </div>
            </router-link>
          </div>
        </section>
      </article>
    </main>

    <!-- Back to Top -->
    <transition name="fade">
      <button
        v-if="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        title="Voltar ao topo"
      >
        <i class="fas fa-arrow-up"></i>
      </button>
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
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBlog } from "@/components/composables/useBlog.js";

export default {
  name: "BlogpostView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { getPost, getRelatedPosts, addComment } = useBlog();

    const post = ref(null);
    const relatedPosts = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const isSubmitting = ref(false);
    const readingProgress = ref(0);
    const showBackToTop = ref(false);
    const tableOfContents = ref([]);
    const postContentRef = ref(null);

    const newComment = ref({
      author: "",
      email: "",
      content: "",
    });

    const toast = ref({
      show: false,
      message: "",
      type: "success",
    });

    // SEO: JSON-LD script reference
    let jsonLdScript = null;

    // Process content to add IDs to headings for ToC
    const processedContent = computed(() => {
      if (!post.value?.content) return "";
      let content = post.value.content;
      // Add IDs to h2 and h3 elements for anchor linking
      let headingIndex = 0;
      content = content.replace(/<(h[23])[^>]*>(.*?)<\/\1>/gi, (match, tag, text) => {
        const id = `heading-${headingIndex++}`;
        const cleanText = text.replace(/<[^>]*>/g, "").trim();
        return `<${tag} id="${id}">${cleanText}</${tag}>`;
      });
      return content;
    });

    // Extract ToC from content
    const extractTableOfContents = () => {
      if (!post.value?.content) return;
      const toc = [];
      const regex = /<(h[23])[^>]*>(.*?)<\/\1>/gi;
      let match;
      let index = 0;
      while ((match = regex.exec(post.value.content)) !== null) {
        const tag = match[1].toLowerCase();
        const text = match[2].replace(/<[^>]*>/g, "").trim();
        if (text) {
          toc.push({
            id: `heading-${index++}`,
            level: tag === "h2" ? 2 : 3,
            text,
          });
        }
      }
      tableOfContents.value = toc;
    };

    // SEO: Update meta tags
    const updateSeoMeta = () => {
      if (!post.value) return;

      document.title = `${post.value.title} | Blog`;

      const metaTags = {
        description: post.value.summary || post.value.title,
      };
      Object.entries(metaTags).forEach(([name, content]) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });

      // Open Graph
      const ogTags = {
        "og:title": post.value.title,
        "og:description": post.value.summary || "",
        "og:type": "article",
        "og:url": window.location.href,
        "og:image": post.value.image || "",
        "article:published_time": post.value.date,
        "article:author": post.value.author,
      };
      Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });

      // Twitter Card
      const twitterTags = {
        "twitter:card": "summary_large_image",
        "twitter:title": post.value.title,
        "twitter:description": post.value.summary || "",
        "twitter:image": post.value.image || "",
      };
      Object.entries(twitterTags).forEach(([name, content]) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });
    };

    // SEO: JSON-LD Structured Data
    const injectJsonLd = () => {
      if (!post.value) return;

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.value.title,
        "description": post.value.summary || "",
        "image": post.value.image || "",
        "author": {
          "@type": "Person",
          "name": post.value.author,
        },
        "datePublished": post.value.date,
        "wordCount": post.value.content?.replace(/<[^>]*>/g, "").split(/\s+/).length || 0,
        "articleBody": post.value.content?.replace(/<[^>]*>/g, "").substring(0, 500),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href,
        },
        "interactionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/ReadAction",
          "userInteractionCount": post.value.views,
        },
        "comment": (post.value.comments || []).map(c => ({
          "@type": "Comment",
          "author": { "@type": "Person", "name": c.author || c.nome || "Anônimo" },
          "text": c.content || c.comentario || "",
          "dateCreated": c.date || c.data,
        })),
      };

      if (post.value.tags?.length) {
        jsonLd.keywords = post.value.tags.join(", ");
      }

      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    };

    // Scroll handlers
    const handleScroll = () => {
      // Reading progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      readingProgress.value = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

      // Back to top visibility
      showBackToTop.value = scrollTop > 400;
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToHeading = (id) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    onMounted(async () => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      await loadPost();
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      if (jsonLdScript && jsonLdScript.parentNode) {
        jsonLdScript.parentNode.removeChild(jsonLdScript);
      }
    });

    const loadPost = async () => {
      try {
        loading.value = true;
        error.value = null;

        const postId = route.params.id;
        const postData = await getPost(postId);

        if (!postData) {
          error.value = "Artigo não encontrado";
          return;
        }

        // Redirecionar posts HTML para a página dedicada (sem header/footer)
        if (postData.tipoConteudo === 'html') {
          router.replace({ name: 'htmlpost', params: { id: postId } });
          return;
        }

        post.value = postData;

        // Extract ToC and inject SEO
        await nextTick();
        extractTableOfContents();
        updateSeoMeta();
        injectJsonLd();

        // Carregar artigos relacionados
        const related = await getRelatedPosts(postData);
        relatedPosts.value = related || [];
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
        error.value = err.message || "Erro ao carregar artigo";
      } finally {
        loading.value = false;
      }
    };

    const submitComment = async () => {
      if (!newComment.value.author.trim() || !newComment.value.content.trim() || !newComment.value.email.trim()) {
        showToast("Preencha todos os campos", "error");
        return;
      }

      try {
        isSubmitting.value = true;

        const response = await addComment(post.value.id, {
          text: newComment.value.content,
          author: newComment.value.author,
          email: newComment.value.email,
        });

        // Atualizar lista de comentários
        if (response && response.comentarios) {
          post.value.comments = response.comentarios;
        }

        // Reset form
        newComment.value = {
          author: "",
          email: "",
          content: "",
        };

        showToast("Comentário adicionado com sucesso!", "success");
      } catch (err) {
        console.error("Erro ao adicionar comentário:", err);
        showToast(err.message || "Erro ao adicionar comentário", "error");
      } finally {
        isSubmitting.value = false;
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const shareOnFacebook = () => {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
      );
    };

    const shareOnTwitter = () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(post.value.title);
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank"
      );
    };

    const shareOnLinkedIn = () => {
      const url = encodeURIComponent(window.location.href);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
      );
    };

    const shareOnWhatsApp = () => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(post.value.title);
      window.open(`https://wa.me/?text=${text} ${url}`, "_blank");
    };

    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link copiado!", "success");
      } catch (err) {
        showToast("Erro ao copiar link", "error");
      }
    };

    const showToast = (message, type = "success") => {
      toast.value = {
        show: true,
        message,
        type,
      };

      setTimeout(() => {
        toast.value.show = false;
      }, 3000);
    };

    return {
      post,
      relatedPosts,
      loading,
      error,
      newComment,
      isSubmitting,
      toast,
      readingProgress,
      showBackToTop,
      tableOfContents,
      processedContent,
      postContentRef,
      submitComment,
      formatDate,
      shareOnFacebook,
      shareOnTwitter,
      shareOnLinkedIn,
      shareOnWhatsApp,
      copyLink,
      scrollToTop,
      scrollToHeading,
    };
  },
};
</script>

<style scoped>
.blog-post-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem 1rem;
}

/* Reading Progress Bar */
.reading-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  z-index: 9999;
  transition: width 0.1s linear;
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  z-index: 1000;
  transition: all 0.3s;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Table of Contents */
.table-of-contents {
  background: linear-gradient(135deg, #f0f4ff, #e8ecf8);
  border: 1px solid #d4d9f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 2rem;
}

.table-of-contents h3 {
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 8px;
}

.table-of-contents h3 i {
  color: #6366f1;
}

.table-of-contents ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-of-contents li {
  margin-bottom: 8px;
}

.table-of-contents li a {
  color: #4b5563;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
  display: block;
  padding: 4px 0;
}

.table-of-contents li a:hover {
  color: #6366f1;
}

.toc-level-2 {
  padding-left: 0;
  font-weight: 600;
}

.toc-level-3 {
  padding-left: 20px;
  font-weight: 400;
}

/* Comment form row */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

input[type="email"] {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
}

input[type="email"]:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
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

/* Error/Not Found */
.not-found {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  max-width: 600px;
  margin: 0 auto;
}

.not-found h2 {
  color: #1f2937;
  margin-bottom: 16px;
}

.not-found p {
  color: #6b7280;
  margin-bottom: 24px;
}

.back-link {
  display: inline-block;
  padding: 12px 24px;
  background: #6366f1;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
}

.back-link:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

/* Container */
.blog-post-container {
  max-width: 900px;
  margin: 0 auto;
}

.blog-post {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
  padding: 3rem;
  margin-bottom: 2rem;
}

/* Header */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #6b7280;
}

.breadcrumb a {
  color: #6366f1;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: #4f46e5;
}

.post-header h1 {
  font-size: 3rem;
  color: #111827;
  margin-bottom: 2rem;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

@media (max-width: 768px) {
  .post-header h1 {
    font-size: 2.25rem;
  }
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 0.95rem;
}

.meta-item i {
  color: #6366f1;
  width: 16px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 2rem;
}

.tag {
  display: flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.tag i {
  font-size: 0.75rem;
}

/* Post Image */
.post-image {
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.post-image:hover {
  transform: scale(1.02);
}

/* Post Summary */
.post-summary {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #4b5563;
  margin-bottom: 2rem;
  padding: 20px;
  background: #f9fafb;
  border-left: 4px solid #6366f1;
  border-radius: 8px;
  font-style: italic;
}

/* Post Content */
.post-content {
  line-height: 1.9;
  color: #1f2937;
  font-size: 1.15rem;
  margin-bottom: 4rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.post-content :deep(h2) {
  margin: 48px 0 24px 0;
  color: #111827;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  border-left: 4px solid #6366f1;
  padding-left: 16px;
}

.post-content :deep(h3) {
  margin: 36px 0 16px 0;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.post-content :deep(p) {
  margin-bottom: 24px;
  text-align: justify;
}

.post-content :deep(ul),
.post-content :deep(ol) {
  margin-bottom: 20px;
  padding-left: 32px;
}

.post-content :deep(li) {
  margin-bottom: 10px;
}

.post-content :deep(blockquote) {
  border-left: 4px solid #6366f1;
  padding-left: 20px;
  margin: 24px 0;
  font-style: italic;
  color: #6b7280;
  background: #f9fafb;
  padding: 16px 20px;
  border-radius: 4px;
}

.post-content :deep(code) {
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  color: #dc2626;
}

.post-content :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
}

.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
}

.post-content :deep(a) {
  color: #6366f1;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.post-content :deep(a:hover) {
  border-bottom-color: #6366f1;
}

/* Share Buttons */
.share-buttons {
  margin-bottom: 4rem;
  padding: 32px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.share-buttons h3 {
  margin: 0 0 20px 0;
  color: #111827;
  font-size: 1.4rem;
  font-weight: 700;
}

.share-buttons .buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.share-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.share-btn:active {
  transform: translateY(-2px);
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.twitter {
  background: #1da1f2;
}

.share-btn.linkedin {
  background: #0a66c2;
}

.share-btn.whatsapp {
  background: #25d366;
}

.share-btn.copy {
  background: #6b7280;
}

/* Comments */
.comments-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.comments-section h2 {
  color: #1f2937;
  margin-bottom: 24px;
  font-size: 1.8rem;
}

.comment-form {
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  padding: 32px;
  border-radius: 16px;
  margin-bottom: 40px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.comment-form h3 {
  margin: 0 0 24px 0;
  color: #111827;
  font-size: 1.5rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #374151;
  font-weight: 600;
  font-size: 0.95rem;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s;
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

textarea {
  height: 120px;
  resize: vertical;
  line-height: 1.6;
}

.submit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment {
  background: #f9fafb;
  padding: 20px;
  border-radius: 8px;
  border-left: 3px solid #6366f1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.comment-author {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1f2937;
  font-weight: 600;
}

.comment-author i {
  color: #6366f1;
  font-size: 1.5rem;
}

.comment-date {
  color: #9ca3af;
  font-size: 0.875rem;
}

.comment-content {
  color: #4b5563;
  line-height: 1.6;
}

.no-comments {
  text-align: center;
  padding: 40px;
  color: #9ca3af;
}

.no-comments i {
  font-size: 3rem;
  margin-bottom: 12px;
}

/* Related Posts */
.related-posts {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #e5e7eb;
}

.related-posts h2 {
  color: #1f2937;
  margin-bottom: 24px;
  font-size: 1.8rem;
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.related-post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  transition: all 0.3s;
  text-decoration: none;
}

.related-post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.related-post-card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.related-post-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.related-category {
  display: inline-block;
  padding: 4px 12px;
  background: #eff6ff;
  color: #1e40af;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 12px;
}

.related-post-card h3 {
  margin: 0 0 12px 0;
  font-size: 1.15rem;
  color: #1f2937;
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.related-post-card p {
  margin: 0 0 12px 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.related-meta {
  display: flex;
  gap: 16px;
  font-size: 0.85rem;
  color: #9ca3af;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid #f3f4f6;
}

/* Toast */
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
@media (max-width: 768px) {
  .blog-post {
    padding: 2rem 1.5rem;
  }

  .post-header h1 {
    font-size: 2rem;
  }

  .post-meta {
    flex-direction: column;
    gap: 12px;
  }

  .share-buttons .buttons {
    flex-direction: column;
  }

  .share-btn {
    width: 100%;
    justify-content: center;
  }

  .related-posts-grid {
    grid-template-columns: 1fr;
  }

  .toast {
    right: 16px;
    left: 16px;
    bottom: 16px;
    min-width: auto;
  }
}

@media (max-width: 480px) {
  .blog-post-page {
    padding: 1rem 0.5rem;
  }

  .blog-post {
    padding: 1.5rem 1rem;
    border-radius: 8px;
  }

  .post-header h1 {
    font-size: 1.75rem;
  }

  .post-content {
    font-size: 1rem;
  }

  .comment-form,
  .share-buttons {
    padding: 16px;
  }
}
</style>
