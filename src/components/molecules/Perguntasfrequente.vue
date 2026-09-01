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
        <button type="button" @click="perguntarParaIa">
          Pergunte para a nossa IA
        </button>
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
          question: "Preciso trocar o sistema que já uso?",
          answer:
            "Não. Na maioria dos casos conectamos a inteligência artificial ao ERP, CRM ou planilhas que já rodam na sua empresa. Só sugerimos construir do zero quando o sistema atual realmente não dá conta do que você precisa — e isso a gente diz no diagnóstico, antes de qualquer proposta.",
        },
        {
          question: "Quanto tempo leva para a IA começar a trabalhar?",
          answer:
            "Uma automação pontual ou um atendimento no WhatsApp costuma entrar no ar em 2 a 4 semanas. Um sistema completo com IA leva de 2 a 4 meses. Em todos os casos entregamos em fases: você vê funcionando aos poucos, sem esperar o fim do projeto.",
        },
        {
          question: "A IA vai substituir a minha equipe?",
          answer:
            "Não é essa a ideia. A IA assume o que é repetitivo — lançamento de dados, primeira resposta ao cliente, geração de relatório — e libera sua equipe para o que exige decisão humana. O que a gente costuma ver é o mesmo time dando conta de um volume bem maior.",
        },
        {
          question: "E se a IA responder alguma coisa errada?",
          answer:
            "A IA não fica solta. Ela trabalha dentro das regras e dos dados do seu negócio, e definimos junto com você o que ela pode resolver sozinha e o que precisa passar por uma pessoa. Tudo fica registrado, então dá para revisar qualquer resposta e ajustar o comportamento.",
        },
        {
          question: "Meus dados ficam seguros?",
          answer:
            "Sim. Trabalhamos com controle de acesso por nível de usuário, criptografia e backup, e definimos no início quais dados a IA pode acessar. Nada é usado para treinar modelo de terceiros sem que você saiba e autorize.",
        },
        {
          question: "Funciona para o meu tipo de negócio?",
          answer:
            "Se a sua operação tem tarefa repetitiva, atendimento que demora ou informação espalhada em vários lugares, provavelmente sim. Já aplicamos em comércio, serviços, educação e logística — o que muda é onde a IA entra, não se ela entra.",
        },
        {
          question: "Quanto custa e como funciona o pagamento?",
          answer:
            "Depende do que a sua operação precisa, por isso não trabalhamos com tabela fechada. Fazemos um diagnóstico gratuito, mostramos o escopo e o valor antes de você assumir qualquer compromisso. O pagamento é dividido em etapas, vinculado às entregas.",
        },
        {
          question: "Vocês somem depois de entregar?",
          answer:
            "Não. Todo projeto inclui um período de suporte após o lançamento, com acompanhamento, correções e ajustes. Depois disso, quem quiser pode seguir com manutenção contínua — monitoramento, atualizações de segurança e melhorias.",
        },
      ],
    };
  },
  methods: {
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },

    // Manda a dúvida para o assistente da hero e sobe a tela até ele.
    // Se essa seção for reaproveitada numa página sem a hero, cai no contato.
    perguntarParaIa() {
      if (!document.querySelector(".hero-prompt")) {
        this.$router.push("/contato");
        return;
      }

      window.dispatchEvent(
        new CustomEvent("hero-prompt:perguntar", {
          detail: {
            texto: "Minha dúvida não estava nas perguntas frequentes: ",
          },
        })
      );
    },
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

/* Sem fade de entrada aqui de propósito: o card depender de uma classe
   para ficar visível já fez a pergunta sumir da tela uma vez. */
.faq-item {
  border: 1px solid #e6e5df;
  border-radius: 14px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
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

/* max-height em vez de grid-template-rows 0fr->1fr: aquele truque não
   completa a transição em parte dos navegadores e a resposta some.
   O teto é bem maior que qualquer resposta, então nada fica cortado. */
.faq-resposta {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s ease;
}

.faq-item.aberto .faq-resposta {
  max-height: 60rem;
}

.faq-resposta p {
  margin: 0;
  padding: 0 1.4rem 1.35rem;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #6b7194;
}

.faq-rodape {
  margin-top: 2.25rem;
  text-align: center;
  font-size: 0.98rem;
  color: #6b7194;
}

.faq-rodape button {
  padding: 0;
  border: none;
  border-bottom: 1px solid transparent;
  background: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: 600;
  color: #0052ff;
  cursor: pointer;
}

.faq-rodape button:hover {
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
    padding: 0 1.1rem 1.2rem;
    font-size: 0.94rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .faq-item,
  .faq-resposta {
    transition: none;
  }
}
</style>
