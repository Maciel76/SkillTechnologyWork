<template>
  <section class="services-hero">
    <!-- Efeito de fundo moderno -->
    <div class="hero-background">
      <div class="gradient-overlay"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="hero-container">
      <!-- Controles do slider -->
      <div class="slider-controls">
        <button
          class="control-button prev"
          @click="previousSlide"
          aria-label="Slide anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div class="indicators">
          <button
            v-for="(_, index) in services"
            :key="index"
            :class="{ active: currentIndex === index }"
            @click="goToSlide(index)"
            :aria-label="`Ir para serviço ${index + 1}`"
          ></button>
        </div>

        <button
          class="control-button next"
          @click="nextSlide"
          aria-label="Próximo slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <!-- Slider de serviços -->
      <div class="services-slider">
        <div
          class="slider-track"
          :style="sliderStyle"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <div
            v-for="(service, index) in services"
            :key="index"
            class="service-slide"
            :class="{ active: currentIndex === index }"
          >
            <div class="service-content">
              <!-- Tag de serviço -->
              <div
                class="service-tag"
                :style="{
                  backgroundColor: service.color + '20',
                  color: service.color,
                }"
              >
                <img
                  :src="service.icon"
                  :alt="service.title"
                  class="service-icon"
                />
                <span>{{ service.title }}</span>
              </div>

              <!-- Título animado -->
              <h2 class="service-title">
                <span class="title-text">{{ service.title }}</span>
                <span
                  class="highlight-dot"
                  :style="{ backgroundColor: service.color }"
                ></span>
              </h2>

              <!-- Descrição -->
              <p class="service-description">{{ service.description }}</p>

              <!-- Lista de features -->
              <ul class="service-features">
                <li v-for="(feature, i) in service.features" :key="i">
                  <span
                    class="feature-bullet"
                    :style="{ backgroundColor: service.color }"
                  ></span>
                  {{ feature }}
                </li>
              </ul>

              <!-- CTA -->
              <router-link
                :to="service.path"
                class="service-cta"
                :style="{ backgroundColor: service.color }"
              >
                <span>Saiba mais</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
            </div>

            <div class="service-visual">
              <div
                class="visual-container"
                :style="{ borderColor: service.color + '30' }"
              >
                <div class="floating-cards">
                  <div
                    v-for="(feature, i) in service.features.slice(0, 3)"
                    :key="i"
                    class="feature-card"
                    :style="{
                      backgroundColor: service.color + '15',
                      borderColor: service.color + '30',
                      animationDelay: `${i * 0.2}s`,
                    }"
                  >
                    <span class="card-emoji">{{ getFeatureEmoji(i) }}</span>
                    <span class="card-text">{{ feature }}</span>
                  </div>
                </div>
                <img
                  :src="getServiceImage(service.title)"
                  :alt="service.title"
                  class="service-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll -->
    <div class="scroll-indicator" @click="scrollToContent">
      <span>Explore todos serviços</span>
      <div class="arrow-down"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesHero",
  data() {
    return {
      currentIndex: 0,
      autoplayInterval: null,
      isPaused: false,
      touchStartX: 0,
      touchEndX: 0,
      services: [
        {
          icon: "https://api.iconify.design/heroicons:globe-alt.svg",
          title: "Sistemas Web",
          description:
            "Criamos sistemas web completos e personalizados — ERPs, CRMs, dashboards e plataformas de gestão sob medida.",
          features: [
            "Dashboards personalizados",
            "Integração com IA",
            "Relatórios em tempo real",
            "Multi-usuário com permissões",
            "APIs RESTful",
          ],
          color: "#3B82F6",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:computer-desktop.svg",
          title: "Sites & Landing Pages",
          description:
            "Sites responsivos, otimizados para SEO e com design que converte visitantes em clientes.",
          features: [
            "Design responsivo",
            "SEO otimizado",
            "Carregamento ultrarrápido",
            "CMS integrado",
            "Analytics avançado",
          ],
          color: "#0099DD",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:device-phone-mobile.svg",
          title: "Aplicativos Mobile",
          description:
            "Apps nativos e multiplataforma para iOS e Android com design premium e funcionalidades avançadas.",
          features: [
            "iOS e Android",
            "Notificações push",
            "Offline first",
            "Integração com APIs",
            "UX premium",
          ],
          color: "#10B981",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:shopping-cart-16-solid.svg",
          title: "E-commerce",
          description:
            "Lojas virtuais completas com catálogo inteligente, checkout otimizado e gestão de pedidos.",
          features: [
            "Catálogo inteligente",
            "Checkout otimizado",
            "Múltiplos pagamentos",
            "Gestão de pedidos",
            "Relatórios de vendas",
          ],
          color: "#8B5CF6",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:cpu-chip.svg",
          title: "Automação de Processos",
          description:
            "Automatizamos qualquer processo repetitivo — chatbots, relatórios automáticos, workflows inteligentes.",
          features: [
            "Chatbots com IA",
            "Relatórios automáticos",
            "Workflows personalizados",
            "Integração com WhatsApp",
            "Eliminação de tarefas manuais",
          ],
          color: "#F59E0B",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:arrows-right-left.svg",
          title: "Integração de APIs",
          description:
            "Conectamos seus sistemas existentes — ERPs, CRMs, gateways de pagamento e ferramentas externas.",
          features: [
            "Conexão com qualquer API",
            "Webhooks e eventos",
            "Sincronização de dados",
            "Migração de sistemas",
            "Documentação técnica",
          ],
          color: "#EC4899",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:sparkles.svg",
          title: "IA Aplicada",
          description:
            "Implementamos inteligência artificial no seu negócio: chatbots, análise de dados, recomendações e mais.",
          features: [
            "Chatbots inteligentes",
            "Análise preditiva",
            "Processamento de linguagem natural",
            "Visão computacional",
            "Automação com ML",
          ],
          color: "#EF4444",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:academic-cap.svg",
          title: "Consultoria & Suporte",
          description:
            "Diagnóstico completo, planejamento estratégico, manutenção contínua e suporte técnico dedicado.",
          features: [
            "Diagnóstico completo",
            "Planejamento estratégico",
            "Suporte 24/7",
            "Manutenção preventiva",
            "Treinamento de equipe",
          ],
          color: "#6366F1",
          path: "/contato",
        },
      ],
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
      this.currentIndex = (this.currentIndex + 1) % this.services.length;
      this.resetAutoplay();
    },
    previousSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.services.length) % this.services.length;
      this.resetAutoplay();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.resetAutoplay();
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        if (!this.isPaused) this.nextSlide();
      }, 6000);
    },
    resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    },
    pauseSlider() {
      this.isPaused = true;
    },
    resumeSlider() {
      this.isPaused = false;
    },
    scrollToContent() {
      window.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: "smooth",
      });
    },
    getServiceImage(title) {
      const images = {
        "Sistemas Web":
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        "Sites & Landing Pages":
          "https://images.unsplash.com/photo-1604872412583-53667c1a6fcf?q=80&w=2070&auto=format&fit=crop",
        "Aplicativos Mobile":
          "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
        "E-commerce":
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1974&auto=format&fit=crop",
        "Automação de Processos":
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
        "Integração de APIs":
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop",
        "IA Aplicada":
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
        "Consultoria & Suporte":
          "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
      };
      return (
        images[title] ||
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop"
      );
    },
    getFeatureEmoji(index) {
      const emojis = ["✨", "🚀", "🎯", "🔍", "📊", "💡"];
      return emojis[index] || emojis[0];
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
      this.pauseSlider();
    },
    handleTouchMove(e) {
      this.touchEndX = e.changedTouches[0].screenX;
    },
    handleTouchEnd() {
      if (this.touchEndX < this.touchStartX - 50) {
        this.nextSlide();
      } else if (this.touchEndX > this.touchStartX + 50) {
        this.previousSlide();
      }
      this.resumeSlider();
    },
  },
  mounted() {
    this.startAutoplay();
    // Pausar slider quando a janela perde foco
    window.addEventListener("blur", this.pauseSlider);
    window.addEventListener("focus", this.resumeSlider);
  },
  beforeUnmount() {
    clearInterval(this.autoplayInterval);
    window.removeEventListener("blur", this.pauseSlider);
    window.removeEventListener("focus", this.resumeSlider);
  },
};
</script>

