<template>
  <div class="faq-page">
    <section class="faq-section">
      <h2 class="section-title">
        Perguntas <span class="highlight">Frequentes</span>
      </h2>

      <div class="faq-grid">
        <div
          class="faq-item"
          v-for="(faq, index) in faqs"
          :key="index"
          @click="toggleFaq(index)"
        >
          <div class="faq-question">
            <h3>{{ faq.question }}</h3>
            <div
              class="faq-toggle"
              :class="{ active: activeFaq === index }"
            ></div>
          </div>
          <div class="faq-answer" :class="{ active: activeFaq === index }">
            <div class="faq-answer-content">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FaqSection",
  data() {
    return {
      activeFaq: null,
      faqs: [
        {
          question: "Qual é o prazo médio para desenvolvimento?",
          answer:
            "O prazo varia conforme a complexidade do projeto. Sites institucionais levam em média 4-6 semanas, enquanto aplicativos complexos podem levar de 3-6 meses. Entregamos em fases para que você possa acompanhar o progresso.",
        },
        {
          question: "Oferecem manutenção após o lançamento?",
          answer:
            "Sim, todos nossos planos incluem um período de suporte pós-lançamento. Também oferecemos planos de manutenção contínua com atualizações, backups e monitoramento de performance.",
        },
        {
          question:
            "Posso fazer alterações no projeto durante o desenvolvimento?",
          answer:
            "Claro! Utilizamos metodologias ágeis que permitem ajustes durante o processo. Alterações significativas podem impactar no prazo e custo, mas sempre comunicamos isso de forma transparente.",
        },
        {
          question: "Como funciona o pagamento?",
          answer:
            "Trabalhamos com parcelamento em até 12x sem juros. Para projetos maiores, dividimos em etapas com pagamentos vinculados a marcos de entrega. Aceitamos cartão, transferência e PIX.",
        },
        {
          question: "Vocês trabalham com tecnologias específicas?",
          answer:
            "Utilizamos as melhores tecnologias para cada tipo de projeto: React e Vue.js para frontend, Node.js e Laravel para backend, Flutter e React Native para mobile. Sempre escolhemos a stack mais adequada para suas necessidades.",
        },
        {
          question: "Há desconto para projetos de longo prazo?",
          answer:
            "Sim, oferecemos descontos progressivos para projetos com duração superior a 6 meses. Planos anuais também têm desconto de até 20% em relação aos mensais.",
        },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
  },
  mounted() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target); // Animação acontece apenas uma vez
          }
        });
      },
      {
        threshold: 0.1, // A animação começa quando 10% do item está visível
      }
    );

    this.$el.querySelectorAll(".faq-item").forEach((item) => {
      observer.observe(item);
    });
  },
};
</script>

<style scoped>
/* Base Styles */
.faq-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* FAQ Section */
.faq-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  max-width: 1200px;
  margin: 0 auto;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 3rem;
}

.highlight {
  color: #6366f1;
}

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  /* Estado inicial para a animação */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

/* Adiciona um atraso escalonado para cada item */
.faq-item:nth-child(2) {
  transition-delay: 0.1s;
}
.faq-item:nth-child(3) {
  transition-delay: 0.2s;
}
.faq-item:nth-child(4) {
  transition-delay: 0.3s;
}
.faq-item:nth-child(5) {
  transition-delay: 0.4s;
}
.faq-item:nth-child(6) {
  transition-delay: 0.5s;
}

.faq-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.2rem;
  color: #1e293b;
  margin: 0;
}

.faq-toggle {
  position: relative;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.faq-toggle::before,
.faq-toggle::after {
  content: "";
  position: absolute;
  background-color: #6366f1;
  transition: transform 0.3s ease;
}

/* Linha horizontal */
.faq-toggle::before {
  top: 50%;
  left: 0;
  width: 100%;
  height: 3px;
  transform: translateY(-50%);
}

/* Linha vertical */
.faq-toggle::after {
  top: 0;
  left: 50%;
  width: 3px;
  height: 100%;
  transform: translateX(-50%);
}

.faq-toggle.active::after {
  transform: translateX(-50%) rotate(90deg);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.faq-answer.active {
  grid-template-rows: 1fr;
}

.faq-answer-content {
  overflow: hidden;
}

.faq-answer p {
  color: #64748b;
  margin: 0;
  padding-top: 1rem;
}
</style>
