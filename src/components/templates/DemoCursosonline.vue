<template>
  <!-- Efeito de partículas de fundo -->
  <Particles id="tsparticles" :options="particlesOptions" />

  <div class="course-landing">
    <!-- Header Flutuante -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <div class="container">
        <div class="logo" @click="smoothScroll('#hero')">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
              fill="#2563EB"
            />
            <path
              d="M28 15L17 26L12 21"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>DOMINE<span class="gold">PRO</span></span>
        </div>

        <nav class="nav" :class="{ active: mobileMenuOpen }">
          <a href="#about" class="nav-link" @click="closeMobileMenu">O Curso</a>
          <a href="#results" class="nav-link" @click="closeMobileMenu"
            >Resultados</a
          >
          <a href="#modules" class="nav-link" @click="closeMobileMenu"
            >Módulos</a
          >
          <a href="#testimonials" class="nav-link" @click="closeMobileMenu"
            >Depoimentos</a
          >
          <a href="#faq" class="nav-link" @click="closeMobileMenu">FAQ</a>
          <button class="nav-cta pulse" @click="openCheckout">
            QUERO ME INSCREVER
          </button>
        </nav>

        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Hero Section com Vídeo Background -->
    <section id="hero" class="hero">
      <div class="video-background">
        <video autoplay muted loop playsinline>
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-holding-her-digital-tablet-while-searching-11739-large.mp4"
            type="video/mp4"
          />
        </video>
        <div class="video-overlay"></div>
      </div>

      <div class="container">
        <div class="hero-content">
          <div
            class="badge animate__animated animate__fadeIn animate__delay-1s"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                fill="#F59E0B"
              />
            </svg>
            <span>LANÇAMENTO EXCLUSIVO</span>
          </div>

          <h1 class="hero-title animate__animated animate__fadeInUp">
            DOMINE <span class="gradient-text">MARKETING DIGITAL</span> COM O
            MÉTODO <span class="gold">#1 DO BRASIL</span>
          </h1>

          <p
            class="hero-subtitle animate__animated animate__fadeInUp animate__delay-1s"
          >
            Aprenda as estratégias que já transformaram
            <strong>+5.000 alunos</strong> e gere resultados reais em semanas,
            mesmo que você esteja começando do zero.
          </p>

          <!-- Contador Regressivo -->
          <div
            class="countdown animate__animated animate__fadeIn animate__delay-2s"
          >
            <p>OFERTA TERMINA EM:</p>
            <div class="countdown-timer">
              <div class="countdown-item">
                <span>{{ days }}</span>
                <small>Dias</small>
              </div>
              <div class="countdown-item">
                <span>{{ hours }}</span>
                <small>Horas</small>
              </div>
              <div class="countdown-item">
                <span>{{ minutes }}</span>
                <small>Min</small>
              </div>
              <div class="countdown-item">
                <span>{{ seconds }}</span>
                <small>Seg</small>
              </div>
            </div>
          </div>

          <!-- CTA Principal -->
          <div
            class="cta-card glassmorphism animate__animated animate__zoomIn animate__delay-2s"
          >
            <div class="price-tag">
              <span class="original-price">DE R$ 1.497,00</span>
              <span class="current-price">POR APENAS 12x R$ 97,00</span>
              <span class="payment-option">ou R$ 997,00 à vista</span>
            </div>

            <button class="submit-btn" @click="openCheckout">
              <span>GARANTIR MINHA VAGA AGORA</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M10 4L16 10L10 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div class="benefits-grid">
              <div class="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#10B981"
                  />
                  <path
                    d="M6 10L9 13L14 8"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Acesso Vitalício</span>
              </div>
              <div class="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#10B981"
                  />
                  <path
                    d="M6 10L9 13L14 8"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Certificado Reconhecido</span>
              </div>
              <div class="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#10B981"
                  />
                  <path
                    d="M6 10L9 13L14 8"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Suporte Individual</span>
              </div>
              <div class="benefit-item">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
                    fill="#10B981"
                  />
                  <path
                    d="M6 10L9 13L14 8"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>7 Dias de Garantia</span>
              </div>
            </div>

            <div class="security-badges">
              <img
                src="https://via.placeholder.com/100x40?text=SSL"
                alt="Site Seguro"
              />
              <img
                src="https://via.placeholder.com/100x40?text=PAGSEGURO"
                alt="PagSeguro"
              />
              <img
                src="https://via.placeholder.com/100x40?text=CIELO"
                alt="Cielo"
              />
            </div>
          </div>
        </div>

        <div class="hero-image">
          <div class="instructor-card floating">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Instrutor"
              class="instructor-img"
            />
            <div class="instructor-badge">
              <span>Lucas Mendes</span>
              <small>Especialista em Marketing Digital</small>
            </div>
          </div>

          <div class="course-mockup floating">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
              alt="Plataforma do Curso"
              class="platform-img"
            />
            <div class="floating-certificate">
              <img
                src="https://via.placeholder.com/150x100?text=CERTIFICADO"
                alt="Certificado"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Logos de Parceiros -->
    <section class="partners-section">
      <div class="container">
        <p class="section-subtitle">
          Reconhecido pelas principais empresas do mercado
        </p>
        <div class="partners-slider">
          <div class="slider-track">
            <img
              src="https://via.placeholder.com/150x60?text=GOOGLE"
              alt="Google Partner"
            />
            <img
              src="https://via.placeholder.com/150x60?text=META"
              alt="Meta Partner"
            />
            <img
              src="https://via.placeholder.com/150x60?text=HUBSPOT"
              alt="Hubspot"
            />
            <img
              src="https://via.placeholder.com/150x60?text=RD+STATION"
              alt="RD Station"
            />
            <img
              src="https://via.placeholder.com/150x60?text=HOTMART"
              alt="Hotmart"
            />
            <img
              src="https://via.placeholder.com/150x60?text=GOOGLE"
              alt="Google Partner"
            />
            <img
              src="https://via.placeholder.com/150x60?text=META"
              alt="Meta Partner"
            />
            <img
              src="https://via.placeholder.com/150x60?text=HUBSPOT"
              alt="Hubspot"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Seção Sobre o Curso -->
    <section id="about" class="about-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">O QUE É O DOMINEPRO?</h2>
          <p class="section-subtitle">
            O método mais completo para dominar o marketing digital do zero ao
            avançado
          </p>
        </div>

        <div class="about-content">
          <div class="about-video">
            <div class="video-wrapper" @click="playVideo">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt="Thumbnail do Vídeo"
                class="video-thumbnail"
              />
              <div class="play-button">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                    fill="#2563EB"
                  />
                  <path d="M25 20L40 30L25 40V20Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          <div class="about-text">
            <h3>
              Transforme sua carreira em
              <span class="gradient-text">apenas 8 semanas</span>
            </h3>
            <p>
              O DominePro não é apenas mais um curso de marketing digital. É um
              método completo e testado que já ajudou mais de 5.000 alunos a
              construírem carreiras de sucesso ou alavancarem seus negócios.
            </p>

            <div class="about-features">
              <div class="feature-item">
                <div class="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#10B981"
                    />
                    <path
                      d="M8 12L11 15L16 10"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Aulas 100% Práticas</h4>
                  <p>
                    Nada de teoria sem aplicação. Você vai aprender fazendo.
                  </p>
                </div>
              </div>

              <div class="feature-item">
                <div class="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#10B981"
                    />
                    <path
                      d="M8 12L11 15L16 10"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Comunidade Exclusiva</h4>
                  <p>Grupo fechado com alunos e mentores para networking.</p>
                </div>
              </div>

              <div class="feature-item">
                <div class="feature-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      fill="#10B981"
                    />
                    <path
                      d="M8 12L11 15L16 10"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class="feature-text">
                  <h4>Atualizações Constantes</h4>
                  <p>Conteúdo sempre atualizado com as últimas tendências.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Resultados -->
    <section id="results" class="results-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">RESULTADOS COMPROVADOS</h2>
          <p class="section-subtitle">
            Veja o que nossos alunos estão conquistando
          </p>
        </div>

        <div class="results-grid">
          <div class="result-card">
            <div class="result-number">
              <span class="counter" data-target="5000">0</span>+
            </div>
            <div class="result-text">Alunos Transformados</div>
          </div>

          <div class="result-card">
            <div class="result-number">
              R$<span class="counter" data-target="15000">0</span>+
            </div>
            <div class="result-text">Média de Faturamento</div>
          </div>

          <div class="result-card">
            <div class="result-number">
              <span class="counter" data-target="92">0</span>%
            </div>
            <div class="result-text">Taxa de Satisfação</div>
          </div>

          <div class="result-card">
            <div class="result-number">
              <span class="counter" data-target="300">0</span>+
            </div>
            <div class="result-text">Casos de Sucesso</div>
          </div>
        </div>

        <div class="results-gallery">
          <div
            class="gallery-item"
            v-for="(testimonial, index) in visualTestimonials"
            :key="index"
          >
            <img :src="testimonial.image" :alt="testimonial.name" />
            <div class="gallery-overlay">
              <div class="overlay-content">
                <p>"{{ testimonial.text }}"</p>
                <div class="testimonial-author">
                  <strong>{{ testimonial.name }}</strong>
                  <div class="rating">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                        fill="#F59E0B"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                        fill="#F59E0B"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                        fill="#F59E0B"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                        fill="#F59E0B"
                      />
                    </svg>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0L10.122 5.02786L15.6085 5.52786L11.8043 9.11114L13.0532 14.4721L8 11.8L2.9468 14.4721L4.1957 9.11114L0.391548 5.52786L5.87802 5.02786L8 0Z"
                        fill="#F59E0B"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Módulos -->
    <section id="modules" class="modules-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">O QUE VOCÊ VAI APRENDER</h2>
          <p class="section-subtitle">
            Um método passo a passo para dominar o marketing digital
          </p>
        </div>

        <div class="modules-tabs">
          <div class="tabs-header">
            <button
              v-for="(module, index) in modules"
              :key="index"
              :class="{ active: activeTab === index }"
              @click="activeTab = index"
            >
              {{ module.title }}
            </button>
          </div>

          <div class="tabs-content">
            <div
              v-for="(module, index) in modules"
              :key="index"
              class="tab-pane"
              :class="{ active: activeTab === index }"
            >
              <div class="module-header">
                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>
              </div>

              <div class="module-lessons">
                <div
                  class="lesson-item"
                  v-for="(lesson, i) in module.lessons"
                  :key="i"
                >
                  <div class="lesson-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#2563EB"
                      />
                      <path
                        d="M8 12L11 15L16 10"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div class="lesson-content">
                    <h4>{{ lesson }}</h4>
                    <p>{{ module.lessonDescriptions[i] }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Depoimentos -->
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">DEPOIMENTOS REAIS</h2>
          <p class="section-subtitle">Veja o que nossos alunos estão dizendo</p>
        </div>

        <div class="testimonials-slider">
          <div class="slider-container">
            <div
              class="testimonial-card"
              v-for="(testimonial, index) in testimonials"
              :key="index"
            >
              <div
                class="testimonial-video"
                @click="playTestimonialVideo(testimonial.videoId)"
              >
                <img
                  :src="
                    'https://img.youtube.com/vi/' +
                    testimonial.videoId +
                    '/hqdefault.jpg'
                  "
                  alt="Depoimento"
                />
                <div class="play-button">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                      fill="#2563EB"
                    />
                    <path d="M16 15L26 20L16 25V15Z" fill="white" />
                  </svg>
                </div>
              </div>
              <div class="testimonial-content">
                <div class="testimonial-text">
                  <p>"{{ testimonial.text }}"</p>
                </div>
                <div class="testimonial-author">
                  <img :src="testimonial.avatar" :alt="testimonial.name" />
                  <div class="author-info">
                    <strong>{{ testimonial.name }}</strong>
                    <span>{{ testimonial.role }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="slider-nav prev" @click="prevTestimonial">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button class="slider-nav next" @click="nextTestimonial">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
      </div>
    </section>

    <!-- Seção de Bônus -->
    <section class="bonus-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">BÔNUS EXCLUSIVOS</h2>
          <p class="section-subtitle">Para quem se inscrever hoje</p>
        </div>

        <div class="bonus-grid">
          <div
            class="bonus-card"
            v-for="(bonus, index) in bonuses"
            :key="index"
          >
            <div class="bonus-header">
              <div class="bonus-number">BÔNUS {{ index + 1 }}</div>
              <h3>{{ bonus.title }}</h3>
              <div class="bonus-value">Valor: R$ {{ bonus.value }},00</div>
            </div>
            <div class="bonus-content">
              <img :src="bonus.image" :alt="bonus.title" />
              <p>{{ bonus.description }}</p>
              <ul>
                <li v-for="(item, i) in bonus.items" :key="i">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Garantia -->
    <section class="guarantee-section">
      <div class="container">
        <div class="guarantee-card">
          <div class="guarantee-badge">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z"
                fill="#10B981"
              />
              <path
                d="M42 22L26 38L18 30"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2>GARANTIA INCONDICIONAL DE 7 DIAS</h2>
          <p>
            Se em até 7 dias você achar que o curso não é para você, devolvemos
            100% do seu dinheiro, sem burocracia.
          </p>
          <p><strong>Sem perguntas. Sem riscos.</strong></p>
        </div>
      </div>
    </section>

    <!-- Seção de Perguntas Frequentes -->
    <section id="faq" class="faq-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">PERGUNTAS FREQUENTES</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre o DominePro</p>
        </div>

        <div class="faq-accordion">
          <div
            class="faq-item"
            v-for="(faq, index) in faqs"
            :key="index"
            :class="{ active: faq.active }"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <h3>{{ faq.question }}</h3>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="final-cta">
      <div class="container">
        <div class="cta-content">
          <h2 class="section-title">PRONTO PARA TRANSFORMAR SUA CARREIRA?</h2>
          <p class="section-subtitle">
            Garanta sua vaga agora e comece hoje mesmo!
          </p>

          <div class="cta-card">
            <div class="price-tag">
              <span class="original-price">DE R$ 1.497,00</span>
              <span class="current-price">POR APENAS 12x R$ 97,00</span>
              <span class="payment-option">ou R$ 997,00 à vista</span>
            </div>

            <button class="submit-btn" @click="openCheckout">
              <span>QUERO ME INSCREVER AGORA</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 10H16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M10 4L16 10L10 16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div class="payment-methods">
              <img
                src="https://via.placeholder.com/300x40?text=FORMAS+DE+PAGAMENTO"
                alt="Métodos de Pagamento"
              />
              <p>Parcele em até 12x no cartão ou pague à vista com desconto</p>
            </div>

            <div class="guarantee-badge">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  fill="#10B981"
                />
                <path
                  d="M8 12L11 15L16 10"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>7 dias de garantia incondicional</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-main">
            <div class="footer-brand">
              <div class="logo">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                    fill="#2563EB"
                  />
                  <path
                    d="M28 15L17 26L12 21"
                    stroke="white"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>DOMINE<span class="gold">PRO</span></span>
              </div>
              <p>O curso mais completo de marketing digital do Brasil.</p>

              <div class="social-links">
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5772 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4228 8.09406 12.5922C7.96039 11.7616 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.5 6.5H17.51"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C4.00035 5.85752 3.26375 6.95991 2.7612 8.17317C2.25866 9.38642 2 10.6868 2 12C2 13.3132 2.25866 14.6136 2.7612 15.8268C3.26375 17.0401 4.00035 18.1425 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C13.3132 22 14.6136 21.7413 15.8268 21.2388C17.0401 20.7362 18.1425 19.9997 19.0711 19.0711C19.9997 18.1425 20.7362 17.0401 21.2388 15.8268C21.7413 14.6136 22 13.3132 22 12L22 12Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 8V16M8 12H16H8ZM8 8L16 16L8 8Z"
                      stroke="#2563EB"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div class="footer-links">
              <h4>Links Rápidos</h4>
              <ul>
                <li>
                  <a href="#about" @click="smoothScroll('#about')"
                    >Sobre o Curso</a
                  >
                </li>
                <li>
                  <a href="#modules" @click="smoothScroll('#modules')"
                    >Módulos</a
                  >
                </li>
                <li>
                  <a href="#results" @click="smoothScroll('#results')"
                    >Resultados</a
                  >
                </li>
                <li>
                  <a href="#testimonials" @click="smoothScroll('#testimonials')"
                    >Depoimentos</a
                  >
                </li>
                <li><a href="#faq" @click="smoothScroll('#faq')">FAQ</a></li>
              </ul>
            </div>

            <div class="footer-contact">
              <h4>Contato</h4>
              <ul>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H15C15.825 3 16.5 3.675 16.5 4.5V13.5C16.5 14.325 15.825 15 15 15H3C2.175 15 1.5 14.325 1.5 13.5V4.5C1.5 3.675 2.175 3 3 3Z"
                      stroke="#2563EB"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.5 4.5L9 9.75L1.5 4.5"
                      stroke="#2563EB"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  contato@dominepro.com
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.99 11.51C15.99 12.81 15.72 14.085 15.21 15.24C15.09 15.5 14.91 15.725 14.685 15.895C14.46 16.065 14.195 16.175 13.915 16.215C12.27 16.455 6.075 16.44 4.335 16.215C4.0542 16.1729 3.7886 16.0609 3.5635 15.8896C3.3384 15.7182 3.1612 15.4934 3.045 15.24C2.5425 14.085 2.265 12.81 2.265 11.505C2.265 10.2 2.5425 8.925 3.045 7.77C3.1612 7.51658 3.3384 7.29183 3.5635 7.12044C3.7886 6.94906 4.0542 6.83714 4.335 6.795C6.075 6.57 12.27 6.555 13.915 6.795C14.195 6.835 14.46 6.945 14.685 7.115C14.91 7.285 15.09 7.51 15.21 7.77C15.72 8.925 15.99 10.2 15.99 11.505V11.51Z"
                      stroke="#2563EB"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.75 3H5.25C3.675 3 2.25 4.425 2.25 6V11.505C2.25 12.81 2.5275 14.085 3.03 15.24C3.1462 15.4934 3.3234 15.7182 3.5485 15.8896C3.7736 16.0609 4.0392 16.1729 4.32 16.215C6.06 16.44 12.255 16.455 13.905 16.215C14.185 16.175 14.45 16.065 14.675 15.895C14.9 15.725 15.08 15.5 15.195 15.24C15.705 14.085 15.975 12.81 15.975 11.505V6C15.75 4.425 14.325 3 12.75 3Z"
                      stroke="#2563EB"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  (11) 98765-4321
                </li>
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2023 DominePro. Todos os direitos reservados.</p>
            <div class="footer-legal">
              <a href="#">Termos de Uso</a>
              <a href="#">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- Modal de Vídeo -->
    <div class="video-modal" :class="{ active: videoModalOpen }">
      <div class="modal-overlay" @click="closeVideoModal"></div>
      <div class="modal-content">
        <button class="modal-close" @click="closeVideoModal">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div class="video-container">
          <iframe
            v-if="videoModalOpen"
            :src="
              'https://www.youtube.com/embed/' + currentVideoId + '?autoplay=1'
            "
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadFull } from "tsparticles";

export default {
  name: "CourseLanding",
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false,
      videoModalOpen: false,
      currentVideoId: "",
      activeTab: 0,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      countdownDate: new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // 7 dias a partir de agora
      particlesOptions: {
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#2563EB",
          },
          links: {
            color: "#2563EB",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      },
      modules: [
        {
          title: "Módulo 1: Fundamentos do Marketing Digital",
          description:
            "Domine os conceitos essenciais para construir uma base sólida em marketing digital.",
          lessons: [
            "Introdução ao Marketing Digital",
            "Criando Seu Funil de Vendas",
            "Definindo Seu Público-Alvo",
            "Personas e Jornada do Consumidor",
            "Métricas e KPIs Essenciais",
          ],
          lessonDescriptions: [
            "Entenda os pilares do marketing digital e como aplicá-los",
            "Aprenda a criar funis de conversão eficientes",
            "Defina seu público com precisão para campanhas certeiras",
            "Crie personas detalhadas e mapeie a jornada do cliente",
            "Domine as métricas que realmente importam para seu negócio",
          ],
        },
        {
          title: "Módulo 2: Tráfego Pago que Converte",
          description:
            "Aprenda estratégias avançadas de tráfego pago para gerar leads e vendas.",
          lessons: [
            "Configurando Sua Primeira Campanha",
            "Otimização de Anúncios",
            "Retargeting Avançado",
            "Google Ads e Meta Ads",
            "Analytics e ROI",
          ],
          lessonDescriptions: [
            "Passo a passo para criar campanhas vencedoras",
            "Técnicas para melhorar o CTR e reduzir o CPL",
            "Estratégias de retargeting para conversões",
            "Diferenças e vantagens de cada plataforma",
            "Como medir e melhorar seu retorno sobre investimento",
          ],
        },
        {
          title: "Módulo 3: Conversão e Vendas",
          description:
            "Técnicas comprovadas para aumentar conversões e fechar mais vendas.",
          lessons: [
            "Copywriting que Vende",
            "Páginas de Vendas de Alta Conversão",
            "Sequência de E-mails Automatizada",
            "Gatilhos Mentais Aplicados",
            "Upsell e Cross-sell",
          ],
          lessonDescriptions: [
            "Escreva textos persuasivos que convertem",
            "Elementos essenciais de uma landing page vencedora",
            "Automatize seu processo de vendas com e-mails",
            "Aplicação prática de psicologia em vendas",
            "Técnicas para aumentar o ticket médio",
          ],
        },
      ],
      faqs: [
        {
          question: "Por quanto tempo terei acesso ao curso?",
          answer:
            "Você terá acesso vitalício a todo o conteúdo do curso, incluindo todas as atualizações futuras que fizermos. Isso significa que você pode aprender no seu próprio ritmo e revisar o material sempre que precisar.",
          active: false,
        },
        {
          question: "Existe algum requisito para fazer o curso?",
          answer:
            "Não, o curso foi desenvolvido para ser acessível tanto para iniciantes quanto para quem já tem experiência. Tudo é explicado de forma clara e prática, desde os conceitos mais básicos até as estratégias mais avançadas.",
          active: false,
        },
        {
          question: "Como funciona a garantia de 7 dias?",
          answer:
            "Se dentro de 7 dias após a compra você achar que o curso não atendeu suas expectativas, basta nos enviar um e-mail que devolvemos 100% do seu dinheiro, sem questionamentos. Queremos apenas alunos satisfeitos.",
          active: false,
        },
        {
          question: "Quanto tempo leva para ver resultados?",
          answer:
            "Isso varia conforme seu nível de dedicação. Alguns alunos veem resultados em poucas semanas, enquanto outros levam alguns meses para consolidar o conhecimento. O importante é seguir o método e aplicar o que é ensinado.",
          active: false,
        },
        {
          question: "Há suporte para tirar dúvidas?",
          answer:
            "Sim! Além das aulas, você terá acesso a um grupo exclusivo no Telegram onde pode tirar dúvidas diretamente com nossa equipe e outros alunos. Também realizamos lives mensais para responder perguntas.",
          active: false,
        },
      ],
      testimonials: [
        {
          name: "Ana Santos",
          role: "Empreendedora Digital",
          text: "Depois do curso, consegui meu primeiro cliente pagando R$ 5.000/mês. Valeu cada centavo!",
          avatar: "https://randomuser.me/api/portraits/women/32.jpg",
          videoId: "dQw4w9WgXcQ",
        },
        {
          name: "Carlos Oliveira",
          role: "Consultor de Marketing",
          text: "Tripliquei minha renda em 3 meses aplicando o que aprendi. O suporte é incrível!",
          avatar: "https://randomuser.me/api/portraits/men/44.jpg",
          videoId: "dQw4w9WgXcQ",
        },
        {
          name: "Mariana Costa",
          role: "Gestora de Tráfego",
          text: "Consegui meu primeiro emprego na área com um salário 3x maior que meu antigo trabalho. O curso mudou minha vida!",
          avatar: "https://randomuser.me/api/portraits/women/68.jpg",
          videoId: "dQw4w9WgXcQ",
        },
      ],
      visualTestimonials: [
        {
          name: "João Silva",
          text: "Aumentei as vendas do meu e-commerce em 300% com as estratégias do curso!",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
        {
          name: "Fernanda Lima",
          text: "Finalmente consegui monetizar meu Instagram e hoje vivo do marketing digital!",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
        {
          name: "Ricardo Almeida",
          text: "Em 6 meses já tinha recuperado o investimento no curso 10 vezes!",
          image:
            "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
        {
          name: "Patrícia Souza",
          text: "O módulo de copywriting sozinho já valeu por todo o curso!",
          image:
            "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        },
      ],
      bonuses: [
        {
          title: "E-book: Fórmula de Lançamentos",
          description:
            "Um guia passo a passo para criar lançamentos que vendem, com templates prontos para você copiar e adaptar.",
          value: "297",
          image: "https://via.placeholder.com/300x200?text=E-book",
          items: [
            "Estrutura de lançamento comprovada",
            "Scripts para webinars",
            "Modelos de e-mails de vendas",
            "Checklist de pré-lançamento",
          ],
        },
        {
          title: "Workshop Ao Vivo",
          description:
            "Acesso a um workshop exclusivo sobre tráfego pago com estratégias atualizadas para 2023.",
          value: "497",
          image: "https://via.placeholder.com/300x200?text=Workshop",
          items: [
            "2 horas de conteúdo exclusivo",
            "Análise de campanhas reais",
            "Plantão de dúvidas",
            "Material complementar",
          ],
        },
        {
          title: "Templates Prontos",
          description:
            "Modelos de anúncios, e-mails e páginas de vendas que você pode usar como base para seus projetos.",
          value: "197",
          image: "https://via.placeholder.com/300x200?text=Templates",
          items: [
            "10 modelos de anúncios",
            "5 sequências de e-mails",
            "3 landing pages",
            "Scripts para vídeos de vendas",
          ],
        },
        {
          title: "Mentoria Coletiva Mensal",
          description:
            "Participação em encontros mensais para tirar dúvidas e receber feedback dos especialistas.",
          value: "397",
          image: "https://via.placeholder.com/300x200?text=Mentoria",
          items: [
            "1 encontro por mês",
            "Duração de 2 horas",
            "Análise de cases reais",
            "Networking com outros alunos",
          ],
        },
      ],
    };
  },
  methods: {
    async particlesInit(engine) {
      await loadFull(engine);
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },
    toggleFaq(index) {
      this.faqs[index].active = !this.faqs[index].active;
    },
    playVideo() {
      this.currentVideoId = "dQw4w9WgXcQ"; // ID do vídeo de apresentação
      this.videoModalOpen = true;
    },
    playTestimonialVideo(videoId) {
      this.currentVideoId = videoId;
      this.videoModalOpen = true;
    },
    closeVideoModal() {
      this.videoModalOpen = false;
      this.currentVideoId = "";
    },
    openCheckout() {
      // Aqui você pode redirecionar para a página de checkout
      window.location.href = "https://pagseguro.uol.com.br/checkout";
    },
    smoothScroll(target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    },
    prevTestimonial() {
      const container = document.querySelector(".slider-container");
      container.scrollBy({ left: -300, behavior: "smooth" });
    },
    nextTestimonial() {
      const container = document.querySelector(".slider-container");
      container.scrollBy({ left: 300, behavior: "smooth" });
    },
    updateCountdown() {
      const now = new Date().getTime();
      const distance = this.countdownDate - now;

      this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
        .toString()
        .padStart(2, "0");
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      if (distance < 0) {
        clearInterval(this.countdownTimer);
        this.days = "00";
        this.hours = "00";
        this.minutes = "00";
        this.seconds = "00";
      }
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    animateCounters() {
      const counters = document.querySelectorAll(".counter");
      const speed = 200;

      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(this.animateCounters, 1);
        } else {
          counter.innerText = target;
        }
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    // Inicializa o contador regressivo
    this.updateCountdown();
    this.countdownTimer = setInterval(this.updateCountdown, 1000);

    // Observador de interseção para animações
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "animate__animated",
              "animate__fadeInUp"
            );

            if (entry.target.classList.contains("counter")) {
              this.animateCounters();
            }
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document
      .querySelectorAll(
        ".result-number, .module-card, .testimonial-card, .bonus-card"
      )
      .forEach((el) => {
        observer.observe(el);
      });
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.countdownTimer);
  },
};
</script>

<style scoped>
/* Estilos base */
:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --secondary: #10b981;
  --accent: #f59e0b;
  --dark: #1f2937;
  --light: #f3f4f6;
  --white: #ffffff;
  --gray: #6b7280;
  --dark-blue: #1e3a8a;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--dark);
  line-height: 1.6;
  overflow-x: hidden;
  background-color: #f8fafc;
}

.container {
  width: 100%;
  max-width: 1600;
  margin: 0 auto;
  padding: 0 20px;
}

section {
  padding: 80px 0;
  position: relative;
}

/* Estilos do Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 15px 0;
  transition: all 0.3s ease;
}

.header.scrolled {
  padding: 10px 0;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--dark);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo svg {
  transition: transform 0.3s ease;
}

.logo:hover svg {
  transform: rotate(15deg);
}

.gold {
  color: var(--accent);
}

.nav {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-cta {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(37, 99, 235, 0.2);
}

.nav-cta:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(37, 99, 235, 0.3);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--dark);
}

/* Hero Section */
.hero {
  position: relative;
  padding: 120px 0 80px;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(248, 250, 252, 0.9) 0%,
    rgba(248, 250, 252, 0.7) 100%
  );
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-image {
  flex: 1;
  position: relative;
  min-height: 500px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(245, 158, 11, 0.1);
  color: var(--accent);
  padding: 8px 16px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 20px;
  color: var(--dark);
}

.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--dark);
  margin-bottom: 30px;
}

