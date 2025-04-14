<template>
  <div class="portfolio-view">
    <!-- Hero Section com Slider -->
    <section class="hero">
      <div class="slider-container">
        <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            class="slide" 
            v-for="(project, index) in featuredProjects" 
            :key="'slide-' + index"
            :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${project.image})` }"
          >
            <div class="slide-content">
              <h1>{{ project.name }}</h1>
              <p>{{ project.description }}</p>
              <div class="tags">
                <span v-for="(tag, i) in project.tags" :key="'tag-' + i">{{ tag }}</span>
              </div>
              <button class="cta-button" @click="openProject(project.id)">Ver Detalhes</button>
            </div>
          </div>
        </div>
        <button class="slider-nav prev" @click="prevSlide">‹</button>
        <button class="slider-nav next" @click="nextSlide">›</button>
        <div class="slider-dots">
          <span 
            v-for="(dot, index) in featuredProjects.length" 
            :key="'dot-' + index"
            :class="{ active: currentSlide === index }"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
    </section>

    <!-- Sobre a Agência -->
    <section class="about-section">
      <div class="about-content">
        <h2>Creative<span>Dev</span>Studio</h2>
        <p>"Somos uma agência especializada em desenvolvimento web, criação de sistemas personalizados, lojas virtuais e sites institucionais. Utilizamos as tecnologias mais modernas para garantir alta performance e integramos as inteligências artificiais mais avançadas ao seu site para elevar a experiência do usuário, automatizar processos e impulsionar resultados."</p>
        <div class="stats">
          <div class="stat-item">
            <span class="number">150+</span>
            <span class="label">Projetos Entregues</span>
          </div>
          <div class="stat-item">
            <span class="number">98%</span>
            <span class="label">Satisfação do Cliente</span>
          </div>
          <div class="stat-item">
            <span class="number">5+</span>
            <span class="label">Anos de Experiência</span>
          </div>
        </div>
      </div>
      <div class="about-image"></div>
    </section>

    <!-- Nossos Serviços -->
    <section class="services-section">
      <h2 class="section-title">Nossos <span>Serviços</span></h2>
      <div class="services-grid">
        <div 
          class="service-card" 
          v-for="(service, index) in services" 
          :key="'service-' + index"
          @mouseenter="hoverService(index)"
          @mouseleave="hoverService(null)"
          :class="{ hovered: hoveredService === index }"
        >
          <div class="service-icon" :style="{ backgroundColor: service.color }">
            {{ service.icon }}
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <ul class="service-features">
            <li v-for="(feature, i) in service.features" :key="'feature-' + i">{{ feature }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Portfólio de Projetos -->
    <section class="portfolio-section">
      <h2 class="section-title">Nosso <span>Portfólio</span></h2>
      <div class="portfolio-filters">
        <button 
          v-for="(filter, index) in filters" 
          :key="'filter-' + index"
          @click="setFilter(filter)"
          :class="{ active: activeFilter === filter }"
        >
          {{ filter }}
        </button>
      </div>
      <div class="portfolio-grid">
        <div 
          class="portfolio-item" 
          v-for="(project, index) in filteredProjects" 
          :key="'project-' + index"
          @click="openProject(project.id)"
          :style="{ backgroundImage: `url(${project.thumbnail})` }"
        >
          <div class="project-overlay">
            <h3>{{ project.name }}</h3>
            <p>{{ project.type }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulário de Contato -->
    <section class="contact-section">
      <h2 class="section-title">Vamos <span>Conversar</span></h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input type="text" v-model="form.name" placeholder="Seu Nome" required>
        </div>
        <div class="form-group">
          <input type="email" v-model="form.email" placeholder="Seu Email" required>
        </div>
        <div class="form-group">
          <select v-model="form.service" required>
            <option value="" disabled selected>Selecione um serviço</option>
            <option v-for="(service, index) in services" :key="'option-' + index" :value="service.title">
              {{ service.title }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <textarea v-model="form.message" placeholder="Conte-nos sobre seu projeto..." required></textarea>
        </div>
        <button type="submit" class="submit-btn">Enviar Mensagem</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'PortfolioView',
  data() {
    return {
      currentSlide: 0,
      hoveredService: null,
      activeFilter: 'Todos',
      form: {
        name: '',
        email: '',
        service: '',
        message: ''
      },
      filters: ['Todos', 'Web', 'Mobile', 'E-commerce', 'Design'],
      featuredProjects: [
        {
          id: 1,
          name: 'Loja Virtual Moderna',
          description: 'E-commerce completo com integração de pagamentos e gestão de estoque.',
          image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['Vue.js', 'Node.js', 'MongoDB', 'UI/UX']
        },
        {
          id: 2,
          name: 'Aplicativo de Edição de Fotos',
          description: 'Editor de imagens com IA para ajustes automáticos e filtros personalizados.',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['React Native', 'Python', 'Machine Learning']
        },
        {
          id: 3,
          name: 'Portal Corporativo',
          description: 'Sistema completo para gestão de conteúdo e comunicação empresarial.',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['Nuxt.js', 'WordPress', 'API REST']
        }
      ],
      services: [
        {
          title: 'Desenvolvimento Web',
          description: 'Sites modernos e sistemas web personalizados com as melhores tecnologias.',
          icon: '💻',
          color: '#4e6bff',
          features: [
            'Sites institucionais',
            'Landing Pages',
            'Sistemas web completos',
            'Blogs personalizados'
          ]
        },
        {
          title: 'E-commerce',
          description: 'Lojas virtuais completas com integração de pagamentos e gestão de produtos.',
          icon: '🛒',
          color: '#ff6b4e',
          features: [
            'Integração com gateways',
            'Gestão de estoque',
            'Checkout otimizado',
            'Relatórios de vendas'
          ]
        },
        {
          title: 'Aplicativos Mobile',
          description: 'Aplicativos nativos e híbridos para iOS e Android com ótima performance.',
          icon: '📱',
          color: '#6bff4e',
          features: [
            'Apps nativos (Swift/Kotlin)',
            'Apps híbridos (React Native/Flutter)',
            'Integração com APIs',
            'Publicação nas lojas'
          ]
        },
        {
          title: 'Edição de Imagens',
          description: 'Manipulação e tratamento profissional de imagens para seus projetos.',
          icon: '🎨',
          color: '#ff4e6b',
          features: [
            'Retoque fotográfico',
            'Montagens criativas',
            'Design de banners',
            'Imagens para redes sociais'
          ]
        }
      ],
      projects: [
        {
          id: 1,
          name: 'Loja de Moda Online',
          type: 'E-commerce',
          thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['web', 'ecommerce']
        },
        {
          id: 2,
          name: 'App de Fitness',
          type: 'Mobile',
          thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['mobile']
        },
        {
          id: 3,
          name: 'Site Corporativo',
          type: 'Web',
          thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['web']
        },
        {
          id: 4,
          name: 'Editor de Fotos AI',
          type: 'Design',
          thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['design']
        },
        {
          id: 5,
          name: 'Blog de Tecnologia',
          type: 'Web',
          thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['web']
        },
        {
          id: 6,
          name: 'Dashboard Analytics',
          type: 'Web',
          thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          tags: ['web']
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'Todos') return this.projects;
      return this.projects.filter(project => 
        project.tags.includes(this.activeFilter.toLowerCase())
      );
    }
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.featuredProjects.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.featuredProjects.length) % this.featuredProjects.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
    hoverService(index) {
      this.hoveredService = index;
    },
    setFilter(filter) {
      this.activeFilter = filter;
    },
    openProject(id) {
      console.log('Abrindo projeto:', id);
    },
    submitForm() {
      console.log('Formulário enviado:', this.form);
      alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      this.form = {
        name: '',
        email: '',
        service: '',
        message: ''
      };
    }
  },
  mounted() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
  }
}
</script>

<style scoped>
/* Estilos do Hero Section */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  color: white;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
}

.slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: center;
  padding: 0 10%;
}

.slide-content {
  max-width: 600px;
}

.slide-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slide-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tags span {
  background: rgba(255,255,255,0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.cta-button {
  background: #4e6bff;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #3a56e0;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
}

.slider-nav:hover {
  background: rgba(255,255,255,0.4);
}

.prev {
  left: 2rem;
}

.next {
  right: 2rem;
}

.slider-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.slider-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dots span.active {
  background: white;
  transform: scale(1.2);
}

/* Estilos da seção Sobre */
.about-section {
  display: flex;
  padding: 5rem 10%;
  background: #f9f9f9;
}

.about-content {
  flex: 1;
  padding-right: 3rem;
}

.about-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.about-content h2 span {
  color: #4e6bff;
}

.about-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #555;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #4e6bff;
}

.label {
  font-size: 0.9rem;
  color: #777;
}

.about-image {
  flex: 1;
  background-image: url('https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

/* Estilos da seção de Serviços */
.services-section {
  padding: 5rem 10%;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.section-title span {
  color: #4e6bff;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.service-card.hovered {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border-color: #4e6bff;
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: white;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.service-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
}

.service-features li {
  padding: 0.5rem 0;
  color: #555;
  position: relative;
  padding-left: 1.5rem;
}

.service-features li:before {
  content: '✓';
  color: #4e6bff;
  position: absolute;
  left: 0;
}

/* Estilos da seção de Portfólio */
.portfolio-section {
  padding: 5rem 10%;
  background: #f9f9f9;
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.portfolio-filters button {
  background: white;
  border: 1px solid #ddd;
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.portfolio-filters button.active {
  background: #4e6bff;
  color: white;
  border-color: #4e6bff;
}

.portfolio-filters button:hover {
  border-color: #4e6bff;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.portfolio-item {
  aspect-ratio: 4/3;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.portfolio-item:hover {
  transform: scale(1.03);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.project-overlay {
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  background: rgba(78, 107, 255, 0.9);
  color: white;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.portfolio-item:hover .project-overlay {
  bottom: 0;
}

.project-overlay h3 {
  margin-bottom: 0.5rem;
}

/* Estilos da seção de Contato */
.contact-section {
  padding: 5rem 10%;
  background: white;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
  background: #f9f9f9;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #4e6bff;
  outline: none;
  box-shadow: 0 0 0 3px rgba(78, 107, 255, 0.2);
}

.form-group textarea {
  min-height: 150px;
  resize: vertical;
}

.submit-btn {
  background: #4e6bff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-btn:hover {
  background: #3a56e0;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
</style>