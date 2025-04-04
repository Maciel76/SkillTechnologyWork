<template>
    <div class="ecommerce-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Lojas Virtuais que <span class="highlight">Vendem</span></h1>
          <p class="subtitle">Soluções completas de e-commerce para transformar visitantes em clientes</p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToPortfolio">Ver Lojas Exemplo</button>
            <button class="secondary-button" @click="scrollToPricing">Ver Planos</button>
          </div>
        </div>
        <div class="hero-illustration">
          <img src="https://img.freepik.com/free-photo/discount-shopping-season-with-sale_23-2150165882.jpg?t=st=1743383567~exp=1743387167~hmac=4e3562baf575497757fd7cc69aedb67fc78981aa410bc700da7efddef61b95b7&w=996" width="600" height="auto" alt="Loja Virtual">
        </div>
      </section>
  
      <!-- Metrics Section -->
      <section class="metrics-section">
        <div class="metrics-container">
          <div class="metric-item">
            <div class="metric-value">+127%</div>
            <div class="metric-label">Aumento médio nas vendas</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">3.2x</div>
            <div class="metric-label">Mais tráfego orgânico</div>
          </div>
          <div class="metric-item">
            <div class="metric-value">98%</div>
            <div class="metric-label">Disponibilidade garantida</div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="features-section">
        <h2>Tudo que sua loja virtual precisa</h2>
        <p class="section-description">Funcionalidades pensadas para otimizar conversões e facilitar sua gestão</p>
        
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
        <h2>Lojas que desenvolvemos</h2>
        <p class="section-description">Alguns exemplos de e-commerces que entregamos</p>
        
        <div class="portfolio-grid">
          <div class="portfolio-item" v-for="(store, index) in portfolio" :key="index">
            <div class="portfolio-image" :style="{ backgroundImage: 'url(' + store.image + ')' }">
              <div class="overlay">
                <h3>{{ store.name }}</h3>
                <p>{{ store.niche }}</p>
                <div class="store-stats">
                  <div class="stat">
                    <span class="value">+{{ store.stats.revenue }}</span>
                    <span class="label">faturamento/mês</span>
                  </div>
                  <div class="stat">
                    <span class="value">{{ store.stats.conversion }}%</span>
                    <span class="label">taxa de conversão</span>
                  </div>
                </div>
                <a :href="store.link" class="store-link" target="_blank">Visitar Loja</a>
              </div>
            </div>
            <div class="portfolio-details">
              <h4>{{ store.title }}</h4>
              <p>{{ store.description }}</p>
              <div class="tech-used">
                <span v-for="tech in store.tech" :key="tech">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Payment Methods -->
      <section class="payments-section">
        <h2>Integração com os principais meios de pagamento</h2>
        <p class="section-description">Sua loja pronta para receber pagamentos com segurança</p>
        
        <div class="payments-grid">
          <div class="payment-method">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg" alt="PayPal">
            <span>PayPal</span>
          </div>
          <div class="payment-method">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg" alt="Stripe">
            <span>Stripe</span>
          </div>
          <div class="payment-method">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mercado-pago/mercado-pago-original.svg" alt="Mercado Pago">
            <span>Mercado Pago</span>
          </div>
          <div class="payment-method">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pagarme/pagarme-original.svg" alt="Pagarme">
            <span>Pagarme</span>
          </div>
        </div>
      </section>
  
      <!-- Pricing Section -->
      <section class="pricing-section" id="pricing">
        <h2>Planos para Todos os Negócios</h2>
        <p class="section-description">Escolha a solução ideal para o tamanho da sua operação</p>
        
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Startup</h3>
            <div class="price">R$ 5.900</div>
            <div class="price-description">Ideal para quem está começando</div>
            <ul class="features">
              <li>Até 50 produtos</li>
              <li>1 método de pagamento</li>
              <li>Template básico</li>
              <li>Relatórios simples</li>
              <li>Suporte por email</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
          
          <div class="pricing-card featured">
            <div class="popular-tag">MAIS VENDIDO</div>
            <h3>Profissional</h3>
            <div class="price">R$ 9.900</div>
            <div class="price-description">Para lojas em crescimento</div>
            <ul class="features">
              <li>Até 200 produtos</li>
              <li>3 métodos de pagamento</li>
              <li>Design personalizado</li>
              <li>Relatórios avançados</li>
              <li>Integração com ERP</li>
              <li>Suporte prioritário</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
          
          <div class="pricing-card">
            <h3>Enterprise</h3>
            <div class="price">R$ 14.900+</div>
            <div class="price-description">Solução completa</div>
            <ul class="features">
              <li>Produtos ilimitados</li>
              <li>Todos os pagamentos</li>
              <li>Design exclusivo</li>
              <li>Business Intelligence</li>
              <li>CRM integrado</li>
              <li>Suporte 24/7</li>
            </ul>
            <button class="price-button">Quero este</button>
          </div>
        </div>
      </section>
  
      <!-- FAQ Section -->
      <section class="faq-section">
        <h2>Dúvidas Frequentes</h2>
        <p class="section-description">Tire suas principais dúvidas sobre lojas virtuais</p>
        
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
        <h2>Pronto para Vender Online?</h2>
        <p>Fale com nossos especialistas e leve sua loja virtual para o próximo nível</p>
        <button class="cta-button">Quero minha loja virtual</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EcommercePage',
    data() {
      return {
        activeTab: 0,
        tabs: [
          {
            label: 'Vendas',
            features: [
              {
                icon: '🛒',
                name: 'Carrinho Inteligente',
                description: 'Abandono de carrinho recuperado com e-mails automáticos'
              },
              {
                icon: '💳',
                name: 'Checkout Otimizado',
                description: 'Processo de compra simplificado em poucos passos'
              },
              {
                icon: '📊',
                name: 'Upsell & Cross-sell',
                description: 'Sugestões inteligentes para aumentar o ticket médio'
              },
              {
                icon: '🚚',
                name: 'Cálculo de Frete',
                description: 'Integração com principais transportadoras'
              }
            ]
          },
          {
            label: 'Gestão',
            features: [
              {
                icon: '📦',
                name: 'Gestão de Estoque',
                description: 'Controle automatizado com alertas de reposição'
              },
              {
                icon: '📝',
                name: 'Pedidos Centralizados',
                description: 'Todos os pedidos em um único painel'
              },
              {
                icon: '📈',
                name: 'Relatórios Avançados',
                description: 'Dados de vendas, clientes e produtos'
              },
              {
                icon: '🔄',
                name: 'Integração com ERP',
                description: 'Sincronização com seu sistema de gestão'
              }
            ]
          },
          {
            label: 'Marketing',
            features: [
              {
                icon: '✉️',
                name: 'E-mail Marketing',
                description: 'Campanhas automatizadas baseadas no comportamento'
              },
              {
                icon: '🔍',
                name: 'SEO Avançado',
                description: 'Otimização completa para mecanismos de busca'
              },
              {
                icon: '🎯',
                name: 'Google Ads',
                description: 'Integração pronta com campanhas de performance'
              },
              {
                icon: '📱',
                name: 'Redes Sociais',
                description: 'Venda diretamente pelo Instagram e Facebook'
              }
            ]
          }
        ],
        portfolio: [
          {
            name: "EcoModa",
            title: "Loja de moda sustentável",
            niche: "Moda Ecológica",
            image: "https://source.unsplash.com/600x400/?fashion,eco",
            link: "#",
            tech: ["Shopify", "React", "Mercado Pago"],
            description: "Plataforma de moda sustentável com experiência de compra premium e storytelling de produtos.",
            stats: {
              revenue: "85.000",
              conversion: 3.8
            }
          },
          {
            name: "TechGadgets",
            title: "Eletrônicos e acessórios",
            niche: "Tecnologia",
            image: "https://source.unsplash.com/600x400/?gadgets,tech",
            link: "#",
            tech: ["WooCommerce", "WordPress", "PagSeguro"],
            description: "Loja especializada em gadgets com filtros avançados e comparação de produtos.",
            stats: {
              revenue: "120.000",
              conversion: 2.9
            }
          },
          {
            name: "Casa&Conforto",
            title: "Decoração e utensílios",
            niche: "Casa e Jardim",
            image: "https://source.unsplash.com/600x400/?home,decor",
            link: "#",
            tech: ["Vue.js", "Laravel", "Stripe"],
            description: "E-commerce de decoração com realidade aumentada para visualização em ambientes.",
            stats: {
              revenue: "65.000",
              conversion: 4.2
            }
          },
          {
            name: "SaúdeNatural",
            title: "Produtos naturais e orgânicos",
            niche: "Saúde e Bem-estar",
            image: "https://source.unsplash.com/600x400/?organic,health",
            link: "#",
            tech: ["Magento", "PHP", "PayPal"],
            description: "Marketplace de produtos naturais com assinaturas recorrentes e programa de fidelidade.",
            stats: {
              revenue: "150.000",
              conversion: 3.5
            }
          }
        ],
        faqs: [
          {
            question: "Quanto tempo leva para desenvolver uma loja virtual?",
            answer: "O prazo médio é de 4 a 8 semanas, variando conforme a complexidade do projeto. Lojas mais simples podem ficar prontas em 3 semanas, enquanto soluções personalizadas complexas podem levar até 12 semanas."
          },
          {
            question: "Posso gerenciar os produtos sozinho?",
            answer: "Sim! Todos os nossos e-commerces incluem painéis administrativos intuitivos onde você pode:<ul><li>Adicionar/editar produtos</li><li>Gerenciar estoque</li><li>Acompanhar pedidos</li><li>Gerar relatórios</li></ul>Oferecemos treinamento gratuito para sua equipe."
          },
          {
            question: "Qual a diferença entre usar uma plataforma pronta e desenvolvimento personalizado?",
            answer: "<strong>Plataformas prontas</strong> (Shopify, WooCommerce):<ul><li>Menor custo inicial</li><li>Implementação rápida</li><li>Funcionalidades padrão</li></ul><strong>Desenvolvimento personalizado</strong>:<ul><li>Solução 100% adaptada às suas necessidades</li><li>Performance otimizada</li><li>Escalabilidade garantida</li><li>Integrações exclusivas</li></ul>"
          },
          {
            question: "Como funciona o suporte após o lançamento?",
            answer: "Todos os planos incluem:<ul><li>1 mês de suporte gratuito para ajustes</li><li>Manutenção preventiva mensal</li><li>Atualizações de segurança</li></ul>Oferecemos também pacotes de suporte contínuo conforme sua necessidade."
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
  .ecommerce-page {
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
    color: #145e9b;
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
    background: #10b981;
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
    background: #0d9c6e;
    transform: translateY(-2px);
  }
  
  .secondary-button {
    background: white;
    color: #10b981;
    border: 2px solid #10b981;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 600;
  }
  
  .secondary-button:hover {
    background: #f0fdf4;
    transform: translateY(-2px);
  }
  
  .hero-illustration img {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  /* Metrics Section */
  .metrics-section {
    background: #f0fdf4;
    padding: 4rem 2rem;
  }
  
  .metrics-container {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 2rem;
  }
  
  .metric-item {
    text-align: center;
    min-width: 200px;
  }
  
  .metric-value {
    font-size: 3rem;
    font-weight: 800;
    color: #10b981;
    margin-bottom: 0.5rem;
  }
  
  .metric-label {
    font-size: 1.1rem;
    color: #4b5563;
  }
  
  /* Features Section */
  .features-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .features-section h2 {
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
    background: #10b981;
    color: white;
  }
  
  .features-tabs button:hover {
    background: #d1fae5;
  }
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
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
    background: #f8fafc;
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
  
  .store-stats {
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
  
  .store-link {
    align-self: flex-start;
    background: #10b981;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    transition: background 0.3s ease;
  }
  
  .store-link:hover {
    background: #0d9c6e;
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
  
  /* Payments Section */
  .payments-section {
    padding: 6rem 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .payments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 3rem auto 0;
  }
  
  .payment-method {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .payment-method img {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }
  
  .payment-method span {
    font-weight: 600;
    color: #1f2937;
  }
  
  /* Pricing Section */
  .pricing-section {
    padding: 6rem 2rem;
    background: #f0fdf4;
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
    border: 2px solid #10b981;
    transform: scale(1.05);
  }
  
  .popular-tag {
    position: absolute;
    top: -12px;
    right: 20px;
    background: #10b981;
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
    color: #10b981;
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
    color: #10b981;
  }
  
  .price-button {
    width: 100%;
    padding: 1rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .price-button:hover {
    background: #0d9c6e;
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
    color: #10b981;
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
    background: linear-gradient(135deg, #10b981, #0d9c6e);
    color: white;
    text-align: center;
  }
  
  .cta-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .cta-section p {
    max-width: 600px;
    margin: 0 auto 2.5rem;
    font-size: 1.25rem;
    opacity: 0.9;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-section {
      flex-direction: column;
      text-align: center;
    }
    
    .hero-content {
      margin-bottom: 3rem;
    }
    
    .cta-container {
      justify-content: center;
    }
    
    .pricing-card.featured {
      transform: none;
    }
  }
  
  @media (max-width: 768px) {
    .hero-section h1 {
      font-size: 2.5rem;
    }
    
    .subtitle {
      font-size: 1.2rem;
    }
    
    .portfolio-grid {
      grid-template-columns: 1fr;
    }
    
    .features-tabs {
      flex-direction: column;
    }
    
    .pricing-grid {
      grid-template-columns: 1fr;
    }
  }
  </style>