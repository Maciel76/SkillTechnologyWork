<template>
  <div class="dashboard-overview">
    <StatsCards />

    <div class="charts-section">
      <div class="chart-card">
        <h3>Desempenho de Leads</h3>
        <div class="chart-placeholder">
          <canvas ref="leadsChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <h3>Receita por Serviço</h3>
        <div class="chart-placeholder">
          <canvas ref="revenueChart"></canvas>
        </div>
      </div>
    </div>

    <div class="recent-activities">
      <h3>Atividades Recentes</h3>
      <div class="activity-list">
        <div class="activity-item">
          <div class="activity-icon">
            <i class="fas fa-user-plus"></i>
          </div>
          <div class="activity-details">
            <p>Novo lead recebido - João Silva</p>
            <span class="activity-time">Há 10 minutos</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="activity-details">
            <p>Projeto "Site Corporativo" concluído</p>
            <span class="activity-time">Há 2 horas</span>
          </div>
        </div>
        <div class="activity-item">
          <div class="activity-icon">
            <i class="fas fa-comment"></i>
          </div>
          <div class="activity-details">
            <p>Novo depoimento recebido</p>
            <span class="activity-time">Há 5 horas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StatsCards from "./StatsCards.vue";

export default {
  name: "DashboardOverview",
  components: {
    StatsCards,
  },
};
</script>

<style scoped>
.dashboard-overview {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 24px;
}

.chart-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chart-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.chart-card h3 {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--gray-900);
  letter-spacing: -0.3px;
}

.chart-placeholder {
  height: 280px;
  background: linear-gradient(135deg, var(--gray-50), var(--gray-100));
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-400);
  font-weight: 500;
  border: 2px dashed var(--gray-300);
}

.recent-activities {
  background: white;
  border-radius: var(--border-radius);
  padding: 28px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.recent-activities:hover {
  box-shadow: var(--shadow-lg);
}

.recent-activities h3 {
  margin-bottom: 24px;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--gray-900);
  letter-spacing: -0.3px;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px;
  border-radius: var(--border-radius-sm);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.activity-item:hover {
  background: var(--gray-50);
  transform: translateX(4px);
}

.activity-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #f0f7ff, #e0effe);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 18px;
  transition: all 0.3s;
}

.activity-item:hover .activity-icon {
  transform: scale(1.1) rotate(-5deg);
  box-shadow: var(--shadow-md);
}

.activity-details {
  flex: 1;
}

.activity-details p {
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--gray-800);
  font-size: 14.5px;
}

.activity-time {
  font-size: 13px;
  color: var(--gray-500);
  font-weight: 500;
}

@media (max-width: 1200px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}
</style>
