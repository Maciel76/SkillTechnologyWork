<template>
  <section class="featured-projects">
    <div class="section-header" ref="sectionHeader">
      <h2>Projetos <span class="highlight">Recentes</span></h2>
      <p class="subtitle">Explore Nossos Projetos Desenvolvidos Recentemente</p>
    </div>

    <div class="projects-grid">
      <!-- Loop para renderizar os cards de projeto dinamicamente -->
      <article
        v-for="(project, index) in projects"
        :key="project.id"
        class="project-card"
        @click="openOverlay(project)"
        :ref="
          (el) => {
            if (el) projectCards[index] = el;
          }
        "
      >
        <div
          class="card-bg"
          :style="{ backgroundImage: `url(${project.thumbnail})` }"
        ></div>
        <div class="card-content">
          <span class="category">{{ project.category }}</span>
          <h3>{{ project.title }}</h3>
          <div class="tech-tags">
            <span
              v-for="(tech, i) in project.technologies.slice(0, 3)"
              :key="i"
              >{{ tech }}</span
            >
          </div>
          <button class="view-btn">
            Ver Detalhes
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </article>
    </div>

    <!-- Modal de Detalhes -->
    <transition name="fade">
      <div
        class="project-modal"
        v-if="selectedProject"
        @click.self="closeOverlay"
      >
        <div class="modal-content">
          <button class="close-btn" @click="closeOverlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <div class="modal-gallery">
            <div class="main-image">
              <img
                :src="selectedProject.images[0]"
                :alt="selectedProject.title"
                loading="lazy"
              />
            </div>
          </div>

          <div class="modal-details">
            <div class="details-header">
              <span class="badge">{{ selectedProject.category }}</span>
              <h2>{{ selectedProject.title }}</h2>
              <div class="meta">
                <span
                  ><strong>Cliente:</strong> {{ selectedProject.client }}</span
                >
                <span><strong>Ano:</strong> {{ selectedProject.year }}</span>
              </div>
            </div>

            <div class="details-body">
              <div class="description">
                <!-- O Desafio como lista -->
                <h3>O Desafio</h3>
                <ul class="results" v-if="challengeItems.length">
                  <li
                    v-for="(item, index) in challengeItems"
                    :key="`challenge-${index}`"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {{ item }}
                  </li>
                </ul>

                <!-- Nossa Solução como lista -->
                <h3>Nossa Solução</h3>
                <ul class="results" v-if="solutionItems.length">
                  <li
                    v-for="(item, index) in solutionItems"
                    :key="`solution-${index}`"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {{ item }}
                  </li>
                </ul>

                <!-- Resultados (mantido igual) -->
                <h3>Resultados</h3>
                <ul class="results">
                  <li v-for="(result, i) in selectedProject.results" :key="i">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {{ result }}
                  </li>
                </ul>
              </div>

              <div class="sidebar">
                <div class="tech-stack">
                  <h4>Tecnologias</h4>
                  <div class="tech-icons">
                    <div
                      v-for="(tech, i) in selectedProject.technologies"
                      :key="i"
                    >
                      <img
                        :src="getTechIcon(tech)"
                        :alt="tech"
                        :title="tech"
                        loading="lazy"
                      />
                      <span>{{ tech }}</span>
                    </div>
                  </div>
                </div>

                <div class="project-cta">
                  <a
                    v-if="selectedProject.liveUrl"
                    :href="selectedProject.liveUrl"
                    target="_blank"
                    class="live-link"
                  >
                    Ver Detalhes
                  </a>
                  <a
                    v-if="selectedProject.githubUrl"
                    :href="selectedProject.githubUrl"
                    target="_blank"
                    class="github-link"
                  >
                    Entre em Contato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { onMounted, onBeforeUpdate, ref } from "vue";
import { useRecentProjectStore } from "@/stores/recentProjectStore";

