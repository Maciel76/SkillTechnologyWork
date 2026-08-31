<template>
  <section class="client-benefits">
    <div class="cb-glow cb-glow-1"></div>
    <div class="cb-glow cb-glow-2"></div>

    <div class="benefits-container">
      <div class="benefits-intro">
        <span class="cb-eyebrow">Por que a SkillTechnology</span>
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
          <span class="benefit-bar"></span>
          <div class="benefit-visual">
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
            "Nossos clientes economizam em média 40% nos custos operacionais ao automatizar processos manuais com nossas soluções inteligentes.",
          color: "#10B981",
          proofs: [
            { value: "Até 98%", label: "Índice de satisfação" },
            { value: "-40%", label: "Custos operacionais" },
          ],
        },
        {
          icon: "fas fa-clock",
          title: "Entrega até 3x Mais Rápida",
          description:
            "Entregamos projetos até 3x mais rápido usando IA como parceira no desenvolvimento. Cada semana economizada é dinheiro no seu bolso.",
          color: "#0099DD",
          proofs: [
            { value: "3x", label: "Mais rápido com IA" },
            { value: "Semanas", label: "Economizadas por projeto" },
          ],
        },
        {
          icon: "fas fa-arrow-trend-up",
          title: "Escalabilidade Garantida",
          description:
            "Sistemas construídos para crescer: do primeiro usuário a milhões. Arquitetura moderna que acompanha seu negócio.",
          color: "#8B5CF6",
          proofs: [
            { value: "+30%", label: "Aumento de conversões" },
            { value: "200+", label: "Projetos entregues" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.client-benefits {
  position: relative;
  padding: 6rem 1rem;
  overflow: hidden;
  background:
    radial-gradient(900px 500px at 90% -10%, rgba(0, 153, 221, 0.1), transparent 60%),
    radial-gradient(800px 460px at 0% 110%, rgba(139, 92, 246, 0.09), transparent 55%),
    linear-gradient(135deg, #f7f9fc 0%, #eef2f7 100%);
}

.cb-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
  pointer-events: none;
}
.cb-glow-1 { width: 320px; height: 320px; background: rgba(0, 153, 221, 0.22); top: -60px; right: 6%; }
.cb-glow-2 { width: 300px; height: 300px; background: rgba(139, 92, 246, 0.2); bottom: -80px; left: 4%; }

.benefits-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

/* Cabeçalho */
.benefits-intro {
  text-align: center;
  margin-bottom: 3.5rem;
}
.cb-eyebrow {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #0077b3;
  background: rgba(0, 153, 221, 0.08);
  border: 1px solid rgba(0, 153, 221, 0.2);
  padding: 6px 16px;
  border-radius: 50px;
  margin-bottom: 1.2rem;
}
.benefits-heading {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  color: #1a202c;
}
.highlight {
  position: relative;
  color: #0099dd;
  display: inline-block;
}
.highlight::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(0, 153, 221, 0.25), rgba(139, 92, 246, 0.22));
  z-index: -1;
}
.benefits-subheading {
  font-size: 1.2rem;
  color: #64748b;
  max-width: 640px;
  margin: 0 auto;
}

/* Grid */
.benefits-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.8rem;
}

.benefit-item {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  padding: 2.2rem 2rem;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;
}
.benefit-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 22px 44px rgba(15, 23, 42, 0.12);
}
.benefit-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: var(--benefit-color);
}

.benefit-visual {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.4rem;
  background: color-mix(in srgb, var(--benefit-color) 12%, white);
}
.benefit-icon {
  font-size: 28px;
  color: var(--benefit-color);
}

.benefit-title {
  font-size: 1.35rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: #1a202c;
}
.benefit-description {
  color: #64748b;
  margin-bottom: 1.6rem;
  flex-grow: 1;
  line-height: 1.6;
}

.benefit-proof {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding-top: 1.2rem;
  border-top: 1px solid #eef2f7;
}
.proof-item { display: flex; flex-direction: column; }
.proof-value {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
  color: var(--benefit-color);
  margin-bottom: 0.3rem;
}
.proof-label {
  font-size: 0.85rem;
  color: #64748b;
}

/* Fallback caso color-mix não seja suportado */
@supports not (background: color-mix(in srgb, red, white)) {
  .benefit-visual { background: #f1f5f9; }
}

/* Responsividade */
@media (max-width: 768px) {
  .client-benefits { padding: 4rem 1rem; }
  .benefits-intro { margin-bottom: 2.5rem; }
  .benefit-proof { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .benefits-heading { font-size: 1.8rem; }
  .benefits-subheading { font-size: 1rem; }
}
</style>
