<template>
  <section class="testimonials-section">
    <div class="container">
      <!-- Cabeçalho -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-text">O que nossos clientes dizem</span>
          <span class="title-underline"></span>
        </h2>
        <p class="section-subtitle">
          Depoimentos de quem já confiou em nosso trabalho
        </p>
      </div>

      <!-- Carrossel de Depoimentos -->
      <div class="testimonials-carousel">
        <div
          class="carousel-track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            class="testimonial-card"
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="{ active: currentSlide === index }"
          >
            <!-- Avaliação em estrelas -->
            <div class="rating-stars">
              <span v-for="star in 5" :key="star">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  :fill="star <= testimonial.rating ? '#FFD700' : '#E0E0E0'"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                  />
                </svg>
              </span>
            </div>

            <!-- Texto do depoimento -->
            <blockquote class="testimonial-text">
              "{{ testimonial.text }}"
            </blockquote>

            <!-- Informações do cliente -->
            <div class="client-info">
              <div class="client-avatar">
                <img :src="testimonial.avatar" :alt="testimonial.name" />
              </div>
              <div class="client-details">
                <h4 class="client-name">{{ testimonial.name }}</h4>
                <p class="client-position">{{ testimonial.position }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles do Carrossel -->
        <div class="carousel-controls">
          <button
            class="control-button prev"
            @click="prevSlide"
            aria-label="Depoimento anterior"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 6L9 12L15 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="indicators">
            <button
              v-for="(testimonial, index) in testimonials"
              :key="index"
              @click="goToSlide(index)"
              :class="{ active: currentSlide === index }"
              aria-label="Ir para depoimento"
            ></button>
          </div>

          <button
            class="control-button next"
            @click="nextSlide"
            aria-label="Próximo depoimento"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
  data() {
    return {
      currentSlide: 0,
      testimonials: [
        {
          text: "O escritório Silva & Associados resolveu meu caso trabalhista com maestria. Profissionais extremamente competentes e atenciosos em todas as etapas do processo.",
          name: "Carlos Eduardo",
          position: "Diretor Comercial",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          text: "Fui atendido com excelência em um caso complexo de direito empresarial. A equipe demonstrou profundo conhecimento técnico e conseguiu um resultado além das minhas expectativas.",
          name: "Mariana Silva",
          position: "CEO - TechStart",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          text: "Recomendo fortemente o escritório para questões familiares. Me auxiliaram em um divórcio complicado com sensibilidade e profissionalismo, protegendo meus interesses.",
          name: "Roberto Almeida",
          position: "Engenheiro Civil",
          rating: 4,
          avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        },
        {
          text: "Atendimento impecável na regularização de minha propriedade. Explicaram todo o processo de forma clara e obtivemos sucesso em tempo recorde.",
          name: "Ana Paula",
          position: "Arquiteta",
          rating: 5,
          avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        },
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.testimonials.length) %
        this.testimonials.length;
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
  },
  mounted() {
    // Auto-rotate slides every 5 seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  },
};
</script>

<style scoped>
:root {
  --primary: #1a3e72;
  --primary-light: #2a4e82;
  --secondary: #d4af37;
  --secondary-light: #e4bf47;
  --dark: #0a192f;
  --light: #f8f9fa;
  --lighter: #ffffff;
  --gray: #6c757d;
  --gray-light: #e9ecef;
}

.testimonials-section {
  padding: 100px 0;
  background: var(--light);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Cabeçalho */
.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.title-underline {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(212, 175, 55, 0.3);
  z-index: -1;
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.section-title:hover .title-underline {
  transform: scaleX(0.9);
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--gray);
  max-width: 600px;
  margin: 0 auto;
}

/* Carrossel */
.testimonials-carousel {
  position: relative;
  overflow: hidden;
  padding: 20px 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  will-change: transform;
}

.testimonial-card {
  min-width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  transition: all 0.4s ease;
}

/* Card de Depoimento */
.testimonial-card {
  background: var(--lighter);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.rating-stars {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

.testimonial-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark);
  font-style: italic;
  margin-bottom: 30px;
  position: relative;
}

.testimonial-text:before,
.testimonial-text:after {
  content: '"';
  font-size: 3rem;
  color: var(--secondary);
  opacity: 0.3;
  line-height: 0;
  position: absolute;
}

.testimonial-text:before {
  top: 20px;
  left: -20px;
}

.testimonial-text:after {
  bottom: -20px;
  right: -20px;
}

.client-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--secondary);
}

.client-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.client-details {
  text-align: left;
}

.client-name {
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 5px;
}

.client-position {
  font-size: 0.9rem;
  color: var(--gray);
}

/* Controles do Carrossel */
.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 40px;
}

.control-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--lighter);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.control-button:hover {
  background: var(--secondary);
  color: var(--lighter);
  transform: translateY(-3px);
}

.control-button svg {
  width: 24px;
  height: 24px;
}

.indicators {
  display: flex;
  gap: 10px;
}

.indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: var(--gray-light);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.indicators button.active {
  background: var(--secondary);
  transform: scale(1.2);
}

.indicators button:hover:not(.active) {
  background: var(--gray);
}

/* Responsividade */
@media (max-width: 992px) {
  .section-title {
    font-size: 2.2rem;
  }

  .testimonial-card {
    padding: 30px;
  }
}

@media (max-width: 768px) {
  .testimonials-section {
    padding: 80px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .testimonial-text {
    font-size: 1rem;
  }

  .control-button {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .testimonial-card {
    padding: 25px 20px;
  }

  .client-info {
    flex-direction: column;
    text-align: center;
  }

  .client-details {
    text-align: center;
  }
}
</style>
