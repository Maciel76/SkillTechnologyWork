<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- Conteúdo de Texto -->
      <div class="hero-content">
        <div class="hero-tag">
          <span>Inovação em IA</span>
        </div>
        <h1>
          <span class="title-line">Potencialize Seu Negócio com</span>
          <span class="title-line highlight">
            <span class="tech-text">Soluções de IA</span>
            <span class="pulse-dot"></span>
          </span>
          <span class="title-line">Sob Medida</span>
        </h1>
        <p class="hero-subtitle">
          Automatização, personalização e escalabilidade para sua empresa crescer mais rápido com nossa plataforma inteligente
        </p>
        
        <div class="cta-container">
          <button class="cta-button">
            <span>Conhecer Soluções</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="secondary-button">
            <span>Agende Demonstração</span>
          </button>
        </div>
        
        <div class="tech-stack">
          <div class="tech-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow">
            <span>TensorFlow</span>
          </div>
          <div class="tech-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" alt="PyTorch">
            <span>PyTorch</span>
          </div>
          <div class="tech-item">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python">
            <span>Python</span>
          </div>
        </div>
      </div>
      
      <!-- Visual Hero -->
      <div class="hero-visual">
        <div class="ai-dashboard">
          <img 
            src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Dashboard de IA" 
            class="dashboard-image"
            loading="lazy"
          />
          <div class="floating-elements">
            <div class="floating-card" style="--delay: 0.2s">
              <span>📊 Análise Preditiva</span>
            </div>
            <div class="floating-card" style="--delay: 0.4s">
              <span>🤖 Chatbots Inteligentes</span>
            </div>
            <div class="floating-card" style="--delay: 0.6s">
              <span>🔍 Visão Computacional</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Indicador de Scroll -->
    <div class="scroll-indicator">
      <span>Explore nossas soluções</span>
      <div class="arrow-down"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SlideService',
  mounted() {
    // Adiciona efeito de digitação opcional
    this.typeEffect();
  },
  methods: {
    typeEffect() {
      const elements = document.querySelectorAll('.tech-text');
      const texts = ["Soluções de IA", "Machine Learning", "Deep Learning", "Processamento NLP"];
      let count = 0;
      
      const typeWriter = () => {
        const currentText = texts[count % texts.length];
        let i = 0;
        const typing = setInterval(() => {
          if (i < currentText.length) {
            elements.forEach(el => {
              el.textContent = currentText.substring(0, i+1);
            });
            i++;
          } else {
            clearInterval(typing);
            setTimeout(() => {
              this.deleteText(elements, currentText.length);
            }, 2000);
          }
        }, 100);
      };
      
      typeWriter();
    },
    deleteText(elements, length) {
      let i = length;
      const deleting = setInterval(() => {
        if (i >= 0) {
          elements.forEach(el => {
            el.textContent = el.textContent.substring(0, i);
          });
          i--;
        } else {
          clearInterval(deleting);
          this.typeEffect();
        }
      }, 50);
    }
  }
};
</script>

<style scoped>
/* Estilos Base */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  color: #1e293b;
  padding: 6rem 2rem 8rem;
  overflow: hidden;
}

[data-theme="dark"] .hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #f8fafc;
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

/* Conteúdo do Hero */
.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-tag {
  display: inline-block;
  background: rgba(0, 82, 255, 0.1);
  color: #0052FF;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

[data-theme="dark"] .hero-tag {
  background: rgba(0, 82, 255, 0.2);
}

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.tech-text {
  position: relative;
  display: inline-block;
}

.tech-text::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(0, 82, 255, 0.2);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #0052FF;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  color: #64748b;
}

[data-theme="dark"] .hero-subtitle {
  color: #94a3b8;
}

/* Botões CTA */
.cta-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cta-button {
  background: #0052FF;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 82, 255, 0.3);
}

.cta-button:hover {
  background: #0046d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 82, 255, 0.4);
}

.secondary-button {
  background: transparent;
  color: #0052FF;
  border: 2px solid #0052FF;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.secondary-button:hover {
  background: rgba(0, 82, 255, 0.05);
  transform: translateY(-2px);
}

/* Tech Stack */
.tech-stack {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .tech-item {
  background: rgba(30, 41, 59, 0.5);
}

.tech-item img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.tech-item span {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Visual do Hero */
.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.ai-dashboard {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .ai-dashboard {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.dashboard-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.hero-visual:hover .dashboard-image {
  transform: scale(1.02);
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.floating-card {
  position: absolute;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
  animation-delay: var(--delay);
  opacity: 0;
  animation-fill-mode: forwards;
}

[data-theme="dark"] .floating-card {
  background: #1e293b;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.floating-card:nth-child(1) {
  top: 10%;
  left: -5%;
}

.floating-card:nth-child(2) {
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
}

.floating-card:nth-child(3) {
  bottom: 10%;
  left: 20%;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: #64748b;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

[data-theme="dark"] .scroll-indicator {
  color: #94a3b8;
}

.arrow-down {
  width: 24px;
  height: 24px;
  margin-top: 0.5rem;
  animation: bounce 2s infinite;
}

.arrow-down::before {
  content: '';
  display: block;
  width: 12px;
  height: 12px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg);
  margin-top: 4px;
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    gap: 3rem;
  }
  
  .hero-content {
    text-align: center;
    max-width: 100%;
  }
  
  .cta-container {
    justify-content: center;
  }
  
  .tech-stack {
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 4rem 1.5rem 6rem;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .cta-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .cta-button, .secondary-button {
    width: 100%;
    justify-content: center;
  }
  
  .floating-card {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-tag {
    font-size: 0.8rem;
  }
}
</style>