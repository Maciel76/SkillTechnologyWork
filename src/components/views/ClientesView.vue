<template>
  <main class="clientes-pagina">
    <!-- Abertura -->
    <section class="clientes-hero">
      <div class="hero-inner">
        <h1>
          O que dizem
          <span class="gradiente">nossos clientes</span>
        </h1>
        <p>
          Quem já trabalhou com a gente contando como foi — e o que mudou na
          operação depois.
        </p>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="secao secao-branca">
      <div class="secao-inner">
        <div v-if="carregando" class="estado-carregando">
          <span class="spinner"></span>
          Carregando depoimentos...
        </div>

        <template v-else>
          <p v-if="usandoExemplos" class="aviso-exemplos">
            Depoimentos de exemplo — os aprovados no painel aparecem aqui
            automaticamente.
          </p>

          <div class="depoimentos-grid">
            <article
              v-for="(item, index) in depoimentos"
              :key="item.id || index"
              class="depoimento-card"
            >
              <span class="aspas">
                <font-awesome-icon icon="quote-left" />
              </span>

              <div class="estrelas" :aria-label="`${item.nota} de 5 estrelas`">
                <font-awesome-icon
                  v-for="estrela in 5"
                  :key="estrela"
                  icon="star"
                  :class="{ apagada: estrela > item.nota }"
                />
              </div>

              <p class="depoimento-texto">{{ item.texto }}</p>

              <footer class="depoimento-autor">
                <span class="avatar" :style="{ background: corDoAvatar(index) }">
                  {{ iniciais(item.nome) }}
                </span>
                <div class="autor-dados">
                  <h3>{{ item.nome }}</h3>
                  <span class="empresa">
                    {{ item.cargo ? `${item.cargo}, ` : "" }}{{ item.empresa }}
                  </span>
                </div>
              </footer>
            </article>
          </div>
        </template>
      </div>
    </section>

    <!-- Enviar avaliação -->
    <section class="secao secao-clara">
      <div class="formulario-inner">
        <header class="secao-header">
          <h2>Já trabalhou <span class="gradiente">com a gente?</span></h2>
          <p>
            Conte como foi. Depois de aprovado, seu depoimento aparece aqui na
            página.
          </p>
        </header>

        <form class="formulario" @submit.prevent="enviarAvaliacao">
          <div class="campos-duplos">
            <label>
              <span>Seu nome *</span>
              <input v-model="form.nome" type="text" required maxlength="80" />
            </label>

            <label>
              <span>Empresa *</span>
              <input
                v-model="form.empresa"
                type="text"
                required
                maxlength="80"
              />
            </label>
          </div>

          <label>
            <span>Cargo</span>
            <input
              v-model="form.cargo"
              type="text"
              maxlength="80"
              placeholder="Ex: Diretor de Operações"
            />
          </label>

          <div class="campo-nota">
            <span>Sua nota</span>
            <div class="seletor-estrelas">
              <button
                v-for="estrela in 5"
                :key="estrela"
                type="button"
                class="estrela-botao"
                :class="{ ativa: estrela <= form.nota }"
                :aria-label="`${estrela} estrela${estrela > 1 ? 's' : ''}`"
                @click="form.nota = estrela"
              >
                <font-awesome-icon icon="star" />
              </button>
            </div>
          </div>

          <label>
            <span>Seu depoimento *</span>
            <textarea
              v-model="form.avaliacao"
              rows="5"
              required
              maxlength="600"
              placeholder="Como foi trabalhar com a gente? O que mudou no seu dia a dia?"
            ></textarea>
          </label>

          <p v-if="erro" class="mensagem erro">
            <font-awesome-icon icon="circle-exclamation" />
            {{ erro }}
          </p>

          <p v-if="enviado" class="mensagem sucesso">
            <font-awesome-icon icon="circle-check" />
            Depoimento enviado! Ele aparece na página assim que for aprovado.
          </p>

          <button type="submit" class="botao-enviar" :disabled="enviando">
            <span v-if="enviando">Enviando...</span>
            <span v-else>Enviar depoimento</span>
            <font-awesome-icon v-if="!enviando" icon="arrow-right" />
          </button>
        </form>
      </div>
    </section>

    <ContatoService />
  </main>
