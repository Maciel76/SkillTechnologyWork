<template>
  <div class="project-gallery">
    <!-- Filtros por categoria -->
    <div class="filter-tabs">
      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Grid de Projetos -->
    <div class="projects-mosaic">
      <div
        class="mosaic-item"
        v-for="(project, index) in filteredProjects"
        :key="'mosaic-' + index"
        :class="`size-${project.size}`"
        @click="openProjectModal(project)"
        data-aos="fade-up"
        :data-aos-delay="index * 50"
      >
        <div
          class="mosaic-image"
          :style="{ backgroundImage: `url(${project.thumbnail})` }"
        >
          <div class="mosaic-overlay">
            <div class="overlay-content">
              <span class="category-tag">{{ project.category }}</span>
              <h3>{{ project.name }}</h3>
              <div class="tech-stack" v-if="project.technologies">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-badge">
                  {{ tech }}
                </span>
              </div>
              <button class="view-detail-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Detalhes do Projeto -->
    <div class="project-modal-overlay" v-if="selectedProject" @click.self="closeProjectModal">
      <div class="project-modal-container">
        <button class="modal-close" @click="closeProjectModal">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div class="modal-content">
          <!-- Galeria de Imagens -->
          <div class="modal-gallery">
            <div class="main-image">
              <img :src="currentImage" :alt="selectedProject.name" />
            </div>

            <div class="thumbnail-gallery">
              <div
                v-for="(image, index) in selectedProject.images"
                :key="index"
                class="thumbnail-item"
                :class="{ active: currentImage === image }"
                @click="currentImage = image"
              >
                <img :src="image" :alt="`${selectedProject.name} - ${index + 1}`" />
              </div>
            </div>
          </div>

          <!-- Detalhes do Projeto -->
          <div class="modal-details">
            <div class="project-header">
              <span class="project-badge" :style="{ backgroundColor: selectedProject.accentColor }">
                {{ selectedProject.category }}
              </span>
              <h2>{{ selectedProject.name }}</h2>
              <p class="project-description">{{ selectedProject.description }}</p>
            </div>

            <div class="project-info-grid">
              <div class="info-item">
                <h4>Cliente</h4>
                <p>{{ selectedProject.client }}</p>
              </div>
              <div class="info-item">
                <h4>Ano</h4>
                <p>{{ selectedProject.year }}</p>
              </div>
              <div class="info-item">
                <h4>Duração</h4>
                <p>{{ selectedProject.duration }}</p>
              </div>
            </div>

            <div class="tech-section">
              <h4>Tecnologias Utilizadas</h4>
              <div class="tech-tags">
                <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-tag">
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="project-features" v-if="selectedProject.features">
              <h4>Principais Funcionalidades</h4>
              <ul>
                <li v-for="feature in selectedProject.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>

            <div class="modal-actions">
              <a href="#" class="btn-primary" @click.prevent="visitProject">
                Ver Projeto Completo
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <button class="btn-secondary" @click="closeProjectModal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectGallery',
  props: {
    projects: {
      type: Array,
      required: true
    },
    categories: {
      type: Array,
      default: () => ['Todos', 'Web App', 'E-commerce', 'Mobile App', 'Website', 'Sistema Web']
    }
  },
  data() {
    return {
      selectedCategory: 'Todos',
      selectedProject: null,
      currentImage: null
    };
  },
  computed: {
    filteredProjects() {
      if (this.selectedCategory === 'Todos') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.selectedCategory);
    }
  },
  methods: {
    openProjectModal(project) {
      this.selectedProject = project;
      this.currentImage = project.images[0];
      document.body.style.overflow = 'hidden';
    },
    closeProjectModal() {
      this.selectedProject = null;
      this.currentImage = null;
      document.body.style.overflow = 'auto';
    },
    visitProject() {
      // Navegação para página do projeto (será implementado depois)
      console.log('Visitar projeto:', this.selectedProject.id);
      this.$router.push(`/portfolio/${this.selectedProject.id}`);
    }
  }
};
</script>

<style scoped>
/* Filter Tabs */
.filter-tabs {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 60px;
  flex-wrap: wrap;
}

.filter-tabs button {
  padding: 12px 28px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #636e72;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tabs button:hover {
  border-color: #6c5ce7;
  color: #6c5ce7;
  transform: translateY(-2px);
}

