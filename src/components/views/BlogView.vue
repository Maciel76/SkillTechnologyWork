<template>
  <div class="blog-page">
    <header class="blog-header">
      <div class="blog-header-inner">
        <h1 class="blog-titulo">
          Nosso <span class="gradiente">Blog</span>
        </h1>
        <p class="blog-subtitulo">
          O que a gente aprende aplicando IA e tecnologia no dia a dia de quem
          nos contrata.
        </p>

        <div class="blog-ferramentas">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar artigos..."
              @input="handleSearch"
            />
            <button class="search-button" aria-label="Buscar">
              <img src="../../assets/svg/icons/seach1.svg" alt="" />
            </button>
          </div>
          <button
            @click="toggleTheme"
            class="theme-toggle"
            :aria-label="isDarkMode ? 'Tema claro' : 'Tema escuro'"
          >
            <i class="fas" :class="isDarkMode ? 'fa-sun' : 'fa-moon'"></i>
          </button>
        </div>
      </div>
    </header>

    <main class="blog-main">
      <!-- Featured Post Section -->
      <section v-if="featuredPosts.length" class="featured-post">
        <router-link
          :to="`/blog/${featuredPosts[0].id}`"
          class="featured-post-link"
        >
          <img
            :src="featuredPosts[0].image"
            :alt="featuredPosts[0].title"
            class="featured-image"
            loading="lazy"
          />
          <div class="featured-content">
            <span class="category">{{ featuredPosts[0].category }}</span>
            <h1>{{ featuredPosts[0].title }}</h1>
            <p>{{ featuredPosts[0].summary }}</p>
            <div class="post-meta">
              <span><i class="fas fa-calendar"></i> {{ formatDate(featuredPosts[0].date) }}</span>
              <span><i class="fas fa-user"></i> {{ featuredPosts[0].author }}</span>
              <span><i class="fas fa-clock"></i> {{ featuredPosts[0].readTime }} min</span>
              <span><i class="fas fa-eye"></i> {{ featuredPosts[0].views }}</span>
            </div>
          </div>
        </router-link>
      </section>

      <div class="blog-content">
        <!-- Sem artigos: a área ficava em branco -->
        <section v-if="!displayedPosts.length" class="blog-vazio">
          <i class="fas fa-newspaper"></i>
          <h2>Nenhum artigo por aqui ainda</h2>
          <p>
            Estamos preparando os primeiros conteúdos. Volte em breve — ou fale
            com a gente enquanto isso.
          </p>
          <router-link to="/contato" class="blog-vazio-cta">
            Falar com a equipe
          </router-link>
        </section>

        <!-- Posts Grid -->
        <section v-else class="post-grid">
          <article
            v-for="post in displayedPosts"
            :key="post.id"
            class="post-card"
          >
            <router-link :to="`/blog/${post.id}`" class="post-card-link">
              <img
                :src="post.image"
                :alt="post.title"
                class="post-image"
                loading="lazy"
              />
              <div class="post-info">
                <span class="category">{{ post.category }}</span>
                <div class="post-text-content">
                  <h2>{{ post.title }}</h2>
                  <p>{{ post.summary }}</p>
                </div>
                <div class="post-meta">
                  <span>{{ formatDate(post.date) }}</span>
                  <span><i class="fas fa-clock"></i> {{ post.readTime }} min</span>
                  <span><i class="fas fa-eye"></i> {{ post.views }}</span>
                </div>
              </div>
            </router-link>
          </article>
        </section>

        <!-- Sidebar -->
        <aside class="blog-sidebar">
          <div class="sidebar-section categories">
            <h3>Categorias</h3>
            <ul>
              <li v-for="category in categories" :key="category">
                <button
                  @click="filterByCategory(category)"
                  :class="{ active: currentCategory === category }"
                >
                  {{ category }}
                </button>
              </li>
            </ul>
          </div>

          <div class="sidebar-section popular-posts">
            <h3>Posts Populares</h3>
            <ul>
              <li v-for="post in popularPosts" :key="post.id">
                <router-link :to="`/blog/${post.id}`" class="popular-post-link">
                  <img
                    :src="post.image"
                    :alt="post.title"
                    class="popular-post-image"
                    loading="lazy"
                  />
                  <div class="popular-post-info">
                    <h4>{{ post.title }}</h4>
                    <span>{{ formatDate(post.date) }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

          <div class="sidebar-section tags">
            <h3>Tags</h3>
            <div class="tag-cloud">
              <button
                v-for="tag in tags"
                :key="tag"
                @click="filterByTag(tag)"
                class="tag"
                :class="{ active: currentTag === tag }"
              >
                {{ tag }}
              </button>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="sidebar-section newsletter">
            <h3>Newsletter</h3>
            <p class="newsletter-text">Receba nossos artigos mais recentes no seu e-mail.</p>
            <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
              <input
                type="email"
                v-model="newsletterEmail"
                placeholder="Seu e-mail"
                required
              />
              <button type="submit" class="newsletter-btn">Inscrever-se</button>
            </form>
          </div>
        </aside>
      </div>

      <!-- Pagination -->
      <div class="pagination" v-if="totalPages > 1">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
          class="page-button"
        >
          Anterior
        </button>
        <span>{{ currentPage }} de {{ totalPages }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
          class="page-button"
        >
          Próxima
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useBlog } from "../composables/useBlog";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "BlogView",
  components: {},
  setup() {
    const { posts, featuredPosts, categories, tags, searchPosts } = useBlog();

    const searchQuery = ref("");
    const currentPage = ref(1);
    const postsPerPage = 6;
    const currentCategory = ref(null);
    const currentTag = ref(null);
    const isDarkMode = ref(false);
    const newsletterEmail = ref("");
    let searchTimeout = null;

    // SEO: Update page meta
    const updateMeta = () => {
      document.title = "Blog | Artigos sobre Tecnologia, Design e Marketing";
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", "Confira nossos artigos sobre tecnologia, design, marketing digital e muito mais. Dicas, tutoriais e novidades do mercado.");

      // Open Graph
      const ogTags = {
        "og:title": "Blog | Artigos e Novidades",
        "og:description": "Confira nossos artigos sobre tecnologia, design, marketing digital e muito mais.",
        "og:type": "website",
        "og:url": window.location.href,
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
    };

    // SEO: JSON-LD for Blog
    let jsonLdScript = null;
    const injectJsonLd = () => {
      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog",
        "description": "Artigos sobre tecnologia, design, marketing digital e muito mais.",
        "url": window.location.href,
        "blogPost": posts.value.slice(0, 10).map(post => ({
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.summary,
          "author": { "@type": "Person", "name": post.author },
          "datePublished": post.date,
          "image": post.image,
        })),
      };
      jsonLdScript = document.createElement("script");
      jsonLdScript.type = "application/ld+json";
      jsonLdScript.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(jsonLdScript);
    };

    // Filter and pagination logic
    const filteredPosts = computed(() => {
      let result = posts.value;

      if (searchQuery.value) {
        result = searchPosts(searchQuery.value);
      }

      if (currentCategory.value) {
        result = result.filter(
          (post) => post.category === currentCategory.value
        );
      }

      if (currentTag.value) {
        result = result.filter((post) => post.tags.includes(currentTag.value));
      }

      return result;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredPosts.value.length / postsPerPage)
    );

    const displayedPosts = computed(() => {
      const start = (currentPage.value - 1) * postsPerPage;
      const end = start + postsPerPage;
      return filteredPosts.value.slice(start, end);
    });

    const popularPosts = computed(() =>
      [...posts.value].sort((a, b) => b.views - a.views).slice(0, 5)
    );

    // Methods
    const handleSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentPage.value = 1;
      }, 300);
    };

    const filterByCategory = (category) => {
      currentCategory.value =
        currentCategory.value === category ? null : category;
      currentPage.value = 1;
    };

    const filterByTag = (tag) => {
      currentTag.value = currentTag.value === tag ? null : tag;
      currentPage.value = 1;
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const toggleTheme = () => {
      isDarkMode.value = !isDarkMode.value;
      const newTheme = isDarkMode.value ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("blog-theme", newTheme);
    };

    const subscribeNewsletter = () => {
      if (newsletterEmail.value) {
        // Placeholder - pode ser conectado a mailchimp/sendinblue/etc.
        alert("Obrigado por se inscrever! Você receberá nossas novidades.");
        newsletterEmail.value = "";
      }
    };

    // Inject JSON-LD when posts load
    watch(
      () => posts.value.length,
      (len) => {
        if (len > 0 && !jsonLdScript) {
          injectJsonLd();
        }
      }
    );

    onMounted(() => {
      const savedTheme = localStorage.getItem("blog-theme");
      if (savedTheme === "dark") {
        isDarkMode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
      }
      updateMeta();
      if (posts.value.length > 0) {
        injectJsonLd();
      }
    });

    onUnmounted(() => {
      if (jsonLdScript && jsonLdScript.parentNode) {
        jsonLdScript.parentNode.removeChild(jsonLdScript);
      }
      clearTimeout(searchTimeout);
    });

    return {
      searchQuery,
      currentPage,
      totalPages,
      currentCategory,
      currentTag,
      isDarkMode,
      featuredPosts,
      displayedPosts,
      categories,
      tags,
      popularPosts,
      newsletterEmail,
      handleSearch,
      filterByCategory,
      filterByTag,
      formatDate,
      toggleTheme,
      subscribeNewsletter,
    };
  },
};
</script>

