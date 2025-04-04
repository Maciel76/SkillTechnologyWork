<template>
    <div>
  
      <!-- Hero Section. -->
      <section class="hero-section">
        <div class="container">
          <h1 class="main-title">Nossos <span class="highlight">Projetos</span></h1>
          <p class="subtitle">Conheça alguns dos nossos projetos e cases de sucesso</p>
        </div>
      </section>
  
      <!-- Filter Section -->
      <section class="filter-section">
        <div class="container">
          <div class="filter-buttons">
            <button 
              v-for="category in categories" 
              :key="category"
              :class="['filter-btn', { active: selectedCategory === category }]"
              @click="filterByCategory(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </section>
  
      <!-- Projects Grid Section -->
      <section class="projects-section">
        <div class="container">
          <div class="projects-grid">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="project-card"
              @click="openProjectModal(project)"
            >
              <div class="project-image">
                <img :src="project.image" :alt="project.title" />
                <div class="project-overlay">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.shortDescription }}</p>
                  <div class="project-tags">
                    <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Services Gallery Section -->
      <section class="services-section">
        <div class="container">
          <h2 class="section-title">Nossos Serviços</h2>
          <div class="services-grid">
            <div 
              v-for="service in services" 
              :key="service.id"
              class="service-card"
              @click="openServiceModal(service)"
            >
              <div class="service-icon">
                <img :src="service.icon" :alt="service.title" />
              </div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.shortDescription }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">O que nossos clientes dizem</h2>
          <div class="testimonials-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
              <div class="testimonial-content">
                <div class="quote-icon">
                  <img src="https://api.iconify.design/mdi:format-quote-open.svg" alt="Quote" />
                </div>
                <p>{{ testimonial.text }}</p>
                <div class="client-info">
                  <img :src="testimonial.avatar" :alt="testimonial.name" class="client-avatar" />
                  <div>
                    <h4>{{ testimonial.name }}</h4>
                    <p>{{ testimonial.company }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Project Modal -->
      <div v-if="selectedProject" class="modal project-modal" @click.self="closeProjectModal">
        <div class="modal-content">
          <button class="close-modal" @click="closeProjectModal">
            <img src="https://api.iconify.design/heroicons:x-mark.svg" alt="Close" />
          </button>
          <div class="project-carousel">
            <img :src="selectedProject.image" :alt="selectedProject.title" />
          </div>
          <div class="project-details">
            <h2>{{ selectedProject.title }}</h2>
            <p class="project-description">{{ selectedProject.description }}</p>
            <div class="tech-stack">
              <h3>Tecnologias Utilizadas</h3>
              <div class="tech-icons">
                <div v-for="tech in selectedProject.technologies" :key="tech" class="tech-item">
                  <img :src="getTechIcon(tech)" :alt="tech" />
                  <span>{{ tech }}</span>
                </div>
              </div>
            </div>
            <a v-if="selectedProject.link" :href="selectedProject.link" target="_blank" class="project-link">
              Ver Projeto
            </a>
          </div>
        </div>
      </div>
  
      <!-- Service Modal -->
      <div v-if="selectedService" class="modal service-modal" @click.self="closeServiceModal">
        <div class="modal-content">
          <button class="close-modal" @click="closeServiceModal">
            <img src="https://api.iconify.design/heroicons:x-mark.svg" alt="Close" />
          </button>
          <div class="service-details">
            <div class="service-icon">
              <img :src="selectedService.icon" :alt="selectedService.title" />
            </div>
            <h2>{{ selectedService.title }}</h2>
            <p class="service-description">{{ selectedService.description }}</p>
            <div class="service-benefits">
              <h3>Benefícios</h3>
              <ul>
                <li v-for="benefit in selectedService.benefits" :key="benefit">{{ benefit }}</li>
              </ul>
            </div>
            <div class="success-cases">
              <h3>Cases de Sucesso</h3>
              <div class="cases-grid">
                <div v-for="serviceCase in selectedService.cases" :key="serviceCase.id" class="case-card">
                  <img :src="serviceCase.image" :alt="serviceCase.title" />
                  <h4>{{ serviceCase.title }}</h4>
                  <p>{{ serviceCase.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Floating CTA Button -->
      <button class="floating-cta" @click="scrollToContact">
        Solicitar Orçamento
      </button>
  
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    name: 'PortifolioView',
    components: {
      
    },
    setup() {
      const selectedCategory = ref('Todos');
      const selectedProject = ref(null);
      const selectedService = ref(null);
  
      const categories = ['Todos', 'WebSite', 'Aplicativo', 'E-commerce', 'UI/UX'];
  
      const projects = ref([
        {
          id: 1,
          title: 'E-commerce Premium',
          shortDescription: 'Plataforma de vendas online completa',
          description: 'Desenvolvimento de uma plataforma completa de e-commerce com integração de pagamentos, gestão de estoque e análise de dados em tempo real.',
          image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          tags: ['E-commerce', 'WebSite'],
          technologies: ['Vue.js', 'Node.js', 'MongoDB'],
          link: '#'
        },
        {
          id: 2,
          title: 'Aplicativo de Delivery',
          shortDescription: 'App mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real com interface intuitiva.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjbm9sb2dpYXxlbnwwfHwwfHx8MA%3D%3D',
          tags: ['Aplicativo', 'UI/UX'], //adiciona a categoria 
          technologies: ['React Native', 'Firebase'],
          link: '#'
        },{
          id: 2,
          title: 'Aplicativo de Agendamentos',
          shortDescription: 'App mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real com interface intuitiva.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjbm9sb2dpYXxlbnwwfHwwfHx8MA%3D%3D',
          tags: ['Mobile', 'UI/UX'],
          technologies: ['React Native', 'Firebase'],
          link: '#'
        },
      ]);
  
      const services = ref([
        {
          id: 1,
          title: 'Desenvolvimento Web',
          shortDescription: 'Websites e aplicações web modernas',
          description: 'Criamos websites e aplicações web responsivas, rápidas e otimizadas para SEO.',
          icon: 'https://api.iconify.design/heroicons:computer-desktop.svg',
          benefits: [
            'Design responsivo para todos os dispositivos',
            'Otimização para mecanismos de busca',
            'Alta performance e velocidade de carregamento',
            'Integrado com Ai e Machine Learning'
          ],
          cases: [
            {
              id: 1,
              title: 'E-commerce Fashion',
              description: 'Aumento de 150% nas vendas online',
              image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D'
            }
          ]
        },
        {
          id: 2,
          title: 'Lojas Virtuais & E-commerce',
          shortDescription: 'Websites e aplicações web modernas',
          description: 'Criamos websites e aplicações web responsivas, rápidas e otimizadas para SEO.',
          icon: 'https://api.iconify.design/heroicons:computer-desktop.svg',
          benefits: [
            'Design responsivo para todos os dispositivos',
            'Otimização para mecanismos de busca',
            'Alta performance e velocidade de carregamento',
            'Integrado com Ai e Machine Learning'
          ],
          cases: [
            {
              id: 2,
              title: 'E-commerce Fashion',
              description: 'Aumento de 150% nas vendas online',
              image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D'
            }
          ]
        },
        {
          id: 3,
          title: 'Desenvolvimento Mobile',
          shortDescription: 'Aplicativos iOS e Android',
          description: 'Desenvolvemos aplicativos nativos e híbridos para iOS e Android.',
          icon: 'https://api.iconify.design/heroicons:device-phone-mobile.svg',
          benefits: [
            'Interface intuitiva e moderna',
            'Integração com APIs e serviços',
            'Suporte a recursos nativos dos dispositivos'
          ],
          cases: [
            {
              id: 3,
              title: 'App de Delivery',
              description: 'Mais de 10.000 downloads na primeira semana',
              image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D'
            }
          ]
        },
        
      ]);
  
      const testimonials = ref([
        {
          id: 1,
          text: 'A equipe entendeu perfeitamente nossas necessidades e entregou um produto excepcional.',
          name: 'João Silva',
          company: 'Tech Solutions',
          avatar: '@/assets/images/avatars/user1.png'
        },
        {
          id: 2,
          text: 'O suporte e dedicação da equipe foram fundamentais para o sucesso do projeto.',
          name: 'Maria Santos',
          company: 'Digital Innovation',
          avatar: '/src/assets/img/image/user4.png'
        }
      ]);
  
      const filteredProjects = computed(() => {
        if (selectedCategory.value === 'Todos') return projects.value;
        return projects.value.filter(project => 
          project.tags.includes(selectedCategory.value)
        );
      });
  
      const filterByCategory = (category) => {
        selectedCategory.value = category;
      };
  
      const openProjectModal = (project) => {
        selectedProject.value = project;
        document.body.style.overflow = 'hidden';
      };
  
      const closeProjectModal = () => {
        selectedProject.value = null;
        document.body.style.overflow = 'auto';
      };
  
      const openServiceModal = (service) => {
        selectedService.value = service;
        document.body.style.overflow = 'hidden';
      };
  
      const closeServiceModal = () => {
        selectedService.value = null;
        document.body.style.overflow = 'auto';
      };
  
      const getTechIcon = (tech) => {
        const techIcons = {
          'Vue.js': 'https://api.iconify.design/logos:vue.svg',
          'React Native': 'https://api.iconify.design/logos:react.svg',
          'Node.js': 'https://api.iconify.design/logos:nodejs.svg',
          'MongoDB': 'https://api.iconify.design/logos:mongodb.svg',
          'Firebase': 'https://api.iconify.design/logos:firebase.svg'
        };
        return techIcons[tech] || 'https://api.iconify.design/heroicons:code-bracket.svg';
      };
  
      const scrollToContact = () => {
        window.location.href = '/contato';
      };
  
      return {
        categories,
        selectedCategory,
        projects,
        services,
        testimonials,
        selectedProject,
        selectedService,
        filteredProjects,
        filterByCategory,
        openProjectModal,
        closeProjectModal,
        openServiceModal,
        closeServiceModal,
        getTechIcon,
        scrollToContact
      };
    }
  };
  </script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Hero Section  */
.hero-section {
  background: #2064bd;
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.main-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.highlight {
  color: #ffd700;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  text-transform: capitalize;
}

/* Filter Section */
.filter-section {
  padding: 2rem 0;
  background: #f8f9fa;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1.5rem;
  border: 2px solid #2064bd;
  border-radius: 25px;
  background: transparent;
  color: #2064bd;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
  background: #2064bd;
  color: white;
}

/* Projects Grid Section */
.projects-section {
  padding: 4rem 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.project-image {
  position: relative;
  aspect-ratio: 16/9;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(32, 100, 189, 0.9);
  color: white;
  padding: 1.5rem;
  opacity: 0;
  transform: translateY(100%);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.project-card:hover .project-overlay {
  opacity: 1;
  transform: translateY(0);
}

.project-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.project-tags {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 0.875rem;
}

/* Services Section */
.services-section {
  padding: 4rem 0;
  background: #f8f9fa;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #2064bd;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
}

.service-icon img {
  width: 100%;
  height: 100%;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.quote-icon {
  color: #2064bd;
  margin-bottom: 1rem;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.client-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

/* Project Modal Specific */
.project-carousel img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1.5rem;
}

.tech-stack {
  margin-top: 2rem;
}

.tech-icons {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-item img {
  width: 24px;
  height: 24px;
}

/* Service Modal Specific */
.service-benefits ul {
  list-style-type: none;
  padding: 0;
}

.service-benefits li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.service-benefits li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #2064bd;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.case-card {
  text-align: center;
}

.case-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 1rem;
}

/* Floating CTA Button */
.floating-cta {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem 2rem;
  background: #2064bd;
  color: white;
  border: none;
  border-radius: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.floating-cta:hover {
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .projects-grid,
  .services-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 1rem;
  }

  .floating-cta {
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>