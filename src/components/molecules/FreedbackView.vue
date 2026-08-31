<template>
  <section class="depoimentos">
    <div class="depoimentos-inner">
      <div class="depoimentos-header">
        <h2>
          O Que Dizem
          <span class="highlight">Nossos Clientes</span>
        </h2>
      </div>

      <div class="depoimentos-grid">
        <article
          class="depoimento-card"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <span class="aspas">
            <font-awesome-icon icon="quote-left" />
          </span>

          <div class="estrelas" aria-label="5 de 5 estrelas">
            <font-awesome-icon v-for="star in 5" :key="star" icon="star" />
          </div>

          <p class="depoimento-texto">{{ testimonial.text }}</p>

          <footer class="depoimento-autor">
            <span class="avatar" :style="{ background: testimonial.cor }">
              {{ iniciais(testimonial.name) }}
            </span>
            <div class="autor-dados">
              <h3>{{ testimonial.name }}</h3>
              <span class="empresa">{{ testimonial.company }}</span>
            </div>
            <span class="tipo-projeto">{{ testimonial.projectType }}</span>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsPage",
  data() {
    return {
      testimonials: [
        {
          name: "Carlos Mendes",
          company: "Startup Tech",
          text: "O aplicativo que desenvolveram superou todas nossas expectativas. Em 6 meses já tínhamos 500 mil usuários ativos e uma taxa de retenção impressionante.",
          projectType: "App Completo",
          cor: "linear-gradient(135deg, #0052ff, #7c6ef2)",
        },
        {
          name: "Ana Lúcia Silva",
          company: "E-commerce Fashion",
          text: "Nosso novo site aumentou as conversões em 180% e reduziu a taxa de rejeição. O cuidado com a experiência do usuário foi excepcional.",
          projectType: "Loja Virtual",
          cor: "linear-gradient(135deg, #f59e0b, #f97316)",
        },
        {
          name: "Roberto Almeida",
          company: "Construtora Alpha",
          text: "A landing page que criaram para nossa campanha teve uma taxa de conversão de 12%, muito acima da média do setor. Resultados impressionantes!",
          projectType: "Landing Premium",
          cor: "linear-gradient(135deg, #10b981, #22c55e)",
        },
      ],
    };
  },
  methods: {
    // Avatar por iniciais evita depender de foto externa
    iniciais(nome) {
      return nome
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();
    },
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
    this.$el.querySelectorAll(".depoimento-card").forEach((card) => {
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
.depoimentos {
  padding: 5.5rem 5%;
  background: #fff;
}

.depoimentos-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.depoimentos-header {
  margin-bottom: 3rem;
  text-align: center;
}

.depoimentos-header h2 {
  margin: 0;
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

.depoimentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.depoimento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem 1.5rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.depoimento-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.depoimento-card:nth-child(2) {
  transition-delay: 0.1s;
}

.depoimento-card:nth-child(3) {
  transition-delay: 0.2s;
}

.depoimento-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.1);
}

.aspas {
  position: absolute;
  top: 1.35rem;
  right: 1.5rem;
  font-size: 1.6rem;
  color: #ebeaf7;
}

.estrelas {
  display: flex;
  gap: 0.15rem;
  margin-bottom: 1rem;
  color: #f59e0b;
  font-size: 0.85rem;
}

.depoimento-texto {
  flex: 1;
  margin: 0 0 1.75rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5280;
}

.depoimento-autor {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eeede7;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
}

.autor-dados {
  flex: 1;
  min-width: 0;
}

.autor-dados h3 {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  color: #131a4d;
}

.empresa {
  font-size: 0.85rem;
  color: #9aa0b8;
}

.tipo-projeto {
  flex: 0 0 auto;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(0, 82, 255, 0.08);
  font-size: 0.76rem;
  font-weight: 600;
  color: #0052ff;
}

@media (max-width: 768px) {
  .depoimentos {
    padding: 3.5rem 1.25rem;
  }

  .depoimentos-header {
    margin-bottom: 2.25rem;
  }

  .depoimentos-header h2 {
    font-size: 1.95rem;
  }

  .depoimento-card {
    padding: 1.6rem 1.35rem 1.35rem;
  }

  .depoimento-autor {
    flex-wrap: wrap;
  }

  .tipo-projeto {
    width: 100%;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .depoimento-card {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
