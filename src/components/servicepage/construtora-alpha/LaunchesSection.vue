<template>
  <section id="launches" class="launches-section">
    <!-- Efeito de partículas de fundo -->
    <div class="particles-bg"></div>

    <div class="container">
      <div class="section-header" data-aos="fade-up">
        <h2 class="section-title">Nossos <span>Lançamentos</span></h2>
        <p class="section-subtitle">O futuro da construção em primeira mão</p>
        <div class="section-decoration">
          <div class="decoration-line"></div>
          <div class="decoration-dot"></div>
          <div class="decoration-line"></div>
        </div>
      </div>

      <!-- Slider 3D de lançamentos -->
      <div class="launches-slider">
        <div class="slider-track" :style="trackStyle">
          <div
            v-for="(launch, index) in launches"
            :key="launch.id"
            class="launch-card"
            :class="{
              active: centerIndex === index,
              left: centerIndex - 1 === index,
              right: centerIndex + 1 === index,
            }"
            @click="centerIndex = index"
          >
            <div class="card-inner">
              <!-- Imagem com efeito parallax -->
              <div class="image-container" :style="parallaxStyle(index)">
                <img
                  :src="launch.image"
                  :alt="launch.title"
                  class="launch-image"
                />
                <div class="image-overlay"></div>

                <!-- Badge animado -->
                <div class="status-badge" :class="launch.status.toLowerCase()">
                  <span>{{ launch.status }}</span>
                  <div class="pulse-effect"></div>
                </div>
              </div>

              <!-- Conteúdo -->
              <div class="launch-content">
                <h3>{{ launch.title }}</h3>

                <div class="location">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ launch.location }}</span>
                </div>

                <p class="description">{{ launch.description }}</p>

                <!-- Progresso de vendas -->
                <div class="sales-progress" v-if="launch.salesProgress">
                  <div class="progress-info">
                    <span
                      >Disponibilidade:
                      {{ launch.salesProgress.available }} unidades</span
                    >
                    <span>{{ launch.salesProgress.percent }}% vendido</span>
                  </div>
                  <div class="progress-bar">
                    <div
                      class="progress-fill"
                      :style="{ width: launch.salesProgress.percent + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Features com hover -->
                <div class="features-grid">
                  <div
                    v-for="(feature, i) in launch.features"
                    :key="i"
                    class="feature-item"
                    @mouseenter="activeFeature = i"
                    @mouseleave="activeFeature = null"
                  >
                    <div
                      class="feature-icon"
                      :class="{ highlight: activeFeature === i }"
                    >
                      {{ feature.icon }}
                    </div>
                    <div
                      class="feature-text"
                      :class="{ expanded: activeFeature === i }"
                    >
                      {{ feature.text }}
                    </div>
                  </div>
                </div>

                <!-- Botão com efeito magnético -->
                <button
                  class="cta-button magnetic-button"
                  @click="openModal(launch)"
                >
                  <span class="btn-text">Reserve sua unidade</span>
                  <span class="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles de navegação -->
        <button class="slider-nav prev" @click="prevLaunch">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="slider-nav next" @click="nextLaunch">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Indicadores -->
      <div class="slider-dots">
        <button
          v-for="(dot, index) in launches"
          :key="index"
          :class="{ active: centerIndex === index }"
          @click="centerIndex = index"
        ></button>
      </div>
    </div>

    <!-- Modal de detalhes -->
    <LaunchModal
      :launch="selectedLaunch"
      :is-open="modalOpen"
      @close="modalOpen = false"
    />
  </section>
</template>

<script>
// import LaunchModal from "./LaunchModal.vue";
import { gsap } from "gsap";

