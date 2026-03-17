<template>
  <div>
    <main>
      <!-- Hero Section -->
      <section class="institutional-hero">
        <h1>Sobre a <span class="highlight">SkillTechnology</span></h1>
        <p>
          Transformamos ideias em soluções digitais completas e funcionais usando
          IA e as melhores ferramentas do mercado.
        </p>
      </section>

      <!-- Main Content -->
      <div class="institutional-content">
        <!-- Company Introduction -->
        <section class="content-section animate-on-scroll">
          <div class="company-intro">
            <div class="intro-text">
              <h2>Quem Somos</h2>
              <p>
                A SkillTechnology é uma agência de tecnologia focada em
                transformar ideias em soluções digitais completas e funcionais.
                Nascemos com a missão de democratizar o acesso à tecnologia de
                ponta, ajudando empresas de todos os portes a automatizar
                processos, desenvolver sistemas inteligentes e acelerar seu
                crescimento digital.
              </p>

              <h3 class="intro-subtitle">O Que Fazemos</h3>
              <p>
                Desenvolvemos qualquer tipo de sistema web, aplicativo mobile,
                loja virtual, automação de processos e integração com APIs.
                Utilizamos as inteligências artificiais mais avançadas do mercado
                como parceiras no desenvolvimento, o que nos permite entregar
                projetos com velocidade, qualidade e custo significativamente
                menores.
              </p>

              <h3 class="intro-subtitle">Por Que Somos Diferentes</h3>
              <p>
                Enquanto outras agências trabalham de forma tradicional, nós
                combinamos expertise humana com inteligência artificial de última
                geração. Isso significa que podemos pegar a sua ideia — seja um
                site simples, um sistema complexo ou uma automação — e
                transformá-la em realidade digital em tempo recorde. Não importa
                o tamanho ou a complexidade: se você sonha, nós construímos.
              </p>

              <h3 class="intro-subtitle">Nossa Promessa</h3>
              <p>
                Economizar seu tempo, seu dinheiro e entregar resultados reais.
                Cada projeto que assumimos é tratado como se fosse nosso próprio
                negócio, com dedicação total para garantir que funcione
                perfeitamente.
              </p>

              <router-link to="/contato" class="cta-button"
                >Fale Conosco</router-link
              >
            </div>
            <div class="intro-image">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop"
                alt="Equipe de tecnologia trabalhando"
              />
            </div>
          </div>
        </section>

        <!-- Timeline Section -->
        <section class="content-section animate-on-scroll">
          <h2>Por Que Nos Escolher</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Expertise Técnica</h3>
                <p>
                  Domínio completo de tecnologias modernas: Vue.js, Node.js,
                  React Native, MongoDB, AWS e mais.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>IA como Parceira</h3>
                <p>
                  Utilizamos inteligência artificial de ponta para acelerar cada
                  etapa do desenvolvimento.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Entrega Rápida</h3>
                <p>
                  Projetos entregues até 3x mais rápido que métodos
                  tradicionais, sem comprometer a qualidade.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Suporte Dedicado</h3>
                <p>
                  Acompanhamento contínuo, suporte técnico e manutenção
                  preventiva para seu projeto.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Resultados Comprovados</h3>
                <p>
                  Projetos reais entregues para clientes satisfeitos em diversas
                  áreas do mercado.
                </p>
                <router-link to="/Portfolio">
                  <h4 style="color: #0041cc">ver portfólio...</h4>
                </router-link>
              </div>
            </div>
          </div>
        </section>
        <!-- =====================================================
