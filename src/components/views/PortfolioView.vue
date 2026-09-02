<template>
  <main class="portfolio-pagina">
    <!-- Abertura -->
    <section class="portfolio-hero">
      <div class="hero-inner">
        <h1>
          Projetos que resolveram
          <span class="gradiente">problemas reais</span>
        </h1>
        <p>
          Sistemas, lojas, aplicativos e automações com IA que entregamos para
          empresas de portes e setores diferentes.
        </p>
      </div>
    </section>

    <!-- Carregando -->
    <section v-if="carregando" class="estado-carregando">
      <span class="spinner"></span>
      Carregando projetos...
    </section>

    <template v-else>
      <!-- Todos os projetos -->
      <section class="secao secao-branca">
        <header class="secao-header">
          <h2>Nossos <span class="gradiente">Projetos</span></h2>
        </header>

        <div v-if="projetos.length" class="galeria-grid">
          <article
            v-for="projeto in projetos"
            :key="projeto.id"
            class="galeria-card"
            @click="abrirProjeto(projeto)"
          >
            <div class="galeria-media">
              <img :src="projeto.thumbnail" :alt="projeto.titulo" loading="lazy" />
              <span class="etiqueta">{{ projeto.categoria }}</span>
            </div>

            <div class="galeria-corpo">
              <h3>{{ projeto.titulo }}</h3>
              <p v-if="projeto.resumo">{{ projeto.resumo }}</p>

              <div v-if="projeto.tecnologias.length" class="galeria-techs">
                <span
                  v-for="tech in projeto.tecnologias.slice(0, 4)"
                  :key="tech"
                  >{{ tech }}</span
                >
                <span v-if="projeto.tecnologias.length > 4" class="mais">
                  +{{ projeto.tecnologias.length - 4 }}
                </span>
              </div>

              <div class="galeria-rodape">
                <span>{{ projeto.cliente || "Projeto autoral" }}</span>
                <span v-if="projeto.ano">{{ projeto.ano }}</span>
              </div>
            </div>
          </article>
        </div>

        <p v-else class="galeria-vazia">
          Nenhum projeto publicado por enquanto.
        </p>
      </section>

      <!-- Metodologia -->
      <section class="secao secao-clara">
        <header class="secao-header">
          <h2>Como um projeto <span class="gradiente">nasce aqui</span></h2>
          <p>O mesmo processo em todos os trabalhos acima.</p>
        </header>

        <div class="processo-grid">
          <div
            v-for="(etapa, index) in etapas"
            :key="etapa.titulo"
            class="processo-card"
          >
            <span class="processo-numero">{{ index + 1 }}</span>
            <span class="processo-icone">
              <font-awesome-icon :icon="etapa.icone" />
            </span>
            <h3>{{ etapa.titulo }}</h3>
            <p>{{ etapa.texto }}</p>
          </div>
        </div>
      </section>
    </template>

    <!-- Detalhes do projeto -->
    <transition name="fade">
      <div
        v-if="projetoAberto"
        class="projeto-overlay"
        @click.self="fecharProjeto"
      >
        <div class="projeto-painel">
          <button class="projeto-fechar" @click="fecharProjeto" aria-label="Fechar">
            <font-awesome-icon icon="xmark" />
          </button>

          <header class="projeto-capa">
            <img :src="imagemAtiva" :alt="projetoAberto.titulo" />
            <div class="projeto-capa-texto">
              <span class="etiqueta">{{ projetoAberto.categoria }}</span>
              <h2>{{ projetoAberto.titulo }}</h2>
              <p class="projeto-meta">
                <span>{{ projetoAberto.cliente || "Projeto autoral" }}</span>
                <span v-if="projetoAberto.ano">{{ projetoAberto.ano }}</span>
              </p>
            </div>
          </header>

          <div v-if="galeria.length > 1" class="projeto-galeria">
            <button
              v-for="(imagem, index) in galeria"
              :key="index"
              type="button"
              class="projeto-miniatura"
              :class="{ ativa: imagem === imagemAtiva }"
              @click="imagemAtiva = imagem"
            >
              <img :src="imagem" :alt="`Imagem ${index + 1}`" />
            </button>
          </div>

          <div class="projeto-corpo">
            <div class="projeto-conteudo">
              <section v-if="itensDesafio.length">
                <h3><span class="ponto desafio"></span> O desafio</h3>
                <ul>
                  <li v-for="(item, i) in itensDesafio" :key="`d-${i}`">
                    {{ item }}
                  </li>
                </ul>
              </section>

              <section v-if="projetoAberto.solucao.length">
                <h3><span class="ponto solucao"></span> Nossa solução</h3>
                <ul>
                  <li v-for="(item, i) in projetoAberto.solucao" :key="`s-${i}`">
                    {{ item }}
                  </li>
                </ul>
              </section>

              <section v-if="projetoAberto.resultados.length">
                <h3><span class="ponto resultado"></span> Resultados</h3>
                <ul>
                  <li
                    v-for="(item, i) in projetoAberto.resultados"
                    :key="`r-${i}`"
                  >
                    {{ item }}
                  </li>
                </ul>
              </section>

              <p v-if="!temDetalhes" class="projeto-resumo">
                {{ projetoAberto.resumo || "Projeto entregue pela SkillTechnology." }}
              </p>
            </div>

            <aside class="projeto-lateral">
              <div v-if="projetoAberto.metricas.length" class="projeto-numeros">
                <div
                  v-for="(m, i) in projetoAberto.metricas"
                  :key="i"
                  class="projeto-numero"
                >
                  <strong>{{ m.valor }}</strong>
                  <span>{{ m.rotulo }}</span>
                </div>
              </div>

              <div v-if="projetoAberto.tecnologias.length" class="projeto-bloco">
                <h4>Tecnologias</h4>
                <div class="projeto-techs">
                  <span v-for="tech in projetoAberto.tecnologias" :key="tech">{{
                    tech
                  }}</span>
                </div>
              </div>

              <div v-if="projetoAberto.equipe.length" class="projeto-bloco">
                <h4>Time do projeto</h4>
                <div class="projeto-equipe">
                  <router-link
                    v-for="pessoa in projetoAberto.equipe"
                    :key="pessoa._id"
                    :to="`/portfolio/autor/${pessoa.slug}`"
                    class="equipe-item"
                    @click="fecharProjeto"
                  >
                    <img v-if="pessoa.avatar" :src="pessoa.avatar" :alt="pessoa.name" />
                    <span v-else class="equipe-iniciais">{{ iniciaisDe(pessoa.name) }}</span>
                    <span class="equipe-texto">
                      <strong>{{ pessoa.name }}</strong>
                      <small v-if="pessoa.role">{{ pessoa.role }}</small>
                    </span>
                  </router-link>
                </div>
              </div>

              <div class="projeto-acoes">
                <a
                  v-if="linkExterno"
                  :href="projetoAberto.liveUrl"
                  target="_blank"
                  rel="noopener"
                  class="botao-principal"
                >
                  Ver projeto no ar
                  <font-awesome-icon icon="arrow-right" />
                </a>
                <router-link
                  v-else-if="projetoAberto.liveUrl"
                  :to="projetoAberto.liveUrl"
                  class="botao-principal"
                  @click="fecharProjeto"
                >
                  Ver detalhes
                  <font-awesome-icon icon="arrow-right" />
                </router-link>
                <router-link
                  to="/contato"
                  class="botao-secundario"
                  @click="fecharProjeto"
                >
                  Quero um projeto assim
                </router-link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </transition>

    <ContatoService />
  </main>
