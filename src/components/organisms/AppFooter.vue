<!-- src/components/Footer.vue -->
<template>
  <footer>
    <!-- Adicionando Font Awesome via CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <div class="footer-content">
      <div class="footer-brand">
        <router-link to="/" class="logo">
          <img src="@/assets/svg/icons/logo.svg" alt="Logo" class="logo-icon" />
          <span>Skill Technology Work</span>
        </router-link>
        <p>Transformamos ideias em soluções digitais inovadoras.</p>
        <RedesSocias />
        <!-- Usando o componente SigaNos importando as redes sociais -->
      </div>
      <div class="footer-links">
        <div class="footer-column">
          <h3>Navegação do site</h3>
          <ul>
            <li>
              <router-link to="/Planos/precos">Planos e preços</router-link>
            </li>
            <li><router-link to="/Services">Nossos Serviços</router-link></li>
            <li><router-link to="/loja">Nossa loja</router-link></li>
            <li><router-link to="/blog">Nosso Blog</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Sobre Nos</h3>
          <ul>
            <li><router-link to="/Sobre">Sobre Nos</router-link></li>
            <li>
              <router-link to="/Eventos">Eventos e Programação</router-link>
            </li>
            <li><router-link to="/Missao">Nossa missão</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Informação útil</h3>
          <ul>
            <li>
              <router-link to="/Privacidade"
                >Política de Privacidade</router-link
              >
            </li>
            <li><router-link to="/Termos">Termos de Uso</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Contato</h3>
          <ul>
            <li>
              <router-link to="/contato">Entre em contato</router-link>
            </li>
            <li class="contact-item">
              <i class="fab fa-whatsapp"></i>
              <a
                href="https://wa.me/5562982809010"
                target="_blank"
                rel="noopener"
                >+55 (62) 98280-9010</a
              >
            </li>
            <li class="contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:Contato@skilltchnologywork.com"
                >Contato@skilltchnologywork.com</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Skill Technology Work</p>
    </div>
  </footer>
</template>

<script>
import RedesSocias from "@/components/organisms/RedesSocias.vue";
export default {
  name: "AppFooter",
  components: {
    RedesSocias,
  },
};
</script>

<style scoped>
/* Footer  */
footer {
  background: var(--dark-bg);
  color: white;
  padding: 5rem 5% 2rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-brand {
  max-width: 300px;
  flex-shrink: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
  margin-bottom: 1rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.8);
  margin: 1rem 0 1.5rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}

.footer-column h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.footer-column ul {
  padding: 0;
  list-style: none;
}

.footer-column li {
  margin-bottom: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-item i {
  font-size: 1.2rem;
  width: 20px; /* Garante alinhamento */
}

.contact-item .fa-whatsapp {
  color: #25d366; /* Verde do WhatsApp */
}

.contact-item .fa-envelope {
  color: #3498db; /* Azul para o e-mail */
}

.footer-column a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: white;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

/* Responsividade */
@media (max-width: 1024px) {
  .footer-content {
    flex-direction: column;
    gap: 3rem;
  }

  .footer-links {
    justify-content: space-between;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .footer-links {
    flex-direction: column;
  }
}
</style>
