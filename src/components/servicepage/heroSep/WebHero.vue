<template>
  <div class="services-page">
    <!-- Hero Section -->
    <!-- Hero Section Modificada -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Desenvolvemos </span>
            <span class="title-line highlight">
              <span class="tech-text">Seu Website</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Transforme sua ideia em um site incrível com nossa equipe de
            especialistas. Criamos soluções personalizadas para atender às suas
            necessidades.
          </p>
          <div class="cta-container">
            <button class="cta-button">
              <router-link to="/contato" class="cta-link">
                Fale com nossos especialistas</router-link
              >
            </button>
          </div>
          <div class="tech-stack">
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/vue-9.svg"
                alt="Vue.js"
                title="Vue.js"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://api.iconify.design/skill-icons:mongodb.svg"
                alt="mongodb"
                title="mongodb"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                alt="Node.js"
                title="Node.js"
              />
            </div>
            <div class="tech-icon">
              <img
                src="https://cdn.worldvectorlogo.com/logos/aws-2.svg"
                alt="aws"
                title="aws"
              />
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="browser-mockup">
            <div class="browser-frame">
              <div class="browser-controls">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div
                class="website-preview"
                style="
                  background-image: url('https://images.unsplash.com/photo-1649443992089-8bf1fc3c42f4?q=80&w=2070&auto=format&fit=crop');
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PaginaAjuste",
};
</script>

<style scoped>
.services-page {
  font-family: "Inter", sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

/* Hero Section */
/* Novo estilo para a Hero Section (similar ao mobile) */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 70%
    ),
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
  content: "";
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
}

.browser-mockup {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.browser-frame {
  position: relative;
  width: 100%;
  height: 400px;
  background: #0f172a;
  border-radius: 12px 12px 0 0;
  padding: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.browser-controls {
  display: flex;
  gap: 8px;
  padding: 10px;
}

.browser-controls span {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #475569;
}

.website-preview {
  width: 100%;
  height: calc(100% - 40px);
  border-radius: 8px;
  background-size: cover;
  background-position: center;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  margin-top: 8px;
  animation: bounce 2s infinite;
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
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-visual {
    order: -1;
    margin-bottom: 3rem;
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

  .browser-mockup {
    width: 100%;
  }
}
/* Services Section */
.services-section,
.portfolio-section,
.tech-section,
.process-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.service-banner {
  height: 200px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  position: relative;
}

.service-banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.service-banner h3 {
  color: white;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  margin: 0;
}

.service-content {
  padding: 1.5rem;
  background: white;
}

.service-content p {
  margin-bottom: 1rem;
  color: #4a5568;
}
.cta-link {
  text-decoration: none;
  color: white;
  font-weight: 800;
  transition: color 0.3s ease;
}

.service-features {
  margin: 1.5rem 0;
  padding-left: 1.5rem;
}

.service-features li {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.service-button {
  background: #edf2f7;
  color: #2d3748;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
}

.service-button:hover {
  background: #6366f1;
  color: white;
}

/* Portfolio Section */
.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.portfolio-image {
  height: 250px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 1.5rem;
  color: white;
}

.overlay h3 {
  margin: 0;
  font-size: 1.25rem;
}

.overlay p {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.portfolio-info {
  padding: 1.5rem;
  background: white;
}

.portfolio-info p {
  color: #4a5568;
  margin-bottom: 1rem;
}

.portfolio-link {
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.portfolio-link:hover {
  color: #3182ce;
}

/* Tech Section */
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.tech-category {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.tech-category h3 {
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2d3748;
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tech-item img {
  width: 50px;
  height: 50px;
  margin-bottom: 0.5rem;
}

.tech-item span {
  font-size: 0.9rem;
  color: #4a5568;
  text-align: center;
}

/* Process Section */
.process-section {
  background: #f7fafc;
}

.process-steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 3rem;
}

.process-step {
  flex: 1;
  min-width: 200px;
  max-width: 220px;
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 50px;
  height: 50px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 auto 1rem;
}

.process-step h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.process-step p {
  font-size: 0.9rem;
  color: #4a5568;
}

/* CTA Section */
.cta-section {
  background: #4299e1;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.cta-section h2 {
  margin-bottom: 1.5rem;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .services-grid,
  .portfolio-grid,
  .tech-grid {
    grid-template-columns: 1fr;
  }

  .process-step {
    min-width: 100%;
  }
}
</style>
