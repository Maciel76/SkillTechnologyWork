<!-- src/components/Footer.vue -->
<template>
    <footer>
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <img src="@/assets/svg/icons/logo.svg" alt="Logo" class="logo-icon">
            <span>Skill Technology Work</span>
          </div>
          <p>Transformamos ideias em soluções digitais inovadoras.</p>
           <RedesSocias /> <!-- Usando o componente SigaNos importando as redes sociais -->
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h3>Navegação do site</h3>
            <ul>
              <li><router-link to="#">Planos e preços</router-link></li>
              <li><router-link to="/Services">Nossos Serviços</router-link></li>
              <li><router-link to="#">Nossa loja</router-link></li>
              <li><router-link to="#">Nosso Blog</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Sobre Nos</h3>
            <ul>
              <li><router-link to="/Sobre">Sobre Nos</router-link></li>
              <li><router-link to="/Eventos">Eventos e Programação</router-link></li>
              <li><router-link to="/Missao">Nossa missão</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Informação útil</h3>
            <ul>
              <li><router-link to="/Privacidade">Política de Privacidade</router-link></li>
              <li><router-link to="/Termos">Termos de Uso</router-link></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contato</h3>
            <ul>
              <li><img src="@/assets/svg/icons/whatsapp.svg" class="whats" alt="Whatsapp"><a href="https://wa.me/5562982809010" target="_blank" rel="noopener">+55 (62) 98280-9010</a></li>
              <li><img src="@/assets/svg/icons/email.svg" class="whats" alt="Whatsapp"><a href="mailto:Contato@skilltchnologywork.com">Contato@skilltchnologywork.com</a></li>
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
  import RedesSocias from '@/components/organisms/RedesSocias.vue';
  export default {
    name: 'AppFooter',
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
  margin-bottom: 4rem;
}

.footer-brand {
  max-width: 300px;
}
/*imagem links de contato */
.whats{
  width: 30px;
  gap: 2px;
  position: absolute;
  margin-left: -30px;
}

.footer-brand p {
  color: rgba(255, 255, 255, 0.8);
  margin: 1.5rem 0;
}



.footer-links {
  display: flex;
  gap: 4rem;
}

.footer-column h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.footer-column ul {
  list-style: none;
}

.footer-column li {
  margin-bottom: 1rem;
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
  

  </style>