export default {
  name: "FeaturedProjects",
  setup() {
    const projectStore = useRecentProjectStore();

    // Carregar projetos publicados ao montar o componente
    onMounted(() => {
      projectStore.fetchPublishedProjects({ limit: 4 });
    });
    // Refs para os elementos que queremos animar
    const sectionHeader = ref(null);
    const projectCards = ref([]);

    // Função para criar e configurar o IntersectionObserver
    const createObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target); // Para a observação após a animação
            }
          });
        },
        {
          threshold: 0.1, // Anima quando 10% do elemento está visível
        }
      );

      // Observa o cabeçalho
      if (sectionHeader.value) {
        sectionHeader.value.classList.add("animate-on-scroll");
        observer.observe(sectionHeader.value);
      }

      // Observa cada card de projeto com um pequeno atraso na transição
      projectCards.value.forEach((card, index) => {
        if (card) {
          card.classList.add("animate-on-scroll");
          card.style.transitionDelay = `${index * 100}ms`;
          observer.observe(card);
        }
      });
    };

    onMounted(() => {
      createObserver();
    });

    // Garante que os refs dos cards sejam limpos antes de cada atualização
    onBeforeUpdate(() => {
      projectCards.value = [];
    });

    return {
      // Retorna os refs para que possam ser usados no template
      sectionHeader,
      projectCards,
      projectStore,
    };
  },
  data() {
    return {
      staticProjects: [
        {
          id: 1,
          title: "Dashboard com IA para Controle de Estoque",
          category: "Website & Sistema",
          client: "TechCorp Inc.",
          year: "2023",
          thumbnail: require("@/assets/images/banners/sistemaControle.jpg"),
          images: [
            require("@/assets/images/banners/sistemaControle.jpg"),
            require("@/assets/images/banners/sistemaControle.jpg"),
          ],
          technologies: ["Vue.js", "Node.js", "TensorFlow.js", "MongoDB"],
          challenge:
            "A empresa enfrentava dificuldades em manter o controle preciso de seus estoques, o que resultava em:\n- erros manuais nos lacamentos de dados,\n- Falta de previsibilidade sobre quando repor produtos.\n- Perdas financeiras com excesso ou falta de mercadoria.\n- Falta de integração entre os setores de vendas e logística.",
          solution: [
            "Desenvolvemos uma plataforma web com IA integrada que.",
            "--Analisa os padrões de entrada e saída de produtos em tempo real.",
            "-- Utiliza modelos de machine learning para prever demandas futuras com base em histórico, sazonalidade e comportamento de vendas.",
            "--Automatiza alertas de reposição com base em regras inteligentes personalizadas.",
            "--Gera relatórios dinâmicos com recomendações de ação.",
            "--Integra com sistemas de venda (ERP, e-commerce) para decisões mais rápidas e assertivas.",
          ],
          results: [
            "Redução de 70% no tempo de processos",
            "Aumento de 40% na satisfação do cliente",
            "Crescimento de 25% na retenção",
          ],
          liveUrl: "/portfolio/sistemas-web",
          githubUrl: "/contato",
        },
        {
          id: 2,
          title:
            "Instituto Educar: Educação Digital com Conexão entre Escola, Alunos e Pais",
          category: "Plataforma Educacional",
          client: "EduTech Solutions",
          year: "2024",
          thumbnail: require("@/assets/images/banners/institutoEducar.png"),
          images: [
            require("@/assets/images/banners/institutoEducar.png"),
            require("@/assets/images/banners/institutoEducar.png"),
          ],
          technologies: ["React", "Firebase", "Stripe", "WebRTC"],
          challenge:
            "O instituto precisava modernizar seus processos de matrícula e melhorar a comunicação com pais e alunos. As informações eram descentralizadas e o controle manual dificultava o acompanhamento pedagógico e financeiro.",
          solution:
            "Criamos uma plataforma web segura com:\n-Área restrita para pais e alunos com login individual.\n- Histórico escolar, atividades e boletins acessíveis online. \n- Notificações em tempo real e canal direto com a coordenação. \n- Sistema de matrícula online com upload de documentos, status e assinatura digital.\n- Painel administrativo para gestão de turmas, calendários e relatórios.   ",
          results: [
            "85% dos processos de matrícula digitalizados em 3 meses.",
            "Redução de 60% no volume de atendimento telefônico.",
            "Melhoria na satisfação dos pais e transparência com alunos.",
          ],
          liveUrl: "/portfolio/site-institucional",
          githubUrl: "/contato",
        },
        {
          id: 3,
          title:
            "Loja Virtual Boutique Elegance, com foco em moda feminina premium",
          category: "E-commerce",
          client: "Boutique Elegance",
          year: "2023",
          thumbnail: require("@/assets/images/banners/BoutiqueElegance.png"),
          images: [
            require("@/assets/images/banners/BoutiqueElegance.png"),
            require("@/assets/images/banners/BoutiqueElegance.png"),
          ],
          technologies: ["Vue.js", "Shopify", "Tailwind CSS", "Algolia"],
          challenge:
            "A marca precisava lançar sua primeira loja online com identidade visual refinada, navegação fluida e um processo de compra que transmitisse o valor da boutique. Além disso, era essencial que o site fosse rápido, mobile-first e com gestão simples de produtos.",
          solution:
            "Design moderno, minimalista e elegante, inspirado no estilo da boutique:\n- Layout responsivo e performance otimizada para mobile.\n- Sistema de catálogo com controle de estoque, variações e categorias inteligentes.\n- Integração com gateway de pagamento seguro\n- Painel administrativo intuitivo com relatórios de pedidos e clientes.\n- SEO otimizado e integração com redes sociais.\n- Algolia para busca rápida e precisa de produtos.",
          results: [
            "Primeira venda realizada em menos de 48h após o lançamento.",
            "Crescimento de 70% nas visitas orgânicas em 2 meses.",
            "Redução de 50% no abandono de carrinho com checkout otimizado.",
          ],
          liveUrl: "/portfolio/lojas-virtuais",
          githubUrl: "/contato",
        },
        {
          id: 4,
          title: "Mascote Oficial do Neoblog",
          category: "Identidade Visual / Ilustração",
          client: "Neoblog",
          year: "2025",
          thumbnail: require("@/assets/images/banners/neoblog.jpg"),
          images: [
            require("@/assets/images/banners/neoblog2.jpg"),
            require("@/assets/images/banners/neoblog.jpg"),
          ],
          technologies: ["Adobe Photoshop"],
          challenge:
            "O Neoblog precisava de uma identidade visual única e memorável, algo que representasse inovação, curiosidade e proximidade com o público jovem e criativo. O objetivo era criar um mascote que fosse carismático e pudesse ser utilizado em várias aplicações visuais do site e redes sociais.",
          solution:
            "Criamos um mascote exclusivo com estilo cartoon, que transmite simpatia, inteligência e dinamismo. O personagem foi pensado para interagir com os leitores do blog em:",
          results: [
            "Aumento do engajamento em postagens com o mascote.",
            "Visitantes reconhecendo e comentando sobre o personagem.",
            "Fortalecimento da marca visual do Neoblog.",
          ],
          liveUrl: "/portfolio/mascotes-personalizados",
          githubUrl: "/contato",
        },
      ],
      selectedProject: null,
    };
  },
  computed: {
    // Usar projetos da store se disponíveis, senão usa os estáticos
    projects() {
      if (this.projectStore.publishedProjects && this.projectStore.publishedProjects.length > 0) {
        return this.projectStore.publishedProjects.map(project => ({
          id: project._id || project.id,
          title: project.title,
          category: project.category,
          client: project.client,
          year: project.year,
          thumbnail: project.thumbnail,
          images: project.images,
          technologies: project.technologies,
          challenge: project.challenge,
          solution: project.solution,
          results: project.results,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
        }));
      }
      // Fallback para projetos estáticos se não houver dados da API
      return this.staticProjects;
    },
    challengeItems() {
      if (!this.selectedProject || !this.selectedProject.challenge) return [];
      // Divide a string por quebras de linha, remove itens vazios e espaços extras.
      return this.selectedProject.challenge
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
    solutionItems() {
      if (!this.selectedProject || !this.selectedProject.solution) return [];
      // Se já for um array, usa diretamente.
      if (Array.isArray(this.selectedProject.solution)) {
        return this.selectedProject.solution
          .map((item) => item.trim())
          .filter((item) => item.length > 0);
      }
      // Se for uma string, divide por quebras de linha.
      return this.selectedProject.solution
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    },
  },
  methods: {
    openOverlay(project) {
      this.selectedProject = project;
      document.body.style.overflow = "hidden";
    },
    closeOverlay() {
      this.selectedProject = null;
      document.body.style.overflow = "";
    },
    getTechIcon(tech) {
      const icons = {
        "Vue.js": "https://cdn.worldvectorlogo.com/logos/vue-9.svg",
        "Node.js": "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
        "TensorFlow.js":
          "https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg",
        MongoDB: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
        React: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
        Firebase: "https://cdn.worldvectorlogo.com/logos/firebase-1.svg",
        Stripe: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
        WebRTC: "https://cdn.worldvectorlogo.com/logos/webrtc.svg",
        "Next.js": "https://cdn.worldvectorlogo.com/logos/next-js.svg",
        Shopify: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
        "Tailwind CSS": "https://cdn.worldvectorlogo.com/logos/tailwindcss.svg",
        Algolia: "https://cdn.worldvectorlogo.com/logos/algolia-1.svg",
        Flutter: "https://cdn.worldvectorlogo.com/logos/flutter.svg",
        "Plaid API": "https://cdn.worldvectorlogo.com/logos/plaid-1.svg",
        "Adobe Photoshop":
          "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",
        "Adobe Illustrator":
          "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg",
        "Adobe After Effects":
          "https://cdn.worldvectorlogo.com/logos/after-effects-cc.svg",
      };
      return (
        icons[tech] || "https://cdn.worldvectorlogo.com/logos/javascript.svg"
      );
    },
  },
};
</script>

