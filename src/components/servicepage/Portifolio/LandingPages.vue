<template>
    <div class="landing-page">
      <!-- Hero Section with Animation -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              <span class="title-part">Landing Pages</span>
              <span class="title-part highlight">que <span class="conversion-text">Convertem</span></span>
            </h1>
            <p class="hero-subtitle">Design persuasivo + Copywriting estratégico = Mais clientes para seu negócio</p>
            <div class="cta-container">
              <button class="cta-button pulse" @click="scrollToPortfolio">Ver Resultados</button>
              <div class="trust-badges">
                <div class="badge">
                  <span>+200</span>
                  <small>Landings Criadas</small>
                </div>
                <div class="badge">
                  <span>+85%</span>
                  <small>Conversão Média</small>
                </div>
              </div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="device-mockup">
              <div class="screen">
                <div class="landing-preview">
                  <div class="preview-header">
                    <h3>Transforme visitantes em clientes</h3>
                    <button class="preview-cta">Quero Saber Mais</button>
                  </div>
                  <div class="preview-stats">
                    <div class="stat">
                      <div class="stat-value">+350%</div>
                      <div class="stat-label">Aumento na Conversão</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll-indicator">
          <span>Scroll Down</span>
          <div class="arrow"></div>
        </div>
      </section>
  
      <!-- Conversion Stats -->
      <section class="stats-section">
        <div class="stat-item">
          <div class="stat-number" v-counter="98">0</div>
          <div class="stat-title">Taxa de Aceitação</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" v-counter="42">0</div>
          <div class="stat-title">Dias Prazo Médio</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" v-counter="3.5">0</div>
          <div class="stat-title">ROI Médio</div>
        </div>
      </section>
  
      <!-- Why Landing Pages -->
      <section class="why-section">
        <h2 class="section-title">Por que investir em uma Landing Page profissional?</h2>
        <p class="section-subtitle">A diferença entre uma página comum e uma landing otimizada pode significar centenas de clientes a mais</p>
        
        <div class="comparison">
          <div class="comparison-before">
            <h3>Sem Landing Page</h3>
            <ul class="negative-list">
              <li>Visitantes não convertem</li>
              <li>Mensagem confusa</li>
              <li>Design não persuasivo</li>
              <li>Falta de chamadas claras</li>
              <li>Baixo retorno em anúncios</li>
            </ul>
          </div>
          <div class="comparison-arrow">→</div>
          <div class="comparison-after">
            <h3>Com Nossa Landing</h3>
            <ul class="positive-list">
              <li>Alta taxa de conversão</li>
              <li>Copywriting estratégico</li>
              <li>Design focado em conversão</li>
              <li>CTAs otimizados</li>
              <li>Maximiza ROI de campanhas</li>
            </ul>
          </div>
        </div>
      </section>
  
      <!-- Portfolio Showcase -->
      <section class="portfolio-section" id="portfolio">
        <h2 class="section-title">Landings que Entregam Resultados</h2>
        <p class="section-subtitle">Alguns exemplos reais com métricas comprovadas</p>
        
        <div class="portfolio-grid">
          <div class="portfolio-item" v-for="(project, index) in portfolio" :key="index">
            <div class="portfolio-visual">
              <div class="device-frame">
                <img :src="project.image" :alt="project.title" class="portfolio-image">
              </div>
              <div class="portfolio-results">
                <div class="result" v-for="(result, rIndex) in project.results" :key="rIndex">
                  <div class="result-value">{{ result.value }}</div>
                  <div class="result-label">{{ result.label }}</div>
                </div>
              </div>
            </div>
            <div class="portfolio-details">
              <h3>{{ project.title }}</h3>
              <div class="industry-tag">{{ project.industry }}</div>
              <p>{{ project.description }}</p>
              <div class="features">
                <div class="feature" v-for="(feature, fIndex) in project.features" :key="fIndex">
                  <span class="feature-icon">✓</span>
                  <span class="feature-text">{{ feature }}</span>
                </div>
              </div>
              <a :href="project.link" class="view-button" target="_blank">Ver Landing Page</a>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Conversion Elements -->
      <section class="elements-section">
        <h2 class="section-title">Elementos de Alta Conversão</h2>
        <p class="section-subtitle">Cada detalhe é projetado para maximizar suas conversões</p>
        
        <div class="elements-grid">
          <div class="element-card" v-for="(element, index) in conversionElements" :key="index">
            <div class="element-icon">{{ element.icon }}</div>
            <h3>{{ element.title }}</h3>
            <p>{{ element.description }}</p>
            <div class="element-impact">
              <span>Impacto na conversão:</span>
              <div class="impact-bar" :style="{ width: element.impact + '%' }"></div>
              <span class="impact-value">{{ element.impact }}%</span>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Process Section -->
      <section class="process-section">
        <h2 class="section-title">Nosso Processo de Criação</h2>
        <p class="section-subtitle">Metodologia comprovada para landings de alto desempenho</p>
        
        <div class="process-timeline">
          <div class="process-step" v-for="(step, index) in processSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Pricing Section -->
      <section class="pricing-section">
        <h2 class="section-title">Investimento</h2>
        <p class="section-subtitle">Soluções para diferentes necessidades de conversão</p>
        
        <div class="pricing-tabs">
          <button class="tab-button" :class="{ active: activeTab === 'single' }" @click="activeTab = 'single'">Landing Única</button>
          <button class="tab-button" :class="{ active: activeTab === 'multi' }" @click="activeTab = 'multi'">Pacote de Landings</button>
        </div>
        
        <div class="pricing-grid">
          <div class="pricing-card" v-for="(plan, index) in pricingPlans[activeTab]" :key="index" :class="{ featured: plan.featured }">
            <div class="popular-tag" v-if="plan.featured">MAIS POPULAR</div>
            <h3>{{ plan.name }}</h3>
            <div class="price">{{ plan.price }}</div>
            <div class="price-desc">{{ plan.description }}</div>
            <ul class="features">
              <li v-for="(feature, fIndex) in plan.features" :key="fIndex">{{ feature }}</li>
            </ul>
            <button class="buy-button">Quero este</button>
            <div class="conversion-badge">
              <span>Conversão média:</span>
              <strong>{{ plan.conversion }}%</strong>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Testimonials -->
      <section class="testimonials-section">
        <h2 class="section-title">O que nossos clientes dizem</h2>
        <p class="section-subtitle">Resultados reais de negócios reais</p>
        
        <div class="testimonials-slider">
          <div class="testimonial" v-for="(testimonial, index) in testimonials" :key="index">
            <div class="testimonial-content">
              <div class="quote">"{{ testimonial.quote }}"</div>
              <div class="metrics">
                <div class="metric" v-for="(metric, mIndex) in testimonial.metrics" :key="mIndex">
                  <span class="metric-value">{{ metric.value }}</span>
                  <span class="metric-label">{{ metric.label }}</span>
                </div>
              </div>
            </div>
            <div class="client-info">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="client-avatar">
              <div class="client-details">
                <strong>{{ testimonial.name }}</strong>
                <span>{{ testimonial.position }} @ {{ testimonial.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Final CTA -->
      <section class="final-cta">
        <div class="cta-container">
          <h2>Pronto para transformar visitantes em clientes?</h2>
          <p>Sua landing page de alta conversão está a um clique de distância</p>
          <form class="cta-form">
            <input type="email" placeholder="Seu melhor e-mail">
            <button type="submit">Quero minha Landing Page</button>
          </form>
          <div class="guarantee">
            <span>✔ Garantia de 30 dias ou seu dinheiro de volta</span>
            <span>✔ Briefing completo em 24h</span>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LandingPageService',
    data() {
      return {
        activeTab: 'single',
        portfolio: [
          {
            title: "Landing para Curso Online",
            industry: "Educação Digital",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "#",
            description: "Landing page para lançamento de curso online com formulário de inscrição e pagamento integrado.",
            features: [
              "Vídeo sales letter",
              "Checkout integrado",
              "Testemunhos em vídeo",
              "Contador de vagas",
              "Garantia destacada"
            ],
            results: [
              { value: "4.8%", label: "Taxa de conversão" },
              { value: "R$ 78.500", label: "Vendas em 7 dias" },
              { value: "2.3x", label: "ROI em anúncios" }
            ]
          },
          {
            title: "Captação de Leads - Imóveis",
            industry: "Mercado Imobiliário",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "#",
            description: "Página de captação para empreendimento imobiliário com seleção de unidades e agendamento de visitas.",
            features: [
              "Tour virtual 360°",
              "Seletor de plantas",
              "Calculadora de financiamento",
              "Mapa de localização",
              "Formulário multi-step"
            ],
            results: [
              { value: "12.3%", label: "Conversão" },
              { value: "143", label: "Leads semanais" },
              { value: "R$ 32/mês", label: "Custo por lead" }
            ]
          },
          {
            title: "E-book Gratuito - Marketing",
            industry: "Serviços Profissionais",
            image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            link: "#",
            description: "Página de captação para geração de leads qualificados via oferta de conteúdo gratuito.",
            features: [
              "Popup inteligente",
              "Sequência de e-mails",
              "Social proof",
              "Progress bar",
              "Mobile-first"
            ],
            results: [
              { value: "22.7%", label: "Taxa de conversão" },
              { value: "890", label: "Leads/mês" },
              { value: "R$ 0.45", label: "Custo por lead" }
            ]
          }
        ],
        conversionElements: [
          {
            icon: "✍️",
            title: "Headline Persuasiva",
            description: "Título que capta atenção e comunica claramente seu benefício principal",
            impact: 78
          },
          {
            icon: "🖼️",
            title: "Visual Hero",
            description: "Imagem ou vídeo que mostra o produto/serviço em ação e gera conexão emocional",
            impact: 65
          },
          {
            icon: "✅",
            title: "Lista de Benefícios",
            description: "Bullet points claros que mostram como você resolve a dor do cliente",
            impact: 82
          },
          {
            icon: "📹",
            title: "Vídeo Demonstrativo",
            description: "Vídeos de 30-60 segundos que aumentam engajamento e conversão",
            impact: 95
          },
          {
            icon: "👥",
            title: "Social Proof",
            description: "Depoimentos, cases e selos de confiança que reduzem objeções",
            impact: 88
          },
          {
            icon: "🛒",
            title: "CTA Otimizado",
            description: "Botões estratégicos com copy persuasiva e posicionamento ideal",
            impact: 92
          }
        ],
        processSteps: [
          {
            title: "Briefing Completo",
            description: "Questionário detalhado + reunião para entender seu público e objetivos"
          },
          {
            title: "Pesquisa de Mercado",
            description: "Análise de concorrentes e identificação de diferenciais competitivos"
          },
          {
            title: "Copywriting Estratégico",
            description: "Textos persuasivos focados nas dores e desejos do seu cliente ideal"
          },
          {
            title: "Design de Conversão",
            description: "Layout que guia o visitante naturalmente para a ação desejada"
          },
          {
            title: "Otimização Técnica",
            description: "Velocidade, SEO e adaptação para todos os dispositivos"
          },
          {
            title: "Testes e Lançamento",
            description: "A/B testing de elementos críticos e implementação final"
          }
        ],
        pricingPlans: {
          single: [
            {
              name: "Básica",
              price: "R$ 2.900",
              description: "Landing page simples para campanhas específicas",
              features: [
                "1 página otimizada",
                "Design responsivo",
                "Formulário de contato",
                "1 rodada de revisões",
                "SEO básico"
              ],
              conversion: "15-25%",
              featured: false
            },
            {
              name: "Profissional",
              price: "R$ 4.900",
              description: "Landing completa com elementos de alta conversão",
              features: [
                "Design personalizado",
                "Copywriting profissional",
                "3 seções dinâmicas",
                "Integração com CRM",
                "2 rodadas de revisões",
                "SEO avançado"
              ],
              conversion: "25-40%",
              featured: true
            },
            {
              name: "Premium",
              price: "R$ 7.900",
              description: "Landing ultra-otimizada com recursos avançados",
              features: [
                "Design exclusivo",
                "Copywriting persuasivo",
                "Vídeo sales letter",
                "Sistema de A/B testing",
                "Integrações completas",
                "3 rodadas de revisões",
                "Otimização contínua"
              ],
              conversion: "40-60%",
              featured: false
            }
          ],
          multi: [
            {
              name: "Pacote Start",
              price: "R$ 6.900",
              description: "3 landings para diferentes campanhas",
              features: [
                "3 páginas básicas",
                "Design coeso",
                "Formulários integrados",
                "1 rodada de revisões",
                "SEO básico"
              ],
              conversion: "15-25%",
              featured: false
            },
            {
              name: "Pacote Growth",
              price: "R$ 12.900",
              description: "5 landings profissionais para sequência de vendas",
              features: [
                "5 páginas completas",
                "Copywriting profissional",
                "Elementos dinâmicos",
                "2 rodadas de revisões",
                "Integração com CRM",
                "SEO avançado"
              ],
              conversion: "25-40%",
              featured: true
            },
            {
              name: "Pacote Enterprise",
              price: "R$ 21.900",
              description: "Landings premium para funil completo",
              features: [
                "8 páginas ultra-otimizadas",
                "Copywriting persuasivo",
                "Vídeos personalizados",
                "A/B testing incluído",
                "3 rodadas de revisões",
                "Otimização contínua"
              ],
              conversion: "40-60%",
              featured: false
            }
          ]
        },
        testimonials: [
          {
            quote: "Nossa landing page aumentou as conversões em 340% em relação à versão anterior. O investimento se pagou no primeiro mês!",
            metrics: [
              { value: "340%", label: "Aumento na conversão" },
              { value: "R$ 125k", label: "Vendas adicionais" },
              { value: "2.1x", label: "ROI em anúncios" }
            ],
            name: "Ana Carolina Silva",
            position: "Diretora de Marketing",
            company: "Escola Online",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
          },
          {
            quote: "Conseguimos reduzir nosso custo por lead de R$87 para R$19 com a nova landing page. Simplesmente transformador!",
            metrics: [
              { value: "78%", label: "Redução no CPL" },
              { value: "520", label: "Leads/mês" },
              { value: "14.3%", label: "Taxa de conversão" }
            ],
            name: "Marcos Ribeiro",
            position: "Head de Growth",
            company: "Startup Tech",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          {
            quote: "A landing que criaram para nosso lançamento foi responsável por 92% das vendas da campanha. Superou todas as expectativas!",
            metrics: [
              { value: "92%", label: "Vendas via landing" },
              { value: "R$ 328k", label: "Faturamento" },
              { value: "5.8%", label: "Taxa de conversão" }
            ],
            name: "Juliana Almeida",
            position: "Gerente de Produto",
            company: "Educação Digital",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
          }
        ]
      }
    },
    methods: {
      scrollToPortfolio() {
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
      }
    },
    directives: {
      counter: {
        mounted(el, binding) {
          const target = binding.value;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              el.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = target + (binding.arg === 'percent' ? '%' : '');
            }
          };
          
          updateCounter();
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .landing-page {
    font-family: 'Inter', sans-serif;
    color: #2d3748;
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  /* Hero Section */
  .hero-section {
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    padding: 6rem 2rem 8rem;
    position: relative;
  }
  
  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 4rem;
  }
  
  .hero-text {
    flex: 1;
    text-align: left;
  }
  
  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }
  
  .title-part {
    display: block;
  }
  
  .highlight {
    position: relative;
    display: inline-block;
  }
  
  .conversion-text {
    position: relative;
    display: inline-block;
  }
  
  .conversion-text::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
    z-index: -1;
    border-radius: 4px;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    opacity: 0.9;
    margin-bottom: 2.5rem;
  }
  
  .cta-container {
    display: flex;
    align-items: center;
    gap: 2rem;
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
  }
  
  .cta-button:hover {
    background: #f59e0b;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
    }
    70% {
      box-shadow: 0 0 0 12px rgba(251, 191, 36, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
    }
  }
  
  .trust-badges {
    display: flex;
    gap: 1rem;
  }
  
  .badge {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    padding: 0.75rem 1.25rem;
    text-align: center;
  }
  
  .badge span {
    font-size: 1.5rem;
    font-weight: 700;
    display: block;
  }
  
  .badge small {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  
  .hero-visual {
    flex: 1;
    position: relative;
  }
  
  .device-mockup {
    position: relative;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    background: #1e293b;
    border-radius: 20px;
    padding: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .screen {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    height: 300px;
    position: relative;
  }
  
  .landing-preview {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .preview-header {
    background: #4f46e5;
    color: white;
    padding: 1.5rem;
    text-align: center;
  }
  
  .preview-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  
  .preview-cta {
    background: #fbbf24;
    color: #1e293b;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    margin-top: 1rem;
    cursor: pointer;
  }
  
  .preview-stats {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-value {
    font-size: 2.5rem;
    font-weight: 800;
    color: #4f46e5;
  }
  
  .stat-label {
    font-size: 0.9rem;
    color: #64748b;
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
  
  /* Stats Section */
  .stats-section {
    max-width: 1200px;
    margin: -3rem auto 6rem;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    z-index: 2;
    position: relative;
  }
  
  .stat-item {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: #4f46e5;
    margin-bottom: 0.5rem;
  }
  
  .stat-title {
    font-size: 1.1rem;
    color: #64748b;
  }
  
  /* Why Section */
  .why-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .section-subtitle {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
    color: #64748b;
    font-size: 1.1rem;
  }
  
  .comparison {
    display: flex;
    align-items: center;
    gap: 3rem;
    margin-top: 4rem;
  }
  
  .comparison-before,
  .comparison-after {
    flex: 1;
    padding: 2rem;
    border-radius: 12px;
  }
  
  .comparison-before {
    background: #f8fafc;
    border: 1px dashed #94a3b8;
  }
  
  .comparison-after {
    background: #4f46e5;
    color: white;
  }
  
  .comparison h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .comparison-arrow {
    font-size: 2rem;
    color: #94a3b8;
    margin: 0 -1rem;
  }
  
  .negative-list,
  .positive-list {
    list-style-type: none;
    padding: 0;
  }
  
  .negative-list li {
    margin-bottom: 1rem;
    padding-left: 2rem;
    position: relative;
    color: #64748b;
  }
  
  .negative-list li::before {
    content: '✗';
    position: absolute;
    left: 0;
    color: #ef4444;
  }
  
  .positive-list li {
    margin-bottom: 1rem;
    padding-left: 2rem;
    position: relative;
    color: #e2e8f0;
  }
  
  .positive-list li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #fbbf24;
  }
  
  /* Portfolio Section */
  .portfolio-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .portfolio-grid {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .portfolio-item {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    display: flex;
  }
  
  .portfolio-visual {
    flex: 1;
    position: relative;
    min-height: 400px;
  }
  
  .device-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1e293b;
    border-radius: 12px 0 0 12px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .portfolio-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .portfolio-results {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    backdrop-filter: blur(5px);
  }
  
  .result {
    text-align: center;
    padding: 0 1rem;
  }
  
  .result-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #4f46e5;
  }
  
  .result-label {
    font-size: 0.8rem;
    color: #64748b;
  }
  
  .portfolio-details {
    flex: 1;
    padding: 3rem;
  }
  
  .portfolio-details h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .industry-tag {
    display: inline-block;
    background: #e0e7ff;
    color: #4f46e5;
    padding: 0.25rem 0.75rem;
    border-radius: 50px;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }
  
  .portfolio-details p {
    color: #64748b;
    margin-bottom: 2rem;
  }
  
  .features {
    margin-bottom: 2rem;
  }
  
  .feature {
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  
  .feature-icon {
    width: 24px;
    height: 24px;
    background: #4f46e5;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.75rem;
    flex-shrink: 0;
  }
  
  .view-button {
    display: inline-block;
    background: #4f46e5;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s ease;
  }
  
  .view-button:hover {
    background: #4338ca;
  }
  
  /* Elements Section */
  .elements-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .elements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
  }
  
  .element-card {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;
  }
  
  .element-card:hover {
    transform: translateY(-5px);
  }
  
  .element-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .element-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .element-card p {
    color: #64748b;
    margin-bottom: 1.5rem;
  }
  
  .element-impact {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: #64748b;
    margin-top: 1.5rem;
  }
  
  .impact-bar {
    height: 6px;
    background: #4f46e5;
    border-radius: 3px;
    margin: 0 0.5rem;
    flex-grow: 1;
  }
  
  .impact-value {
    font-weight: 700;
    color: #4f46e5;
  }
  
  /* Process Section */
  .process-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .process-timeline {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }
  
  .process-timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: #cbd5e1;
    transform: translateX(-50%);
  }
  
  .process-step {
    position: relative;
    margin-bottom: 3rem;
    display: flex;
  }
  
  .process-step:nth-child(odd) {
    justify-content: flex-start;
    padding-right: calc(50% + 2rem);
    text-align: right;
  }
  
  .process-step:nth-child(even) {
    justify-content: flex-end;
    padding-left: calc(50% + 2rem);
    text-align: left;
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
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  }
  
  .step-content {
    max-width: 350px;
  }
  
  .step-content h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .step-content p {
    color: #64748b;
  }
  
  /* Pricing Section */
  .pricing-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .pricing-tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
  }
  
  .tab-button {
    background: none;
    border: none;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    color: #94a3b8;
    cursor: pointer;
    position: relative;
  }
  
  .tab-button.active {
    color: #4f46e5;
  }
  
  .tab-button.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: #4f46e5;
    border-radius: 3px;
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .pricing-card {
    background: white;
    border-radius: 12px;
    padding: 2.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    position: relative;
    transition: transform 0.3s ease;
  }
  
  .pricing-card:hover {
    transform: translateY(-5px);
  }
  
  .pricing-card.featured {
    border: 2px solid #4f46e5;
    transform: scale(1.05);
  }
  
  .pricing-card.featured:hover {
    transform: scale(1.05) translateY(-5px);
  }
  
  .popular-tag {
    position: absolute;
    top: -12px;
    right: 20px;
    background: #4f46e5;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .pricing-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  .price {
    font-size: 2.5rem;
    font-weight: 800;
    color: #4f46e5;
    margin-bottom: 0.5rem;
  }
  
  .price-desc {
    color: #64748b;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
  }
  
  .pricing-card .features {
    list-style-type: none;
    padding: 0;
    margin-bottom: 2rem;
  }
  
  .pricing-card .features li {
    margin-bottom: 0.75rem;
    padding-left: 1.5rem;
    position: relative;
    color: #475569;
  }
  
  .pricing-card .features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #4f46e5;
  }
  
  .buy-button {
    width: 100%;
    padding: 1rem;
    background: #4f46e5;
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-bottom: 1.5rem;
  }
  
  .buy-button:hover {
    background: #4338ca;
  }
  
  .conversion-badge {
    font-size: 0.9rem;
    color: #64748b;
    text-align: center;
  }
  
  .conversion-badge strong {
    color: #4f46e5;
    font-weight: 700;
  }
  
  /* Testimonials Section */
  .testimonials-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .testimonials-slider {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .testimonial {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  .testimonial-content {
    margin-bottom: 1.5rem;
  }
  
  .quote {
    font-size: 1.1rem;
    font-style: italic;
    color: #475569;
    margin-bottom: 1.5rem;
    position: relative;
  }
  
  .quote::before {
    content: '"';
    font-size: 3rem;
    color: #cbd5e1;
    position: absolute;
    top: -1rem;
    left: -1rem;
    line-height: 1;
    z-index: 0;
  }
  
  .metrics {
    display: flex;
    justify-content: space-between;
  }
  
  .metric {
    text-align: center;
  }
  
  .metric-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    color: #4f46e5;
  }
  
  .metric-label {
    font-size: 0.8rem;
    color: #64748b;
  }
  
  .client-info {
    display: flex;
    align-items: center;
  }
  
  .client-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 1rem;
  }
  
  .client-details {
    display: flex;
    flex-direction: column;
  }
  
  .client-details strong {
    color: #1e293b;
  }
  
  .client-details span {
    font-size: 0.9rem;
    color: #64748b;
  }
  
  /* Final CTA */
  .final-cta {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: white;
    text-align: center;
  }
  
  .cta-container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .final-cta h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .final-cta p {
    font-size: 1.25rem;
    opacity: 0.9;
    margin-bottom: 2.5rem;
  }
  
  .cta-form {
    display: flex;
    max-width: 500px;
    margin: 0 auto 2rem;
  }
  
  .cta-form input {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 50px 0 0 50px;
    font-size: 1rem;
  }
  
  .cta-form button {
    background: #fbbf24;
    color: #1e293b;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0 50px 50px 0;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .guarantee {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }
    
    .cta-container {
      justify-content: center;
    }
    
    .portfolio-item {
      flex-direction: column;
    }
    
    .device-frame {
      border-radius: 12px 12px 0 0;
    }
    
    .process-timeline::before {
      left: 30px;
    }
    
    .process-step {
      justify-content: flex-start !important;
      padding-left: 80px !important;
      padding-right: 0 !important;
      text-align: left !important;
    }
    
    .step-number {
      left: 30px;
    }
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
    }
    
    .cta-container {
      flex-direction: column;
      gap: 1rem;
    }
    
    .comparison {
      flex-direction: column;
      gap: 1rem;
    }
    
    .comparison-arrow {
      transform: rotate(90deg);
      margin: 1rem 0;
    }
    
    .pricing-card.featured {
      transform: none;
    }
    
    .pricing-card.featured:hover {
      transform: translateY(-5px);
    }
    
    .cta-form {
      flex-direction: column;
    }
    
    .cta-form input,
    .cta-form button {
      border-radius: 50px;
    }
    
    .guarantee {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  </style>