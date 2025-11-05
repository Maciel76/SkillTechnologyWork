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
          <div class="hero-slider">
            <transition-group name="slide-fade" tag="div" class="slides-container">
              <div
                v-for="(project, index) in featuredProjects"
                :key="project.id"
                v-show="currentHeroSlide === index"
                class="project-preview"
                :style="{
                  backgroundImage: `url(${project.images[0]})`,
                }"
              >
                <div class="project-overlay">
                  <span class="project-category">{{ project.category }}</span>
                  <h3>{{ project.name }}</h3>
                  <p>{{ project.description }}</p>
                  <button
                    class="explore-btn"
                    @click="openProject(project.id)"
                  >
                    Explorar Projeto
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </transition-group>

            <!-- Dots Navigation -->
            <div class="hero-dots">
              <span
                v-for="(project, index) in featuredProjects"
                :key="'dot-' + index"
                :class="{ active: currentHeroSlide === index }"
                @click="goToHeroSlide(index)"
              ></span>
            </div>

            <!-- Arrow Navigation -->
            <button class="hero-nav prev" @click="prevHeroSlide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button class="hero-nav next" @click="nextHeroSlide">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
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

    <!-- Seção de Metodologia -->
    <section class="methodology-section">
      <div class="section-header">
        <h2>Nossa <span>Metodologia</span> de Trabalho</h2>
        <p>Um processo comprovado que transforma ideias em produtos digitais de sucesso</p>
      </div>

      <div class="process-grid">
        <div class="process-step" v-for="(step, index) in processSteps" :key="index" data-aos="fade-up" :data-aos-delay="index * 100">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon" v-html="step.icon"></div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
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

      <!-- Componente de Galeria de Projetos -->
      <ProjectGallery :projects="allProjects" :categories="categories" />
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
      currentHeroSlide: 0,
      selectedCategory: 'Todos',
      categories: ['Todos', 'Web App', 'E-commerce', 'Mobile App', 'Website', 'Sistema Web'],
      processSteps: [
        {
          title: 'Descoberta',
          description: 'Entendemos profundamente seu negócio, objetivos e público-alvo através de workshops e pesquisas.',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>'
        },
        {
          title: 'Estratégia',
          description: 'Definimos a arquitetura, tecnologias e abordagem ideal para alcançar seus objetivos.',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>'
        },
        {
          title: 'Desenvolvimento',
          description: 'Construímos sua solução com código limpo, testes rigorosos e entregas incrementais.',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>'
        },
        {
          title: 'Lançamento',
          description: 'Deploy profissional, treinamento da equipe e suporte contínuo para garantir o sucesso.',
          icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>'
        }
      ],
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
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop"
          ],
          size: "large",
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'Redis'],
          description: "Plataforma completa de gestão hospitalar com agendamento, prontuário eletrônico, controle de estoque e faturamento integrado.",
          client: "Hospital São Lucas",
          year: "2023",
          duration: "8 meses",
          accentColor: "#00b894",
          features: [
            "Prontuário eletrônico do paciente (PEP)",
            "Agendamento online de consultas",
            "Controle de estoque de medicamentos",
            "Sistema de faturamento TISS",
            "Dashboard de métricas em tempo real"
          ]
        },
        {
          id: 5,
          name: "Loja Virtual de Moda",
          category: "E-commerce",
          thumbnail:
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop"
          ],
          size: "medium",
          technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
          description: "E-commerce completo com catálogo dinâmico, carrinho inteligente, pagamento seguro e painel administrativo.",
          client: "Moda Bella Store",
          year: "2023",
          duration: "5 meses",
          accentColor: "#fd79a8",
          features: [
            "Catálogo com filtros avançados",
            "Carrinho de compras persistente",
            "Integração Stripe e PayPal",
            "Sistema de cupons e promoções",
            "Painel admin completo"
          ]
        },
        {
          id: 6,
          name: "Portal de Notícias",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800&auto=format&fit=crop"
          ],
          size: "medium",
          technologies: ['WordPress', 'PHP', 'MySQL', 'Redis'],
          description: "Portal de notícias moderno com sistema de publicação, categorização avançada e SEO otimizado.",
          client: "Jornal Digital News",
          year: "2022",
          duration: "3 meses",
          accentColor: "#0984e3",
          features: [
            "CMS customizado",
            "Sistema de comentários",
            "Newsletter integrada",
            "SEO otimizado",
            "AMP para mobile"
          ]
        },
        {
          id: 7,
          name: "App de Delivery Gourmet",
          category: "Mobile App",
          thumbnail:
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
          ],
          size: "small",
          technologies: ['React Native', 'Firebase', 'Maps API', 'Socket.io'],
          description: "Aplicativo de delivery com rastreamento em tempo real, pagamento integrado e sistema de avaliações.",
          client: "Gourmet Express",
          year: "2023",
          duration: "6 meses",
          accentColor: "#ff7675",
          features: [
            "Rastreamento em tempo real",
            "Pagamento in-app",
            "Sistema de avaliações",
            "Push notifications",
            "Chat com entregador"
          ]
        },
        {
          id: 8,
          name: "Plataforma de Streaming",
          category: "Web App",
          thumbnail:
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&auto=format&fit=crop"
          ],
          size: "large",
          technologies: ['Next.js', 'AWS', 'MongoDB', 'FFmpeg'],
          description: "Plataforma de streaming de vídeo com upload, transcodificação automática e player customizado.",
          client: "StreamTech Media",
          year: "2023",
          duration: "10 meses",
          accentColor: "#6c5ce7",
          features: [
            "Upload de vídeos",
            "Transcodificação automática",
            "Player customizado",
            "Sistema de assinaturas",
            "Analytics de visualizações"
          ]
        },
        {
          id: 9,
          name: "Dashboard Analytics",
          category: "Sistema Web",
          thumbnail:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&auto=format&fit=crop"
          ],
          size: "small",
          technologies: ['Angular', 'Python', 'PostgreSQL', 'D3.js'],
          description: "Dashboard de analytics com visualização de dados em tempo real, relatórios customizados e IA preditiva.",
          client: "DataViz Corp",
          year: "2022",
          duration: "7 meses",
          accentColor: "#fdcb6e",
          features: [
            "Gráficos interativos",
            "Relatórios personalizados",
            "IA preditiva",
            "Exportação de dados",
            "API REST completa"
          ]
        },
        {
          id: 10,
          name: "Site Institucional Tech",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop"
          ],
          size: "small",
          technologies: ['Nuxt.js', 'Tailwind', 'Vercel', 'Strapi'],
          description: "Website institucional moderno com animações, SEO otimizado e CMS headless para gestão de conteúdo.",
          client: "Tech Innovations",
          year: "2023",
          duration: "2 meses",
          accentColor: "#00cec9",
          features: [
            "Animações GSAP",
            "SEO otimizado",
            "CMS headless",
            "Multi-idioma",
            "Performance 100/100"
          ]
        },
        {
          id: 11,
          name: "App de Finanças Pessoais",
          category: "Mobile App",
          thumbnail:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
          ],
          size: "medium",
          technologies: ['Flutter', 'Dart', 'Supabase', 'Chart.js'],
          description: "Aplicativo de controle financeiro com categorização automática, metas e insights personalizados.",
          client: "FinTech Solutions",
          year: "2023",
          duration: "4 meses",
          accentColor: "#00b894",
          features: [
            "Categorização automática",
            "Metas financeiras",
            "Insights com IA",
            "Sincronização multi-device",
            "Relatórios detalhados"
          ]
        },
        {
          id: 12,
          name: "Landing Page SaaS",
          category: "Website",
          thumbnail:
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop"
          ],
          size: "small",
          technologies: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
          description: "Landing page de alta conversão com animações, formulários otimizados e integração com ferramentas de marketing.",
          client: "CloudSaaS Inc",
          year: "2023",
          duration: "1 mês",
          accentColor: "#a29bfe",
          features: [
            "Design responsivo",
            "Animações fluidas",
            "Formulários otimizados",
            "A/B Testing",
            "Analytics integrado"
          ]
        },
        {
          id: 13,
          name: "Marketplace B2B",
          category: "E-commerce",
          thumbnail:
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
          images: [
            "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1664575602276-acd073f104c1?w=800&auto=format&fit=crop"
          ],
          size: "medium",
          technologies: ['Vue.js', 'Express', 'MongoDB', 'Stripe'],
          description: "Marketplace B2B com sistema de cotações, negociação, pagamentos e logística integrada.",
          client: "B2B Connect",
          year: "2022",
          duration: "12 meses",
          accentColor: "#e17055",
          features: [
            "Sistema de cotações",
            "Chat de negociação",
            "Pagamentos escrow",
            "Logística integrada",
            "Gestão de fornecedores"
          ]
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
    filteredProjects() {
      if (this.selectedCategory === 'Todos') {
        return this.allProjects;
      }
      return this.allProjects.filter(project => project.category === this.selectedCategory);
    }
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
    nextHeroSlide() {
      this.currentHeroSlide = (this.currentHeroSlide + 1) % this.featuredProjects.length;
    },
    prevHeroSlide() {
      this.currentHeroSlide = (this.currentHeroSlide - 1 + this.featuredProjects.length) % this.featuredProjects.length;
    },
    goToHeroSlide(index) {
      this.currentHeroSlide = index;
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
    // Auto-rotate hero slider
    this.heroInterval = setInterval(() => {
      this.nextHeroSlide();
    }, 5000);

    // Auto-rotate testimonials
    this.testimonialInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  },
  beforeUnmount() {
    clearInterval(this.heroInterval);
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 5%;
  position: relative;
  overflow: hidden;
}

.hero-showcase::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 20%, rgba(108, 92, 231, 0.2) 0%, transparent 50%);
  animation: pulse 15s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.showcase-container {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 80px 0;
  gap: 60px;
  position: relative;
  z-index: 1;
}

