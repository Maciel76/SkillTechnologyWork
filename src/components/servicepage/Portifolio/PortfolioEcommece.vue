<template>
  <section class="portfolio-section" id="portfolio">
    <div class="container">
      <!-- Cabeçalho com Filtros -->
      <div class="portfolio-header">
        <h2 class="section-title">
          <span class="title-part">Cases Reais de</span>
          <span class="title-part highlight">E-commerce IA</span>
        </h2>
        <p class="section-subtitle">Resultados mensuráveis em lojas que implementaram nossa solução</p>
        
        <div class="filter-buttons">
          <button 
            v-for="(filter, index) in filters" 
            :key="index"
            @click="activeFilter = filter.value"
            :class="{ active: activeFilter === filter.value }"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <!-- Grid de Cases -->
      <div class="portfolio-grid">
        <div 
          class="portfolio-item" 
          v-for="(item, index) in filteredPortfolio" 
          :key="index"
          :style="{ '--hue': index * 60 }"
        >
          <div class="item-header">
            <div class="client-logo">
              <img :src="item.logo" :alt="item.client">
            </div>
            <div class="client-info">
              <h3>{{ item.client }}</h3>
              <span class="industry">{{ item.industry }}</span>
            </div>
            <div class="ai-badge">
              <span>IA Nível {{ item.aiLevel }}</span>
            </div>
          </div>

          <div class="item-image">
            <img :src="item.image" :alt="'Loja ' + item.client">
            <div class="image-overlay">
              <button class="view-button">Ver Detalhes</button>
            </div>
          </div>

          <div class="item-stats">
            <div class="stat">
              <span class="stat-value">{{ item.stats.conversion }}%</span>
              <span class="stat-label">Conversão</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ item.stats.growth }}x</span>
              <span class="stat-label">Crescimento</span>
            </div>
            <div class="stat">
              <span class="stat-value">{{ item.stats.roi }}%</span>
              <span class="stat-label">ROI</span>
            </div>
          </div>

          <div class="item-features">
            <span v-for="(feature, fIndex) in item.features" :key="fIndex">
              {{ feature }}
            </span>
          </div>
        </div>
      </div>

      <!-- CTA Final -->
      <div class="portfolio-cta">
        <h3>Seu e-commerce pode ser o próximo case de sucesso!</h3>
        <button class="cta-button">Quero Resultados Similares</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PortfolioEcommerceIA',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { label: 'Todos', value: 'all' },
        { label: 'Alta Conversão', value: 'conversion' },
        { label: 'Crescimento', value: 'growth' },
        { label: 'ERP Integrado', value: 'erp' },
        { label: 'Chatbot IA', value: 'chatbot' }
      ],
      portfolioItems: [
        {
          client: "Moda Trends",
          industry: "Moda Feminina",
          logo: "https://via.placeholder.com/80x80/f1f5f9/64748b?text=MT",
          image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          aiLevel: 3,
          stats: {
            conversion: 5.8,
            growth: 4.2,
            roi: 320
          },
          features: [
            "Recomendação IA",
            "Precificação Dinâmica",
            "Chatbot de Vendas"
          ],
          tags: ['conversion', 'chatbot']
        },
        {
          client: "TechGadgets",
          industry: "Eletrônicos",
          logo: "https://via.placeholder.com/80x80/f1f5f9/64748b?text=TG",
          image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          aiLevel: 2,
          stats: {
            conversion: 3.5,
            growth: 2.8,
            roi: 210
          },
          features: [
            "Busca Predictiva",
            "Anúncios Automatizados",
            "ERP Integrado"
          ],
          tags: ['growth', 'erp']
        },
        {
          client: "Casa & Estilo",
          industry: "Decoração",
          logo: "https://via.placeholder.com/80x80/f1f5f9/64748b?text=CE",
          image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          aiLevel: 1,
          stats: {
            conversion: 4.1,
            growth: 3.5,
            roi: 180
          },
          features: [
            "Personalização",
            "Email Automatizado"
          ],
          tags: ['conversion']
        },
        {
          client: "Saúde Natural",
          industry: "Produtos Naturais",
          logo: "https://via.placeholder.com/80x80/f1f5f9/64748b?text=SN",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          aiLevel: 3,
          stats: {
            conversion: 6.2,
            growth: 5.1,
            roi: 410
          },
          features: [
            "Chatbot de Vendas",
            "Estoque Inteligente",
            "CRM IA"
          ],
          tags: ['conversion', 'chatbot', 'growth']
        }
      ]
    }
  },
  computed: {
  filteredPortfolio() {
    if (this.activeFilter === 'all') return this.portfolioItems;
    return this.portfolioItems.filter(item => 
      item.tags.includes(this.activeFilter)
    ); // <--- Adicionando ponto e vírgula para encerrar a função corretamente
  } // <--- Fechando corretamente a chave da função
}
}
</script>

<style scoped>
.portfolio-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.portfolio-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.title-part {
  display: block;
}

.highlight {
  color: #4f46e5;
}

.section-subtitle {
  color: #64748b;
  max-width: 700px;
  margin: 0 auto 2rem;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.filter-buttons button {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-buttons button:hover {
  border-color: #c7d2fe;
}

.filter-buttons button.active {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.portfolio-item {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
}

.portfolio-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.15);
}

.item-header {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
  position: relative;
}

.client-logo {
  width: 50px;
  height: 50px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.client-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.client-info {
  flex: 1;
}

.client-info h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.industry {
  font-size: 0.85rem;
  color: #64748b;
}

.ai-badge {
  position: absolute;
  top: -12px;
  right: 1.5rem;
  background: hsl(var(--hue), 80%, 60%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  box-shadow: 0 3px 10px hsla(var(--hue), 80%, 60%, 0.3);
}

.item-image {
  height: 200px;
  position: relative;
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-item:hover .image-overlay {
  opacity: 1;
}

.view-button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.view-button:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.item-stats {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4f46e5;
  display: block;
}

.stat-label {
  font-size: 0.8rem;
  color: #64748b;
}

.item-features {
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item-features span {
  background: #f1f5f9;
  color: #4f46e5;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.portfolio-cta {
  text-align: center;
  margin-top: 4rem;
}

.portfolio-cta h3 {
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.cta-button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

.cta-button:hover {
  background: #4338ca;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

/* Responsividade */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
    -webkit-overflow-scrolling: touch;
  }
}
</style>