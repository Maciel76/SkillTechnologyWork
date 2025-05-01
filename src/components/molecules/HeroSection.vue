<template>
  <section class="hero">
    <!-- Efeito de partículas no background -->
    <div class="particles" id="particles-js"></div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- Social Proof melhorado -->
        <div class="social-proof">
          <div class="avatar-group">
            <img
              v-for="(avatar, index) in avatars"
              :key="index"
              :src="avatar.src"
              :alt="avatar.alt"
              :style="{ zIndex: avatars.length - index }"
              class="user-avatar"
            />
          </div>
          <div class="social-text">
            <span class="rating">
              <span class="stars">★★★★★</span> 5.0 de 150+ avaliações
            </span>
            <router-link to="/feedback" class="see-more">
              Ver depoimentos <span class="arrow">→</span>
            </router-link>
          </div>
        </div>

        <!-- Conteúdo principal com animação -->
        <div class="text-content">
          <h1 class="animated-text">
            <span class="text-wrapper">
              <span class="line line1" v-html="texts[currentIndex].h1"></span>
            </span>
          </h1>

          <p class="animated-subtext">
            <span class="text-wrapper">
              <span class="line" v-html="texts[currentIndex].p"></span>
            </span>
          </p>

          <div class="cta-buttons">
            <router-link
              :to="texts[currentIndex].link"
              class="cta-button primary"
            >
              {{ texts[currentIndex].ctaText }}
              <span class="hover-effect"></span>
            </router-link>

            <router-link to="/contato" class="cta-button secondary">
              Fale Conosco
              <span class="hover-effect"></span>
            </router-link>
          </div>
        </div>

        <!-- Marcas de clientes (opcional) -->
        <div class="client-logos">
          <p>Trabalhamos com as mais modernas e inovadoras tecnologias.</p>
          <div class="logos">
            <img
              v-for="(logo, index) in clientLogos"
              :key="index"
              :src="logo.src"
              :alt="logo.alt"
            />
          </div>
        </div>
      </div>

      <!-- Slider de imagens melhorado -->
      <div class="hero-visual">
        <div
          class="slider-container"
          @mouseenter="pauseSlider"
          @mouseleave="resumeSlider"
        >
          <div class="slider" :style="sliderStyle">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="slide"
              :class="{ active: currentIndex === index }"
            >
              <img
                :src="image.src"
                :alt="image.alt"
                class="slide-image"
                loading="eager"
              />
              <div class="slide-overlay"></div>
            </div>
          </div>

          <!-- Controles do slider -->
          <button
            class="nav-button prev"
            @click="previousSlide"
            aria-label="Slide anterior"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              />
            </svg>
          </button>
          <button
            class="nav-button next"
            @click="nextSlide"
            aria-label="Próximo slide"
          >
            <svg viewBox="0 0 24 24">
              <path
                d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
              />
            </svg>
          </button>

          <!-- Indicadores -->
          <div class="slider-indicators">
            <button
              v-for="(_, index) in images"
              :key="index"
              :class="{ active: currentIndex === index }"
              @click="goToSlide(index)"
              :aria-label="`Ir para slide ${index + 1}`"
            ></button>
          </div>
        </div>

        <!-- Efeito decorativo -->
        <div class="floating-shapes">
          <div class="shape circle"></div>
          <div class="shape triangle"></div>
          <div class="shape square"></div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" @click="scrollToContent">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <span>Explore mais</span>
    </div>
  </section>
</template>

