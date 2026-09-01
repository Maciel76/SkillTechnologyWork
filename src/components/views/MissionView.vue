<template>
  <main class="missao-pagina">
    <!-- Abertura -->
    <section class="missao-hero">
      <div class="hero-inner">
        <h1>Nossa <span class="gradiente">Missão</span></h1>
        <p>
          Fazer a inteligência artificial trabalhar de verdade dentro de
          empresas de qualquer porte — e não virar mais uma promessa parada.
        </p>
      </div>
    </section>

    <!-- Missão, visão e valores -->
    <section class="secao secao-branca">
      <div class="secao-inner">
        <div class="pilares-grid">
          <article class="pilar-card">
            <span class="pilar-icone missao">
              <font-awesome-icon icon="rocket" />
            </span>
            <h2>Missão</h2>
            <p>
              Colocar inteligência artificial para trabalhar dentro do negócio
              dos nossos clientes — no sistema que já usam ou em um novo, feito
              sob medida — para que tarefas repetitivas parem de consumir o
              tempo de quem deveria estar cuidando do crescimento da empresa.
            </p>
          </article>

          <article class="pilar-card">
            <span class="pilar-icone visao">
              <font-awesome-icon icon="eye" />
            </span>
            <h2>Visão</h2>
            <p>
              Ser a agência que o pequeno e o médio negócio brasileiro procura
              quando decide usar IA de verdade, e não só falar sobre ela.
              Tecnologia de ponta não pode ser privilégio de quem tem um
              departamento de TI inteiro.
            </p>
          </article>

          <article class="pilar-card">
            <span class="pilar-icone valores">
              <font-awesome-icon icon="gem" />
            </span>
            <h2>Valores</h2>
            <ul>
              <li v-for="valor in valores" :key="valor.titulo">
                <font-awesome-icon icon="circle-check" />
                <span>
                  <strong>{{ valor.titulo }}</strong>
                  {{ valor.texto }}
                </span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- Valores em ação -->
    <section class="secao secao-clara">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Como isso aparece <span class="gradiente">no dia a dia</span></h2>
          <p>Valor que não muda o jeito de trabalhar é só frase bonita.</p>
        </header>

        <div class="acoes-grid">
          <article
            v-for="acao in acoes"
            :key="acao.titulo"
            class="acao-card"
          >
            <span class="acao-icone">
              <font-awesome-icon :icon="acao.icone" />
            </span>
            <h3>{{ acao.titulo }}</h3>
            <p>{{ acao.texto }}</p>
            <blockquote>{{ acao.citacao }}</blockquote>
          </article>
        </div>
      </div>
    </section>

    <!-- Números -->
    <section class="secao secao-numeros">
      <div class="secao-inner">
        <header class="secao-header">
          <h2>Nosso <span class="gradiente">impacto</span></h2>
        </header>

        <div class="numeros-grid">
          <div
            v-for="numero in numeros"
            :key="numero.label"
            class="numero-item"
            v-animate-counter
          >
            <div class="stat-number">{{ numero.valor }}</div>
            <div class="stat-label">{{ numero.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <ContatoService />
  </main>
</template>

<script>
import ContatoService from "../celulas/ContatoService.vue";

export default {
  name: "MissaoView",
  components: { ContatoService },

  data() {
    return {
      valores: [
        {
          titulo: "IA onde ela resolve.",
          texto:
            "Não aplicamos tecnologia por moda: ela só entra onde existe um problema real.",
        },
        {
          titulo: "Sem trocar o que funciona.",
          texto:
            "Respeitamos o sistema que a empresa já usa em vez de recomeçar do zero.",
        },
        {
          titulo: "Transparência total.",
          texto: "Escopo, prazo e valor claros, sem surpresa no meio do caminho.",
        },
        {
          titulo: "Entrega em fases.",
          texto: "Você vê funcionando aos poucos, sem esperar o fim do projeto.",
        },
        {
          titulo: "A decisão é sua.",
          texto:
            "A IA sugere e executa, mas quem define até onde ela vai é você.",
        },
      ],

      acoes: [
        {
          icone: "lightbulb",
          titulo: "Diagnóstico antes da proposta",
          texto:
            "Olhamos a operação antes de falar em preço. Às vezes o que resolve é uma automação simples, não um sistema inteiro.",
          citacao:
            "Se a IA não for resolver nada no seu caso, a gente fala isso na primeira conversa.",
        },
        {
          icone: "sliders",
          titulo: "IA com rédea curta",
          texto:
            "Definimos junto com você o que a IA pode fazer sozinha e o que precisa passar por uma pessoa. Tudo fica registrado e revisável.",
          citacao:
            "Automatizar não é abrir mão do controle — é decidir de forma consciente onde ele é necessário.",
        },
        {
          icone: "handshake",
          titulo: "Presença depois da entrega",
          texto:
            "O projeto não acaba no lançamento. Acompanhamos o uso real, corrigimos o que aparece e ajustamos o que a operação pedir.",
          citacao:
            "Sistema entregue e abandonado vira problema. Ficamos junto para isso não acontecer.",
        },
      ],

      // Mesmos números do restante do site
      numeros: [
        { valor: "200+", label: "Projetos entregues" },
        { valor: "98%", label: "Taxa de satisfação" },
        { valor: "20+", label: "Serviços oferecidos" },
        { valor: "24/7", label: "Suporte disponível" },
      ],
    };
  },

  directives: {
    "animate-counter": {
      mounted(el) {
        const alvo = el.querySelector(".stat-number");
        if (!alvo) return;

        const texto = alvo.textContent.trim();
        const numero = parseInt(texto, 10);
        const sufixo = texto.replace(/^\d+/, "");

        // Valores como "24/7" não são contagem: ficam parados
        if (Number.isNaN(numero) || texto.includes("/")) return;

        const animar = () => {
          const duracao = 1600;
          let inicio = null;

          const passo = (agora) => {
            if (!inicio) inicio = agora;
            const progresso = Math.min((agora - inicio) / duracao, 1);
            alvo.textContent = Math.floor(progresso * numero) + sufixo;
            if (progresso < 1) window.requestAnimationFrame(passo);
          };

          window.requestAnimationFrame(passo);
        };

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animar();
                observer.unobserve(el);
              }
            });
          },
          { threshold: 0.5 }
        );

        observer.observe(el);
      },
    },
  },
};
</script>

