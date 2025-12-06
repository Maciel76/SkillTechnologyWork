<template>
  <section class="mobile-portfolio-section">
    <div class="container">
      <div class="section-header">
        <h2>Portfólio de <span class="highlight">Aplicativos</span></h2>
        <p class="section-subtitle">Projetos que transformaram negócios através de soluções mobile</p>
      </div>

      <!-- Filters -->
      <div class="portfolio-filters">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="filterPortfolio(filter.id)"
          :class="{ active: activeFilter === filter.id }"
        >
          {{ filter.name }}
        </button>
      </div>

      <!-- Portfolio Grid -->
      <div class="portfolio-grid">
        <div 
          v-for="project in filteredProjects" 
          :key="project.id"
          class="portfolio-item"
          @mouseenter="hoveredProject = project.id"
          @mouseleave="hoveredProject = null"
        >
          <div class="app-mockup">
            <!-- Phone frame with app screen -->
            <div class="phone-frame">
              <div class="phone-notch"></div>
              <div class="screen">
                <div class="app-screenshot" :style="{ backgroundImage: `url(${project.screenshot})` }"></div>
                <div class="screen-overlay" v-if="hoveredProject === project.id">
                  <button class="view-details-btn" @click="openProjectModal(project)">
                    Ver Detalhes
                  </button>
                </div>
              </div>
              <div class="phone-buttons"></div>
            </div>
            
            <!-- App Info -->
            <div class="app-info">
              <h3>{{ project.name }}</h3>
              <p class="app-category">{{ project.category }}</p>
              <div class="app-stats">
                <span class="downloads">{{ project.downloads }} downloads</span>
                <span class="rating">★ {{ project.rating }}</span>
              </div>
            </div>
          </div>
          
          <!-- Tech Stack -->
          <div class="tech-stack">
            <span v-for="tech in project.tech" :key="tech" class="tech-badge">{{ tech }}</span>
          </div>
          
          <!-- Store Badges -->
          <div class="store-badges">
            <a :href="project.appStore" target="_blank" class="store-badge app-store">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store">
            </a>
            <a :href="project.playStore" target="_blank" class="store-badge google-play">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play">
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div class="modal-overlay" v-if="modalOpen" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="closeModal">×</button>
        <div class="modal-body">
          <div class="modal-screenshot">
            <img :src="selectedProject.screenshot" :alt="selectedProject.name">
          </div>
          <div class="modal-details">
            <h2>{{ selectedProject.name }}</h2>
            <p class="app-category">{{ selectedProject.category }}</p>
            
            <div class="app-stats-modal">
              <div class="stat">
                <span class="value">{{ selectedProject.downloads }}</span>
                <span class="label">Downloads</span>
              </div>
              <div class="stat">
                <span class="value">{{ selectedProject.rating }}</span>
                <span class="label">Avaliação</span>
              </div>
              <div class="stat">
                <span class="value">{{ selectedProject.platforms.join(', ') }}</span>
                <span class="label">Plataformas</span>
              </div>
            </div>
            
            <p class="app-description">{{ selectedProject.description }}</p>
            
            <div class="features-section">
              <h3>Principais Funcionalidades</h3>
              <ul>
                <li v-for="(feature, index) in selectedProject.features" :key="index">{{ feature }}</li>
              </ul>
            </div>
            
            <div class="tech-section">
              <h3>Tecnologias Utilizadas</h3>
              <div class="tech-badges">
                <span v-for="(tech, index) in selectedProject.tech" :key="index" class="tech-badge-modal">{{ tech }}</span>
              </div>
            </div>
            
            <div class="modal-store-badges">
              <a :href="selectedProject.appStore" target="_blank" class="store-badge app-store">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store">
              </a>
              <a :href="selectedProject.playStore" target="_blank" class="store-badge google-play">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PortfolioAplicativo',
  data() {
    return {
      activeFilter: 'all',
      hoveredProject: null,
      modalOpen: false,
      selectedProject: {},
      filters: [
        { id: 'all', name: 'Todos' },
        { id: 'finance', name: 'Finanças' },
        { id: 'health', name: 'Saúde' },
        { id: 'ecommerce', name: 'E-commerce' },
        { id: 'social', name: 'Social' },
        { id: 'productivity', name: 'Produtividade' },
        { id: 'education', name: 'Educação' }
      ],
      portfolioItems: [
        {
          id: 1,
          name: 'FinanX',
          category: 'Finanças',
          description: 'Aplicativo revolucionário de gestão financeira pessoal que ajuda usuários a controlarem seus gastos, investimentos e metas financeiras com uma interface simples e poderosa.',
          screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '1.2M+',
          rating: '4.8',
          platforms: ['iOS', 'Android'],
          features: [
            'Sincronização automática com bancos',
            'Análise de gastos por categorias',
            'Metas financeiras personalizadas',
            'Relatórios detalhados exportáveis',
            'Alertas de gastos excessivos'
          ],
          tech: ['Flutter', 'Firebase', 'Node.js'],
          appStore: '#',
          playStore: '#'
        },
        {
          id: 2,
          name: 'HealthTrack',
          category: 'Saúde',
          description: 'Solução completa para monitoramento de saúde que integra dados de wearables, permite registro de medicamentos, consultas e oferece insights personalizados sobre bem-estar.',
          screenshot: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '850K+',
          rating: '4.9',
          platforms: ['iOS', 'Android'],
          features: [
            'Integração com Apple Health e Google Fit',
            'Lembretes de medicamentos',
            'Acompanhamento de sintomas',
            'Telemedicina integrada',
            'Relatórios para compartilhar com médicos'
          ],
          tech: ['React Native', 'Redux', 'MongoDB'],
          appStore: '#',
          playStore: '#'
        },
        {
          id: 3,
          name: 'FoodExpress',
          category: 'E-commerce',
          description: 'Plataforma de delivery premium que conecta usuários a restaurantes gourmet e chefs particulares, com opções de menu personalizadas e entrega rápida.',
          screenshot: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '2.5M+',
          rating: '4.7',
          platforms: ['iOS', 'Android'],
          features: [
            'Busca por tipo de culinária e dieta',
            'Pedidos em grupo',
            'Acompanhamento em tempo real',
            'Pagamentos integrados',
            'Programa de fidelidade'
          ],
          tech: ['Swift', 'Kotlin', 'Firebase'],
          appStore: '#',
          playStore: '#'
        },
        {
          id: 4,
          name: 'SocialHub',
          category: 'Social',
          description: 'Rede social focada em conectar comunidades locais, com ferramentas para eventos, classificados e discussões de bairro.',
          screenshot: 'https://images.unsplash.com/photo-1611162617213-6d7a11842c44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '500K+',
          rating: '4.5',
          platforms: ['iOS', 'Android'],
          features: [
            'Feed comunitário geolocalizado',
            'Criação de eventos locais',
            'Classificados por proximidade',
            'Chat de grupo e vídeo chamadas',
            'Moderação colaborativa'
          ],
          tech: ['Flutter', 'Firebase', 'WebRTC'],
          appStore: '#',
          playStore: '#'
        },
        {
          id: 5,
          name: 'TaskFlow',
          category: 'Produtividade',
          description: 'Ferramenta de produtividade para times que combina gestão de tarefas, comunicação e acompanhamento de métricas em uma única plataforma.',
          screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '300K+',
          rating: '4.6',
          platforms: ['iOS', 'Android'],
          features: [
            'Quadros Kanban personalizáveis',
            'Tarefas com subtarefas e checklists',
            'Relatórios de produtividade',
            'Integração com calendário',
            'Modo offline completo'
          ],
          tech: ['React Native', 'GraphQL', 'DynamoDB'],
          appStore: '#',
          playStore: '#'
        },
        {
          id: 6,
          name: 'Learnify',
          category: 'Educação',
          description: 'Plataforma de aprendizagem adaptativa que usa inteligência artificial para personalizar o conteúdo educacional conforme o progresso do aluno.',
          screenshot: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
          downloads: '1.8M+',
          rating: '4.9',
          platforms: ['iOS', 'Android'],
          features: [
            'Cursos em microlearning',
            'Testes adaptativos',
            'Recomendações personalizadas',
            'Modo foco sem distrações',
            'Relatórios de progresso detalhados'
          ],
          tech: ['SwiftUI', 'Kotlin', 'TensorFlow Lite'],
          appStore: '#',
          playStore: '#'
        }
      ],
      filteredProjects: []
    };
  },
  methods: {
    filterPortfolio(category) {
      this.activeFilter = category;
      if (category === 'all') {
        this.filteredProjects = this.portfolioItems;
      } else {
        this.filteredProjects = this.portfolioItems.filter(
          project => project.category.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase() === project.category.toLowerCase()
        );
      }
    },
    openProjectModal(project) {
      this.selectedProject = project;
      this.modalOpen = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.modalOpen = false;
      document.body.style.overflow = 'auto';
    }
  },
  mounted() {
    this.filteredProjects = this.portfolioItems;
  }
};
</script>

