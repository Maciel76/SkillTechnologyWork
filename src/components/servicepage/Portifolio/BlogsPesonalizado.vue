<template>
    <div class="blog-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Blogs Profissionais que <span class="highlight">Geram Resultados</span></h1>
          <p class="subtitle">Plataformas de conteúdo poderosas para estabelecer autoridade e atrair clientes qualificados</p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToPortfolio">Ver Exemplos</button>
            <button class="secondary-button" @click="scrollToPricing">Ver Planos</button>
          </div>
        </div>
        <div class="hero-illustration">
          <img src="https://source.unsplash.com/600x450/?blog,writing" alt="Blog Profissional">
        </div>
      </section>
  
      <!-- Benefits Section -->
      <section class="benefits-section">
        <h2>Por que investir em um blog profissional?</h2>
        <p class="section-description">Um blog bem estruturado é a base da sua estratégia de conteúdo digital</p>
        
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">📈</div>
            <h3>Tráfego Orgânico</h3>
            <p>Aumente em 3x o número de visitantes qualificados através do SEO</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🤝</div>
            <h3>Autoridade</h3>
            <p>Posicione sua marca como referência no seu segmento</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">💰</div>
            <h3>Conversões</h3>
            <p>Gere 50% mais leads do que um site institucional comum</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🔄</div>
            <h3>Conteúdo Evergreen</h3>
            <p>Artigos que continuam gerando resultados por anos</p>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="features-section">
        <h2>Tudo que seu blog profissional precisa</h2>
        <p class="section-description">Funcionalidades pensadas para publicação eficiente e máxima performance</p>
        
        <div class="features-tabs">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            :class="{ active: activeTab === index }"
            @click="activeTab = index"
          >
            {{ tab.label }}
          </button>
        </div>
        
        <div class="features-content">
            <div class="feature-grid" v-for="(tab, index) in tabs" v-show="activeTab === index" :key="'tab-content-'+index">
                <div class="feature-card" v-for="(feature, featureIndex) in tab.features" :key="'feature-'+index+'-'+featureIndex">
                  <div class="feature-icon">{{ feature.icon }}</div>
                  <h3>{{ feature.name }}</h3>
                  <p>{{ feature.description }}</p>
                </div>
              </div>
        </div>
      </section>
  
      <!-- Portfolio Section -->
      <section class="portfolio-section" id="portfolio">
        <h2>Blogs que desenvolvemos</h2>
        <p class="section-description">Alguns exemplos de plataformas de conteúdo que entregamos</p>
        
        <div class="portfolio-grid">
          <div class="portfolio-item" v-for="(blog, index) in portfolio" :key="index">
            <div class="portfolio-image" :style="{ backgroundImage: 'url(' + blog.image + ')' }">
              <div class="overlay">
                <h3>{{ blog.name }}</h3>
                <p>{{ blog.niche }}</p>
                <div class="blog-stats">
                  <div class="stat">
                    <span class="value">+{{ blog.stats.visits }}</span>
                    <span class="label">visitas/mês</span>
                  </div>
                  <div class="stat">
                    <span class="value">Top {{ blog.stats.ranking }}</span>
                    <span class="label">no Google</span>
                  </div>
                </div>
                <a :href="blog.link" class="blog-link" target="_blank">Visitar Blog</a>
              </div>
            </div>
            <div class="portfolio-details">
              <h4>{{ blog.title }}</h4>
              <p>{{ blog.description }}</p>
              <div class="tech-used">
                <span v-for="tech in blog.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- SEO Section -->
      <section class="seo-section">
        <h2>Otimizado para Buscas</h2>
        <p class="section-description">Seu blog nas primeiras posições do Google</p>
        
        <div class="seo-grid">
          <div class="seo-card">
            <div class="seo-icon">🔍</div>
            <h3>Pesquisa de Keywords</h3>
            <p>Identificamos os termos mais buscados no seu nicho</p>
          </div>
          <div class="seo-card">
            <div class="seo-icon">✍️</div>
            <h3>Conteúdo Otimizado</h3>
            <p>Artigos estruturados para ranqueamento</p>
          </div>
          <div class="seo-card">
            <div class="seo-icon">⚡</div>
            <h3>Performance</h3>
            <p>Carregamento ultrarrápido para melhor experiência</p>
          </div>
          <div class="seo-card">
            <div class="seo-icon">📱</div>
            <h3>Mobile-First</h3>
            <p>Otimizado para dispositivos móveis</p>
          </div>
        </div>
      </section>
  
      <!-- Monetization Section -->
      <section class="monetization-section">
        <h2>Monetize Seu Blog</h2>
        <p class="section-description">Diversas formas de gerar receita com seu conteúdo</p>
        
        <div class="monetization-grid">
          <div class="monetization-card">
            <div class="monetization-icon">🛒</div>
            <h3>Produtos Próprios</h3>
            <p>Venda e-books, cursos ou serviços diretamente</p>
          </div>
          <div class="monetization-card">
            <div class="monetization-icon">📢</div>
            <h3>Publicidade</h3>
            <p>Anúncios do Google AdSense ou diretos</p>
          </div>
          <div class="monetization-card">
            <div class="monetization-icon">🤝</div>
            <h3>Afiliados</h3>
            <p>Ganhe comissão por indicações</p>
          </div>
          <div class="monetization-card">
            <div class="monetization-icon">💼</div>
            <h3>Patrocínios</h3>
            <p>Parcerias com marcas do seu nicho</p>
          </div>
        </div>
      </section>
  
      <!-- Pricing Section -->
      <section class="pricing-section" id="pricing">
        <h2>Planos para Todos os Portes</h2>
        <p class="section-description">Escolha a solução ideal para sua estratégia de conteúdo</p>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Iniciante</h3>
            <div class="price">R$ 3.900</div>
            <div class="price-description">Ideal para blogs pessoais</div>
            <ul class="features">
              <li>Até 30 artigos</li>
              <li>Design responsivo</li>
              <li>SEO básico</li>
              <li>1 autor</li>
              <li>Suporte por email</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
          
          <div class="pricing-card featured">
            <div class="popular-tag">MAIS ESCOLHIDO</div>
            <h3>Profissional</h3>
            <div class="price">R$ 6.900</div>
            <div class="price-description">Para blogs corporativos</div>
            <ul class="features">
              <li>Artigos ilimitados</li>
              <li>Design personalizado</li>
              <li>SEO avançado</li>
              <li>Até 5 autores</li>
              <li>Newsletter integrada</li>
              <li>Suporte prioritário</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
          
          <div class="pricing-card">
            <h3>Enterprise</h3>
            <div class="price">R$ 9.900+</div>
            <div class="price-description">Solução completa</div>
            <ul class="features">
              <li>Conteúdo ilimitado</li>
              <li>Design exclusivo</li>
              <li>SEO premium</li>
              <li>Autores ilimitados</li>
              <li>Área de membros</li>
              <li>Suporte 24/7</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>Dúvidas Frequentes</h2>
        <p class="section-description">Tire suas principais dúvidas sobre blogs profissionais</p>
        
        <div class="faq-container">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <span class="faq-icon">{{ activeFaq === index ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="activeFaq === index">
              <p v-html="faq.answer"></p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="cta-section">
        <h2>Pronto para Transformar seu Conhecimento em Conteúdo?</h2>
        <p>Fale com nossos especialistas e crie um blog que realmente gera resultados</p>
        <button class="cta-button">Quero meu blog profissional</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BlogPage',
    data() {
      return {
        activeTab: 0,
        tabs: [
          {
            label: 'Publicação',
            features: [
              {
                icon: '📝',
                name: 'Editor Avançado',
                description: 'Interface intuitiva para criação de artigos ricos'
              },
              {
                icon: '📅',
                name: 'Agendamento',
                description: 'Programe suas publicações com antecedência'
              },
              {
                icon: '📊',
                name: 'Rascunhos',
                description: 'Salve e edite seus textos antes de publicar'
              },
              {
                icon: '👥',
                name: 'Autores Múltiplos',
                description: 'Time de redatores com perfis individuais'
              }
            ]
          },
          {
            label: 'SEO',
            features: [
              {
                icon: '🔎',
                name: 'Otimização',
                description: 'Meta tags, URLs amigáveis e estrutura perfeita'
              },
              {
                icon: '📱',
                name: 'Mobile-First',
                description: 'Otimizado para dispositivos móveis'
              },
              {
                icon: '⚡',
                name: 'Velocidade',
                description: 'Carregamento ultrarrápido para melhor ranking'
              },
              {
                icon: '📈',
                name: 'Análise',
                description: 'Ferramentas integradas para monitoramento'
              }
            ]
          },
          {
            label: 'Engajamento',
            features: [
              {
                icon: '💬',
                name: 'Comentários',
                description: 'Sistema de interação com leitores'
              },
              {
                icon: '✉️',
                name: 'Newsletter',
                description: 'Capture e-mails para sua lista'
              },
              {
                icon: '📲',
                name: 'Redes Sociais',
                description: 'Compartilhamento fácil em todas as plataformas'
              },
              {
                icon: '📚',
                name: 'Relacionados',
                description: 'Sugere artigos similares aos leitores'
              }
            ]
          }
        ],
        portfolio: [
          {
            name: "Marketing Digital",
            title: "Blog para agência de marketing",
            niche: "Marketing Digital",
            image: "https://source.unsplash.com/600x400/?marketing,digital",
            link: "#",
            tech: ["WordPress", "Elementor", "Yoast SEO"],
            description: "Plataforma com artigos estratégicos que gera 80% dos leads da agência.",
            stats: {
              visits: "25.000",
              ranking: 3
            }
          },
          {
            name: "Saúde Integral",
            title: "Blog para nutricionista",
            niche: "Nutrição e Bem-estar",
            image: "https://source.unsplash.com/600x400/?nutrition,health",
            link: "#",
            tech: ["Ghost", "Tailwind CSS", "Algolia"],
            description: "Blog com receitas e artigos científicos que triplicou a base de clientes.",
            stats: {
              visits: "18.000",
              ranking: 1
            }
          },
          {
            name: "Tech Trends",
            title: "Blog corporativo de tecnologia",
            niche: "Tecnologia",
            image: "https://source.unsplash.com/600x400/?technology,code",
            link: "#",
            tech: ["Next.js", "Contentful", "Vercel"],
            description: "Blog institucional que posicionou a empresa como referência no setor.",
            stats: {
              visits: "32.000",
              ranking: 2
            }
          },
          {
            name: "Finanças Pessoais",
            title: "Blog para consultor financeiro",
            niche: "Finanças",
            image: "https://source.unsplash.com/600x400/?finance,money",
            link: "#",
            tech: ["Webflow", "Memberstack", "Google Analytics"],
            description: "Plataforma com área de membros para cursos premium sobre investimentos.",
            stats: {
              visits: "45.000",
              ranking: 1
            }
          }
        ],
        faqs: [
          {
            question: "Qual plataforma é melhor para blogs profissionais?",
            answer: "Depende dos seus objetivos:<ul><li><strong>WordPress</strong> - Mais flexível e completo</li><li><strong>Ghost</strong> - Focado em performance e simplicidade</li><li><strong>Webflow</strong> - Design avançado sem código</li><li><strong>Next.js</strong> - Solução customizada de alto desempenho</li></ul>Analisamos seu caso para recomendar a melhor opção."
          },
          {
            question: "Quanto tempo leva para o blog começar a rankear?",
            answer: "Em média 3-6 meses para ver resultados significativos, mas com nossa estratégia de:<ul><li>Pesquisa avançada de keywords</li><li>Conteúdo otimizado desde o início</li><li>Estrutura técnica perfeita</li></ul>Alguns artigos podem rankear em posições intermediárias já no primeiro mês."
          },
          {
            question: "Posso migrar meu blog atual para uma nova plataforma?",
            answer: "Sim! Realizamos migrações completas incluindo:<ul><li>Transferência de todos os artigos</li><li>Redirecionamentos 301 para manter SEO</li><li>Otimização do conteúdo durante o processo</li><li>Treinamento para usar a nova plataforma</li></ul>Garantimos zero downtime e preservação do ranking."
          },
          {
            question: "Como posso monetizar meu blog?",
            answer: "Várias estratégias comprovadas:<ul><li><strong>Publicidade</strong> - Google AdSense, redes de anúncios</li><li><strong>Afiliados</strong> - Comissão por produtos indicados</li><li><strong>Produtos próprios</strong> - E-books, cursos online</li><li><strong>Serviços</strong> - Consultorias, assessorias</li><li><strong>Patrocínios</strong> - Parcerias com marcas</li></ul>Criamos a estrutura ideal para sua estratégia."
          }
        ],
        activeFaq: null
      }
    },
    methods: {
      scrollToPortfolio() {
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
      },
      scrollToPricing() {
        document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
      },
      toggleFaq(index) {
        this.activeFaq = this.activeFaq === index ? null : index;
      }
    }
  }
  </script>
  
  <style scoped>
  .blog-page {
    font-family: 'Inter', sans-serif;
    color: #2d3748;
    line-height: 1.6;
  }
  
  /* Hero Section */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6rem 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  .hero-content {
    max-width: 600px;
  }
  
  .hero-section h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    line-height: 1.2;
  }
  
  .highlight {
    color: #3b82f6;
  }
  
  .subtitle {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
    color: #4b5563;
  }
  
  .cta-container {
    display: flex;
    gap: 1rem;
  }
  
  .cta-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .cta-button:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
  
  .secondary-button {
    background: white;
    color: #3b82f6;
    border: 2px solid #3b82f6;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .secondary-button:hover {
    background: #eff6ff;
    transform: translateY(-2px);
  }
  
  .hero-illustration img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  /* Benefits Section */
  .benefits-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .benefits-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .section-description {
    text-align: center;
    max-width: 700px;
    margin: 0 auto 3rem;
    color: #4b5563;
    font-size: 1.1rem;
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .benefit-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .benefit-card:hover {
    transform: translateY(-5px);
  }
  
  .benefit-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .benefit-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .benefit-card p {
    color: #4b5563;
  }
  
  /* Features Section */
  .features-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .features-tabs {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;
  }
  
  .features-tabs button {
    padding: 0.75rem 1.5rem;
    background: none;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    color: #4b5563;
    transition: all 0.3s ease;
  }
  
  .features-tabs button.active {
    background: #3b82f6;
    color: white;
  }
  
  .features-tabs button:hover {
    background: #dbeafe;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
  }
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .feature-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .feature-card p {
    color: #4b5563;
  }
  
  /* Portfolio Section */
  .portfolio-section {
    padding: 6rem 2rem;
  }
  
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .portfolio-item {
    background: white;
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 2rem;
    color: white;
  }
  
  .overlay h3 {
    font-size: 1.75rem;
    margin: 0;
  }
  
  .overlay p {
    margin: 0.5rem 0 1.5rem;
    font-size: 1rem;
    opacity: 0.9;
  }
  
  .blog-stats {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .stat {
    text-align: center;
  }
  
  .value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
  }
  
  .label {
    font-size: 0.85rem;
    opacity: 0.8;
  }
  
  .blog-link {
    align-self: flex-start;
    background: #3b82f6;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s ease;
  }
  
  .blog-link:hover {
    background: #2563eb;
  }
  
  .portfolio-details {
    padding: 1.5rem;
  }
  
  .portfolio-details h4 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .portfolio-details p {
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
  
  .tech-used {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .tech-used span {
    background: #e5e7eb;
    color: #1f2937;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
  }
  
  /* SEO Section */
  .seo-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .seo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
  }
  
  .seo-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .seo-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .seo-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .seo-card p {
    color: #4b5563;
  }
  
  /* Monetization Section */
  .monetization-section {
    padding: 6rem 2rem;
  }
  
  .monetization-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
  }
  
  .monetization-card {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .monetization-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .monetization-card h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }
  
  .monetization-card p {
    color: #4b5563;
  }
  
  /* Pricing Section */
  .pricing-section {
    padding: 6rem 2rem;
    background: #f8fafc;
  }
  
  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 3rem auto 0;
  }
  
  .pricing-card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .pricing-card.featured {
    border: 2px solid #3b82f6;
    transform: scale(1.05);
  }
  
  .popular-tag {
    position: absolute;
    top: -12px;
    right: 20px;
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
  }
  
  .pricing-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #1f2937;
    text-align: center;
  }
  
  .price {
    font-size: 2.5rem;
    font-weight: 800;
    color: #3b82f6;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  
  .price::before {
    content: 'R$ ';
    font-size: 1.5rem;
  }
  
  .price-description {
    text-align: center;
    color: #6b7280;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }
  
  .features {
    list-style-type: none;
    padding: 0;
    margin-bottom: 2rem;
  }
  
  .features li {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    position: relative;
    color: #4b5563;
  }
  
  .features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #3b82f6;
  }
  
  .price-button {
    width: 100%;
    padding: 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .price-button:hover {
    background: #2563eb;
  }
  
  /* FAQ Section */
  .faq-section {
    padding: 6rem 2rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .faq-container {
    margin-top: 3rem;
  }
  
  .faq-item {
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .faq-question {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    background: white;
    transition: background 0.3s ease;
  }
  
  .faq-question:hover {
    background: #f9fafb;
  }
  
  .faq-question h3 {
    font-size: 1.1rem;
    margin: 0;
    color: #1f2937;
  }
  
  .faq-icon {
    font-size: 1.5rem;
    color: #3b82f6;
  }
  
  .faq-answer {
    padding: 0 1.5rem;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.5s ease, padding 0.3s ease;
  }
  
  .faq-answer p {
    padding-bottom: 1.5rem;
    color: #4b5563;
  }
  
  .faq-answer ul {
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .faq-answer li {
    margin-bottom: 0.5rem;
  }
  
  /* CTA Section */
  .cta-section {
    padding: 6rem 2rem;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    color: white;
    text-align: center;
  }
</style>