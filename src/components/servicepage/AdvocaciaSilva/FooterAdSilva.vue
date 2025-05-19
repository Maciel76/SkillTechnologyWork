<template>
  <footer class="premium-footer">
    <div class="footer-wave"></div>

    <div class="footer-container">
      <!-- Conteúdo Principal -->
      <div class="footer-main">
        <!-- Coluna Logo -->
        <div class="footer-column logo-column">
          <div class="footer-logo-3d" @click="scrollToTop">
            <div class="footer-logo-shape logo-part-1"></div>
            <div class="footer-logo-shape logo-part-2"></div>
            <span class="footer-logo-text">Silva & Associados</span>
          </div>
          <p class="footer-slogan">
            Excelência jurídica com tradição e inovação
          </p>

          <div class="footer-contact-info">
            <div class="contact-item">
              <div class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92V19.92C22 20.47 21.55 20.92 21 20.92H19C14.03 20.92 9.08 15.97 9.08 11V9C9.08 8.45 9.53 8 10.08 8H13.08C13.63 8 14.08 8.45 14.08 9V11C14.08 14.31 16.77 17 20.08 17H21C21.55 17 22 17.45 22 18V18.01Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M20.03 12C20.03 7.05 15.97 3 11 3H8C7.45 3 7 3.45 7 4V7C7 11.97 11.03 16 16 16H19C19.55 16 20 15.55 20 15V12.01Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span>(11) 1234-5678</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12C4 8.23 7.13 5 11 5H13C16.87 5 20 8.23 20 12C20 15.77 16.87 19 13 19H11C7.13 19 4 15.77 4 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 12H8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span>Seg-Sex: 9h-18h</span>
            </div>
            <div class="contact-item">
              <div class="contact-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 4L12 20"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <span>contato@silvaassociados.com.br</span>
            </div>
          </div>
        </div>

        <!-- Coluna Links -->
        <div class="footer-column links-column">
          <h3 class="footer-title">Navegação</h3>
          <ul class="footer-nav">
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link" class="footer-link">
                <span class="link-text">{{ item.text }}</span>
                <span class="link-arrow">
                  <svg
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
                </span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Coluna Contato -->
        <div class="footer-column contact-column">
          <h3 class="footer-title">Entre em Contato</h3>
          <form class="footer-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <input
                type="text"
                v-model="form.name"
                placeholder="Seu Nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="form.email"
                placeholder="Seu E-mail"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="form.message"
                placeholder="Sua Mensagem"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-button">
              <span>Enviar Mensagem</span>
              <div class="button-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 2L11 13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>

      <!-- Rodapé Inferior -->
      <div class="footer-bottom">
        <div class="social-links">
          <a
            v-for="(social, index) in socialLinks"
            :key="index"
            :href="social.link"
            class="social-icon"
            target="_blank"
            rel="noopener"
          >
            <img :src="social.icon" :alt="social.name" />
            <span class="tooltip">{{ social.name }}</span>
          </a>
        </div>

        <div class="copyright">
          <p>
            © {{ currentYear }} Advocacia Silva & Associados. Todos os direitos
            reservados.
          </p>
          <p>
            Desenvolvido por
            <a href="/" class="dev-link">Skill Technology</a> com
            <span class="heart">❤</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PremiumFooter",
  data() {
    return {
      currentYear: new Date().getFullYear(),
      form: {
        name: "",
        email: "",
        message: "",
      },
      navItems: [
        { text: "Início", link: "#inicio" },
        { text: "Serviços Jurídicos", link: "#servicos" },
        { text: "Publicações", link: "#publicacoes" },
        { text: "Sobre Nós", link: "#sobre" },
        { text: "Contato", link: "#contato" },
      ],
      socialLinks: [
        {
          name: "Facebook",
          icon: "https://api.iconify.design/logos:facebook.svg",
          link: "#",
        },
        {
          name: "LinkedIn",
          icon: "https://api.iconify.design/logos:linkedin-icon.svg",
          link: "#",
        },
        {
          name: "Instagram",
          icon: "https://api.iconify.design/logos:instagram-icon.svg",
          link: "#",
        },
        {
          name: "WhatsApp",
          icon: "https://api.iconify.design/logos:whatsapp-icon.svg",
          link: "#",
        },
      ],
    };
  },
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    handleSubmit() {
      // Simulação de envio do formulário
      console.log("Formulário enviado:", this.form);
      alert("Mensagem enviada com sucesso!");
      this.form = {
        name: "",
        email: "",
        message: "",
      };
    },
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
  --darker: #061020;
  --light: #f8f9fa;
  --lighter: #ffffff;
  --gray: #6c757d;
  --gray-light: #e9ecef;
}

