<template>
  <div class="blog-page">
    <header class="blog-header">
      <nav>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar artigos..."
            @input="handleSearch"
          />
          <button class="search-button">
            <img src="../../assets/svg/icons/seach1.svg" alt="Search" />
          </button>
        </div>
        <div class="nav-controls">
          <button @click="toggleTheme" class="theme-toggle">
            <i class="fas" :class="isDarkMode ? 'fa-sun' : 'fa-moon'"></i>
          </button>
        </div>
      </nav>
    </header>

    <main class="blog-main">
      <!-- Featured Post Section. -->
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
              <span>{{ formatDate(featuredPosts[0].date) }}</span>
              <span>{{ featuredPosts[0].author }}</span>
            </div>
          </div>
        </router-link>
      </section>

      <div class="blog-content">
        <!-- Posts Grid -->
        <section class="post-grid">
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
                  <span>{{ post.author }}</span>
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
//revisado
import { ref, computed, onMounted } from "vue";
import { useBlog } from "../composables/useBlog";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useStats } from "../composables/useStats"; // ← Adicione esta linha

export default {
  name: "BlogView",
  components: {},
  setup() {
    const { posts, featuredPosts, categories, tags, searchPosts } = useBlog();
    const { registerVisit } = useStats(); // ← Adicione esta linha

    const searchQuery = ref("");
    const currentPage = ref(1);
    const postsPerPage = 6;
    const currentCategory = ref(null);
    const currentTag = ref(null);
    const isDarkMode = ref(false);

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
      currentPage.value = 1;
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
      localStorage.setItem("blog-theme", newTheme); // Salva a preferência
    };

    // Initialize theme
    onMounted(() => {
      // Garante que o tema seja aplicado ao carregar
      const savedTheme = localStorage.getItem("blog-theme");
      if (savedTheme === "dark") {
        isDarkMode.value = true;
        document.documentElement.setAttribute("data-theme", "dark");
      }
      registerVisit();
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
      handleSearch,
      filterByCategory,
      filterByTag,
      formatDate,
      toggleTheme,
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
  padding: 20px;
}

/* Cabeçalho */
.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  width: 300px;
  background-color: transparent;
  color: #1f2937;
  font-size: 1rem;
}

.search-button {
  background: #3498db; /* Substituído --primary-color */
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button img {
  width: 20px;
  height: 20px;
}

.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle i {
  font-size: 24px;
  color: #4b5563;
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
  grid-template-columns: 1fr 400px;
  gap: 4rem;
  padding: 4rem 5%;
}

/* Latest Posts */
.latest-posts h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* A linha abaixo foi removida para permitir que os cards tenham altura flexível */
  /* grid-auto-rows: 1fr; */
  gap: 2rem;
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
