<template>
  <div class="services-page">
    <!-- Hero Section -->
    <!-- Hero Section Modificada -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Desenvolvemos </span>
            <span class="title-line highlight">
              <span class="tech-text">Seu Website</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Transforme sua ideia em um site incrível com nossa equipe de
            especialistas. Criamos soluções personalizadas para atender às suas
            necessidades.
          </p>
          <div class="cta-container">
            <button class="cta-button">
              <router-link to="/contato" class="cta-link">
                Fale com nossos especialistas</router-link
              >
            </button>
          </div>
          <div class="tech-stack">
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/vue-9.svg"
                alt="Vue.js"
                title="Vue.js"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                alt="React"
                title="React"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                alt="Node.js"
                title="Node.js"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/laravel-2.svg"
                alt="Laravel"
                title="Laravel"
              />
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="browser-mockup">
            <div class="browser-frame">
              <div class="browser-controls">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div
                class="website-preview"
                style="
                  background-image: url('https://images.unsplash.com/photo-1649443992089-8bf1fc3c42f4?q=80&w=2070&auto=format&fit=crop');
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Explore nossos serviços</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="services-section">
      <h2>Nossos Serviços de Desenvolvimento Web</h2>
      <p class="section-description">
        Cada projeto é cuidadosamente planejado para atender às necessidades
        específicas do seu negócio
      </p>

      <div class="services-grid">
        <!-- Site Institucional -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            "
          >
            <h3>Sites Institucionais</h3>
          </div>
          <div class="service-content">
            <p>
              A presença digital profissional que sua empresa merece, com design
              moderno e funcionalidades essenciais.
            </p>
            <ul class="service-features">
              <li>Até 10 páginas</li>
              <li>Design responsivo</li>
              <li>Formulário de contato</li>
              <li>SEO básico</li>
              <li>Integração com redes sociais</li>
            </ul>
            <RouterLink to="/site-institucional">
              <button class="service-button">Saiba Mais</button></RouterLink
            >
          </div>
        </div>

        <!-- E-commerce -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165882.jpg?t=st=1743383567~exp=1743387167~hmac=4e3562baf575497757fd7cc69aedb67fc78981aa410bc700da7efddef61b95b7&w=996');
            "
          >
            <h3>Lojas Virtuais</h3>
          </div>
          <div class="service-content">
            <p>
              Soluções completas de e-commerce para vender seus produtos online
              com segurança e eficiência.
            </p>
            <ul class="service-features">
              <li>Catálogo de produtos</li>
              <li>Carrinho de compras</li>
              <li>Pagamentos online</li>
              <li>Painel administrativo</li>
              <li>Relatórios de vendas</li>
            </ul>
            <RouterLink to="/lojasvituais">
              <button class="service-button">Ver Portfólio</button></RouterLink
            >
          </div>
        </div>

        <!-- Blogs -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://img.freepik.com/free-photo/online-message-blog-chat-communication-envelop-graphic-icon-concept_53876-139717.jpg?t=st=1743387071~exp=1743390671~hmac=a12749268b625fb8c010f28495e7258957c1aac8a69339cad3132c00543ddd30&w=1060');
            "
          >
            <h3>Blogs Profissionais</h3>
          </div>
          <div class="service-content">
            <p>
              Plataformas de conteúdo robustas para compartilhar conhecimento e
              aumentar sua autoridade digital.
            </p>
            <ul class="service-features">
              <li>Sistema de categorias</li>
              <li>Editor avançado</li>
              <li>Comentários</li>
              <li>SEO completo</li>
              <li>Integração com newsletter</li>
            </ul>
            <RouterLink to="/blogs-personalizados">
              <button class="service-button">Ver Portfólio</button></RouterLink
            >
          </div>
        </div>

        <!-- Sistemas Web -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?t=st=1743389203~exp=1743392803~hmac=dcc1d3661eb0529ada7ad44fb5fafd35ed3d3d8db23882a8fa65461f41853a5a&w=996');
            "
          >
            <h3>Sistemas Web Personalizados</h3>
          </div>
          <div class="service-content">
            <p>
              Soluções sob medida para automatizar processos e melhorar a
              eficiência do seu negócio.
            </p>
            <ul class="service-features">
              <li>Desenvolvimento customizado</li>
              <li>Painéis administrativos</li>
              <li>Relatórios personalizados</li>
              <li>Integração com APIs</li>
              <li>Automação de processos</li>
            </ul>
            <button class="service-button">Ver Portfólio</button>
          </div>
        </div>

        <!-- Landing Pages -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://img.freepik.com/free-psd/user-interface-design-website-template_23-2149182791.jpg?t=st=1743389295~exp=1743392895~hmac=1fac36b71c629ae7986a9406166b094afc1f06d208a7abdd1852ddd41f906cab&w=1380');
            "
          >
            <h3>Landing Pages de Alta Conversão</h3>
          </div>
          <div class="service-content">
            <p>
              Páginas focadas em resultados para campanhas específicas e
              captação de leads qualificados.
            </p>
            <ul class="service-features">
              <li>Design persuasivo</li>
              <li>Formulários otimizados</li>
              <li>Testes A/B</li>
              <li>Integração com CRM</li>
              <li>Análise de conversão</li>
            </ul>
            <button class="service-button">Ver Portfólio</button>
          </div>
        </div>

        <!-- Aplicativos Web -->
        <div class="service-card">
          <div
            class="service-banner"
            style="
              background-image: url('https://source.unsplash.com/600x400/?webapp,ui');
            "
          >
            <h3>Aplicativos Web Progressivos (PWA)</h3>
          </div>
          <div class="service-content">
            <p>
              Experiências similares a aplicativos nativos, acessíveis
              diretamente pelo navegador.
            </p>
            <ul class="service-features">
              <li>Funciona offline</li>
              <li>Notificações push</li>
              <li>Ícone na tela inicial</li>
              <li>Carregamento instantâneo</li>
              <li>Sincronização em segundo plano</li>
            </ul>
            <button class="service-button">Ver Portfólio</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio Showcase -->
    <section class="portfolio-section">
      <h2>Nossos Trabalhos Recentes</h2>
      <p class="section-description">
        Alguns exemplos de projetos que desenvolvemos para nossos clientes
      </p>

      <div class="portfolio-grid">
        <div
          class="portfolio-item"
          v-for="(project, index) in portfolio"
          :key="index"
        >
          <div
            class="portfolio-image"
            :style="{ backgroundImage: 'url(' + project.image + ')' }"
          >
            <div class="overlay">
              <h3>{{ project.name }}</h3>
              <p>{{ project.type }}</p>
            </div>
          </div>
          <div class="portfolio-info">
            <p>{{ project.description }}</p>
            <a :href="project.link" class="portfolio-link">Ver detalhes →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="tech-section">
      <h2>Tecnologias que Utilizamos</h2>
      <p class="section-description">
        Ferramentas modernas para resultados excepcionais
      </p>

      <div class="tech-grid">
        <div class="tech-category">
          <h3>Front-end</h3>
          <div class="tech-icons">
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"
                alt="Vue.js"
              />
              <span>Vue.js</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                alt="React"
              />
              <span>React</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
                alt="Sass"
              />
              <span>Sass</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
                alt="Tailwind"
              />
              <span>Tailwind</span>
            </div>
          </div>
        </div>

        <div class="tech-category">
          <h3>Back-end</h3>
          <div class="tech-icons">
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
              />
              <span>Node.js</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"
                alt="Express"
              />
              <span>Express</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
                alt="Laravel"
              />
              <span>Laravel</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
                alt="MongoDB"
              />
              <span>MongoDB</span>
            </div>
          </div>
        </div>

        <div class="tech-category">
          <h3>Ferramentas</h3>
          <div class="tech-icons">
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
                alt="Git"
              />
              <span>Git</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
                alt="Figma"
              />
              <span>Figma</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                alt="Docker"
              />
              <span>Docker</span>
            </div>
            <div class="tech-item">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg"
                alt="Webpack"
              />
              <span>Webpack</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <h2>Nosso Processo de Desenvolvimento</h2>
      <p class="section-description">
        Metodologia clara e eficiente para garantir o sucesso do seu projeto
      </p>

      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>Descoberta</h3>
          <p>Análise de requisitos e planejamento estratégico</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>Design</h3>
          <p>Wireframes, protótipos e design UI/UX</p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>Desenvolvimento</h3>
          <p>Implementação das funcionalidades</p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h3>Testes</h3>
          <p>Garantia de qualidade e otimização</p>
        </div>
        <div class="process-step">
          <div class="step-number">5</div>
          <h3>Lançamento</h3>
          <p>Implantação e monitoramento</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Pronto para Transformar Sua Ideia em Realidade?</h2>
      <p>
        Entre em contato para discutirmos seu projeto e receber uma proposta
        personalizada
      </p>
      <button class="cta-button">Solicitar Orçamento</button>
    </section>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "ServicesPage",
  data() {
    return {
      portfolio: [
        {
          name: "E-commerce Orgânico",
          type: "Loja Virtual",
          description:
            "Plataforma completa para venda de produtos naturais com integração de pagamentos.",
          image:
            "https://images.unsplash.com/photo-1586880244406-556ebe35f282?q=80&w=1887&auto=format&fit=crop",
          link: "/servicos/lojas-virtuais",
        },
        {
          name: "Portal Educacional",
          type: "Sistema Web",
          description:
            "Solução completa para gestão de cursos online com videoaulas e certificados.",
          image: "https://source.unsplash.com/400x300/?education,online",
          link: "#",
        },
        {
          name: "App de Turismo",
          type: "PWA",
          description:
            "Aplicativo web progressivo para guia turístico com mapas offline.",
          image: "https://source.unsplash.com/400x300/?travel,app",
          link: "#",
        },
        {
          name: "Dashboard Corporativo",
          type: "Sistema Personalizado",
          description:
            "Painel de business intelligence com visualização de dados em tempo real.",
          image: "https://source.unsplash.com/400x300/?dashboard,analytics",
          link: "#",
        },
      ],
    };
  },
};
</script>