.filter-tabs button.active {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  border-color: #6c5ce7;
  color: white;
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

/* Projects Mosaic */
.projects-mosaic {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 240px;
  gap: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.mosaic-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.mosaic-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.mosaic-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.mosaic-item:hover .mosaic-image {
  transform: scale(1.05);
}

.mosaic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(108, 92, 231, 0.95), rgba(74, 61, 192, 0.95));
  color: white;
  opacity: 0;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mosaic-item:hover .mosaic-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  padding: 24px;
  transform: translateY(20px);
  transition: transform 0.4s ease;
}

.mosaic-item:hover .overlay-content {
  transform: translateY(0);
}

.category-tag {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.overlay-content h3 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.tech-stack {
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.tech-badge {
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.view-detail-btn {
  width: 50px;
  height: 50px;
  background: white;
  color: #6c5ce7;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin: 0 auto;
}

.view-detail-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
}

.view-detail-btn svg {
  transition: transform 0.3s ease;
}

.view-detail-btn:hover svg {
  transform: translateX(3px);
}

.size-large {
  grid-column: span 6;
}

.size-medium {
  grid-column: span 4;
}

.size-small {
  grid-column: span 3;
}

/* Project Modal */
.project-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.project-modal-container {
  background: white;
  border-radius: 20px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.4s ease;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.modal-close:hover {
  background: #6c5ce7;
  color: white;
  transform: rotate(90deg);
}

.modal-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

/* Gallery Section */
.modal-gallery {
  padding: 40px;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.main-image {
  width: 100%;
  height: 450px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.thumbnail-item {
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 3px solid transparent;
  transition: all 0.3s ease;
  opacity: 0.7;
}

.thumbnail-item:hover {
  opacity: 1;
  transform: translateY(-2px);
}

.thumbnail-item.active {
  border-color: #6c5ce7;
  opacity: 1;
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.3);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Details Section */
.modal-details {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.project-header h2 {
  font-size: 2rem;
  margin-bottom: 12px;
  color: #2d3436;
}

.project-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.project-description {
  color: #636e72;
  line-height: 1.7;
  font-size: 1.05rem;
}

.project-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: #f5f7fa;
  border-radius: 12px;
}

.info-item h4 {
  font-size: 0.85rem;
  color: #636e72;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.info-item p {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3436;
}

.tech-section h4,
.project-features h4 {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: #2d3436;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tag {
  padding: 8px 16px;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-features ul {
  list-style: none;
  padding: 0;
}

.project-features li {
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
  color: #636e72;
  position: relative;
  padding-left: 24px;
}

.project-features li:last-child {
  border-bottom: none;
}

.project-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #6c5ce7;
  font-weight: bold;
}

.modal-actions {
  display: flex;
  gap: 16px;
  margin-top: 20px;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 16px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(108, 92, 231, 0.3);
  gap: 12px;
}

.btn-secondary {
  background: transparent;
  color: #636e72;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  border-color: #6c5ce7;
  color: #6c5ce7;
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsividade */
@media (max-width: 1200px) {
  .modal-content {
    grid-template-columns: 1fr;
  }

  .modal-gallery {
    padding: 30px;
  }

  .main-image {
    height: 350px;
  }
}

@media (max-width: 768px) {
  .filter-tabs {
    gap: 8px;
  }

  .filter-tabs button {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  .projects-mosaic {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 200px;
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 2;
  }

  .overlay-content h3 {
    font-size: 1.2rem;
  }

  .tech-badge {
    font-size: 0.65rem;
    padding: 3px 10px;
  }

  .modal-gallery {
    padding: 20px;
  }

  .main-image {
    height: 280px;
  }

  .thumbnail-gallery {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .thumbnail-item {
    height: 70px;
  }

  .modal-details {
    padding: 30px 20px;
  }

  .project-info-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .modal-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .projects-mosaic {
    grid-template-columns: 1fr;
    grid-auto-rows: 250px;
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 1;
  }

  .overlay-content h3 {
    font-size: 1.1rem;
  }

  .category-tag {
    font-size: 0.7rem;
    padding: 4px 12px;
  }

  .view-detail-btn {
    width: 45px;
    height: 45px;
  }

  .project-header h2 {
    font-size: 1.5rem;
  }

  .thumbnail-gallery {
    gap: 6px;
  }

  .thumbnail-item {
    height: 60px;
  }
}
</style>
