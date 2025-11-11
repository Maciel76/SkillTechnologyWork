<template>
  <div class="recent-activities">
    <div class="activities-header">
      <h3>Atividades Recentes</h3>
      <button class="view-all-btn" @click="viewAll">
        Ver Todas <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Carregando atividades...</p>
    </div>

    <div v-else class="activities-list">
      <div
        v-for="activity in activities"
        :key="activity.id"
        class="activity-item"
        :class="activity.type"
      >
        <div class="activity-icon" :class="activity.type">
          <i :class="activity.icon"></i>
        </div>
        <div class="activity-content">
          <div class="activity-title">{{ activity.title }}</div>
          <div class="activity-description">{{ activity.description }}</div>
          <div class="activity-time">
            <i class="fas fa-clock"></i> {{ activity.time }}
          </div>
        </div>
        <div class="activity-badge" :class="activity.type">
          {{ activity.badge }}
        </div>
      </div>
    </div>

    <div v-if="!loading && activities.length === 0" class="empty-state">
      <i class="fas fa-inbox"></i>
      <p>Nenhuma atividade recente</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecentActivities",
  data() {
    return {
      loading: false,
      activities: [
        {
          id: 1,
          type: "lead",
          icon: "fas fa-user-plus",
          title: "Novo Lead Cadastrado",
          description: "João Silva enviou uma solicitação de orçamento",
          time: "Há 5 minutos",
          badge: "Novo",
        },
        {
          id: 2,
          type: "project",
          icon: "fas fa-check-circle",
          title: "Projeto Concluído",
          description: "Website E-commerce foi finalizado e entregue",
          time: "Há 30 minutos",
          badge: "Concluído",
        },
        {
          id: 3,
          type: "contact",
          icon: "fas fa-envelope",
          title: "Nova Mensagem",
          description: "Maria Oliveira enviou uma mensagem de contato",
          time: "Há 1 hora",
          badge: "Mensagem",
        },
        {
          id: 4,
          type: "blog",
          icon: "fas fa-blog",
          title: "Post Publicado",
          description: "Artigo sobre SEO foi publicado no blog",
          time: "Há 2 horas",
          badge: "Publicado",
        },
        {
          id: 5,
          type: "testimonial",
          icon: "fas fa-star",
          title: "Novo Depoimento",
          description: "Cliente deixou avaliação 5 estrelas",
          time: "Há 3 horas",
          badge: "5 ",
        },
        {
          id: 6,
          type: "ecommerce",
          icon: "fas fa-shopping-cart",
          title: "Nova Venda",
          description: "Produto Premium foi vendido",
          time: "Há 5 horas",
          badge: "Venda",
        },
      ],
    };
  },
  methods: {
    viewAll() {
      this.$emit("view-all-activities");
    },
    async loadActivities() {
      this.loading = true;
      // Aqui você pode fazer uma chamada à API para carregar as atividades
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  mounted() {
    // this.loadActivities();
  },
};
</script>

<style scoped>
.recent-activities {
  background: white;
  border-radius: var(--border-radius);
  padding: 24px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
}

.activities-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--gray-100);
}

.activities-header h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--gray-900);
}

.view-all-btn {
  background: transparent;
  border: none;
  color: var(--primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-all-btn:hover {
  background: var(--gray-50);
  transform: translateX(4px);
}

.loading-state {
  text-align: center;
  padding: 40px;
  color: var(--gray-500);
}

.loading-state i {
  font-size: 2rem;
  margin-bottom: 12px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 600px;
  overflow-y: auto;
  padding-right: 8px;
}

.activities-list::-webkit-scrollbar {
  width: 6px;
}

.activities-list::-webkit-scrollbar-track {
  background: var(--gray-100);
  border-radius: 3px;
}

.activities-list::-webkit-scrollbar-thumb {
  background: var(--gray-300);
  border-radius: 3px;
}

.activities-list::-webkit-scrollbar-thumb:hover {
  background: var(--gray-400);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: var(--gray-50);
  border-radius: 12px;
  border-left: 4px solid var(--primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.activity-item:hover {
  background: var(--gray-100);
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.activity-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.activity-icon.lead {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.activity-icon.project {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.activity-icon.contact {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #b45309;
}

.activity-icon.blog {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #3730a3;
}

.activity-icon.testimonial {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  color: #9f1239;
}

.activity-icon.ecommerce {
  background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
  color: #5b21b6;
}

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: 4px;
}

.activity-description {
  font-size: 0.9rem;
  color: var(--gray-600);
  margin-bottom: 8px;
}

.activity-time {
  font-size: 0.85rem;
  color: var(--gray-500);
  display: flex;
  align-items: center;
  gap: 6px;
}

.activity-time i {
  font-size: 0.75rem;
}

.activity-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.activity-badge.lead {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
}

.activity-badge.project {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
}

.activity-badge.contact {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #b45309;
}

.activity-badge.blog {
  background: linear-gradient(135deg, #e0e7ff, #c7d2fe);
  color: #3730a3;
}

.activity-badge.testimonial {
  background: linear-gradient(135deg, #fce7f3, #fbcfe8);
  color: #9f1239;
}

.activity-badge.ecommerce {
  background: linear-gradient(135deg, #ddd6fe, #c4b5fd);
  color: #5b21b6;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--gray-400);
}

.empty-state i {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .activity-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-badge {
    align-self: flex-start;
  }
}
</style>
