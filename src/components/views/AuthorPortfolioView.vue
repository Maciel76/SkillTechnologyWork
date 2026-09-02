<template>
  <main class="autor-pagina">
    <!-- Carregando -->
    <section v-if="carregando" class="estado-carregando">
      <span class="spinner"></span>
      Carregando perfil...
    </section>

    <!-- Perfil não encontrado -->
    <section v-else-if="erro" class="estado-vazio">
      <h1>Perfil não encontrado</h1>
      <p>{{ erro }}</p>
      <router-link to="/portfolio" class="botao-principal">
        Ver o portfólio da agência
      </router-link>
    </section>

    <template v-else-if="autor">
      <!-- Abertura -->
      <section class="autor-hero">
        <div class="hero-inner">
          <div class="hero-foto">
            <img v-if="autor.avatar" :src="autor.avatar" :alt="autor.name" />
            <span v-else>{{ iniciais }}</span>
          </div>

          <div class="hero-texto">
            <span v-if="autor.available" class="pill-disponivel">
              <i class="fas fa-circle"></i> Disponível para novos projetos
            </span>

            <h1>
              {{ primeiroNome }}
              <span v-if="sobrenome" class="gradiente">{{ sobrenome }}</span>
            </h1>

            <p v-if="autor.role" class="hero-cargo">{{ autor.role }}</p>
            <p v-if="autor.headline" class="hero-frase">{{ autor.headline }}</p>

            <ul class="hero-meta">
              <li v-if="autor.location">
                <i class="fas fa-map-marker-alt"></i> {{ autor.location }}
              </li>
              <li>
                <i class="fas fa-folder-open"></i>
                {{ projetos.length }}
                {{ projetos.length === 1 ? "projeto publicado" : "projetos publicados" }}
              </li>
              <li v-if="autor.email">
                <i class="fas fa-envelope"></i> {{ autor.email }}
              </li>
            </ul>

            <div class="hero-acoes">
              <button type="button" class="botao-principal" @click="irParaProjetos">
                Meu portfólio
                <i class="fas fa-arrow-down"></i>
              </button>

              <a
                v-if="linkWhatsapp"
                :href="linkWhatsapp"
                target="_blank"
                rel="noopener"
                class="botao-secundario"
              >
                Falar comigo
              </a>
              <router-link v-else to="/contato" class="botao-secundario">
                Falar comigo
              </router-link>
            </div>

            <div v-if="redesAtivas.length" class="hero-redes">
              <a
                v-for="rede in redesAtivas"
                :key="rede.chave"
                :href="rede.url"
                target="_blank"
                rel="noopener"
                :aria-label="rede.rotulo"
                :title="rede.rotulo"
              >
                <i :class="rede.icone"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Números de destaque -->
      <section v-if="autor.highlights && autor.highlights.length" class="faixa-numeros">
        <div class="numeros-grid">
          <div
            v-for="(item, i) in autor.highlights"
            :key="i"
            class="numero-card"
          >
            <strong>{{ item.value }}</strong>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </section>

      <!-- Sobre e habilidades -->
      <section v-if="autor.bio || temHabilidades" class="secao secao-branca">
        <div class="sobre-grid" :class="{ 'uma-coluna': !temHabilidades || !autor.bio }">
          <div v-if="autor.bio" class="sobre-texto">
            <h2>Sobre <span class="gradiente">mim</span></h2>
            <p v-for="(paragrafo, i) in paragrafosBio" :key="i">
              {{ paragrafo }}
            </p>
          </div>

          <aside v-if="temHabilidades" class="sobre-skills">
            <h3>Trabalho com</h3>
            <div class="skills-lista">
              <span v-for="(skill, i) in autor.skills" :key="i">{{ skill }}</span>
            </div>
          </aside>
        </div>
      </section>

      <!-- Projetos do autor -->
      <section ref="secaoProjetos" class="secao secao-clara secao-projetos">
        <header class="secao-header">
          <h2>Projetos <span class="gradiente">que assinei</span></h2>
          <p>
            Trabalhos publicados pela agência em que
            {{ primeiroNome }} participou da entrega.
          </p>
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
          Nenhum projeto publicado com este autor por enquanto.
        </p>
      </section>

      <!-- Detalhes do projeto -->
      <transition name="fade">
        <div
          v-if="projetoAberto"
          class="projeto-overlay"
          @click.self="fecharProjeto"
        >
          <div class="projeto-painel">
            <button
              class="projeto-fechar"
              @click="fecharProjeto"
              aria-label="Fechar"
            >
              <i class="fas fa-xmark"></i>
            </button>

            <header class="projeto-capa">
              <img :src="imagemAtiva" :alt="projetoAberto.titulo" />
              <div class="projeto-capa-texto">
                <span class="etiqueta estatica">{{ projetoAberto.categoria }}</span>
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
                  <h3><span class="ponto solucao"></span> A solução</h3>
                  <ul>
                    <li v-for="(item, i) in projetoAberto.solucao" :key="`s-${i}`">
                      {{ item }}
                    </li>
                  </ul>
                </section>

                <section v-if="projetoAberto.resultados.length">
                  <h3><span class="ponto resultado"></span> Resultados</h3>
                  <ul>
                    <li v-for="(item, i) in projetoAberto.resultados" :key="`r-${i}`">
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
                    <span v-for="tech in projetoAberto.tecnologias" :key="tech">
                      {{ tech }}
                    </span>
                  </div>
                </div>

                <div
                  v-if="projetoAberto.equipe.length > 1"
                  class="projeto-bloco"
                >
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
                      <span v-else class="equipe-iniciais">
                        {{ iniciaisDe(pessoa.name) }}
                      </span>
                      {{ pessoa.name }}
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
                    <i class="fas fa-arrow-right"></i>
                  </a>
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
    </template>
  </main>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.min.css";
