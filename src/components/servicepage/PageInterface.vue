<template>
  <div class="branding-page">
      <!-- Hero Section Imersivo -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line">Identidade Visual</span>
          <span class="title-line highlight">que <span class="pulse-text">Cativa</span> & <span class="rotate-text">Diferencia</span></span>
        </h1>
        <p class="hero-subtitle">Sua marca não é apenas um logo - é uma experiência emocional memorável</p>
        <div class="cta-container">
          <button class="cta-button" @click="scrollToProcess">Quero minha Identidade Visual</button>
          <div class="trust-badges">
            <div class="badge">
              <span>+150</span>
              <small>Marcas Transformadas</small>
            </div>
            <div class="badge">
              <span>100%</span>
              <small>Briefing Estratégico</small>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="brand-morph">
          <!-- Ícones via API do Iconify -->
          <div class="morph-item" style="top: 10%; left: 5%; --delay: 0s">
            <img src="https://api.iconify.design/mdi:brush.svg" alt="Logo" class="morph-icon" />
            <span class="morph-name">Logo</span>
          </div>
          <div class="morph-item" style="top: 60%; left: 15%; --delay: 0.2s">
            <img src="https://api.iconify.design/mdi:palette.svg" alt="Cores" class="morph-icon" />
            <span class="morph-name">Cores</span>
          </div>
          <div class="morph-item" style="top: 30%; left: 30%; --delay: 0.4s">
            <img src="https://api.iconify.design/mdi:format-letter-matches.svg" alt="Tipografia" class="morph-icon" />
            <span class="morph-name">Tipografia</span>
          </div>
          <div class="morph-item" style="top: 70%; left: 50%; --delay: 0.6s">
            <img src="https://api.iconify.design/mdi:camera.svg" alt="Fotografia" class="morph-icon" />
            <span class="morph-name">Fotografia</span>
          </div>
          <div class="morph-item" style="top: 20%; left: 65%; --delay: 0.8s">
            <img src="https://api.iconify.design/mdi:star-shooting.svg" alt="Ícones" class="morph-icon" />
            <span class="morph-name">Ícones</span>
          </div>
          <div class="morph-item" style="top: 50%; left: 80%; --delay: 1s">
            <img src="https://api.iconify.design/mdi:puzzle.svg" alt="Patterns" class="morph-icon" />
            <span class="morph-name">Patterns</span>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Explore o Processo</span>
      <div class="arrow"></div>
    </div>
  </section>

    <!-- O Que Inclui - Mega Lista -->
    <section class="includes-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-part">Tudo que sua</span>
          <span class="title-part highlight">Marca Precisa</span>
        </h2>
        <p class="section-subtitle">Componentes completos de branding para posicionamento dominante</p>
        
        <div class="includes-grid">
          <div class="include-category" v-for="(category, index) in includes" :key="index">
            <h3 class="category-title">
              <span class="category-icon">{{ category.icon }}</span>
              {{ category.title }}
            </h3>
            <ul class="features-list">
              <li v-for="(item, i) in category.items" :key="i">
                <span class="feature-check">✓</span>
                <span class="feature-text">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Processo Criativo - Timeline Interativa -->
    <section class="process-section" id="process">
      <div class="container">
        <h2 class="section-title">
          <span class="title-part">Processo de</span>
          <span class="title-part highlight">Criação</span>
        </h2>
        <p class="section-subtitle">Metodologia comprovada para marcas memoráveis</p>
        
        <div class="process-timeline">
          <div 
            class="process-step" 
            v-for="(step, index) in processSteps" 
            :key="index"
            @mouseenter="activeStep = index"
            @mouseleave="activeStep = null"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="step-visual" v-if="activeStep === index">
                <img :src="step.visual" :alt="step.title" class="visual-image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Portfolio de Marcas - Carrossel -->
    <section class="portfolio-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-part">Marcas que</span>
          <span class="title-part highlight">Inspiram</span>
        </h2>
        <p class="section-subtitle">Identidades visuais que revolucionaram negócios</p>
        
        <div class="portfolio-carousel">
          <div 
            class="portfolio-item" 
            v-for="(item, index) in portfolioItems" 
            :key="index"
            :style="{ '--hue': item.colorHue }"
          >
            <div class="brand-preview">
              <div class="brand-logo">
                <img :src="item.logo" :alt="item.client + ' logo'">
              </div>
              <div class="brand-applications">
                <img 
                  v-for="(app, i) in item.applications" 
                  :key="i"
                  :src="app" 
                  :alt="'Aplicação ' + (i+1) + ' para ' + item.client"
                  class="application-image"
                >
              </div>
            </div>
            <div class="brand-info">
              <h3>{{ item.client }}</h3>
              <span class="industry">{{ item.industry }}</span>
              <div class="brand-stats">
                <div class="stat">
                  <span class="stat-value">{{ item.stats.growth }}x</span>
                  <span class="stat-label">Crescimento</span>
                </div>
                <div class="stat">
                  <span class="stat-value">{{ item.stats.recognition }}%</span>
                  <span class="stat-label">Reconhecimento</span>
                </div>
              </div>
              <div class="brand-features">
                <span v-for="(feature, fIndex) in item.features" :key="fIndex">
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Níveis de Branding - Tabs -->
    <section class="levels-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-part">Solução Completa</span>
          <span class="title-part highlight">para cada Fase</span>
        </h2>
        <p class="section-subtitle">Do essencial ao branding corporativo premium</p>
        
        <div class="tabs-container">
          <div class="tabs-header">
            <button 
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="activeTab = tab.id"
              :class="{ active: activeTab === tab.id }"
            >
              {{ tab.label }}
            </button>
          </div>
          <div class="tabs-content">
            <div class="tab-panel" v-for="(tab, index) in tabs" :key="index" v-show="activeTab === tab.id">
              <div class="tab-visual">
                <img :src="tab.visual" :alt="tab.label">
              </div>
              <div class="tab-info">
                <h3>{{ tab.title }}</h3>
                <p class="tab-description">{{ tab.description }}</p>
                <ul class="tab-features">
                  <li v-for="(feature, fIndex) in tab.features" :key="fIndex">
                    <span class="feature-icon">✓</span>
                    <span class="feature-text">{{ feature }}</span>
                  </li>
                </ul>
                <div class="tab-price">
                  <span class="price">{{ tab.price }}</span>
                  <span class="time">{{ tab.time }}</span>
                </div>
                <button class="tab-button">Quero este Pacote</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Branding Elements - Showcase Interativo -->
    <section class="elements-section">
      <div class="container">
        <h2 class="section-title">
          <span class="title-part">Elementos de</span>
          <span class="title-part highlight">Identidade Visual</span>
        </h2>
        
        <div class="elements-showcase">
          <div class="element-card" v-for="(element, index) in brandingElements" :key="index">
            <div class="element-preview" :style="{ 'background': element.bgColor }">
              <img :src="element.image" :alt="element.title" class="element-image">
            </div>
            <div class="element-info">
              <h3>{{ element.title }}</h3>
              <p>{{ element.description }}</p>
              <div class="element-importance">
                <span>Importância:</span>
                <div class="importance-bar" :style="{ width: element.importance + '%' }"></div>
                <span class="importance-value">{{ element.importance }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final - Personalizado -->
    <section class="final-cta">
      <div class="cta-container">
        <div class="cta-visual">
          <div class="brand-sphere"></div>
        </div>
        <div class="cta-content">
          <h2>Pronto para <span class="highlight">transformar</span> sua marca?</h2>
          <p>Solicite um briefing criativo gratuito e receba uma proposta personalizada</p>
          <form class="cta-form">
            <input type="text" placeholder="Seu nome">
            <input type="email" placeholder="Seu melhor e-mail">
            <button type="submit">Quero minha Identidade Visual</button>
          </form>
          <div class="guarantee">
            <span>✅ Briefing 100% estratégico</span>
            <span>✅ 3 conceitos iniciais</span>
            <span>✅ Garantia de satisfação</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'BrandingPage',
  data() {
    return {
      activeStep: null,
      activeTab: 'basic',
      morphItems: [
        { name: 'Logo', icon: '🖋️', style: { top: '10%', left: '5%', '--delay': '0s' } },
        { name: 'Cores', icon: '🎨', style: { top: '60%', left: '15%', '--delay': '0.2s' } },
        { name: 'Tipografia', icon: '🔤', style: { top: '30%', left: '30%', '--delay': '0.4s' } },
        { name: 'Fotografia', icon: '📸', style: { top: '70%', left: '50%', '--delay': '0.6s' } },
        { name: 'Ícones', icon: '✨', style: { top: '20%', left: '65%', '--delay': '0.8s' } },
        { name: 'Patterns', icon: '🧩', style: { top: '50%', left: '80%', '--delay': '1s' } }
      ],
      includes: [
        {
          icon: '🆔',
          title: 'Identidade Primária',
          items: [
            'Design de Logo Principal',
            'Versões Alternativas',
            'Favicon & App Icon',
            'Área de Proteção',
            'Uso em Fundos Claros/Escuros',
            'Sistema de Redução'
          ]
        },
        {
          icon: '🎨',
          title: 'Sistema de Cores',
          items: [
            'Paleta Primária (3-5 cores)',
            'Paleta Secundária',
            'Gradientes Autorais',
            'Cores para Dark Mode',
            'Combinações Aprovadas',
            'Guia de Aplicação'
          ]
        },
        {
          icon: '🖋️',
          title: 'Tipografia',
          items: [
            'Família Primária (1-2 fontes)',
            'Hierarquia Tipográfica',
            'Web Fonts Configuradas',
            'Fallback Fonts',
            'Espaçamento e Leading',
            'Sistema de Escala'
          ]
        },
        {
          icon: '📸',
          title: 'Diretrizes de Imagem',
          items: [
            'Estilo Fotográfico',
            'Direção de Arte',
            'Tratamento de Imagem',
            'Biblioteca de Referência',
            'Ilustrações Customizadas',
            'Ícones Exclusivos'
          ]
        },
        {
          icon: '🧩',
          title: 'Elementos Gráficos',
          items: [
            'Patterns Exclusivos',
            'Texturas Autorais',
            'Formas e Elementos',
            'Sistema de Grid',
            'Efeitos Visuais',
            'Animação Básica'
          ]
        },
        {
          icon: '📱',
          title: 'Aplicações Práticas',
          items: [
            'Templates para Redes Sociais',
            'Apresentações Corporativas',
            'Material Institucional',
            'Uniforme e Sinalização',
            'Embalagens e Produtos',
            'Merchandising'
          ]
        }
      ],
      processSteps: [
        {
          title: 'Descoberta da Marca',
          description: 'Workshop estratégico para extrair essência, valores e público-alvo',
          visual: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          title: 'Pesquisa e Análise',
          description: 'Benchmarking de concorrentes e tendências de mercado',
          visual: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          title: 'Conceituação',
          description: 'Desenvolvimento de 3 direções criativas distintas',
          visual: 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          title: 'Design e Refinamento',
          description: 'Criação do sistema visual e aplicações práticas',
          visual: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
          title: 'Manual da Marca',
          description: 'Documentação completa com diretrizes de aplicação',
          visual: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
      ],
      portfolioItems: [
        {
          client: "Urban Café",
          industry: "Gastronomia",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Urban+Café",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Embalagem",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Site",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Uniforme"
          ],
          colorHue: 30,
          stats: {
            growth: 3.2,
            recognition: 87
          },
          features: [
            "Logo Responsivo",
            "Paleta Terrosa",
            "Tipografia Orgânica"
          ]
        },
        {
          client: "Nexus Tech",
          industry: "Tecnologia",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Nexus+Tech",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=App",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Apresentação",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Office"
          ],
          colorHue: 220,
          stats: {
            growth: 4.5,
            recognition: 92
          },
          features: [
            "Sistema Modular",
            "Gradientes Digitais",
            "Ícones Pixel-Perfect"
          ]
        },
        {
          client: "Viva Verde",
          industry: "Sustentabilidade",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Viva+Verde",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Embalagem",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Social+Media",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Sinalização"
          ],
          colorHue: 140,
          stats: {
            growth: 2.8,
            recognition: 95
          },
          features: [
            "Ilustrações Manuais",
            "Texturas Naturais",
            "Fotografia Autoral"
          ]
        }
      ],
      tabs: [
        {
          id: 'basic',
          label: 'Branding Essencial',
          title: 'Identidade Visual Básica',
          description: 'Tudo que você precisa para lançar sua marca com personalidade',
          visual: 'https://via.placeholder.com/500x400/f1f5f9/64748b?text=Essencial',
          features: [
            'Logo Principal + 2 Alternativas',
            'Paleta de Cores (3 primárias + 2 secundárias)',
            '1 Família Tipográfica',
            'Diretrizes Básicas de Aplicação',
            'Favicon e Ícone de App',
            '5 Templates para Redes Sociais'
          ],
          price: 'R$ 4.900',
          time: '3-4 semanas'
        },
        {
          id: 'complete',
          label: 'Branding Completo',
          title: 'Sistema de Identidade Visual',
          description: 'Solução abrangente para marcas que querem dominar seu mercado',
          visual: 'https://via.placeholder.com/500x400/f1f5f9/64748b?text=Completo',
          features: [
            'Tudo do Pacote Essencial +',
            'Sistema de Ícones Customizados',
            '2 Famílias Tipográficas (Display e Texto)',
            'Patterns e Elementos Gráficos Exclusivos',
            'Diretrizes de Fotografia e Ilustração',
            'Manual da Marca Digital (50+ páginas)',
            '20 Templates para Mídias Sociais'
          ],
          price: 'R$ 9.900',
          time: '6-8 semanas'
        },
        {
          id: 'premium',
          label: 'Branding Corporativo',
          title: 'Identidade Visual Premium',
          description: 'Experiência completa para marcas que exigem excelência absoluta',
          visual: 'https://via.placeholder.com/500x400/f1f5f9/64748b?text=Premium',
          features: [
            'Tudo do Pacote Completo +',
            'Workshop de Branding Presencial',
            'Sistema 3D e Motion Design',
            'Fotografia Profissional (1 dia de ensaio)',
            'Ilustrações Completamente Exclusivas',
            'Aplicações em Produtos Físicos',
            'Treinamento para Equipe Interna',
            'Consultoria de 3 meses'
          ],
          price: 'R$ 19.900+',
          time: '10-12 semanas'
        }
      ],
      brandingElements: [
        {
          title: 'Logo Design',
          description: 'Símbolo único que encapsula a essência da sua marca',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Logo+Design',
          bgColor: '#f1f5f9',
          importance: 95
        },
        {
          title: 'Sistema de Cores',
          description: 'Paleta estratégica que evoca as emoções certas',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Color+System',
          bgColor: '#e0f2fe',
          importance: 90
        },
        {
          title: 'Tipografia',
          description: 'Fontes que dão voz e personalidade à sua marca',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Typography',
          bgColor: '#ecfdf5',
          importance: 85
        },
        {
          title: 'Fotografia',
          description: 'Estilo visual consistente em todas as imagens',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Photography',
          bgColor: '#fef2f2',
          importance: 80
        },
        {
          title: 'Elementos Gráficos',
          description: 'Padrões, ícones e texturas que complementam a identidade',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Graphics',
          bgColor: '#f5f3ff',
          importance: 75
        },
        {
          title: 'Tom de Voz',
          description: 'Personalidade verbal que reforça sua identidade visual',
          image: 'https://via.placeholder.com/300x200/f1f5f9/64748b?text=Tone+of+Voice',
          bgColor: '#fffbeb',
          importance: 70
        }
      ]
    }
  },
  methods: {
    scrollToProcess() {
      document.getElementById('process').scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
/* Estilos Base */
.branding-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}


/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 0 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.1) 0%, transparent 30%),
    radial-gradient(circle at 80% 70%, rgba(79, 70, 229, 0.1) 0%, transparent 30%);
}

