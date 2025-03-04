<template>
  <section class="hero">
    <div class="hero-content">
      <div class="social-proof">
        <img src="@/assets/images/avatars/user1.png" alt="User 1" class="user-avatar">
        <img src="@/assets/images/avatars/user2.png" alt="User 2" class="user-avatar">
        <img src="@/assets/images/avatars/user3.png" alt="User 3" class="user-avatar">
        <img src="@/assets/images/avatars/user4.png" alt="User 4" class="user-avatar">
        <span> Feedback Dos Nosso Clientes <router-link to="/feedback" id="seemore">Ver mais...</router-link></span>
      </div>
      <h1 v-html="texts[currentIndex].h1"></h1> <!-- Usando v-html para renderizar HTML --> 
      <p v-html="texts[currentIndex].p"></p> <!-- Usando v-html para renderizar HTML --> 
      <div class="cta-buttons">
        <router-link to="#" class="cta-button">Nossos Serviços</router-link>
        <router-link to="#" class="cta-button secondary">Portfólio</router-link>
      </div>
    </div>
    <div class="hero-image" @mouseenter="pauseSlider" @mouseleave="resumeSlider">
      <div class="slider-container" role="region" aria-label="Image Slider">
        <div class="slider" :style="sliderStyle">
          <div v-for="(image, index) in images" 
              :key="index" 
              class="slide"
              :class="{ active: currentIndex === index }">
            <img 
              :src="image.src" 
              :alt="image.alt" 
              class="team-image"
              @keydown.left="previousSlide"
              @keydown.right="nextSlide"
              tabindex="0">
          </div>
        </div>
        <button class="nav-button prev" @click="previousSlide" aria-label="Previous slide">&lt;</button>
        <button class="nav-button next" @click="nextSlide" aria-label="Next slide">&gt;</button>
        <div class="dots">
          <button v-for="(_, index) in images" 
                  :key="index"
                  class="dot"
                  :class="{ active: currentIndex === index }"
                  @click="goToSlide(index)"
                  :aria-label="`Go to slide ${index + 1}`"
                  :aria-current="currentIndex === index"></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      images: [
        { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3', alt: 'Team' },
        { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3', alt: 'Collaboration' },
        { src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3', alt: 'Team Meeting' },
        { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3', alt: 'Innovation' }
      ],
      texts: [
        { 
          h1: 'Transformando Ideias Em <span class="highlight">Soluções Inovadoras</span>', 
          p: 'Soluções de TI e design personalizados para o seu <span class="highlight">negócio</span>.' 
        },
        { 
          h1: 'A <span class="highlight">Colaboração</span> é o Futuro para sua Empresa', 
          p: 'Trabalhando juntos para criar soluções de <span class="highlight">sucesso</span>.' 
        },
        { 
          h1: 'Inovação e o <span class="highlight">Futuro para sua empresa </span>', 
          p: 'Melhore a performance com novas soluções <span class="highlight">tecnológicas</span>.' 
        },
        { 
          h1: 'Transforme sua Empresa com <span class="highlight">Tecnologia</span>', 
          p: 'Criamos a tecnologia de amanhã para o seu <span class="highlight">negócio</span> de hoje.' 
        }
      ],
      currentIndex: 0,
      autoplayInterval: null,
      transitionSpeed: 5000
    };
  },
  computed: {
    sliderStyle() {
      return {
        transform: `translateX(-${this.currentIndex * 100}%)`
      };
    }
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    previousSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    goToSlide(index) {
      this.currentIndex = index;
    },
    startAutoplay() {
      this.autoplayInterval = setInterval(this.nextSlide, this.transitionSpeed);
    },
    pauseSlider() {
      clearInterval(this.autoplayInterval);
    },
    resumeSlider() {
      this.startAutoplay();
    }
  },
  mounted() {
    this.startAutoplay();
  },
  beforeUnmount() {
    clearInterval(this.autoplayInterval);
  }
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-text {
  animation: slideIn 0.8s ease-out;
}

.hero{
  background-color: rgb(207, 207, 207);
}
.hero-image {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slider-container {
  width: 100%;
  position: relative;
}

.slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.slide {
  flex: 0 0 100%;
  width: 100%;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 1rem;
  cursor: pointer;
  z-index: 2;
}

.nav-button.prev {
  left: 1rem;
}

.nav-button.next {
  right: 1rem;
}

.dots {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  padding: 0;
}

.dot.active {
  background: white;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: left;
}

.cta-button {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: var(--primary-color);
  color: white;
}

.cta-button.secondary {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary:hover {
  background-color: var(--primary-color);
  color: white;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary:hover {
  background-color: var(--primary-color);
  color: white;
}

.prev {
left: 1rem;
}

.next {
right: 1rem;
}

.dots {
position: absolute;
bottom: 1rem;
left: 50%;
transform: translateX(-50%);
display: flex;
gap: 0.5rem;
z-index: 2;
}

.dot {
width: 10px;
height: 10px;
border-radius: 50%;
background: rgba(255, 255, 255, 0.5);
border: none;
cursor: pointer;
transition: background-color 0.3s;
}

.dot.active {
background: white;
}

@media (max-width: 768px) {
.hero {
  flex-direction: column;
}

.hero-image {
  width: 100%;
}

.slider-container {
  height: 300px;
}

.nav-button {
  padding: 0.2rem;
  font-size: 1rem;
}
}

.hero-image {
flex: 1;
position: relative;
display: flex;
justify-content: center;
}

.team-image {
max-width: 100%;
height: auto;
border-radius: 15px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.secondary-image {
position: absolute;
width: 60%;
top: 50%;
right: -20%;
transform: translateY(-50%);
z-index: -1;
opacity: 0.8;
}

.social-proof {
display: flex;
align-items: center;
gap: 0.5rem;
margin-bottom: 2rem;
}

.user-avatar {
width: 40px;
height: 40px;
border-radius: 50%;
border: 2px solid white;
}
.highlight{
  color: #0099DD;
}


@media (max-width: 768px) {
.hero {
  flex-direction: column;
  text-align: center;
}

.hero-image {
  width: 100%;
}

.secondary-image {
  display: none;
}

.social-proof {
  justify-content: center;
}
.cta-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: center;
}
.cta-button {
  padding: 10px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: var(--primary-color);
  color: white;
}
}
</style>