.premium-footer {
  position: relative;
  background-color: #061020;
  color: var(--light);
  padding-top: 80px;
  margin-top: 80px;
}

.footer-wave {
  position: absolute;
  top: -80px;
  left: 0;
  width: 100%;
  height: 80px;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%230a192f' opacity='.25'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' fill='%230a192f' opacity='.5'/%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%230a192f'/%3E%3C/svg%3E");
  background-size: cover;
  background-repeat: no-repeat;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding-bottom: 60px;
}

.footer-column {
  padding: 20px;
}

/* Estilos da Coluna do Logo */
.logo-column {
  display: flex;
  flex-direction: column;
}

.footer-logo-3d {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  cursor: pointer;
}

.footer-logo-shape {
  width: 24px;
  height: 24px;
  position: relative;
}

.logo-part-1 {
  background: var(--secondary);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: translateY(0) rotate(0);
  margin-right: -8px;
  z-index: 2;
}

.logo-part-2 {
  background: var(--primary-light);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform: translateY(5px) rotate(10deg);
  z-index: 1;
}

.footer-logo-text {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 1.3rem;
  margin-left: 15px;
  color: var(--lighter);
}

.footer-slogan {
  opacity: 0.8;
  margin-bottom: 30px;
  line-height: 1.6;
}

.footer-contact-info {
  margin-top: auto;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.contact-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  margin-right: 15px;
}

.contact-icon svg {
  width: 18px;
  height: 18px;
  color: var(--secondary);
}

/* Estilos da Coluna de Links */
.footer-title {
  font-size: 1.3rem;
  margin-bottom: 25px;
  position: relative;
  padding-bottom: 10px;
  color: var(--lighter);
}

.footer-title:after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 2px;
  background: var(--secondary);
}

.footer-nav {
  list-style: none;
}

.footer-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: var(--lighter);
  padding-left: 5px;
}

.link-arrow {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateX(-5px);
  transition: all 0.3s ease;
}

.footer-link:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

.link-arrow svg {
  width: 100%;
  height: 100%;
  color: var(--secondary);
}

/* Estilos da Coluna de Contato */
.footer-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: var(--lighter);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--secondary);
  background: rgba(255, 255, 255, 0.1);
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--secondary);
  color: var(--dark);
  border: none;
  padding: 12px 25px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.submit-button:hover {
  background: var(--secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
}

.button-icon {
  width: 18px;
  height: 18px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-icon svg {
  width: 100%;
  height: 100%;
}

/* Estilos do Rodapé Inferior */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.social-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--primary-light);
  transform: translateY(-3px);
}

.social-icon img {
  width: 20px;
  height: 20px;
}

.tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--secondary);
  color: var(--dark);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tooltip:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: var(--secondary) transparent transparent;
}

.social-icon:hover .tooltip {
  opacity: 1;
  visibility: visible;
  top: -45px;
}

.copyright {
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
}

.copyright p {
  margin-bottom: 5px;
}

.dev-link {
  color: var(--secondary);
  text-decoration: none;
  transition: all 0.3s ease;
}

.dev-link:hover {
  text-decoration: underline;
}

.heart {
  color: #ff6b6b;
  display: inline-block;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-column {
    padding: 20px 0;
  }

  .footer-wave {
    top: -60px;
    height: 60px;
  }
}

@media (max-width: 480px) {
  .footer-wave {
    top: -40px;
    height: 40px;
  }

  .footer-bottom {
    flex-direction: column;
  }

  .social-links {
    margin-bottom: 20px;
  }
}
</style>
