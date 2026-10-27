<template>
  <div class="portfolio-container">
    <h2 class="section-title">Nosso <span class="highlight">Portfólio</span></h2>

    <div v-if="carregando" class="portfolio-loading">
      <span class="spinner"></span>
      Carregando projetos...
    </div>

    <template v-else>
      <div class="carousel">
        <div class="carousel-track" ref="track" @scroll.passive="atualizarIndice">
          <article
            v-for="project in projects"
            :key="project.id"
            class="case-card"
            @click="openModal(project)"
          >
            <div
              class="case-bg"
              :style="{ backgroundImage: `url(${project.thumbnail})` }"
            ></div>

            <span class="case-tag">{{ project.category }}</span>

            <div class="case-info">
              <h3>{{ project.title }}</h3>

              <div v-if="project.metricas.length" class="case-metrics">
                <div
                  v-for="(metrica, index) in project.metricas"
                  :key="index"
                  class="metric"
                >
                  <strong>{{ metrica.valor }}</strong>
                  <span>{{ metrica.rotulo }}</span>
                </div>
              </div>

              <div v-else class="case-techs">
                <span
                  v-for="tech in project.technologies.slice(0, 3)"
                  :key="tech"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-if="podeRolar && projects.length > 1" class="carousel-dots">
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          type="button"
          class="dot"
          :class="{ active: index === indiceAtivo }"
          :aria-label="`Ir para ${project.title}`"
          @click="irPara(index)"
        ></button>
      </div>

      <div class="carousel-rodape">
        <router-link to="/portfolio" class="ver-todos">
          Ver todos os projetos
          <font-awesome-icon icon="arrow-right" />
        </router-link>
      </div>
    </template>

    <!-- Detalhes do projeto -->
    <transition name="fade">
      <div v-if="selectedProject" class="projeto-overlay" @click.self="closeModal">
        <div class="projeto-painel">
          <button class="projeto-fechar" @click="closeModal" aria-label="Fechar">
            <font-awesome-icon icon="xmark" />
          </button>

          <header class="projeto-capa">
            <img :src="imagemAtiva" :alt="selectedProject.title" />
            <div class="projeto-capa-texto">
              <span class="projeto-tag">{{ selectedProject.category }}</span>
              <h2>{{ selectedProject.title }}</h2>
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
                  <span
                    v-for="tech in selectedProject.technologies"
                    :key="tech"
                    >{{ tech }}</span
                  >
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
  </div>
</template>

<script>
import recentProjectService from "@/services/recentProjectService";