import ContatoService from "../celulas/ContatoService.vue";
import authorService from "@/services/authorService";
import recentProjectService from "@/services/recentProjectService";

export default {
  name: "AuthorPortfolio",
  components: { ContatoService },

  data() {
    return {
      autor: null,
      projetos: [],
      carregando: true,
      erro: "",
      projetoAberto: null,
      imagemAtiva: "",
      rolagemCancelada: false,
      redes: [
        { chave: "github", rotulo: "GitHub", icone: "fab fa-github" },
        { chave: "linkedin", rotulo: "LinkedIn", icone: "fab fa-linkedin-in" },
        { chave: "instagram", rotulo: "Instagram", icone: "fab fa-instagram" },
        { chave: "behance", rotulo: "Behance", icone: "fab fa-behance" },
        { chave: "website", rotulo: "Site pessoal", icone: "fas fa-globe" },
      ],
    };
  },

  computed: {
    iniciais() {
      return this.iniciaisDe(this.autor?.name);
    },

    primeiroNome() {
      return String(this.autor?.name || "").trim().split(/\s+/)[0] || "";
    },

    // O restante do nome ganha o gradiente do site no título
    sobrenome() {
      const partes = String(this.autor?.name || "").trim().split(/\s+/);
      return partes.slice(1).join(" ");
    },

    paragrafosBio() {
      return String(this.autor?.bio || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
    },

    temHabilidades() {
      return Array.isArray(this.autor?.skills) && this.autor.skills.length > 0;
    },

    redesAtivas() {
      const socials = this.autor?.socials || {};
      return this.redes
        .filter((rede) => socials[rede.chave])
        .map((rede) => ({ ...rede, url: this.urlCompleta(socials[rede.chave]) }));
    },

    linkWhatsapp() {
      const numero = String(this.autor?.socials?.whatsapp || "").replace(/\D/g, "");
      return numero ? `https://wa.me/${numero}` : "";
    },

    galeria() {
      if (!this.projetoAberto) return [];
      const todas = [this.projetoAberto.thumbnail, ...this.projetoAberto.imagens];
      return [...new Set(todas.filter(Boolean))];
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

  watch: {
    // Trocar de autor pelo bloco "Time do projeto" não remonta o componente
    "$route.params.slug": {
      handler() {
        this.carregarPerfil();
      },
    },
  },

  async mounted() {
    await this.carregarPerfil();
    window.addEventListener("keydown", this.aoTeclar);
  },

  beforeUnmount() {
    window.removeEventListener("keydown", this.aoTeclar);
    document.body.style.overflow = "auto";
  },

  methods: {
    async carregarPerfil() {
      const slug = this.$route.params.slug;

      this.carregando = true;
      this.erro = "";
      this.projetoAberto = null;

      try {
        const resposta = await authorService.getProfileBySlug(slug);
        this.autor = this.montarAutor(resposta.data.author);
        this.projetos = (resposta.data.projects || []).map(this.montarProjeto);
        this.aplicarTitulo();
      } catch (error) {
        this.autor = null;
        this.projetos = [];
        this.erro = error.message || "Não foi possível carregar este perfil.";
      } finally {
        this.carregando = false;
      }
    },

    // O título da aba é montado aqui porque o SEO por rota não conhece o nome
    aplicarTitulo() {
      if (!this.autor) return;
      const cargo = this.autor.role ? ` | ${this.autor.role}` : "";
      document.title = `${this.autor.name}${cargo} | Skill Technology Work`;
    },

    iniciaisDe(nome) {
      return String(nome || "")
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((parte) => parte.charAt(0).toUpperCase())
        .join("");
    },

    // Aceita "github.com/user" sem protocolo e devolve um link clicável
    urlCompleta(valor) {
      const texto = String(valor || "").trim();
      if (!texto) return "";
      return /^https?:\/\//i.test(texto) ? texto : `https://${texto}`;
    },

    montarAutor(autor) {
      return {
        ...autor,
        avatar: authorService.resolveImageUrl(autor.avatar || ""),
        cover: authorService.resolveImageUrl(autor.cover || ""),
      };
    },

    montarProjeto(projeto) {
      const resolver = (img) => recentProjectService.resolveImageUrl(img || "");

      return {
        id: projeto._id,
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
        // Autores vêm populados da API; só os publicados viram link
        equipe: (projeto.authors || [])
          .filter((pessoa) => pessoa && pessoa.slug && pessoa.published !== false)
          .map((pessoa) => ({
            ...pessoa,
            avatar: authorService.resolveImageUrl(pessoa.avatar || ""),
          })),
      };
    },

    /**
     * Rola do topo ate a galeria. Desconta a altura do cabecalho, que e sticky
     * e cobriria o titulo da secao, e respeita quem pediu menos animacao no SO.
     */
    irParaProjetos() {
      const alvo = this.$refs.secaoProjetos;
      if (!alvo) return;

      const cabecalho = document.querySelector(".site-header");
      const recuo = cabecalho ? cabecalho.getBoundingClientRect().height : 0;
      const inicio = window.scrollY;
      const limite = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const destino = Math.min(
        Math.max(alvo.getBoundingClientRect().top + inicio - recuo - 12, 0),
        limite
      );
      const distancia = destino - inicio;

      const semAnimacao = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (semAnimacao || Math.abs(distancia) < 2) {
        window.scrollTo(0, destino);
        return;
      }

      // Animacao propria em vez de behavior:"smooth": parte dos navegadores e
      // das webviews ignora o smooth nativo, e ai o botao nao faria nada.
      const duracao = Math.min(1000, Math.max(450, Math.abs(distancia) * 0.65));
      const comeco = performance.now();

      this.rolagemCancelada = false;
      const cancelar = () => {
        this.rolagemCancelada = true;
      };
      // Se a pessoa mexer na roda ou arrastar a tela, a animacao sai do caminho
      window.addEventListener("wheel", cancelar, { passive: true, once: true });
      window.addEventListener("touchstart", cancelar, { passive: true, once: true });

      const encerrar = () => {
        window.removeEventListener("wheel", cancelar);
        window.removeEventListener("touchstart", cancelar);
      };

      const passo = (agora) => {
        if (this.rolagemCancelada) {
          encerrar();
          return;
        }

        const t = Math.min(1, (agora - comeco) / duracao);
        const suavizado =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        window.scrollTo(0, Math.round(inicio + distancia * suavizado));

        if (t < 1) {
          requestAnimationFrame(passo);
        } else {
          encerrar();
        }
      };

      requestAnimationFrame(passo);
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
      if (evento.key === "Escape") this.fecharProjeto();
    },
  },
};
</script>

<style scoped>
.autor-pagina {
  font-family: "Inter", sans-serif;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Estados */
.estado-carregando,
.estado-vazio {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 7rem 1.25rem;
  text-align: center;
  color: #6b7194;
  background: #f6f5f1;
}

.estado-carregando {
  flex-direction: row;
}

.estado-vazio h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 800;
  color: #131a4d;
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

/* Abertura */
.autor-hero {
  padding: 5rem 5% 4.5rem;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 1240px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 3.5rem;
}

.hero-foto {
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #0052ff, #7c6ef2);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.2rem;
  font-weight: 800;
  border: 6px solid #fff;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.16);
}

.hero-foto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-texto {
  min-width: 0;
}

.pill-disponivel {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.9rem;
  margin-bottom: 1rem;
  border-radius: 999px;
  background: #e7f8ef;
  color: #0f7a4f;
  font-size: 0.78rem;
  font-weight: 600;
}

.pill-disponivel i {
  font-size: 0.5rem;
}

.autor-hero h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.hero-cargo {
  margin: 0.65rem 0 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #0052ff;
}

.hero-frase {
  margin: 0.85rem 0 0;
  max-width: 560px;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #3d4570;
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
  color: #6b7194;
}

.hero-meta i {
  margin-right: 0.4rem;
  color: #7c6ef2;
}

.hero-acoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.85rem;
}

.botao-principal,
.botao-secundario {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  padding: 0.85rem 1.7rem;
  border: none;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.botao-principal {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  color: #fff;
  box-shadow: 0 12px 28px rgba(0, 82, 255, 0.28);
}

.botao-principal:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(0, 82, 255, 0.36);
}

.botao-secundario {
  background: #fff;
  color: #131a4d;
  border: 1px solid #e6e5df;
}

.botao-secundario:hover {
  border-color: #c9c6f0;
  transform: translateY(-2px);
}

.hero-redes {
  display: flex;
  gap: 0.6rem;
  margin-top: 1.6rem;
}

.hero-redes a {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e6e5df;
  color: #131a4d;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.25s ease;
}

.hero-redes a:hover {
  color: #0052ff;
  border-color: #c9c6f0;
  transform: translateY(-3px);
}

/* Números */
.faixa-numeros {
  padding: 0 5%;
  margin-top: -2.5rem;
}

.numeros-grid {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.25rem;
}

.numero-card {
  background: #fff;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  padding: 1.5rem 1.25rem;
  text-align: center;
  box-shadow: 0 14px 34px rgba(19, 26, 77, 0.08);
}

.numero-card strong {
  display: block;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.numero-card span {
  display: block;
  margin-top: 0.35rem;
  font-size: 0.88rem;
  color: #6b7194;
}

/* Seções */
.secao {
  padding: 5rem 5%;
}

/* A galeria usa a faixa inteira; as demais seções seguem o respiro do site */
.secao-projetos {
  padding-left: 3%;
  padding-right: 3%;
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

/* Sobre */
.sobre-grid {
  max-width: 1240px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 1fr);
  gap: 3.5rem;
  align-items: start;
}

/*
 * Sem habilidades (ou sem bio) o grid de duas colunas deixava metade da secao
 * vazia. Nesse caso o conteudo passa a ocupar a linha inteira, centralizado.
 */
.sobre-grid.uma-coluna {
  grid-template-columns: minmax(0, 1fr);
  max-width: 900px;
}

.sobre-grid.uma-coluna .sobre-texto h2 {
  text-align: center;
}

.sobre-grid.uma-coluna .sobre-texto p {
  font-size: 1.06rem;
}

.sobre-texto h2 {
  margin: 0 0 1.25rem;
  font-size: 2.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.sobre-texto p {
  margin: 0 0 1rem;
  font-size: 1.02rem;
  line-height: 1.75;
  color: #3d4570;
}

.sobre-skills h3 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #131a4d;
}

.skills-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skills-lista span {
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: #f1f0ff;
  border: 1px solid #e3e1fb;
  font-size: 0.85rem;
  font-weight: 500;
  color: #3b3a8f;
}

/* Galeria de projetos: usa a largura util da pagina toda */
.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
  gap: 1.75rem;
  width: 100%;
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

.etiqueta.estatica {
  position: static;
  display: inline-block;
  margin-bottom: 0.6rem;
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
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.galeria-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.galeria-techs span {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: #f1f0ff;
  font-size: 0.74rem;
  font-weight: 500;
  color: #3b3a8f;
}

.galeria-techs .mais {
  background: #f1f1ee;
  color: #6b7194;
}

.galeria-rodape {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: 0.9rem;
  border-top: 1px solid #f0efe9;
  font-size: 0.82rem;
  color: #6b7194;
}

.galeria-vazia {
  text-align: center;
  color: #6b7194;
}

/* Detalhes do projeto */
.projeto-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(10, 14, 40, 0.62);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.25rem;
  overflow-y: auto;
}

.projeto-painel {
  position: relative;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 30px 80px rgba(10, 14, 40, 0.35);
}

.projeto-fechar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #131a4d;
  cursor: pointer;
  font-size: 1rem;
}

.projeto-capa {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.projeto-capa img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projeto-capa-texto {
  position: absolute;
  inset: auto 0 0 0;
  padding: 2rem 2.25rem 1.5rem;
  background: linear-gradient(transparent, rgba(10, 14, 40, 0.88));
  color: #fff;
}

.projeto-capa-texto h2 {
  margin: 0;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.projeto-meta {
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 0;
  font-size: 0.88rem;
  opacity: 0.85;
}

.projeto-galeria {
  display: flex;
  gap: 0.6rem;
  padding: 1rem 2.25rem 0;
  overflow-x: auto;
}

.projeto-miniatura {
  width: 84px;
  height: 60px;
  flex-shrink: 0;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background: none;
}

.projeto-miniatura.ativa {
  border-color: #0052ff;
}

.projeto-miniatura img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.projeto-corpo {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2.5rem;
  padding: 2rem 2.25rem 2.5rem;
}

.projeto-conteudo section {
  margin-bottom: 1.75rem;
}

.projeto-conteudo h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0 0 0.85rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #131a4d;
}

.ponto {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.ponto.desafio {
  background: #f59e0b;
}

.ponto.solucao {
  background: #0052ff;
}

.ponto.resultado {
  background: #10b981;
}

.projeto-conteudo ul {
  margin: 0;
  padding-left: 1.15rem;
  color: #3d4570;
  line-height: 1.75;
  font-size: 0.95rem;
}

.projeto-resumo {
  margin: 0;
  color: #3d4570;
  line-height: 1.7;
}

.projeto-numeros {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.projeto-numero {
  padding: 1rem;
  border-radius: 14px;
  background: #f6f5f1;
  text-align: center;
}

.projeto-numero strong {
  display: block;
  font-size: 1.3rem;
  font-weight: 800;
  color: #0052ff;
}

.projeto-numero span {
  font-size: 0.78rem;
  color: #6b7194;
}

.projeto-bloco {
  margin-bottom: 1.5rem;
}

.projeto-bloco h4 {
  margin: 0 0 0.75rem;
  font-size: 0.92rem;
  font-weight: 700;
  color: #131a4d;
}

.projeto-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.projeto-techs span {
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  background: #f1f0ff;
  font-size: 0.76rem;
  color: #3b3a8f;
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
  font-size: 0.86rem;
  font-weight: 500;
  color: #131a4d;
  text-decoration: none;
  transition: all 0.2s ease;
}

.equipe-item:hover {
  border-color: #c9c6f0;
  background: #faf9ff;
}

.equipe-item img,
.equipe-iniciais {
  width: 30px;
  height: 30px;
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

.projeto-acoes {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.projeto-acoes .botao-principal,
.projeto-acoes .botao-secundario {
  width: 100%;
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
  .hero-inner {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .hero-meta,
  .hero-acoes,
  .hero-redes {
    justify-content: center;
  }

  .hero-frase {
    margin-left: auto;
    margin-right: auto;
  }

  .sobre-grid,
  .projeto-corpo {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .autor-hero {
    padding: 3.5rem 5% 3.5rem;
  }

  .autor-hero h1 {
    font-size: 2.2rem;
  }

  .hero-foto {
    width: 140px;
    height: 140px;
    font-size: 2.4rem;
  }

  .secao {
    padding: 3.5rem 5%;
  }

  .secao-header h2 {
    font-size: 1.9rem;
  }

  .projeto-capa {
    height: 200px;
  }

  .projeto-capa-texto {
    padding: 1.5rem 1.25rem 1.1rem;
  }

  .projeto-capa-texto h2 {
    font-size: 1.4rem;
  }

  .projeto-galeria,
  .projeto-corpo {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
}
</style>