<style scoped>
.featured-projects {
  padding: 5rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1e293b;
  display: block;
}

.highlight {
  color: #0052ff;
  position: relative;
  z-index: 10;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(111, 221, 60, 0.3);
  z-index: -1;
  border-radius: 4px;
}

.subtitle {
  font-size: 1.1rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  display: block;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 380px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease-out,
    transform 0.6s ease-out;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.project-card:hover .card-bg {
  transform: scale(1.05);
}

.card-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.category {
  font-size: 0.8rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.5rem;
}

.project-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.tech-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.tech-tags span {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
}

.view-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: fit-content;
}

.view-btn:hover {
  background: white;
  color: #1e293b;
}

.view-btn svg {
  transition: transform 0.3s ease;
}

.view-btn:hover svg {
  transform: translateX(4px);
}

/* Modal Styles */
.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  z-index: 10;
}

.close-btn:hover {
  color: #1e293b;
}

.modal-gallery {
  padding: 2rem;
}

.main-image {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  padding: 0 2rem 2rem;
}

.badge {
  background: #6366f1;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.modal-details h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.meta {
  display: flex;
  gap: 1.5rem;
  color: #64748b;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.details-body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.description h3 {
  font-size: 1.25rem;
  margin: 1.5rem 0 1rem;
  color: #1e293b;
}

.description p {
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.results {
  list-style: none;
  padding: 0;
}

.results li {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #64748b;
}

.results li svg {
  color: #6366f1;
  flex-shrink: 0;
  margin-top: 2px;
}

.sidebar {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1.5rem;
  align-self: flex-start;
}

.tech-stack h4 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.tech-icons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tech-icons > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-icons img {
  width: 24px;
  height: 24px;
}

.tech-icons span {
  font-size: 0.9rem;
  color: #64748b;
}

.project-cta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.live-link,
.github-link {
  display: block;
  text-align: center;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.live-link {
  background: #3b82f6;
  color: white;
}

.live-link:hover {
  background: #2563eb;
}

.github-link {
  background: #1e293b;
  color: white;
}

.github-link:hover {
  background: #0f172a;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Estilos para a animação de entrada */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 1024px) {
  .details-body {
    grid-template-columns: 1fr;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .modal-gallery {
    padding: 1rem;
  }

  .main-image {
    height: 300px;
  }

  .modal-details {
    padding: 0 1rem 1rem;
  }
}

@media (max-width: 480px) {
  .featured-projects {
    padding: 3rem 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    height: 320px;
  }

  .card-content {
    padding: 1.5rem;
  }
}
</style>
