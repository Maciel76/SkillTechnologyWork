<template>
  <section class="beneficios">
    <div class="beneficios-inner">
      <div class="beneficios-header">
        <h2>
          A Parceria Certa para
          <span class="highlight">Resultados Reais</span>
        </h2>
        <p>
          Unimos tecnologia, segurança e suporte dedicado para impulsionar o
          crescimento do seu negócio.
        </p>
      </div>

      <div class="beneficios-grid">
        <article
          class="beneficio-card"
          v-for="(benefit, index) in benefits"
          :key="index"
        >
          <span
            class="beneficio-icone"
            :style="{ backgroundColor: benefit.bgColor, color: benefit.color }"
          >
            <i :class="benefit.icon"></i>
          </span>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "BenefitsSection",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      benefits: [
        {
          icon: "fas fa-bolt",
          color: "#F59E0B", // Amber
          bgColor: "rgba(245, 158, 11, 0.12)",
          title: "Rápido e Eficiente",
          description:
            "Automatize tarefas e aumente a produtividade da sua equipe com soluções ágeis e de alta performance.",
        },
        {
          icon: "fas fa-shield-alt",
          color: "#10B981", // Emerald
          bgColor: "rgba(16, 185, 129, 0.12)",
          title: "Segurança Garantida",
          description:
            "Proteja seus dados com criptografia de ponta a ponta e as melhores práticas de segurança do mercado.",
        },
        {
          icon: "fas fa-headset",
          color: "#0052ff", // Azul da marca
          bgColor: "rgba(0, 82, 255, 0.1)",
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
    this.$el.querySelectorAll(".beneficio-card").forEach((card) => {
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
.beneficios {
  padding: 5.5rem 5%;
  background: #f6f5f1;
}

.beneficios-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.beneficios-header {
  max-width: 640px;
  margin: 0 auto 3rem;
  text-align: center;
}

.beneficios-header h2 {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #131a4d;
}

.highlight {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.beneficios-header p {
  font-size: 1.08rem;
  line-height: 1.6;
  color: #6b7194;
}

.beneficios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.beneficio-card {
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 28px rgba(19, 26, 77, 0.06);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.beneficio-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.beneficio-card:nth-child(2) {
  transition-delay: 0.1s;
}

.beneficio-card:nth-child(3) {
  transition-delay: 0.2s;
}

.beneficio-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.12);
}

.beneficio-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 1.35rem;
  border-radius: 14px;
  font-size: 1.25rem;
}

.beneficio-card h3 {
  margin: 0 0 0.65rem;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #131a4d;
}

.beneficio-card p {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.65;
  color: #6b7194;
}

@media (max-width: 768px) {
  .beneficios {
    padding: 3.5rem 1.25rem;
  }

  .beneficios-header {
    margin-bottom: 2.25rem;
  }

  .beneficios-header h2 {
    font-size: 1.95rem;
  }

  .beneficios-header p {
    font-size: 1rem;
  }

  .beneficio-card {
    padding: 1.6rem 1.35rem;
  }
}

/* Respeita quem prefere menos animação */
@media (prefers-reduced-motion: reduce) {
  .beneficio-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