<style scoped>
/* Cores e temas */

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body {
  font-family: "Arial", sans-serif;
  background-color: #f4f6f8;
  color: #1f2937;
  line-height: 1.6;
}

/* Estilos do Tema Escuro */
[data-theme="dark"] .blog-page {
  background-color: #2c3e50; /* Substituído --background-light */
  color: #ecf0f1; /* Substituído --text-light */
}

/* Container principal */
.blog-page {
  margin: 0 auto;
  font-family: "Inter", sans-serif;
}

/* Cabeçalho da página */
.blog-header {
  padding: 3.5rem 5% 3rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
  margin-bottom: 2.5rem;
}

.blog-header-inner {
  max-width: 680px;
  margin: 0 auto;
}

.blog-titulo {
  margin: 0;
  font-size: 2.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #131a4d;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.blog-subtitulo {
  margin: 0.9rem auto 0;
  max-width: 520px;
  font-size: 1.02rem;
  line-height: 1.6;
  color: #3d4570;
}

.blog-ferramentas {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.75rem;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.3rem 0.3rem 0.9rem;
  border: 1px solid #e2e1da;
  border-radius: 12px;
  background: #fff;
}

.search-bar input {
  width: 260px;
  padding: 0.5rem 0;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: 0.95rem;
  color: #131a4d;
}

