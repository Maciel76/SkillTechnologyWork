<template>
  <div>
    <main>
      <!-- Hero Section -->
      <section class="institutional-hero">
        <h1>Sobre <span class="highlight">Nós</span></h1>
        <p>
          Na Skill Technology, transformamos ideias em realidades digitais desde
          2014.
        </p>
      </section>

      <!-- Main Content -->
      <div class="institutional-content">
        <!-- Company Introduction -->
        <section class="content-section animate-on-scroll">
          <div class="company-intro">
            <div class="intro-text">
              <h2>O que nos torna únicos</h2>
              <p>
                Nascemos com o propósito de ajudar empresas a se destacarem no
                ambiente online por meio de soluções sob medida: sites, lojas
                virtuais, sistemas corporativos e integrações de ponta. Ao longo
                dessa jornada, superamos desafios técnicos e estratégicos,
                sempre com foco em resultados mensuráveis e na satisfação dos
                nossos clientes.
              </p>
              <router-link to="/contato" class="cta-button"
                >Fale Conosco</router-link
              >
            </div>
            <div class="intro-image">
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Skill Technology Office"
              />
            </div>
          </div>
        </section>

        <!-- Timeline Section -->
        <section class="content-section animate-on-scroll">
          <h2>Nossa História</h2>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Experiência comprovada</h3>
                <p>
                  Mais de 150 projetos entregues para os mais diversos setores,
                  de startups a grandes organizações.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Equipe multidisciplinar:</h3>
                <p>
                  Desenvolvedores, designers e analistas dedicados que aprendem
                  seu negócio antes de escrever a primeira linha de código.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Inovação contínua:</h3>
                <p>
                  Adotamos as tecnologias mais modernas para garantir
                  performance, segurança e escalabilidade.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Metodologia ágil</h3>
                <p>
                  Transparência em cada etapa, comunicação constante e entregas
                  incrementais que permitem ajustes rápidos e evitam surpresas.
                </p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-content">
                <h3>Nossa missão</h3>
                <p>
                  Capacitar empresas a crescerem de forma sustentável,
                  utilizando o digital como alavanca para eficiência, alcance
                  global e fidelização de clientes.
                </p>
                <router-link to="/missao">
                  <h4 style="color: #0041cc">saiba mais...</h4></router-link
                >
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

        <!-- Statistics Section
        <section class="content-section animate-on-scroll stats-section">
          <h2>Nossos Números</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">500+</div>
              <div class="stat-label">Projetos Entregues</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Profissionais</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">15+</div>
              <div class="stat-label">Prêmios</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">98%</div>
              <div class="stat-label">Clientes Satisfeitos</div>
            </div>
          </div>
        </section> -->
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
}
</style>