Assim que tiver as fotos e mais de 3 profissionais trabalhando na agencia liberar e edita essa area -->

        <!-- Team Section
        <section class="content-section animate-on-scroll">
          <h2>Nossa Equipe</h2>
          <div class="team-grid">
            <div class="team-member">
              <div class="member-image">
                <img
                  src="@/assets/images/avatars/user1.png"
                  alt="Maciel Barbosa"
                />
              </div>
              <h3>Maciel Barbosa</h3>
              <p class="member-role">CEO & Fundador</p>
              <div class="social-links">
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:linkedin.svg"
                    alt="LinkedIn"
                /></a>
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:github.svg"
                    alt="GitHub"
                /></a>
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:instagram.svg"
                    alt="Instagram"
                /></a>
              </div>
            </div>
            <div class="team-member">
              <div class="member-image">
                <img src="@/assets/images/avatars/user4.png" alt="Ana Silva" />
              </div>
              <h3>Ana Silva</h3>
              <p class="member-role">CTO</p>
              <div class="social-links">
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:linkedin.svg"
                    alt="LinkedIn"
                /></a>
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:github.svg"
                    alt="GitHub"
                /></a>
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:instagram.svg"
                    alt="Instagram"
                /></a>
              </div>
            </div>

            <div class="team-member">
              <div class="member-image">
                <img
                  src="@/assets/images/avatars/user5.png"
                  alt="Carlos Santos"
                />
              </div>
              <h3>Carlos Santos</h3>
              <p class="member-role">Diretor de Projetos</p>
              <div class="social-links">
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:linkedin.svg"
                    alt="LinkedIn"
                /></a>
                <a href="#" target="_blank"
                  ><img
                    src="https://api.iconify.design/mdi:instagram.svg"
                    alt="Instagram"
                /></a>
              </div>
            </div>
          </div>
        </section> -->

        <!-- Statistics Section -->
        <section class="content-section animate-on-scroll stats-section">
          <h2>Nossos Números</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">150+</div>
              <div class="stat-label">Projetos Entregues</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Taxa de Satisfação</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">200+</div>
              <div class="stat-label">Empresas Atendidas</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Suporte Disponível</div>
            </div>
          </div>
        </section>

        <!-- Technologies Section -->
        <section class="content-section animate-on-scroll tech-section">
          <h2>Tecnologias que Dominamos</h2>
          <p class="tech-subtitle">
            Combinamos as melhores ferramentas do mercado com inteligência
            artificial de última geração
          </p>
          <div class="tech-grid">
            <div class="tech-category">
              <h3>Frontend</h3>
              <div class="tech-items">
                <span class="tech-badge">Vue.js</span>
                <span class="tech-badge">React</span>
                <span class="tech-badge">TypeScript</span>
                <span class="tech-badge">Nuxt.js</span>
                <span class="tech-badge">HTML5 / CSS3</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>Backend</h3>
              <div class="tech-items">
                <span class="tech-badge">Node.js</span>
                <span class="tech-badge">Python</span>
                <span class="tech-badge">Express</span>
                <span class="tech-badge">REST APIs</span>
                <span class="tech-badge">WebSockets</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>Banco de Dados & Cloud</h3>
              <div class="tech-items">
                <span class="tech-badge">MongoDB</span>
                <span class="tech-badge">PostgreSQL</span>
                <span class="tech-badge">AWS</span>
                <span class="tech-badge">Firebase</span>
                <span class="tech-badge">Docker</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>Mobile</h3>
              <div class="tech-items">
                <span class="tech-badge">React Native</span>
                <span class="tech-badge">Flutter</span>
                <span class="tech-badge">iOS</span>
                <span class="tech-badge">Android</span>
              </div>
            </div>
            <div class="tech-category">
              <h3>Inteligência Artificial</h3>
              <div class="tech-items">
                <span class="tech-badge">GPT-4</span>
                <span class="tech-badge">Claude</span>
                <span class="tech-badge">Midjourney</span>
                <span class="tech-badge">GitHub Copilot</span>
                <span class="tech-badge">Automações IA</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <ContatoService />
    </main>
  </div>
</template>

<script>
import ContatoService from "../celulas/ContatoService.vue";
export default {
  name: "SobreView",
  components: { ContatoService },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((section) => {
      observer.observe(section);
    });
  },
};
</script>

<style scoped>
/* Hero Section */
.institutional-hero {
  text-align: center;
  padding: 6rem 5%;
  background: #f8f9fa; /* Substituído --inst-light-gray */
}

.institutional-hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.highlight {
  color: #0052ff;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 15px;
  background: rgba(199, 87, 180, 0.2);
  z-index: 0;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.institutional-hero p {
  color: #666666; /* Substituído --inst-gray */
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Main Content */
.institutional-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 5%;
}

.content-section {
  margin-bottom: 6rem;
}

.content-section h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1a1d1f; /* Substituído --inst-text */
  text-align: center;
}