</template>

<script>
import ContatoService from "../celulas/ContatoService.vue";
import recentProjectService from "@/services/recentProjectService";
import agencyPortfolioService from "@/services/agencyPortfolioService";

export default {
  name: "PortfolioPremium",
  components: { ContatoService },

  data() {
    return {
      projetos: [],
      carregando: true,
      projetoAberto: null,
      imagemAtiva: "",
      etapas: [
        {
          icone: "magnifying-glass",
          titulo: "Descoberta",
          texto:
            "Entendemos seu negócio, suas dores e onde a tecnologia realmente resolve.",
        },
        {
          icone: "layer-group",
          titulo: "Planejamento",
          texto:
            "Protótipo visual, arquitetura técnica e um plano de entrega em fases.",
        },
        {
          icone: "robot",
          titulo: "Construção com IA",
          texto:
            "Desenvolvemos com apoio de inteligência artificial: mais rápido, com a mesma qualidade.",
        },
        {
          icone: "rocket",
          titulo: "Lançamento e suporte",
          texto:
            "Testamos, colocamos no ar e seguimos ao seu lado com suporte e melhorias.",
        },
      ],
    };
  },

  computed: {
    galeria() {
      if (!this.projetoAberto) return [];
      const todas = [
        this.projetoAberto.thumbnail,
        ...this.projetoAberto.imagens,
      ].filter(Boolean);
      return [...new Set(todas)];
    },

    itensDesafio() {
      const texto = this.projetoAberto?.desafio;
      if (!texto) return [];
      return texto
        .split("\n")
        .map((item) => item.replace(/^[-•\s]+/, "").trim())
        .filter(Boolean);
    },

    temDetalhes() {
      if (!this.projetoAberto) return false;
      return (
        this.itensDesafio.length > 0 ||
        this.projetoAberto.solucao.length > 0 ||
        this.projetoAberto.resultados.length > 0
      );
    },

    linkExterno() {
      return /^https?:\/\//.test(this.projetoAberto?.liveUrl || "");
    },
  },

  async mounted() {
    await this.carregarProjetos();
    window.addEventListener("keydown", this.aoTeclar);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.aoTeclar);
    document.body.style.overflow = "auto";
  },

  methods: {
    // Junta as duas origens do painel: projetos recentes e portfólio da agência
    async carregarProjetos() {
      const [recentes, portfolio] = await Promise.allSettled([
        recentProjectService.getPublishedProjects({ limit: 60 }),
        agencyPortfolioService.getPublishedProjects({ limit: 60 }),
      ]);

      const lista = [];

      if (recentes.status === "fulfilled") {
        lista.push(...(recentes.value?.data || []).map((item) => this.deProjetoRecente(item)));
      } else {
        console.warn("Projetos recentes indisponíveis:", recentes.reason);
      }

      if (portfolio.status === "fulfilled") {
        lista.push(...(portfolio.value?.data || []).map((item) => this.doPortfolio(item)));
      } else {
        console.warn("Portfólio da agência indisponível:", portfolio.reason);
      }

      this.projetos = lista
        .filter((projeto) => projeto.titulo)
        .sort((a, b) => a.posicao - b.posicao);
      this.carregando = false;
    },

    iniciaisDe(nome) {
      return String(nome || "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte.charAt(0).toUpperCase())
        .join("");
    },

    // Autores marcados no painel. So os perfis publicados viram link.
    montarEquipe(autores) {
      return (autores || [])
        .filter((pessoa) => pessoa && pessoa.slug && pessoa.published !== false)
        .map((pessoa) => ({
          ...pessoa,
          avatar: recentProjectService.resolveImageUrl(pessoa.avatar || ""),
        }));
    },

    // Posicao definida no painel (0 = primeiro). Sem posicao, vai para o fim.
    posicaoDe(projeto) {
      const valor = Number(projeto?.position);
      return Number.isFinite(valor) ? valor : Number.MAX_SAFE_INTEGER;
    },

    imagemCompleta(caminho) {
      return recentProjectService.resolveImageUrl(caminho || "");
    },

    // Vem de "Gerenciamento de Projetos Recentes"
    deProjetoRecente(projeto) {
      const resolver = (img) => recentProjectService.resolveImageUrl(img || "");
      return {
        id: `recente-${projeto._id}`,
        titulo: projeto.title || "",
        categoria: projeto.category || "Outros",
        cliente: projeto.client || "",
        ano: projeto.year || "",
        thumbnail: resolver(projeto.thumbnail),
        imagens: (projeto.images || []).map(resolver).filter(Boolean),
        tecnologias: projeto.technologies || [],
        resumo: (projeto.challenge || "").split("\n")[0] || "",
        desafio: projeto.challenge || "",
        solucao: Array.isArray(projeto.solution) ? projeto.solution : [],
        resultados: projeto.results || [],
        metricas: (projeto.metrics || [])
          .filter((m) => m?.value && m?.label)
          .slice(0, 2)
          .map((m) => ({ valor: m.value, rotulo: m.label })),
        liveUrl: projeto.liveUrl || "",
        destaque: false,
        posicao: this.posicaoDe(projeto),
        equipe: this.montarEquipe(projeto.authors),
      };
    },

    // Vem de "Gerenciamento de Portfólio"
    doPortfolio(projeto) {
      const resolver = (img) => recentProjectService.resolveImageUrl(img || "");
      const cliente =
        typeof projeto.client === "object" && projeto.client
          ? projeto.client.name || ""
          : projeto.client || "";

      return {
        id: `portfolio-${projeto._id}`,
        titulo: projeto.name || projeto.title || "",
        categoria: projeto.category || "Outros",
        cliente,
        ano: projeto.year || "",
        thumbnail: resolver(projeto.thumbnail || (projeto.images || [])[0]),
        imagens: (projeto.images || []).map(resolver).filter(Boolean),
        tecnologias: projeto.technologies || [],
        resumo: projeto.excerpt || projeto.description || "",
        desafio: projeto.challenge || "",
        solucao: Array.isArray(projeto.solution) ? projeto.solution : [],
        resultados: projeto.results || [],
        metricas: [],
        liveUrl: projeto.liveUrl || "",
        destaque: projeto.featured === true,
        posicao: this.posicaoDe(projeto),
        equipe: this.montarEquipe(projeto.authors),
      };
    },

    abrirProjeto(projeto) {
      this.projetoAberto = projeto;
      this.imagemAtiva = projeto.thumbnail;
      document.body.style.overflow = "hidden";
    },

    fecharProjeto() {
      this.projetoAberto = null;
      this.imagemAtiva = "";
      document.body.style.overflow = "auto";
    },

    aoTeclar(evento) {
      if (evento.key === "Escape" && this.projetoAberto) this.fecharProjeto();
    },
  },
};
</script>

