<template>
  <section class="services-section">
    <div class="section-container">
      <div class="section-header">
        <h2 class="section-title">
          Soluções Digitais que
          <span class="highlight">Impulsionam o Crescimento</span>
        </h2>
        <p class="section-subtitle">
          Criamos tecnologia sob medida para transformar desafios em
          oportunidades e gerar resultados reais para o seu negócio.
        </p>
      </div>

      <div class="services-grid">
        <div
          class="service-card"
          v-for="(service, index) in services"
          :key="index"
          :style="{ '--card-color': service.color }"
        >
          <div class="card-icon">
            <div
              class="icon-img"
              :style="{
                maskImage: `url(${service.icon})`,
                WebkitMaskImage: `url(${service.icon})`,
              }"
            ></div>
          </div>
          <h3 class="card-title">{{ service.title }}</h3>
          <p class="card-description">{{ service.description }}</p>
          <div class="card-features">
            <div
              class="feature-item"
              v-for="(feature, fIndex) in service.features"
              :key="fIndex"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17L4 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>{{ feature }}</span>
            </div>
          </div>
          <div class="card-actions">
            <router-link :to="service.path" class="learn-more">
              <span>Saiba mais</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesPage",
  data() {
    return {
      services: [
        {
          icon: "https://api.iconify.design/heroicons:globe-alt.svg",
          title: "Sistemas Web",
          description:
            "Sistemas personalizados para automatizar operações, dashboards interativos e plataformas SaaS completas.",
          features: [
            "Dashboards e relatórios interativos",
            "Integração com IAs avançadas",
            "Automação de processos internos",
            "APIs próprias e integração com terceiros",
            "Acesso por níveis de usuário",
          ],
          color: "#3B82F6",
          path: "/servicos/desenvolvimento-websites",
        },
        {
          icon: "https://api.iconify.design/heroicons:computer-desktop.svg",
          title: "Sites & Landing Pages",
          description:
            "Sites responsivos, otimizados para SEO e com design que converte visitantes em clientes.",
          features: [
            "Design responsivo e moderno",
            "SEO técnico e estratégico",
            "Performance otimizada (Core Web Vitals)",
            "Integração com analytics e CRM",
            "Landing pages de alta conversão",
          ],
          color: "#0099DD",
          path: "/servicos/desenvolvimento-websites",
        },
        {
          icon: "https://api.iconify.design/heroicons:device-phone-mobile.svg",
          title: "Apps Mobile",
          description:
            "Aplicativos nativos e híbridos para Android e iOS que encantam o usuário.",
          features: [
            "Apps Android e iOS sob medida",
            "Interface intuitiva e fluida",
            "Notificações inteligentes",
            "Integração com APIs e backend",
            "Performance otimizada para mobile",
          ],
          color: "#10B981",
          path: "/servicos/midia-social",
        },
        {
          icon: "https://api.iconify.design/heroicons:shopping-cart-16-solid.svg",
          title: "E-commerce",
          description:
            "Lojas virtuais completas com checkout otimizado, gestão de estoque e pagamento integrado.",
          features: [
            "Catálogo de produtos e variações",
            "Checkout otimizado para conversão",
            "Integração com gateways de pagamento",
            "Gestão de pedidos e estoque",
            "Relatórios de vendas e desempenho",
          ],
          color: "#8B5CF6",
          path: "/servicos/lojas-virtuais",
        },
        {
          icon: "https://api.iconify.design/heroicons:cpu-chip.svg",
          title: "Automação com IA",
          description:
            "Automatize tarefas repetitivas e processos manuais com inteligência artificial de ponta.",
          features: [
            "Chatbots e atendimento inteligente",
            "Geração de conteúdo por IA",
            "Análise preditiva de dados",
            "Automação de workflows",
            "Integração com ChatGPT, Claude e outras IAs",
          ],
          color: "#F59E0B",
          path: "/portfolio/sistemas-web",
        },
        {
          icon: "https://api.iconify.design/heroicons:arrows-right-left.svg",
          title: "Integração de APIs",
          description:
            "Conectamos seus sistemas existentes, ERPs, CRMs e ferramentas externas em um fluxo único.",
          features: [
            "Integração com ERPs e CRMs",
            "APIs RESTful personalizadas",
            "Webhooks e microserviços",
            "Sincronização de dados em tempo real",
            "Documentação técnica completa",
          ],
          color: "#EC4899",
          path: "/portfolio/sistemas-web",
        },
        {
          icon: "https://api.iconify.design/heroicons:academic-cap.svg",
          title: "Consultoria Tech",
          description:
            "Analisamos seu negócio e desenhamos a melhor solução tecnológica para seus objetivos.",
          features: [
            "Análise do cenário atual",
            "Planejamento de arquitetura",
            "Seleção de tecnologias ideais",
            "Roadmap de implementação",
            "Consultoria contínua",
          ],
          color: "#EF4444",
          path: "/contato",
        },
        {
          icon: "https://api.iconify.design/heroicons:wrench-screwdriver.svg",
          title: "Manutenção & Suporte",
          description:
            "Mantemos seu sistema atualizado, seguro e funcionando com performance máxima.",
          features: [
            "Monitoramento contínuo",
            "Atualizações de segurança",
            "Correção de bugs e melhorias",
            "Backups automáticos",
            "Suporte técnico prioritário",
          ],
          color: "#6366F1",
          path: "/contato",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos Base */
.services-section {
  padding: 6rem 1rem;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  position: relative;
  overflow: hidden;
}

[data-theme="dark"] .services-section {
  background: linear-gradient(to bottom, #1e293b 0%, #0f172a 100%);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Cabeçalho */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  display: block; /* Garante que o container se comporte como um bloco */
}

.section-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #1e293b;
}
[data-theme="dark"] .section-title {
  color: #f8fafc;
}

[data-theme="dark"] .section-title {
  color: #f8fafc;
}

.highlight {
  color: #0052ff;
  position: relative;
}

.highlight::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 8px;
  background: rgba(168, 28, 161, 0.2);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.section-subtitle {
  font-size: 1.25rem;
  color: #64748b;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

[data-theme="dark"] .section-subtitle {
  color: #94a3b8;
}

/* Grid de Serviços */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Cards de Serviços */
.service-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
}

[data-theme="dark"] .service-card {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.05);
}

.service-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--card-color);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.card-icon {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.icon-img {
  width: 48px;
  height: 48px;
  background-color: var(--card-color);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  color: #1e293b;
}

[data-theme="dark"] .card-title {
  color: #f8fafc;
}

.card-description {
  color: #64748b;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.6;
  min-height: 60px;
}

[data-theme="dark"] .card-description {
  color: #94a3b8;
}

.card-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #475569;
  font-size: 0.95rem;
}

[data-theme="dark"] .feature-item {
  color: #cbd5e1;
}

.feature-item svg {
  flex-shrink: 0;
  color: var(--card-color);
}

.card-actions {
  text-align: center;
}

.learn-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--card-color);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.learn-more:hover {
  gap: 0.75rem;
}

.learn-more svg {
  transition: transform 0.3s ease;
}

.learn-more:hover svg {
  transform: translateX(3px);
}

/* Rodapé da Seção */
.section-footer {
  text-align: center;
  padding-top: 3rem;
}

.cta-button {
  background: #0052ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 82, 255, 0.3);
}

.cta-button:hover {
  background: #0046d9;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px -1px rgba(0, 82, 255, 0.4);
}

.cta-button svg {
  transition: transform 0.3s ease;
}

.cta-button:hover svg {
  transform: rotate(-45deg);
}

/* Responsividade */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 4rem 1rem;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .service-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.8rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .cta-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