.showcase-content {
  flex: 1;
  max-width: 600px;
}

.showcase-title {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: white;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.showcase-title span {
  color: #ffd93d;
  background: linear-gradient(135deg, #ffd93d, #ffeaa7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.showcase-description {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2.5rem;
  max-width: 500px;
}

.showcase-stats {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  line-height: 1;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
}

.showcase-project {
  flex: 1;
  position: relative;
  height: 600px;
}

.hero-slider {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.slides-container {
  position: relative;
  width: 100%;
  height: 100%;
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
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transform: rotateY(-5deg) rotateX(5deg);
  transition: all 0.5s ease;
}

.project-preview:hover {
  transform: rotateY(0) rotateX(0) translateY(-10px);
}

/* Slide Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.8s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(100px) rotateY(-10deg);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-100px) rotateY(10deg);
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
  color: white;
  border-radius: 0 0 20px 20px;
}

.project-category {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(255, 217, 61, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 217, 61, 0.4);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ffd93d;
  margin-bottom: 12px;
}

.project-overlay h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.project-overlay p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
  font-size: 0.95rem;
}

.explore-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #6c5ce7;
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.explore-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.2);
  gap: 12px;
}

.explore-btn svg {
  transition: transform 0.3s ease;
}

.explore-btn:hover svg {
  transform: translateX(3px);
}

/* Hero Dots Navigation */
.hero-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
}

.hero-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hero-dots span:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.hero-dots span.active {
  background: #ffd93d;
  width: 36px;
  border-radius: 10px;
  border-color: rgba(255, 255, 255, 0.3);
}

/* Hero Arrow Navigation */
.hero-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  opacity: 0;
}

.hero-slider:hover .hero-nav {
  opacity: 1;
}

.hero-nav:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.hero-nav.prev {
  left: 20px;
}

.hero-nav.next {
  right: 20px;
}

.hero-nav svg {
  width: 24px;
  height: 24px;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  animation: bounce 2s infinite;
  z-index: 1;
}

.arrow {
  width: 20px;
  height: 20px;
  border-right: 2px solid rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid rgba(255, 255, 255, 0.8);
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

/* Methodology Section */
.methodology-section {
  padding: 120px 5%;
  background: white;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.process-step {
  text-align: center;
  padding: 40px 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #fff 100%);
  border-radius: 16px;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.process-step:hover {
  transform: translateY(-10px);
  border-color: #6c5ce7;
  box-shadow: 0 20px 40px rgba(108, 92, 231, 0.1);
}

.step-number {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
}

.step-icon {
  width: 60px;
  height: 60px;
  margin: 20px auto 20px;
  color: #6c5ce7;
}

.step-icon svg {
  width: 100%;
  height: 100%;
}

.process-step h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
  color: #2d3436;
}

.process-step p {
  color: #636e72;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* All Projects */
.all-projects {
  padding: 120px 5%;
  background: #f5f7fa;
}

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

.mosaic-overlay h3 {
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
    flex-wrap: wrap;
  }

  .showcase-project {
    width: 100%;
    height: 500px;
  }

  .hero-slider {
    height: 500px;
  }

  .hero-nav {
    opacity: 1;
  }

  .hero-nav.prev {
    left: 10px;
  }

  .hero-nav.next {
    right: 10px;
  }

  .process-grid {
    grid-template-columns: repeat(2, 1fr);
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

  .hero-slider {
    height: 450px;
  }

  .project-preview {
    transform: rotateY(0) rotateX(0);
  }

  .project-overlay {
    padding: 30px 20px;
  }

  .project-overlay h3 {
    font-size: 1.5rem;
  }

  .project-overlay p {
    font-size: 0.9rem;
  }

  .explore-btn {
    padding: 12px 24px;
    font-size: 0.9rem;
  }

  .hero-nav {
    width: 45px;
    height: 45px;
  }

  .hero-nav.prev {
    left: 5px;
  }

  .hero-nav.next {
    right: 5px;
  }

  .hero-dots {
    bottom: 20px;
  }

  .hero-dots span {
    width: 10px;
    height: 10px;
  }

  .hero-dots span.active {
    width: 28px;
  }

  .process-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

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

  .mosaic-overlay h3 {
    font-size: 1.2rem;
  }

  .tech-badge {
    font-size: 0.65rem;
    padding: 3px 10px;
  }

  .testimonial-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .showcase-title {
    font-size: 1.8rem;
  }

  .showcase-description {
    font-size: 1rem;
  }

  .showcase-stats {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  .stat-item {
    width: 100%;
  }

  .hero-slider {
    height: 400px;
  }

  .project-overlay {
    padding: 24px 16px;
  }

  .project-category {
    font-size: 0.7rem;
    padding: 5px 12px;
  }

  .project-overlay h3 {
    font-size: 1.3rem;
  }

  .project-overlay p {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  .explore-btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  .hero-nav {
    width: 40px;
    height: 40px;
  }

  .hero-nav svg {
    width: 20px;
    height: 20px;
  }

  .hero-dots {
    bottom: 15px;
    gap: 8px;
  }

  .hero-dots span {
    width: 8px;
    height: 8px;
  }

  .hero-dots span.active {
    width: 24px;
  }

  .process-step {
    padding: 30px 20px;
  }

  .step-number {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }

  .process-step h3 {
    font-size: 1.2rem;
  }

  .filter-tabs {
    gap: 6px;
  }

  .filter-tabs button {
    padding: 8px 16px;
    font-size: 0.8rem;
  }

  .projects-mosaic {
    grid-template-columns: 1fr;
    grid-auto-rows: 250px;
  }

  .size-large,
  .size-medium,
  .size-small {
    grid-column: span 1;
  }

  .mosaic-overlay h3 {
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
}
</style>