<style scoped>
.missao-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.missao-hero {
  padding: 4.5rem 5% 4rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
}

.missao-hero h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.missao-hero p {
  margin: 1.25rem auto 0;
  max-width: 580px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #3d4570;
}

/* Seções */
.secao {
  padding: 4.5rem 5%;
}

.secao-branca {
  background: #fff;
}

.secao-clara {
  background: #f6f5f1;
}

.secao-inner {
  max-width: 1180px;
  margin: 0 auto;
}

.secao-header {
  max-width: 620px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.secao-header h2 {
  margin: 0;
  font-size: 2.3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.secao-header p {
  margin: 0.85rem 0 0;
  font-size: 1.02rem;
  color: #6b7194;
}

/* Missão, visão e valores */
.pilares-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(310px, 1fr));
  gap: 1.5rem;
}

.pilar-card {
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.pilar-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.1);
}

.pilar-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-bottom: 1.25rem;
  border-radius: 14px;
  font-size: 1.15rem;
}

.pilar-icone.missao {
  background: rgba(0, 82, 255, 0.1);
  color: #0052ff;
}

.pilar-icone.visao {
  background: rgba(124, 110, 242, 0.12);
  color: #7c6ef2;
}

.pilar-icone.valores {
  background: rgba(245, 158, 11, 0.12);
  color: #f59e0b;
}

.pilar-card h2 {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 700;
  color: #131a4d;
}

.pilar-card p {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.7;
  color: #6b7194;
}

.pilar-card ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.pilar-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.93rem;
  line-height: 1.55;
  color: #6b7194;
}

.pilar-card li svg {
  margin-top: 0.22rem;
  flex: 0 0 auto;
  color: #22c55e;
}

.pilar-card li strong {
  color: #131a4d;
  font-weight: 700;
}

/* Valores em ação */
.acoes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.acao-card {
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fff;
}

.acao-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 1.15rem;
  border-radius: 13px;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  font-size: 1.05rem;
}

.acao-card h3 {
  margin: 0 0 0.6rem;
  font-size: 1.15rem;
  font-weight: 700;
  color: #131a4d;
}

.acao-card p {
  margin: 0 0 1.35rem;
  font-size: 0.96rem;
  line-height: 1.65;
  color: #6b7194;
}

.acao-card blockquote {
  margin: auto 0 0;
  padding: 1rem 1.15rem;
  border-left: 3px solid #7c6ef2;
  border-radius: 0 10px 10px 0;
  background: #f6f5f1;
  font-size: 0.92rem;
  font-style: italic;
  line-height: 1.6;
  color: #4b5280;
}

/* Números */
.secao-numeros {
  color: #fff;
  background-color: #131a4d;
  background-image: linear-gradient(135deg, #131a4d 0%, #1e2a6b 100%);
}

.secao-numeros .secao-header h2 {
  color: #fff;
}

.secao-numeros .gradiente {
  background: linear-gradient(90deg, #7cb0ff, #b9a8ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.numeros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.numero-item {
  padding: 1.75rem 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  text-align: center;
}

.stat-number {
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.72);
}

/* Responsivo */
@media (max-width: 768px) {
  .missao-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .missao-hero h1 {
    font-size: 2.05rem;
  }

  .missao-hero p {
    font-size: 1rem;
  }

  .secao {
    padding: 3rem 1.25rem;
  }

  .secao-header h2 {
    font-size: 1.85rem;
  }

  .pilar-card,
  .acao-card {
    padding: 1.6rem 1.35rem;
  }

  .stat-number {
    font-size: 2rem;
  }
}
</style>
