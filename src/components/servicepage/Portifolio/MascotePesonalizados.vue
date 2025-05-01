<template>
  <div class="mascot-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>
          Mascotes <span class="highlight">Inteligentes</span> para sua Marca
        </h1>
        <p class="subtitle">
          Personagens únicos gerados por IA de alto nível, prontos para
          conquistar seu público
        </p>
        <div class="cta-container">
          <button class="cta-button" @click="scrollToExamples">
            Ver Exemplos
          </button>
          <button class="secondary-button" @click="scrollToProcess">
            Como Funciona
          </button>
        </div>
      </div>
      <div class="hero-mascot">
        <img
          :src="mascoteSkill"
          alt="Mascote Inteligente"
          class="mascot-image"
          style="width: 100%; max-width: 500px; border-radius: 16px"
        />
      </div>
    </section>

    <!-- USP Section -->
    <section class="usp-section">
      <h2>Por que ter um mascote gerado por IA?</h2>
      <div class="usp-grid">
        <div class="usp-card">
          <div class="usp-icon">🤖</div>
          <h3>Tecnologia de Ponta</h3>
          <p>
            Utilizamos modelos de IA especializados em design de personagens com
            consistência absoluta
          </p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">⚡</div>
          <h3>Versatilidade Ilimitada</h3>
          <p>
            Seu mascote em qualquer pose, expressão ou situação que sua campanha
            precisar
          </p>
        </div>
        <div class="usp-card">
          <div class="usp-icon">🎨</div>
          <h3>Adaptação Perfeita</h3>
          <p>Integração perfeita em todos os materiais da sua marca</p>
        </div>
      </div>
    </section>

    <!-- AI Showcase -->
    <section class="ai-showcase">
      <div class="showcase-content">
        <h2>IA Generativa Especializada</h2>
        <p>
          Nossos modelos proprietários foram treinados especificamente para:
        </p>
        <ul class="ai-features">
          <li>Manter consistência em diferentes poses e ângulos</li>
          <li>Preservar características únicas da marca</li>
          <li>Gerar variações coerentes em segundos</li>
          <li>Criar expressões faciais e corporais naturais</li>
        </ul>
        <button class="cta-button">Quero meu Mascote IA</button>
      </div>
      <div class="showcase-visual">
        <div class="mascot-variations">
          <img
            v-for="(variation, index) in variations"
            :key="index"
            :src="variation"
            :alt="'Mascote variação ' + (index + 1)"
            class="mascot-variation"
          />
        </div>
      </div>
    </section>

    <!-- Examples Section -->
    <section class="examples-section" id="examples">
      <h2>O que você pode fazer com seu mascote IA</h2>
      <p class="section-description">
        Aplicações práticas para potencializar sua comunicação
      </p>

      <div class="examples-grid">
        <div class="example-card">
          <div
            class="example-image"
            style="
              background-image: url('https://source.unsplash.com/600x400/?brand,mascot,poster');
            "
          >
            <div class="example-overlay">
              <h3>Materiais Impressos</h3>
              <p>Flyers, cartazes, embalagens e muito mais</p>
            </div>
          </div>
        </div>
        <div class="example-card">
          <div
            class="example-image"
            style="
              background-image: url('https://source.unsplash.com/600x400/?digital,banner,ad');
            "
          >
            <div class="example-overlay">
              <h3>Banners Digitais</h3>
              <p>Anúncios, redes sociais e sites</p>
            </div>
          </div>
        </div>
        <div class="example-card">
          <div
            class="example-image"
            style="
              background-image: url('https://source.unsplash.com/600x400/?animation,character');
            "
          >
            <div class="example-overlay">
              <h3>Animações e Vídeos</h3>
              <p>Motion graphics e explicações animadas</p>
            </div>
          </div>
        </div>
        <div class="example-card">
          <div
            class="example-image"
            style="
              background-image: url('https://source.unsplash.com/600x400/?merchandise,products');
            "
          >
            <div class="example-overlay">
              <h3>Merchandising</h3>
              <p>Camisetas, canecas e produtos licenciados</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section" id="process">
      <h2>Nosso Processo de Criação</h2>
      <p class="section-description">
        Do conceito inicial ao mascote pronto para uso em todas as plataformas
      </p>

      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>Briefing Criativo</h3>
          <p>Definimos personalidade, traços e conexão com sua marca</p>
        </div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>Geração por IA</h3>
          <p>
            Criamos as primeiras versões usando nossos modelos proprietários
          </p>
        </div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>Refinamento Manual</h3>
          <p>Designers especializados ajustam detalhes e garantem qualidade</p>
        </div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h3>Produção de Variantes</h3>
          <p>Criamos todas as poses e expressões necessárias</p>
        </div>
        <div class="process-step">
          <div class="step-number">5</div>
          <h3>Entrega Completa</h3>
          <p>Você recebe pacote com todas as versões e formatos</p>
        </div>
      </div>
    </section>

    <!-- Packages Section -->
    <section class="packages-section">
      <h2>Pacotes Completos</h2>
      <p class="section-description">
        Soluções adaptáveis para diferentes necessidades
      </p>

      <div class="packages-grid">
        <div class="package-card">
          <h3>Básico</h3>
          <div class="price">R$ 1.900</div>
          <ul class="features">
            <li>1 mascote em 5 poses diferentes</li>
            <li>3 expressões faciais</li>
            <li>Arquivos PNG transparente</li>
            <li>2 revisões de conceito</li>
          </ul>
          <button class="package-button">Contratar</button>
        </div>

        <div class="package-card popular">
          <div class="popular-tag">MAIS PEDIDO</div>
          <h3>Completo</h3>
          <div class="price">R$ 3.500</div>
          <ul class="features">
            <li>1 mascote em 12 poses diferentes</li>
            <li>6 expressões faciais</li>
            <li>Arquivos vetoriais (AI, EPS)</li>
            <li>5 revisões ilimitadas</li>
            <li>2 variações de cor</li>
            <li>1 animação simples (GIF)</li>
          </ul>
          <button class="package-button">Contratar</button>
        </div>

        <div class="package-card">
          <h3>Enterprise</h3>
          <div class="price">R$ 6.900+</div>
          <ul class="features">
            <li>Mascote principal + 2 secundários</li>
            <li>Poses ilimitadas por 1 ano</li>
            <li>Expressões faciais ilimitadas</li>
            <li>Arquivos vetoriais e camadas PSD</li>
            <li>Revisões ilimitadas</li>
            <li>3 animações profissionais</li>
            <li>Manual de uso da marca</li>
          </ul>
          <button class="package-button">Contratar</button>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <h2>O que dizem nossos clientes</h2>
      <p class="section-description">
        Marcas que transformaram sua comunicação com nossos mascotes IA
      </p>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="client-info">
            <div
              class="client-avatar"
              style="
                background-image: url('https://source.unsplash.com/100x100/?portrait,business');
              "
            ></div>
            <div class="client-details">
              <h4>Carlos Mendes</h4>
              <p>CEO da EcoKids</p>
            </div>
          </div>
          <div class="testimonial-text">
            <p>
              "O mascote que criaram se tornou o rosto da nossa marca. As
              crianças adoram e o reconhecem em qualquer material que
              publicamos!"
            </p>
          </div>
          <div class="client-results">
            <div class="result">
              <span class="value">+65%</span>
              <span class="label">engajamento</span>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="client-info">
            <div
              class="client-avatar"
              style="
                background-image: url('https://source.unsplash.com/100x100/?portrait,woman');
              "
            ></div>
            <div class="client-details">
              <h4>Ana Souza</h4>
              <p>CMO da TechSolutions</p>
            </div>
          </div>
          <div class="testimonial-text">
            <p>
              "A capacidade de gerar variações consistentes em minutos
              revolucionou nossas campanhas. Podemos testar diferentes
              abordagens com o mesmo personagem."
            </p>
          </div>
          <div class="client-results">
            <div class="result">
              <span class="value">3x</span>
              <span class="label">mais rápido</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <h2>Pronto para dar vida à sua marca?</h2>
      <p>
        Solicite um orçamento personalizado e receba conceitos iniciais em 24h
      </p>
      <button class="cta-button">Criar meu Mascote IA</button>
    </section>
  </div>
