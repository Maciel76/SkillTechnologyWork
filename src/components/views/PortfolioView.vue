<template>
  <div class="portfolio-page">
    <!-- Hero Section -->
    <section class="portfolio-hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">Nossos</span>
          <span class="title-line highlight">
            <span class="tech-text">Trabalhos Incríveis</span>
            <span class="pulse-dot"></span>
          </span>
        </h1>
        <p class="hero-subtitle">Projetos que transformaram negócios e cativaram usuários</p>
        <div class="scroll-indicator">
          <span>Explore nosso portfólio</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 14L12 21M12 21L5 14M12 21L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
      <div class="hero-background">
        <div class="floating-shapes">
          <div class="shape shape-1" style="--color: #3498db;"></div>
          <div class="shape shape-2" style="--color: #e74c3c;"></div>
          <div class="shape shape-3" style="--color: #2ecc71;"></div>
          <div class="shape shape-4" style="--color: #f39c12;"></div>
        </div>
      </div>
    </section>

    <!-- Portfolio Filter -->
    <div class="portfolio-filter">
      <button 
        v-for="category in categories" 
        :key="category.id"
        :class="['filter-button', { active: activeFilter === category.id }]"
        @click="activeFilter = category.id"
      >
        {{ category.name }}
      </button>
    </div>

    <!-- Portfolio Grid -->
    <section class="portfolio-grid">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="portfolio-item"
        :class="[`category-${project.category}`]"
        @click="openProjectModal(project)"
      >
        <div class="item-image">
          <img :src="project.thumbnail" :alt="project.title">
          <div class="image-overlay"></div>
        </div>
        <div class="item-info">
          <h3>{{ project.title }}</h3>
          <p>{{ project.shortDescription }}</p>
          <div class="item-tags">
            <span v-for="(tag, index) in project.tags" :key="index">{{ tag }}</span>
          </div>
        </div>
        <div class="item-hover-content">
          <h3>{{ project.title }}</h3>
          <button class="view-project-button">
            Ver Projeto
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="portfolio-stats">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number" ref="clientCounter">0</div>
          <div class="stat-label">Clientes Satisfeitos</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" ref="projectCounter">0</div>
          <div class="stat-label">Projetos Entregues</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" ref="experienceCounter">0</div>
          <div class="stat-label">Anos de Experiência</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" ref="conversionCounter">0</div>
          <div class="stat-label">Aumento Médio em Conversão</div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-line">O que nossos</span>
          <span class="title-line highlight">
            <span class="tech-text">Clientes dizem</span>
            <span class="pulse-dot"></span>
          </span>
        </h2>
      </div>

      <div class="testimonials-slider">
        <div class="slider-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            class="testimonial-card"
          >
            <div class="client-info">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="client-avatar">
              <div>
                <h4>{{ testimonial.name }}</h4>
                <p class="client-position">{{ testimonial.position }}</p>
              </div>
            </div>
            <div class="testimonial-content">
              <div class="quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14 15H15C16.1046 15 17 14.1046 17 13V9C17 7.89543 16.1046 7 15 7H14M10 15H11C12.1046 15 13 14.1046 13 13V9C13 7.89543 12.1046 7 11 7H10M10 7V15M14 7V15" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p>{{ testimonial.content }}</p>
              <div class="client-rating">
                <svg v-for="i in 5" :key="i" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                    :fill="i <= testimonial.rating ? 'var(--accent-color)' : '#e2e8f0'" 
                    stroke="var(--accent-color)"/>
                </svg>
              </div>
            </div>
            <div class="project-preview">
              <img :src="testimonial.projectImage" :alt="'Projeto para ' + testimonial.name">
            </div>
          </div>
        </div>
        <button class="slider-button prev" @click="prevSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="slider-button next" @click="nextSlide">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="slider-dots">
          <button 
            v-for="(dot, index) in testimonials.length" 
            :key="index"
            :class="['dot', { active: currentSlide === index }]"
            @click="currentSlide = index"
          ></button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="portfolio-cta">
      <div class="cta-container">
        <h2>Pronto para transformar sua ideia em realidade?</h2>
        <p>Nossa equipe está pronta para criar a solução perfeita para suas necessidades digitais.</p>
        <div class="cta-buttons">
          <button class="primary-button" @click="openContactModal">Fale Conosco</button>
          <button class="secondary-button" @click="scrollToServices">Nossos Serviços</button>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <transition name="fade">
      <div 
        v-if="selectedProject" 
        class="project-modal" 
        @click.self="closeProjectModal"
      >
        <div class="modal-content">
          <button class="close-modal" @click="closeProjectModal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div class="modal-header">
            <div class="project-badge" :style="{ backgroundColor: selectedProject.color }">
              {{ selectedProject.categoryName }}
            </div>
            <h2>{{ selectedProject.title }}</h2>
            <p class="project-subtitle">{{ selectedProject.subtitle }}</p>
          </div>
          
          <div class="project-gallery">
            <div class="main-image">
              <img :src="selectedProject.images[0]" :alt="selectedProject.title">
            </div>
            <div class="thumbnail-grid">
              <div 
                v-for="(image, index) in selectedProject.images.slice(1)" 
                :key="index"
                class="thumbnail-item"
                @click="setMainImage(index + 1)"
              >
                <img :src="image" :alt="'Preview ' + (index + 1)">
              </div>
            </div>
          </div>
          
          <div class="project-details">
            <div class="details-column">
              <h3>Sobre o Projeto</h3>
              <p>{{ selectedProject.description }}</p>
              
              <h3>Desafios</h3>
              <ul class="challenges-list">
                <li v-for="(challenge, index) in selectedProject.challenges" :key="index">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--accent-color)" stroke-width="2"/>
                    <path d="M8 12L11 15L16 9" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ challenge }}
                </li>
              </ul>
            </div>
            
            <div class="details-column">
              <h3>Tecnologias Utilizadas</h3>
              <div class="tech-stack">
                <div 
                  v-for="(tech, index) in selectedProject.technologies" 
                  :key="index"
                  class="tech-item"
                >
                  <img :src="getTechIcon(tech)" :alt="tech">
                  <span>{{ tech }}</span>
                </div>
              </div>
              
              <h3>Resultados</h3>
              <div class="results-grid">
                <div 
                  v-for="(result, index) in selectedProject.results" 
                  :key="index"
                  class="result-item"
                >
                  <div class="result-value">{{ result.value }}</div>
                  <div class="result-label">{{ result.label }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="project-testimonial" v-if="selectedProject.testimonial">
            <div class="testimonial-content">
              <div class="quote-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M14 15H15C16.1046 15 17 14.1046 17 13V9C17 7.89543 16.1046 7 15 7H14M10 15H11C12.1046 15 13 14.1046 13 13V9C13 7.89543 12.1046 7 11 7H10M10 7V15M14 7V15" stroke="var(--accent-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p>"{{ selectedProject.testimonial.content }}"</p>
              <div class="client-info">
                <img :src="selectedProject.testimonial.avatar" :alt="selectedProject.testimonial.name" class="client-avatar">
                <div>
                  <h4>{{ selectedProject.testimonial.name }}</h4>
                  <p class="client-position">{{ selectedProject.testimonial.position }}, {{ selectedProject.testimonial.company }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="cta-button" @click="openContactModal">
              Quero um projeto como este
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'PortfolioPage',
  setup() {
    const router = useRouter()
    const activeFilter = ref('all')
    const currentSlide = ref(0)
    const selectedProject = ref(null)
    const mainImageIndex = ref(0)
    
    // Contadores animados
    const clientCounter = ref(null)
    const projectCounter = ref(null)
    const experienceCounter = ref(null)
    const conversionCounter = ref(null)
    
    const categories = [
      { id: 'all', name: 'Todos' },
      { id: 'web', name: 'Websites' },
      { id: 'ecommerce', name: 'E-commerce' },
      { id: 'mobile', name: 'Mobile' },
      { id: 'design', name: 'Design' },
      { id: 'marketing', name: 'Marketing' }
    ]
    
    const projects = [
      {
        id: 1,
        title: 'Nova Plataforma de E-commerce',
        subtitle: 'Revolucionando a experiência de compra online',
        shortDescription: 'Plataforma completa de e-commerce com aumento de 300% nas vendas',
        description: 'Desenvolvemos uma plataforma de e-commerce totalmente personalizada para uma grande marca de moda, integrando sistemas de ERP, pagamento e logística. A solução incluiu um design centrado no usuário, recomendações personalizadas baseadas em IA e um checkout otimizado que reduziu o abandono de carrinho em 45%.',
        category: 'ecommerce',
        categoryName: 'E-commerce',
        color: '#e74c3c',
        thumbnail: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a',
        tags: ['E-commerce', 'UI/UX', 'Integração de Sistemas'],
        images: [
          'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a',
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
          'https://images.unsplash.com/photo-1556740738-b6a63e27c4df',
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Shopify API', 'Stripe'],
        challenges: [
          'Integrar 3 sistemas legados diferentes',
          'Manter performance com catálogo de 10.000+ produtos',
          'Criar experiência mobile-first',
          'Implementar checkout em 1 clique'
        ],
        results: [
          { value: '300%', label: 'Aumento nas vendas' },
          { value: '45%', label: 'Redução no abandono' },
          { value: '4.9', label: 'Avaliação dos usuários' },
          { value: '2.1s', label: 'Tempo de carregamento' }
        ],
        testimonial: {
          name: 'Carlos Mendes',
          position: 'Diretor de TI',
          company: 'Moda Elegante Ltda',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          content: 'A plataforma desenvolvida pela equipe superou todas as nossas expectativas. Em apenas 3 meses já vimos um retorno impressionante no investimento, com aumento significativo nas vendas e satisfação dos clientes.'
        }
      },
      {
        id: 2,
        title: 'Aplicativo de Delivery Gourmet',
        subtitle: 'Conectando chefs artesanais a food lovers',
        shortDescription: 'App mobile que revolucionou o mercado de delivery premium',
        description: 'Criamos um aplicativo de delivery premium que conecta chefs independentes a amantes de gastronomia. O app incluiu recursos como: agendamento de entregas, avaliação de chefs, sistema de assinaturas e transmissão ao vivo do preparo dos pratos. A solução foi desenvolvida nativamente para iOS e Android com backend escalável.',
        category: 'mobile',
        categoryName: 'Mobile',
        color: '#9b59b6',
        thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
        tags: ['iOS', 'Android', 'Backend'],
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d',
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
          'https://images.unsplash.com/photo-1546054454-aa26e2b734c7'
        ],
        technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'WebSockets'],
        challenges: [
          'Sincronização em tempo real do status dos pedidos',
          'Integração com múltiplos gateways de pagamento',
          'Geolocalização precisa para entregas',
          'Streaming de vídeo ao vivo'
        ],
        results: [
          { value: '10.000+', label: 'Downloads na 1ª semana' },
          { value: '4.8', label: 'Avaliação nas lojas' },
          { value: '25%', label: 'Taxa de retenção' },
          { value: '1.2M', label: 'Pedidos no 1º ano' }
        ],
        testimonial: {
          name: 'Ana Beatriz',
          position: 'CEO',
          company: 'Chef Express',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          content: 'O aplicativo se tornou o coração do nosso negócio. A qualidade do desenvolvimento e a atenção aos detalhes da experiência do usuário foram fundamentais para nosso sucesso.'
        }
      },
      {
        id: 3,
        title: 'Website Corporativo Premium',
        subtitle: 'Presença digital de alto impacto para empresa global',
        shortDescription: 'Website que elevou a percepção de marca em 60%',
        description: 'Desenvolvemos um website corporativo premium para uma multinacional do setor financeiro, com foco em performance, segurança e experiência do usuário. O projeto incluiu: sistema de gerenciamento de conteúdo personalizado, área para investidores com relatórios interativos, blog corporativo e integração com CRM.',
        category: 'web',
        categoryName: 'Website',
        color: '#3498db',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
        tags: ['Corporate', 'Performance', 'SEO'],
        images: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          'https://images.unsplash.com/photo-1568992687947-868a62a9f521',
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
        ],
        technologies: ['Vue.js', 'Nuxt.js', 'WordPress API', 'AWS', 'GraphQL'],
        challenges: [
          'Atender requisitos rígidos de segurança',
          'Garantir performance global (CDN)',
          'Criar interface acessível',
          'Integrar com 5 sistemas legados'
        ],
        results: [
          { value: '60%', label: 'Aumento na percepção de marca' },
          { value: '98%', label: 'Satisfação dos usuários' },
          { value: '1.5s', label: 'Tempo de carregamento' },
          { value: '40%', label: 'Aumento em leads' }
        ]
      },
      {
        id: 4,
        title: 'Sistema de Gestão Educacional',
        subtitle: 'Plataforma completa para instituições de ensino',
        shortDescription: 'Sistema que automatizou 80% dos processos administrativos',
        description: 'Desenvolvemos uma plataforma de gestão educacional completa que atende desde o controle acadêmico até a comunicação com pais e alunos. O sistema inclui: matrículas online, diário de classe digital, geração de boletins, ambiente virtual de aprendizagem, biblioteca digital e aplicativo móvel para acompanhamento.',
        category: 'web',
        categoryName: 'Sistema Web',
        color: '#1abc9c',
        thumbnail: 'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
        tags: ['SaaS', 'Gestão', 'Educação'],
        images: [
          'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6',
          'https://images.unsplash.com/photo-1588072432836-e10032774350',
          'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f'
        ],
        technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker', 'Redis'],
        challenges: [
          'Lidar com dados sensíveis de menores',
          'Garantir disponibilidade em períodos de pico',
          'Criar relatórios personalizados',
          'Integrar com sistemas governamentais'
        ],
        results: [
          { value: '80%', label: 'Redução em processos manuais' },
          { value: '50+', label: 'Escolas utilizando' },
          { value: '100k', label: 'Usuários ativos' },
          { value: '99.9%', label: 'Disponibilidade' }
        ],
        testimonial: {
          name: 'Roberto Almeida',
          position: 'Diretor',
          company: 'Rede Educar',
          avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
          content: 'O sistema transformou completamente nossa operação, permitindo que focássemos no que realmente importa: a educação dos nossos alunos.'
        }
      },
      {
        id: 5,
        title: 'Identidade Visual Completa',
        subtitle: 'Rebranding para startup de tecnologia',
        shortDescription: 'Nova identidade que aumentou o reconhecimento de marca em 3x',
        description: 'Criamos uma identidade visual completa para uma startup de fintech, incluindo: logo, paleta de cores, tipografia, sistema de ícones, diretrizes de marca e aplicações em diversos materiais. O projeto foi desenvolvido após extensa pesquisa de mercado e criação de personas para garantir que a identidade comunicasse os valores e diferenciais da empresa.',
        category: 'design',
        categoryName: 'Design',
        color: '#e67e22',
        thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d',
        tags: ['Branding', 'Identidade Visual', 'UI/UX'],
        images: [
          'https://images.unsplash.com/photo-1626785774573-4b799315345d',
          'https://images.unsplash.com/photo-1547658719-da2b51169166',
          'https://images.unsplash.com/photo-1551650975-87deedd944c3'
        ],
        technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'After Effects'],
        challenges: [
          'Diferenciar-se em mercado saturado',
          'Criar identidade versátil',
          'Comunicar inovação e segurança',
          'Garantir aplicação consistente'
        ],
        results: [
          { value: '3x', label: 'Reconhecimento de marca' },
          { value: '40%', label: 'Aumento em engajamento' },
          { value: '1º', label: 'Lugar em recall espontâneo' },
          { value: '90%', label: 'Aprovação interna' }
        ]
      },
      {
        id: 6,
        title: 'Campanha de Lançamento Digital',
        subtitle: 'Estratégia 360° para novo produto',
        shortDescription: 'Campanha que gerou 500k em vendas na primeira semana',
        description: 'Desenvolvemos e executamos uma campanha de lançamento digital abrangente para um novo produto de consumo, incluindo: estratégia de conteúdo, criação de landing pages, gestão de mídias sociais, campanhas de performance, influenciadores digitais e automatização de marketing. A campanha utilizou abordagem omnicanal com mensagens personalizadas para cada etapa do funil.',
        category: 'marketing',
        categoryName: 'Marketing',
        color: '#e84393',
        thumbnail: 'https://images.unsplash.com/photo-1556155092-490a1ba16284',
        tags: ['Performance', 'Mídia Paga', 'Conversão'],
        images: [
          'https://images.unsplash.com/photo-1556155092-490a1ba16284',
          'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d',
          'https://images.unsplash.com/photo-1522542550221-31fd19575a2d'
        ],
        technologies: ['Google Ads', 'Facebook Ads', 'HubSpot', 'Google Analytics', 'Hotjar'],
        challenges: [
          'Criar buzz em mercado competitivo',
          'Alcance com orçamento limitado',
          'Mensurar ROI preciso',
          'Testar múltiplas abordagens'
        ],
        results: [
          { value: '500k', label: 'Vendas na 1ª semana' },
          { value: '35%', label: 'Taxa de conversão' },
          { value: '2.1M', label: 'Impressões' },
          { value: '5x', label: 'ROI' }
        ],
        testimonial: {
          name: 'Juliana Santos',
          position: 'CMO',
          company: 'Consumer Brands',
          avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
          content: 'A campanha superou todas as nossas metas e estabeleceu um novo padrão para nossos lançamentos. A abordagem data-driven foi fundamental para otimizarmos os resultados.'
        }
      }
    ]
    
    const testimonials = [
      {
        name: 'Marcelo Vieira',
        position: 'Diretor de Inovação',
        company: 'TechSolutions Inc.',
        avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
        content: 'A agência entregou não apenas um produto final excepcional, mas uma verdadeira parceria estratégica. Nos ajudaram a pensar em soluções que nem imaginávamos possíveis.',
        rating: 5,
        projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
      },
      {
        name: 'Fernanda Oliveira',
        position: 'CEO',
        company: 'StartUp Ventures',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        content: 'Nosso aplicativo superou 1 milhão de downloads em 3 meses graças ao trabalho incrível da equipe. A atenção aos detalhes da experiência do usuário fez toda a diferença.',
        rating: 5,
        projectImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
      },
      {
        name: 'Ricardo Mendes',
        position: 'Diretor de Marketing',
        company: 'Global Brands',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
        content: 'A campanha digital desenvolvida pela equipe gerou um ROI 8 vezes maior que nossas campanhas anteriores. Simplesmente impressionante!',
        rating: 4,
        projectImage: 'https://images.unsplash.com/photo-1556155092-490a1ba16284'
      },
      {
        name: 'Patrícia Silva',
        position: 'Gerente de Produto',
        company: 'FinTech Innovations',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        content: 'O redesign da nossa plataforma reduziu a taxa de rejeição em 60% e aumentou a satisfação dos nossos clientes. A abordagem centrada no usuário foi fundamental.',
        rating: 5,
        projectImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166'
      }
    ]
    
    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') return projects
      return projects.filter(project => project.category === activeFilter.value)
    })
    
    const openProjectModal = (project) => {
      selectedProject.value = project
      mainImageIndex.value = 0
      document.body.style.overflow = 'hidden'
    }
    
    const closeProjectModal = () => {
      selectedProject.value = null
      document.body.style.overflow = 'auto'
    }
    
    const setMainImage = (index) => {
      mainImageIndex.value = index
    }
    
    const prevSlide = () => {
      currentSlide.value = (currentSlide.value - 1 + testimonials.length) % testimonials.length
    }
    
    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % testimonials.length
    }
    
    const openContactModal = () => {
      // Implementar abertura do modal de contato
      router.push('/contato')
    }
    
    const scrollToServices = () => {
      // Implementar scroll para seção de serviços
      router.push('/servicos')
    }
    
    const getTechIcon = (tech) => {
      const icons = {
        'React': 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
        'Node.js': 'https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg',
        'MongoDB': 'https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg',
        'Shopify API': 'https://cdn.worldvectorlogo.com/logos/shopify.svg',
        'Stripe': 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
        'React Native': 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
        'Firebase': 'https://cdn.worldvectorlogo.com/logos/firebase-1.svg',
        'WebSockets': 'https://cdn.worldvectorlogo.com/logos/websocket.svg',
        'Vue.js': 'https://cdn.worldvectorlogo.com/logos/vue-9.svg',
        'Nuxt.js': 'https://cdn.worldvectorlogo.com/logos/nuxt-2.svg',
        'WordPress API': 'https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg',
        'AWS': 'https://cdn.worldvectorlogo.com/logos/aws-2.svg',
        'GraphQL': 'https://cdn.worldvectorlogo.com/logos/graphql-logo-2.svg',
        'Angular': 'https://cdn.worldvectorlogo.com/logos/angular-icon-1.svg',
        'NestJS': 'https://cdn.worldvectorlogo.com/logos/nestjs.svg',
        'PostgreSQL': 'https://cdn.worldvectorlogo.com/logos/postgresql.svg',
        'Docker': 'https://cdn.worldvectorlogo.com/logos/docker.svg',
        'Redis': 'https://cdn.worldvectorlogo.com/logos/redis.svg',
        'Adobe Illustrator': 'https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg',
        'Photoshop': 'https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg',
        'Figma': 'https://cdn.worldvectorlogo.com/logos/figma-1.svg',
        'After Effects': 'https://cdn.worldvectorlogo.com/logos/adobe-after-effects-cc-icon.svg',
        'Google Ads': 'https://cdn.worldvectorlogo.com/logos/google-ads-1.svg',
        'Facebook Ads': 'https://cdn.worldvectorlogo.com/logos/facebook-4.svg',
        'HubSpot': 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg',
        'Google Analytics': 'https://cdn.worldvectorlogo.com/logos/google-analytics-3.svg',
        'Hotjar': 'https://cdn.worldvectorlogo.com/logos/hotjar.svg'
      }
      return icons[tech] || 'https://cdn.worldvectorlogo.com/logos/javascript-1.svg'
    }
    
    // Animação dos contadores
    onMounted(() => {
      const animateCounter = (element, target, duration = 2000) => {
        const start = 0
        const increment = target / (duration / 16)
        let current = start
        const timer = setInterval(() => {
          current += increment
          if (current >= target) {
            clearInterval(timer)
            current = target
          }
          element.textContent = Math.floor(current).toLocaleString()
        }, 16)
      }
      
      setTimeout(() => {
        if (clientCounter.value) animateCounter(clientCounter.value, 150)
        if (projectCounter.value) animateCounter(projectCounter.value, 320)
        if (experienceCounter.value) animateCounter(experienceCounter.value, 8)
        if (conversionCounter.value) animateCounter(conversionCounter.value, 75)
      }, 500)
    })
    
    return {
  categories,
  projects,
  testimonials,
  activeFilter,
  currentSlide,
  selectedProject,
  mainImageIndex,
  filteredProjects,
  clientCounter,
  projectCounter,
  experienceCounter,
  conversionCounter,
  openProjectModal,
  closeProjectModal,
  setMainImage,
  prevSlide,
  nextSlide,
  openContactModal,
  scrollToServices,
  getTechIcon
}
  }
}
</script>
<style scoped>
:root {
  --background-color: #ffffff;
  --background-secondary: #f8fafc;
  --text-color: #1e293b;
  --text-secondary: #64748b;
  --accent-color: #3b82f6;
  --secondary-accent: #6366f1;
  --accent-dark: #2563eb;
  --border-color: #e2e8f0;
  --tag-background: #e0f2fe;
  --tag-text: #0369a1;
}
.portfolio-page {
  font-family: 'Inter', sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
}