<script>
export default {
  name: "AgencyHero",
  data() {
    return {
      avatars: [
        { src: require("@/assets/images/avatars/user1.png"), alt: "Cliente 1" },
        { src: require("@/assets/images/avatars/user2.png"), alt: "Cliente 2" },
        { src: require("@/assets/images/avatars/user3.png"), alt: "Cliente 3" },
        { src: require("@/assets/images/avatars/user4.png"), alt: "Cliente 4" },
      ],
      clientLogos: [
        {
          src: require("@/assets/images/icons/node.png"),
          alt: "Logo cliente 1",
        },
        {
          src: require("@/assets/images/icons/vue.png"),
          alt: "Logo cliente 2",
        },
        {
          src: require("@/assets/images/icons/mongodb.png"),
          alt: "Logo cliente 4",
        },
        {
          src: require("@/assets/images/icons/aws.png"),
          alt: "Logo cliente 4",
        },
        {
          src: require("@/assets/images/icons/gitrub.png"),
          alt: "Logo cliente 4",
        },
        {
          src: require("@/assets/images/icons/photoshop.png"),
          alt: "Logo cliente 4",
        },
      ],
      images: [
        {
          src: require("@/assets/images/banners/skillTech.jpg"),
          alt: "Desenvolvimento de software personalizado e website responsivo",
          link: "/servicos",
        },
        {
          src: require("@/assets/images/banners/relogio.jpg"),
          alt: "Inteligência Artificial para o futuro do seu negócio",
          link: "/portfolio",
        },
        {
          src: require("@/assets/images/banners/ecommerce.jpg"),
          alt: "Tecnologia e inovação",
          link: "/inovacao",
        },
        {
          src: require("@/assets/images/banners/sistemasAi.jpg"),
          alt: "Inteligência Artificial aplicada",
          link: "/Service/sistemasweb",
        },
      ],
      texts: [
        {
          h1: "Sites Personalizados que Impulsionam Seu Negócio",
          p: "Criamos sites rápidos, responsivos e otimizados para atrair clientes e gerar resultados reais.",
          link: "/Service/Desenvolvimento-website",
          ctaText: "Solicite um Orçamento Gratuito",
        },
        {
          h1: "Fotos Comuns? Transformamos em Fotos profissional",
          p: "Utilizamos IA para elevar suas imagens a um novo nível de criatividade e impacto visual.",
          link: "/sevice/edi-imagem",
          ctaText: "Tranforme suas Imagens",
        },
        {
          h1: "Sua Loja Online com Design Incrível e Foco em Vendas",
          p: "Criamos lojas rápidas, com visual profissional e estrutura pensada para vender mais desde o primeiro dia.",
          link: "/Sevice/lojasvituais",
          ctaText: "Quero uma Loja Virtual",
        },
        {
          h1: "Desenvolvimento de Sistemas com Inteligência Artificial Integrada",
          p: "Criamos sistemas personalizados que integram inteligência artificial para automatizar processos, melhorar decisões e gerar mais resultados.",
          link: "/Service/sistemasweb",
          ctaText: "Solicite orçamento gratuito",
        },
      ],
      currentIndex: 0,
      autoplayInterval: null,
      transitionSpeed: 6000,
      isPaused: false,
    };
  },
  computed: {
    sliderStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
        transition: this.isPaused
          ? "none"
          : "transform 0.8s cubic-bezier(0.77, 0, 0.175, 1)",
      };
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.animateText();
    },
    previousSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.animateText();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.animateText();
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        if (!this.isPaused) this.nextSlide();
      }, this.transitionSpeed);
    },
    pauseSlider() {
      this.isPaused = true;
    },
    resumeSlider() {
      this.isPaused = false;
    },
    animateText() {
      // Reset animation classes
      const textLines = document.querySelectorAll(".line");
      textLines.forEach((line) => {
        line.style.opacity = "0";
        line.style.transform = "translateY(20px)";
      });

      // Reapply animation
      setTimeout(() => {
        textLines.forEach((line) => {
          line.style.opacity = "1";
          line.style.transform = "translateY(0)";
          line.style.transition =
            "opacity 0.6s ease-out, transform 0.6s ease-out";
        });
      }, 50);
    },
    scrollToContent() {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    },
    initParticles() {
      // Configuração do efeito de partículas
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#0099DD" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#0099DD",
              opacity: 0.3,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "out",
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
            },
          },
        });
      }
    },
  },
  mounted() {
    this.startAutoplay();
    this.animateText();
    this.initParticles();
  },
  beforeUnmount() {
    clearInterval(this.autoplayInterval);
  },
};
</script>

<style scoped>
/* Estilos base e reset */
.hero {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  color: #2d3748;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  position: relative;
  z-index: 3;
}

