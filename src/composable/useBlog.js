import { ref, computed } from "vue";
import articleService from "@/services/articleService";

export function useBlog() {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Buscar todos os posts publicados
  const fetchPosts = async () => {
    try {
      loading.value = true;
      const response = await articleService.getArticles({
        status: "published",
        limite: 50,
      });
      posts.value = response.artigos;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Buscar post específico
  const getPost = async (id) => {
    try {
      loading.value = true;
      const post = await articleService.getArticle(id);
      return post;
    } catch (err) {
      error.value = err.message;
      return null;
    } finally {
      loading.value = false;
    }
  };

  // Posts em destaque
  const featuredPosts = computed(() => {
    return posts.value.filter((post) => post.destaque).slice(0, 3);
  });

  // Categorias únicas
  const categories = computed(() => {
    const allCategories = posts.value.flatMap((post) => post.categorias || []);
    return [...new Set(allCategories)];
  });

  // Tags únicas
  const tags = computed(() => {
    const allTags = posts.value.flatMap((post) => post.tags || []);
    return [...new Set(allTags)];
  });

  // Busca de posts
  const searchPosts = (query) => {
    if (!query) return posts.value;

    return posts.value.filter(
      (post) =>
        post.titulo.toLowerCase().includes(query.toLowerCase()) ||
        post.resumo.toLowerCase().includes(query.toLowerCase()) ||
        post.conteudo.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Posts relacionados
  const getRelatedPosts = (currentPost) => {
    return posts.value
      .filter(
        (post) =>
          post._id !== currentPost._id &&
          (post.categorias.some((cat) =>
            currentPost.categorias.includes(cat)
          ) ||
            post.tags.some((tag) => currentPost.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  // Adicionar comentário (você precisará criar essa rota também)
  const addComment = async (postId, comment) => {
    // Implementação temporária - você precisará criar a lógica de comentários
    console.log("Adicionando comentário:", { postId, comment });
    return { success: true };
  };

  // Carregar posts inicialmente
  fetchPosts();

  return {
    posts,
    featuredPosts,
    categories,
    tags,
    loading,
    error,
    getPost,
    getRelatedPosts,
    searchPosts,
    addComment,
    fetchPosts,
  };
}