.hero-subtitle strong {
  color: var(--primary);
}

.countdown {
  margin-bottom: 30px;
}

.countdown p {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.countdown-timer {
  display: flex;
  gap: 15px;
}

.countdown-item {
  background-color: var(--white);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-width: 70px;
}

.countdown-item span {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  display: block;
}

.countdown-item small {
  font-size: 12px;
  color: var(--gray);
  text-transform: uppercase;
}

.cta-card {
  background-color: var(--white);
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.price-tag {
  margin-bottom: 20px;
}

.original-price {
  display: block;
  text-decoration: line-through;
  color: var(--gray);
  font-size: 1rem;
}

.current-price {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  margin: 5px 0;
}

.payment-option {
  display: block;
  font-size: 1rem;
  color: var(--gray);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  background: linear-gradient(90deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover svg {
  transform: translateX(5px);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.benefit-item svg {
  flex-shrink: 0;
}

.security-badges {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.security-badges img {
  height: 40px;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.security-badges img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

.instructor-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.instructor-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.instructor-badge {
  padding: 15px;
  text-align: center;
}

.instructor-badge span {
  display: block;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 5px;
}

.instructor-badge small {
  color: var(--gray);
  font-size: 14px;
}

.course-mockup {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 350px;
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.platform-img {
  width: 100%;
  height: auto;
  display: block;
}

.floating-certificate {
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 150px;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: rotate(15deg);
  z-index: 3;
  transition: all 0.3s ease;
}

.floating-certificate:hover {
  transform: rotate(0deg) scale(1.1);
}

.floating {
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Partners Section */
.partners-section {
  padding: 40px 0;
  background-color: var(--white);
}

.section-subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.partners-slider {
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  gap: 40px;
  animation: scroll 30s linear infinite;
  width: calc(150px * 16);
}

.slider-track img {
  height: 60px;
  width: auto;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;
}

.slider-track img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-150px * 8));
  }
}

/* About Section */
.about-section {
  background-color: var(--white);
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  border-radius: 2px;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.about-video {
  flex: 1;
}

.about-text {
  flex: 1;
}

.about-text h3 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--dark);
}

.about-text p {
  margin-bottom: 30px;
  color: var(--gray);
  line-height: 1.8;
}

.video-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.video-wrapper:hover {
  transform: scale(1.02);
}

.video-thumbnail {
  width: 100%;
  height: auto;
  display: block;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease;
}

.video-wrapper:hover .play-button {
  transform: translate(-50%, -50%) scale(1.1);
}

.feature-item {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.feature-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 50%;
}

.feature-text h4 {
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 5px;
}

.feature-text p {
  color: var(--gray);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Results Section */
.results-section {
  background: linear-gradient(135deg, var(--primary), var(--dark-blue));
  color: white;
  padding: 100px 0;
}

.results-section .section-title,
.results-section .section-subtitle {
  color: white;
}

.results-section .section-title::after {
  background: white;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.result-card {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-10px);
}

.result-number {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: white;
}

.result-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.results-gallery {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.gallery-item {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1/1;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  align-items: flex-end;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.overlay-content {
  padding: 20px;
  color: white;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.gallery-item:hover .overlay-content {
  transform: translateY(0);
}

.overlay-content p {
  margin-bottom: 15px;
  font-size: 0.9rem;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.testimonial-author strong {
  font-size: 0.9rem;
}

.rating {
  display: flex;
  gap: 2px;
}

.rating svg {
  width: 14px;
  height: 14px;
}

/* Modules Section */
.modules-tabs {
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.tabs-header {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.tabs-header button {
  flex: 1;
  padding: 20px;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tabs-header button::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.tabs-header button.active {
  color: var(--primary);
}

.tabs-header button.active::after {
  width: 100%;
}

.tabs-content {
  padding: 30px;
}

.tab-pane {
  display: none;
}

.tab-pane.active {
  display: block;
}

.module-header {
  margin-bottom: 30px;
}

.module-header h3 {
  font-size: 1.5rem;
  color: var(--dark);
  margin-bottom: 10px;
}

.module-header p {
  color: var(--gray);
  line-height: 1.8;
}

.module-lessons {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.lesson-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  background-color: rgba(248, 250, 252, 0.8);
  transition: all 0.3s ease;
}

.lesson-item:hover {
  background-color: var(--white);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transform: translateX(5px);
}

.lesson-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 50%;
}

.lesson-content h4 {
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 5px;
}

.lesson-content p {
  color: var(--gray);
  font-size: 0.9rem;
  line-height: 1.6;
}

/* Testimonials Section */
.testimonials-slider {
  position: relative;
}

.slider-container {
  display: flex;
  gap: 30px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding: 20px 0;
  margin: 0 -20px;
  scrollbar-width: none;
}

.slider-container::-webkit-scrollbar {
  display: none;
}

.testimonial-card {
  flex: 0 0 calc(50% - 15px);
  scroll-snap-align: start;
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.testimonial-video {
  position: relative;
  height: 200px;
  cursor: pointer;
}

.testimonial-video img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-content {
  padding: 25px;
}

.testimonial-text {
  margin-bottom: 20px;
  font-style: italic;
  color: var(--gray);
  line-height: 1.8;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  color: var(--dark);
  font-size: 1rem;
}

.author-info span {
  color: var(--gray);
  font-size: 0.8rem;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--white);
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: all 0.3s ease;
}

.slider-nav:hover {
  background-color: var(--primary);
  color: white;
}

.slider-nav.prev {
  left: -20px;
}

.slider-nav.next {
  right: -20px;
}

/* Bonus Section */
.bonus-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.bonus-card {
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.bonus-card:hover {
  transform: translateY(-10px);
}

.bonus-header {
  padding: 25px;
  background: linear-gradient(135deg, var(--primary), var(--dark-blue));
  color: white;
  position: relative;
}

.bonus-number {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0.7;
}

.bonus-header h3 {
  font-size: 1.3rem;
  margin-bottom: 5px;
}

.bonus-value {
  font-size: 0.9rem;
  opacity: 0.8;
}

.bonus-content {
  padding: 25px;
}

.bonus-content img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.bonus-content p {
  color: var(--gray);
  margin-bottom: 20px;
  line-height: 1.8;
}

.bonus-content ul {
  list-style-type: none;
}

.bonus-content li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  color: var(--dark);
}

.bonus-content li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  width: 12px;
  height: 12px;
  background-color: var(--primary);
  border-radius: 50%;
}

/* Guarantee Section */
.guarantee-section {
  background-color: #f0fdf4;
  padding: 100px 0;
}

.guarantee-card {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 16px;
  padding: 60px;
  text-align: center;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.guarantee-badge {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.guarantee-card h2 {
  font-size: 1.8rem;
  color: var(--dark);
  margin-bottom: 20px;
}

.guarantee-card p {
  color: var(--gray);
  margin-bottom: 15px;
  line-height: 1.8;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.guarantee-card p strong {
  color: var(--dark);
}

/* FAQ Section */
.faq-accordion {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 15px;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--white);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.faq-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-question:hover {
  background-color: #f8fafc;
}

.faq-question h3 {
  font-size: 1.1rem;
  color: var(--dark);
}

.faq-question svg {
  transition: transform 0.3s ease;
}

.faq-item.active .faq-question svg {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.active .faq-answer {
  max-height: 500px;
}

.faq-answer p {
  padding: 0 20px 20px;
  color: var(--gray);
  line-height: 1.8;
}

/* Final CTA Section */
.final-cta {
  background: linear-gradient(135deg, var(--primary), var(--dark-blue));
  color: white;
  padding: 100px 0;
  text-align: center;
}

.final-cta .section-title,
.final-cta .section-subtitle {
  color: white;
}

.final-cta .section-title::after {
  background: white;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-card {
  background-color: var(--white);
  border-radius: 16px;
  padding: 40px;
  margin-top: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.payment-methods {
  margin-top: 20px;
}

.payment-methods img {
  height: 30px;
  margin-bottom: 10px;
}

.payment-methods p {
  color: var(--gray);
  font-size: 0.9rem;
}

.guarantee-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: rgba(16, 185, 129, 0.1);
  border-radius: 50px;
  color: var(--secondary);
  font-weight: 600;
}

/* Footer */
.footer {
  background-color: var(--dark);
  color: white;
  padding: 80px 0 0;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.footer-brand {
  margin-bottom: 30px;
}

.footer-brand .logo {
  color: white;
  margin-bottom: 20px;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 20px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.social-links a:hover {
  background-color: var(--primary);
  transform: translateY(-3px);
}

.footer-links h4,
.footer-contact h4 {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: white;
}

.footer-links ul {
  list-style-type: none;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: white;
}

.footer-contact ul {
  list-style-type: none;
}

.footer-contact li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
}

.footer-contact svg {
  flex-shrink: 0;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
}

.footer-legal {
  display: flex;
  gap: 20px;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: white;
}

/* Video Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.video-modal.active {
  opacity: 1;
  pointer-events: all;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 900px;
  background-color: var(--white);
  border-radius: 16px;
  overflow: hidden;
  z-index: 1;
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.video-modal.active .modal-content {
  transform: scale(1);
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background-color: var(--primary);
}

.video-container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* WhatsApp Float */
.whatsapp-float {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(37, 211, 102, 0.3);
  z-index: 999;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

.whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
}

/* Animations */
.animate__animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

.animate__fadeIn {
  animation-name: fadeIn;
}

.animate__fadeInUp {
  animation-name: fadeInUp;
}

.animate__zoomIn {
  animation-name: zoomIn;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0);
  }
}

/* Glassmorphism Effect */
.glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero .container {
    flex-direction: column;
  }

  .hero-content {
    max-width: 100%;
    text-align: center;
    margin-bottom: 40px;
  }

  .hero-image {
    min-height: auto;
    width: 100%;
  }

  .instructor-card,
  .course-mockup {
    position: relative;
    width: 100%;
    margin-bottom: 20px;
  }

  .floating-certificate {
    display: none;
  }

  .about-content {
    flex-direction: column;
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-gallery {
    grid-template-columns: repeat(2, 1fr);
  }

  .bonus-grid {
    grid-template-columns: 1fr;
  }

  .footer-main {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .nav {
    display: none;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: var(--white);
    flex-direction: column;
    padding: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .nav.active {
    display: flex;
  }

  .mobile-menu-btn {
    display: block;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .testimonial-card {
    flex: 0 0 85%;
  }

  .modules-tabs {
    overflow-x: auto;
  }

  .tabs-header {
    width: max-content;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .countdown-timer {
    justify-content: center;
  }

  .countdown-item {
    min-width: 60px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .guarantee-card {
    padding: 40px 20px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .footer-legal {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