/* Social Proof */
.social-proof {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.avatar-group {
  display: flex;
  position: relative;
  height: 48px;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: absolute;
}

.user-avatar:nth-child(1) {
  left: 0;
  z-index: 4;
}
.user-avatar:nth-child(2) {
  left: 30px;
  z-index: 3;
}
.user-avatar:nth-child(3) {
  left: 60px;
  z-index: 2;
}
.user-avatar:nth-child(4) {
  left: 90px;
  z-index: 1;
}

.avatar-group:hover .user-avatar:nth-child(1) {
  transform: translateX(-5px);
}
.avatar-group:hover .user-avatar:nth-child(2) {
  transform: translateX(0);
}
.avatar-group:hover .user-avatar:nth-child(3) {
  transform: translateX(5px);
}
.avatar-group:hover .user-avatar:nth-child(4) {
  transform: translateX(10px);
}

.social-text {
  display: flex;
  flex-direction: column;
  margin-left: 120px;
}

.rating {
  font-weight: 600;
  font-size: 0.9rem;
  color: #4a5568;
}

.stars {
  color: #f59e0b;
  margin-right: 0.5rem;
}

.see-more {
  color: #0099dd;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  transition: color 0.3s ease;
}

.see-more:hover {
  color: #0077b3;
}

.arrow {
  margin-left: 0.3rem;
  transition: transform 0.3s ease;
}

.see-more:hover .arrow {
  transform: translateX(3px);
}

/* Text Content */
.text-content {
  margin-bottom: 3rem;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1a202c;
}

.animated-text .line {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
}

p {
  font-size: 1.25rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 2.5rem;
  max-width: 90%;
}

.highlight {
  color: #0099dd;
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(0, 153, 221, 0.2);
  z-index: -1;
  border-radius: 4px;
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 1.5rem;
  margin-top: 3rem;
}

.cta-button {
  position: relative;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  overflow: hidden;
  border: none;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-button.primary {
  background: #0099dd;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 153, 221, 0.3);
}

.cta-button.secondary {
  background: white;
  color: #0099dd;
  border: 2px solid #0099dd;
}

.hover-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
  left: -100%;
  transition: all 0.4s ease;
  z-index: -1;
}

.cta-button:hover .hover-effect {
  left: 0;
}

.cta-button.secondary:hover {
  background: #0099dd;
  color: white;
}

/* Client Logos */
.client-logos {
  margin-top: 4rem;
}

.client-logos p {
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 1rem;
}

.logos {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.logos img {
  height: 30px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  filter: grayscale(100%);
}

.logos img:hover {
  opacity: 1;
  filter: grayscale(0%);
}

/* Hero Visual */
.hero-visual {
  flex: 1;
  position: relative;
  min-height: 500px;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.slider {
  display: flex;
  height: 100%;
}

.slide {
  flex: 0 0 100%;
  position: relative;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-button svg {
  width: 24px;
  height: 24px;
  fill: #0099dd;
}

.nav-button.prev {
  left: 2rem;
}

.nav-button.next {
  right: 2rem;
}

.slider-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 10;
}

.slider-indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.slider-indicators button.active {
  background: white;
  transform: scale(1.2);
}

/* Floating Shapes */
.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: -1;
}

.shape {
  position: absolute;
  opacity: 0.1;
}

.circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #0099dd;
  top: -100px;
  right: -100px;
  animation: float 8s ease-in-out infinite;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 150px solid transparent;
  border-right: 150px solid transparent;
  border-bottom: 260px solid #0099dd;
  bottom: -100px;
  left: -50px;
  animation: float 10s ease-in-out infinite 2s;
}

.square {
  width: 200px;
  height: 200px;
  background: #0099dd;
  bottom: 50px;
  right: 50px;
  animation: float 12s ease-in-out infinite 4s;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  color: #4a5568;
  font-weight: 500;
}

.mouse {
  width: 30px;
  height: 50px;
  border: 2px solid #4a5568;
  border-radius: 15px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.wheel {
  width: 6px;
  height: 10px;
  background: #4a5568;
  border-radius: 3px;
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(10px);
    opacity: 0;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-container {
    flex-direction: column;
    gap: 3rem;
    padding-top: 6rem;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
    order: 1;
  }

  .text-content {
    order: 1;
  }

  .social-proof {
    justify-content: center;
    order: 4;
  }

  .social-text {
    margin-left: 1rem;
  }

  .hero-visual {
    order: 2;
  }

  p {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-buttons {
    justify-content: center;
    order: 3;
  }

  .client-logos {
    text-align: center;
    order: 5;
  }

  .logos {
    justify-content: center;
  }

  .slider-container {
    height: 400px;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.1rem;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-button {
    width: 100%;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .nav-button.prev {
    left: 1rem;
  }

  .nav-button.next {
    right: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-container {
    padding: 1.5rem;
  }

  .social-proof {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .social-text {
    margin-left: 0;
    margin-top: 1rem;
  }

  .hero-content {
    order: 1;
  }

  .text-content {
    order: 1;
  }

  .hero-visual {
    order: 2;
  }

  .cta-buttons {
    order: 3;
  }

  .social-proof {
    order: 4;
  }

  .client-logos {
    order: 5;
  }

  h1 {
    font-size: 2rem;
  }

  .slider-container {
    height: 300px;
  }
}
</style>
