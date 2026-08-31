<template>
  <section class="services-hero">
    <div class="hero-background">
      <div class="gradient-overlay"></div>
      <div class="grid-pattern"></div>
    </div>

    <div class="hero-container">
      <!-- Cabeçalho da seção -->
      <div class="hero-heading">
        <h2>Nossos <span>Serviços</span></h2>
        <p>Soluções digitais completas, do sistema ao lançamento.</p>
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
          >
            <div class="service-content">
              <div
                class="service-tag"
                :style="{ backgroundColor: service.color + '18', color: service.color }"
              >
                <img :src="service.icon" :alt="service.title" class="service-icon" />
                <span>Serviço</span>
              </div>

              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>

              <ul class="service-features">
                <li v-for="(feature, i) in service.features.slice(0, 4)" :key="i">
                  <span class="feature-bullet" :style="{ backgroundColor: service.color }"></span>
                  {{ feature }}
                </li>
              </ul>

              <router-link
                :to="service.path"
                class="service-cta"
                :style="{ backgroundColor: service.color }"
              >
                <span>Saiba mais</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </router-link>
            </div>

            <div class="service-visual">
              <img
                :src="service.image || getServiceImage(service.title)"
                :alt="service.title"
                class="service-image"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Controles compactos -->
      <div class="slider-controls">
        <button class="control-button" @click="previousSlide" aria-label="Serviço anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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

        <button class="control-button" @click="nextSlide" aria-label="Próximo serviço">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import servicesService from "@/services/servicesService";

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
    async loadServices() {
      try {
        const data = await servicesService.getPublished();
        if (data && data.length) {
          this.services = data.map((s) => ({
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features || [],
            color: s.color || "#0099DD",
            path: s.link || "/contato",
            image: this.resolveImg(s.image),
          }));
          this.currentIndex = 0;
        }
      } catch (error) {
        // Mantém os serviços estáticos se a API estiver indisponível
        console.warn("Serviços: usando dados estáticos (API indisponível):", error.message);
      }
    },
    resolveImg(image) {
      if (!image) return "";
      if (image.startsWith("http") || image.startsWith("data:")) return image;
      if (image.startsWith("/uploads")) {
        const base = (import.meta.env.VITE_API_URL || "http://localhost:5006").replace(/\/api$/, "");
        return base + image;
      }
      return image;
    },
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
    this.loadServices();
    this.startAutoplay();
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
.services-hero {
  position: relative;
  padding: 4.5rem 1rem 3.5rem;
  overflow: hidden;
  color: #1e293b;
}

[data-theme="dark"] .services-hero {
  color: #f8fafc;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(700px 340px at 88% 0%, rgba(0, 153, 221, 0.08), transparent 60%),
    linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

[data-theme="dark"] .hero-background {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.gradient-overlay {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 90%, rgba(139, 92, 246, 0.06) 0%, transparent 45%);
}

.grid-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: radial-gradient(#64748b 1px, transparent 1px);
  background-size: 22px 22px;
}

.hero-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Cabeçalho */
.hero-heading {
  text-align: center;
  margin-bottom: 2.2rem;
}
.hero-heading h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1a202c;
}
[data-theme="dark"] .hero-heading h2 {
  color: #f8fafc;
}
.hero-heading h2 span {
  color: #0099dd;
}
.hero-heading p {
  margin-top: 0.5rem;
  color: #64748b;
  font-size: 1.05rem;
}

/* Slider */
.services-slider {
  overflow: hidden;
  position: relative;
}
.slider-track {
  display: flex;
}
.service-slide {
  min-width: 100%;
  display: flex;
  align-items: center;
  gap: 3rem;
  padding: 0.5rem;
}

.service-content {
  flex: 1;
  max-width: 50%;
}

.service-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1.2rem;
}
.service-icon {
  width: 18px;
  height: 18px;
}

.service-title {
  font-size: clamp(1.6rem, 3vw, 2.3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin-bottom: 0.9rem;
}

.service-description {
  font-size: 1.05rem;
  color: #64748b;
  margin-bottom: 1.4rem;
  line-height: 1.6;
}
[data-theme="dark"] .service-description {
  color: #94a3b8;
}

.service-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem 1.2rem;
  margin-bottom: 1.8rem;
  list-style: none;
  padding: 0;
}
.service-features li {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.92rem;
}
.feature-bullet {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.service-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.service-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}
.service-cta svg {
  transition: transform 0.3s ease;
}
.service-cta:hover svg {
  transform: translateX(3px);
}

/* Visual */
.service-visual {
  flex: 1;
  display: flex;
  justify-content: center;
}
.service-image {
  width: 100%;
  max-width: 520px;
  height: 340px;
  object-fit: cover;
  border-radius: 18px;
  border: 6px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 24px 48px -18px rgba(15, 23, 42, 0.35);
}
[data-theme="dark"] .service-image {
  border-color: rgba(255, 255, 255, 0.08);
}

/* Controles */
.slider-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
  margin-top: 2rem;
}
.control-button {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  color: #334155;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}
.control-button:hover {
  color: #0099dd;
  border-color: #0099dd;
  transform: translateY(-2px);
}
[data-theme="dark"] .control-button {
  background: #1e293b;
  border-color: #334155;
  color: #f8fafc;
}
.indicators {
  display: flex;
  gap: 0.55rem;
}
.indicators button {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #cbd5e1;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}
.indicators button.active {
  background: #0099dd;
  width: 26px;
  border-radius: 6px;
}

/* Responsividade */
@media (max-width: 900px) {
  .service-slide {
    flex-direction: column-reverse;
    gap: 1.6rem;
    text-align: center;
  }
  .service-content {
    max-width: 100%;
  }
  .service-tag {
    margin-left: auto;
    margin-right: auto;
  }
  .service-features {
    text-align: left;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.6rem;
  }
  .service-image {
    height: 240px;
    max-width: 100%;
  }
}

@media (max-width: 520px) {
  .services-hero {
    padding: 3rem 1rem 2.5rem;
  }
  .service-features {
    grid-template-columns: 1fr;
  }
  .service-image {
    height: 200px;
  }
  .service-cta {
    width: 100%;
    justify-content: center;
  }
}
</style>
