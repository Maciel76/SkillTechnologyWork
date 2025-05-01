<template>
  <section class="section testimonials-section">
    <div class="container">
      <h2 class="section-title">Depoimentos</h2>
      <div class="testimonials-slider">
        <div
          class="testimonial"
          v-for="(testimonial, index) in testimonials"
          :key="index"
          :class="{ active: activeTestimonial === index }"
        >
          <div class="testimonial-content">
            <p>"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <img :src="testimonial.avatar" :alt="testimonial.name" />
              <div>
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.role }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevTestimonial" class="slider-btn">
            <i class="fas fa-chevron-left"></i>
          </button>
          <div class="slider-dots">
            <span
              v-for="(dot, index) in testimonials.length"
              :key="index"
              :class="{ active: activeTestimonial === index }"
              @click="setTestimonial(index)"
            ></span>
          </div>
          <button @click="nextTestimonial" class="slider-btn">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsEducar",
  data() {
    return {
      testimonials: [
        {
          text: "O Instituto Educar transformou a vida do meu filho. A metodologia inovadora e o cuidado dos professores fazem toda a diferença.",
          name: "Ana Silva",
          role: "Mãe do aluno João",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          text: "Como educadora, fico impressionada com a qualidade do ensino e a infraestrutura oferecida pelo Instituto Educar. Recomendo!",
          name: "Carlos Mendes",
          role: "Professor convidado",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          text: "Meus dois filhos estudam no Instituto e eu não poderia estar mais satisfeita. O desenvolvimento deles é visível a cada dia.",
          name: "Mariana Oliveira",
          role: "Mãe dos alunos Lucas e Sofia",
          avatar: "https://randomuser.me/api/portraits/women/63.jpg",
        },
      ],
      activeTestimonial: 0,
      interval: null,
    };
  },
  methods: {
    nextTestimonial() {
      this.activeTestimonial =
        (this.activeTestimonial + 1) % this.testimonials.length;
    },
    prevTestimonial() {
      this.activeTestimonial =
        (this.activeTestimonial - 1 + this.testimonials.length) %
        this.testimonials.length;
    },
    setTestimonial(index) {
      this.activeTestimonial = index;
    },
  },
  mounted() {
    this.interval = setInterval(this.nextTestimonial, 5000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.testimonials-section {
  background: var(--light-color);
}

.testimonials-slider {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial {
  display: none;
  animation: fade 0.5s ease;
}

.testimonial.active {
  display: block;
}

.testimonial-content {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.testimonial-content p {
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  margin-bottom: 30px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
}

.testimonial-author img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.testimonial-author h4 {
  color: var(--primary-color);
  margin-bottom: 5px;
}

.testimonial-author span {
  color: #777;
  font-size: 0.9rem;
}

.slider-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.slider-btn {
  background: none;
  border: none;
  color: var(--secondary-color);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 15px;
}

.slider-dots {
  display: flex;
  gap: 10px;
}

.slider-dots span {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.3s ease;
}

.slider-dots span.active {
  background: var(--secondary-color);
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .testimonial-content {
    padding: 30px 20px;
  }

  .testimonial-content p {
    font-size: 1rem;
  }
}
</style>