</template>

<script>
import ContatoService from "../celulas/ContatoService.vue";
import avaliacaoService from "@/services/avaliacaoService";

// Usados só enquanto não houver depoimento aprovado no painel
const DEPOIMENTOS_EXEMPLO = [
  {
    nome: "João Silva",
    cargo: "CEO",
    empresa: "Fashion Store",
    nota: 5,
    texto:
      "A equipe foi incrível! Entregaram um e-commerce moderno e funcional que superou nossas expectativas. As vendas aumentaram 60% no primeiro trimestre.",
  },
  {
    nome: "Maria Souza",
    cargo: "Fundadora",
    empresa: "FastDelivery",
    nota: 5,
    texto:
      "O aplicativo revolucionou nosso negócio. Agora temos controle total sobre as entregas e nossos clientes acompanham tudo em tempo real.",
  },
  {
    nome: "Carlos Oliveira",
    cargo: "Diretor de Operações",
    empresa: "TechCorp Inc",
    nota: 5,
    texto:
      "O dashboard com IA para controle de estoque transformou nossa operação. Reduzimos 40% dos custos com previsão inteligente de demanda.",
  },
];

const CORES_AVATAR = [
  "linear-gradient(135deg, #0052ff, #7c6ef2)",
  "linear-gradient(135deg, #f59e0b, #f97316)",
  "linear-gradient(135deg, #10b981, #22c55e)",
  "linear-gradient(135deg, #ec4899, #f472b6)",
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
];

export default {
  name: "FeedbackView",
  components: { ContatoService },

  data() {
    return {
      depoimentos: [],
      carregando: true,
      usandoExemplos: false,
      enviando: false,
      enviado: false,
      erro: "",
      form: {
        nome: "",
        cargo: "",
        empresa: "",
        nota: 5,
        avaliacao: "",
      },
    };
  },

  mounted() {
    this.carregarDepoimentos();
  },

  methods: {
    // Busca o que já foi aprovado; sem nada aprovado, mostra os exemplos
    async carregarDepoimentos() {
      try {
        const resposta = await avaliacaoService.getAprovadas();
        const lista = (resposta?.data || []).map((item) => ({
          id: item._id,
          nome: item.nome,
          cargo: item.cargo || "",
          empresa: item.empresa,
          nota: item.nota || 5,
          texto: item.avaliacao,
        }));

        if (lista.length) {
          this.depoimentos = lista;
          this.usandoExemplos = false;
        } else {
          this.depoimentos = DEPOIMENTOS_EXEMPLO;
          this.usandoExemplos = true;
        }
      } catch (error) {
        console.warn(
          "Não foi possível carregar os depoimentos, usando exemplos.",
          error
        );
        this.depoimentos = DEPOIMENTOS_EXEMPLO;
        this.usandoExemplos = true;
      } finally {
        this.carregando = false;
      }
    },

    async enviarAvaliacao() {
      if (this.enviando) return;

      this.erro = "";
      this.enviado = false;
      this.enviando = true;

      try {
        await avaliacaoService.enviar({
          nome: this.form.nome.trim(),
          cargo: this.form.cargo.trim(),
          empresa: this.form.empresa.trim(),
          nota: this.form.nota,
          avaliacao: this.form.avaliacao.trim(),
        });

        this.enviado = true;
        this.form = {
          nome: "",
          cargo: "",
          empresa: "",
          nota: 5,
          avaliacao: "",
        };
      } catch (error) {
        this.erro = error.message || "Erro ao enviar o depoimento.";
      } finally {
        this.enviando = false;
      }
    },

    iniciais(nome) {
      return (nome || "")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toUpperCase();
    },

    corDoAvatar(index) {
      return CORES_AVATAR[index % CORES_AVATAR.length];
    },
  },
};
</script>

<style scoped>
.clientes-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.clientes-hero {
  padding: 5.5rem 5% 5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 760px;
  margin: 0 auto;
}