.search-bar input:focus {
  outline: none;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 9px;
  background: #0052ff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-button:hover {
  background: #0040c9;
}

.search-button img {
  width: 17px;
  height: 17px;
  filter: brightness(0) invert(1);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid #e2e1da;
  border-radius: 12px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.theme-toggle:hover {
  border-color: #7c6ef2;
}

.theme-toggle i {
  font-size: 1rem;
  color: #4b5280;
}

/* O conteúdo do blog respira dentro de um container */
.blog-main {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 5% 4rem;
}

/* Estado vazio */
.blog-vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  border: 1px dashed #e2e1da;
  border-radius: 18px;
  background: #fbfbf9;
  text-align: center;
}

.blog-vazio i {
  margin-bottom: 1.25rem;
  font-size: 2.2rem;
  color: #c9c8c0;
}

.blog-vazio h2 {
  margin: 0 0 0.6rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #131a4d;
}

.blog-vazio p {
  margin: 0 0 1.75rem;
  max-width: 400px;
  font-size: 0.98rem;
  line-height: 1.6;
  color: #6b7194;
}

.blog-vazio-cta {
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.blog-vazio-cta:hover {
  background: #0040c9;
}

/* Post em Destaque */
.featured-post {
  height: 400px;
  margin-bottom: 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background: #ffffff;
}

.featured-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
}

