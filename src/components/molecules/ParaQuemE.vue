<template>
  <section class="para-quem">
    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">
          Para Quem <span class="highlight">É</span>
        </h2>
        <p class="section-subtitle">
          Atendemos negócios de todos os tamanhos que querem crescer com
          tecnologia e automação inteligente.
        </p>
      </div>

      <div class="clients-grid">
        <div
          class="client-card"
          v-for="(client, index) in clients"
          :key="index"
          :style="{ '--accent': client.color }"
        >
          <div class="client-icon">
            <i :class="client.icon"></i>
          </div>
          <h3>{{ client.title }}</h3>
          <p>{{ client.description }}</p>
          <div class="client-example">
            <span class="example-label">Exemplo:</span>
            <span>{{ client.example }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ParaQuemE",
  data() {
    return {
      clients: [
        {
          icon: "fas fa-stethoscope",
          title: "Clínicas & Saúde",
          description:
            "Sistemas de agendamento, prontuários digitais e automação de atendimento.",
          example: "Sistema de gestão clínica com agendamento online e lembretes automáticos.",
          color: "#10B981",
        },
        {
          icon: "fas fa-shopping-bag",
          title: "E-commerces",
          description:
            "Lojas virtuais completas com gestão de estoque, pagamentos e logística integrada.",
          example: "Loja com catálogo inteligente, recomendações por IA e checkout otimizado.",
          color: "#8B5CF6",
        },
        {
          icon: "fas fa-lightbulb",
          title: "Startups",
          description:
            "MVPs rápidos, plataformas SaaS e sistemas escaláveis para validar e crescer.",
          example: "Plataforma SaaS com dashboard, assinaturas e integração com APIs externas.",
          color: "#F59E0B",
        },
        {
          icon: "fas fa-industry",
          title: "Indústrias",
          description:
            "Automação de processos, dashboards de produção e integração com ERPs existentes.",
          example: "Painel de controle de produção com alertas em tempo real e relatórios por IA.",
          color: "#3B82F6",
        },
        {
          icon: "fas fa-briefcase",
          title: "Escritórios & Serviços",
          description:
            "Sistemas internos, CRMs personalizados e automação de tarefas repetitivas.",
          example: "CRM personalizado com follow-up automático e geração de propostas por IA.",
          color: "#EF4444",
        },
        {
          icon: "fas fa-utensils",
          title: "Restaurantes & Delivery",
          description:
            "Cardápios digitais, sistemas de pedidos online e gestão integrada.",
          example: "App de delivery próprio com gestão de pedidos e integração com cozinha.",
          color: "#EC4899",
        },
      ],
    };
  },
};
</script>

<style scoped>
.para-quem {
  padding: 6rem 1rem;
  background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
  position: relative;
}

[data-theme="dark"] .para-quem {
  background: linear-gradient(to bottom, #1e293b 0%, #0f172a 100%);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

[data-theme="dark"] .section-title {
  color: #f8fafc;
}

.highlight {
  color: #0052ff;
  position: relative;
}

.highlight::after {
  content: "";
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
  line-height: 1.6;
}

[data-theme="dark"] .section-subtitle {
  color: #94a3b8;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.client-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .client-card {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

.client-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--accent);
}

.client-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

.client-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.client-icon i {
  font-size: 1.5rem;
  color: var(--accent);
}

.client-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

[data-theme="dark"] .client-card h3 {
  color: #f8fafc;
}

.client-card > p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1rem;
}

[data-theme="dark"] .client-card > p {
  color: #94a3b8;
}

.client-example {
  background: #f8fafc;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: #475569;
  line-height: 1.5;
}

[data-theme="dark"] .client-example {
  background: #0f172a;
  color: #94a3b8;
}

.example-label {
  font-weight: 700;
  color: var(--accent);
  margin-right: 0.25rem;
}

@media (max-width: 1024px) {
  .clients-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .para-quem {
    padding: 4rem 1rem;
  }

  .clients-grid {
    grid-template-columns: 1fr;
  }
}
</style>
