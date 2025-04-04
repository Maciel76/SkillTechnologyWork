<template>
    <div>
  
      <!-- Hero Section. -->
      <section class="hero-section">
        <div class="container">
          <h1 class="main-title">O que nossos clientes dizem</h1>
          <p class="subtitle">Descubra por que empresas confiam em nossas soluções</p>
        </div>
      </section>
  
      <!-- Statistics Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Clientes Satisfeitos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1000+</div>
              <div class="stat-label">Projetos Entregues</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Taxa de Satisfação</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suporte Dedicado</div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section id="avaliacoes" class="avaliacoes-section">
        <div class="container">
          <div class="carousel-container">
            <div class="avaliacoes-carousel" ref="carousel">
              <div v-for="(avaliacao, index) in avaliacoes" :key="index" class="avaliacao-card">
                <div class="avaliacao-content">
                  <div class="quote-icon">
                    <img src="https://api.iconify.design/mdi:format-quote-open.svg" alt="Quote" />
                  </div>
                  <p class="avaliacao-texto" v-html="avaliacao.avaliacao"></p>
                  <div class="avaliacao-autor">
                    <img :src="avaliacao.foto" :alt="`Foto de ${avaliacao.nome}`" class="autor-foto" />
                    <div class="autor-info">
                      <h4 class="autor-nome">{{ avaliacao.nome }}</h4>
                      <p class="autor-empresa">{{ avaliacao.empresa }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-btn prev" @click="prevSlide">
              <img src="https://api.iconify.design/heroicons:chevron-left.svg" alt="Previous" />
            </button>
            <button class="carousel-btn next" @click="nextSlide">
              <img src="https://api.iconify.design/heroicons:chevron-right.svg" alt="Next" />
            </button>
          </div>
        </div>
      </section>
  
      <!-- Project Gallery Section -->
      <section class="gallery-section">
        <div class="container">
          <h2 class="section-title">Projetos dos Nossos Clientes</h2>
          <div class="gallery-grid">
            <div v-for="(project, index) in projects" :key="index" class="gallery-item" @click="openProjectModal(project)">
              <img :src="project.image" :alt="project.title" class="gallery-image" />
              <div class="gallery-overlay">
                <h3>{{ project.title }}</h3>
                <p>{{ project.shortDescription }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Project Modal -->
      <div v-if="selectedProject" class="project-modal" @click.self="closeProjectModal">
        <div class="modal-content">
          <button class="close-modal" @click="closeProjectModal">
            <img src="https://api.iconify.design/heroicons:x-mark.svg" alt="Close" />
          </button>
          <img :src="selectedProject.image" :alt="selectedProject.title" class="modal-image" />
          <h3>{{ selectedProject.title }}</h3>
          <p>{{ selectedProject.description }}</p>
          <div class="project-details">
            <div class="detail-item">
              <strong>Tecnologias:</strong>
              <span>{{ selectedProject.technologies.join(', ') }}</span>
            </div>
            <div class="detail-item">
              <strong>Cliente:</strong>
              <span>{{ selectedProject.client }}</span>
            </div>
            <a :href="selectedProject.link" target="_blank" class="project-link">Ver Projeto</a>
          </div>
        </div>
      </div>
  
      <!-- Testimonial Form Section -->
      <section class="feedback-form-section">
        <div class="container">
          <h2 class="section-title">Compartilhe sua Experiência</h2>
          <form @submit.prevent="submitFeedback" class="feedback-form">
            <div class="form-group">
              <label for="nome">Nome*</label>
              <input type="text" id="nome" v-model="formData.nome" required />
            </div>
            <div class="form-group">
              <label for="cargo">Cargo*</label>
              <input type="text" id="cargo" v-model="formData.cargo" required />
            </div>
            <div class="form-group">
              <label for="empresa">Empresa*</label>
              <input type="text" id="empresa" v-model="formData.empresa" required />
            </div>
            <div class="form-group">
              <label for="avaliacao">Seu Depoimento*</label>
              <textarea id="avaliacao" v-model="formData.avaliacao" required></textarea>
            </div>
            <div class="form-group">
              <label for="foto">Foto</label>
              <input type="file" id="foto" @change="handleFileUpload" accept="image/*" />
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              {{ isSubmitting ? 'Enviando...' : 'Enviar Depoimento' }}
            </button>
          </form>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <h2>Pronto para transformar seu negócio?</h2>
          <p>Entre em contato conosco e descubra como podemos ajudar sua empresa a crescer</p>
          <router-link to="/contato" class="cta-button">Solicitar Orçamento</router-link>
        </div>
      </section>
  
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'FeedbackView',
    components: {
    
    },
    setup() {
      const carousel = ref(null);
      const currentSlide = ref(0);
      const selectedProject = ref(null);
      const isSubmitting = ref(false);
  
      const formData = ref({
        nome: '',
        cargo: '',
        empresa: '',
        avaliacao: '',
        foto: null
      });
  
      const avaliacoes = ref([
        {
          nome: 'João Silva',
          empresa: 'CEO da Empresa X',
          avaliacao: 'A equipe da <span class="skillT">Skill Technology</span> foi incrível! Eles entenderam exatamente o que precisávamos e entregaram um site moderno e funcional.',
          foto: '/src/assets/img/image/user4.png'
        },
        {
          nome: 'Maria Souza',
          empresa: 'Fundadora da Startup Y',
          avaliacao: 'Fiquei impressionada com a atenção aos detalhes e o suporte pós-entrega. Nosso site não só ficou lindo, mas também aumentou nossas conversões.',
          foto: '/src/assets/img/image/user2.png'
        },
        {
          nome: 'Carlos Oliveira',
          empresa: 'Diretor da Empresa Z',
          avaliacao: 'Trabalhar com a <span class="skillT">Skill Technology</span> foi uma experiência incrível. Eles são rápidos, eficientes e sempre abertos a feedback.',
          foto: '/src/assets/img/image/user3.png'
        }
      ]);
  
      const projects = ref([
        {
          title: 'E-commerce Premium',
          shortDescription: 'Plataforma de vendas online',
          description: 'Desenvolvimento de uma plataforma completa de e-commerce com integração de pagamentos, gestão de estoque e análise de dados.',
          image: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          technologies: ['Vue.js', 'Node.js', 'MongoDB'],
          client: 'Fashion Store',
          link: '#'
        },
        {
          title: 'App de Delivery',
          shortDescription: 'Aplicativo mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjbm9sb2dpYXxlbnwwfHwwfHx8MA%3D%3D',
          technologies: ['React Native', 'Firebase', 'Google Maps API'],
          client: 'FastDelivery',
          link: '#'
        },
        {
          title: 'App de Delivery',
          shortDescription: 'Aplicativo mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real.',
          image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D',
          technologies: ['React Native', 'Firebase', 'Google Maps API'],
          client: 'FastDelivery',
          link: '#'
        },
        {
          title: 'App de Delivery',
          shortDescription: 'Aplicativo mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D',
          technologies: ['React Native', 'Firebase', 'Google Maps API'],
          client: 'FastDelivery',
          link: '#'
        },
        {
          title: 'App de Delivery',
          shortDescription: 'Aplicativo mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real.',
          image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXB1dGFkb3J8ZW58MHx8MHx8fDA%3D',
          technologies: ['React Native', 'Firebase', 'Google Maps API'],
          client: 'FastDelivery',
          link: '#'
        },
        {
          title: 'App de Delivery',
          shortDescription: 'Aplicativo mobile para entregas',
          description: 'Aplicativo mobile para gestão e rastreamento de entregas em tempo real.',
          image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          technologies: ['React Native', 'Firebase', 'Google Maps API'],
          client: 'FastDelivery',
          link: '#'
        },
  
      ]);
  
      const nextSlide = () => {
        currentSlide.value = (currentSlide.value + 1) % avaliacoes.value.length;
        updateCarousel();
      };
  
      const prevSlide = () => {
        currentSlide.value = (currentSlide.value - 1 + avaliacoes.value.length) % avaliacoes.value.length;
        updateCarousel();
      };
  
      const updateCarousel = () => {
        if (carousel.value) {
          carousel.value.style.transform = `translateX(-${currentSlide.value * 100}%)`;
        }
      };
  
      const openProjectModal = (project) => {
        selectedProject.value = project;
        document.body.style.overflow = 'hidden';
      };
  
      const closeProjectModal = () => {
        selectedProject.value = null;
        document.body.style.overflow = 'auto';
      };
  
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          formData.value.foto = file;
        }
      };
  
      const submitFeedback = async () => {
        try {
          isSubmitting.value = true;
          await new Promise(resolve => setTimeout(resolve, 1000));
          formData.value = {
            nome: '',
            cargo: '',
            empresa: '',
            avaliacao: '',
            foto: null
          };
          alert('Depoimento enviado com sucesso!');
        } catch (error) {
          alert('Erro ao enviar depoimento. Tente novamente.');
        } finally {
          isSubmitting.value = false;
        }
      };
  
      onMounted(() => {
        setInterval(nextSlide, 5000);
      });
  
      return {
        avaliacoes,
        projects,
        carousel,
        selectedProject,
        formData,
        isSubmitting,
        nextSlide,
        prevSlide,
        openProjectModal,
        closeProjectModal,
        handleFileUpload,
        submitFeedback
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
  
  .subtitle {
    font-size: 1.25rem;
    opacity: 0.9;
  }
  
  /* Statistics Section */
  .stats-section {
    padding: 4rem 0;
    background-color: #f8f9fa;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    text-align: center;
  }
  
  .stat-item {
    padding: 1.5rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    color: #2064bd;
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    color: #666;
    font-size: 1rem;
  }
  
  /* Testimonials Section */
  .avaliacoes-section {
    padding: 4rem 0;
    background-color: white;
  }
  
  .carousel-container {
    position: relative;
    overflow: hidden;
    padding: 2rem 0;
  }
  
  .avaliacoes-carousel {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .avaliacao-card {
    flex: 0 0 100%;
    padding: 2rem;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .quote-icon {
    color: #2064bd;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .avaliacao-texto {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1.5rem;
  }
  
  .avaliacao-autor {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .autor-foto {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .autor-info {
    display: flex;
    flex-direction: column;
  }
  
  .autor-nome {
    font-size: 1.2rem;
    color: #2064bd;
    margin: 0;
  }
  
  .autor-empresa {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
  
  .carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .carousel-btn.prev { left: 0; }
  .carousel-btn.next { right: 0; }
  
  /* Project Gallery Section */
  .gallery-section {
    padding: 4rem 0;
    background-color: #f8f9fa;
  }
  
  .section-title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 2rem;
    color: #2064bd;
  }
  
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .gallery-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover .gallery-image {
    transform: scale(1.1);
  }
  
  .gallery-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }
  
  .gallery-item:hover .gallery-overlay {
    transform: translateY(0);
  }
  
  .gallery-overlay h3 {
    font-size: 1.25rem;
    margin: 0;
  }
  
  .gallery-overlay p {
    font-size: 0.9rem;
    margin: 0.5rem 0 0;
  }
  
  /* Project Modal */
  .project-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 600px;
    width: 100%;
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
  
  .modal-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 1rem;
  }
  
  .project-details {
    margin-top: 1rem;
  }
  
  .detail-item {
    margin-bottom: 1rem;
  }
  
  .project-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #2064bd;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  
  .project-link:hover {
    background: #2064bd;
  }
  
  /* Testimonial Form Section */
  .feedback-form-section {
    padding: 4rem 0;
    background-color: white;
  }
  
  .feedback-form {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  .form-group label {
    display: block;
    font-size: 1rem;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .form-group textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  .submit-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background: #2064bd;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .submit-btn:hover:not(:disabled) {
    background: #2064bd;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 4rem 0;
    background: #2064bd;
    color: white;
    text-align: center;
  }
  
  .cta-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .cta-section p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .cta-button {
    padding: 0.75rem 2rem;
    background: white;
    color: #2064bd;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .cta-button:hover {
    background: #f0f0f0;
  }
  </style>