<style scoped>
/* Estilos base */
.services-hero {
  position: relative;
  height: 100vh;
  min-height: 800px;
  max-height: 1200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  color: #1e293b;
}

[data-theme="dark"] .services-hero {
  color: #f8fafc;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

[data-theme="dark"] .hero-background {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 20% 50%,
    rgba(0, 82, 255, 0.05) 0%,
    transparent 50%
  );
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  background-image: radial-gradient(#64748b 1px, transparent 1px);
  background-size: 20px 20px;
}

[data-theme="dark"] .grid-pattern {
  background-image: radial-gradient(#94a3b8 1px, transparent 1px);
}

.hero-container {
  position: relative;
  flex: 1;
  max-width: 1900px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

/* Controles do slider */
.slider-controls {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  z-index: 3;
}

.control-button {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #e2e8f0;
  color: #334155;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .control-button {
  background: rgba(30, 41, 59, 0.8);
  border-color: #334155;
  color: #f8fafc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.control-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background: white;
  color: #0052ff;
}

[data-theme="dark"] .control-button:hover {
  background: #1e293b;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.control-button svg {
  width: 24px;
  height: 24px;
}

.indicators {
  display: flex;
  gap: 0.75rem;
}

.indicators button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #cbd5e1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

[data-theme="dark"] .indicators button {
  background: #475569;
}

.indicators button.active {
  background: #0052ff;
  transform: scale(1.2);
}

[data-theme="dark"] .indicators button.active {
  background: #3b82f6;
}

/* Slider de serviços */
.services-slider {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  height: 100%;
  width: 100%;
}

.service-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  padding: 1rem;
}

.service-content {
  flex: 1;
  max-width: 50%;
  padding: 2rem 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.service-visual {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Conteúdo do serviço */
.service-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
}

.service-icon {
  width: 20px;
  height: 20px;
}

.service-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.title-text {
  position: relative;
  display: inline-block;
}

.highlight-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite;
}

.service-description {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  color: #64748b;
  max-width: 90%;
}

[data-theme="dark"] .service-description {
  color: #94a3b8;
}

.service-features {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.service-features li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
}

.feature-bullet {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.service-cta {
  align-self: flex-start;
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-decoration: none;
}

.service-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.service-cta svg {
  transition: transform 0.3s ease;
}

.service-cta:hover svg {
  transform: translateX(4px);
}

/* Visual do serviço */
.visual-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  border: 1px solid;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .visual-container {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.floating-cards {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.feature-card {
  position: absolute;
  background: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
  opacity: 0;
  animation-fill-mode: forwards;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid;
}

[data-theme="dark"] .feature-card {
  background: #1e293b;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.card-emoji {
  font-size: 1.1rem;
}

.feature-card:nth-child(1) {
  top: 10%;
  left: -5%;
}

.feature-card:nth-child(2) {
  top: 50%;
  right: -5%;
  transform: translateY(-50%);
}

.feature-card:nth-child(3) {
  bottom: 10%;
  left: 20%;
}

/* Indicador de scroll */
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
  z-index: 3;
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
  content: "";
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
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Responsividade Reorganizada - Mobile First */

/* Telas pequenas (mobile) - até 767px */
@media (max-width: 767px) {
  .services-hero {
    min-height: auto;
    height: auto;
    padding-bottom: 4rem;
  }

  .hero-container {
    padding: 1rem;
  }

  /* Esconde controles em mobile */
  .slider-controls {
    display: none;
  }

  /* Inverte ordem visual - imagem primeiro */
  .service-slide {
    flex-direction: column-reverse;
    gap: 1rem;
    padding: 0;
  }

  .service-content {
    max-width: 100%;
    padding: 1rem;
    text-align: center;
  }

  .service-visual {
    margin-top: 0;
    padding: 0;
  }

  .visual-container {
    height: 250px;
    max-width: 100%;
    border-radius: 12px;
  }

  .service-title {
    color: #e2e8f0;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }

  .service-description {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .service-features {
    margin-bottom: 2rem;
    align-items: flex-start;
    text-align: left;
    padding-left: 1rem;
  }

  .service-features li {
    font-size: 0.9rem;
  }

  .service-cta {
    width: 100%;
    justify-content: center;
  }

  /* Ajusta cards flutuantes */
  .floating-cards {
    display: none;
  }

  .scroll-indicator {
    position: relative;
    bottom: auto;
    margin-top: 2rem;
  }
}

/* Telas médias (tablet) - 768px a 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
  .services-hero {
    min-height: 800px;
  }

  .service-slide {
    flex-direction: column-reverse;
    gap: 2rem;
  }

  .service-content {
    max-width: 100%;
    padding: 2rem;
  }

  .service-visual {
    padding: 0 2rem;
  }

  .visual-container {
    height: 350px;
  }

  /* Reduz tamanho dos controles */
  .slider-controls {
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .control-button {
    width: 44px;
    height: 44px;
  }
}

/* Telas grandes (desktop pequeno) - 1024px a 1199px */
@media (min-width: 1024px) and (max-width: 1199px) {
  .service-content {
    padding-right: 2rem;
  }

  .visual-container {
    height: 380px;
  }
}

/* Telas extra grandes (desktop) - 1200px+ */
@media (min-width: 1200px) {
  /* Mantém estilos padrão */
}
</style>
