<template>
  <div class="mobile-dev-page">
    <!-- Hero Section with App Showcase -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Desenvolvimento Mobile</span>
            <span class="title-line highlight">
              <span class="tech-text">de Alto Impacto</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Aplicativos que encantam usuários e impulsionam negócios. Do
            conceito à loja de apps com tecnologia de ponta.
          </p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToPortfolio">
              Ver Portfólio
            </button>
            <button class="cta-button secondary" @click="scrollToContact">
              Fale Conosco
            </button>
          </div>
          <div class="tech-stack">
            <div
              class="tech-icon"
              v-for="(tech, index) in techStack"
              :key="index"
            >
              <img :src="tech.icon" :alt="tech.name" :title="tech.name" />
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="phone-mockup">
            <div class="phone-frame">
              <div
                class="app-screen"
                :style="{ backgroundImage: `url(${currentAppScreen})` }"
              ></div>
            </div>
            <div class="app-controls">
              <button
                v-for="(app, index) in featuredApps"
                :key="index"
                @click="changeAppScreen(index)"
                :class="{ active: currentAppIndex === index }"
              >
                {{ app.name }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Explore nossos cases</span>
        <div class="arrow"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PaginaAjuste",
  data() {
    return {
      currentAppIndex: 0,
      techStack: [
        {
          name: "Flutter",
          icon: "https://cdn.worldvectorlogo.com/logos/flutter-logo.svg",
        },
        {
          name: "React Native",
          icon: "https://cdn.worldvectorlogo.com/logos/react-native-1.svg",
        },
        {
          name: "Swift",
          icon: "https://cdn.worldvectorlogo.com/logos/swift-15.svg",
        },
        {
          name: "Kotlin",
          icon: "https://cdn.worldvectorlogo.com/logos/kotlin-1.svg",
        },
        {
          name: "Firebase",
          icon: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
        },
      ],
      featuredApps: [
        {
          name: "FinanX",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
          name: "HealthTrack",
          image:
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
        {
          name: "FoodExpress",
          image:
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        },
      ],
    };
  },
  computed: {
    currentAppScreen() {
      return this.featuredApps[this.currentAppIndex].image;
    },
  },
  methods: {
    changeAppScreen(index) {
      this.currentAppIndex = index;
    },
    scrollToPortfolio() {
      document
        .getElementById("portfolio")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToContact() {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Base Styles */
.mobile-dev-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Hero Section */
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

.phone-mockup {
  position: relative;
  width: 300px;
  margin: 0 auto;
}

.phone-frame {
  position: relative;
  width: 100%;
  height: 600px;
  background: #0f172a;
  border-radius: 40px;
  padding: 15px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.app-screen {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  transition: background-image 0.5s ease;
}

.app-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.app-controls button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.app-controls button.active {
  background: #6366f1;
  font-weight: 600;
}

.app-controls button:hover {
  background: rgba(255, 255, 255, 0.2);
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

/* Stats Section */
.stats-section {
  max-width: 1200px;
  margin: -5rem auto 6rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 3;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #64748b;
  font-size: 1rem;
}

.stat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(99, 102, 241, 0.1);
}

/* Services Section */
.services-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
  position: relative;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

.section-subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.service-icon img {
  width: 40px;
  height: 40px;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.service-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.service-features span {
  background: #f1f5f9;
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Portfolio Section */
.portfolio-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  max-width: 1400px;
  margin: 0 auto;
}

.portfolio-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.portfolio-filter button {
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.portfolio-filter button.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.portfolio-filter button:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.9);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
  text-align: center;
}

.project-overlay.active {
  opacity: 1;
}

.project-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.project-tech span {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.view-project {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-top: 1rem;
}

.view-project:hover {
  background: #4f46e5;
  transform: translateY(-3px);
}

/* Process Section */
.process-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.process-timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.process-timeline::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 2px;
  background: #e2e8f0;
  transform: translateX(-50%);
}

.process-phase {
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  position: relative;
}

.phase-number {
  width: 50px;
  height: 50px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.phase-content {
  flex: 1;
}

.phase-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.phase-content p {
  color: #64748b;
  margin-bottom: 1rem;
}

.phase-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.phase-tools span {
  background: #f1f5f9;
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  max-width: 1400px;
  margin: 0 auto;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
}

.client-details {
  flex: 1;
}

.client-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.client-details span {
  font-size: 0.9rem;
  color: #64748b;
}

.testimonial-text {
  font-style: italic;
  color: #475569;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  position: absolute;
  top: -20px;
  left: -15px;
  color: #e2e8f0;
  z-index: 0;
}

.testimonial-text p {
  position: relative;
  z-index: 1;
}

.client-rating {
  color: #fbbf24;
  margin-bottom: 1.5rem;
}

.rating-value {
  color: #64748b;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}

.app-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.app-badge img {
  height: 30px;
}

.app-badge span {
  font-size: 0.8rem;
  color: #64748b;
}

/* Contact Section */
.contact-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 4rem;
}

.contact-text {
  flex: 1;
}

.contact-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.contact-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  transform: translateX(5px);
}

.contact-link .icon {
  font-size: 1.5rem;
}

.contact-form {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-btn {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  font-size: 1.1rem;
}

.submit-btn:hover {
  background: #4f46e5;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Project Modal */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  background: #f1f5f9;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;
}

.modal-header {
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.modal-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.project-meta {
  display: flex;
  gap: 1rem;
  color: #64748b;
}

.project-category {
  background: #f1f5f9;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.project-year {
  font-size: 0.9rem;
}

.modal-body {
  display: flex;
  flex-direction: column;
  padding: 0;
}

.project-gallery {
  position: relative;
  height: 400px;
  background: #f8fafc;
}

.main-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.gallery-thumbnails {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.thumbnail:hover {
  border-color: #6366f1;
}

.project-details {
  padding: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.project-description {
  margin-bottom: 2rem;
}

.project-description h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.project-description p {
  color: #64748b;
  line-height: 1.7;
}

.project-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #64748b;
}

.project-features h3,
.project-technologies h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.project-features ul {
  list-style-type: none;
  padding-left: 0;
}

.project-features li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: #475569;
}

.project-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #6366f1;
  font-weight: bold;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badges span {
  background: #f1f5f9;
  color: #6366f1;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.store-link {
  display: inline-block;
  height: 50px;
}

.store-link img {
  height: 100%;
}

/* Animations */
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
  .hero-content,
  .contact-content {
    flex-direction: column;
  }

  .hero-visual {
    order: -1;
    margin-bottom: 3rem;
  }

  .project-details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    flex-direction: column;
  }

  .project-gallery {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }

  .cta-container {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    width: 100%;
  }

  .phone-mockup {
    width: 250px;
  }

  .phone-frame {
    height: 500px;
  }

  .testimonials-slider {
    grid-template-columns: 1fr;
  }
}
</style>