/* Hero Section */
.portfolio-hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 0 5%;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
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
  background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.pulse-dot {
  position: absolute;
  right: -15px;
  bottom: 15px;
  width: 10px;
  height: 10px;
  background-color: var(--accent-color);
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.scroll-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s;
}

.scroll-indicator:hover {
  color: var(--accent-color);
}

.scroll-indicator svg {
  animation: bounce 2s infinite;
}

.hero-background {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(40px);
}

.shape-1 {
  width: 300px;
  height: 300px;
  background-color: var(--color);
  top: 20%;
  left: 30%;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background-color: var(--color);
  top: 50%;
  left: 50%;
  animation: float 6s ease-in-out infinite reverse;
}

.shape-3 {
  width: 250px;
  height: 250px;
  background-color: var(--color);
  top: 30%;
  left: 70%;
  animation: float 10s ease-in-out infinite;
}

.shape-4 {
  width: 180px;
  height: 180px;
  background-color: var(--color);
  bottom: 20%;
  left: 60%;
  animation: float 7s ease-in-out infinite reverse;
}

/* Portfolio Filter */
.portfolio-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  padding: 2rem 5%;
  background-color: var(--background-secondary);
}

.filter-button {
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-button:hover {
  color: var(--accent-color);
  border-color: var(--accent-color);
}

.filter-button.active {
  background-color: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

/* Portfolio Grid */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 5%;
}

.portfolio-item {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.portfolio-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.item-image {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.portfolio-item:hover .item-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .image-overlay {
  opacity: 1;
}

.item-info {
  padding: 1.5rem;
  background-color: var(--background-secondary);
}

.item-info h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}

.item-info p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item-tags span {
  background-color: var(--tag-background);
  color: var(--tag-text);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;
}

.item-hover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  z-index: 2;
}

.portfolio-item:hover .item-hover-content {
  transform: translateY(0);
}

.item-hover-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.view-project-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-project-button:hover {
  background-color: var(--accent-dark);
}

/* Stats Section */
.portfolio-stats {
  padding: 5rem 5%;
  background-color: var(--background-secondary);
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background-color: var(--background-color);
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 1rem;
}

/* Testimonials */
.testimonials-section {
  padding: 5rem 5%;
}

.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.3;
}

