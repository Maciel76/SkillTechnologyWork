<template>
  <section class="ultra-premium-hero">
    <!-- Slider de Fundo com Efeito Parallax -->
    <div class="hero-slider" @mousemove="handleParallax">
      <div
        class="slide"
        v-for="(slide, index) in slides"
        :key="index"
        :class="{ active: currentSlide === index }"
        :style="{
          backgroundImage: `url(${slide.image})`,
          transform: `translateX(${parallaxOffset.x * 0.3}px) translateY(${
            parallaxOffset.y * 0.3
          }px)`,
        }"
      >
        <div class="slide-overlay"></div>
      </div>
    </div>

    <!-- Conteúdo Principal -->
    <div class="hero-content">
      <div class="container">
        <!-- Textos Dinâmicos -->
        <div class="dynamic-titles">
          <transition-group name="slide-fade" tag="div">
            <div
              class="title-group"
              v-for="(slide, index) in slides"
              v-show="currentSlide === index"
              :key="'title-' + index"
            >
              <h1 class="main-title">
                <span class="title-line">{{ slide.titleLine1 }}</span>
                <span class="title-line">{{ slide.titleLine2 }}</span>
              </h1>
              <p class="subtitle">{{ slide.subtitle }}</p>
            </div>
          </transition-group>
        </div>

        <!-- CTAs -->
        <div class="cta-section">
          <a href="#contato" class="premium-cta">
            <span class="cta-text">Agende uma Consulta</span>
            <div class="cta-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="cta-hover-effect"></div>
          </a>
          <div class="divider">
            <span>ou</span>
          </div>
          <a href="tel:+551112345678" class="phone-cta">
            <div class="phone-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C14.03 20.92 9.08 15.97 9.08 11V9C9.08 8.45 9.53 8 10.08 8H13.08C13.63 8 14.08 8.45 14.08 9V11C14.08 14.31 16.77 17 20.08 17H21C21.55 17 22 17.45 22 18V18.01Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.03 12C20.03 7.05 15.97 3 11 3H8C7.45 3 7 3.45 7 4V7C7 11.97 11.03 16 16 16H19C19.55 16 20 15.55 20 15V12.01Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="phone-number">(11) 1234-5678</span>
          </a>
        </div>

        <!-- Controles do Slider -->
        <div class="slider-controls">
          <button class="slider-prev" @click="prevSlide">
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

          <div class="slider-pagination">
            <span class="current-slide">0{{ currentSlide + 1 }}</span>
            <span class="divider">/</span>
            <span class="total-slides">0{{ slides.length }}</span>
          </div>

          <button class="slider-next" @click="nextSlide">
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

    <!-- Elementos Decorativos -->
    <div class="decorative-elements">
      <div class="scroll-indicator">
        <span>Scroll</span>
        <div class="indicator-line"></div>
      </div>
      <div class="decorative-shape"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "UltraPremiumHero",
  data() {
    return {
      currentSlide: 0,
      slideInterval: null,
      parallaxOffset: { x: 0, y: 0 },
      slides: [
        {
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          titleLine1: "Excelência Jurídica",
          titleLine2: "com Tradição e Honra",
          subtitle:
            "25 anos defendendo direitos com integridade e determinação",
        },
        {
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          titleLine1: "Defesa Especializada",
          titleLine2: "em Casos Complexos",
          subtitle:
            "Soluções estratégicas personalizadas para cada situação jurídica",
        },
        {
          image:
            "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          titleLine1: "Equipe de Elite",
          titleLine2: "Altamente Qualificada",
          subtitle:
            "Advogados especialistas com vasta experiência em tribunais",
        },
      ],
    };
  },
  mounted() {
    this.startSlider();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    clearInterval(this.slideInterval);
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    startSlider() {
      this.slideInterval = setInterval(() => {
        this.nextSlide();
      }, 6000);
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.resetAnimation();
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.resetAnimation();
    },
    goToSlide(index) {
      this.currentSlide = index;
      clearInterval(this.slideInterval);
      this.startSlider();
      this.resetAnimation();
    },
    resetAnimation() {
      // Força re-render para reiniciar animações
      this.$nextTick(() => {
        // Adiciona lógica de reinício de animações se necessário
      });
    },
    handleParallax(e) {
      const x = (e.clientX / window.innerWidth) * 20 - 10;
      const y = (e.clientY / window.innerHeight) * 20 - 10;
      this.parallaxOffset = { x, y };
    },
    handleScroll() {
      // Efeitos adicionais baseados no scroll podem ser adicionados aqui
    },
  },
};
</script>

<style scoped>
:root {
  --primary: #1a3e72;
  --primary-dark: #0f2447;
  --secondary: #d4af37;
  --secondary-light: #e8c252;
  --dark: #0a192f;
  --light: #f8f9fa;
  --lighter: #ffffff;
  --gray: #6c757d;
}

.ultra-premium-hero {
  position: relative;
  height: 100vh;
  min-height: 800px;
  overflow: hidden;
  margin-top: 80px;
}

/* Slider de Fundo com Efeito Parallax */
.hero-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.2s cubic-bezier(0.645, 0.045, 0.355, 1),
    transform 0.8s ease-out;
  z-index: 1;
  will-change: transform;
}