/* Company Introduction */
.company-intro {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.intro-text {
  flex: 1;
}

.intro-text h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666666; /* Substituído --inst-gray */
  margin-bottom: 2rem;
}

.cta-button {
  padding: 12px 24px;
  background: #0052ff; /* Substituído --inst-primary */
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #0041cc; /* Cor hover para o botão */
}

.intro-image img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Substituído --inst-card-shadow */
}

/* Timeline Section */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #e5e7eb; /* Substituído --inst-secondary */
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
}

.timeline-item:nth-child(odd) {
  flex-direction: row-reverse;
  text-align: right;
}

.timeline-content {
  background: #f8f9fa; /* Substituído --inst-light-gray */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Substituído --inst-card-shadow */
  flex: 1;
}

.timeline-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #0052ff; /* Substituído --inst-primary */
}

.timeline-content h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1d1f; /* Substituído --inst-text */
}

.timeline-content p {
  font-size: 1rem;
  color: #666666; /* Substituído --inst-gray */
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.team-member {
  text-align: center;
  background: #f8f9fa; /* Substituído --inst-light-gray */
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Substituído --inst-card-shadow */
}

.member-image img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team-member h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #1a1d1f; /* Substituído --inst-text */
}

.member-role {
  font-size: 1rem;
  color: #666666; /* Substituído --inst-gray */
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.social-links img {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.social-links img:hover {
  transform: scale(1.1);
}

/* Statistics Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  background: #f8f9fa; /* Substituído --inst-light-gray */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Substituído --inst-card-shadow */
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #0052ff; /* Substituído --inst-primary */
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #666666; /* Substituído --inst-gray */
}

/* Responsive Design */
@media (max-width: 768px) {
  .company-intro {
    flex-direction: column;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-item {
    flex-direction: column;
    text-align: left;
  }

  .timeline-item:nth-child(odd) {
    flex-direction: column;
    text-align: left;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }

  .institutional-hero h1 {
    font-size: 2.2rem;
  }
}

/* Intro Subtitles */
.intro-subtitle {
  font-size: 1.3rem;
  color: #0052ff;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Technologies Section */
.tech-subtitle {
  text-align: center;
  color: #666666;
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.tech-category {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.tech-category h3 {
  font-size: 1.1rem;
  color: #0052ff;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(0, 82, 255, 0.15);
}

.tech-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  background: rgba(0, 82, 255, 0.08);
  color: #1a1d1f;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease;
}

.tech-badge:hover {
  background: rgba(0, 82, 255, 0.18);
  transform: translateY(-2px);
}

/* Dark Mode */
[data-theme="dark"] .institutional-hero {
  background: #1a1d1f;
}

[data-theme="dark"] .institutional-hero p {
  color: #adb5bd;
}

[data-theme="dark"] .content-section h2 {
  color: #f1f3f5;
}

[data-theme="dark"] .intro-text p {
  color: #adb5bd;
}

[data-theme="dark"] .intro-subtitle {
  color: #4d8fff;
}

[data-theme="dark"] .timeline-content {
  background: #2a2d30;
}

[data-theme="dark"] .timeline-content h3 {
  color: #4d8fff;
}

[data-theme="dark"] .timeline-content p {
  color: #adb5bd;
}

[data-theme="dark"] .timeline::before {
  background: #3a3d40;
}

[data-theme="dark"] .stat-item {
  background: #2a2d30;
}

[data-theme="dark"] .stat-number {
  color: #4d8fff;
}

[data-theme="dark"] .stat-label {
  color: #adb5bd;
}

[data-theme="dark"] .tech-category {
  background: #2a2d30;
}

[data-theme="dark"] .tech-category h3 {
  color: #4d8fff;
  border-bottom-color: rgba(77, 143, 255, 0.2);
}

[data-theme="dark"] .tech-badge {
  background: rgba(77, 143, 255, 0.12);
  color: #e1e3e5;
}

[data-theme="dark"] .tech-badge:hover {
  background: rgba(77, 143, 255, 0.25);
}

[data-theme="dark"] .tech-subtitle {
  color: #adb5bd;
}
</style>
