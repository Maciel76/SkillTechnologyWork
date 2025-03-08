<template>    
  <main>
      <section class="projects-grid">
          <!-- Project Card 1; -->
          <article class="project-card">
              <div class="project-thumbnail">
                  <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                      alt="Tech App" 
                      loading="lazy"
                      @click="openOverlay(1)"
                  >
                  <div class="project-overlay">
                      <a href="#" class="view-project" @click.prevent="openOverlay(1)">Ver exemplares</a>
                  </div>
              </div>
              <div class="project-info">
                  <span class="project-category">Website</span>
                  <h3>Website/Sistemas Personalizados com IA Integrada</h3>
                  <p>Desenvolvimento de websites e sistemas sob medida, com design responsivo, integração de funcionalidades avançadas e otimização para performance e usabilidade. Transforme sua presença online com soluções inteligentes que utilizam as mais recentes tecnologias de IA para oferecer experiências personalizadas e eficientes.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Vue.js</span>
                      <span class="tech-tag">Node.js</span>
                      <span class="tech-tag">MongoDB</span>
                  </div>
              </div>
          </article>

          <!-- Project Card 2 -->
          <article class="project-card">
              <div class="project-thumbnail">
                  <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                      alt="Marketing Dashboard" 
                      loading="lazy"
                      @click="openOverlay(2)"
                  >
                  <div class="project-overlay">
                      <a href="#" class="view-project" @click.prevent="openOverlay(2)">Ver Projeto</a>
                  </div>
              </div>
              <div class="project-info">
                  <span class="project-category">Design</span>
                  <h3>Marketing Dashboard</h3>
                  <p>Dashboard interativo para análise de campanhas de marketing e métricas de performance em tempo real.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Figma</span>
                      <span class="tech-tag">React</span>
                      <span class="tech-tag">D3.js</span>
                  </div>
              </div>
          </article>

          <!-- Project Card 3 -->
          <article class="project-card">
              <div class="project-thumbnail">
                  <img 
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                      alt="Marketing Dashboard" 
                      loading="lazy"
                      @click="openOverlay(3)"
                  >
                  <div class="project-overlay">
                      <a href="#" class="view-project" @click.prevent="openOverlay(3)">Ver Projeto</a>
                  </div>
              </div>
              <div class="project-info">
                  <span class="project-category">Design</span>
                  <h3>Marketing Dashboard</h3>
                  <p>Dashboard interativo para análise de campanhas de marketing e métricas de performance em tempo real.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Figma</span>
                      <span class="tech-tag">React</span>
                      <span class="tech-tag">D3.js</span>
                  </div>
              </div>
          </article>

          <!-- Project Card 4 -->
          <article class="project-card">
              <div class="project-thumbnail">
                  <img 
                      src="https://images.unsplash.com/photo-1472851294608-062f824d29cc" 
                      alt="Boutique Online" 
                      loading="lazy"
                      @click="openOverlay(4)"
                  >
                  <div class="project-overlay">
                      <a href="#" class="view-project" @click.prevent="openOverlay(4)">Ver Projeto</a>
                  </div>
              </div>
              <div class="project-info">
                  <span class="project-category">E-commerce</span>
                  <h3>Boutique Online</h3>
                  <p>E-commerce completo para uma boutique de luxo, com sistema de recomendação personalizado.</p>
                  <div class="project-tech">
                      <span class="tech-tag">Next.js</span>
                      <span class="tech-tag">Stripe</span>
                      <span class="tech-tag">PostgreSQL</span>
                  </div>
              </div>
          </article>
      </section>

      <!-- Overlay de Imagens -->
      <div class="image-overlay" v-if="isOverlayVisible" @click="closeOverlay">
          <div class="overlay-content" @click.stop>
              <button class="close-overlay" @click="closeOverlay">&times;</button>
              <div class="overlay-images">
                  <img 
                      v-for="(image, index) in overlayImages" 
                      :key="index" 
                      :src="image" 
                      :alt="'Imagem do Projeto ' + (index + 1)"
                  >
              </div>
          </div>
      </div>
  </main>    
</template>

<script> 
export default {
  name: 'ProjectSection',
  data() {
      return {
          isOverlayVisible: false,
          overlayImages: [], // Imagens do overlay
      };
  },
  methods: {
      openOverlay(projectId) {
          // Defina as imagens do overlay para cada projeto
          if (projectId === 1) {
              this.overlayImages = [
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc"
              ];
          } else if (projectId === 2) {
              this.overlayImages = [
                  "https://images.unsplash.com/photo-1726607102396-548750ce07f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
              ];
          } else if (projectId === 3) {
              this.overlayImages = [
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc"
              ];
          } else if (projectId === 4) {
              this.overlayImages = [
                  "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
                  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              ];
          }
          this.isOverlayVisible = true;
      },
      closeOverlay() {
          this.isOverlayVisible = false;
          this.overlayImages = [];
      }
  }
};
</script>

<style scoped >
/* Estilos existentes (mantidos como estavam) */
.projects-grid {
  padding: 5rem 5%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;    
  margin: 0 auto;
}

.project-card {
  background-color: rgb(204, 201, 201);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-8px);
}

.project-thumbnail {
  position: relative;
  overflow: hidden;
}

.project-thumbnail img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform 0.3s ease;
  cursor: pointer; /* Adicionado para indicar que a imagem é clicável */
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 82, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-card:hover .project-thumbnail img {
  transform: scale(1.1);
}

.view-project {
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border: 2px solid white;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.view-project:hover {
  background: white;
  color: var(--primary-color);
}

.project-info {
  padding: 2rem;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-info p {
  color: rgb(66, 66, 66);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tech-tag {
  background: rgb(204, 204, 204);
  color: black;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

/* Estilos do Overlay de Imagens */
.image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-content {
  background-color: blueviolet;
  padding: 2rem;
  border-radius: 16px;
  max-width: 90%;
  max-height: 90%;
  overflow-y: auto;
  position: relative;
}

.close-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
}

.overlay-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.overlay-images img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
}

/* Responsividade */
@media (max-width: 1200px) {
  .projects-grid {
      grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
      grid-template-columns: 1fr;
  }
}
</style>