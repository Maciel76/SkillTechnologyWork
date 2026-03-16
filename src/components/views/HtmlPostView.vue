<template>
  <div class="html-fullpage">
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

    <!-- HTML Content - Full Page Iframe via Blob URL -->
    <iframe
      v-else
      ref="htmlIframe"
      class="html-fullpage-iframe"
      :src="blobUrl"
      allow="autoplay; fullscreen"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
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
    const blobUrl = ref(null);

    // Limpar meta tags adicionadas ao sair
    const addedMetaTags = [];

    const extractAndApplyMeta = (htmlContent) => {
      if (!htmlContent) return;

      // Extrair <title>
      const titleMatch = htmlContent.match(/<title[^>]*>(.*?)<\/title>/is);
      if (titleMatch) {
        document.title = titleMatch[1].trim();
      }

      // Extrair meta tags do HTML e aplicar no documento pai
      const metaRegex = /<meta\s+([^>]*)>/gi;
      let match;
      while ((match = metaRegex.exec(htmlContent)) !== null) {
        const attrs = match[1];

        // Extrair name/property e content
        const nameMatch = attrs.match(/(?:name|property)\s*=\s*["']([^"']+)["']/i);
        const contentMatch = attrs.match(/content\s*=\s*["']([^"']+)["']/i);

        if (nameMatch && contentMatch) {
          const attrType = attrs.match(/property\s*=/) ? "property" : "name";
          const name = nameMatch[1];
          const content = contentMatch[1];

          // Pular viewport e charset (são específicos do iframe)
          if (name === "viewport" || name === "charset") continue;

          let tag = document.querySelector(`meta[${attrType}="${name}"]`);
          if (!tag) {
            tag = document.createElement("meta");
            tag.setAttribute(attrType, name);
            document.head.appendChild(tag);
            addedMetaTags.push(tag);
          }
          tag.setAttribute("content", content);
        }
      }
    };

    const createBlobUrl = (htmlContent) => {
      // Limpar blob URL anterior
      if (blobUrl.value) {
        URL.revokeObjectURL(blobUrl.value);
      }

      const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });
      blobUrl.value = URL.createObjectURL(blob);
    };

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

        // Extrair e aplicar meta tags do HTML no documento pai
        extractAndApplyMeta(postData.content);

        // Criar blob URL para renderizar o HTML com fidelidade total
        createBlobUrl(postData.content);
      } catch (err) {
        error.value = err.message || "Erro ao carregar página";
      } finally {
        loading.value = false;
      }
    };

    const onIframeLoad = () => {
      // Nada a fazer - o blob URL renderiza o HTML nativamente
      // O iframe ocupa 100% da viewport e o scroll interno funciona sozinho
    };

    const cleanup = () => {
      // Revogar blob URL
      if (blobUrl.value) {
        URL.revokeObjectURL(blobUrl.value);
        blobUrl.value = null;
      }
      // Remover meta tags adicionadas
      addedMetaTags.forEach((tag) => {
        if (tag.parentNode) tag.parentNode.removeChild(tag);
      });
      addedMetaTags.length = 0;
    };

    onMounted(() => {
      loadPost();
    });

    onUnmounted(() => {
      cleanup();
    });

    return {
      post,
      loading,
      error,
      htmlIframe,
      blobUrl,
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
