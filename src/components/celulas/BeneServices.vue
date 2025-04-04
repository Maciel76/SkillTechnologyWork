<template>
    <section class="benefits-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Vantagens Exclusivas da Nossa <span class="highlight">Inteligência Artificial</span></h2>
          <p class="section-subtitle">Soluções que transformam dados em resultados tangíveis para seu negócio</p>
        </div>
        
        <div class="benefits-grid">
          <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
            <div class="card-icon">
              <div class="icon-bg" :style="{ backgroundColor: benefit.color }">
                <img :src="benefit.icon" :alt="benefit.title" class="icon-img">
              </div>
            </div>
            <h3 class="card-title">{{ benefit.title }}</h3>
            <p class="card-description">{{ benefit.description }}</p>
            <ul class="card-features">
              <li v-for="(feature, fIndex) in benefit.features" :key="fIndex">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                {{ feature }}
              </li>
            </ul>
            <div class="card-hover">
              <button class="learn-more">Saiba mais</button>
            </div>
          </div>
        </div>
        
        <div class="section-footer">
          <p class="footer-text">Todos os nossos clientes têm acesso a:</p>
          <div class="footer-badges">
            <span class="badge">Suporte 24/7</span>
            <span class="badge">Atualizações gratuitas</span>
            <span class="badge">Treinamento especializado</span>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'BeneficioPage',
    data() {
      return {
        benefits: [
          {
            icon: 'https://api.iconify.design/heroicons:currency-dollar.svg',
            title: 'Redução de Custos',
            description: 'Automatização inteligente reduzindo significativamente as tarefas manuais',
            features: [
              'Redução de até 70% em processos repetitivos',
              'Otimização de recursos humanos',
              'Menor necessidade de infraestrutura'
            ],
            color: 'rgba(16, 185, 129, 0.1)'
          },
          {
            icon: 'https://api.iconify.design/heroicons:arrow-trending-up.svg',
            title: 'Aumento de Produtividade',
            description: 'Fluxos de trabalho otimizados para máxima eficiência',
            features: [
              'Processamento 10x mais rápido',
              'Integração com sistemas existentes',
              'Relatórios automáticos'
            ],
            color: 'rgba(99, 102, 241, 0.1)'
          },
          {
            icon: 'https://api.iconify.design/heroicons:user-group.svg',
            title: 'Experiência Personalizada',
            description: 'Soluções adaptáveis para cada cliente e necessidade',
            features: [
              'Recomendações inteligentes',
              'Chatbots 24/7',
              'Análise de comportamento'
            ],
            color: 'rgba(236, 72, 153, 0.1)'
          },
          {
            icon: 'https://api.iconify.design/heroicons:arrow-path.svg',
            title: 'Escalabilidade',
            description: 'Crescimento sem preocupações com performance',
            features: [
              'Infraestrutura elástica',
              'Processamento em nuvem',
              'Adaptação automática à demanda'
            ],
            color: 'rgba(245, 158, 11, 0.1)'
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos Base */
  .benefits-section {
    padding: 6rem 1rem;
    background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
    position: relative;
    overflow: hidden;
  }
  
  [data-theme="dark"] .benefits-section {
    background: linear-gradient(to bottom, #0f172a 0%, #1e293b 100%);
  }
  
  .section-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  /* Cabeçalho */
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }
  
  .section-title {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: #1e293b;
  }
  
  [data-theme="dark"] .section-title {
    color: #f8fafc;
  }
  
  .highlight {
    color: #0052FF;
    position: relative;
  }
  
  .highlight::after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 0;
    width: 100%;
    height: 8px;
    background: rgba(0, 82, 255, 0.2);
    z-index: -1;
    border-radius: 4px;
    transform: skewX(-15deg);
  }
  
  .section-subtitle {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 700px;
    margin: 0 auto;
  }
  
  [data-theme="dark"] .section-subtitle {
    color: #94a3b8;
  }
  
  /* Grid de Benefícios */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  
  /* Cards de Benefícios */
  .benefit-card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.03);
  }
  
  [data-theme="dark"] .benefit-card {
    background: #1e293b;
    border-color: rgba(255, 255, 255, 0.05);
  }
  
  .benefit-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }
  
  .card-icon {
    margin-bottom: 1.5rem;
  }
  
  .icon-bg {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  .icon-img {
    width: 32px;
    height: 32px;
    color: white;
  }
  
  .card-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-align: center;
    color: #1e293b;
  }
  
  [data-theme="dark"] .card-title {
    color: #f8fafc;
  }
  
  .card-description {
    color: #64748b;
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }
  
  [data-theme="dark"] .card-description {
    color: #94a3b8;
  }
  
  .card-features {
    list-style: none;
    padding: 0;
    margin-bottom: 2rem;
  }
  
  .card-features li {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    color: #475569;
    font-size: 0.95rem;
  }
  
  [data-theme="dark"] .card-features li {
    color: #cbd5e1;
  }
  
  .card-features svg {
    flex-shrink: 0;
    color: #10b981;
    margin-top: 2px;
  }
  
  .card-hover {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 0.9) 0%, transparent 100%);
    padding: 2rem 2rem 1.5rem;
    opacity: 0;
    transition: all 0.3s ease;
    text-align: center;
  }
  
  [data-theme="dark"] .card-hover {
    background: linear-gradient(to top, rgba(30, 41, 59, 0.9) 0%, transparent 100%);
  }
  
  .benefit-card:hover .card-hover {
    opacity: 1;
    transform: translateY(0);
  }
  
  .learn-more {
    background: #0052FF;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .learn-more:hover {
    background: #0046d9;
    transform: translateY(-2px);
  }
  
  /* Rodapé da Seção */
  .section-footer {
    text-align: center;
    padding-top: 3rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  [data-theme="dark"] .section-footer {
    border-top-color: rgba(255, 255, 255, 0.05);
  }
  
  .footer-text {
    color: #64748b;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
  
  [data-theme="dark"] .footer-text {
    color: #94a3b8;
  }
  
  .footer-badges {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .badge {
    background: rgba(0, 82, 255, 0.1);
    color: #0052FF;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
  }
  
  [data-theme="dark"] .badge {
    background: rgba(0, 82, 255, 0.2);
  }
  
  /* Responsividade */
  @media (max-width: 1024px) {
    .benefits-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .benefits-section {
      padding: 4rem 1rem;
    }
    
    .section-header {
      margin-bottom: 2rem;
    }
    
    .benefits-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .benefit-card {
      padding: 1.5rem;
    }
    
    .card-hover {
      position: static;
      opacity: 1;
      background: none;
      padding: 1rem 0 0;
    }
  }
  
  @media (max-width: 480px) {
    .section-title {
      font-size: 1.8rem;
    }
    
    .section-subtitle {
      font-size: 1rem;
    }
    
    .footer-badges {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>