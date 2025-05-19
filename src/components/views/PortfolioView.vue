<template>
  <div class="portfolio-premium">
    <!-- Hero Section com Projeto Destaque -->
    <section class="hero-showcase">
      <div class="showcase-container">
        <div class="showcase-content">
          <h1 class="showcase-title">
            Transformamos ideias em
            <span>experiências digitais</span> memoráveis
          </h1>
          <p class="showcase-description">
            Explore nosso portfólio de projetos criados com paixão e expertise
            técnica
          </p>
          <div class="showcase-stats">
            <div class="stat-item">
              <div class="stat-number">150+</div>
              <div class="stat-label">Projetos entregues</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Clientes satisfeitos</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">5+</div>
              <div class="stat-label">Anos de experiência</div>
            </div>
          </div>
        </div>
        <div class="showcase-project">
          <div
            class="project-preview"
            :style="{
              backgroundImage: `url(${featuredProjects[0].images[0]})`,
            }"
          >
            <div class="project-overlay">
              <h3>{{ featuredProjects[0].name }}</h3>
              <p>{{ featuredProjects[0].description }}</p>
              <button
                class="explore-btn"
                @click="openProject(featuredProjects[0].id)"
              >
                Explorar Projeto
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Scroll Down</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- Seção de Projetos em Destaque -->
    <section class="featured-projects">
      <div class="section-header">
        <h2>Projetos <span>Destaque</span></h2>
        <p>
          Alguns dos nossos trabalhos mais impressionantes que criamos para
          clientes ao redor do mundo
        </p>
      </div>

      <div class="projects-grid">
        <div
          class="project-card"
          v-for="(project, index) in featuredProjects"
          :key="'project-' + index"
          :class="`project-${index + 1}`"
        >
          <div class="project-media">
            <img
              :src="project.images[0]"
              :alt="project.name"
              class="project-image"
            />
            <div
              class="project-badge"
              :style="{ backgroundColor: project.accentColor }"
            >
              {{ project.category }}
            </div>
          </div>
          <div class="project-details">
            <h3>{{ project.name }}</h3>
            <p class="project-excerpt">{{ project.excerpt }}</p>
            <div class="project-meta">
              <div class="client-info">
                <div
                  class="client-logo"
                  :style="{ backgroundImage: `url(${project.client.logo})` }"
                ></div>
                <span>{{ project.client.name }}</span>
              </div>
              <div class="project-year">{{ project.year }}</div>
            </div>
            <button class="view-project" @click="openProject(project.id)">
              Ver Caso de Estudo
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Todos os Projetos -->
    <section class="all-projects">
      <div class="section-header">
        <h2>Nosso <span>Portfólio</span> Completo</h2>
        <p>
          Explore nossa coleção completa de projetos criados com excelência e
          atenção aos detalhes
        </p>
      </div>

      <div class="projects-mosaic">
        <div
          class="mosaic-item"
          v-for="(project, index) in allProjects"
          :key="'mosaic-' + index"
          :class="`size-${project.size}`"
          @click="openProject(project.id)"
        >
          <div
            class="mosaic-image"
            :style="{ backgroundImage: `url(${project.thumbnail})` }"
          >
            <div class="mosaic-overlay">
              <h3>{{ project.name }}</h3>
              <p>{{ project.category }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Reconhecimentos -->
    <section class="testimonials">
      <div class="section-header">
        <h2>O que nossos <span>clientes</span> dizem</h2>
        <p>Depoimentos de parceiros que confiaram em nosso trabalho</p>
      </div>

      <div class="testimonials-slider">
        <div
          class="slider-track"
          :style="{ transform: `translateX(-${testimonialPosition}%)` }"
        >
          <div
            class="testimonial-card"
            v-for="(testimonial, index) in testimonials"
            :key="'testimonial-' + index"
          >
            <div class="testimonial-content">
              <div class="quote-icon">“</div>
              <p>{{ testimonial.content }}</p>
            </div>
            <div class="testimonial-author">
              <div
                class="author-avatar"
                :style="{ backgroundImage: `url(${testimonial.avatar})` }"
              ></div>
              <div class="author-info">
                <strong>{{ testimonial.name }}</strong>
                <span
                  >{{ testimonial.position }}, {{ testimonial.company }}</span
                >
              </div>
            </div>
          </div>
        </div>
        <button class="slider-nav prev" @click="prevTestimonial">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button class="slider-nav next" @click="nextTestimonial">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- Seção de Chamada para Ação -->
    <section class="cta-section">
      <div class="cta-container">
        <div class="cta-content">
          <h2>Pronto para transformar sua visão em realidade?</h2>
          <p>
            Vamos criar algo extraordinário juntos. Nossa equipe está pronta
            para levar seu projeto ao próximo nível.
          </p>
          <router-link to="/contato" class="router-link">
            <button class="cta-button" @click="openContact">
              Inicie seu projeto agora
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </router-link>
        </div>
        <div class="cta-image"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PortfolioPremium",
  data() {
    return {
      testimonialPosition: 0,
      currentTestimonial: 0,
      featuredProjects: [
        {
          id: 1,
          name: "Plataforma de Educação Digital",
          description:
            "Uma solução completa de e-learning com aulas ao vivo, conteúdo interativo e acompanhamento de progresso.",
          excerpt:
            "Revolucionando a educação online com tecnologia de ponta e experiência do usuário excepcional.",
          category: "Web App",
          year: "2023",
          accentColor: "#6C5CE7",
          images: [
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          client: {
            name: "EduTech Solutions",
            logo: "https://via.placeholder.com/80",
          },
          challenge:
            "Criar uma plataforma que superasse as limitações dos sistemas de e-learning tradicionais.",
          solution:
            "Desenvolvemos uma solução personalizada com vídeos interativos, quizzes em tempo real e relatórios detalhados.",
          results:
            "Aumento de 300% no engajamento dos alunos e redução de 40% na taxa de desistência.",
        },
        {
          id: 2,
          name: "Marketplace de Arte Digital",
          description:
            "Plataforma para artistas venderem suas criações digitais com segurança e facilidade.",
          excerpt:
            "Conectando artistas digitais com colecionadores em um mercado global.",
          category: "E-commerce",
          year: "2022",
          accentColor: "#00B894",
          images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          client: {
            name: "ArtChain",
            logo: "https://via.placeholder.com/80",
          },
          challenge:
            "Criar um mercado justo para arte digital com proteção contra cópias não autorizadas.",
          solution:
            "Implementamos um sistema de certificação blockchain para autenticar obras originais.",
          results:
            "Mais de 10.000 artistas cadastrados e $2M em vendas no primeiro ano.",
        },
        {
          id: 3,
          name: "App de Bem-Estar Corporativo",
          description:
            "Aplicativo móvel para promover saúde mental e física no ambiente de trabalho.",
          excerpt:
            "Transformando a cultura corporativa através do bem-estar digital.",
          category: "Mobile App",
          year: "2023",
          accentColor: "#FD79A8",
          images: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          client: {
            name: "WellCorp",
            logo: "https://via.placeholder.com/80",
          },
          challenge:
            "Reduzir o estresse e aumentar a produtividade em grandes corporações.",
          solution:
            "Criamos um app com meditações guiadas, desafios de saúde e métricas personalizadas.",
          results:
            "Aumento de 25% na satisfação dos funcionários nas empresas que adotaram a solução.",
        },
      ],
      allProjects: [
        {
          id: 4,
          name: "Sistema de Gestão Hospitalar",
          category: "Sistema Web",
          thumbnail:
            "https://images.unsplash.com/photo-1589554882513-691f8f071f72?q=80&w=2070&auto=format&fit=crop",
          size: "large",
        },
        {
          id: 5,
          name: "Loja Virtual de Moda",
          category: "E-commerce",
          thumbnail:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "medium",
        },
        {
          id: 6,
          name: "Portal de Notícias",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "medium",
        },
        {
          id: 7,
          name: "App de Delivery Gourmet",
          category: "Mobile App",
          thumbnail:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "small",
        },
        {
          id: 8,
          name: "Plataforma de Streaming",
          category: "Web App",
          thumbnail:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "large",
        },
        {
          id: 9,
          name: "Dashboard Analytics",
          category: "Sistema Web",
          thumbnail:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "small",
        },
        {
          id: 10,
          name: "Site Institucional",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "small",
        },
        {
          id: 11,
          name: "App de Finanças Pessoais",
          category: "Mobile App",
          thumbnail:
            "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "medium",
        },
        {
          id: 12,
          name: "Landing Page Premium",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "small",
        },
        {
          id: 13,
          name: "Landing Page Premium",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          size: "medium",
        },
      ],
      testimonials: [
        {
          name: "Carlos Mendes",
          position: "CEO",
          company: "InovaTech",
          content:
            "A CreativeDevStudio superou todas as nossas expectativas. Eles não apenas entregaram um produto excepcional, mas também nos guiaram através de todo o processo com profissionalismo e expertise.",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Ana Beatriz",
          position: "Diretora de Marketing",
          company: "Global Brands",
          content:
            "Trabalhar com a CreativeDevStudio foi uma experiência transformadora para nossa empresa. Eles entenderam nossa visão e a levaram a um nível que nem imaginávamos ser possível.",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Ricardo Oliveira",
          position: "Fundador",
          company: "StartUp Ventures",
          content:
            "Como startup, precisávamos de um parceiro que pudesse crescer conosco. A CreativeDevStudio não apenas desenvolveu nossa plataforma, mas se tornou um verdadeiro parceiro estratégico.",
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        },
        {
          name: "Fernanda Costa",
          position: "Gerente de Produto",
          company: "Digital Solutions",
          content:
            "O nível de detalhe e cuidado que a CreativeDevStudio coloca em cada projeto é impressionante. Eles entregam não apenas código, mas soluções que realmente resolvem problemas.",
          avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        },
      ],
    };
  },
  computed: {
    testimonialStep() {
      return 100 / this.testimonials.length;
    },
  },
  methods: {
    openProject(id) {
      console.log("Abrindo projeto:", id);
      // Navegar para a página de detalhes do projeto
    },
    openContact() {
      console.log("Abrir formulário de contato");
      // Navegar para a página de contato
    },
    nextTestimonial() {
      this.currentTestimonial =
        (this.currentTestimonial + 1) % this.testimonials.length;
      this.testimonialPosition = this.currentTestimonial * this.testimonialStep;
    },
    prevTestimonial() {
      this.currentTestimonial =
        (this.currentTestimonial - 1 + this.testimonials.length) %
        this.testimonials.length;
      this.testimonialPosition = this.currentTestimonial * this.testimonialStep;
    },
  },
  mounted() {
    // Auto-rotate testimonials
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.testimonialInterval);
  },
};
</script>