.hero-content {
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
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(251, 191, 36, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-text {
  animation: pulse 2s infinite;
}

.rotate-text {
  display: inline-block;
  animation: rotateWords 8s infinite;
}

@keyframes rotateWords {
  0%, 20% { opacity: 1; transform: translateY(0); }
  25%, 45% { opacity: 0; transform: translateY(-20px); }
  50%, 70% { opacity: 1; transform: translateY(0); }
  75%, 95% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
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
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-button {
  background: #fbbf24;
  color: #1e293b;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  position: relative;
  overflow: hidden;
}

.cta-button:hover {
  background: #f59e0b;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
}

.trust-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.badge span {
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  background: linear-gradient(90deg, #fbbf24, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge small {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.brand-morph {
  position: relative;
  width: 100%;
  height: 100%;
}

.morph-item {
  position: absolute;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  animation: float 5s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.morph-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.morph-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}


/* ... (mantenha todos os outros estilos anteriores) ... */

.morph-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 0.5rem;
  filter: invert(26%) sepia(89%) saturate(1550%) hue-rotate(230deg) brightness(95%) contrast(90%);
}

/* Includes Section */
.includes-section {
  padding: 6rem 0;
  background: white;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
}

.includes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.include-category {
  background: #f8fafc;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.include-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-icon {
  background: #4f46e5;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.features-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.features-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-check {
  color: #4f46e5;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-text {
  color: #475569;
}

/* Process Section */
.process-section {
  padding: 6rem 0;
  background: #f8fafc;
}

.process-timeline {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.process-timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 25px;
  width: 2px;
  background: #cbd5e1;
  z-index: 1;
}

.process-step {
  display: flex;
  gap: 2rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  padding-top: 0.5rem;
}

.step-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.step-content p {
  color: #64748b;
  margin-bottom: 1rem;
}

.step-visual {
  height: 200px;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease;
}

.process-step:hover .step-visual {
  opacity: 1;
  transform: translateY(0);
}

.visual-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Portfolio Section */
.portfolio-section {
  padding: 6rem 0;
  background: white;
}

.portfolio-carousel {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 2rem;
  -webkit-overflow-scrolling: touch;
}

.portfolio-item {
  min-width: 350px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.15);
}

.brand-preview {
  height: 250px;
  position: relative;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.brand-logo {
  margin-bottom: 2rem;
  z-index: 2;
}

.brand-logo img {
  max-width: 200px;
  max-height: 80px;
  object-fit: contain;
}

.brand-applications {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  overflow: hidden;
  height: 100px;
}

.application-image {
  flex: 1;
  object-fit: cover;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.application-image:hover {
  opacity: 1;
  transform: scale(1.05);
}

.brand-info {
  padding: 1.5rem;
}

.brand-info h3 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
  color: #1e293b;
}

.industry {
  color: #64748b;
  font-size: 0.9rem;
  display: block;
  margin-bottom: 1.5rem;
}

.brand-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: hsl(var(--hue), 80%, 50%);
  display: block;
}

.stat-label {
  font-size: 0.8rem;
  color: #64748b;
}

.brand-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.brand-features span {
  background: #f1f5f9;
  color: hsl(var(--hue), 80%, 40%);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Levels Section */
.levels-section {
  padding: 6rem 0;
  background: #f8fafc;
}

.tabs-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
}

.tabs-header button {
  flex: 1;
  padding: 1.5rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tabs-header button:hover {
  color: #4f46e5;
}

.tabs-header button.active {
  color: #4f46e5;
}

.tabs-header button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 3px;
  background: #4f46e5;
}

.tabs-content {
  padding: 2rem;
}

.tab-panel {
  display: flex;
  gap: 3rem;
}

.tab-visual {
  flex: 1;
  min-height: 400px;
  background: #f8fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-visual img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.tab-info {
  flex: 1;
}

.tab-info h3 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.tab-description {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.tab-features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.tab-features li {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.feature-icon {
  color: #4f46e5;
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-text {
  color: #475569;
}

.tab-price {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.price {
  font-size: 2rem;
  font-weight: 800;
  color: #4f46e5;
}

.time {
  color: #64748b;
  font-size: 0.9rem;
}

.tab-button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

/* Elements Section */
.elements-section {
  padding: 6rem 0;
  background: white;
}

.elements-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.element-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.element-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.15);
}

.element-preview {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.element-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.element-info {
  padding: 1.5rem;
}

.element-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.element-info p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.element-importance {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
}

.importance-bar {
  flex: 1;
  height: 6px;
  background: #4f46e5;
  border-radius: 3px;
}

.importance-value {
  font-weight: 600;
  color: #4f46e5;
}

/* Final CTA */
.final-cta {
  padding: 6rem 0;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.cta-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.brand-sphere {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(251, 191, 36, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.cta-content {
  flex: 1;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #fbbf24;
}

.cta-content p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.cta-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.cta-form input {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.cta-form button {
  background: #fbbf24;
  color: #1e293b;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.cta-form button:hover {
  background: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(251, 191, 36, 0.3);
}

.guarantee {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}

.guarantee span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-visual {
    margin-top: 3rem;
  }
  
  .tab-panel {
    flex-direction: column;
  }
  
  .cta-container {
    flex-direction: column;
    text-align: center;
  }
  
  .cta-form {
    margin: 0 auto;
  }
  
  .guarantee {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .includes-grid {
    grid-template-columns: 1fr;
  }
  
  .portfolio-carousel {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  
  .tabs-header {
    flex-direction: column;
  }
  
  .tabs-header button {
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .tabs-header button.active::after {
    display: none;
  }
  /* Responsividade */
@media (max-width: 768px) {
  .morph-icon {
    width: 24px;
    height: 24px;
  }
}
}
</style>