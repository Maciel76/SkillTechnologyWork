<template>
  <div class="pricing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Soluções Digitais</span>
            <span class="title-line highlight">
              <span class="tech-text">Sob Medida</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Planos flexíveis para impulsionar seu negócio no mundo digital
          </p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToPricing">
              Ver Planos
            </button>
            <router-link to="/contato" class="cta-button secondary">
              Fale Conosco
            </router-link>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-abstract">
            <div class="abstract-grid">
              <div class="grid-item" v-for="(service, index) in services" :key="index"
                :class="{ active: currentServiceIndex === index }"
                @click="selectService(index)">
                <img :src="service.icon" :alt="service.name" class="grid-icon" />
                <span>{{ service.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Explore nossos serviços</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- Services Showcase -->
    <section class="services-section">
      <h2 class="section-title">
        <span class="title-part">Nossos</span>
        <span class="title-part highlight">Serviços</span>
      </h2>
      <p class="section-subtitle">
        Soluções completas para cada etapa do seu projeto digital
      </p>

      <div class="services-grid">
        <div
          class="service-card"
          v-for="(service, index) in services"
          :key="index"
          @mouseenter="hoverService(index)"
        >
          <div class="service-icon">
            <img :src="service.icon" :alt="service.name" />
          </div>
          <h3>{{ service.name }}</h3>
          <p>{{ service.shortDescription }}</p>
          <div class="service-hover" :class="{ active: activeHover === index }">
            <div class="hover-content">
              <h4>Projetos Recentes</h4>
              <div class="mini-gallery">
                <div
                  class="mini-screen"
                  v-for="(screen, sIndex) in service.screens"
                  :key="sIndex"
                  :style="{ 'background-image': `url(${screen})` }"
                ></div>
              </div>
              <button class="view-button" @click="selectService(index)">
                Ver Planos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Plans -->
    <section class="pricing-section" id="pricing">
      <div class="pricing-header">
        <h2 class="section-title">
          <span class="title-part">Planos &</span>
          <span class="title-part highlight">Investimento</span>
        </h2>
        <p class="section-subtitle">
          Escolha o pacote perfeito para suas necessidades
        </p>

        <div class="billing-toggle">
          <span>Mensal</span>
          <label class="switch">
            <input type="checkbox" v-model="annualBilling" />
            <span class="slider round"></span>
          </label>
          <span>Anual <span class="discount-badge">20% OFF</span></span>
        </div>
      </div>

      <div class="pricing-tabs">
        <button
          v-for="(service, index) in services"
          :key="index"
          @click="selectService(index)"
          :class="{ active: currentServiceIndex === index }"
        >
          {{ service.name }}
        </button>
      </div>

      <div class="pricing-grid">
        <div
          class="plan-card"
          v-for="(plan, index) in currentService.plans"
          :key="index"
          :class="{ featured: plan.featured }"
        >
          <div class="plan-badge" v-if="plan.featured">Mais Popular</div>
          <div class="plan-header">
            <h3>{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="amount">{{
                annualBilling ? plan.annualPrice : plan.monthlyPrice
              }}</span>
              <span class="period">{{ annualBilling ? "/ano" : "/mês" }}</span>
            </div>
            <p class="plan-description">{{ plan.description }}</p>
          </div>
          <div class="plan-features">
            <div
              class="feature-item"
              v-for="(feature, fIndex) in plan.features"
              :key="fIndex"
            >
              <img
                src="https://api.iconify.design/heroicons:check-circle-20-solid.svg"
                alt="Incluído"
              />
              <span>{{ feature }}</span>
            </div>
          </div>
          <button class="cta-button" @click="openContactModal(plan)">
            Contratar
          </button>
          <div class="plan-savings" v-if="annualBilling && plan.annualSavings">
            Economize {{ plan.annualSavings }} no plano anual
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <h2 class="section-title">
        <span class="title-part">O Que Dizem</span>
        <span class="title-part highlight">Nossos Clientes</span>
      </h2>

      <div class="testimonials-slider">
        <div
          class="testimonial-card"
          v-for="(testimonial, index) in testimonials"
          :key="index"
        >
          <div class="client-rating">
            <span v-for="star in 5" :key="star">★</span>
          </div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="client-info">
            <div
              class="client-avatar"
              :style="{ 'background-image': `url(${testimonial.avatar})` }"
            ></div>
            <div class="client-details">
              <h3>{{ testimonial.name }}</h3>
              <span>{{ testimonial.company }}</span>
              <div class="client-project">
                <img
                  :src="testimonial.projectIcon"
                  :alt="testimonial.projectType"
                />
                <span>{{ testimonial.projectType }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <h2 class="section-title">
        <span class="title-part">Perguntas</span>
        <span class="title-part highlight">Frequentes</span>
      </h2>

      <div class="faq-grid">
        <div
          class="faq-item"
          v-for="(faq, index) in faqs"
          :key="index"
          @click="toggleFaq(index)"
        >
          <div class="faq-question">
            <h3>{{ faq.question }}</h3>
            <span class="faq-toggle">{{
              activeFaq === index ? "−" : "+"
            }}</span>
          </div>
          <div class="faq-answer" :class="{ active: activeFaq === index }">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <!-- <section class="contact-section" id="contact">
      <div class="contact-container">
        <div class="contact-text">
          <h2>Pronto para Transformar Sua Ideia em Realidade?</h2>
          <p>
            Entre em contato para uma consultoria gratuita e descubra como
            podemos ajudar seu negócio a crescer no mundo digital.
          </p>
          <div class="contact-methods">
            <a href="mailto:contato@exemplo.com" class="contact-method">
              <span class="icon">✉️</span>
              contato@exemplo.com
            </a>
            <a href="tel:+5511999999999" class="contact-method">
              <span class="icon">📞</span>
              (11) 99999-9999
            </a>
            <a href="https://wa.me/5511999999999" class="contact-method">
              <span class="icon">💬</span>
              WhatsApp
            </a>
          </div>
        </div>
        <div class="contact-form">
          <h3>Ou nos envie uma mensagem</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input
                type="text"
                v-model="form.name"
                placeholder="Seu nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="form.email"
                placeholder="Seu e-mail"
                required
              />
            </div>
            <div class="form-group">
              <select v-model="form.service" required>
                <option value="" disabled selected>Serviço de interesse</option>
                <option
                  v-for="(service, index) in services"
                  :key="index"
                  :value="service.name"
                >
                  {{ service.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                v-model="form.message"
                placeholder="Conte-nos sobre seu projeto"
                required
              ></textarea>
            </div>
            <button type="submit" class="submit-button">Enviar Mensagem</button>
          </form>
        </div>
      </div>
    </section> -->
    <ContatoService />

    <!-- Contact Modal -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">×</button>
        <div class="modal-header">
          <h2>Solicitar {{ selectedPlan.name }}</h2>
          <p class="plan-price">
            {{
              annualBilling
                ? selectedPlan.annualPrice
                : selectedPlan.monthlyPrice
            }}
            <span>{{ annualBilling ? "/ano" : "/mês" }}</span>
          </p>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitPlanRequest">
            <div class="form-group">
              <input
                type="text"
                v-model="planForm.name"
                placeholder="Seu nome"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                v-model="planForm.email"
                placeholder="Seu e-mail"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="tel"
                v-model="planForm.phone"
                placeholder="Seu telefone"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                v-model="planForm.message"
                placeholder="Alguma informação adicional sobre seu projeto"
              ></textarea>
            </div>
            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Enviando..." : "Enviar Solicitação" }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Animation Modal -->
    <div
      class="success-modal-overlay"
      v-if="showSuccess"
      @click="closeSuccessModal"
    >
      <div class="success-modal-content">
        <div class="success-checkmark">
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            <circle
              class="checkmark-circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />
            <path
              class="checkmark-check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        <h2 class="success-title">Solicitação Enviada com Sucesso!</h2>
        <p class="success-message">
          Obrigado pelo seu interesse! Entraremos em contato em breve para
          discutir os detalhes do seu projeto.
        </p>
        <button class="success-button" @click="closeSuccessModal">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ContatoService from "./ContatoService.vue";
export default {
  name: "PremiumPricingPage",
  components: { ContatoService },
  data() {
    return {
      currentServiceIndex: 0,
      activeHover: null,
      activeFaq: null,
      annualBilling: false,
      showModal: false,
      showSuccess: false,
      isSubmitting: false,
      selectedPlan: null,
      form: {
        name: "",
        email: "",
        service: "",
        message: "",
      },
      planForm: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      services: [
        {
          name: "Sistemas Web & Automações",
          shortDescription:
            "Sistemas personalizados, dashboards, ERPs e automações inteligentes",
          icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
          screens: [],
          plans: [
            {
              name: "Sistema Básico",
              description: "Sistema web sob medida para pequenos negócios",
              monthlyPrice: "R$ 1.500",
              annualPrice: "R$ 14.400",
              annualSavings: "R$ 3.600",
              features: [
                "Até 5 módulos",
                "Painel administrativo",
                "Banco de dados",
                "Integração com 1 API",
                "Suporte por 3 meses",
                "Hospedagem por 1 ano",
              ],
              featured: false,
            },
            {
              name: "Sistema Profissional",
              description: "Solução completa com IA integrada",
              monthlyPrice: "R$ 3.000",
              annualPrice: "R$ 28.800",
              annualSavings: "R$ 7.200",
              features: [
                "Módulos ilimitados",
                "Integração com IA (ChatGPT/Claude)",
                "Dashboard com relatórios",
                "Até 5 integrações API",
                "Automação de processos",
                "Suporte prioritário 6 meses",
              ],
              featured: true,
            },
            {
              name: "Sistema Enterprise",
              description: "Solução corporativa escalável e robusta",
              monthlyPrice: "R$ 5.500",
              annualPrice: "R$ 52.800",
              annualSavings: "R$ 13.200",
              features: [
                "Arquitetura escalável",
                "Múltiplas integrações IA",
                "Multi-tenant / Multi-usuário",
                "Suporte 24/7",
                "Treinamento da equipe",
                "SLA garantido",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Sites & Landing Pages",
          shortDescription:
            "Sites institucionais, landing pages e portais corporativos",
          icon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
          screens: [],
          plans: [
            {
              name: "Site Institucional",
              description: "Presença online profissional",
              monthlyPrice: "R$ 800",
              annualPrice: "R$ 7.680",
              annualSavings: "R$ 1.920",
              features: [
                "Design responsivo",
                "Até 5 páginas",
                "Formulário de contato",
                "SEO básico",
                "Hospedagem por 1 ano",
                "Suporte por 3 meses",
              ],
              featured: false,
            },
            {
              name: "Site Profissional",
              description: "Site completo com CMS e analytics",
              monthlyPrice: "R$ 1.500",
              annualPrice: "R$ 14.400",
              annualSavings: "R$ 3.600",
              features: [
                "Design exclusivo",
                "Páginas ilimitadas",
                "CMS para edição",
                "SEO avançado",
                "Analytics integrado",
                "Suporte por 6 meses",
              ],
              featured: true,
            },
            {
              name: "Landing Premium",
              description: "Página de alta conversão para campanhas",
              monthlyPrice: "R$ 1.200",
              annualPrice: "R$ 11.520",
              annualSavings: "R$ 2.880",
              features: [
                "Design focado em conversão",
                "Testes A/B",
                "Integração com CRM",
                "CTAs estratégicos",
                "Analytics avançado",
                "Otimização contínua",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Aplicativos Mobile",
          shortDescription: "Apps nativos e híbridos para iOS e Android",
          icon: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
          screens: [],
          plans: [
            {
              name: "App MVP",
              description: "MVP para validar sua ideia rapidamente",
              monthlyPrice: "R$ 2.800",
              annualPrice: "R$ 26.880",
              annualSavings: "R$ 6.720",
              features: [
                "Design UI/UX",
                "Até 5 funcionalidades",
                "Publicação nas lojas",
                "Backend básico",
                "Notificações push",
                "Suporte por 3 meses",
              ],
              featured: false,
            },
            {
              name: "App Completo",
              description: "Solução robusta para seu negócio",
              monthlyPrice: "R$ 4.500",
              annualPrice: "R$ 43.200",
              annualSavings: "R$ 10.800",
              features: [
                "Design premium",
                "Backend completo",
                "Integração com APIs",
                "Analytics integrado",
                "Atualizações mensais",
                "Suporte prioritário 6 meses",
              ],
              featured: true,
            },
            {
              name: "App Enterprise",
              description: "Solução corporativa personalizada",
              monthlyPrice: "R$ 7.000",
              annualPrice: "R$ 67.200",
              annualSavings: "R$ 16.800",
              features: [
                "Sistema completo",
                "Integração com ERP/CRM",
                "Autenticação avançada",
                "Multi-plataforma",
                "Suporte 24/7",
                "Treinamento da equipe",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Lojas Virtuais",
          shortDescription: "E-commerce completo para vender online",
          icon: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
          screens: [],
          plans: [
            {
              name: "Loja Starter",
              description: "E-commerce para começar a vender",
              monthlyPrice: "R$ 1.800",
              annualPrice: "R$ 17.280",
              annualSavings: "R$ 4.320",
              features: [
                "Até 100 produtos",
                "Checkout otimizado",
                "1 gateway de pagamento",
                "Gestão de pedidos",
                "Design responsivo",
                "Suporte por 3 meses",
              ],
              featured: false,
            },
            {
              name: "Loja Profissional",
              description: "E-commerce completo para crescer",
              monthlyPrice: "R$ 3.200",
              annualPrice: "R$ 30.720",
              annualSavings: "R$ 7.680",
              features: [
                "Produtos ilimitados",
                "Múltiplos pagamentos",
                "Gestão de estoque",
                "Cupons e promoções",
                "Relatórios de vendas",
                "Suporte 6 meses",
              ],
              featured: true,
            },
            {
              name: "Loja Enterprise",
              description: "Marketplace ou e-commerce corporativo",
              monthlyPrice: "R$ 5.500",
              annualPrice: "R$ 52.800",
              annualSavings: "R$ 13.200",
              features: [
                "Multi-vendedor / Marketplace",
                "Integração com ERPs",
                "Logística integrada",
                "IA para recomendações",
                "Suporte 24/7",
                "SLA garantido",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Integrações & IA",
          shortDescription: "Automação com IA, integrações de APIs e chatbots",
          icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
          screens: [],
          plans: [
            {
              name: "IA Básico",
              description: "Automações simples com inteligência artificial",
              monthlyPrice: "R$ 1.200",
              annualPrice: "R$ 11.520",
              annualSavings: "R$ 2.880",
              features: [
                "Chatbot com IA (1 canal)",
                "Integração com 1 API",
                "Automação de 3 processos",
                "Relatórios básicos",
                "Suporte por 3 meses",
              ],
              featured: false,
            },
            {
              name: "IA Avançado",
              description: "Automação completa com múltiplas integrações",
              monthlyPrice: "R$ 2.800",
              annualPrice: "R$ 26.880",
              annualSavings: "R$ 6.720",
              features: [
                "Chatbot multicanal",
                "Até 5 integrações API",
                "Automação de workflows",
                "Análise preditiva",
                "Integração WhatsApp",
                "Suporte prioritário",
              ],
              featured: true,
            },
            {
              name: "IA Enterprise",
              description: "Solução completa de IA para sua empresa",
              monthlyPrice: "R$ 5.000",
              annualPrice: "R$ 48.000",
              annualSavings: "R$ 12.000",
              features: [
                "IA personalizada",
                "Integrações ilimitadas",
                "Machine Learning aplicado",
                "Processamento de dados",
                "Treinamento da equipe",
                "Suporte 24/7 + SLA",
              ],
              featured: false,
            },
          ],
        },
      ],
      testimonials: [
        {
          name: "Carlos Mendes",
          company: "Startup Tech",
          text: "Automatizamos todo o atendimento com o chatbot de IA que eles criaram. Em 3 meses, reduzimos 60% dos chamados manuais e triplicamos a velocidade de resposta.",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          projectType: "Automação com IA",
          projectIcon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
        },
        {
          name: "Ana Lúcia Silva",
          company: "E-commerce Fashion",
          text: "O sistema web que desenvolveram transformou nossa operação. Os dashboards com IA nos mostram padrões que não víamos antes. As vendas cresceram 180%.",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          projectType: "Sistema Web + E-commerce",
          projectIcon: "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
        },
        {
          name: "Roberto Almeida",
          company: "Clínica Saúde Total",
          text: "Entregaram nosso sistema de agendamento online em tempo recorde. A integração com WhatsApp e lembretes automáticos reduziu faltas em 45%.",
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
          projectType: "Sistema de Gestão",
          projectIcon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
        },
      ],
      faqs: [
        {
          question: "Vocês podem criar qualquer tipo de sistema?",
          answer:
            "Sim! Desenvolvemos qualquer tipo de sistema web, aplicativo mobile, loja virtual, sistema de gestão, integração com APIs e automações. Se o seu negócio precisa, nós construímos.",
        },
        {
          question: "Como a inteligência artificial é usada nos projetos?",
          answer:
            "Utilizamos IA de ponta (GPT, Claude, ferramentas de automação) para acelerar o desenvolvimento, criar designs, gerar código otimizado e implementar funcionalidades inteligentes como chatbots, análise de dados e automações.",
        },
        {
          question: "Qual é o prazo médio de entrega?",
          answer:
            "Depende da complexidade. Sites institucionais: 2-4 semanas. Sistemas web: 4-8 semanas. Aplicativos: 6-12 semanas. Usamos IA para acelerar significativamente esses prazos.",
        },
        {
          question: "Vocês integram com sistemas que já existem?",
          answer:
            "Sim! Integramos com qualquer API, sistema ERP, CRM, gateway de pagamento ou ferramenta que seu negócio já utilize.",
        },
        {
          question: "Como funciona o pagamento?",
          answer:
            "Trabalhamos com parcelamento em até 12x. Para projetos maiores, dividimos em etapas com pagamentos vinculados a marcos de entrega. Aceitamos cartão, PIX e transferência.",
        },
        {
          question: "Oferecem suporte após a entrega?",
          answer:
            "Sim! Todos os projetos incluem período de suporte pós-entrega. Também oferecemos planos de manutenção contínua com atualizações e monitoramento.",
        },
      ],
    };
  },
  computed: {
    currentService() {
      return this.services[this.currentServiceIndex];
    },
  },
  methods: {
    selectService(index) {
      this.currentServiceIndex = index;
      this.scrollToPricing();
    },
    hoverService(index) {
      this.activeHover = index;
    },
    toggleFaq(index) {
      this.activeFaq = this.activeFaq === index ? null : index;
    },
    scrollToPricing() {
      document.getElementById("pricing").scrollIntoView({ behavior: "smooth" });
    },
    scrollToContact() {
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    },
    openContactModal(plan) {
      this.selectedPlan = plan;
      this.showModal = true;
      document.body.style.overflow = "hidden";
    },
    closeModal() {
      this.showModal = false;
      document.body.style.overflow = "auto";
    },
    closeSuccessModal() {
      this.showSuccess = false;
      document.body.style.overflow = "auto";
    },
    submitForm() {
      // Lógica para enviar o formulário
      alert("Obrigado pelo seu interesse! Entraremos em contato em breve.");
      this.form = {
        name: "",
        email: "",
        service: "",
        message: "",
      };
    },
    async submitPlanRequest() {
      try {
        this.isSubmitting = true;

        const requestData = {
          nome: this.planForm.name,
          email: this.planForm.email,
          telefone: this.planForm.phone,
          mensagem: this.planForm.message,
          planName: this.selectedPlan.name,
          planPrice: this.annualBilling
            ? this.selectedPlan.annualPrice
            : this.selectedPlan.monthlyPrice,
          billingType: this.annualBilling ? "anual" : "mensal",
          serviceName: this.currentService.name,
        };

        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';
        const response = await fetch(
          `${apiUrl}/service-requests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao enviar solicitação");
        }

        // Limpa o formulário
        this.planForm = {
          name: "",
          email: "",
          phone: "",
          message: "",
        };

        // Fecha o modal de contato
        this.closeModal();

        // Aguarda um pouco para suavizar a transição
        setTimeout(() => {
          // Mostra o modal de sucesso
          this.showSuccess = true;
          document.body.style.overflow = "hidden";
        }, 300);
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        alert("Erro ao enviar solicitação. Por favor, tente novamente.");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
/* Base Styles */
.pricing-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle,
      rgba(99, 102, 241, 0.1) 0%,
      transparent 70%
    ),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
  position: relative;
  z-index: 2;
}

.hero-text {
  flex: 1;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  background: rgba(99, 102, 241, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #6366f1;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.cta-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
}

.cta-button.secondary {
  background: transparent;
  border: 2px solid #6366f1;
  color: #6366f1;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.hero-abstract {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.abstract-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 400px;
}

.abstract-grid .grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 0.75rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.abstract-grid .grid-item:hover,
.abstract-grid .grid-item.active {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);
}

.abstract-grid .grid-icon {
  width: 32px;
  height: 32px;
  filter: brightness(0) invert(1);
}

.abstract-grid .grid-item span {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.arrow {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-left: 0;
  border-top: 0;
  transform: rotate(45deg);
  margin-top: 8px;
  animation: bounce 2s infinite;
}

/* Services Section */
.services-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1e293b;
  position: relative;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
}

.section-subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 300px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.service-icon {
  width: 60px;
  height: 60px;
  background: #f1f5f9;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.service-icon img {
  width: 40px;
  height: 40px;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.service-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.service-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(99, 102, 241, 0.9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
}

.service-hover.active {
  opacity: 1;
}

.hover-content {
  text-align: center;
}

.hover-content h4 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.mini-gallery {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.mini-screen {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  border: 2px solid white;
}

.view-button {
  background: white;
  color: #6366f1;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.view-button:hover {
  background: #f1f5f9;
  transform: translateY(-3px);
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.pricing-header {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #6366f1;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.discount-badge {
  background: #10b981;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.pricing-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.pricing-tabs button {
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.pricing-tabs button.active {
  background: #6366f1;
  color: white;
  border-color: #6366f1;
}

.pricing-tabs button:hover {
  border-color: #6366f1;
  color: #6366f1;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.plan-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.plan-card.featured {
  border: 2px solid #6366f1;
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(99, 102, 241, 0.2);
}

.plan-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #6366f1;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.plan-header {
  margin-bottom: 2rem;
  text-align: center;
}

.plan-header h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.plan-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #6366f1;
  margin-bottom: 0.5rem;
}

.plan-price .period {
  font-size: 1rem;
  font-weight: normal;
  color: #64748b;
}

.plan-description {
  color: #64748b;
  font-size: 0.9rem;
}

.plan-features {
  margin: 2rem 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.feature-item img {
  width: 20px;
  height: 20px;
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.feature-item span {
  color: #475569;
}

.plan-savings {
  text-align: center;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Testimonials Section */
.testimonials-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.client-rating {
  color: #fbbf24;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.testimonial-text {
  font-style: italic;
  color: #475569;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 4rem;
  position: absolute;
  top: -20px;
  left: -15px;
  color: #e2e8f0;
  z-index: 0;
}

.testimonial-text p {
  position: relative;
  z-index: 1;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
}

.client-details {
  flex: 1;
}

.client-details h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  color: #1e293b;
}

.client-details span {
  font-size: 0.9rem;
  color: #64748b;
  display: block;
  margin-bottom: 0.5rem;
}

.client-project {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #64748b;
}

.client-project img {
  width: 20px;
  height: 20px;
}

/* FAQ Section */
.faq-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  max-width: 1200px;
  margin: 0 auto;
}

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  cursor: pointer;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-question h3 {
  font-size: 1.2rem;
  color: #1e293b;
  margin: 0;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #6366f1;
  font-weight: bold;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.active {
  max-height: 300px;
  padding-top: 1rem;
}

.faq-answer p {
  color: #64748b;
  margin: 0;
}

/* Contact Section */
.contact-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

.contact-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.contact-text p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.contact-method:hover {
  transform: translateX(5px);
}

.contact-method .icon {
  font-size: 1.5rem;
}

.contact-form {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.contact-form h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #6366f1;
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.submit-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 100%;
  font-size: 1.1rem;
}

.submit-button:hover {
  background: #4f46e5;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  position: relative;
  padding: 2rem;
}

.close-modal {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
}

.modal-header {
  text-align: center;
  margin-bottom: 2rem;
}

.modal-header h2 {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.plan-price {
  font-size: 2rem;
  font-weight: 800;
  color: #6366f1;
}

.plan-price span {
  font-size: 1rem;
  font-weight: normal;
  color: #64748b;
}

/* Success Modal */
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.success-modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  padding: 3rem 2rem;
  text-align: center;
  animation: slideUp 0.4s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.success-checkmark {
  margin: 0 auto 2rem;
  width: 80px;
  height: 80px;
}

.checkmark {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 3;
  stroke: #10b981;
  stroke-miterlimit: 10;
  animation: fill 0.4s ease-in-out 0.4s forwards,
    scale 0.3s ease-in-out 0.9s both;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 3;
  stroke-miterlimit: 10;
  stroke: #10b981;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke: #10b981;
  stroke-width: 3;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

.success-title {
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 1rem;
  font-weight: 700;
}

.success-message {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.success-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1.1rem;
}

.success-button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:disabled:hover {
  transform: none;
  box-shadow: none;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {
  0%,
  100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #10b981;
  }
}

/* Animations */
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: rotate(45deg) translateY(0);
  }
  40% {
    transform: rotate(45deg) translateY(-10px);
  }
  60% {
    transform: rotate(45deg) translateY(-5px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
  }

  .hero-visual {
    display: block;
    overflow: hidden;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .devices-mockup {
    height: 300px;
  }

  .device.laptop {
    width: 350px;
    height: 220px;
  }

  .device.tablet {
    width: 150px;
    height: 200px;
  }

  .device.phone {
    width: 100px;
    height: 160px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .pricing-grid {
    grid-template-columns: 1fr;
  }

  .plan-card.featured {
    transform: none;
  }

  .testimonials-slider {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }
  .device {
    display: block;
  }
  .cta-container {
    flex-direction: column;
    width: 100%;
  }

  .cta-button {
    width: 100%;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .pricing-tabs {
    flex-direction: column;
    align-items: stretch;
  }

  .pricing-tabs button {
    width: 100%;
  }
}
</style>