<style scoped>
.portfolio-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.portfolio-hero {
  padding: 5.5rem 5% 5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 780px;
  margin: 0 auto;
}

.portfolio-hero h1 {
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

.portfolio-hero p {
  margin: 1.25rem auto 0;
  max-width: 600px;
  font-size: 1.12rem;
  line-height: 1.6;
  color: #3d4570;
}

.estado-carregando {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 4rem 1.25rem;
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

.secao-header {
  max-width: 640px;
  margin: 0 auto 2.75rem;
  text-align: center;
}

.secao-header h2 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.secao-header p {
  margin: 0.85rem 0 0;
  font-size: 1.02rem;
  color: #6b7194;
}

.etiqueta {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(12, 16, 45, 0.62);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 0.76rem;
  font-weight: 600;
  color: #fff;
}

/* Destaques */
.galeria-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}

.galeria-card:hover .galeria-media img {
  transform: scale(1.06);
}

/* Galeria */
.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  max-width: 1180px;
  margin: 0 auto;
}

.galeria-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.galeria-card:hover {
  transform: translateY(-4px);
  border-color: #d5d3f5;
  box-shadow: 0 18px 40px rgba(19, 26, 77, 0.12);
}

.galeria-media {
  position: relative;
  height: 190px;
  overflow: hidden;
}

