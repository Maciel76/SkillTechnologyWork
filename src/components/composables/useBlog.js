import { ref, computed } from 'vue';

const STORAGE_KEY = 'blog_data';

// Initial blog data structure
const initialData = {
  posts: [
    {
      id: 1,
      title: 'Introdução ao Vue 3 Composition API',
      author: 'João Silva',
      date: '2024-01-15',
      category: 'Vue.js',
      tags: ['Vue', 'JavaScript', 'Frontend'],
      image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Atualize o caminho da imagem
      summary: 'Aprenda os fundamentos da Composition API no Vue 3 e como ela pode melhorar a organização do seu código.',
      content: 'A Composition API é uma nova forma de organizar a lógica dos componentes no Vue 3...',
      views: 0,
      comments: [],
      isDraft: false
    },
    {
      id: 2,
      title: 'Otimizando Performance em Aplicações Vue pinia',
      author: 'Maria Santos',
      date: '2024-01-20',
      category: 'Performance',
      tags: ['Vue', 'Performance', 'Otimização'],
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Atualize o caminho da imagem
      summary: 'Dicas e técnicas para melhorar a performance de suas aplicações Vue.',
      content: 'A performance é um aspecto crucial no desenvolvimento web moderno...',
      views: 0,
      comments: [],
      isDraft: false
    },
    {
      id: 3,
      title: 'O futuro da inteligencia artificial',
      author: 'Maciel ribeiro',
      date: '2024-01-20',
      category: 'Performance',
      tags: ['Vue', 'Performance', 'Otimização'],
      image: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Atualize o caminho da imagem
      summary: ' o futuro da inteligencia artificial e como ela pode melhorar a organização do seu código.',
      content: 'a inteligencia artificial é uma nova forma de organizar a lógica dos componentes no Vue 3...',
      views: 0,
      comments: [],
      isDraft: false
    },
    {
      id: 4,
      title: 'O impacto das inteligencia artificial no mundo',
      author: 'Maciel ribeiro',
      date: '2024-01-20',
      category: 'Performance',
      tags: ['Vue', 'Performance', 'Otimização'],
      image: 'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Atualize o caminho da imagem
      summary: ' o futuro da inteligencia artificial e como ela pode melhorar a organização do seu código.',
      content: 'a inteligencia artificial é uma nova forma de organizar a lógica dos componentes no Vue 3...',
      views: 0,
      comments: [],
      isDraft: false
    },
  ],
  categories: ['Vue.js', 'Performance', 'JavaScript', 'Frontend'],
  tags: ['Vue', 'JavaScript', 'Frontend', 'Performance', 'Otimização']
};

// Load initial data and merge with localStorage (only for dynamic data like views and comments)
const loadData = () => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || { posts: [] };

  // Merge initial posts with saved posts (preserve views and comments)
  const mergedPosts = initialData.posts.map(post => {
    const savedPost = savedData.posts.find(p => p.id === post.id);
    return {
      ...post,
      views: savedPost ? savedPost.views : post.views,
      comments: savedPost ? savedPost.comments : post.comments
    };
  });

  return {
    ...initialData,
    posts: mergedPosts
  };
};

// Initialize data
const blogData = ref(loadData());

// Save dynamic data to localStorage (views and comments)
const saveData = () => {
  const dataToSave = {
    posts: blogData.value.posts.map(post => ({
      id: post.id,
      views: post.views,
      comments: post.comments
    }))
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
};

export function useBlog() {
  // Get all posts
  const posts = computed(() => blogData.value.posts);

  // Get featured posts (most viewed)
  const featuredPosts = computed(() => 
    [...blogData.value.posts]
      .sort((a, b) => b.views - a.views)
      .slice(0, 3)
  );

  // Get post by ID
  const getPost = (id) => {
    const post = blogData.value.posts.find(p => p.id === id);
    if (post) {
      post.views++;
      saveData();
    }
    return post;
  };

  // Get posts by category
  const getPostsByCategory = (category) => {
    return blogData.value.posts.filter(p => p.category === category);
  };

  // Get posts by tag
  const getPostsByTag = (tag) => {
    return blogData.value.posts.filter(p => p.tags.includes(tag));
  };

  // Search posts
  const searchPosts = (query) => {
    query = query.toLowerCase();
    return blogData.value.posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  };

  // Add comment to post
  const addComment = (postId, comment) => {
    const post = blogData.value.posts.find(p => p.id === postId);
    if (post) {
      post.comments.push({
        id: Date.now(),
        ...comment,
        date: new Date().toISOString()
      });
      saveData();
    }
  };

  // Get related posts
  const getRelatedPosts = (currentPost) => {
    return blogData.value.posts
      .filter(post => 
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
         post.tags.some(tag => currentPost.tags.includes(tag)))
      )
      .slice(0, 3);
  };

  return {
    posts,
    featuredPosts,
    getPost,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    addComment,
    getRelatedPosts,
    categories: computed(() => blogData.value.categories),
    tags: computed(() => blogData.value.tags)
  };
}