<template>
  <div class="charts-section">
    <div class="section-header">
      <h2>Gráficos e Estatísticas</h2>
    </div>

    <div class="charts-grid">
      <!-- Gráfico de Leads por Mês -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Leads por Mês</h3>
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="chart-content">
          <canvas id="leadsChart"></canvas>
        </div>
      </div>

      <!-- Gráfico de Conversão -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Taxa de Conversão</h3>
          <i class="fas fa-chart-pie"></i>
        </div>
        <div class="chart-content">
          <div class="conversion-rate">
            <div class="rate-value">68%</div>
            <div class="rate-label">Taxa Média</div>
          </div>
        </div>
      </div>

      <!-- Gráfico de Projetos -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Status dos Projetos</h3>
          <i class="fas fa-chart-bar"></i>
        </div>
        <div class="chart-content">
          <div class="project-stats">
            <div class="stat-item">
              <span class="stat-label">Em Andamento</span>
              <span class="stat-value">12</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Concluídos</span>
              <span class="stat-value">45</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Pendentes</span>
              <span class="stat-value">8</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráfico de Receita -->
      <div class="chart-card">
        <div class="chart-header">
          <h3>Receita Mensal</h3>
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="chart-content">
          <div class="revenue-display">
            <div class="revenue-value">R$ 45.780</div>
            <div class="revenue-change positive">
              <i class="fas fa-arrow-up"></i> +12.5%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartsSection",
  mounted() {
    this.initializeCharts();
  },
  methods: {
    initializeCharts() {
      // Aqui você pode adicionar a lógica para inicializar gráficos
      // usando bibliotecas como Chart.js, ApexCharts, etc.
      console.log("Charts initialized");
    },
  },
};
</script>

<style scoped>
.charts-section {
  width: 100%;
}

.section-header {
  margin-bottom: 28px;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.chart-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--gray-100);
}

.chart-header h3 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--gray-800);
}

.chart-header i {
  font-size: 1.5rem;
  color: var(--primary);
}

.chart-content {
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.conversion-rate {
  text-align: center;
}

.rate-value {
  font-size: 3rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 8px;
}

.rate-label {
  font-size: 1rem;
  color: var(--gray-600);
}

.project-stats {
  width: 100%;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--gray-100);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--gray-600);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.revenue-display {
  text-align: center;
}

.revenue-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--gray-900);
  margin-bottom: 12px;
}

.revenue-change {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
}

.revenue-change.positive {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.revenue-change i {
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