// Usados só enquanto não houver nenhum projeto publicado no painel
const PROJETOS_EXEMPLO = [
  {
    id: "exemplo-1",
    title: "Dashboard com IA para Controle de Estoque",
    category: "Website & Sistema",
    client: "TechCorp Inc.",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800"],
    technologies: ["Vue.js", "Node.js", "TensorFlow.js", "MongoDB"],
    challenge:
      "A empresa enfrentava dificuldades em manter o controle preciso de seus estoques, com erros manuais nos lançamentos e falta de previsibilidade sobre a reposição.",
    solution: [
      "Analisa os padrões de entrada e saída de produtos em tempo real.",
      "Prevê demandas futuras com base em histórico e sazonalidade.",
      "Automatiza alertas de reposição com regras inteligentes.",
    ],
    results: [
      "Redução de 70% no tempo de processos",
      "Aumento de 40% na satisfação do cliente",
      "Crescimento de 25% na retenção",
    ],
    metricas: [
      { valor: "-70%", rotulo: "Tempo gasto" },
      { valor: "+40%", rotulo: "Satisfação" },
    ],
    liveUrl: "/portfolio",
  },
  {
    id: "exemplo-2",
    title: "Instituto Educar: Educação Digital",
    category: "Plataforma Educacional",
    client: "EduTech Solutions",
    year: "2024",
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    images: ["https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"],
    technologies: ["React", "Firebase", "Stripe", "WebRTC"],
    challenge:
      "O instituto precisava modernizar a matrícula e melhorar a comunicação com pais e alunos, que dependia de processos manuais.",
    solution: [
      "Área restrita para pais e alunos com login individual.",
      "Matrícula online com upload de documentos e assinatura digital.",
      "Painel administrativo para turmas, calendários e relatórios.",
    ],
    results: [
      "85% das matrículas digitalizadas em 3 meses",
      "Redução de 60% no atendimento telefônico",
    ],
    metricas: [
      { valor: "85%", rotulo: "Matrículas digitais" },
      { valor: "-60%", rotulo: "Ligações" },
    ],
    liveUrl: "/portfolio",
  },
  {
    id: "exemplo-3",
    title: "Loja Virtual Boutique Elegance",
    category: "E-commerce",
    client: "Boutique Elegance",
    year: "2023",
    thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"],
    technologies: ["Vue.js", "Shopify", "Tailwind CSS", "Algolia"],
    challenge:
      "A marca precisava lançar sua primeira loja online com identidade refinada, navegação fluida e gestão simples de produtos.",
    solution: [
      "Layout responsivo e performance otimizada para mobile.",
      "Catálogo com controle de estoque, variações e categorias.",
      "Integração com gateway de pagamento seguro.",
    ],
    results: [
      "Primeira venda em menos de 48h após o lançamento",
      "Crescimento de 70% nas visitas orgânicas em 2 meses",
      "Redução de 50% no abandono de carrinho",
    ],
    metricas: [
      { valor: "+70%", rotulo: "Visitas orgânicas" },
      { valor: "-50%", rotulo: "Abandono" },
    ],
    liveUrl: "/portfolio",
  },
  {
    id: "exemplo-4",
    title: "Mascote Oficial do Neoblog",
    category: "Identidade Visual / Ilustração",
    client: "Neoblog",
    year: "2025",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800",
    images: ["https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800"],
    technologies: ["Adobe Photoshop"],
    challenge:
      "O Neoblog precisava de uma identidade visual única e memorável para se aproximar de um público jovem e criativo.",
    solution: [
      "Mascote exclusivo em estilo cartoon, simpático e dinâmico.",
      "Personagem pensado para várias aplicações no site e redes sociais.",
    ],
    results: [
      "Aumento do engajamento em postagens com o mascote",
      "Fortalecimento da marca visual do Neoblog",
    ],
    metricas: [
      { valor: "2025", rotulo: "Ano de criação" },
      { valor: "100%", rotulo: "Arte original" },
    ],
    liveUrl: "/portfolio",
  },
];

export default {
  name: "PortfolioSection",

  data() {
    return {
      projects: [],
      carregando: true,
      usandoExemplos: false,
      selectedProject: null,
      imagemAtiva: "",
      indiceAtivo: 0,
      podeRolar: false,
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
    await this.carregarProjetos();
    window.addEventListener("resize", this.atualizarIndice);
    window.addEventListener("keydown", this.aoTeclar);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.atualizarIndice);
    window.removeEventListener("keydown", this.aoTeclar);
    document.body.style.overflow = "auto";
  },

  methods: {
    // Busca o que foi publicado pelo painel; sem nada publicado, mostra exemplos
    async carregarProjetos() {
      try {
        const resposta = await recentProjectService.getPublishedProjects({
          limit: 12,
        });
        const lista = (resposta?.data || []).map(this.normalizar);

        if (lista.length) {
          this.projects = lista;
          this.usandoExemplos = false;
        } else {
          this.projects = PROJETOS_EXEMPLO;
          this.usandoExemplos = true;
        }
      } catch (error) {
        console.warn(
          "Não foi possível carregar os projetos do painel, usando exemplos.",
          error
        );
        this.projects = PROJETOS_EXEMPLO;
        this.usandoExemplos = true;
      } finally {
        this.carregando = false;
        this.$nextTick(this.atualizarIndice);
      }
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

    irPara(index) {
      const track = this.$refs.track;
      const card = track && track.children[index];
      if (!track || !card) return;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: "smooth",
      });
    },

    atualizarIndice() {
      const track = this.$refs.track;
      if (!track) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      this.podeRolar = maxScroll > 8;

      if (maxScroll > 0 && track.scrollLeft >= maxScroll - 2) {
        this.indiceAtivo = track.children.length - 1;
        return;
      }

      const inicio = track.scrollLeft;
      let maisProximo = 0;
      let menorDistancia = Infinity;
      Array.from(track.children).forEach((card, index) => {
        const posicao = card.offsetLeft - track.offsetLeft;
        const distancia = Math.abs(posicao - inicio);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          maisProximo = index;
        }
      });
      this.indiceAtivo = maisProximo;
    },

    aoTeclar(evento) {
      if (evento.key === "Escape" && this.selectedProject) this.closeModal();
    },

    openModal(project) {
      this.selectedProject = project;
      this.imagemAtiva = project.thumbnail;
      document.body.style.overflow = "hidden";
    },

    closeModal() {
      this.selectedProject = null;
      this.imagemAtiva = "";
      document.body.style.overflow = "auto";
    },
  },
};
</script>

