import { ref, computed, onMounted } from 'vue';
import articleService from '@/services/articleService';

// Estado reativo global
const articles = ref([]);
const loading = ref(false);
const error = ref(null);
const categories = ref([
  'tecnologia',
  'negocios',
  'marketing',
  'design',
  'dicas',
  'tutoriais',
  'noticias',
  'geral'
]);

// Cache para evitar múltiplas requisições
let initialized = false;

export function useBlog() {
  // Carregar artigos da API
  const loadArticles = async () => {
    if (initialized && articles.value.length > 0) {
      return; // Já carregados
    }

    try {
      loading.value = true;
      error.value = null;

      const response = await articleService.getPublishedArticles({
        limit: 100,
        page: 1
      });

      articles.value = response.data.map(article => ({
        id: article._id,
        title: article.title || article.titulo,
        author: article.author || article.autor || 'Admin',
        date: article.date || article.createdAt,
        category: (article.categorias && article.categorias.length > 0)
          ? article.categorias[0]
          : article.category || 'geral',
        tags: article.tags || [],
        image: article.image || article.imagem || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        summary: article.summary || article.resumo || '',
        content: article.content || article.conteudo || '',
        views: article.views || 0,
        comments: article.comments || article.comentarios || [],
        readTime: article.tempoLeitura || 5,
        isDraft: article.status !== 'published',
        destaque: article.destaque || false,
        slug: article.slug
      }));

      initialized = true;
    } catch (err) {
      console.error('Erro ao carregar artigos:', err);
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  // Auto-carregar ao usar o composable
  if (!initialized) {
    loadArticles();
  }

  // Posts computados
  const posts = computed(() => articles.value);

  // Posts em destaque
  const featuredPosts = computed(() => {
    // Primeiro tenta pegar o post marcado como destaque
    const featured = articles.value.filter(p => p.destaque);
    if (featured.length > 0) {
      return featured.slice(0, 3);
    }

    // Se não houver destaque, pega os 3 mais visualizados
    return [...articles.value]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3);
  });

  // Buscar post por ID
  const getPost = async (id) => {
    try {
      const response = await articleService.getArticle(id);
      const article = response.data;

      return {
        id: article._id,
        title: article.title || article.titulo,
        author: article.author || article.autor || 'Admin',
        date: article.date || article.createdAt,
        category: (article.categorias && article.categorias.length > 0)
          ? article.categorias[0]
          : article.category || 'geral',
        tags: article.tags || [],
        image: article.image || article.imagem || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        summary: article.summary || article.resumo || '',
        content: article.content || article.conteudo || '',
        views: article.views || 0,
        comments: article.comments || article.comentarios || [],
        readTime: article.tempoLeitura || 5,
        slug: article.slug
      };
    } catch (err) {
      console.error('Erro ao buscar artigo:', err);
      return null;
    }
  };

  // Buscar posts por categoria
  const getPostsByCategory = (category) => {
    return articles.value.filter(p => p.category === category);
  };

  // Buscar posts por tag
  const getPostsByTag = (tag) => {
    return articles.value.filter(p => p.tags.includes(tag));
  };

  // Buscar posts (search)
  const searchPosts = (query) => {
    query = query.toLowerCase();
    return articles.value.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  };

  // Adicionar comentário
  const addComment = async (postId, comment) => {
    try {
      const response = await articleService.addComment(
        postId,
        comment.text,
        comment.author || 'Anônimo',
        comment.userId
      );

      // Atualizar localmente
      const post = articles.value.find(p => p.id === postId);
      if (post) {
        post.comments = response.comentarios;
      }

      return response;
    } catch (err) {
      console.error('Erro ao adicionar comentário:', err);
      throw err;
    }
  };

  // Buscar posts relacionados
  const getRelatedPosts = async (currentPost) => {
    try {
      const related = await articleService.getRelatedArticles(currentPost.id, 3);

      return related.map(article => ({
        id: article._id,
        title: article.titulo,
        author: article.autor || 'Admin',
        date: article.dataPublicacao || article.createdAt,
        category: article.categorias && article.categorias.length > 0
          ? article.categorias[0]
          : 'geral',
        tags: article.tags || [],
        image: article.imagem || 'https://via.placeholder.com/800x450',
        summary: article.resumo || '',
        views: article.visualizacoes || 0,
        slug: article.slug
      }));
    } catch (err) {
      console.error('Erro ao buscar artigos relacionados:', err);
      // Fallback: buscar localmente
      return articles.value
        .filter(post =>
          post.id !== currentPost.id &&
          (post.category === currentPost.category ||
           post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .slice(0, 3);
    }
  };

  // Buscar artigo em destaque
  const getFeaturedArticle = async () => {
    try {
      const article = await articleService.getFeaturedArticle();

      return {
        id: article._id,
        title: article.titulo,
        author: article.autor || 'Admin',
        date: article.dataPublicacao || article.createdAt,
        category: article.categorias && article.categorias.length > 0
          ? article.categorias[0]
          : 'geral',
        tags: article.tags || [],
        image: article.imagem || 'https://via.placeholder.com/800x450',
        summary: article.resumo || '',
        content: article.conteudo,
        views: article.visualizacoes || 0,
        slug: article.slug
      };
    } catch (err) {
      console.error('Erro ao buscar artigo em destaque:', err);
      return null;
    }
  };

  // Extrair todas as tags únicas dos posts
  const allTags = computed(() => {
    const tagsSet = new Set();
    articles.value.forEach(post => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  });

  // Recarregar artigos
  const refresh = () => {
    initialized = false;
    return loadArticles();
  };

  return {
    // Estado
    posts,
    loading,
    error,
    categories: computed(() => categories.value),
    tags: allTags,

    // Posts especiais
    featuredPosts,

    // Métodos de busca
    getPost,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    getRelatedPosts,
    getFeaturedArticle,

    // Métodos de interação
    addComment,

    // Utilitários
    refresh,
    loadArticles
  };
}