.featured-post-link {
  display: flex;
  text-decoration: none;
  color: inherit;
}

.featured-image {
  width: 50%;
  height: auto;
  object-fit: cover;
  display: block;
}

.featured-post:hover .featured-image {
  /* Efeito de hover removido para este layout */
}

.featured-content {
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-content .category {
  color: #3498db;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin-bottom: 10px;
  align-self: flex-start;
}

.featured-content h1 {
  font-size: 1.8rem; /* Tamanho do título reduzido */
  margin-bottom: 15px;
  color: #111827;
  line-height: 1.2;
}

.featured-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 15px;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  font-size: 0.9rem;
  color: #6b7280;
  display: flex;
  gap: 16px;
}

/* Blog Content Layout */
.blog-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 2.5rem;
  padding: 0 0 3rem;
}

/* Latest Posts */
.latest-posts h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

/* auto-fill em vez de 3 colunas fixas: com a sidebar do lado, três
   colunas fixas espremiam cada card em ~165px. */
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  align-content: start;
  gap: 1.75rem;
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
}

.post-card {
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  height: 475px;
}

.post-card:hover {
  transform: translateY(-10px);
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  flex-shrink: 0;
}

.post-info {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
}

.post-text-content {
  /* A propriedade flex-grow foi removida para que a altura se ajuste ao conteúdo,
     evitando que o card se estique desnecessariamente. */
  padding-bottom: 1rem; /* Adiciona um espaço antes do rodapé */
}

.post-text-content h2 {
  font-size: 1.25rem;
  line-height: 1.4;
  margin: 0.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #111827;
  /* min-height removido para permitir que o título ocupe apenas o espaço necessário */
}

.post-text-content p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4b5563;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* flex: 1 e min-height removidos para evitar expansão excessiva */
}

/* Blog Sidebar */
.blog-sidebar {
  position: sticky;
  top: 2rem;
}

