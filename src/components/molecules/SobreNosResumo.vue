<!-- ok -->
<template>
  <section class="sobre-section">
    <div class="sobre-grid">
      <div class="sobre-texto">
        <h2>Sobre <span>Nós</span></h2>

        <p class="sobre-lead">
          Somos um grupo de profissionais de tecnologia especializados em
          transformar ideias em soluções digitais completas. Desenvolvemos
          sistemas web, aplicativos, lojas virtuais e automações — e
          implantamos inteligência artificial dentro do seu negócio, no sistema
          que você já usa ou em um novo, feito sob medida.
        </p>

        <h3 class="destaques-titulo">O que a IA muda na sua operação</h3>

        <ul class="destaques">
          <li v-for="destaque in destaques" :key="destaque.titulo">
            <font-awesome-icon icon="circle-check" />
            <span>
              <strong>{{ destaque.titulo }}</strong>
              {{ destaque.texto }}
            </span>
          </li>
        </ul>

        <p class="sobre-fecho">
          Nosso objetivo é acelerar o crescimento do seu negócio, eliminando
          processos manuais e entregando resultados reais em tempo recorde.
        </p>

        <div class="stats">
          <div
            v-for="(stat, index) in stats"
            :key="index"
            class="stat-item"
            :ref="(el) => (statRefs[index] = el)"
          >
            <span class="number">0</span>
            <span class="label">{{ stat.label }}</span>
          </div>
        </div>

        <router-link to="/sobre" class="sobre-cta">
          Conheça a agência
          <font-awesome-icon icon="arrow-right" />
        </router-link>
      </div>

      <!-- Mockup do assistente no lugar da foto de banco de imagens -->
      <div class="sobre-visual">
        <div class="mock-janela">
          <div class="mock-topo">
            <span class="ponto"></span>
            <span class="ponto"></span>
            <span class="ponto"></span>
            <span class="mock-titulo">Assistente de IA</span>
            <span class="mock-etiqueta">exemplo</span>
          </div>

          <div class="mock-corpo">
            <div class="bolha bolha-usuario">
              <span class="cliente-tag">Cliente</span>
              Meus clientes esperam 2 dias para receber um orçamento.
            </div>

            <div class="bolha bolha-ia">
              <span class="ia-tag">
                <font-awesome-icon icon="robot" />
                IA
              </span>
              Conectei o WhatsApp ao seu CRM e automatizei a proposta. Agora a
              resposta sai em segundos.
            </div>

            <div class="mock-metrica">
              <div class="metrica-valor">
                <strong>-72%</strong>
                <span>no tempo de resposta</span>
              </div>
              <svg
                class="sparkline"
                viewBox="0 0 120 40"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polyline
                  points="0,32 20,28 40,30 60,18 80,20 100,9 120,4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="mock-badge">
          <span class="pulso"></span>
          IA ativa 24/7
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//revisado
import { ref, onMounted } from "vue";

export default {
  name: "SobreNosResumo",
  setup() {
    const stats = ref([
      { value: 200, suffix: "+", label: "Projetos Entregues" },
      { value: 20, suffix: "+", label: "Serviços" },
      { value: 98, suffix: "%", label: "Satisfação do Cliente" },
    ]);

    const destaques = ref([
      {
        titulo: "Atendimento 24 horas",
        texto: "seus clientes recebem resposta em segundos, sem fila e sem hora marcada.",
      },
      {
        titulo: "Fim do trabalho manual",
        texto: "lançamentos, propostas, cobranças e relatórios saem sozinhos.",
      },
      {
        titulo: "Decisão com dados",
        texto: "a IA aponta tendências e avisa antes do problema aparecer.",
      },
      {
        titulo: "Equipe no lugar certo",
        texto: "seu time foca no que gera receita, não em copiar e colar.",
      },
    ]);

    const statRefs = ref([]);

    const animateCounters = () => {
      stats.value.forEach((stat, index) => {
        const element = statRefs.value[index]?.querySelector(".number");
        if (!element) return;

        const target = stat.value;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            element.textContent = target + stat.suffix;
          }
        };

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              updateCounter();
              observer.disconnect();
            }
          },
          { threshold: 0.5 }
        );

        observer.observe(element);
      });
    };

    onMounted(() => {
      animateCounters();
    });

    return {
      stats,
      destaques,
      statRefs,
    };
  },
};
</script>

