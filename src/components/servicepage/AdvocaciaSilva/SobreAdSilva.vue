<template>
  <section id="sobre" class="about-preview">
    <div class="container">
      <!-- Elementos decorativos -->
      <div class="decorative-elements">
        <div class="decorative-shape shape-1"></div>
        <div class="decorative-shape shape-2"></div>
      </div>

      <div class="about-content">
        <!-- Coluna de Imagem -->
        <div class="about-image">
          <div class="image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              alt="Equipe da Advocacia Silva & Associados"
              class="main-image"
            />
            <div class="image-badge">
              <span class="years">25+</span>
              <span class="label">Anos de Experiência</span>
            </div>
          </div>
        </div>

        <!-- Coluna de Texto -->
        <div class="about-text">
          <h2 class="section-title">
            <span class="title-text">Excelência Jurídica com Tradição</span>
            <span class="title-highlight"></span>
          </h2>

          <p class="about-description">
            A <strong>Advocacia Silva & Associados</strong> é um escritório com
            mais de duas décadas de atuação no mercado jurídico, oferecendo
            soluções personalizadas e estratégicas para nossos clientes.
          </p>

          <div class="highlights-grid">
            <div
              class="highlight-item"
              v-for="(item, index) in highlights"
              :key="index"
            >
              <div class="highlight-icon">
                <img :src="item.icon" :alt="item.title" />
              </div>
              <div class="highlight-content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </div>
          </div>

          <div class="about-cta">
            <router-link to="" class="cta-button">
              <span>Conheça nossa história</span>
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
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutPreview",
  data() {
    return {
      highlights: [
        {
          title: "Missão",
          description:
            "Proteger os direitos de nossos clientes com ética e excelência técnica",
          icon: "https://api.iconify.design/mdi:target.svg",
        },
        {
          title: "Visão",
          description: "Ser referência em advocacia consultiva e contenciosa",
          icon: "https://api.iconify.design/mdi:eye-outline.svg",
        },
        {
          title: "Valores",
          description: "Integridade, comprometimento e inovação jurídica",
          icon: "https://api.iconify.design/mdi:heart-outline.svg",
        },
        {
          title: "Diferenciais",
          description: "Atendimento personalizado e estratégias customizadas",
          icon: "https://api.iconify.design/mdi:star-outline.svg",
        },
      ],
    };
  },
};
</script>

<style scoped>
:root {
  --primary: #1a3e72;
  --primary-light: #2a4e82;
  --secondary: #d4af37;
  --secondary-light: #e4bf47;
  --dark: #0a192f;
  --light: #f8f9fa;
  --lighter: #ffffff;
  --gray: #6c757d;
  --gray-light: #e9ecef;
}

.about-preview {
  position: relative;
  padding: 100px 0;
  background: var(--lighter);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Elementos decorativos */
.decorative-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decorative-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(26, 62, 114, 0.03);
}

.shape-1 {
  width: 400px;
  height: 400px;
  top: -200px;
  right: -200px;
}

.shape-2 {
  width: 300px;
  height: 300px;
  bottom: -150px;
  left: -150px;
}

/* Layout do conteúdo */
.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  position: relative;
  z-index: 1;
}

.about-image {
  position: relative;
}

.image-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.about-image:hover .main-image {
  transform: scale(1.05);
}

.image-badge {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: var(--secondary);
  color: var(--dark);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
  transform: rotate(3deg);
  transition: all 0.4s ease;
}

.about-image:hover .image-badge {
  transform: rotate(0) scale(1.05);
}

.years {
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 5px;
}

/* Texto sobre */
.about-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 25px;
  position: relative;
  line-height: 1.2;
}

.title-highlight {
  position: absolute;
  bottom: 8px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(212, 175, 55, 0.3);
  z-index: -1;
  transform-origin: left;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.section-title:hover .title-highlight {
  transform: scaleX(0.9);
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark);
  margin-bottom: 40px;
}

.about-description strong {
  color: var(--primary);
  font-weight: 600;
}

/* Destaques */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.highlight-item {
  display: flex;
  gap: 15px;
}

.highlight-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 62, 114, 0.1);
  border-radius: 50%;
  flex-shrink: 0;
}

.highlight-icon img {
  width: 20px;
  height: 20px;
}

.highlight-content h3 {
  font-size: 1.1rem;
  color: var(--primary);
  margin-bottom: 5px;
}

.highlight-content p {
  font-size: 0.9rem;
  color: var(--gray);
  line-height: 1.6;
}

/* CTA */
.about-cta {
  margin-top: 30px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  background: var(--primary);
  color: var(--lighter);
  padding: 14px 30px;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 62, 114, 0.3);
}

.cta-button:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(26, 62, 114, 0.4);
}

.cta-button svg {
  width: 16px;
  height: 16px;
  margin-left: 10px;
}

/* Responsividade */
@media (max-width: 992px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .about-image {
    height: 400px;
  }

  .section-title {
    font-size: 2.2rem;
  }
}

@media (max-width: 768px) {
  .about-preview {
    padding: 80px 0;
  }

  .highlights-grid {
    grid-template-columns: 1fr 1fr;
  }

  .image-badge {
    padding: 15px;
    bottom: 20px;
    right: 20px;
  }

  .years {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }

  .highlights-grid {
    grid-template-columns: 1fr;
  }

  .about-image {
    height: 300px;
  }
}
</style>
