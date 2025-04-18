<template>
    <div>
      <main>
        <!-- Hero Section with Summary Banner -->
        <section class="institutional-hero">
          <h1>Política de <span class="highlight">Privacidade</span></h1>
          <p>Saiba como protegemos e utilizamos seus dados pessoais.</p>
          <div class="privacy-summary">
            <img src="https://api.iconify.design/heroicons:shield-check.svg" alt="Proteção" />
            <p>Seus dados estão seguros conosco. Utilizamos criptografia de ponta a ponta e seguimos as melhores práticas de segurança.</p>
          </div>
        </section>
  
        <div class="institutional-content">
          <!-- Privacy Policy Sections -->
          <div class="privacy-container">
            <!-- Navigation Menu -->
            <nav class="privacy-nav">
              <ul>
                <li><a href="#coleta">Coleta de Dados</a></li>
                <li><a href="#uso">Uso das Informações</a></li>
                <li><a href="#cookies">Política de Cookies</a></li>
                <li><a href="#direitos">Seus Direitos</a></li>
                <li><a href="#seguranca">Segurança</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </nav>
  
            <!-- Content Sections -->
            <div class="privacy-content">
              <section id="coleta" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:document-text.svg" alt="Coleta" />
                  <h2>Coleta de Dados</h2>
                </div>
                <p>Coletamos informações para melhorar sua experiência:</p>
                <ul>
                  <li>Dados de cadastro (nome, email, telefone)</li>
                  <li>Informações de uso do site</li>
                  <li>Dados de dispositivo e navegador</li>
                  <li>Histórico de interações</li>
                </ul>
              </section>
  
              <section id="uso" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:cog.svg" alt="Uso" />
                  <h2>Uso das Informações</h2>
                </div>
                <p>Utilizamos seus dados para:</p>
                <ul>
                  <li>Personalizar sua experiência</li>
                  <li>Melhorar nossos serviços</li>
                  <li>Enviar atualizações relevantes</li>
                  <li>Garantir a segurança da sua conta</li>
                </ul>
              </section>
  
              <section id="cookies" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:cookie.svg" alt="Cookies" />
                  <h2>Política de Cookies</h2>
                </div>
                <p>Utilizamos cookies para melhorar sua experiência:</p>
                <ul>
                  <li>Cookies essenciais para funcionamento</li>
                  <li>Cookies de análise e desempenho</li>
                  <li>Cookies de preferências</li>
                  <li>Cookies de marketing (opcional)</li>
                </ul>
              </section>
  
              <section id="direitos" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:user-circle.svg" alt="Direitos" />
                  <h2>Seus Direitos</h2>
                </div>
                <p>Você tem direito a:</p>
                <ul>
                  <li>Acessar seus dados pessoais</li>
                  <li>Solicitar correções</li>
                  <li>Pedir exclusão de dados</li>
                  <li>Revogar consentimento</li>
                </ul>
              </section>
  
              <section id="seguranca" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:lock-closed.svg" alt="Segurança" />
                  <h2>Segurança</h2>
                </div>
                <p>Implementamos medidas de segurança:</p>
                <ul>
                  <li>Criptografia de dados</li>
                  <li>Proteção contra acesso não autorizado</li>
                  <li>Monitoramento constante</li>
                  <li>Backups regulares</li>
                </ul>
              </section>
  
              <section id="contato" class="content-section animate-on-scroll">
                <div class="section-header">
                  <img src="https://api.iconify.design/heroicons:chat.svg" alt="Contato" />
                  <h2>Contato</h2>
                </div>
                <p>Para questões sobre privacidade:</p>
                <div class="contact-info">
                  <p>Email: privacidade@skilltech.com</p>
                  <p>Telefone: (11) 1234-5678</p>
                  <router-link to="/contato" class="contact-button">Fale Conosco</router-link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'PoliticaView',
    components: {
    },
    mounted() {
      // Smooth scroll para navegação
      document.querySelectorAll('.privacy-nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        });
      });
  
      // Animação ao scroll
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
      });
    }
  };
  </script>
  
  <style scoped>
  /* Institutional Pages Shared Styles   */
  .institutional-hero {
    background: linear-gradient(135deg, #2064bd, #1a4f96);
    color: white;
    padding: 6rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .institutional-hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
  }
  
  .institutional-hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    position: relative;
  }
  
  .institutional-hero .highlight {
    color: #4CAF50;
  }
  
  .institutional-hero p {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  .institutional-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 1rem;
  }
  
  .content-section {
    margin-bottom: 4rem;
  }
  
  .content-section h2 {
    font-size: 2rem;
    color: #2064bd;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .privacy-summary {
    background: rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .privacy-summary img {
    width: 32px;
    height: 32px;
    filter: invert(1);
  }
  
  .privacy-container {
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 2rem;
  }
  
  .privacy-nav {
    position: sticky;
    top: 2rem;
    height: fit-content;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .privacy-nav ul {
    list-style: none;
    padding: 0;
  }
  
  .privacy-nav li {
    margin-bottom: 1rem;
  }
  
  .privacy-nav a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.9rem;
    display: block;
    padding: 0.5rem;
    border-radius: 5px;
  }
  
  .privacy-nav a:hover {
    color: #2064bd;
    background: #f8f9fa;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .section-header img {
    width: 32px;
    height: 32px;
    color: #2064bd;
  }
  
  .contact-info {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
  }
  
  .contact-button {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 2rem;
    background: #2064bd;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  
  .contact-button:hover {
    background: #1a4f96;
  }
  
  @media (max-width: 768px) {
    .privacy-container {
      grid-template-columns: 1fr;
    }
  
    .privacy-nav {
      position: relative;
      top: 0;
      margin-bottom: 2rem;
    }
  
    .privacy-summary {
      flex-direction: column;
      text-align: center;
    }
  }
  </style>