<template>
  <section class="recent-posts">
    <div class="container">
      <h2 class="section-title">Nosso <span class="highlight">Blog</span></h2>
      <p class="section-subtitle">
        Confira as mais recente Publicação em nosso blog
      </p>

      <div class="posts-grid">
        <div v-for="post in recentPosts" :key="post.id" class="post-card">
          <div class="post-image">
            <img :src="post.image" :alt="post.title" />
          </div>
          <div class="post-content">
            <div class="post-meta">
              <span class="post-date">{{ formatDate(post.date) }}</span>
              <span class="post-category">{{ post.category }}</span>
            </div>
            <h3 class="post-title">{{ post.title }}</h3>
            <p class="post-excerpt">{{ post.summary || post.excerpt }}</p>
            <router-link :to="`/blog/${post.id}`" class="read-more">
              Ler mais
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//revisado
import { ref, onMounted } from "vue";
import { useBlog } from "../composables/useBlog"; // Ajuste o caminho conforme sua estrutura

export default {
  name: "RecentPosts",
  setup() {
    const { posts } = useBlog();
    const recentPosts = ref([]);

    const getRecentPosts = () => {
      // Ordena os posts por data (do mais recente para o mais antigo)
      const sortedPosts = [...posts.value].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      // Pega os 3 primeiros posts (os mais recentes)
      recentPosts.value = sortedPosts.slice(0, 3);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    onMounted(() => {
      getRecentPosts();
    });

    return {
      recentPosts,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Mantenha seus estilos existentes */
.recent-posts {
  padding: 6rem 1rem;
  background: #f8fafc;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.highlight {
  color: #0052ff;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 3rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  color: #64748b;
}

.post-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.post-excerpt {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #0052ff;
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.3s ease;
}

.read-more:hover {
  gap: 0.75rem;
}

@media (max-width: 1024px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
