<template>
  <section class="hero-section">
    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          <span class="title-line">Design de Interface</span>
          <span class="title-line highlight">
            <span class="tech-text">{{ typedText }}</span>
            <span class="pulse-dot"></span>
          </span>
        </h1>
        <p class="hero-subtitle">Criamos experiências digitais intuitivas e encantadoras que conectam marcas e usuários. Do conceito à implementação com atenção a cada detalhe.</p>
        <div class="cta-container">
          <button class="cta-button">Fale com nossos designers</button>
          <button class="cta-button secondary">Ver Cases</button>
        </div>
        <div class="tech-stack">
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/figma-1.svg" alt="Figma" title="Figma">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/adobe-xd.svg" alt="Adobe XD" title="Adobe XD">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/sketch-2.svg" alt="Sketch" title="Sketch">
          </div>
          <div class="tech-icon">
            <img src="https://cdn.worldvectorlogo.com/logos/zeplin-1.svg" alt="Zeplin" title="Zeplin">
          </div>
        </div>
      </div>
      <div class="hero-visual">
        <div class="desktop-mockup">
          <div class="desktop-frame">
            <div class="desktop-screen" style="background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
          </div>
          <div class="desktop-stand"></div>
        </div>
        <div class="mobile-mockup">
          <div class="mobile-frame">
            <div class="mobile-screen" style="background-image: url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll-indicator">
      <span>Explore nossos projetos</span>
      <div class="arrow"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroInterface',
  data() {
    return {
      texts: ["que Encanta", "Intuitiva", "Acessível", "Humanizada"],
      typedText: "",
      currentTextIndex: 0,
      isDeleting: false,
      typingSpeed: 100,
      deleteSpeed: 50,
      pauseBetweenTexts: 2000
    }
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      const currentText = this.texts[this.currentTextIndex];
      
      if (this.isDeleting) {
        this.typedText = currentText.substring(0, this.typedText.length - 1);
      } else {
        this.typedText = currentText.substring(0, this.typedText.length + 1);
      }
      
      let typeDelay = this.isDeleting ? this.deleteSpeed : this.typingSpeed;
      
      if (!this.isDeleting && this.typedText === currentText) {
        typeDelay = this.pauseBetweenTexts;
        this.isDeleting = true;
      } else if (this.isDeleting && this.typedText === "") {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        typeDelay = 500;
      }
      
      setTimeout(this.typeText, typeDelay);
    }
  }
}
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
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
  background: rgba(99, 102, 241, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
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
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cta-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.tech-stack {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tech-icon img {
  height: 40px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.tech-icon img:hover {
  opacity: 1;
  transform: translateY(-3px);
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* Desktop Mockup */
.desktop-mockup {
  position: relative;
  width: 600px;
  z-index: 2;
  margin-right: -100px;
}

.desktop-frame {
  width: 100%;
  height: 360px;
  background: #0f172a;
  border-radius: 12px 12px 0 0;
  padding: 12px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.desktop-screen {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-size: cover;
  background-position: center;
}

.desktop-stand {
  width: 120px;
  height: 20px;
  background: #0f172a;
  margin: 0 auto;
  position: relative;
  border-radius: 0 0 4px 4px;
}

.desktop-stand::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 8px;
  background: #0f172a;
  border-radius: 0 0 8px 8px;
}

/* Mobile Mockup */
.mobile-mockup {
  position: relative;
  width: 180px;
  height: 360px;
  background: #0f172a;
  border-radius: 24px;
  padding: 12px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
  z-index: 3;
  margin-bottom: -80px;
}

.mobile-frame {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.mobile-screen {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }
  
  .hero-visual {
    order: -1;
    margin-bottom: 3rem;
    flex-direction: column;
    align-items: center;
  }

  .desktop-mockup {
    margin-right: 0;
    margin-bottom: 40px;
  }

  .mobile-mockup {
    margin-bottom: 0;
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
    flex-direction: column;
    width: 100%;
  }
  
  .cta-button {
    width: 100%;
  }
  
  .desktop-mockup {
    width: 100%;
  }
}
</style>