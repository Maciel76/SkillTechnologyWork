<template>
  <div class="ebook-landing">
    <!-- Header Minimalista -->
    <header class="header">
      <div class="container">
        <div class="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 16 16"
            fill="#6366F1"
          >
            <path
              fill="currentColor"
              d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.74 3.74 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324l.004-5.073l-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574M8.755 4.75l-.004 7.322a3.75 3.75 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25"
            />
          </svg>
          <span>E-book MarketingPro</span>
        </div>
        <nav class="nav">
          <a href="#features" class="nav-link">Recursos</a>
          <a href="#testimonials" class="nav-link">Depoimentos</a>
          <a href="#pricing" class="nav-link">Preços</a>
          <button class="nav-cta pulse">Baixar Agora</button>
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
              stroke="#1F2937"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 6H21"
              stroke="#1F2937"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 18H21"
              stroke="#1F2937"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Hero Section Moderna -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="badge">LANÇAMENTO 2024</div>
          <h1 class="hero-title">
            <span class="gradient-text">Domine o Marketing Digital</span> com
            Estratégias Comprovadas
          </h1>
          <p class="hero-subtitle">
            O guia definitivo para criar campanhas que convertem em 2024 -
            baseado em dados reais de mais de 500 negócios
          </p>

          <div class="cta-card">
            <div class="price-tag">
              <span class="original-price">R$ 97,00</span>
              <span class="current-price">GRÁTIS</span>
            </div>

            <div class="download-form">
              <form @submit.prevent="submitForm" v-if="!formSubmitted">
                <div class="form-group floating">
                  <input type="text" v-model="form.name" id="name" required />
                  <label for="name">Seu nome completo</label>
                </div>
                <div class="form-group floating">
                  <input
                    type="email"
                    v-model="form.email"
                    id="email"
                    required
                  />
                  <label for="email">Seu melhor e-mail</label>
                </div>
                <button type="submit" class="submit-btn">
                  <span>Baixar E-book Agora</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 17H17"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M10 3V14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5 10L10 15L15 10"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <p class="privacy-text">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V4C12 2.34315 10.6569 1 9 1H7C5.34315 1 4 2.34315 4 4V6M12 6H4M12 6V14C12 15.1046 11.1046 16 10 16H6C4.89543 16 4 15.1046 4 14V6M8 10V10.01M5 6H11"
                      stroke="#6366F1"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  Seus dados estão seguros. Nunca compartilhamos suas
                  informações.
                </p>
              </form>

              <div class="success-message" v-else>
                <div class="success-icon">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
                      fill="#10B981"
                    />
                    <path
                      d="M16 24L22 30L32 20"
                      stroke="white"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <h3>E-book enviado com sucesso!</h3>
                <p>
                  Verifique sua caixa de entrada (e spam) para acessar o
                  material.
                </p>
                <button class="social-share" @click="shareOnTwitter">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.75 3.018c-.62.28-1.28.47-1.98.55.71-.43 1.26-1.11 1.52-1.92-.67.4-1.41.69-2.2.85-.63-.68-1.54-1.1-2.54-1.1-1.92 0-3.48 1.57-3.48 3.5 0 .27.03.54.08.8-2.89-.15-5.45-1.54-7.16-3.66-.3.52-.47 1.12-.47 1.77 0 1.21.62 2.28 1.56 2.91-.57-.02-1.11-.18-1.58-.44v.04c0 1.7 1.2 3.11 2.8 3.44-.3.08-.6.12-.92.12-.22 0-.44-.02-.65-.06.44 1.39 1.73 2.4 3.26 2.43-1.2.95-2.71 1.51-4.35 1.51-.28 0-.56-.02-.84-.05 1.54.99 3.37 1.57 5.34 1.57 6.41 0 9.91-5.32 9.91-9.93 0-.15 0-.3-.01-.45.68-.5 1.27-1.12 1.74-1.83z"
                      fill="currentColor"
                    />
                  </svg>
                  Compartilhar no Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-image">
          <div class="ebook-mockup">
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop"
              alt="E-book Marketing Digital"
              class="ebook-cover"
            />
            <div class="badge">
              <span>Grátis</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Social Proof -->
    <section class="social-proof">
      <div class="container">
        <p class="proof-text">Mais de 15.000 profissionais já baixaram</p>
        <div class="company-logos">
          <img
            src="https://api.iconify.design/devicon:google.svg"
            alt="Google"
          />
          <img
            src="https://api.iconify.design/logos:microsoft-icon.svg"
            alt="Microsoft"
          />
          <img
            src="https://api.iconify.design/lineicons:amazon.svg"
            alt="Amazon"
          />
          <img
            src="https://api.iconify.design/logos:spotify-icon.svg"
            alt="Spotify"
          />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="features" id="features">
      <div class="container">
        <h2 class="section-title">O Que Você Vai Aprender</h2>
        <p class="section-subtitle">
          Conteúdo exclusivo e prático para aplicar hoje mesmo
        </p>

        <div class="features-grid">
          <div class="feature-card">
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
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 9H9.01"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 9H15.01"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Popup Inteligente</h3>
            <p>
              Técnicas avançadas para aumentar conversões em até 300% com timing
              perfeito
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22 6L12 13L2 6"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Sequência de E-mails</h3>
            <p>
              Modelos prontos para nutrir seus leads automaticamente e aumentar
              vendas
            </p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                  stroke="#6366F1"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <h3>Social Proof</h3>
            <p>
              Como usar depoimentos reais para aumentar sua credibilidade e
              conversões
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials" id="testimonials">
      <div class="container">
        <h2 class="section-title">O Que Estão Dizendo</h2>
        <p class="section-subtitle">
          Depoimentos de quem já aplicou nossas estratégias
        </p>

        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="quote-icon">"</div>
              <p>
                O e-book mudou completamente nossa abordagem de captação. Em 3
                meses aumentamos nossos leads em 140% com as mesmas campanhas.
              </p>
            </div>
            <div class="testimonial-author">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Carlos Mendes"
                class="author-avatar"
              />
              <div class="author-info">
                <strong>Carlos Mendes</strong>
                <span>Diretor de Marketing</span>
              </div>
            </div>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-content">
              <div class="quote-icon">"</div>
              <p>
                Finalmente um material que entrega valor real! Apliquei as
                estratégias e em uma semana já tinha fechado 3 novos clientes.
              </p>
            </div>
            <div class="testimonial-author">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Ana Beatriz"
                class="author-avatar"
              />
              <div class="author-info">
                <strong>Ana Beatriz</strong>
                <span>Empreendedora</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2>Pronto para Transformar Seu Marketing?</h2>
        <p>Baixe agora mesmo nosso e-book gratuito e comece a ver resultados</p>
        <button class="cta-btn" @click="scrollToForm">
          Quero Meu E-book Grátis
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 17H17"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M10 3V14"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M5 10L10 15L15 10"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-about">
            <div class="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 16 16"
                fill="white"
              >
                <path
                  d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.74 3.74 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324l.004-5.073l-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574M8.755 4.75l-.004 7.322a3.75 3.75 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25"
                  fill="white"
                />
              </svg>

              <span class="footerColorlogo">E-book MarketingPro</span>
            </div>
            <p>
              Especialistas em marketing digital e geração de leads
              qualificados.
            </p>
          </div>
          <div class="footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#features">Recursos</a></li>
              <li><a href="#testimonials">Depoimentos</a></li>
              <li><a href="#">Política de Privacidade</a></li>
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
                    stroke="#6366F1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5 4.5L9 9.75L1.5 4.5"
                    stroke="#6366F1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                contato@marketingpro.com
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
                    stroke="#6366F1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.75 3H5.25C3.675 3 2.25 4.425 2.25 6V11.505C2.25 12.81 2.5275 14.085 3.03 15.24C3.1462 15.4934 3.3234 15.7182 3.5485 15.8896C3.7736 16.0609 4.0392 16.1729 4.32 16.215C6.06 16.44 12.255 16.455 13.905 16.215C14.185 16.175 14.45 16.065 14.675 15.895C14.9 15.725 15.08 15.5 15.195 15.24C15.705 14.085 15.975 12.81 15.975 11.505V6C15.75 4.425 14.325 3 12.75 3Z"
                    stroke="#6366F1"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                (11) 99999-9999
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 MarketingPro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "EbookLanding",
  data() {
    return {
      formSubmitted: false,
      form: {
        name: "",
        email: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Simulate form submission
      setTimeout(() => {
        this.formSubmitted = true;
        console.log("Form submitted:", this.form);
      }, 1000);
    },
    shareOnTwitter() {
      window.open(
        "https://twitter.com/intent/tweet?text=Acabei+de+baixar+um+e-book+incrível+sobre+marketing+digital!+Confira:&url=" +
          encodeURIComponent(window.location.href),
        "_blank"
      );
    },
    scrollToForm() {
      const form = document.querySelector(".download-form");
      form.scrollIntoView({ behavior: "smooth" });
    },
    toggleMobileMenu() {
      const nav = document.querySelector(".nav");
      nav.classList.toggle("active");
    },
  },
};
</script>

