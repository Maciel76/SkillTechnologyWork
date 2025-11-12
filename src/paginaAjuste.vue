<template>
  <div class="institutional-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Sites <span class="highlight">Institucionais</span></h1>
        <p class="subtitle">
          Sua presença digital profissional que transmite credibilidade e atrai
          novos clientes
        </p>
        <button class="cta-button" @click="scrollToPortfolio">
          Ver Exemplos
        </button>
      </div>
    </section>

    <!-- Value Proposition -->
    <section class="value-section">
      <h2>Por que seu negócio precisa de um site institucional?</h2>
      <div class="value-grid">
        <div class="value-card">
          <div class="value-icon">🏢</div>
          <h3>Credibilidade</h3>
          <p>
            81% dos consumidores pesquisam online antes de comprar - um site
            profissional aumenta sua confiabilidade
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon">🌐</div>
          <h3>Visibilidade 24/7</h3>
          <p>
            Seu negócio aberto na internet o tempo todo, mesmo quando seu
            escritório está fechado
          </p>
        </div>
        <div class="value-card">
          <div class="value-icon">📈</div>
          <h3>Base de Clientes</h3>
          <p>Capture leads qualificados através de formulários estratégicos</p>
        </div>
      </div>
    </section>

    <!-- Portfolio Showcase -->
    <section class="portfolio-section" id="portfolio">
      <h2>Nossos Sites Institucionais</h2>
      <p class="section-description">
        Exemplos reais desenvolvidos para nossos clientes
      </p>

      <div class="portfolio-grid">
        <div
          class="portfolio-item"
          v-for="(project, index) in portfolio"
          :key="index"
        >
          <div
            class="portfolio-image"
            :style="{ backgroundImage: 'url(' + project.image + ')' }"
          >
            <div class="overlay">
              <h3>{{ project.client }}</h3>
              <p>{{ project.industry }}</p>
              <a :href="project.link" class="view-button" target="_blank"
                >Visitar Site</a
              >
            </div>
          </div>
          <div class="portfolio-info">
            <h4>{{ project.title }}</h4>
            <div class="features">
              <span
                v-for="(feature, fIndex) in project.features"
                :key="fIndex"
                >{{ feature }}</span
              >
            </div>
            <p class="description">{{ project.description }}</p>
            <div class="results">
              <div class="result-item">
                <span class="result-value">+{{ project.results.visits }}</span>
                <span class="result-label">visitas/mês</span>
              </div>
              <div class="result-item">
                <span class="result-value">+{{ project.results.leads }}</span>
                <span class="result-label">leads/mês</span>
              </div>
              <div class="result-item">
                <span class="result-value"
                  >{{ project.results.time }} dias</span
                >

                <span class="result-label">prazo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Standard Structure -->
    <section class="structure-section">
      <h2>Estrutura Completa para seu Site</h2>
      <p class="section-description">
        Todos os nossos sites institucionais incluem:
      </p>

      <div class="structure-grid">
        <div class="structure-card">
          <div class="structure-icon">🏠</div>
          <h3>Home Page Impactante</h3>
          <ul>
            <li>Headline clara</li>
            <li>Chamadas para ação</li>
            <li>Destaque de serviços</li>
            <li>Slider de imagens</li>
          </ul>
        </div>

        <div class="structure-card">
          <div class="structure-icon">📄</div>
          <h3>Sobre a Empresa</h3>
          <ul>
            <li>Nossa história</li>
            <li>Missão e valores</li>
            <li>Diferenciais</li>
            <li>Equipe</li>
          </ul>
        </div>

        <div class="structure-card">
          <div class="structure-icon">🛠️</div>
          <h3>Páginas de Serviços</h3>
          <ul>
            <li>Descrição detalhada</li>
            <li>Benefícios</li>
            <li>Processos</li>
            <li>Portfólio</li>
          </ul>
        </div>

        <div class="structure-card">
          <div class="structure-icon">📱</div>
          <h3>Contato Otimizado</h3>
          <ul>
            <li>Formulário inteligente</li>
            <li>Mapa de localização</li>
            <li>Redes sociais</li>
            <li>WhatsApp direto</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <h2>Investimento</h2>
      <p class="section-description">
        Soluções para diferentes necessidades e orçamentos
      </p>

      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Básico</h3>
          <div class="price">R$ 2.500</div>
          <ul class="features">
            <li>Até 5 páginas</li>
            <li>Design responsivo</li>
            <li>Formulário de contato</li>
            <li>SEO básico</li>
            <li>1 mês de suporte</li>
          </ul>
          <button class="price-button">Quero este</button>
        </div>

        <div class="pricing-card featured">
          <div class="popular-tag">MAIS POPULAR</div>
          <h3>Profissional</h3>
          <div class="price">R$ 4.500</div>
          <ul class="features">
            <li>Até 10 páginas</li>
            <li>Design personalizado</li>
            <li>Blog integrado</li>
            <li>SEO avançado</li>
            <li>Galeria de imagens</li>
            <li>3 meses de suporte</li>
          </ul>
          <button class="price-button">Quero este</button>
        </div>

        <div class="pricing-card">
          <h3>Premium</h3>
          <div class="price">R$ 7.500+</div>
          <ul class="features">
            <li>Páginas ilimitadas</li>
            <li>Design exclusivo</li>
            <li>Sistema de conteúdo</li>
            <li>Otimização máxima</li>
            <li>Integrações especiais</li>
            <li>6 meses de suporte</li>
          </ul>
          <button class="price-button">Quero este</button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Pronto para transformar sua presença online?</h2>
        <p>Solicite um orçamento personalizado para seu site institucional</p>
        <button class="cta-button">Solicitar Orçamento</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "InstitutionalPage",
  data() {
    return {
      portfolio: [
        {
          client: "Advocacia Silva & Associados",
          title: "Site profissional para escritório de advocacia",
          industry: "Direito",
          image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          link: "/demo/advocaciasilva",
          features: [
            "Design Premium",
            "Áreas de atuação",
            "Publicações",
            "Formulário seguro",
          ],
          description:
            "Site profissional com área de publicações jurídicas e formulário de contato criptografado para clientes.",
          results: {
            visits: 1200,
            leads: 45,
            time: 20,
          },
        },
        {
          client: "Clínica Vitalis",
          title: "Site institucional para clínica médica",
          industry: "Saúde",
          image:
            "https://images.unsplash.com/photo-1612375689547-b5351e63050b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "#",
          features: [
            "Agendamento online",
            "Corpo clínico",
            "Convênios",
            "Blog de saúde",
          ],
          description:
            "Plataforma com agendamento integrado, área de convênios e blog com artigos médicos.",
          results: {
            visits: 2500,
            leads: 80,
            time: 25,
          },
        },
        {
          client: "Construtora Alfa",
          title: "Site corporativo para construtora",
          industry: "Construção Civil",
          image:
            "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          link: "/demo/construtora-alpha",
          features: [
            "Portfólio de obras",
            "Lançamentos",
            "Trabalhe conosco",
            "Tour virtual",
          ],
          description:
            "Site com apresentação de empreendimentos, tour virtual 360° e sistema de currículos online.",
          results: {
            visits: 1800,
            leads: 60,
            time: 30,
          },
        },
        {
          client: "Instituto Educar",
          title: "Site institucional para escola",
          industry: "Educação",
          image:
            "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          link: "/demo/institutoeducar",
          features: [
            "Galeria de fotos",
            "Matrícula online",
            "Área do aluno",
            "Eventos",
          ],
          description:
            "Plataforma educacional com área restrita para alunos e pais, e sistema de matrículas digital.",
          results: {
            visits: 1500,
            leads: 50,
            time: 22,
          },
        },
      ],
    };
  },
  methods: {
    scrollToPortfolio() {
      document
        .getElementById("portfolio")
        .scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.institutional-page {
  font-family: "Inter", sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: cover;
  background-position: center;
  color: white;
  padding: 8rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
}

.highlight {
  color: #4299e1;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

.cta-button {
  background: #4299e1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.cta-button:hover {
  background: #3182ce;
  transform: translateY(-2px);
}

/* Value Section */
.value-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.value-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.value-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
}

.value-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.value-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.value-card p {
  color: #4a5568;
}

/* Portfolio Section */
.portfolio-section {
  padding: 6rem 2rem;
  background: #f7fafc;
}

.portfolio-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #4a5568;
  font-size: 1.1rem;
}

.portfolio-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.portfolio-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  color: white;
}