<style scoped>
.sobre-section {
  padding: 5.5rem 5%;
  background: #f6f5f1;
}

.sobre-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 4.5rem;
  max-width: 1180px;
  margin: 0 auto;
}

/* Coluna de texto */
.sobre-texto h2 {
  margin: 0 0 1.25rem;
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.sobre-texto h2 span {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sobre-lead {
  font-size: 1.08rem;
  line-height: 1.7;
  color: #3d4570;
}

.destaques-titulo {
  margin: 1.75rem 0 0.9rem;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0b8;
}

.destaques {
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.destaques strong {
  color: #131a4d;
  font-weight: 700;
}

.destaques li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 0.98rem;
  color: #4b5280;
}

.destaques svg {
  margin-top: 0.2rem;
  color: #22c55e;
  flex: 0 0 auto;
}

.sobre-fecho {
  font-size: 0.98rem;
  line-height: 1.7;
  color: #6b7194;
}

/* Números */
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  margin: 2rem 0;
  padding-top: 1.75rem;
  border-top: 1px solid #e6e5df;
}

.number {
  display: block;
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0052ff;
}

.label {
  font-size: 0.88rem;
  color: #6b7194;
}

.sobre-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(0, 82, 255, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;
}

.sobre-cta:hover {
  background: #0040c9;
  transform: translateY(-1px);
}

/* Mockup do assistente */
.sobre-visual {
  position: relative;
}

.mock-janela {
  background: #fff;
  border: 1px solid #e6e5df;
  border-radius: 18px;
  box-shadow: 0 24px 60px rgba(19, 26, 77, 0.12);
  overflow: hidden;
}

.mock-topo {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.9rem 1.1rem;
  border-bottom: 1px solid #f0efe9;
  background: #fbfbf9;
}

.ponto {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #e2e1da;
}

.ponto:first-child {
  background: #ffc9c2;
}

.mock-titulo {
  margin-left: 0.6rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #9aa0b8;
}

.mock-etiqueta {
  margin-left: auto;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #f4f4f0;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9aa0b8;
}

.mock-corpo {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.5rem;
}

.bolha {
  max-width: 88%;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  font-size: 0.95rem;
  line-height: 1.55;
}

.bolha-usuario {
  align-self: flex-end;
  background: #f4f4f0;
  color: #4b5280;
  border-bottom-right-radius: 4px;
}

.bolha-ia {
  align-self: flex-start;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  border-bottom-left-radius: 4px;
  box-shadow: 0 10px 24px rgba(0, 82, 255, 0.2);
}

.cliente-tag {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0b8;
}

.ia-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.4rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.mock-metrica {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.35rem;
  padding: 1rem 1.1rem;
  border: 1px solid #eeede7;
  border-radius: 14px;
  background: #fbfbf9;
}

.metrica-valor strong {
  display: block;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.metrica-valor span {
  font-size: 0.82rem;
  color: #6b7194;
}

.sparkline {
  width: 120px;
  height: 40px;
  color: #22c55e;
  flex: 0 0 auto;
}

.mock-badge {
  position: absolute;
  right: -0.75rem;
  bottom: -1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border: 1px solid #e6e5df;
  border-radius: 999px;
  background: #fff;
  font-size: 0.85rem;
  font-weight: 600;
  color: #131a4d;
  box-shadow: 0 12px 30px rgba(19, 26, 77, 0.12);
}

.pulso {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5);
  animation: pulsa 2s infinite;
}

@keyframes pulsa {
  70% {
    box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
  }
}

/* Responsivo */
@media (max-width: 1024px) {
  .sobre-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .sobre-visual {
    order: -1;
  }

  .mock-badge {
    right: 0.5rem;
  }
}

@media (max-width: 768px) {
  .sobre-section {
    padding: 3.5rem 1.25rem;
  }

  .sobre-texto h2 {
    font-size: 2rem;
  }

  .sobre-lead {
    font-size: 1rem;
  }

  .stats {
    gap: 1.5rem 2rem;
  }

  .number {
    font-size: 1.8rem;
  }

  .mock-corpo {
    padding: 1.15rem;
  }

  .bolha {
    max-width: 95%;
    font-size: 0.9rem;
  }

  .mock-metrica {
    flex-direction: column;
    align-items: flex-start;
  }

  .sparkline {
    width: 100%;
  }

  .mock-badge {
    right: 0.25rem;
    bottom: -0.85rem;
    font-size: 0.8rem;
  }
}
</style>