.testimonials-slider {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.slider-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  min-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background-color: var(--background-secondary);
  border-radius: 16px;
  padding: 3rem;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.client-position {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.testimonial-content {
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -20px;
  left: -20px;
  opacity: 0.2;
}

.testimonial-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.client-rating {
  display: flex;
  gap: 0.25rem;
}

.project-preview {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.slider-button:hover {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.slider-button.prev {
  left: 20px;
}

.slider-button.next {
  right: 20px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--border-color);
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  background-color: var(--accent-color);
  transform: scale(1.2);
}

/* CTA Section */
.portfolio-cta {
  padding: 6rem 5%;
  background: linear-gradient(135deg, var(--accent-color), var(--secondary-accent));
  color: white;
  text-align: center;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
}

.portfolio-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.portfolio-cta p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-button {
  background-color: white;
  color: var(--accent-color);
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.primary-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.secondary-button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
}

.modal-content {
  position: relative;
  background-color: var(--background-color);
  border-radius: 16px;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 3rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.close-modal {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: var(--accent-color);
}

.modal-header {
  margin-bottom: 2rem;
}

.project-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.project-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.project-gallery {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.main-image {
  border-radius: 12px;
  overflow: hidden;
  height: 500px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.thumbnail-item {
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  height: calc((500px - 2rem) / 3);
  transition: transform 0.3s ease;
}

.thumbnail-item:hover {
  transform: scale(1.02);
}

.thumbnail-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
}

.details-column h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.details-column h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--accent-color);
}

.details-column p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.challenges-list {
  list-style: none;
  padding: 0;
}

.challenges-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--background-secondary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.tech-item img {
  width: 20px;
  height: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.result-item {
  background-color: var(--background-secondary);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
}

.result-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.25rem;
}

.result-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.project-testimonial {
  background-color: var(--background-secondary);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
}

.testimonial-content {
  position: relative;
}

.modal-footer {
  text-align: center;
}

.cta-button {
  background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Animations */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-background {
    width: 40%;
    opacity: 0.3;
  }
  
  .testimonial-card {
    grid-template-columns: 1fr;
  }
  
  .project-gallery {
    grid-template-columns: 1fr;
  }
  
  .thumbnail-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .portfolio-hero {
    min-height: auto;
    padding: 8rem 5% 4rem;
  }
  
  .hero-background {
    display: none;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .project-details {
    grid-template-columns: 1fr;
  }
  
  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
  
  .modal-content {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 576px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .thumbnail-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>