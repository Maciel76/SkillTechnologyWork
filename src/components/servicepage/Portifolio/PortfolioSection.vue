<template>
  <section class="portfolio-container" aria-labelledby="home-portfolio-title">
    <header class="portfolio-heading">
      <div>
        <h2 id="home-portfolio-title" class="section-title">Nosso portfólio</h2>
        <p>Conheça alguns dos sistemas que colocamos no ar.</p>
      </div>
      <router-link to="/portfolio" class="ver-todos">Ver todos os projetos <font-awesome-icon icon="arrow-right" /></router-link>
    </header>

    <div v-if="carregando" class="portfolio-loading" role="status">
      <span class="spinner" aria-hidden="true"></span>
      Carregando projetos…
    </div>

    <div v-else-if="projects.length" class="home-projects-grid">
      <article v-for="project in projects" :key="project.id" class="case-card" @click="openModal(project)">
        <button type="button" class="case-media" :aria-label="`Ver detalhes de ${project.title}`" @click.stop="openModal(project)">
          <img :src="project.thumbnail" :alt="project.title" loading="lazy" decoding="async" />
        </button>
        <div class="case-info">
          <div class="case-meta"><span>{{ project.category }}</span><span v-if="project.year">{{ project.year }}</span></div>
          <h3><button type="button" @click.stop="openModal(project)">{{ nomeDoProjeto(project) }}</button></h3>
          <p class="case-description">{{ resumoDoProjeto(project) }}</p>
          <div class="case-footer">
            <div v-if="project.technologies.length" class="case-techs" aria-label="Tecnologias do projeto">
              <TechnologyIcon v-for="tech in project.technologies.slice(0, 4)" :key="tech" :name="tech" />
            </div>
            <button type="button" class="case-open" :aria-label="`Conhecer o projeto ${nomeDoProjeto(project)}`" @click.stop="openModal(project)">Ver projeto <font-awesome-icon icon="arrow-right" /></button>
          </div>
        </div>
      </article>
    </div>
    <p v-else class="portfolio-empty">{{ erroProjetos ? 'Não foi possível carregar os projetos agora. Acesse o portfólio para continuar.' : 'Novos projetos serão publicados em breve.' }}</p>

    <!-- Detalhes do projeto -->
    <transition name="fade">
      <div v-if="selectedProject" class="projeto-overlay" @click.self="closeModal">
        <div ref="painelProjeto" class="projeto-painel" role="dialog" aria-modal="true" aria-labelledby="home-project-title">
          <button ref="fecharProjeto" type="button" class="projeto-fechar" @click="closeModal" aria-label="Fechar">
            <font-awesome-icon icon="xmark" />
          </button>

          <header class="projeto-capa">
            <img :src="imagemAtiva" :alt="selectedProject.title" />
            <div class="projeto-capa-texto">
              <span class="projeto-tag">{{ selectedProject.category }}</span>
              <h2 id="home-project-title">{{ selectedProject.title }}</h2>
              <p class="projeto-meta">
                <span>{{ selectedProject.client }}</span>
                <span v-if="selectedProject.year">{{
                  selectedProject.year
                }}</span>
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
              <section v-if="challengeItems.length">
                <h3><span class="ponto desafio"></span> O desafio</h3>
                <ul>
                  <li v-for="(item, i) in challengeItems" :key="`d-${i}`">
                    {{ item }}
                  </li>
                </ul>
              </section>

              <section v-if="solutionItems.length">
                <h3><span class="ponto solucao"></span> Nossa solução</h3>
                <ul>
                  <li v-for="(item, i) in solutionItems" :key="`s-${i}`">
                    {{ item }}
                  </li>
                </ul>
              </section>

              <section v-if="selectedProject.results.length">
                <h3><span class="ponto resultado"></span> Resultados</h3>
                <ul>
                  <li v-for="(item, i) in selectedProject.results" :key="`r-${i}`">
                    {{ item }}
                  </li>
                </ul>
              </section>
            </div>

            <aside class="projeto-lateral">
              <div v-if="selectedProject.metricas.length" class="projeto-numeros">
                <div
                  v-for="(metrica, i) in selectedProject.metricas"
                  :key="i"
                  class="projeto-numero"
                >
                  <strong>{{ metrica.valor }}</strong>
                  <span>{{ metrica.rotulo }}</span>
                </div>
              </div>

              <div v-if="selectedProject.technologies.length" class="projeto-bloco">
                <h4>Tecnologias</h4>
                <div class="projeto-techs">
                  <TechnologyIcon v-for="tech in selectedProject.technologies" :key="tech" :name="tech" />
                </div>
              </div>

              <div class="projeto-acoes">
                <a
                  v-if="linkExterno"
                  :href="selectedProject.liveUrl"
                  target="_blank"
                  rel="noopener"
                  class="botao-principal"
                >
                  Ver projeto no ar
                  <font-awesome-icon icon="arrow-right" />
                </a>
                <router-link
                  v-else-if="selectedProject.liveUrl"
                  :to="selectedProject.liveUrl"
                  class="botao-principal"
                  @click="closeModal"
                >
                  Ver detalhes
                  <font-awesome-icon icon="arrow-right" />
                </router-link>
                <router-link
                  to="/contato"
                  class="botao-secundario"
                  @click="closeModal"
                >
                  Quero um projeto assim
                </router-link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import recentProjectService from "@/services/recentProjectService";
