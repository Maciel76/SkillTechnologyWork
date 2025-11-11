<template>
  <div class="ecommerce-page">
    <!-- **Hero Section - Imersivo com IA** -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">E-commerce impulsionado por</span>
            <span class="title-line highlight">
              <span class="ai-text">IA Inteligente</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Vendas escaláveis, experiência personalizada e automação preditiva
            para seu e-commerce.
          </p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToDemo">
              Quero um E-commerce IA
            </button>
            <div class="trust-badges">
              <div class="badge">
                <span>+300%</span>
                <small>Conversão em lojas</small>
              </div>
              <div class="badge">
                <span>24/7</span>
                <small>Automação com IA</small>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="ai-dashboard">
            <div class="screen">
              <div class="ai-mockup">
                <div class="ai-header">
                  <div class="ai-chip">IA ATIVA</div>
                  <h3>Dashboard de Performance</h3>
                </div>
                <div class="ai-stats">
                  <div class="stat">
                    <span class="stat-value">+142%</span>
                    <span class="stat-label">ROI em 30 dias</span>
                  </div>
                  <div class="ai-graph"></div>
                </div>
                <div class="ai-recommendation">
                  <div class="ai-message">
                    <div class="ai-avatar">🤖</div>
                    <p>
                      "Recomendo destacar o produto X em promoção relâmpago!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Descubra o poder da IA</span>
        <div class="arrow"></div>
      </div>
    </section>
  </div>
</template>

<script>
// import PortfolioEcommece from "./Portifolio/PortfolioEcommece.vue";
export default {
  name: "EcommerceAI",
  data() {
    return {};
  },
  methods: {
    scrollToDemo() {
      // A seção de demonstração foi removida.
      // Você pode adicionar aqui a lógica para rolar para outra seção, se necessário.
      console.log("Botão CTA clicado!");
    },
  },
};
</script>

<style scoped>
/* 🎨 Estilo Completo - E-commerce IA */
.ecommerce-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* 🌈 Hero Section - Futurista */
.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle,
      rgba(251, 191, 36, 0.1) 0%,
      transparent 70%
    ),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.ai-text {
  position: relative;
  display: inline-block;
}

.ai-text::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(251, 191, 36, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #fbbf24;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.3);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-button {
  background: #fbbf24;
  color: #1e293b;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  position: relative;
  overflow: hidden;
}

.cta-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.cta-button:hover {
  background: #f59e0b;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
}

.cta-button:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

.trust-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.badge span {
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  background: linear-gradient(90deg, #fbbf24, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge small {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.ai-dashboard {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;
}

.screen {
  background: #1e293b;
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: rotateX(10deg) rotateY(-5deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.ai-dashboard:hover .screen {
  transform: rotateX(5deg) rotateY(0deg);
}

.ai-mockup {
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  position: relative;
}

.ai-header {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-chip {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ai-chip::before {
  content: "";
  width: 8px;
  height: 8px;
  background: #fbbf24;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.ai-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.ai-stats {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #fbbf24;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #94a3b8;
}

.ai-graph {
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.ai-graph::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(251, 191, 36, 0.3),
    transparent
  );
  animation: graphWave 3s infinite linear;
}

@keyframes graphWave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.ai-recommendation {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.9);
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.ai-message {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.ai-message p {
  margin: 0;
  font-size: 0.9rem;
  color: #e2e8f0;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  margin-top: 8px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

/* 📱 Responsividade Avançada */
/* The remaining styles are for the hero section and its elements,
     which are kept as requested. */
@media (max-width: 1024px) {
  .hero-content,
  .demo-container {
    /* This class is no longer used but kept for media query structure */
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .cta-container {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }
}
</style>