<style scoped>
/* Base Styles */
:root {
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --secondary: #10b981;
  --accent: #f59e0b;
  --dark: #1f2937;
  --gray: #6b7280;
  --light-gray: #f3f4f6;
  --white: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--dark);
  line-height: 1.6;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

h1,
h2,
h3,
h4 {
  font-weight: 700;
  line-height: 1.2;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

/* Header Styles */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--white);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 15px 0;
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
  font-size: 1.25rem;
  color: var(--dark);
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
  transition: color 0.3s ease;
  position: relative;
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
  color: var(--white);
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.nav-cta:hover {
  background-color: orange;
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

/* Hero Section */
.hero {
  padding: 150px 0 80px;
  background: linear-gradient(to bottom, #f9fafb, #eff6ff);
  position: relative;
  overflow: hidden;
}

.hero .container {
  display: flex;
  align-items: center;
  gap: 50px;
  position: relative;
  z-index: 1;
}

.hero-content {
  flex: 1;
}

.badge {
  display: inline-block;
  background-color: var(--accent);
  color: var(--dark);
  padding: 6px 12px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 20px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--gray);
  margin-bottom: 30px;
  max-width: 500px;
}

.cta-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  max-width: 500px;
}

.price-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.original-price {
  text-decoration: line-through;
  color: var(--gray);
}

