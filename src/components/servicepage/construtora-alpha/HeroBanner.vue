<template>
  <section class="hero-banner" :style="parallaxStyle">
    <!-- Overlay gradiente -->
    <div class="overlay"></div>

    <!-- Slider principal -->
    <div class="slider-container">
      <div class="slider-track" :style="trackStyle">
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="slide"
          :class="{ active: currentIndex === index }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="slide-content" :style="contentStyle(index)">
            <div class="slide-badge">{{ slide.badge }}</div>
            <h2 class="slide-title" v-html="slide.title"></h2>
            <p class="slide-description">{{ slide.description }}</p>

            <div class="slide-buttons">
              <button
                class="btn btn-primary"
                @click="navigateTo(slide.ctaLink)"
              >
                {{ slide.ctaText }}
              </button>
              <button class="btn btn-outline" @click="openVideo(slide.videoId)">
                <i class="fas fa-play"></i> Tour Virtual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Controles do slider -->
    <div class="slider-controls">
      <button class="control prev" @click="prevSlide" aria-label="Anterior">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="pagination">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
          :aria-label="`Ir para slide ${index + 1}`"
        ></button>
      </div>

      <button class="control next" @click="nextSlide" aria-label="Próximo">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>

    <!-- Mini slider de projetos -->

    <!-- Video Modal -->
    <transition name="fade">
      <div class="video-modal" v-if="showVideo" @click.self="closeVideo">
        <div class="modal-content">
          <button class="close-btn" @click="closeVideo" aria-label="Fechar">
            <i class="fas fa-times"></i>
          </button>
          <iframe
            v-if="videoId"
            :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: "HeroBanner",
  data() {
    return {
      currentIndex: 0,
      currentProjectIndex: 0,
      scrollY: 0,
      showVideo: false,
      videoId: "",
      slides: [
        {
          title: "Construindo o <span>futuro</span> com excelência",
          description:
            "Empreendimentos residenciais que combinam luxo, conforto e tecnologia",
          image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          badge: "Novo Lançamento",
          ctaText: "Conheça o Residencial Solaris",
          ctaLink: "#launches",
          videoId: "XqZsoesa55w",
        },
        {
          title: "Design arquitetônico <span>inovador</span>",
          description:
            "Soluções criativas para projetos comerciais de grande porte",
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          badge: "Destaque",
          ctaText: "Explore nossos projetos",
          ctaLink: "#portfolio",
          videoId: "XqZsoesa55w",
        },
        {
          title: "30 anos <span>transformando</span> sonhos",
          description:
            "Trajetória marcada por obras icônicas e satisfação dos clientes",
          image:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          badge: "Nossa História",
          ctaText: "Saiba mais sobre nós",
          ctaLink: "#about",
          videoId: "XqZsoesa55w",
        },
      ],
      projects: [],
      autoPlayInterval: null,
    };
  },
  computed: {
    trackStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`,
      };
    },
    previewTrackStyle() {
      return {
        transform: `translateX(-${this.currentProjectIndex * 120}px)`,
      };
    },
    parallaxStyle() {
      return {
        backgroundPositionY: `${this.scrollY * 0.5}px`,
      };
    },
    contentStyle() {
      return (index) => ({
        opacity: this.currentIndex === index ? 1 : 0,
        transform: `translateY(${this.currentIndex === index ? 0 : "50px"})`,
        transitionDelay: `${index * 0.1}s`,
      });
    },
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.resetAutoplay();
    },
    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.resetAutoplay();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.resetAutoplay();
    },
    selectProject(index) {
      this.currentProjectIndex = index;
      this.currentIndex = index % this.slides.length;
      this.resetAutoplay();
    },
    navigateTo(link) {
      // Implemente a navegação conforme seu router
      this.$router.push(link);
    },
    openVideo(id) {
      this.videoId = id;
      this.showVideo = true;
      document.body.style.overflow = "hidden";
    },
    closeVideo() {
      this.showVideo = false;
      this.videoId = "";
      document.body.style.overflow = "auto";
    },
    startAutoplay() {
      this.autoPlayInterval = setInterval(() => {
        this.nextSlide();
      }, 6000);
    },
    resetAutoplay() {
      clearInterval(this.autoPlayInterval);
      this.startAutoplay();
    },
    handleScroll() {
      this.scrollY = window.scrollY;
    },
  },
  mounted() {
    this.startAutoplay();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    clearInterval(this.autoPlayInterval);
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

.hero-banner {
  position: relative;
  height: 100vh;
  min-height: 700px;
  overflow: hidden;
  background-attachment: fixed;
  margin-top: -90px; // Compensa o header
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba($dark-color, 0.2) 0%,
    rgba($dark-color, 0.7) 100%
  );
  z-index: 1;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.slider-track {
  display: flex;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}

.slide {
  position: relative;
  min-width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  padding: 0 10%;

  &-content {
    position: relative;
    z-index: 2;
    max-width: 700px;
    color: white;
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  &-badge {
    display: inline-block;
    background: $secondary-color;
    color: $dark-color;
    padding: 8px 20px;
    border-radius: 30px;
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 20px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

    span {
      color: $secondary-color;
    }
  }

  &-description {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 40px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    max-width: 80%;
  }

  &-buttons {
    display: flex;
    gap: 20px;

    .btn {
      padding: 15px 30px;
      font-size: 16px;
      font-weight: 600;
      border-radius: 50px;
      transition: all 0.3s ease;

      i {
        margin-right: 8px;
      }
    }

    .btn-primary {
      background: $primary-color;
      border: 2px solid $primary-color;

      &:hover {
        background: darken($primary-color, 10%);
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    }

    .btn-outline {
      background: transparent;
      border: 2px solid white;
      color: white;

      &:hover {
        background: white;
        color: $dark-color;
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

.slider-controls {
  position: absolute;
  bottom: 120px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  z-index: 3;

  .control {
    background: rgba(white, 0.2);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    color: white;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);

    &:hover {
      background: $primary-color;
      transform: scale(1.1);
    }
  }

  .pagination {
    display: flex;
    gap: 10px;

    button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(white, 0.5);
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;

      &.active {
        background: $secondary-color;
        transform: scale(1.2);
      }
    }
  }
}

.project-preview {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: rgba($dark-color, 0.8);
  z-index: 2;
  overflow: hidden;

  .preview-track {
    display: flex;
    height: 100%;
    padding: 0 calc(50% - 60px);
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .preview-item {
    width: 200px;
    height: 100%;
    margin-right: 20px;
    background-size: cover;
    background-position: center;
    position: relative;
    cursor: pointer;
    transition: all 0.4s ease;
    border-top: 3px solid transparent;

    &:hover,
    &.active {
      border-top-color: $secondary-color;

      .project-info {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .project-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    background: linear-gradient(
      to top,
      rgba($dark-color, 0.9) 0%,
      transparent 100%
    );
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;

    .project-name {
      display: block;
      font-weight: 700;
      color: white;
      margin-bottom: 3px;
    }

    .project-location {
      font-size: 12px;
      color: rgba(white, 0.8);
    }
  }
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($dark-color, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    position: relative;
    width: 80%;
    max-width: 1000px;

    iframe {
      width: 100%;
      height: 500px;
      border: none;
      border-radius: 8px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
  }

  .close-btn {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: $secondary-color;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1200px) {
  .slide {
    padding: 0 5%;

    &-title {
      font-size: 2.8rem;
    }
  }

  .slider-controls {
    padding: 0 5%;
  }
}

@media (max-width: 992px) {
  .hero-banner {
    min-height: 600px;
  }

  .slide {
    &-title {
      font-size: 2.2rem;
    }

    &-description {
      font-size: 1rem;
      max-width: 100%;
    }

    &-buttons {
      flex-direction: column;
      gap: 10px;

      .btn {
        width: 100%;
        text-align: center;
      }
    }
  }

  .project-preview {
    height: 100px;

    .preview-item {
      width: 160px;
    }
  }
}

@media (max-width: 576px) {
  .slide {
    &-title {
      font-size: 1.8rem;
    }

    &-badge {
      font-size: 12px;
    }
  }

  .slider-controls {
    bottom: 100px;

    .control {
      width: 40px;
      height: 40px;
      font-size: 16px;
    }
  }

  .project-preview {
    height: 80px;

    .preview-item {
      width: 120px;
    }

    .project-info {
      padding: 10px;

      .project-name {
        font-size: 14px;
      }
    }
  }

  .video-modal {
    .modal-content {
      width: 95%;

      iframe {
        height: 300px;
      }
    }
  }
}
</style>