.overlay h3 {
  font-size: 1.75rem;
  margin: 0;
}

.overlay p {
  margin: 0.5rem 0 1.5rem;
  font-size: 1rem;
  opacity: 0.9;
}

.view-button {
  align-self: flex-start;
  background: #4299e1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.view-button:hover {
  background: #3182ce;
}

.portfolio-info {
  padding: 2rem;
}

.portfolio-info h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.features span {
  background: #edf2f7;
  color: #2d3748;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.description {
  color: #4a5568;
  margin-bottom: 2rem;
}

.results {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}

.result-item {
  text-align: center;
}

.result-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #4299e1;
}

.result-label {
  font-size: 0.9rem;
  color: #718096;
}

/* Structure Section */
.structure-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.structure-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.structure-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.structure-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.structure-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.structure-card ul {
  list-style-type: none;
  padding: 0;
}

.structure-card li {
  margin-bottom: 0.75rem;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.structure-card li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4299e1;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
  background: #f7fafc;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
}

.pricing-card.featured {
  border: 2px solid #4299e1;
  transform: scale(1.05);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #4299e1;
  margin-bottom: 1.5rem;
}

.price::before {
  content: "R$ ";
  font-size: 1.5rem;
}

.features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features li {
  margin-bottom: 0.75rem;
  color: #4a5568;
  position: relative;
  padding-left: 1.5rem;
}

.features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4299e1;
}

.price-button {
  width: 100%;
  padding: 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.price-button:hover {
  background: #3182ce;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  padding: 6rem 2rem;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-section p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .pricing-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-item {
    max-width: 100%;
  }

  .value-card,
  .structure-card,
  .pricing-card {
    padding: 1.5rem;
  }
}
</style>