.current-price {
  background-color: var(--secondary);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
}

.download-form {
  width: 100%;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group.floating input {
  padding: 16px 16px 10px 16px;
}

.form-group.floating label {
  position: absolute;
  top: 16px;
  left: 16px;
  color: var(--gray);
  transition: all 0.3s ease;
  pointer-events: none;
}

.form-group.floating input:focus + label,
.form-group.floating input:not(:placeholder-shown) + label {
  top: 6px;
  font-size: 0.75rem;
  color: var(--primary);
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--light-gray);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: var(--primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-btn {
  width: 100%;
  background-color: var(--primary);
  color: aliceblue;
  padding: 16px;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #dfc325;
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
}

.privacy-text {
  font-size: 0.875rem;
  color: var(--gray);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.success-message {
  text-align: center;
  padding: 20px;
}

.success-icon {
  margin-bottom: 20px;
}

.success-message h3 {
  margin-bottom: 10px;
  font-size: 1.25rem;
}

.success-message p {
  margin-bottom: 20px;
  color: var(--gray);
}

.social-share {
  background-color: var(--primary);
  color: var(--white);
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.3s ease;
}

.social-share:hover {
  background-color: var(--primary-dark);
}

.hero-image {
  flex: 1;
  position: relative;
}

.ebook-mockup {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  transform: perspective(1000px) rotateY(-10deg) rotateX(5deg);
  transition: transform 0.5s ease;
}

.ebook-mockup:hover {
  transform: perspective(1000px) rotateY(0) rotateX(0);
}

.ebook-cover {
  width: 100%;
  height: auto;
  display: block;
}

.ebook-mockup .badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: var(--accent);
  color: var(--dark);
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Social Proof */
.social-proof {
  padding: 60px 0;
  background-color: var(--white);
}

.proof-text {
  text-align: center;
  font-size: 1.125rem;
  color: var(--gray);
  margin-bottom: 30px;
}

.company-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 40px;
}

.company-logos img {
  height: 40px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.company-logos img:hover {
  opacity: 1;
}

/* Features */
.features {
  padding: 80px 0;
  background-color: #f9fafb;
}

.section-title {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 15px;
}

.section-subtitle {
  text-align: center;
  color: var(--gray);
  margin-bottom: 50px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(99, 102, 241, 0.1);
  margin-bottom: 20px;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 15px;
}

.feature-card p {
  color: var(--gray);
}

/* Testimonials */
.testimonials {
  padding: 80px 0;
  background-color: var(--white);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: var(--white);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.testimonial-content {
  position: relative;
  margin-bottom: 20px;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: 60px;
  color: var(--primary);
  opacity: 0.1;
  font-family: "Georgia", serif;
  line-height: 1;
}

.testimonial-content p {
  font-size: 1rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.author-info {
  flex: 1;
}

.author-info strong {
  display: block;
  margin-bottom: 5px;
}

.author-info span {
  font-size: 0.875rem;
  color: var(--gray);
}

/* CTA Section */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--primary-dark) 100%
  );
  color: var(--white);
  text-align: center;
}

.cta-section h2 {
  font-size: 2.25rem;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 1.125rem;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn {
  background-color: var(--white);
  color: var(--primary);
  padding: 16px 32px;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background-color: #f0f0ff;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

/* Footer */
.footer {
  background-color: var(--dark);
  color: aliceblue;
  padding: 60px 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-about {
  max-width: 300px;
}

.footer-about p {
  margin-bottom: 20px;
  opacity: 0.8;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 1.125rem;
  margin-bottom: 20px;
}

.footer-links ul {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: var(--white);
  opacity: 0.8;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.footer-links a:hover {
  opacity: 1;
}

.footer-contact ul {
  list-style: none;
}

.footer-contact li {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.8;
}

.footer-contact svg {
  flex-shrink: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.875rem;
  opacity: 0.7;
}
.footerColorlogo {
  color: aliceblue;
}

/* Animations */
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .hero .container {
    flex-direction: column;
  }

  .hero-content {
    text-align: center;
    margin-bottom: 50px;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }

  .cta-card {
    margin: 0 auto;
  }

  .hero-image {
    margin-top: 50px;
  }
}

@media (max-width: 768px) {
  .nav {
    display: none;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background-color: var(--white);
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .nav.active {
    display: flex;
  }

  .mobile-menu-btn {
    display: block;
  }

  .hero {
    padding-top: 120px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.875rem;
  }

  .cta-section h2 {
    font-size: 1.75rem;
  }

  .cta-section p {
    font-size: 1rem;
  }
}
</style>
