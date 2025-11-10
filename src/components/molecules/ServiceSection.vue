<template>
  <section class="services-section">
    <!-- Adicionando Font Awesome via CDN -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    />
    <div class="section-header">
      <h2 class="section-title">
        <span class="title-line">Nossos</span>
        <span class="title-line highlight">
          <span class="tech-text">Serviços Exclusivos</span>
          <span class="pulse-dot"></span>
        </span>
      </h2>
      <p class="section-subtitle">
        Soluções completas para impulsionar seu negócio no mundo digital
      </p>
    </div>

    <div class="services-container">
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="service.id"
          class="service-card"
          :style="{ '--accent-color': service.color }"
          @mouseenter="activeCard = index"
          @click="openServiceModal(service)"
          :ref="
            (el) => {
              if (el) serviceCards[index] = el;
            }
          "
        >
          <div
            class="card-bg"
            :style="{ backgroundImage: `url(${service.bgImage})` }"
          ></div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h3>{{ service.title }}</h3>
            <div class="card-hover-content">
              <p>{{ service.shortDescription }}</p>
              <a class="card-cta">
                Ver detalhes <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Serviço -->
    <transition name="fade">
      <div
        v-if="selectedService"
        class="service-modal"
        @click.self="closeServiceModal"
      >
        <div class="modal-content">
          <button class="close-modal" @click="closeServiceModal">
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

          <div class="modal-header">
            <div class="service-icon">
              <i :class="selectedService.icon"></i>
            </div>
            <h2>{{ selectedService.title }}</h2>
            <p class="service-category">{{ selectedService.category }}</p>
          </div>

          <div class="modal-body">
            <div class="service-description">
              <h3>Descrição do Serviço</h3>
              <p>{{ selectedService.description }}</p>

              <div class="tech-stack">
                <h3>Tecnologias Utilizadas</h3>
                <div class="tech-icons">
                  <div
                    v-for="(tech, index) in selectedService.technologies"
                    :key="index"
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
            </div>

            <div class="service-benefits">
              <h3>Benefícios</h3>
              <ul>
                <li
                  v-for="(benefit, index) in selectedService.benefits"
                  :key="index"
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
                  {{ benefit }}
                </li>
              </ul>
            </div>
          </div>

          <div class="service-cases">
            <h3>Cases de Sucesso</h3>
            <div class="cases-grid">
              <div
                v-for="(caseItem, index) in selectedService.cases"
                :key="index"
                class="case-card"
              >
                <img
                  :src="caseItem.image"
                  :alt="caseItem.title"
                  loading="lazy"
                />
                <div class="case-info">
                  <h4>{{ caseItem.title }}</h4>
                  <p>{{ caseItem.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="cta-button"
              @click="redirectToServicePage(selectedService.route)"
            >
              Quero este serviço
            </button>
            <button class="secondary-button" @click="closeServiceModal">
              Voltar para serviços
            </button>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "ServicesShowcase",
  setup() {
    const router = useRouter();
    const serviceCards = ref([]);

    const createObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      serviceCards.value.forEach((card, index) => {
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

    onBeforeUpdate(() => {
      serviceCards.value = [];
    });

    // Expondo serviceCards para o template
    const returnObject = {
      serviceCards,
      router,
    };

    // Dados e métodos que já existiam
    const activeCard = ref(null);
    const selectedService = ref(null);

    const services = [
      {
        id: 1,
        title: "Desenvolvimento Web",
        shortDescription: "Sites e aplicações web de alto desempenho",
        description:
          "Criamos websites e aplicações web modernas, responsivas e otimizadas para SEO e performance. Nossas soluções são desenvolvidas com as melhores tecnologias do mercado para garantir a melhor experiência para seus usuários.",
        category: "Tecnologia & Programação",
        icon: "https://api.iconify.design/vscode-icons:file-type-html.svg",
        color: "#3498db",
        bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        features: [
          "Responsivo",
          "Otimizado para SEO",
          "Alta performance",
          "Integração com APIs",
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js", "Node.js"],
        benefits: [
          "Aumento da visibilidade online",
          "Melhor experiência do usuário",
          "Integração com sistemas existentes",
          "Manutenção e suporte contínuo",
        ],
        cases: [
          {
            title: "Portal Corporativo",
            description: "Aumento de 200% no tráfego orgânico",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
          {
            title: "Sistema de Gestão",
            description: "Redução de 40% em processos manuais",
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          },
        ],
        route: "/ServiceWebsite",
      },
      {
        id: 2,
        title: "Aplicativos Mobile",
        shortDescription: "Apps nativos e híbridos para iOS e Android",
        description:
          "Desenvolvemos aplicativos móveis com tecnologia de ponta, garantindo performance excepcional e experiência do usuário premium. Desde o conceito até a publicação nas lojas de aplicativos.",
        category: "Tecnologia & Programação",
        icon: "https://api.iconify.design/vscode-icons:file-type-reactjs.svg",
        color: "#9b59b6",
        bgImage: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1",
        features: [
          "iOS e Android",
          "Design intuitivo",
          "Integração com APIs",
          "Publicação nas lojas",
        ],
        technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
        benefits: [
          "Acesso a recursos nativos do dispositivo",
          "Experiência do usuário premium",
          "Manutenção e atualizações",
          "Integração com sistemas existentes",
        ],
        cases: [
          {
            title: "App de Delivery",
            description: "10.000+ downloads na primeira semana",
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
          },
        ],
        route: "/DesenvolvimentoMobile",
      },
      {
        id: 3,
        title: "E-commerce",
        shortDescription: "Lojas virtuais de alto desempenho",
        description:
          "Soluções completas para e-commerce com catálogo de produtos, carrinho de compras, integração com meios de pagamento e painel administrativo completo.",
        category: "Comércio Digital",
        icon: "https://api.iconify.design/vscode-icons:file-type-shopping.svg",
        color: "#e74c3c",
        bgImage: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
        features: [
          "Checkout seguro",
          "Integração com pagamentos",
          "Gestão de estoque",
          "Relatórios de vendas",
        ],
        technologies: ["Shopify", "WooCommerce", "Magento", "React"],
        benefits: [
          "Aumento nas conversões",
          "Experiência de compra fluida",
          "Integração com marketplaces",
          "Ferramentas de análise",
        ],
        cases: [
          {
            title: "Loja de Moda",
            description: "Crescimento de 300% nas vendas",
            image:
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
          },
        ],
        route: "/ServiceEcommece",
      },
      {
        id: 4,
        title: "Landing Pages",
        shortDescription: "Conversão máxima para suas campanhas",
        description:
          "Landing pages otimizadas para conversão com design persuasivo, formulários inteligentes e integração com ferramentas de marketing.",
        category: "Marketing Digital",
        icon: "https://api.iconify.design/vscode-icons:file-type-landingpage.svg",
        color: "#2ecc71",
        bgImage: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
        features: [
          "Design persuasivo",
          "Otimizada para conversão",
          "Testes A/B",
          "Integração com CRM",
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "Vue.js"],
        benefits: [
          "Maior taxa de conversão",
          "Captação de leads qualificados",
          "Análise de desempenho",
          "Integração com campanhas",
        ],
        cases: [
          {
            title: "Campanha de Lançamento",
            description: "Conversão de 35% nos leads",
            image: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
          },
        ],
        route: "/landingpages",
      },
      {
        id: 5,
        title: "Sites Institucionais",
        shortDescription: "Presença digital profissional",
        description:
          "Websites institucionais com design moderno, conteúdo estratégico e otimizado para gerar negócios e fortalecer sua marca.",
        category: "Presença Digital",
        icon: "https://api.iconify.design/vscode-icons:file-type-js-official.svg",
        color: "#f39c12",
        bgImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
        features: [
          "Design profissional",
          "Conteúdo estratégico",
          "Integração com redes",
          "Otimização SEO",
        ],
        technologies: ["WordPress", "Vue.js", "React", "Node.js"],
        benefits: [
          "Credibilidade da marca",
          "Visibilidade online",
          "Atendimento 24/7",
          "Fácil atualização",
        ],
        cases: [
          {
            title: "Site Corporativo",
            description: "Aumento de 150% em contatos",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
        ],
        route: "/siteInstitucional",
      },
      {
        id: 6,
        title: "Sistemas Web",
        shortDescription: "Soluções personalizadas para seu negócio",
        description:
          "Desenvolvemos sistemas web sob medida para automatizar processos, melhorar a eficiência e fornecer insights valiosos para seu negócio.",
        category: "Tecnologia & Programação",
        icon: "https://api.iconify.design/vscode-icons:file-type-node.svg",
        color: "#1abc9c",
        bgImage: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
        features: [
          "Desenvolvimento customizado",
          "Painéis administrativos",
          "Relatórios personalizados",
          "Integração com APIs",
        ],
        technologies: ["Node.js", "Express", "MongoDB", "React"],
        benefits: [
          "Automatização de processos",
          "Redução de custos",
          "Tomada de decisão inteligente",
          "Escalabilidade garantida",
        ],
        cases: [
          {
            title: "Sistema de Gestão",
            description: "Redução de 60% no tempo de processos",
            image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6",
          },
        ],
        route: "/sistemasweb",
      },
      {
        id: 7,
        title: "Edição de Imagens",
        shortDescription: "Tratamento e manipulação profissional",
        description:
          "Serviços completos de edição de imagens incluindo tratamento, retoque, montagem e otimização para web e impressão.",
        category: "Design Gráfico",
        icon: "https://api.iconify.design/vscode-icons:file-type-photoshop.svg",
        color: "#e67e22",
        bgImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
        features: [
          "Tratamento profissional",
          "Rertoque fotográfico",
          "Montagens criativas",
          "Otimização para web",
        ],
        technologies: ["Photoshop", "Illustrator", "Lightroom", "Figma"],
        benefits: [
          "Imagens profissionais",
          "Consistência visual",
          "Otimização para SEO",
          "Identidade visual forte",
        ],
        cases: [
          {
            title: "Campanha Publicitária",
            description: "Aumento de 40% no engajamento",
            image:
              "https://images.unsplash.com/photo-1626785774573-4b799315345d",
          },
        ],
        route: "/EditorImagem",
      },
      {
        id: 8,
        title: "UI/UX Design",
        shortDescription: "Experiências digitais memoráveis",
        description:
          "Criamos interfaces intuitivas e experiências do usuário excepcionais que aumentam a satisfação e a conversão.",
        category: "Design Digital",
        icon: "https://api.iconify.design/vscode-icons:file-type-figma.svg",
        color: "#e84393",
        bgImage: "https://images.unsplash.com/photo-1547658719-da2b51169166",
        features: [
          "Design centrado no usuário",
          "Prototipagem interativa",
          "Testes de usabilidade",
          "Design system",
        ],
        technologies: ["Figma", "Sketch", "Adobe XD", "ProtoPie"],
        benefits: [
          "Maior satisfação do usuário",
          "Redução de custos de desenvolvimento",
          "Processos mais eficientes",
          "Identidade visual consistente",
        ],
        cases: [
          {
            title: "Redesign de Aplicativo",
            description: "Aumento de 30% na retenção",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166",
          },
        ],
        route: "/ServiceInterface",
      },
    ];

    const openServiceModal = (service) => {
      selectedService.value = service;
      document.body.style.overflow = "hidden";
    };

    const closeServiceModal = () => {
      selectedService.value = null;
      document.body.style.overflow = "auto";
    };

    const redirectToServicePage = (route) => {
      router.push(route);
      closeServiceModal();
    };

    const getTechIcon = (tech) => {
      const icons = {
        HTML5: "https://cdn.worldvectorlogo.com/logos/html-1.svg",
        CSS3: "https://cdn.worldvectorlogo.com/logos/css-3.svg",
        JavaScript: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
        "Vue.js": "https://cdn.worldvectorlogo.com/logos/vue-9.svg",
        "Node.js": "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
        React: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
        "React Native": "https://cdn.worldvectorlogo.com/logos/react-2.svg",
        Flutter: "https://cdn.worldvectorlogo.com/logos/flutter.svg",
        Swift: "https://cdn.worldvectorlogo.com/logos/swift-15.svg",
        Kotlin: "https://cdn.worldvectorlogo.com/logos/kotlin-1.svg",
        Shopify: "https://cdn.worldvectorlogo.com/logos/shopify.svg",
        WooCommerce: "https://cdn.worldvectorlogo.com/logos/woocommerce.svg",
        Magento: "https://cdn.worldvectorlogo.com/logos/magento.svg",
        WordPress: "https://cdn.worldvectorlogo.com/logos/wordpress-blue.svg",
        Express: "https://cdn.worldvectorlogo.com/logos/express-109.svg",
        MongoDB: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
        Photoshop:
          "https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg",
        Illustrator:
          "https://cdn.worldvectorlogo.com/logos/adobe-illustrator-cc-icon.svg",
        Lightroom:
          "https://cdn.worldvectorlogo.com/logos/adobe-lightroom-cc-icon.svg",
        Figma: "https://cdn.worldvectorlogo.com/logos/figma-1.svg",
        Sketch: "https://cdn.worldvectorlogo.com/logos/sketch-2.svg",
        "Adobe XD": "https://cdn.worldvectorlogo.com/logos/adobe-xd-2.svg",
        ProtoPie: "https://cdn.worldvectorlogo.com/logos/protopie.svg",
      };
      return (
        icons[tech] || "https://cdn.worldvectorlogo.com/logos/javascript-1.svg"
      );
    };

    // Combinando os retornos
    return {
      ...returnObject,
      services,
      activeCard,
      selectedService,
      openServiceModal,
      closeServiceModal,
      redirectToServicePage,
      getTechIcon,
    };
  },
};
</script>

<style scoped>
/* Estilos Base */
.services-section {
  padding: 6rem 2rem;
  position: relative;
  background: #f8fafc;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.tech-text {
  position: relative;
  display: inline-block;
}

.tech-text::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(0, 153, 221, 0.3);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #0099dd;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite;
  box-shadow: 0 0 0 4px rgba(0, 153, 221, 0.3);
}

.section-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
}

.services-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Grid de Serviços */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 420px;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    box-shadow 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 0.6s ease-out, transform 0.6s ease-out;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  background: #fff;
}

.service-card:hover {
  transform: translateY(-10px);
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
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.service-card:hover .card-bg {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  transition: background 0.4s ease;
  z-index: 2;
}

.card-content {
  position: relative;
  z-index: 3;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  color: white;
}

.service-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: transform 0.4s ease, background-color 0.4s ease;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.service-card:hover .service-icon {
  background: var(--accent-color);
  color: white;
  transform: translateY(-10px);
}

.service-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.3;
}

.card-hover-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.5s ease;
}

.service-card:hover .card-hover-content {
  max-height: 200px;
  opacity: 1;
}

.card-hover-content p {
  color: #e2e8f0;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.card-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card-cta:hover {
  color: var(--accent-color);
}

.card-cta i {
  transition: transform 0.3s ease;
}

.card-cta:hover i {
  transform: translateX(4px);
}

/* Modal de Serviço */
.service-modal {
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
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.close-modal {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  z-index: 10;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: #1e293b;
}

.close-modal svg {
  width: 24px;
  height: 24px;
}

.modal-header {
  padding: 3rem 3rem 2rem;
  text-align: center;
  position: relative;
}

.modal-header::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: var(--accent-color);
  border-radius: 2px;
}

.service-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  color: var(--accent-color);
  font-size: 1.5rem; /* Ajuste para Font Awesome */
}

.modal-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.service-category {
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 2rem 3rem;
}

.service-description {
  margin-bottom: 2rem;
}

.service-description h3,
.service-benefits h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1e293b;
  position: relative;
  padding-bottom: 0.5rem;
}