.slide.active {
  opacity: 1;
  z-index: 2;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    89deg,
    rgba(26, 62, 114, 0.85) 0%,
    rgba(26, 62, 114, 0.75) 100%
  );
}

/* Conteúdo Principal */
.hero-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  align-items: center;
  color: var(--lighter);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Textos Dinâmicos */
.dynamic-titles {
  position: relative;
  height: 300px;
  margin-bottom: 80px;
  overflow: hidden;
}

.title-group {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.main-title {
  color: rgb(255, 255, 255);
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 25px;
  letter-spacing: -0.5px;
}

.title-line {
  display: block;
  overflow: hidden;
}

.title-line span {
  display: inline-block;
  transform: translateY(120%);
  opacity: 0;
  animation: titleReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.slide-fade-enter-active .title-line span {
  animation: titleReveal 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.slide-fade-leave-active .title-line span {
  animation: titleOut 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

.title-line:nth-child(1) span {
  animation-delay: 0.3s;
}

.title-line:nth-child(2) span {
  animation-delay: 0.6s;
}

.subtitle {
  font-size: 1.5rem;
  line-height: 1.6;
  max-width: 70%;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.9s;
}

.slide-fade-enter-active .subtitle {
  animation: fadeInUp 1s cubic-bezier(0.19, 1, 0.22, 1) forwards 0.9s;
}

.slide-fade-leave-active .subtitle {
  animation: fadeOutDown 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
}

/* Seção CTA */
.cta-section {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 100px;
}

.premium-cta {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--secondary);
  color: var(--dark);
  padding: 18px 35px;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
}

.premium-cta:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
}

.cta-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.3) 100%
  );
  transform: translateX(-100%);
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: -1;
}

.premium-cta:hover .cta-hover-effect {
  transform: translateX(0);
}

.cta-icon {
  width: 20px;
  height: 20px;
  margin-left: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.premium-cta:hover .cta-icon {
  transform: translateX(5px);
}

.divider {
  position: relative;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.divider:before,
.divider:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 40px;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider:before {
  right: 100%;
  margin-right: 15px;
}

.divider:after {
  left: 100%;
  margin-left: 15px;
}

.phone-cta {
  display: flex;
  align-items: center;
  color: var(--lighter);
  text-decoration: none;
  transition: all 0.3s;
}

.phone-cta:hover {
  color: var(--secondary);
}

.phone-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(238, 234, 234, 0.1);
  border-radius: 50%;
  margin-right: 15px;
  transition: all 0.3s;
}

.phone-cta:hover .phone-icon {
  background: var(--secondary);
  color: var(--dark);
}

.phone-number {
  font-weight: 500;
  font-size: 1.1rem;
}

/* Controles do Slider */
.slider-controls {
  display: flex;
  align-items: center;
  gap: 30px;
}

.slider-prev,
.slider-next {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  color: var(--lighter);
  cursor: pointer;
  transition: all 0.3s;
}

.slider-prev:hover,
.slider-next:hover {
  background: var(--secondary);
  color: var(--dark);
  transform: translateY(-3px);
}

.slider-prev svg,
.slider-next svg {
  width: 24px;
  height: 24px;
}

.slider-pagination {
  display: flex;
  align-items: baseline;
  font-family: "Playfair Display", serif;
  font-size: 1.2rem;
  color: var(--lighter);
}

.current-slide {
  font-size: 2rem;
  font-weight: 700;
  color: var(--secondary);
  margin-right: 5px;
}

.divider {
  margin: 0 5px;
  font-weight: 300;
  opacity: 0.6;
}

.total-slides {
  font-weight: 300;
  opacity: 0.6;
}

/* Elementos Decorativos */
.decorative-elements {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  pointer-events: none;
}

.scroll-indicator {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.indicator-line {
  width: 1px;
  height: 60px;
  background: rgba(255, 255, 255, 0.3);
  margin-top: 15px;
  position: relative;
  overflow: hidden;
}

.indicator-line:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--lighter);
  animation: scrollIndicator 2s infinite;
}

.decorative-shape {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: var(--lighter);
  clip-path: polygon(0 40%, 100% 0, 100% 100%, 0% 100%);
}

/* Animações */
@keyframes titleReveal {
  from {
    transform: translateY(120%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes titleOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-120%);
    opacity: 0;
  }
}

@keyframes fadeInUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fadeOutDown {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(30px);
    opacity: 0;
  }
}

@keyframes scrollIndicator {
  0% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(100%);
  }
}

/* Responsividade */
@media (max-width: 1200px) {
  .main-title {
    font-size: 3.2rem;
  }

  .subtitle {
    font-size: 1.3rem;
    max-width: 80%;
  }
}

@media (max-width: 992px) {
  .main-title {
    font-size: 2.8rem;
  }

  .subtitle {
    font-size: 1.1rem;
    max-width: 100%;
  }

  .cta-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .ultra-premium-hero {
    min-height: 700px;
  }

  .main-title {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .premium-cta {
    padding: 16px 25px;
  }

  .slider-controls {
    gap: 20px;
  }

  .slider-prev,
  .slider-next {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 1.8rem;
  }

  .container {
    padding: 0 20px;
  }

  .dynamic-titles {
    height: 250px;
    margin-bottom: 50px;
  }

  .decorative-shape {
    height: 60px;
  }
}
</style>
