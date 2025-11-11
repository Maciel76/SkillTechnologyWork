<template>
  <div class="main-content-wrapper">
    <div class="welcome-section">
      <div class="welcome-content">
        <h1>Bem-vindo ao Dashboard</h1>
        <p>Gerencie todo o conteúdo da sua agência em um só lugar</p>
      </div>
      <div class="quick-actions">
        <button class="quick-action-btn" @click="$emit('create-project')">
          <i class="fas fa-plus-circle"></i>
          <span>Novo Projeto</span>
        </button>
        <button class="quick-action-btn" @click="$emit('view-leads')">
          <i class="fas fa-users"></i>
          <span>Ver Leads</span>
        </button>
        <button class="quick-action-btn" @click="$emit('create-post')">
          <i class="fas fa-blog"></i>
          <span>Nova Postagem</span>
        </button>
      </div>
    </div>

    <div class="content-grid">
      <!-- Resumo de Atividades -->
      <div class="content-card">
        <div class="card-header">
          <h3>Resumo do Dia</h3>
          <i class="fas fa-calendar-day"></i>
        </div>
        <div class="card-body">
          <div class="summary-item">
            <i class="fas fa-envelope summary-icon"></i>
            <div class="summary-info">
              <span class="summary-label">Novos Contatos</span>
              <span class="summary-value">8</span>
            </div>
          </div>
          <div class="summary-item">
            <i class="fas fa-check-circle summary-icon"></i>
            <div class="summary-info">
              <span class="summary-label">Tarefas Concluídas</span>
              <span class="summary-value">15</span>
            </div>
          </div>
          <div class="summary-item">
            <i class="fas fa-clock summary-icon"></i>
            <div class="summary-info">
              <span class="summary-label">Tarefas Pendentes</span>
              <span class="summary-value">23</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance -->
      <div class="content-card">
        <div class="card-header">
          <h3>Performance</h3>
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="card-body">
          <div class="performance-metric">
            <span class="metric-label">Taxa de Conversão</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 68%"></div>
            </div>
            <span class="metric-value">68%</span>
          </div>
          <div class="performance-metric">
            <span class="metric-label">Satisfação do Cliente</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 92%"></div>
            </div>
            <span class="metric-value">92%</span>
          </div>
          <div class="performance-metric">
            <span class="metric-label">Entregas no Prazo</span>
            <div class="metric-bar">
              <div class="metric-fill" style="width: 85%"></div>
            </div>
            <span class="metric-value">85%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainContent",
  emits: ["create-project", "view-leads", "create-post"],
};
</script>

<style scoped>
.main-content-wrapper {
  width: 100%;
}

.welcome-section {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: var(--border-radius);
  padding: 32px;
  margin-bottom: 32px;
  color: white;
  box-shadow: var(--shadow-lg);
}

.welcome-content h1 {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.welcome-content p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

.quick-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.quick-action-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.quick-action-btn i {
  font-size: 1.2rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.content-card {
  background: white;
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.content-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--gray-100);
}

.card-header h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--gray-800);
}

.card-header i {
  font-size: 1.5rem;
  color: var(--primary);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: var(--gray-50);
  border-radius: 12px;
  transition: all 0.3s;
}

.summary-item:hover {
  background: var(--gray-100);
  transform: translateX(4px);
}

.summary-icon {
  font-size: 1.8rem;
  color: var(--primary);
  width: 40px;
  text-align: center;
}

.summary-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.summary-label {
  font-size: 0.9rem;
  color: var(--gray-600);
}

.summary-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--gray-900);
}

.performance-metric {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-label {
  font-size: 0.95rem;
  color: var(--gray-600);
  font-weight: 500;
}

.metric-bar {
  height: 12px;
  background: var(--gray-100);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.metric-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 6px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.metric-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  text-align: right;
}

@media (max-width: 768px) {
  .welcome-section {
    padding: 24px;
  }

  .welcome-content h1 {
    font-size: 1.8rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
