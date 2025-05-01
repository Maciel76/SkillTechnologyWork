<template>
  <div class="portfolio-container">
    <h2 class="section-title">
      Nosso <span class="highlight">Portfólio</span>
    </h2>
    <p class="section-subtitle">
      Conheça alguns dos nossos projetos mais recentes
    </p>

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

    <div class="projects-grid">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="project-card"
        @click="openModal(project)"
      >
        <img :src="project.thumbnail" :alt="project.title" />
        <div class="overlay">
          <div class="overlay-content">
            <span class="project-category">{{ project.category }}</span>
            <h3>{{ project.title }}</h3>
            <p class="project-preview">{{ project.description }}</p>
            <div class="tech-preview">
              <span v-for="tech in project.technologies" :key="tech">{{
                tech
              }}</span>
            </div>
            <button class="view-details">Ver Detalhes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedProject" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-btn" @click="closeModal">×</button>
        <h2>{{ selectedProject.title }}</h2>
        <p class="category">{{ selectedProject.category }}</p>
        <img :src="selectedProject.image" :alt="selectedProject.title" />
        <p>{{ selectedProject.description }}</p>
        <div class="tech-list">
          <span v-for="tech in selectedProject.technologies" :key="tech">{{
            tech
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PortfolioComponent",
  data() {
    return {
      activeFilter: "all",
      selectedProject: null,
      filters: [
        { id: "all", name: "Todos" },
        { id: "web", name: "Web" },
        { id: "mobile", name: "Mobile" },
        { id: "design", name: "Design" },
      ],
      projects: [
        {
          id: 1,
          title: "Loja Virtual",
          category: "Web",
          thumbnail:
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500",
          image:
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
          description:
            "E-commerce completo com carrinho de compras e integração de pagamentos.",
          technologies: ["Vue.js", "Node.js", "MongoDB"],
        },
        {
          id: 2,
          title: "App de Fitness",
          category: "Mobile",
          thumbnail:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
          description: "Aplicativo para acompanhamento de exercícios e dieta.",
          technologies: ["React Native", "Firebase"],
        },
        {
          id: 3,
          title: "Identidade Visual",
          category: "Design",
          thumbnail:
            "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=500",
          image:
            "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800",
          description: "Criação de identidade visual para marca de moda.",
          technologies: ["Photoshop", "Illustrator"],
        },
        {
          id: 4,
          title: "Portal Corporativo",
          category: "Web",
          thumbnail:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500",
          image:
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
          description: "Website institucional com gestão de conteúdo.",
          technologies: ["Nuxt.js", "WordPress"],
        },
      ],
    };
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === "all") return this.projects;
      return this.projects.filter(
        (project) => project.category.toLowerCase() === this.activeFilter
      );
    },
  },
  methods: {
    openModal(project) {
      this.selectedProject = project;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.selectedProject = null;
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 20px;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #1e293b;
}

.highlight {
  color: #3b82f6;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(59, 130, 246, 0.2);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
  justify-content: center;
}

.filters button {
  padding: 10px 20px;
  border: 2px solid #e2e8f0;
  background: transparent;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #64748b;
}

.filters button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.filters button.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
}

.project-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  aspect-ratio: 16/12;
}

.project-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover img {
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4));
  opacity: 0;
  transition: all 0.4s ease;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}

.project-card:hover .overlay {
  opacity: 1;
}

.overlay-content {
  transform: translateY(20px);
  transition: transform 0.4s ease;
  color: white;
}

.project-card:hover .overlay-content {
  transform: translateY(0);
}

.project-category {
  background: #3b82f6;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.project-preview {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tech-preview {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tech-preview span {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
}

.view-details {
  background: white;
  color: #3b82f6;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-details:hover {
  background: #3b82f6;
  color: white;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: modalFadeIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: rotate(90deg);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content h2 {
  font-size: 2rem;
  color: #1e293b;
}

.tech-list span {
  background: #f1f5f9;
  color: #3b82f6;
  font-weight: 600;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
