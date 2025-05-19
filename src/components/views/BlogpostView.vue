<template>
  <div class="blog-post-page">
    <main class="blog-post-container">
      <article class="blog-post" v-if="post">
        <header class="post-header">
          <h1>{{ post.title }}</h1>
          <div class="post-meta">
            <span class="author">{{ post.author }}</span>
            <span class="date">{{ formatDate(post.date) }}</span>
            <span class="category">{{ post.category }}</span>
          </div>
          <div class="tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{
              tag
            }}</span>
          </div>
        </header>

        <img :src="post.image" :alt="post.title" class="post-image" />

        <!-- Componente dinâmico carregado com base no ID do post.  -->
        <component :is="postComponent" v-if="postComponent" />

        <!-- Restante do código... -->
      </article>
    </main>
  </div>
</template>

<script>
//revisado
import { ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useBlog } from "@/components/composables/useBlog.js";

export default {
  name: "BlogpostView",
  components: {},
  setup() {
    const route = useRoute();
    const { getPost, getRelatedPosts, addComment } = useBlog();
    const post = ref(null);
    const relatedPosts = ref([]);
    const isSubmitting = ref(false);
    const postComponent = ref(null); // Componente dinâmico

    const newComment = ref({
      author: "",
      content: "",
    });

    onMounted(() => {
      const postId = parseInt(route.params.id);
      post.value = getPost(postId);
      if (post.value) {
        relatedPosts.value = getRelatedPosts(post.value);
        // Carrega o componente dinamicamente com base no ID do post
        postComponent.value = defineAsyncComponent(
          () => import(`@/components/posts/PostView${postId}.vue`) // Importa o componente dinâmico
        );
      }
    });

    const submitComment = () => {
      if (!newComment.value.author || !newComment.value.content) return;

      isSubmitting.value = true;
      addComment(post.value.id, {
        author: newComment.value.author,
        content: newComment.value.content,
      });

      // Reset form
      newComment.value = {
        author: "",
        content: "",
      };
      isSubmitting.value = false;
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return {
      post,
      relatedPosts,
      newComment,
      isSubmitting,
      postComponent,
      submitComment,
      formatDate,
    };
  },
};
</script>

<style scoped>
.edit-button {
  padding: 10px 20px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.edit-button:hover {
  background: #2980b9;
}
.blog-post-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-post {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.post-header {
  margin-bottom: 2rem;
}

.post-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.875rem;
  color: #666;
}

.post-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.post-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 3rem;
}

.comments-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.comment {
  background: #f8f8f8;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.comment-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  color: #666;
}

.comment-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

.related-posts {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.related-posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.related-post-card {
  background: #f8f8f8;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.related-post-card:hover {
  transform: translateY(-5px);
}

.related-post-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.related-post-card h3 {
  padding: 1rem;
  margin: 0;
  font-size: 1.1rem;
  color: #333;
}

.related-post-card p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.not-found {
  text-align: center;
  padding: 3rem;
}

.not-found a {
  color: #007bff;
  text-decoration: none;
}

.not-found a:hover {
  text-decoration: underline;
}
</style>