.galeria-corpo {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.35rem;
}

.galeria-corpo h3 {
  margin: 0 0 0.5rem;
  font-size: 1.12rem;
  font-weight: 700;
  line-height: 1.3;
  color: #131a4d;
}

.galeria-corpo > p {
  margin: 0 0 1rem;
  font-size: 0.92rem;
  line-height: 1.6;
  color: #6b7194;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.galeria-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
}

.galeria-techs span {
  padding: 0.25rem 0.6rem;
  border: 1px solid #e2e1da;
  border-radius: 999px;
  font-size: 0.78rem;
  color: #4b5280;
}

.galeria-techs .mais {
  background: #f4f4f0;
  border-color: #f4f4f0;
}

.galeria-rodape {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: auto;
  padding-top: 0.9rem;
  border-top: 1px solid #f0efe9;
  font-size: 0.85rem;
  color: #9aa0b8;
}

.galeria-vazia {
  text-align: center;
  color: #6b7194;
}

/* Processo */
.processo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  max-width: 1180px;
  margin: 0 auto;
}

.processo-card {
  position: relative;
  padding: 2rem 1.6rem 1.6rem;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  background: #fbfbf9;
}

.processo-numero {
  position: absolute;
  top: 1.25rem;
  right: 1.35rem;
  font-size: 2.2rem;
  font-weight: 800;
  color: #eeede7;
  line-height: 1;
}

.processo-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  margin-bottom: 1.1rem;
  border-radius: 13px;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  font-size: 1.05rem;
}

.processo-card h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #131a4d;
}

.processo-card p {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.6;
  color: #6b7194;
}

/* Detalhes do projeto */
.projeto-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(10, 14, 40, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.projeto-painel {
  position: relative;
  width: 100%;
  max-width: 980px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 30px 80px rgba(10, 14, 40, 0.35);
}

.projeto-fechar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: rgba(12, 16, 45, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease;
}

.projeto-fechar:hover {
  background: rgba(12, 16, 45, 0.85);
}

.projeto-capa {
  position: relative;
  height: 320px;
}

.projeto-capa img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.projeto-capa::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 40, 0.25) 0%,
    rgba(10, 14, 40, 0) 40%,
    rgba(10, 14, 40, 0.9) 100%
  );
}

