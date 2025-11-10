<template>
  <div class="testimonials-page">
    <!-- Testimonials -->
    <section class="testimonials-section">
      <h2 class="section-title">
        O Que Dizem <span class="highlight">Nossos Clientes</span>
      </h2>

      <div class="testimonials-slider">
        <div
          class="testimonial-card"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div class="client-rating">
            <span v-for="star in 5" :key="star">★</span>
          </div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="client-info">
            <div
              class="client-avatar"
              :style="{ 'background-image': `url(${testimonial.avatar})` }"
            ></div>
            <div class="client-details">
              <h3>{{ testimonial.name }}</h3>
              <span>{{ testimonial.company }}</span>
              <div class="client-project">
                <img
                  :src="testimonial.projectIcon"
                  :alt="testimonial.projectType"
                />
                <span>{{ testimonial.projectType }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          projectType: "App Completo",
          projectIcon: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
        },
        {
          name: "Ana Lúcia Silva",
          company: "E-commerce Fashion",
          text: "Nosso novo site aumentou as conversões em 180% e reduziu a taxa de rejeição. O cuidado com a experiência do usuário foi excepcional.",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          projectType: "Loja Virtual",
          projectIcon:
            "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
        },
        {
          name: "Roberto Almeida",
          company: "Construtora Aplha",
          text: "A landing page que criaram para nossa campanha teve uma taxa de conversão de 12%, muito acima da média do setor. Resultados impressionantes!",
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
          projectType: "Landing Premium",
          projectIcon:
            "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
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
    this.$el.querySelectorAll(".testimonial-card").forEach((card) => {
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
/* Base Styles */
.testimonials-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
}

.highlight {
  color: #6366f1;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  /* Estado inicial para a animação */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Atraso escalonado para cada card */
.testimonial-card:nth-of-type(1) {
  transition-delay: 0.1s;
}
.testimonial-card:nth-of-type(2) {
  transition-delay: 0.2s;
}
.testimonial-card:nth-of-type(3) {
  transition-delay: 0.3s;
}

.testimonial-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.client-rating {
  color: #fbbf24;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.testimonial-text {
  font-style: italic;
  color: #475569;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  position: absolute;
  top: -20px;
  left: -15px;
  color: #e2e8f0;
  z-index: 0;
}

.testimonial-text p {
  position: relative;
  z-index: 1;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.client-details {
  flex: 1;
}

.client-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.client-details span {
  font-size: 0.9rem;
  color: #64748b;
  display: block;
  margin-bottom: 0.5rem;
}

.client-project {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
}

.client-project img {
  width: 20px;
  height: 20px;
}

/* Responsividade */
@media (max-width: 768px) {
  .testimonials-slider {
    grid-template-columns: 1fr;
  }
}
</style>
