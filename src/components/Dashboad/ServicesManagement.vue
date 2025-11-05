<template>
  <div class="services-management">
    <div class="section-header">
      <h2>Gerenciamento de Serviços</h2>
      <button class="btn-primary">
        <i class="fas fa-plus"></i> Novo Serviço
      </button>
    </div>

    <div class="services-grid">
      <div class="service-card" v-for="service in services" :key="service.id">
        <div class="service-icon">
          <i :class="service.icon"></i>
        </div>
        <h3>{{ service.name }}</h3>
        <p>{{ service.description }}</p>
        <div class="service-price">
          <span class="price">{{ service.price }}</span>
          <span class="period">{{ service.period }}</span>
        </div>
        <div class="service-actions">
          <button class="btn-secondary">Editar</button>
          <button class="btn-primary">Ver Detalhes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ServicesManagement",
  data() {
    return {
      services: [
        {
          id: 1,
          name: "Website Corporativo",
          description: "Desenvolvimento de sites institucionais responsivos",
          icon: "fas fa-laptop-code",
          price: "R$ 2.500",
          period: "único",
        },
        {
          id: 2,
          name: "Loja Virtual",
          description: "E-commerce completo com painel administrativo",
          icon: "fas fa-shopping-cart",
          price: "R$ 4.500",
          period: "único",
        },
        {
          id: 3,
          name: "SEO",
          description: "Otimização para mecanismos de busca",
          icon: "fas fa-search",
          price: "R$ 800",
          period: "/mês",
        },
        {
          id: 4,
          name: "Social Media",
          description: "Gestão completa de redes sociais",
          icon: "fas fa-hashtag",
          price: "R$ 1.200",
          period: "/mês",
        },
      ],
    };
  },
};
</script>

<style scoped>
.services-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.service-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 32px 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-icon {
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 32px;
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover .service-icon {
  transform: scale(1.1) rotate(-5deg);
}

.service-card h3 {
  margin-bottom: 12px;
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.35rem;
  letter-spacing: -0.3px;
}

.service-card p {
  color: var(--gray-600);
  margin-bottom: 20px;
  line-height: 1.6;
  font-size: 14.5px;
}

.service-price {
  margin-bottom: 24px;
  padding: 16px;
  background: var(--gray-50);
  border-radius: var(--border-radius-sm);
}

.price {
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.period {
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 600;
  margin-left: 4px;
}

.service-actions {
  display: flex;
  gap: 12px;
}

.service-actions button {
  flex: 1;
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