.service-description h3::after,
.service-benefits h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 3px;
}

.service-description p {
  color: #64748b;
  line-height: 1.6;
}

.tech-stack {
  margin-top: 2rem;
}

.tech-stack h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #1e293b;
  position: relative;
  padding-bottom: 0.5rem;
}

.tech-stack h3::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background: var(--accent-color);
  border-radius: 3px;
}

.tech-icons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.tech-icons > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.75rem;
  border-radius: 8px;
}

.tech-icons img {
  width: 24px;
  height: 24px;
}

.tech-icons span {
  font-size: 0.9rem;
  color: #334155;
  font-weight: 500;
}

.service-benefits ul {
  list-style: none;
  padding: 0;
}

.service-benefits li {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  color: #475569;
}

.service-benefits li svg {
  color: var(--accent-color);
  flex-shrink: 0;
  margin-top: 2px;
}

.service-cases {
  padding: 2rem 3rem;
  border-top: 1px solid #e2e8f0;
}

.service-cases h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
  text-align: center;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.case-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.case-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.case-info {
  padding: 1.5rem;
}

.case-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.case-info p {
  color: #64748b;
  font-size: 0.9rem;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem 3rem;
  border-top: 1px solid #e2e8f0;
}

.cta-button {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  text-align: center;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.secondary-button {
  background: white;
  color: var(--accent-color);
  border: 2px solid var(--accent-color);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  text-align: center;
}

.secondary-button:hover {
  background: var(--accent-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Animações */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animação de Scroll Reveal */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
}

.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsividade */
@media (max-width: 1024px) {
  .modal-body {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 4rem 1.5rem;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .modal-content {
    max-height: 95vh;
  }

  .modal-header,
  .modal-body,
  .service-cases,
  .modal-footer {
    padding: 2rem;
  }

  .modal-footer {
    flex-direction: column;
    gap: 1rem;
  }

  .cta-button,
  .secondary-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }

  .service-card {
    height: 350px;
  }

  .modal-header h2 {
    font-size: 1.75rem;
  }

  .cases-grid {
    grid-template-columns: 1fr;
  }
}
</style>