import TechnologyIcon from "@/components/molecules/TechnologyIcon.vue";

export default {
  name: "PortfolioSection",
  components: { TechnologyIcon },

  data() {
    return {
      projects: [],
      carregando: true,
      erroProjetos: false,
      focoAnterior: null,
      rolagemOriginal: "",
      selectedProject: null,
      imagemAtiva: "",
    };
  },

  computed: {
    galeria() {
      if (!this.selectedProject) return [];
      const todas = [
        this.selectedProject.thumbnail,
        ...this.selectedProject.images,
      ].filter(Boolean);
      return [...new Set(todas)];
    },

    // liveUrl pode ser uma rota interna ou um site externo
    linkExterno() {
      const url = this.selectedProject?.liveUrl || "";
      return /^https?:\/\//.test(url);
    },

    challengeItems() {
      const texto = this.selectedProject?.challenge;
      if (!texto) return [];
      return texto
        .split("\n")
        .map((item) => item.replace(/^[-•\s]+/, "").trim())
        .filter((item) => item.length > 0);
    },

    solutionItems() {
      const solucao = this.selectedProject?.solution;
      if (!solucao) return [];
      const lista = Array.isArray(solucao) ? solucao : solucao.split("\n");
      return lista.map((item) => item.trim()).filter((item) => item.length > 0);
    },
  },

  async mounted() {
    this.rolagemOriginal = document.body.style.overflow;
    await this.carregarProjetos();
    window.addEventListener("keydown", this.aoTeclar);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.aoTeclar);
    document.body.style.overflow = this.rolagemOriginal;
  },

  methods: {
    async carregarProjetos() {
      try {
        const resposta = await recentProjectService.getPublishedProjects({ limit: 3 });
        this.projects = (resposta?.data || []).slice(0, 3).map(this.normalizar);
      } catch (error) {
        console.warn("Não foi possível carregar os projetos da home.", error);
        this.erroProjetos = true;
      } finally {
        this.carregando = false;
      }
    },

    nomeDoProjeto(project) {
      return String(project.title || "").split(/\s[—–-]\s/)[0];
    },

    resumoDoProjeto(project) {
      const partes = String(project.title || "").split(/\s[—–-]\s/);
      if (partes.length > 1) return partes.slice(1).join(" — ");
      const texto = String(project.challenge || "").replace(/\s+/g, " ").trim();
      return texto.length > 150 ? texto.slice(0, 147).replace(/\s+\S*$/, "") + "…" : texto;
    },

    // Converte o projeto do painel para o formato usado no card
    normalizar(project) {
      const imagens = (project.images || [])
        .map((imagem) => recentProjectService.resolveImageUrl(imagem))
        .filter(Boolean);

      const metricas = (project.metrics || [])
        .filter((metrica) => metrica?.value && metrica?.label)
        .slice(0, 2)
        .map((metrica) => ({ valor: metrica.value, rotulo: metrica.label }));

      return {
        id: project._id,
        title: project.title,
        category: project.category,
        client: project.client,
        year: project.year,
        thumbnail: recentProjectService.resolveImageUrl(project.thumbnail),
        images: imagens,
        technologies: project.technologies || [],
        challenge: project.challenge || "",
        solution: project.solution || [],
        results: project.results || [],
        metricas,
        liveUrl: project.liveUrl || "",
      };
    },

    aoTeclar(evento) {
      if (!this.selectedProject) return;
      if (evento.key === "Escape") this.closeModal();
      if (evento.key === "Tab") {
        const painel = this.$refs.painelProjeto;
        const itens = [...painel.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')].filter(item => item.getClientRects().length);
        const primeiro = itens[0], ultimo = itens[itens.length - 1];
        if (evento.shiftKey && (document.activeElement === primeiro || !painel.contains(document.activeElement))) {
          evento.preventDefault(); ultimo?.focus();
        } else if (!evento.shiftKey && (document.activeElement === ultimo || !painel.contains(document.activeElement))) {
          evento.preventDefault(); primeiro?.focus();
        }
      }
    },

    openModal(project) {
      this.focoAnterior = document.activeElement;
      this.selectedProject = project;
      this.imagemAtiva = project.thumbnail;
      document.body.style.overflow = "hidden";
      this.$nextTick(() => this.$refs.fecharProjeto?.focus());
    },

    closeModal() {
      const anterior = this.focoAnterior;
      this.selectedProject = null;
      this.imagemAtiva = "";
      document.body.style.overflow = this.rolagemOriginal;
      this.$nextTick(() => { if (anterior?.isConnected) anterior.focus({ preventScroll: true }); });
    },
  },
};
</script>

