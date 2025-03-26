<template>
    <div>
      <main>
        <section class="institutional-hero">
            <h1>Nossa <span class="highlight">Missão</span></h1>
            <p>Transformando ideias em realidade digital, impulsionando o sucesso dos nossos clientes através da inovação e excelência.</p>
        </section>
  
        <div class="institutional-content">
            <!-- Mission Statement Section -->
            <section class="content-section animate-on-scroll">
                <div class="mission-statement">
                    <div class="statement-card">
                        <h2>Missão</h2>
                        <p>Desenvolver soluções tecnológicas inovadoras que transformam negócios e melhoram a vida das pessoas.</p>
                    </div>
                    <div class="statement-card">
                        <h2>Visão</h2>
                        <p>Ser referência global em transformação digital, reconhecida pela excelência e inovação em nossas soluções.</p>
                    </div>
                    <div class="statement-card">
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
            <section class="content-section animate-on-scroll">
                <h2>Nossos Valores em Ação</h2>
                <div class="values-grid">
                    <div class="value-card">
                        <img src="https://api.iconify.design/heroicons:light-bulb.svg" alt="Inovação" />
                        <h3>Inovação</h3>
                        <p>Buscamos constantemente novas soluções e tecnologias para oferecer o melhor aos nossos clientes.</p>
                        <div class="value-quote">
                            <p>"A inovação está no DNA da nossa empresa. Cada projeto é uma oportunidade de criar algo extraordinário."</p>
                            <span>- Ana Silva, CTO</span>
                        </div>
                    </div>
                    <div class="value-card">
                        <img src="https://api.iconify.design/heroicons:star.svg" alt="Excelência" />
                        <h3>Excelência</h3>
                        <p>Comprometimento com a qualidade em cada projeto que desenvolvemos.</p>
                        <div class="value-quote">
                            <p>"Buscamos a excelência em cada detalhe, garantindo resultados excepcionais para nossos clientes."</p>
                            <span>- Carlos Santos, Diretor de Projetos</span>
                        </div>
                    </div>
                    <div class="value-card">
                        <img src="https://api.iconify.design/heroicons:users.svg" alt="Colaboração" />
                        <h3>Colaboração</h3>
                        <p>Trabalhamos em parceria com nossos clientes para alcançar resultados extraordinários.</p>
                        <div class="value-quote">
                            <p>"O sucesso dos nossos clientes é o nosso sucesso. Construímos parcerias duradouras baseadas em confiança."</p>
                            <span>- Maciel Barbosa, CEO</span>
                        </div>
                    </div>
                </div>
            </section>
  
            <!-- Impact Section -->
            <section class="content-section animate-on-scroll impact-section">
                <h2>Nosso Impacto</h2>
                <div class="impact-grid">
                    <div class="impact-stat">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Projetos Entregues</div>
                    </div>
                    <div class="impact-stat">
                        <div class="stat-number">100+</div>
                        <div class="stat-label">Empresas Transformadas</div>
                    </div>
                    <div class="impact-stat">
                        <div class="stat-number">50+</div>
                        <div class="stat-label">Países Alcançados</div>
                    </div>
                </div>
            </section>
  
            <!-- CTA Section  -->
            <section class="content-section animate-on-scroll cta-section">
                <h2>Vamos transformar seu projeto em realidade!</h2>
                <p>Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar novos patamares.</p>
                <router-link to="/contato" class="cta-button">Fale Conosco</router-link>
            </section>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MissaoView',
    components: {
    },
    mounted() {
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
    content: '→';
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