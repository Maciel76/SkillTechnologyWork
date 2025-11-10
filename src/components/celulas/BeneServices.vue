<template>
  <section class="client-benefits">
    <div class="benefits-container">
      <div class="benefits-intro">
        <h2 class="benefits-heading">
          Soluções que geram <span class="highlight">resultados reais</span>
        </h2>
        <p class="benefits-subheading">
          Entregamos mais que tecnologia. Oferecemos vantagens competitivas que
          transformam o seu negócio.
        </p>
      </div>

      <div class="benefits-showcase">
        <div
          class="benefit-item"
          v-for="(benefit, index) in clientBenefits"
          :key="index"
          :style="{ '--benefit-color': benefit.color }"
        >
          <div class="benefit-visual">
            <div class="visual-circle"></div>
            <i :class="['benefit-icon', benefit.icon]" aria-hidden="true"></i>
          </div>
          <div class="benefit-content">
            <h3 class="benefit-title">{{ benefit.title }}</h3>
            <p class="benefit-description">{{ benefit.description }}</p>

            <div class="benefit-proof">
              <div
                class="proof-item"
                v-for="(proof, pIndex) in benefit.proofs"
                :key="pIndex"
              >
                <span class="proof-value">{{ proof.value }}</span>
                <span class="proof-label">{{ proof.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="benefits-guarantee">
        <div class="guarantee-card">
          <h3 class="guarantee-title">Garantia de Resultados</h3>
          <p class="guarantee-text">
            Nosso compromisso é com seu sucesso. Se não se nao estiver 100%
            satisfeito devolvemos seu investimento.
          </p>
          <router-link to="/contato" class="guarantee-button">
            Vamos conversar ?
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";

export default {
  name: "ClientBenefits",
  data() {
    return {
      clientBenefits: [
        {
          icon: "fas fa-money-bill-wave",
          title: "Redução de Custos e Ganhos Reais",
          description:
            "Elimine retrabalhos e reduza gastos com soluções inteligentes, planejadas para gerar retorno desde o primeiro dia.",
          color: "#10B981",
          proofs: [
            { value: "Até 98%", label: "Índice de satisfação" },
            { value: "-70%", label: "Redução nos custos de desenvolvimento" },
          ],
        },
        {
          icon: "fas fa-clock",
          title: "Entrega Rápida com Qualidade",
          description:
            "Projetos entregues em tempo recorde, com foco em performance e sem abrir mão do resultado final.",
          color: "#3B82F6",
          proofs: [
            { value: "10x", label: "Mais agilidade na entrega" },
            { value: "Semanas", label: "Economizadas por projeto" },
          ],
        },
        {
          icon: "fas fa-arrow-trend-up",
          title: "Escalabilidade e Crescimento",
          description:
            "Criamos sistemas e sites prontos para crescer com o seu negócio — do primeiro cliente ao grande volume.",
          color: "#EC4899",
          proofs: [
            { value: "+30%", label: "Aumento de conversões" },
            { value: "3x", label: "Mais capacidade de atendimento" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos Base */
.client-benefits {
  padding: 6rem 1rem;
  background: linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%);
}

[data-theme="dark"] .client-benefits {
  background: linear-gradient(to bottom, #0f172a 0%, #1e293b 100%);
}

.benefits-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Cabeçalho */
.benefits-intro {
  text-align: center;
  margin-bottom: 4rem;
}

.benefits-heading {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1e293b;
}

[data-theme="dark"] .benefits-heading {
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
  background: rgba(151, 11, 128, 0.2);
  z-index: 0;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.benefits-subheading {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
}

[data-theme="dark"] .benefits-subheading {
  color: #94a3b8;
}

/* Grid de Benefícios */
.benefits-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.benefit-item {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
}

[data-theme="dark"] .benefit-item {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

.benefit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.benefit-visual {
  position: relative;
  margin-bottom: 1.5rem;
  height: 80px;
}

.visual-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--benefit-color);
  opacity: 0.1;
  position: absolute;
  top: 10px;
}

.benefit-icon {
  font-size: 40px;
  position: relative;
  color: var(--benefit-color);
  width: 60px;
  height: 60px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.benefit-content {
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
}

.benefit-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1e293b;
}

[data-theme="dark"] .benefit-title {
  color: #f8fafc;
}

.benefit-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

[data-theme="dark"] .benefit-description {
  color: #94a3b8;
}

.benefit-proof {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.proof-item {
  display: flex;
  flex-direction: column;
}

.proof-value {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--benefit-color);
  margin-bottom: 0.25rem;
}

.proof-label {
  font-size: 0.9rem;
  color: #64748b;
}

[data-theme="dark"] .proof-label {
  color: #94a3b8;
}

/* Garantia */
.benefits-guarantee {
  text-align: center;
  padding-top: 3rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .benefits-guarantee {
  border-top-color: rgba(255, 255, 255, 0.05);
}

.guarantee-card {
  background: linear-gradient(135deg, #0052ff 0%, #3b82f6 100%);
  border-radius: 16px;
  padding: 2.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: white;
}

.guarantee-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.guarantee-text {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.guarantee-button {
  background: white;
  color: #0052ff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.guarantee-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Responsividade */
@media (max-width: 1024px) {
  .benefits-showcase {
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
    justify-items: center;
  }

  .benefit-item {
    text-align: center;
  }

  .benefit-visual {
    margin-left: auto;
    margin-right: auto;
    width: 60px; /* Garante que o container tenha a mesma largura do círculo */
  }
}

@media (max-width: 768px) {
  .client-benefits {
    padding: 4rem 1rem;
  }

  .benefits-intro {
    margin-bottom: 2rem;
  }

  .benefit-proof {
    grid-template-columns: 1fr;
  }

  .guarantee-card {
    padding: 1.5rem;
  }

  .guarantee-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .benefits-showcase {
    grid-template-columns: 1fr;
  }

  .benefits-heading {
    font-size: 1.8rem;
  }

  .benefits-subheading {
    font-size: 1rem;
  }
}
</style>