.sidebar-section {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.sidebar-section h3 {
  margin-bottom: 1rem;
}

.categories ul {
  list-style: none;
}

.categories a {
  display: block;
  padding: 20px;
  color: #374151;
  text-decoration: none;
  transition: color 0.3s;
}

.post-meta {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  font-size: 0.85rem;
  color: #777;
  flex-shrink: 0;
}

.categories a:hover,
.categories a.active {
  color: #3498db; /* Substituído --blog-primary */
}

.popular-post {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  text-decoration: none;
  color: #1f2937;
}

.popular-post img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.popular-post h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.popular-post span {
  color: #6b7280;
  font-size: 0.9rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #e5e7eb; /* Substituído --blog-secondary */
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.tag:hover {
  background: #3498db; /* Substituído --blog-primary */
  color: white;
}

.popular-post-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  color: inherit;
  list-style: none;
  transition: transform 0.3s ease;
}

.popular-post-link:hover {
  transform: translateY(-5px);
}

.popular-post-image {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
}

.popular-post li {
  list-style: none;
}

.popular-post-info {
  flex: 1;
  list-style: none;
}

.popular-post-info h4 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.popular-post-info h4:hover {
  color: #3498db; /* Substituído --primary-color */
}

.popular-post-info span {
  font-size: 0.9rem;
  color: #6b7280;
}

/* Newsletter */
.newsletter-text {
  font-size: 0.9rem;
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-form input {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
}

.newsletter-btn {
  background: #3498db !important;
  color: white !important;
  border: none !important;
  padding: 0.75rem 1rem !important;
  border-radius: 8px !important;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease !important;
}

.newsletter-btn:hover {
  background: #2980b9 !important;
  transform: none !important;
}

[data-theme="dark"] .newsletter-text {
  color: #9ca3af;
}

[data-theme="dark"] .newsletter-form input {
  background: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

/* Post meta icons */
.post-meta i {
  margin-right: 4px;
  font-size: 0.8rem;
}

/* Paginação */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 40px;
}

.page-button {
  background: #3498db; /* Substituído --blog-primary */
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s ease;
}

.page-button:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

/* Estilo dos itens da lista */
li {
  margin-bottom: 10px;
}

/* Estilo dos botões */
button {
  background-color: #e5e7eb; /* Substituído --blog-secondary */
  border: 1px solid #e5e7eb; /* Substituído --blog-secondary */
  border-radius: 20px;
  padding: 0.5rem 1rem;
  color: #374151;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  transition: transform 0.3s ease;
}

/* Estilo do botão ativo */
button.active {
  background-color: #3498db; /* Substituído --blog-primary */
  color: white;
  border-color: #3498db; /* Substituído --blog-primary */
}

/* Efeito hover nos botões */
button:hover {
  background: #3498db; /* Substituído --primary-color */
  color: rgb(253, 253, 253);
  transform: translateY(-5px);
}

/* Estilos do Tema Escuro */
[data-theme="dark"] .blog-page {
  background-color: #1f2937;
  color: #d1d5db;
}

[data-theme="dark"] .blog-header {
  border-bottom-color: #374151;
}

[data-theme="dark"] .search-bar input {
  background-color: #374151;
  border-color: #4b5563;
  color: #e5e7eb;
}

[data-theme="dark"] .theme-toggle i {
  color: #f3f4f6;
}

[data-theme="dark"] .featured-post,
[data-theme="dark"] .post-card,
[data-theme="dark"] .sidebar-section {
  background: #374151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

[data-theme="dark"] .featured-content h1,
[data-theme="dark"] .post-text-content h2,
[data-theme="dark"] .popular-post-info h4 {
  color: #ffffff;
}

[data-theme="dark"] .featured-content p,
[data-theme="dark"] .post-text-content p {
  color: #9ca3af;
}

[data-theme="dark"] .post-meta,
[data-theme="dark"] .popular-post-info span {
  color: #9ca3af;
}

[data-theme="dark"] .post-meta {
  border-top-color: #4b5563;
}

[data-theme="dark"] .sidebar-section h3 {
  color: #e5e7eb;
}

[data-theme="dark"] .categories button,
[data-theme="dark"] .tag-cloud .tag {
  background-color: #4b5563;
  border-color: #4b5563;
  color: #d1d5db;
}

[data-theme="dark"] .categories button:hover,
[data-theme="dark"] .tag-cloud .tag:hover,
[data-theme="dark"] .categories button.active,
[data-theme="dark"] .tag-cloud .tag.active {
  background-color: #3498db;
  border-color: #3498db;
  color: white;
}

[data-theme="dark"] .popular-post-link {
  border-bottom-color: #4b5563;
}

/* Responsividade */
@media (max-width: 768px) {
  .blog-content {
    flex-direction: column;
  }

  .blog-sidebar {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }

  .featured-post-link {
    flex-direction: column;
  }

  .featured-image,
  .featured-content {
    width: 100%;
  }

  .featured-image {
    height: 200px;
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .featured-post {
    flex-direction: column;
  }

  .blog-content {
    grid-template-columns: 1fr;
  }

  .post-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .blog-header nav {
    flex-direction: column;
  }

  .featured-post-link {
    flex-direction: column;
  }

  .featured-image,
  .featured-content {
    width: 100%;
  }

  .search-bar {
    max-width: 100%;
  }

  .featured-post h1 {
    font-size: 2.5rem;
  }

  .share-buttons {
    flex-direction: column;
  }
}
</style>
