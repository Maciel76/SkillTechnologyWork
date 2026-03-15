<template>
  <div class="html-fullpage" :class="{ loaded: !loading }">
    <!-- Loading -->
    <div v-if="loading" class="html-loading">
      <div class="spinner"></div>
      <p>Carregando página...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error || !post" class="html-error">
      <h2>Página não encontrada</h2>
      <p>{{ error || "A página que você procura não está disponível." }}</p>
      <router-link to="/blog" class="back-link">Voltar ao Blog</router-link>
    </div>

    <!-- HTML Content - Full Page Iframe -->
    <iframe
      v-else
      ref="htmlIframe"
      class="html-fullpage-iframe"
      :srcdoc="post.content"
      sandbox="allow-scripts allow-same-origin"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBlog } from "@/components/composables/useBlog.js";

export default {
  name: "HtmlPostView",
  setup() {
    const route = useRoute();
    const { getPost } = useBlog();

    const post = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const htmlIframe = ref(null);

    const loadPost = async () => {
      try {
        loading.value = true;
        error.value = null;
        const postId = route.params.id;
        const postData = await getPost(postId);

        if (!postData) {
          error.value = "Página não encontrada";
          return;
        }

        post.value = postData;

        // SEO: Update title
        if (postData.title) {
          document.title = postData.title;
        }
      } catch (err) {
        error.value = err.message || "Erro ao carregar página";
      } finally {
        loading.value = false;
      }
    };

    const onIframeLoad = () => {
      // Auto-resize iframe to content height
      const iframe = htmlIframe.value;
      if (iframe) {
        try {
          const height = iframe.contentDocument?.documentElement?.scrollHeight;
          if (height) {
            iframe.style.height = height + "px";
          }
        } catch (e) {
          // Fallback
        }
      }
    };

    onMounted(() => {
      loadPost();
    });

    return {
      post,
      loading,
      error,
      htmlIframe,
      onIframeLoad,
    };
  },
};
</script>

<style scoped>
.html-fullpage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: auto;
  background: #fff;
  z-index: 10;
}

.html-fullpage-iframe {
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  padding: 0;
  display: block;
  overflow: auto;
}

.html-loading,
.html-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 16px;
  color: #374151;
}

.html-error h2 {
  font-size: 1.5rem;
  margin: 0;
}

.html-error p {
  color: #6b7280;
}

.back-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  padding: 10px 20px;
  border: 2px solid #6366f1;
  border-radius: 8px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #6366f1;
  color: white;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
