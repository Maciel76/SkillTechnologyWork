<template>
  <section class="como-funciona">
    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">
          Como <span class="highlight">Funciona</span>
        </h2>
        <p class="section-subtitle">
          Do primeiro contato ao sistema funcionando — em 4 passos simples.
        </p>
      </div>

      <div class="steps-grid">
        <div
          class="step-card"
          v-for="(step, index) in steps"
          :key="index"
        >
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-icon">
            <i :class="step.icon"></i>
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <div class="step-connector" v-if="index < steps.length - 1">
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
              <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="#0052ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <router-link to="/contato" class="cta-button">
          Comece Seu Projeto Agora
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ComoFunciona",
  data() {
    return {
      steps: [
        {
          icon: "fas fa-comments",
          title: "Você nos conta sua ideia",
          description:
            "Entre em contato e descreva o que precisa. Fazemos uma consultoria gratuita para entender seu projeto e objetivos.",
        },
        {
          icon: "fas fa-drafting-compass",
          title: "Planejamos a solução",
          description:
            "Nossa equipe analisa o cenário, define a arquitetura e escolhe as melhores tecnologias e IAs para o seu projeto.",
        },
        {
          icon: "fas fa-robot",
          title: "Desenvolvemos com IA",
          description:
            "Utilizamos inteligência artificial para acelerar o desenvolvimento, garantindo qualidade e eficiência máxima.",
        },
        {
          icon: "fas fa-rocket",
          title: "Entregamos funcionando",
          description:
            "Seu sistema é entregue pronto para uso, com suporte, treinamento e manutenção inclusos.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.como-funciona {
  padding: 6rem 1rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .como-funciona {
  background: #0f172a;
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
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

[data-theme="dark"] .section-subtitle {
  color: #94a3b8;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  position: relative;
}

.step-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .step-card {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

.step-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 82, 255, 0.1);
}

.step-number {
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  width: 36px;
  height: 36px;
  background: #0052ff;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 82, 255, 0.3);
}

.step-icon {
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}

.step-icon i {
  font-size: 2.5rem;
  color: #0052ff;
}

.step-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.75rem;
}

[data-theme="dark"] .step-card h3 {
  color: #f8fafc;
}

.step-card p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
}

[data-theme="dark"] .step-card p {
  color: #94a3b8;
}

.step-connector {
  display: none;
}

.cta-wrapper {
  text-align: center;
  margin-top: 3rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #0052ff;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 82, 255, 0.3);
}

.cta-button:hover {
  background: #0046d9;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 82, 255, 0.4);
}

@media (max-width: 1024px) {
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .como-funciona {
    padding: 4rem 1rem;
  }

  .steps-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
