<template>
  <div class="pricing-page">
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
export default {
  name: "PremiumPricingPage",
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
          name: "Desenvolvimento Web",
          shortDescription:
            "Sites e sistemas web personalizados com tecnologia de ponta",
          icon: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
          screens: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          plans: [
            {
              name: "Site Institucional",
              description: "Presença online profissional para seu negócio",
              monthlyPrice: "R$ 1.200",
              annualPrice: "R$ 11.500",
              annualSavings: "R$ 1.700",
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
              name: "Sistema Web",
              description: "Soluções personalizadas para seu negócio",
              monthlyPrice: "R$ 2.500",
              annualPrice: "R$ 24.000",
              annualSavings: "R$ 3.000",
              features: [
                "Desenvolvimento personalizado",
                "Painel administrativo",
                "Banco de dados",
                "Integrações API",
                "Relatórios",
                "Suporte prioritário",
              ],
              featured: true,
            },
            {
              name: "Loja Virtual",
              description: "E-commerce completo para vender online",
              monthlyPrice: "R$ 3.200",
              annualPrice: "R$ 30.000",
              annualSavings: "R$ 4.400",
              features: [
                "Catálogo de produtos",
                "Pagamentos online",
                "Gestão de pedidos",
                "Relatórios de vendas",
                "Marketing integrado",
                "Suporte 24/7",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Desenvolvimento Mobile",
          shortDescription: "Aplicativos nativos e híbridos para iOS e Android",
          icon: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
          screens: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          plans: [
            {
              name: "App Básico",
              description: "MVP para validar sua ideia",
              monthlyPrice: "R$ 2.800",
              annualPrice: "R$ 26.000",
              annualSavings: "R$ 3.600",
              features: [
                "Design UI/UX",
                "Desenvolvimento nativo",
                "Publicação nas lojas",
                "Suporte por 3 meses",
                "Até 5 funcionalidades",
              ],
              featured: false,
            },
            {
              name: "App Completo",
              description: "Solução robusta para seu negócio",
              monthlyPrice: "R$ 4.500",
              annualPrice: "R$ 42.000",
              annualSavings: "R$ 6.000",
              features: [
                "Design premium",
                "Backend integrado",
                "Notificações push",
                "Analytics",
                "Suporte prioritário",
                "Atualizações mensais",
              ],
              featured: true,
            },
            {
              name: "App Empresarial",
              description: "Solução corporativa personalizada",
              monthlyPrice: "R$ 6.800",
              annualPrice: "R$ 65.000",
              annualSavings: "R$ 7.600",
              features: [
                "Sistema completo",
                "Integração com ERP",
                "Autenticação avançada",
                "Suporte 24/7",
                "Atualizações semanais",
                "Treinamento da equipe",
              ],
              featured: false,
            },
          ],
        },
        {
          name: "Landing Page",
          shortDescription: "Páginas de conversão para campanhas e lançamentos",
          icon: "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
          screens: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          plans: [
            {
              name: "Landing Básica",
              description: "Página simples para captação de leads",
              monthlyPrice: "R$ 800",
              annualPrice: "R$ 7.500",
              annualSavings: "R$ 1.100",
              features: [
                "Design responsivo",
                "Formulário de contato",
                "Otimização SEO",
                "Integração com redes sociais",
                "Hospedagem por 1 ano",
              ],
              featured: false,
            },
            {
              name: "Landing Premium",
              description: "Página de alta conversão para lançamentos",
              monthlyPrice: "R$ 1.500",
              annualPrice: "R$ 14.000",
              annualSavings: "R$ 2.000",
              features: [
                "Design exclusivo",
                "Elementos de conversão",
                "Testes A/B",
                "Analytics integrado",
                "CTA estratégicos",
                "Suporte por 6 meses",
              ],
              featured: true,
            },
          ],
        },
        {
          name: "Design & Interface",
          shortDescription:
            "Experiências digitais intuitivas e visualmente impressionantes",
          icon: "https://cdn-icons-png.flaticon.com/512/3242/3242257.png",
          screens: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          ],
          plans: [
            {
              name: "UI Design",
              description: "Interfaces modernas e funcionais",
              monthlyPrice: "R$ 1.200",
              annualPrice: "R$ 11.000",
              annualSavings: "R$ 1.600",
              features: [
                "Wireframes",
                "Protótipo interativo",
                "Design System",
                "Até 3 revisões",
                "Arquivos fonte",
              ],
              featured: false,
            },
            {
              name: "UX Research",
              description: "Experiência do usuário baseada em dados",
              monthlyPrice: "R$ 2.500",
              annualPrice: "R$ 23.000",
              annualSavings: "R$ 3.400",
              features: [
                "Pesquisa de usuários",
                "Personas",
                "Jornada do cliente",
                "Testes de usabilidade",
                "Relatório completo",
              ],
              featured: true,
            },
            {
              name: "Pacote Completo",
              description: "UI/UX Design de ponta a ponta",
              monthlyPrice: "R$ 3.500",
              annualPrice: "R$ 33.000",
              annualSavings: "R$ 5.000",
              features: [
                "UX Research completo",
                "UI Design premium",
                "Design System",
                "Documentação",
                "Suporte para desenvolvimento",
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
          text: "O aplicativo que desenvolveram superou todas nossas expectativas. Em 6 meses já tínhamos 500 mil usuários ativos e uma taxa de retenção impressionante.",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          projectType: "App Completo",
          projectIcon: "https://cdn-icons-png.flaticon.com/512/888/888857.png",
        },
        {
          name: "Ana Lúcia Silva",
          company: "E-commerce Fashion",
          text: "Nosso novo site aumentou as conversões em 180% e reduziu a taxa de rejeição. O cuidado com a experiência do usuário foi excepcional.",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg",
          projectType: "Loja Virtual",
          projectIcon:
            "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
        },
        {
          name: "Roberto Almeida",
          company: "Construtora Aplha",
          text: "A landing page que criaram para nossa campanha teve uma taxa de conversão de 12%, muito acima da média do setor. Resultados impressionantes!",
          avatar: "https://randomuser.me/api/portraits/men/75.jpg",
          projectType: "Landing Premium",
          projectIcon:
            "https://cdn-icons-png.flaticon.com/512/2933/2933245.png",
        },
      ],
      faqs: [
        {
          question: "Qual é o prazo médio para desenvolvimento?",
          answer:
            "O prazo varia conforme a complexidade do projeto. Sites institucionais levam em média 4-6 semanas, enquanto aplicativos complexos podem levar de 3-6 meses. Entregamos em fases para que você possa acompanhar o progresso.",
        },
        {
          question: "Oferecem manutenção após o lançamento?",
          answer:
            "Sim, todos nossos planos incluem um período de suporte pós-lançamento. Também oferecemos planos de manutenção contínua com atualizações, backups e monitoramento de performance.",
        },
        {
          question:
            "Posso fazer alterações no projeto durante o desenvolvimento?",
          answer:
            "Claro! Utilizamos metodologias ágeis que permitem ajustes durante o processo. Alterações significativas podem impactar no prazo e custo, mas sempre comunicamos isso de forma transparente.",
        },
        {
          question: "Como funciona o pagamento?",
          answer:
            "Trabalhamos com parcelamento em até 12x sem juros. Para projetos maiores, dividimos em etapas com pagamentos vinculados a marcos de entrega. Aceitamos cartão, transferência e PIX.",
        },
        {
          question: "Vocês trabalham com tecnologias específicas?",
          answer:
            "Utilizamos as melhores tecnologias para cada tipo de projeto: React e Vue.js para frontend, Node.js e Laravel para backend, Flutter e React Native para mobile. Sempre escolhemos a stack mais adequada para suas necessidades.",
        },
        {
          question: "Há desconto para projetos de longo prazo?",
          answer:
            "Sim, oferecemos descontos progressivos para projetos com duração superior a 6 meses. Planos anuais também têm desconto de até 20% em relação aos mensais.",
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

        const response = await fetch(
          "http://localhost:3000/api/service-requests",
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