<style scoped>
.portfolio-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem;
  font-family: "Inter", sans-serif;
}

.section-title {
  text-align: center;
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 2.5rem;
  color: #131a4d;
  letter-spacing: -0.02em;
}

.highlight {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.portfolio-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 0;
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

/* Carrossel de cases */
.carousel-track {
  display: flex;
  gap: 1.25rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 0.5rem 0.25rem 1.75rem;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.case-card {
  position: relative;
  flex: 0 0 320px;
  height: 430px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
  box-shadow: 0 14px 34px rgba(19, 26, 77, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.case-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 48px rgba(19, 26, 77, 0.2);
}

.case-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.case-card:hover .case-bg {
  transform: scale(1.06);
}

.case-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 14, 40, 0.4) 0%,
    rgba(10, 14, 40, 0) 32%,
    rgba(10, 14, 40, 0.55) 62%,
    rgba(10, 14, 40, 0.92) 100%
  );
}

.case-tag {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(12, 16, 45, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  font-size: 0.78rem;
  font-weight: 600;
  color: #fff;
}

.case-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 1.35rem;
}

.case-info h3 {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: #fff;
}

.case-metrics {
  display: flex;
  gap: 1.35rem;
  margin-top: 1rem;
  padding-top: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
}

.metric strong {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
}

.metric span {
  font-size: 0.74rem;
  white-space: nowrap;
  color: rgba(255, 255, 255, 0.72);
}

.case-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
  padding-top: 0.95rem;
  border-top: 1px solid rgba(255, 255, 255, 0.28);
}

.case-techs span {
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.75rem;
  color: #fff;
}

/* Indicadores */
.carousel-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.45rem;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: #d6d5cd;
  cursor: pointer;
  transition: width 0.25s ease, background 0.25s ease;
}

.dot:hover {
  background: #b9b7f0;
}

.dot.active {
  width: 26px;
  background: #0052ff;
}

.carousel-rodape {
  text-align: center;
  margin-top: 2.25rem;
}

.ver-todos {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 3px;
  border-bottom: 1px solid #c9c8c0;
  color: #131a4d;
  font-size: 0.98rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.ver-todos:hover {
  color: #0052ff;
  border-color: #0052ff;
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

.projeto-techs span {
  padding: 0.4rem 0.8rem;
  border: 1px solid #e2e1da;
  border-radius: 999px;
  font-size: 0.85rem;
  color: #4b5280;
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
  .portfolio-container {
    padding: 3.5rem 1.25rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .carousel-track {
    margin: 0 -1.25rem;
    padding: 0.5rem 1.25rem 1.5rem;
  }

  .case-card {
    flex: 0 0 84%;
    height: 400px;
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

  .projeto-numeros {
    gap: 1.25rem;
  }
}
</style>
