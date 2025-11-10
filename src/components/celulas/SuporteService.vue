<template>
  <main>
    <section class="features-section">
      <div class="section-header">
        <h2>Uma Parceria para o <span class="highlight">Seu Sucesso</span></h2>
        <p class="section-subtitle">
          Da implementação à análise de resultados, estamos com você em cada
          etapa do projeto.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-cogs"></i>
          </div>
          <div class="feature-content">
            <h3>Implementação Completa</h3>
            <p>
              Desenvolvimento, configuração e integração dos sistemas de IA.
            </p>
            <ul>
              <li>
                <span class="check-icon">✓</span> Setup inicial do sistema
              </li>
              <li>
                <span class="check-icon">✓</span> Integração com suas
                ferramentas
              </li>
              <li><span class="check-icon">✓</span> Treinamento da equipe</li>
              <li>
                <span class="check-icon">✓</span> Documentação técnica completa
              </li>
            </ul>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-life-ring"></i>
          </div>
          <div class="feature-content">
            <h3>Suporte Contínuo</h3>
            <p>Atendimento pós-implantação para ajustes e melhorias.</p>
            <ul>
              <li><span class="check-icon">✓</span> Suporte técnico 24/7</li>
              <li><span class="check-icon">✓</span> Atualizações regulares</li>
              <li>
                <span class="check-icon">✓</span> Consultoria especializada
              </li>
              <li><span class="check-icon">✓</span> SLA de resposta rápida</li>
            </ul>
          </div>
        </div>

        <div class="feature-card">
          <div class="feature-icon">
            <i class="fas fa-chart-bar"></i>
          </div>
          <div class="feature-content">
            <h3>Relatórios Detalhados</h3>
            <p>Métricas de desempenho e análises para otimização.</p>
            <ul>
              <li><span class="check-icon">✓</span> Dashboard personalizado</li>
              <li><span class="check-icon">✓</span> Análise de performance</li>
              <li>
                <span class="check-icon">✓</span> Recomendações de melhoria
              </li>
              <li>
                <span class="check-icon">✓</span> Relatórios executivos mensais
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "FeaturesPage",
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Opcional: para a animação acontecer apenas uma vez
          }
        });
      },
      {
        threshold: 0.1, // A animação começa quando 10% do card está visível
      }
    );

    // Observa cada card
    this.$el.querySelectorAll(".feature-card").forEach((card) => {
      observer.observe(card);
    });
  },
};
</script>

<style scoped>
/* Estilos Base */
.features-section {
  padding: 6rem 5%;
  background: #f8fafc;
}

[data-theme="dark"] .features-section {
  background: #1e293b;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  display: block; /* Garante que o container se comporte como um bloco */
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 1rem;
}

[data-theme="dark"] .section-header h2 {
  color: #f8fafc;
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
  height: 8px;
  background: rgba(0, 82, 255, 0.2);
  z-index: 1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.section-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
}

[data-theme="dark"] .section-subtitle {
  color: #94a3b8;
}

/* Grid de Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
}

/* Cards */
.feature-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  /* Estado inicial para a animação */
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

/* Atraso escalonado para cada card */
.feature-card:nth-of-type(1) {
  transition-delay: 0.1s;
}
.feature-card:nth-of-type(2) {
  transition-delay: 0.2s;
}
.feature-card:nth-of-type(3) {
  transition-delay: 0.3s;
}

.feature-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

[data-theme="dark"] .feature-card {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(0, 82, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: rgba(0, 82, 255, 0.1); /* Cor padrão (azul) */
}

.feature-icon i {
  font-size: 32px;
  color: #0052ff; /* Cor padrão (azul) */
}

/* Cor para o segundo card (Suporte) */
.features-grid .feature-card:nth-of-type(2) .feature-icon {
  background: rgba(16, 185, 129, 0.1); /* Verde */
}

.features-grid .feature-card:nth-of-type(2) .feature-icon i {
  color: #10b981;
}

/* Cor para o terceiro card (Relatórios) */
.features-grid .feature-card:nth-of-type(3) .feature-icon {
  background: rgba(236, 72, 153, 0.1); /* Rosa */
}

.features-grid .feature-card:nth-of-type(3) .feature-icon i {
  color: #ec4899;
}

.feature-content h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
}

[data-theme="dark"] .feature-content h3 {
  color: #f8fafc;
}

.feature-content p {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

[data-theme="dark"] .feature-content p {
  color: #94a3b8;
}

.feature-content ul {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
}

.feature-content li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #475569;
  font-size: 0.95rem;
}

[data-theme="dark"] .feature-content li {
  color: #cbd5e1;
}

.check-icon {
  color: #10b981;
  font-weight: bold;
}

/* Responsividade */
@media (max-width: 1024px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .features-section {
    padding: 4rem 1.5rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .feature-card {
    text-align: center;
  }

  .feature-icon {
    margin-left: auto;
    margin-right: auto;
  }

  .extra-card {
    padding: 1.5rem;
  }

  .extra-card h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }
}
</style>
