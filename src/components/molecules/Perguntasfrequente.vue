<template>
  <section class="faq">
    <div class="faq-inner">
      <div class="faq-header">
        <h2>
          Perguntas
          <span class="highlight">Frequentes</span>
        </h2>
        <p>
          As respostas para o que mais nos perguntam antes de começar um
          projeto.
        </p>
      </div>

      <div class="faq-lista">
        <div
          class="faq-item"
          v-for="(faq, index) in faqs"
          :key="index"
          :class="{ aberto: activeFaq === index }"
        >
          <button
            type="button"
            class="faq-pergunta"
            :aria-expanded="activeFaq === index"
            @click="toggleFaq(index)"
          >
            <span>{{ faq.question }}</span>
            <span class="faq-sinal">
              <font-awesome-icon :icon="activeFaq === index ? 'minus' : 'plus'" />
            </span>
          </button>

          <div class="faq-resposta">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <p class="faq-rodape">
        Não achou o que procurava?
        <router-link to="/contato">Fale com a gente</router-link>
      </p>
    </div>
  </section>
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
.faq {
  padding: 5.5rem 5%;
  background: #f6f5f1;
}

.faq-inner {
  max-width: 820px;
  margin: 0 auto;
}

.faq-header {
  margin-bottom: 2.75rem;
  text-align: center;
}

.faq-header h2 {
  margin: 0 0 1rem;
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #131a4d;
}

.highlight {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.faq-header p {
  font-size: 1.05rem;
  color: #6b7194;
}

/* Lista */
.faq-lista {
  display: grid;
  gap: 0.75rem;
}

.faq-item {
  border: 1px solid #e6e5df;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.faq-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.faq-item:hover {
  border-color: #d5d3f5;
}

.faq-item.aberto {
  border-color: #c3bdf5;
  box-shadow: 0 14px 34px rgba(19, 26, 77, 0.08);
}

.faq-pergunta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  width: 100%;
  padding: 1.25rem 1.4rem;
  border: none;
  background: none;
  text-align: left;
  font-family: inherit;
  font-size: 1.02rem;
  font-weight: 600;
  color: #131a4d;
  cursor: pointer;
}

.faq-sinal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #f4f4f0;
  font-size: 0.8rem;
  color: #4b5280;
  transition: background 0.25s ease, color 0.25s ease;
}

.faq-item.aberto .faq-sinal {
  background: #0052ff;
  color: #fff;
}

.faq-resposta {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.faq-item.aberto .faq-resposta {
  grid-template-rows: 1fr;
}

.faq-resposta p {
  overflow: hidden;
  margin: 0;
  padding: 0 1.4rem;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #6b7194;
  transition: padding 0.3s ease;
}

.faq-item.aberto .faq-resposta p {
  padding: 0 1.4rem 1.35rem;
}

.faq-rodape {
  margin-top: 2.25rem;
  text-align: center;
  font-size: 0.98rem;
  color: #6b7194;
}

.faq-rodape a {
  color: #0052ff;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid transparent;
}

.faq-rodape a:hover {
  border-bottom-color: #0052ff;
}

@media (max-width: 768px) {
  .faq {
    padding: 3.5rem 1.25rem;
  }

  .faq-header {
    margin-bottom: 2rem;
  }

  .faq-header h2 {
    font-size: 1.95rem;
  }

  .faq-header p {
    font-size: 0.98rem;
  }

  .faq-pergunta {
    padding: 1.1rem 1.1rem;
    font-size: 0.96rem;
  }

  .faq-resposta p {
    padding: 0 1.1rem;
    font-size: 0.94rem;
  }

  .faq-item.aberto .faq-resposta p {
    padding: 0 1.1rem 1.2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