.clientes-hero h1 {
  margin: 0;
  font-size: 3.1rem;
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

.clientes-hero p {
  margin: 1.25rem auto 0;
  max-width: 560px;
  font-size: 1.12rem;
  line-height: 1.6;
  color: #3d4570;
}

/* Seções */
.secao {
  padding: 5rem 5%;
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
  margin-bottom: 2.25rem;
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

.estado-carregando {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 0;
  color: #6b7194;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e1da;
  border-top-color: #0052ff;
  border-radius: 50%;
  animation: girar 0.8s linear infinite;
}

@keyframes girar {
  to {
    transform: rotate(360deg);
  }
}

.aviso-exemplos {
  margin: 0 auto 2rem;
  max-width: 620px;
  padding: 0.75rem 1rem;
  border: 1px dashed #e2e1da;
  border-radius: 10px;
  text-align: center;
  font-size: 0.88rem;
  color: #9aa0b8;
}

/* Depoimentos */
.depoimentos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.depoimento-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem 1.75rem 1.5rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.depoimento-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.1);
}

.aspas {
  position: absolute;
  top: 1.35rem;
  right: 1.5rem;
  font-size: 1.6rem;
  color: #ebeaf7;
}

.estrelas {
  display: flex;
  gap: 0.15rem;
  margin-bottom: 1rem;
  color: #f59e0b;
  font-size: 0.85rem;
}

.estrelas .apagada {
  color: #e2e1da;
}

.depoimento-texto {
  flex: 1;
  margin: 0 0 1.75rem;
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5280;
}

.depoimento-autor {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding-top: 1.25rem;
  border-top: 1px solid #eeede7;
}

.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
}

.autor-dados h3 {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 700;
  color: #131a4d;
}

.empresa {
  font-size: 0.85rem;
  color: #9aa0b8;
}

/* Formulário */
.formulario-inner {
  max-width: 680px;
  margin: 0 auto;
}

.formulario {
  display: grid;
  gap: 1.15rem;
  padding: 2rem;
  border: 1px solid #e6e5df;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.07);
}

.campos-duplos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.15rem;
}

.formulario label {
  display: grid;
  gap: 0.45rem;
}

.formulario label > span,
.campo-nota > span {
  font-size: 0.88rem;
  font-weight: 600;
  color: #4b5280;
}

.formulario input,
.formulario textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e1da;
  border-radius: 10px;
  background: #fbfbf9;
  font-family: inherit;
  font-size: 0.98rem;
  color: #131a4d;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.formulario input:focus,
.formulario textarea:focus {
  outline: none;
  border-color: #7c6ef2;
  background: #fff;
}

.formulario textarea {
  resize: vertical;
  line-height: 1.6;
}

.campo-nota {
  display: grid;
  gap: 0.45rem;
}

.seletor-estrelas {
  display: flex;
  gap: 0.3rem;
}

.estrela-botao {
  padding: 0;
  border: none;
  background: none;
  font-size: 1.4rem;
  color: #e2e1da;
  cursor: pointer;
  transition: color 0.15s ease, transform 0.15s ease;
}

.estrela-botao:hover {
  transform: scale(1.1);
}

.estrela-botao.ativa {
  color: #f59e0b;
}

.mensagem {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0;
  font-size: 0.92rem;
}

.mensagem.erro {
  color: #dc2626;
}

.mensagem.sucesso {
  color: #16a34a;
}

.botao-enviar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-family: inherit;
  font-size: 0.98rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 82, 255, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;
}

.botao-enviar:hover:not(:disabled) {
  background: #0040c9;
  transform: translateY(-1px);
}

.botao-enviar:disabled {
  background: #c3cbe6;
  cursor: not-allowed;
  box-shadow: none;
}

/* Responsivo */
@media (max-width: 768px) {
  .clientes-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .clientes-hero h1 {
    font-size: 2.05rem;
  }

  .clientes-hero p {
    font-size: 1rem;
  }

  .secao {
    padding: 3.5rem 1.25rem;
  }

  .secao-header h2 {
    font-size: 1.85rem;
  }

  .depoimento-card {
    padding: 1.6rem 1.35rem 1.35rem;
  }

  .formulario {
    padding: 1.5rem 1.25rem;
  }

  .campos-duplos {
    grid-template-columns: 1fr;
  }
}
</style>