.projeto-capa .etiqueta {
  position: static;
  display: inline-block;
  margin-bottom: 0.75rem;
  background: rgba(255, 255, 255, 0.2);
}

.projeto-capa-texto {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.75rem;
}

.projeto-capa-texto h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: #fff;
}

.projeto-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.6rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.projeto-meta span + span::before {
  content: "•";
  margin-right: 1rem;
}

.projeto-galeria {
  display: flex;
  gap: 0.6rem;
  padding: 1rem 1.75rem 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.projeto-galeria::-webkit-scrollbar {
  display: none;
}

.projeto-miniatura {
  flex: 0 0 auto;
  width: 84px;
  height: 60px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  background: none;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s ease, border-color 0.2s ease;
}

.projeto-miniatura img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.projeto-miniatura:hover,
.projeto-miniatura.ativa {
  opacity: 1;
  border-color: #0052ff;
}

.projeto-corpo {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2.5rem;
  padding: 1.75rem;
}

.projeto-conteudo section + section {
  margin-top: 1.75rem;
}

.projeto-conteudo h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.9rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #131a4d;
}

.ponto {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.ponto.desafio {
  background: #f59e0b;
}

.ponto.solucao {
  background: #0052ff;
}

.ponto.resultado {
  background: #22c55e;
}

.projeto-conteudo ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.65rem;
}

.projeto-conteudo li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.96rem;
  line-height: 1.6;
  color: #4b5280;
}

.projeto-conteudo li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6rem;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c9c8c0;
}

.projeto-resumo {
  margin: 0;
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5280;
}

.projeto-numeros {
  display: flex;
  gap: 1.5rem;
  padding: 1.15rem;
  border: 1px solid #eeede7;
  border-radius: 14px;
  background: #fbfbf9;
}

.projeto-numero strong {
  display: block;
  font-size: 1.6rem;
  font-weight: 800;
  color: #0052ff;
}

.projeto-numero span {
  font-size: 0.8rem;
  color: #6b7194;
}

.projeto-bloco {
  margin-top: 1.5rem;
}

.projeto-bloco h4 {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0b8;
}

.projeto-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.projeto-techs span {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e2e1da;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #4b5280;
}

.projeto-equipe {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.equipe-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #e6e5df;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.equipe-item:hover {
  border-color: #c9c6f0;
  background: #faf9ff;
}

.equipe-item img,
.equipe-iniciais {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.equipe-iniciais {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
}

.equipe-texto {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.equipe-texto strong {
  font-size: 0.86rem;
  font-weight: 600;
  color: #131a4d;
}

.equipe-texto small {
  font-size: 0.74rem;
  color: #6b7194;
}

.projeto-acoes {
  display: grid;
  gap: 0.6rem;
  margin-top: 1.75rem;
}

.botao-principal,
.botao-secundario {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.25rem;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.botao-principal {
  background: #0052ff;
  color: #fff;
  box-shadow: 0 6px 18px rgba(0, 82, 255, 0.25);
}

.botao-principal:hover {
  background: #0040c9;
}

.botao-secundario {
  border: 1px solid #e2e1da;
  color: #131a4d;
}

.botao-secundario:hover {
  border-color: #7c6ef2;
  color: #0052ff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsivo */
@media (max-width: 900px) {
  .projeto-corpo {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }
}

@media (max-width: 768px) {
  .portfolio-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .portfolio-hero h1 {
    font-size: 2.05rem;
  }

  .portfolio-hero p {
    font-size: 1rem;
  }

  .secao {
    padding: 3.5rem 1.25rem;
  }

  .secao-header {
    margin-bottom: 2rem;
  }

  .secao-header h2 {
    font-size: 1.9rem;
  }

  .galeria-grid {
    grid-template-columns: 1fr;
  }

  .projeto-overlay {
    padding: 0;
  }

  .projeto-painel {
    max-height: 100vh;
    border-radius: 0;
  }

  .projeto-capa {
    height: 230px;
  }

  .projeto-capa-texto {
    padding: 1.25rem;
  }

  .projeto-capa-texto h2 {
    font-size: 1.4rem;
  }

  .projeto-galeria {
    padding: 1rem 1.25rem 0;
  }

  .projeto-corpo {
    padding: 1.25rem;
  }
}
</style>
