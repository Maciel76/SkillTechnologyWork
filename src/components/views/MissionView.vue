<template>
  <div>
    <!-- Adicionando Font Awesome via CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <main>
      <section class="institutional-hero">
        <h1>Nossa <span class="highlight">Missão</span></h1>
        <p>
          Transformando ideias em realidade digital, impulsionando o sucesso dos
          nossos clientes através da inovação e excelência.
        </p>
      </section>

      <div class="institutional-content">
        <!-- Mission Statement Section -->
        <section class="content-section">
          <div class="mission-statement">
            <div class="statement-card animate-card">
              <div class="statement-icon mission">
                <i class="fas fa-rocket"></i>
              </div>
              <h2>Missão</h2>
              <p>
                Desenvolver soluções tecnológicas inovadoras que transformam
                negócios e melhoram a vida das pessoas.
              </p>
            </div>
            <div class="statement-card animate-card">
              <div class="statement-icon vision">
                <i class="fas fa-eye"></i>
              </div>
              <h2>Visão</h2>
              <p>
                Ser referência global em transformação digital, reconhecida pela
                excelência e inovação em nossas soluções.
              </p>
            </div>
            <div class="statement-card animate-card">
              <div class="statement-icon values">
                <i class="fas fa-gem"></i>
              </div>
              <h2>Valores</h2>
              <ul>
                <li>Inovação constante</li>
                <li>Excelência em tudo que fazemos</li>
                <li>Compromisso com resultados</li>
                <li>Ética e transparência</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Core Values Section -->
        <section class="content-section">
          <h2>Nossos Valores em Ação</h2>
          <div class="values-grid">
            <div class="value-card animate-card">
              <i class="fas fa-lightbulb value-icon"></i>
              <h3>Inovação</h3>
              <p>
                Buscamos constantemente novas soluções e tecnologias para
                oferecer o melhor aos nossos clientes.
              </p>
              <div class="value-quote">
                <p>
                  "A inovação está no DNA da nossa empresa. Cada projeto é uma
                  oportunidade de criar algo extraordinário."
                </p>
              </div>
            </div>
            <div class="value-card animate-card">
              <i class="fas fa-star value-icon"></i>
              <h3>Excelência</h3>
              <p>
                Comprometimento com a qualidade em cada projeto que
                desenvolvemos.
              </p>
              <div class="value-quote">
                <p>
                  "Buscamos a excelência em cada detalhe, garantindo resultados
                  excepcionais para nossos clientes."
                </p>
              </div>
            </div>
            <div class="value-card animate-card">
              <i class="fas fa-users value-icon"></i>
              <h3>Colaboração</h3>
              <p>
                Trabalhamos em parceria com nossos clientes para alcançar
                resultados extraordinários.
              </p>
              <div class="value-quote">
                <p>
                  "O sucesso dos nossos clientes é o nosso sucesso. Construímos
                  parcerias duradouras baseadas em confiança."
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Impact Section -->
        <section class="content-section impact-section">
          <h2>Nosso Impacto</h2>
          <div class="impact-grid">
            <div class="impact-stat animate-card" v-animate-counter>
              <div class="stat-number">150+</div>
              <div class="stat-label">Projetos Entregues</div>
            </div>
            <div class="impact-stat animate-card" v-animate-counter>
              <div class="stat-number">200+</div>
              <div class="stat-label">Empresas Transformadas</div>
            </div>
            <div class="impact-stat animate-card" v-animate-counter>
              <div class="stat-number">5+</div>
              <div class="stat-label">Países Alcançados</div>
            </div>
          </div>
        </section>

        <!-- CTA Section  -->
        <section class="content-section cta-section">
          <h2>Vamos transformar seu projeto em realidade!</h2>
          <p>
            Entre em contato conosco e descubra como podemos ajudar sua empresa
            a alcançar novos patamares.
          </p>
          <router-link to="/contato" class="cta-button"
            >Fale Conosco</router-link
          >
        </section>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "MissaoView",
  components: {},
  directives: {
    "animate-counter": {
      mounted(el) {
        const statNumberEl = el.querySelector(".stat-number");
        if (!statNumberEl) return;

        const targetText = statNumberEl.textContent || "0";
        const targetNumber = parseInt(targetText.replace("+", ""), 10);
        const suffix = targetText.includes("+") ? "+" : "";

        const animate = () => {
          const duration = 2000; // 2 segundos
          let startTimestamp = null;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
              (timestamp - startTimestamp) / duration,
              1
            );
            const currentValue = Math.floor(progress * targetNumber);
            statNumberEl.textContent = currentValue + suffix;
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animate();
                observer.unobserve(el); // Anima apenas uma vez
              }
            });
          },
          { threshold: 0.5 } // Inicia quando 50% do elemento está visível
        );
        observer.observe(el);
      },
    },
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-card").forEach((card, index) => {
      card.style.transitionDelay = `${index * 100}ms`;
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
.institutional-hero {
  color: rgb(44, 44, 44);
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.institutional-hero::before {
  content: "";
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

.highlight {
  color: #3c23c9;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(89, 20, 209, 0.2);
  z-index: 0;
  border-radius: 4px;
  transform: skewX(-15deg);
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

.animate-card {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.content-section h2 {
  font-size: 2rem;
  color: #2064bd;
  margin-bottom: 2rem;
  text-align: center;
}

.mission-statement {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.statement-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.statement-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.8rem;
  color: white;
}

.statement-icon.mission {
  background: #3b82f6; /* Blue */
}

.statement-icon.vision {
  background: #8b5cf6; /* Purple */
}

.statement-icon.values {
  background: #10b981; /* Green */
}

.animate-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.statement-card h2 {
  color: #2064bd;
  margin-bottom: 1rem;
}

.statement-card ul {
  list-style: none;
  padding: 0;
  text-align: left;
}

.statement-card ul li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.statement-card ul li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: #2064bd;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.value-icon {
  font-size: 2.5rem;
  color: #2064bd;
  margin-bottom: 1rem;
}

.value-card img {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
}

.value-quote {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
  font-style: italic;
}

.value-quote p {
  color: #666;
  margin-bottom: 0.5rem;
}

.value-quote span {
  color: #2064bd;
  font-weight: bold;
  font-size: 0.9rem;
}

.impact-section {
  background: #f8f9fa;
  padding: 4rem;
  border-radius: 10px;
  text-align: center;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.impact-stat {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cta-section {
  text-align: center;
  background: #2064bd;
  color: white;
  padding: 4rem;
  border-radius: 10px;
  margin-top: 4rem;
}

.cta-section h2 {
  color: white;
}

.cta-button {
  display: inline-block;
  background: white;
  color: #2064bd;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 2rem;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #f0f0f0;
}

@media (max-width: 768px) {
  .mission-statement,
  .values-grid {
    grid-template-columns: 1fr;
  }

  .impact-section,
  .cta-section {
    padding: 2rem;
  }
}
</style>