<style scoped>
/* Estilos Globais */
.portfolio-premium {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3436;
  line-height: 1.6;
  overflow-x: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.2;
}

span {
  color: #6c5ce7;
}

/* Hero Showcase */
.hero-showcase {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0 5%;
  position: relative;
}

.showcase-container {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 80px 0;
  gap: 60px;
}

.showcase-content {
  flex: 1;
  max-width: 600px;
}

.showcase-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
}

.showcase-description {
  font-size: 1.25rem;
  color: #636e72;
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.showcase-stats {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6c5ce7;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #636e72;
  margin-top: 0.5rem;
}

.showcase-project {
  flex: 1;
  position: relative;
  height: 600px;
  perspective: 1000px;
}

.project-preview {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  transform: rotateY(-5deg) rotateX(5deg);
  transition: all 0.5s ease;
}

.project-preview:hover {
  transform: rotateY(0) rotateX(0) translateY(-10px);
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  border-radius: 0 0 20px 20px;
}

.project-overlay h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.project-overlay p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.explore-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.explore-btn:hover {
  background: #5649c0;
  transform: translateY(-2px);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #636e72;
  font-size: 0.9rem;
  animation: bounce 2s infinite;
}

.arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid #636e72;
  border-bottom: 2px solid #636e72;
  transform: rotate(45deg);
  margin-top: 8px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-10px) translateX(-50%);
  }
  60% {
    transform: translateY(-5px) translateX(-50%);
  }
}