<style scoped>
.services-page {
  font-family: "Inter", sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

/* Hero Section */
/* Novo estilo para a Hero Section (similar ao mobile) */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 70%
    ),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.tech-text {
  position: relative;
  display: inline-block;
}

.tech-text::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(99, 102, 241, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cta-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tech-icon img {
  height: 40px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.tech-icon img:hover {
  opacity: 1;
  transform: translateY(-3px);
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.browser-mockup {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.browser-frame {
  position: relative;
  width: 100%;
  height: 400px;
  background: #0f172a;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.browser-controls {
  display: flex;
  gap: 8px;
  padding: 10px;
}

.browser-controls span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #475569;
}

.website-preview {
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  margin-top: 8px;
  animation: bounce 2s infinite;
}

/* Animações */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-visual {
    order: -1;
    margin-bottom: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .cta-container {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    width: 100%;
  }

  .browser-mockup {
    width: 100%;
  }
}
/* Services Section */
.services-section,
.portfolio-section,
.tech-section,
.process-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.service-banner {
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  position: relative;
}

.service-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.service-banner h3 {
  color: white;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  margin: 0;
}

.service-content {
  padding: 1.5rem;
  background: white;
}

.service-content p {
  margin-bottom: 1rem;
  color: #4a5568;
}
.cta-link {
  text-decoration: none;
  color: white;
  font-weight: 800;
  transition: color 0.3s ease;
}

.service-features {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.service-features li {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.service-button {
  background: #edf2f7;
  color: #2d3748;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
}

.service-button:hover {
  background: #e2e8f0;
}

/* Portfolio Section */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.portfolio-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1.5rem;
  color: white;
}

.overlay h3 {
  margin: 0;
  font-size: 1.25rem;
}

.overlay p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.portfolio-info {
  padding: 1.5rem;
  background: white;
}

.portfolio-info p {
  color: #4a5568;
  margin-bottom: 1rem;
}

.portfolio-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.portfolio-link:hover {
  color: #3182ce;
}

/* Tech Section */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.tech-category {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.tech-category h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.tech-item span {
  font-size: 0.9rem;
  color: #4a5568;
  text-align: center;
}

/* Process Section */
.process-section {
  background: #f7fafc;
}

.process-steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 3rem;
}

.process-step {
  flex: 1;
  min-width: 200px;
  max-width: 220px;
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4299e1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.process-step h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.process-step p {
  font-size: 0.9rem;
  color: #4a5568;
}

/* CTA Section */
.cta-section {
  background: #4299e1;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.cta-section h2 {
  margin-bottom: 1.5rem;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .services-grid,
  .portfolio-grid,
  .tech-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    min-width: 100%;
  }
}
</style>
