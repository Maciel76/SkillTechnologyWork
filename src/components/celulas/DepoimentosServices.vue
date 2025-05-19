<template>
  <main>
    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <h2>Depoimentos de Nossos <span class="highlight">Clientes </span></h2>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="client-info">
            <img
              src="@/assets/images/avatars/user5.png"
              alt="Client"
              class="client-avatar"
            />
            <div>
              <h3>João Silva</h3>
              <p>CEO, Tech Solutions</p>
            </div>
          </div>
          <p class="testimonial-text">
            "A implementação da IA revolucionou nossos processos internos,
            reduzindo custos em 40% e aumentando a produtividade em 60%."
          </p>
          <router-link to="#" class="learn-more">Ver Projeto →</router-link>
        </div>
        <div class="testimonial-card">
          <div class="client-info">
            <img
              src="@/assets/images/avatars/user6.png"
              alt="Client"
              class="client-avatar"
            />
            <div>
              <h3>Guilherme Santos</h3>
              <p>CEO, Tech Solutions</p>
            </div>
          </div>
          <p class="testimonial-text">
            "A implementação da IA revolucionou nossos processos internos,
            reduzindo custos em 40% e aumentando a produtividade em 60%."
          </p>
          <router-link to="#" class="learn-more">Ver Projeto →</router-link>
        </div>
        <div class="testimonial-card">
          <div class="client-info">
            <img
              src="@/assets/images/avatars/user3.png"
              alt="Client"
              class="client-avatar"
            />
            <div>
              <h3>Maria Santos</h3>
              <p>Marketing Director, E-commerce</p>
            </div>
          </div>
          <p class="testimonial-text">
            "O sistema de marketing automatizado nos ajudou a triplicar nossas
            conversões em apenas 3 meses."
          </p>
          <router-link to="#" class="learn-more">Ver Projeto →</router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "TestimonialsPage",
};
</script>

<style scoped>
/* Testimonials Section */
.testimonials-section {
  padding: 5rem 5%;
  background: #e5e7eb;
}

.testimonials-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1d1f;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
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
  background: rgba(15, 198, 211, 0.2);
  z-index: 1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.client-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.client-info h3 {
  font-size: 1.2rem;
  color: #1a1d1f;
  margin-bottom: 0.25rem;
}

.client-info p {
  font-size: 0.9rem;
  color: #666666;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 1.5rem;
}

.learn-more {
  color: #0052ff;
  text-decoration: none;
  font-weight: 500;
  transition: transform 0.3s ease, color 0.3s ease;
}

.learn-more:hover {
  color: #2c6add;
  transform: translateX(10px);
}

/* Responsividade */
@media (max-width: 768px) {
  .testimonials-section h2 {
    font-size: 2rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .testimonial-card {
    padding: 1.5rem;
  }
}
</style>