export default {
  name: "LaunchesSection",
  // components: { LaunchModal },
  data() {
    return {
      centerIndex: 0,
      activeFeature: null,
      modalOpen: false,
      selectedLaunch: null,
      launches: [
        {
          id: 1,
          title: "Residencial Skyline",
          location: "São Paulo, SP",
          description:
            "Torres gêmeas com vista panorâmica para a cidade, apartamentos de 2 a 4 dormitórios com lazer completo e tecnologia smart home.",
          image:
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          status: "Pré-Lançamento",
          salesProgress: {
            available: 42,
            percent: 65,
          },
          features: [
            { icon: "🏢", text: "2 Torres" },
            { icon: "🏠", text: "120 unidades" },
            { icon: "🛏️", text: "2-4 dorm." },
            { icon: "🏊", text: "Piscina infinita" },
            { icon: "🏋️", text: "Academia premium" },
            { icon: "🌿", text: "Área verde 5.000m²" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "2 dormitórios", area: "75m²" },
            { type: "3 dormitórios", area: "95m²" },
          ],
          deliveryDate: "Q4 2024",
        },
        {
          id: 2,
          title: "Business Tower",
          location: "Rio de Janeiro, RJ",
          description:
            "Edifício corporativo classe A com tecnologia de ponta, certificação LEED Platinum e localização privilegiada na zona sul.",
          image:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
          status: "Lançamento",
          salesProgress: {
            available: 18,
            percent: 82,
          },
          features: [
            { icon: "🏢", text: "30 andares" },
            { icon: "🖥️", text: "Smart Office" },
            { icon: "🍽️", text: "Restaurante" },
            { icon: "🅿️", text: "Estacionamento" },
            { icon: "🌿", text: "Green Building" },
            { icon: "🌐", text: "Fibra óptica" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "Salas comerciais", area: "50-200m²" },
            { type: "Andares corporativos", area: "1.000m²" },
          ],
          deliveryDate: "Q2 2025",
        },
        {
          id: 3,
          title: "Villas da Montanha",
          location: "Campos do Jordão, SP",
          description:
            "Condomínio de luxo com chalés personalizados, spa premium e vista para as montanhas. Conforto alpino com requinte brasileiro.",
          image:
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
          status: "Em Obras",
          salesProgress: {
            available: 7,
            percent: 88,
          },
          features: [
            { icon: "🏔️", text: "Vista montanha" },
            { icon: "🛖", text: "15 chalés" },
            { icon: "♨️", text: "Spa premium" },
            { icon: "🍷", text: "Adega climatizada" },
            { icon: "🚗", text: "Garagem aquecida" },
            { icon: "🛎️", text: "Concierge 24h" },
          ],
          gallery: [
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1350&q=80",
          ],
          floorPlans: [
            { type: "Chalé 3 suítes", area: "220m²" },
            { type: "Chalé master", area: "350m²" },
          ],
          deliveryDate: "Q3 2024",
        },
      ],
    };
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(calc(50% - ${this.centerIndex * 420}px))`,
      };
    },
  },
  methods: {
    parallaxStyle(index) {
      const offset = (this.centerIndex - index) * 20;
      return {
        transform: `translateY(${offset}px)`,
      };
    },
    nextLaunch() {
      if (this.centerIndex < this.launches.length - 1) {
        this.centerIndex++;
      } else {
        this.centerIndex = 0;
      }
    },
    prevLaunch() {
      if (this.centerIndex > 0) {
        this.centerIndex--;
      } else {
        this.centerIndex = this.launches.length - 1;
      }
    },
    openModal(launch) {
      this.selectedLaunch = launch;
      this.modalOpen = true;
      document.body.style.overflow = "hidden";
    },
  },
  mounted() {
    // Efeito magnético nos botões
    const magneticButtons = document.querySelectorAll(".magnetic-button");
    magneticButtons.forEach((button) => {
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI;

        gsap.to(button, {
          x: (x - centerX) * 0.2,
          y: (y - centerY) * 0.2,
          rotation: angle * 0.05,
          duration: 0.5,
          ease: "power2.out",
        });

        gsap.to(".btn-arrow", {
          x: (x - centerX) * 0.3,
          y: (y - centerY) * 0.3,
          duration: 0.5,
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          rotation: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });

        gsap.to(".btn-arrow", {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.5)",
        });
      });
    });
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.launches-section {
  position: relative;
  padding: 120px 0;
  background-color: #f9f9f9;
  overflow: hidden;
}

.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1350&q=80")
    no-repeat center center;
  background-size: cover;
  opacity: 0.05;
  z-index: 0;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;

  .section-title {
    font-size: 3rem;
    font-weight: 800;
    color: $dark-color;
    margin-bottom: 15px;

    span {
      color: $primary-color;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        height: 10px;
        background: rgba($secondary-color, 0.4);
        z-index: -1;
      }
    }
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: $gray-color;
    max-width: 700px;
    margin: 0 auto 30px;
  }

  .section-decoration {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    .decoration-line {
      width: 80px;
      height: 2px;
      background: linear-gradient(
        to right,
        transparent,
        $primary-color,
        transparent
      );
    }

    .decoration-dot {
      width: 10px;
      height: 10px;
      background: $secondary-color;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }
  }
}

.launches-slider {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0 auto;
  perspective: 1000px;
}

.slider-track {
  display: flex;
  gap: 40px;
  position: absolute;
  left: 0;
  top: 0;
  transition: transform 0.7s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.launch-card {
  width: 400px;
  height: 550px;
  position: relative;
  transition: all 0.5s ease;

  &.active {
    transform: translateY(-20px) scale(1.05);
    z-index: 10;
  }

  &.left {
    transform: translateX(-100px) scale(0.9);
    opacity: 0.8;
    z-index: 5;
    filter: brightness(0.9);
  }

  &.right {
    transform: translateX(100px) scale(0.9);
    opacity: 0.8;
    z-index: 5;
    filter: brightness(0.9);
  }
}

.card-inner {
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 30px 50px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;

  .active & {
    box-shadow: 0 40px 70px rgba(0, 0, 0, 0.2);
  }
}

.image-container {
  position: relative;
  height: 250px;
  overflow: hidden;
  transition: transform 0.5s ease-out;
}

.launch-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  .active &:hover {
    transform: scale(1.1);
  }
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba($dark-color, 0.7), transparent 70%);
}

.status-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 20px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  z-index: 2;

  &.pré-lançamento {
    background: $secondary-color;
    color: $dark-color;
  }

  &.lançamento {
    background: $primary-color;
  }

  &.em-obras {
    background: #2c7d59;
  }

  .pulse-effect {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: pulse 2s infinite;
    opacity: 0.7;
    z-index: -1;
  }
}

.launch-content {
  padding: 25px;
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.5rem;
    color: $primary-color;
    margin-bottom: 10px;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 8px;
    color: $gray-color;
    margin-bottom: 15px;
    font-size: 0.9rem;

    i {
      color: $secondary-color;
    }
  }

  .description {
    color: $gray-color;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
  }
}

.sales-progress {
  margin-bottom: 20px;

  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: $gray-color;
    margin-bottom: 5px;
  }

  .progress-bar {
    height: 6px;
    background: #eee;
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(to right, $secondary-color, $primary-color);
    transition: width 1s ease;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 25px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: default;

  .feature-icon {
    width: 40px;
    height: 40px;
    background: rgba($primary-color, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;

    &.highlight {
      background: $primary-color;
      color: white;
      transform: scale(1.2);
    }
  }

  .feature-text {
    font-size: 0.7rem;
    text-align: center;
    margin-top: 5px;
    height: 0;
    opacity: 0;
    transition: all 0.3s ease;

    &.expanded {
      height: auto;
      opacity: 1;
    }
  }
}

.cta-button {
  background: $primary-color;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      $primary-color,
      darken($primary-color, 10%)
    );
    z-index: -1;
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: scaleX(1.1);
  }

  .btn-text {
    flex-grow: 1;
    text-align: center;
  }

  .btn-arrow {
    width: 30px;
    height: 30px;
    background: $secondary-color;
    color: $dark-color;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  &:hover .btn-arrow {
    transform: rotate(45deg);
  }
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: $primary-color;
  transition: all 0.3s ease;

  &:hover {
    background: $primary-color;
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: -25px;
  }

  &.next {
    right: -25px;
  }
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;

  button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: #ddd;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;

    &.active {
      background: $primary-color;
      transform: scale(1.3);
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.4;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
}

/* Responsividade */
@media (max-width: 1200px) {
  .launch-card {
    width: 360px;
    height: 520px;

    &.left {
      transform: translateX(-80px) scale(0.9);
    }

    &.right {
      transform: translateX(80px) scale(0.9);
    }
  }

  .slider-track {
    gap: 30px;
  }
}

@media (max-width: 992px) {
  .launches-section {
    padding: 80px 0;
  }

  .launches-slider {
    height: 500px;
  }

  .launch-card {
    width: 320px;
    height: 480px;
  }

  .section-header .section-title {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .launch-card {
    width: 280px;
    height: 450px;

    &.active {
      transform: translateY(-10px) scale(1.03);
    }

    &.left,
    &.right {
      display: none;
    }
  }

  .slider-nav {
    width: 40px;
    height: 40px;
    font-size: 1rem;

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }

  .section-header .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .launches-slider {
    height: 420px;
  }

  .launch-card {
    width: 260px;
    height: 400px;
  }

  .image-container {
    height: 180px;
  }

  .launch-content {
    padding: 15px;
  }

  .cta-button {
    padding: 12px;
    font-size: 0.9rem;
  }
}
</style>
