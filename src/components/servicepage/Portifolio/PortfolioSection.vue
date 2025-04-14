<template>
  <div class="portfolio-container">
    <!-- Filtros -->
    <div class="filters">
      <button 
        v-for="filter in filters" 
        :key="filter.id"
        @click="activeFilter = filter.id"
        :class="{ active: activeFilter === filter.id }"
      >
        {{ filter.name }}
      </button>
    </div>

    <!-- Grid de Projetos -->
    <div class="projects-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="project-card"
        @click="openModal(project)"
      >
        <img :src="project.thumbnail" :alt="project.title">
        <div class="overlay">
          <h3>{{ project.title }}</h3>
          <span>{{ project.category }}</span>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        <h2>{{ selectedProject.title }}</h2>
        <p class="category">{{ selectedProject.category }}</p>
        <img :src="selectedProject.image" :alt="selectedProject.title">
        <p>{{ selectedProject.description }}</p>
        <div class="tech-list">
          <span v-for="tech in selectedProject.technologies" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioComponent',
  data() {
    return {
      activeFilter: 'all',
      selectedProject: null,
      filters: [
        { id: 'all', name: 'Todos' },
        { id: 'web', name: 'Web' },
        { id: 'mobile', name: 'Mobile' },
        { id: 'design', name: 'Design' }
      ],
      projects: [
        {
          id: 1,
          title: 'Loja Virtual',
          category: 'Web',
          thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500',
          image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
          description: 'E-commerce completo com carrinho de compras e integração de pagamentos.',
          technologies: ['Vue.js', 'Node.js', 'MongoDB']
        },
        {
          id: 2,
          title: 'App de Fitness',
          category: 'Mobile',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
          description: 'Aplicativo para acompanhamento de exercícios e dieta.',
          technologies: ['React Native', 'Firebase']
        },
        {
          id: 3,
          title: 'Identidade Visual',
          category: 'Design',
          thumbnail: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=500',
          image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800',
          description: 'Criação de identidade visual para marca de moda.',
          technologies: ['Photoshop', 'Illustrator']
        },
        {
          id: 4,
          title: 'Portal Corporativo',
          category: 'Web',
          thumbnail: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500',
          image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800',
          description: 'Website institucional com gestão de conteúdo.',
          technologies: ['Nuxt.js', 'WordPress']
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'all') return this.projects
      return this.projects.filter(project => project.category.toLowerCase() === this.activeFilter)
    }
  },
  methods: {
    openModal(project) {
      this.selectedProject = project
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.selectedProject = null
      document.body.style.overflow = 'auto'
    }
  }
}
</script>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  justify-content: center;
}

.filters button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filters button:hover {
  background: #f0f0f0;
}

.filters button.active {
  background: #3B82F6;
  color: white;
  border-color: #3B82F6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.project-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  aspect-ratio: 4/3;
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  padding: 20px;
  color: white;
}

.overlay h3 {
  margin-bottom: 5px;
  font-size: 1.2rem;
}

.overlay span {
  background: #3B82F6;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 10px;
  padding: 30px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-content h2 {
  margin-bottom: 5px;
}

.modal-content .category {
  color: #3B82F6;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-content img {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  margin: 20px 0;
  border-radius: 5px;
}

.tech-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.tech-list span {
  background: #f0f0f0;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .modal-content {
    padding: 20px;
  }
}
</style>