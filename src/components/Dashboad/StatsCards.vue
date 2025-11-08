<template>
  <div class="stats-cards">
    <div class="stat-card">
      <div class="stat-icon leads">
        <i class="fas fa-users"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.totalVisitors }}</h3>
        <p>Visitantes Totais</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon projects">
        <i class="fas fa-user-check"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.uniqueVisitors }}</h3>
        <p>Visitantes Únicos</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon revenue">
        <i class="fas fa-eye"></i>
      </div>
      <div class="stat-info">
        <h3>{{ stats.pageViews }}</h3>
        <p>Visualizações</p>
      </div>
    </div>
    <div class="stat-card">
      <div class="stat-icon tasks">
        <i class="fas fa-chart-line"></i>
      </div>
      <div class="stat-info">
        <h3>{{ engagementRate }}%</h3>
        <p>Taxa de Engajamento</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStats } from "../composables/useStats";

export default {
  name: "StatsCards",
  setup() {
    const { stats, loading } = useStats();

    const engagementRate = computed(() => {
      if (stats.value.uniqueVisitors === 0) return 0;
      return (
        (stats.value.pageViews / stats.value.uniqueVisitors) *
        100
      ).toFixed(1);
    });

    return {
      stats,
      loading,
      engagementRate,
    };
  },
};
</script>

<style scoped>
.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.stat-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 28px 24px;
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--gray-200);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transform: scaleX(0);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.stat-card:hover::before {
  transform: scaleX(1);
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: white;
  position: relative;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover .stat-icon {
  transform: scale(1.1) rotate(-5deg);
}

.stat-icon.leads {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.stat-icon.projects {
  background: linear-gradient(135deg, #f59e0b, #fb923c);
}

.stat-icon.revenue {
  background: linear-gradient(135deg, #10b981, #34d399);
}

.stat-icon.tasks {
  background: linear-gradient(135deg, #ef4444, #f43f5e);
}

.stat-info {
  flex: 1;
}

.stat-info h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--gray-900);
  letter-spacing: -0.5px;
}

.stat-info p {
  color: var(--gray-500);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

@media (max-width: 992px) {
  .stats-cards {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .stat-card {
    padding: 20px 18px;
  }

  .stat-icon {
    width: 52px;
    height: 52px;
    font-size: 22px;
  }

  .stat-info h3 {
    font-size: 1.6rem;
  }
}
</style>