/* Section Header */
.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.section-header h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.1rem;
  color: #636e72;
}

/* Featured Projects */
.featured-projects {
  padding: 120px 5%;
  background: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.project-media {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
}

.project-details h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.project-excerpt {
  font-size: 1.1rem;
  color: #636e72;
  margin-bottom: 2rem;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.client-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 1px solid #eee;
}

.project-year {
  font-size: 0.9rem;
  color: #636e72;
}

.view-project {
  background: transparent;
  color: #6c5ce7;
  border: none;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-project:hover {
  color: #ffffff;
  gap: 12px;
  background-color: #2cabca;
}

.view-project svg {
  width: 20px;
  height: 20px;
}

/* Alternate project layouts */
.project-2 {
  direction: rtl;
}

.project-2 .project-details {
  direction: ltr;
}

.project-3 {
  grid-template-columns: 1.2fr 0.8fr;
}

/* All Projects */
.all-projects {
  padding: 120px 5%;
  background: #f5f7fa;
}

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
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.mosaic-overlay h3 {
  font-size: 1.3rem;
  margin-bottom: 4px;
}

.mosaic-overlay p {
  font-size: 0.9rem;
  opacity: 0.8;
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

/* Testimonials */
.testimonials {
  padding: 120px 5%;
  background: white;
}

.testimonials-slider {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}

.testimonial-card {
  min-width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.testimonial-content {
  background: #f5f7fa;
  border-radius: 16px;
  padding: 40px;
  position: relative;
  margin-bottom: 30px;
}

.quote-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 4rem;
  color: #6c5ce7;
  opacity: 0.2;
  line-height: 1;
}

.testimonial-content p {
  font-size: 1.2rem;
  font-style: italic;
  color: #2d3436;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 3px solid #6c5ce7;
}
.router-link {
  text-decoration: none;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  font-size: 1.1rem;
}

.author-info span {
  font-size: 0.9rem;
  color: #636e72;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: white;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.slider-nav:hover {
  background: #6c5ce7;
  color: white;
}

.slider-nav.prev {
  left: 0;
}

.slider-nav.next {
  right: 0;
}

.slider-nav svg {
  width: 24px;
  height: 24px;
}

/* CTA Section */
.cta-section {
  padding: 120px 5%;
  background: linear-gradient(135deg, #6c5ce7 0%, #4a3dc0 100%);
  color: white;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 60px;
}

.cta-content {
  flex: 1;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 500px;
}

.cta-button {
  background: white;
  color: #6c5ce7;
  border: none;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cta-button:hover {
  background: #f5f7fa;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.cta-button svg {
  width: 20px;
  height: 20px;
}

.cta-image {
  flex: 1;
  height: 400px;
  background-image: url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&");
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

/* Responsividade */
@media (max-width: 1200px) {
  .showcase-container {
    flex-direction: column;
    padding: 60px 0;
  }

  .showcase-content {
    max-width: 100%;
    text-align: center;
  }

  .showcase-stats {
    justify-content: center;
  }

  .showcase-project {
    width: 100%;
    height: 500px;
  }

  .project-card {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .project-2 {
    direction: ltr;
  }

  .projects-mosaic {
    grid-template-columns: repeat(6, 1fr);
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 3;
  }

  .cta-container {
    flex-direction: column;
  }

  .cta-content {
    text-align: center;
    margin-bottom: 40px;
  }

  .cta-content p {
    max-width: 100%;
  }

  .cta-image {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .showcase-title {
    font-size: 2.5rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .projects-mosaic {
    grid-template-columns: repeat(2, 1fr);
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 2;
  }

  .testimonial-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .showcase-title {
    font-size: 2rem;
  }

  .showcase-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .projects-mosaic {
    grid-template-columns: 1fr;
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 1;
  }
}
</style>