</template>

<script>
import mascoteSkill from "@/assets/images/banners/mascoteSkill.png";
export default {
  name: "MascotPage",
  data() {
    return {
      mascoteSkill,
      variations: [
        "https://source.unsplash.com/300x300/?cartoon,character,1",
        "https://source.unsplash.com/300x300/?cartoon,character,2",
        "https://source.unsplash.com/300x300/?cartoon,character,3",
        "https://source.unsplash.com/300x300/?cartoon,character,4",
      ],
    };
  },
  methods: {
    scrollToExamples() {
      document
        .getElementById("examples")
        .scrollIntoView({ behavior: "smooth" });
    },
    scrollToProcess() {
      document.getElementById("process").scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.mascot-page {
  font-family: "Inter", sans-serif;
  color: #2d3748;
  line-height: 1.6;
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.hero-content {
  max-width: 600px;
}

.hero-section h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  font-weight: 800;
  line-height: 1.2;
}

.highlight {
  color: #8b5cf6;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: #4b5563;
}

.cta-container {
  display: flex;
  gap: 1rem;
}

.cta-button {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.cta-button:hover {
  background: #7c3aed;
  transform: translateY(-2px);
}

.secondary-button {
  background: white;
  color: #8b5cf6;
  border: 2px solid #8b5cf6;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.secondary-button:hover {
  background: #f5f3ff;
  transform: translateY(-2px);
}

.hero-mascot img {
  max-width: 100%;
  border-radius: 16px;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* USP Section */
.usp-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.usp-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.usp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.usp-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.usp-card:hover {
  transform: translateY(-5px);
}

.usp-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.usp-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.usp-card p {
  color: #4b5563;
}

/* AI Showcase Section */
.ai-showcase {
  display: flex;
  align-items: center;
  padding: 6rem 2rem;
  background: #f5f3ff;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}

.showcase-content {
  flex: 1;
}

.ai-showcase h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.ai-showcase p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #4b5563;
}

.ai-features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 3rem;
}

.ai-features li {
  margin-bottom: 1rem;
  padding-left: 2rem;
  position: relative;
  color: #4b5563;
  font-size: 1.1rem;
}

.ai-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #8b5cf6;
  font-weight: bold;
}

.showcase-visual {
  flex: 1;
}

.mascot-variations {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.mascot-variation {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.mascot-variation:hover {
  transform: scale(1.05);
}

/* Examples Section */
.examples-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.examples-section h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-description {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #4b5563;
  font-size: 1.1rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.example-card {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.example-image {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.example-overlay {
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

.example-overlay h3 {
  font-size: 1.5rem;
  margin: 0;
}

.example-overlay p {
  margin: 0.5rem 0 0;
  opacity: 0.9;
}

/* Process Section */
.process-section {
  padding: 6rem 2rem;
  background: white;
}

.process-steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;
}

.process-step {
  flex: 1;
  min-width: 200px;
  max-width: 220px;
  text-align: center;
  padding: 2rem 1.5rem;
  background: #f5f3ff;
  border-radius: 12px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #8b5cf6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
}

.process-step h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.process-step p {
  color: #4b5563;
  font-size: 0.95rem;
}

/* Packages Section */
.packages-section {
  padding: 6rem 2rem;
  background: #f5f3ff;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 3rem auto 0;
}

.package-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  position: relative;
}

.package-card.popular {
  border: 2px solid #8b5cf6;
  transform: scale(1.05);
}

.popular-tag {
  position: absolute;
  top: -12px;
  right: 20px;
  background: #8b5cf6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.package-card h3 {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #2d3748;
}

.price {
  font-size: 2.5rem;
  text-align: center;
  font-weight: 800;
  color: #8b5cf6;
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
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  color: #4b5563;
}

.features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #8b5cf6;
  font-weight: bold;
}

.package-button {
  width: 100%;
  padding: 1rem;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.package-button:hover {
  background: #7c3aed;
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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

.client-details h4 {
  margin: 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.client-details p {
  margin: 0.25rem 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.testimonial-text p {
  font-style: italic;
  color: #4b5563;
  line-height: 1.8;
}

.client-results {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.result {
  text-align: center;
  padding: 0.5rem 1rem;
  background: #f5f3ff;
  border-radius: 6px;
}

.value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #8b5cf6;
}

.label {
  font-size: 0.85rem;
  color: #6b7280;
}

/* CTA Section */
.cta-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  text-align: center;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 2.5rem;
  font-size: 1.25rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 3rem;
  }

  .cta-container {
    justify-content: center;
  }

  .ai-showcase {
    flex-direction: column;
  }

  .package-card.popular {
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

  .process-steps {
    flex-direction: column;
    align-items: center;
  }

  .process-step {
    max-width: 100%;
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }
}
</style>