<style scoped>
.portfolio-container, .portfolio-container * { box-sizing: border-box; }
.portfolio-container { max-width: 1240px; margin: 0 auto; padding: 64px 30px 72px; font-family: "Inter", sans-serif; }
.portfolio-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 28px; margin-bottom: 28px; padding: 0; }
.section-title { margin: 0; color: #131a4d; font-size: 32px; line-height: 1.2; font-weight: 750; letter-spacing: -0.025em; }
.portfolio-heading p { margin: 10px 0 0; color: #566079; font-size: 15px; line-height: 1.6; }
.ver-todos { display: inline-flex; align-items: center; gap: 10px; flex-shrink: 0; padding: 8px 0; color: #0052ff; font-size: 14px; font-weight: 650; text-decoration: none; }
.ver-todos:hover { text-decoration: underline; text-underline-offset: 5px; }
.home-projects-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
.case-card { display: flex; flex-direction: column; min-width: 0; border: 1px solid #dde3ef; border-radius: 14px; background: #fff; cursor: pointer; transition: border-color 0.2s ease; }
.case-card:hover { border-color: #a6baf0; }
.case-media { display: block; width: 100%; aspect-ratio: 1.6; margin: 0; padding: 0; border: 0; border-bottom: 1px solid #e6eaf2; border-radius: 13px 13px 0 0; overflow: hidden; background: #f5f7fb; cursor: pointer; }
.case-media img { display: block; width: 100%; height: 100%; object-fit: contain; }
.case-info { display: flex; flex: 1; flex-direction: column; min-width: 0; padding: 20px; }
.case-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; color: #68738a; font-size: 12px; line-height: 1.4; }
.case-info h3 { margin: 0 0 8px; color: #131a4d; font-size: 22px; font-weight: 720; line-height: 1.25; letter-spacing: -0.02em; }
.case-info h3 button { padding: 0; border: 0; background: none; color: inherit; font: inherit; text-align: left; cursor: pointer; }
.case-description { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0 0 22px; color: #566079; font-size: 14px; line-height: 1.6; }
.case-footer { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-top: auto; padding-top: 16px; border-top: 1px solid #edf0f5; }
.case-techs { display: flex; align-items: center; gap: 5px; }
.case-open { display: inline-flex; align-items: center; gap: 7px; margin-left: auto; padding: 8px 0; border: 0; background: none; color: #0052ff; font: 650 13px/1.4 "Inter", sans-serif; cursor: pointer; }
.case-open svg { width: 13px; height: 13px; }
.case-media:focus-visible, .case-info h3 button:focus-visible, .case-open:focus-visible, .ver-todos:focus-visible { outline: 3px solid #0052ff; outline-offset: 4px; }
.portfolio-loading { display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 320px; color: #566079; }
.portfolio-empty { margin: 0; padding: 30px 0; color: #566079; line-height: 1.6; }
.spinner { width: 18px; height: 18px; border: 2px solid #dde3ef; border-top-color: #0052ff; border-radius: 50%; animation: girar 0.8s linear infinite; }
@keyframes girar { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .case-card { transition: none; } .spinner { animation: none; } }

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
  font-size: 1rem;
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

.projeto-capa-texto {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.75rem;
}

.projeto-tag {
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 0.78rem;
  font-weight: 600;
  color: #fff;
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

/* Galeria */
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

/* Corpo */
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

/* Lateral */
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
  letter-spacing: -0.02em;
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
  .portfolio-container { padding: 42px 20px 48px; }
  .portfolio-heading { align-items: flex-start; flex-direction: column; gap: 12px; margin-bottom: 22px; }
  .section-title { font-size: 28px; }
  .home-projects-grid { grid-template-columns: 1fr; gap: 20px; }
  .case-media { aspect-ratio: 1.7; }
  .case-info { padding: 18px; }
  .case-description { margin-bottom: 18px; }

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

  .projeto-numeros {
    gap: 1.25rem;
  }
}
</style>
