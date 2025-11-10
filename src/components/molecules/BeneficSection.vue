<template>
  <div class="benefits-section">
    <div class="section-header">
      <h2>
        A Parceria Certa para
        <span class="highlight">Resultados Reais</span>
      </h2>
      <p>
        Unimos tecnologia, segurança e suporte dedicado para impulsionar o
        crescimento do seu negócio.
      </p>
    </div>
    <div class="benefits-grid">
      <div
        class="benefit-card"
        v-for="(benefit, index) in benefits"
        :key="index"
      >
        <div
          class="benefit-icon-wrapper"
          :style="{ backgroundColor: benefit.bgColor }"
        >
          <i :class="benefit.icon" :style="{ color: benefit.color }"></i>
        </div>
        <h3>{{ benefit.title }}</h3>
        <p>{{ benefit.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "BenefitsSection",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      benefits: [
        {
          icon: "fas fa-bolt",
          color: "#F59E0B", // Amber
          bgColor: "rgba(245, 158, 11, 0.1)",
          title: "Rápido e Eficiente",
          description:
            "Automatize tarefas e aumente a produtividade da sua equipe com soluções ágeis e de alta performance.",
        },
        {
          icon: "fas fa-shield-alt",
          color: "#10B981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.1)",
          title: "Segurança Garantida",
          description:
            "Proteja seus dados com criptografia de ponta a ponta e as melhores práticas de segurança do mercado.",
        },
        {
          icon: "fas fa-headset",
          color: "#3B82F6", // Blue
          bgColor: "rgba(59, 130, 246, 0.1)",
          title: "Suporte 24/7",
          description:
            "Nossa equipe de especialistas está sempre disponível para ajudar e resolver qualquer problema rapidamente.",
        },
      ],
    };
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Animação acontece apenas uma vez
          }
        });
      },
      {
        threshold: 0.1, // A animação começa quando 10% do card está visível
      }
    );

    // Observa cada card
    this.$el.querySelectorAll(".benefit-card").forEach((card) => {
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
.benefits-section {
  margin-top: 4rem;
  padding: 4rem 2rem;
  background-color: #f8fafc;
  border-radius: 16px;
}

[data-theme="dark"] .benefits-section {
  background-color: #1e293b;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  display: block; /* Garante que o container se comporte como um bloco */
}

.section-header h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: #1e293b;
}

[data-theme="dark"] .section-header h2 {
  color: #f8fafc;
}

.highlight {
  color: #0052ff;
}

.section-header p {
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

[data-theme="dark"] .section-header p {
  color: #94a3b8;
}

.benefits-grid {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.benefit-card {
  text-align: center;
  max-width: 320px;
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  /* Estado inicial para a animação */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out,
    box-shadow 0.3s ease;
}

/* Atraso escalonado para cada card */
.benefit-card:nth-of-type(1) {
  transition-delay: 0.1s;
}
.benefit-card:nth-of-type(2) {
  transition-delay: 0.2s;
}
.benefit-card:nth-of-type(3) {
  transition-delay: 0.3s;
}

.benefit-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-theme="dark"] .benefit-card {
  background: #0f172a;
  border-color: #334155;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.benefit-icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.benefit-icon-wrapper i {
  font-size: 2.25rem;
}

.benefit-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
}

[data-theme="dark"] .benefit-card h3 {
  color: #f8fafc;
}

.benefit-card p {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
}

[data-theme="dark"] .benefit-card p {
  color: #94a3b8;
}

@media (max-width: 768px) {
  .benefits-grid {
    flex-direction: column;
    align-items: center;
  }

  .section-header h2 {
    font-size: 1.8rem;
  }
}
</style>