<style scoped>
.mobile-portfolio-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
  color: #1e293b;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlight {
  position: relative;
}

.section-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.portfolio-filters button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: #64748b;
}

.portfolio-filters button:hover,
.portfolio-filters button.active {
  background: #4361ee;
  color: white;
  border-color: #4361ee;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(67, 97, 238, 0.2);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3rem;
  padding: 0 1rem;
}

.portfolio-item {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.portfolio-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(67, 97, 238, 0.2);
}

.app-mockup {
  padding: 2rem;
}

.phone-frame {
  width: 200px;
  height: 420px;
  margin: 0 auto 1.5rem;
  background: #1e293b;
  border-radius: 40px;
  position: relative;
  padding: 15px;
  box-shadow: 0 20px 40px rgba(30, 41, 59, 0.3);
}

.phone-notch {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 20px;
  background: #1e293b;
  border-radius: 0 0 20px 20px;
}

.screen {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
}

.app-screenshot {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.screen-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(67, 97, 238, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .screen-overlay {
  opacity: 1;
}

.view-details-btn {
  background: white;
  color: #4361ee;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-details-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3);
}

.app-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.app-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.app-category {
  color: #4361ee;
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
}

.app-stats {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

.downloads, .rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.tech-stack {
  padding: 0 2rem;
  margin-bottom: 1.5rem;
}

.tech-badge {
  background: #e0f2fe;
  color: #0284c7;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  display: inline-block;
}

.store-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem 2rem;
}

.store-badge img {
  height: 40px;
  transition: transform 0.3s ease;
}

.store-badge:hover img {
  transform: scale(1.05);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 1000px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.close-modal {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: #1e293b;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: #4361ee;
  transform: rotate(90deg);
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.modal-screenshot {
  flex: 1;
}

.modal-screenshot img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.modal-details {
  padding: 2rem;
  flex: 1;
}

.modal-details h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.modal-details .app-category {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.app-stats-modal {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.stat {
  text-align: center;
}

.stat .value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #4361ee;
}

.stat .label {
  font-size: 0.9rem;
  color: #64748b;
}

.app-description {
  font-size: 1.1rem;
  color: #475569;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.features-section h3,
.tech-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.features-section ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features-section li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  color: #475569;
}

.features-section li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge-modal {
  background: #e0f2fe;
  color: #0284c7;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.modal-store-badges {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.modal-store-badges .store-badge img {
  height: 50px;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .mobile-portfolio-section {
    padding: 4rem 1.5rem;
  }
  
  .portfolio-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
  
  .modal-body {
    flex-direction: column;
  }
  
  .modal-screenshot img {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2.5rem;
  }
  
  .portfolio-filters {
    gap: 0.5rem;
  }
  
  .portfolio-filters button {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .app-stats {
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
  }
  
  .modal-content {
    width: 95%;
  }
  
  .modal-screenshot img {
    height: 250px;
  }
  
  .app-stats-modal {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-store-badges {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .mobile-portfolio-section {
    padding: 3rem 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .phone-frame {
    width: 160px;
    height: 340px;
  }
}
</style>