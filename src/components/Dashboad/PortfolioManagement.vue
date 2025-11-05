<template>
  <div class="portfolio-management">
    <div class="section-header">
      <h2>Gerenciamento de Portfólio</h2>
      <button class="btn-primary"><i class="fas fa-plus"></i> Novo Item</button>
    </div>

    <div class="portfolio-filters">
      <button class="filter-btn active">Todos</button>
      <button class="filter-btn">Websites</button>
      <button class="filter-btn">Aplicativos</button>
      <button class="filter-btn">Design</button>
      <button class="filter-btn">Branding</button>
    </div>

    <div class="portfolio-grid">
      <div class="portfolio-item" v-for="item in portfolioItems" :key="item.id">
        <div class="portfolio-image">
          <img :src="item.image" :alt="item.title" />
          <div class="portfolio-overlay">
            <button class="btn-primary">Ver Detalhes</button>
          </div>
        </div>
        <div class="portfolio-info">
          <h3>{{ item.title }}</h3>
          <p>{{ item.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PortfolioManagement",
  data() {
    return {
      portfolioItems: [
        {
          id: 1,
          title: "Site Corporativo XYZ",
          category: "Websites",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 2,
          title: "App de Delivery",
          category: "Aplicativos",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 3,
          title: "Identidade Visual ABC",
          category: "Branding",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 4,
          title: "Landing Page Produto",
          category: "Websites",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 5,
          title: "Redesign Plataforma",
          category: "Design",
          image: "https://via.placeholder.com/300x200",
        },
        {
          id: 6,
          title: "App Financeiro",
          category: "Aplicativos",
          image: "https://via.placeholder.com/300x200",
        },
      ],
    };
  },
};
</script>

<style scoped>
.portfolio-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.portfolio-filters {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.filter-btn {
  background: white;
  border: 2px solid var(--gray-200);
  padding: 10px 24px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: var(--gray-700);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-btn:hover {
  border-color: var(--primary-light);
  background: var(--gray-50);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.portfolio-item {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.portfolio-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(99, 102, 241, 0.9),
    rgba(139, 92, 246, 0.9)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-info {
  padding: 20px;
}

.portfolio-info h3 {
  margin-bottom: 8px;
  font-weight: 700;
  color: var(--gray-900);
  font-size: 1.15rem;
  letter-spacing: -0.2px;
}

.portfolio-info p {
  color: var(--gray-600);
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-filters {
    gap: 8px;
  }

  .filter-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>
