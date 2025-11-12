<template>
  <div class="ecommerce-page">
    <!-- **Hero Section - Imersivo com IA** -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">E-commerce impulsionado por</span>
            <span class="title-line highlight">
              <span class="ai-text">IA Inteligente</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">
            Vendas escaláveis, experiência personalizada e automação preditiva
            para seu e-commerce.
          </p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToDemo">
              Quero um E-commerce IA
            </button>
            <div class="trust-badges">
              <div class="badge">
                <span>+300%</span>
                <small>Conversão em lojas</small>
              </div>
              <div class="badge">
                <span>24/7</span>
                <small>Automação com IA</small>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="ai-dashboard">
            <div class="screen">
              <div class="ai-mockup">
                <div class="ai-header">
                  <div class="ai-chip">IA ATIVA</div>
                  <h3>Dashboard de Performance</h3>
                </div>
                <div class="ai-stats">
                  <div class="stat">
                    <span class="stat-value">+142%</span>
                    <span class="stat-label">ROI em 30 dias</span>
                  </div>
                  <div class="ai-graph"></div>
                </div>
                <div class="ai-recommendation">
                  <div class="ai-message">
                    <div class="ai-avatar">🤖</div>
                    <p>
                      "Recomendo destacar o produto X em promoção relâmpago!"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Descubra o poder da IA</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- **Diferenciais IA - Grid Interativo** -->
    <section class="ai-features">
      <h2 class="section-title">
        <span class="title-part">Seu E-commerce</span>
        <span class="title-part highlight">com Superpoderes de IA</span>
      </h2>
      <p class="section-subtitle">
        Tecnologia que aprende, recomenda e escala suas vendas automaticamente.
      </p>

      <div class="features-grid">
        <div
          class="feature-card"
          v-for="(feature, index) in aiFeatures"
          :key="index"
          @mouseenter="hoverFeature(index)"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
          <div class="feature-cta">
            <span>Ver caso real →</span>
          </div>
          <div class="ai-hover" :class="{ active: activeHover === index }">
            <div class="hover-content">
              <h4>{{ feature.result }}</h4>
              <p>Métricas reais de clientes</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- **Demo IA - Visualização Interativa** -->
    <section class="ai-demo" id="demo">
      <div class="demo-container">
        <div class="demo-text">
          <h2>Experimente a <span class="highlight">IA em Ação</span></h2>
          <p>
            Veja como nosso sistema inteligente transforma visitantes em
            clientes:
          </p>
          <div class="demo-steps">
            <div class="step">
              <div class="step-number">1</div>
              <p>O cliente navega na loja</p>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <p>A IA analisa comportamento em tempo real</p>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <p>Oferece produtos personalizados</p>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <p><strong>Conversão aumenta 3x</strong></p>
            </div>
          </div>
        </div>
        <div class="demo-visual">
          <div class="live-demo">
            <div class="user-avatar">👩</div>
            <div class="ai-response">
              <div class="message">
                "Recomendo este produto baseado no seu histórico!"
              </div>
              <div class="product-card">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
                  alt="Produto recomendado"
                />
                <button class="buy-button">Comprar Agora</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- **Resultados - Estatísticas Dinâmicas** -->
    <section class="results-section">
      <h2 class="section-title">
        E-commerces que <span class="highlight">cresceram com IA</span>
      </h2>

      <div class="results-grid">
        <div
          class="result-card"
          v-for="(result, index) in results"
          :key="index"
        >
          <div class="result-value" v-counter="result.value">
            {{ result.value }}{{ result.unit }}
          </div>
          <div class="result-label">{{ result.label }}</div>
          <div
            class="result-bar"
            :style="{ height: result.percentage + '%' }"
          ></div>
        </div>
      </div>
    </section>

    <!-- **Fluxo de IA - Timeline Animada** -->
    <section class="ai-flow">
      <h2 class="section-title">
        Como a <span class="highlight">IA transforma</span> seu e-commerce
      </h2>

      <div class="flow-container">
        <div class="flow-step" v-for="(step, index) in aiFlow" :key="index">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-content">
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
          <div class="step-arrow" v-if="index < aiFlow.length - 1">→</div>
        </div>
      </div>
    </section>
    <!-- <PortfolioEcommece /> -->

    <!-- **Planos - Com Comparativo de IA** -->
    <section class="pricing-section">
      <h2 class="section-title">
        Escolha seu <span class="highlight">nível de IA</span>
      </h2>

      <div class="pricing-grid">
        <div
          class="pricing-card"
          v-for="(plan, index) in pricingPlans"
          :key="index"
          :class="{ featured: plan.featured }"
        >
          <div class="ai-level" :style="{ background: plan.color }">
            {{ plan.aiLevel }}
          </div>
          <h3>{{ plan.name }}</h3>
          <div class="price">{{ plan.price }}</div>
          <ul class="features">
            <li v-for="(feature, fIndex) in plan.features" :key="fIndex">
              {{ feature }}
            </li>
          </ul>
          <button class="buy-button" @click="openPlanModal(plan)">Começar Agora</button>
          <div class="ai-power">
            <div class="power-bar" :style="{ width: plan.power + '%' }"></div>
            <span>Poder de IA: {{ plan.power }}%</span>
          </div>
        </div>
      </div>
    </section>

    <!-- **CTA Final - Com Garantia** -->
    <section class="final-cta">
      <div class="cta-content">
        <h2>Pronto para <span class="highlight">vender mais com IA</span>?</h2>
        <p>Sua loja merece a melhor tecnologia de conversão.</p>
        <button class="cta-button">Quero minha Loja IA</button>
        <div class="guarantee">
          <span>✅ 30 dias de garantia</span>
          <span>✅ Onboarding com especialista</span>
          <span>✅ +200% de conversão em 60 dias</span>
        </div>
      </div>
    </section>
    
    <!-- Contact Modal for Plan Request -->
    <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-modal" @click="closeModal">×</button>
        <div class="modal-header">
          <h2>Solicitar {{ selectedPlan.name }}</h2>
          <p class="plan-price">
            {{ selectedPlan.price }}
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
// import PortfolioEcommece from "./Portifolio/PortfolioEcommece.vue";
export default {
  name: "EcommerceAI",
  // components: {
  //   PortfolioEcommece,
  // },
  data() {
    return {
      activeHover: null,
      aiFeatures: [
        {
          icon: "🤖",
          title: "Recomendação Inteligente",
          description: "Sugere produtos com base em comportamento de compra.",
          result: "+180% em vendas cruzadas",
        },
        {
          icon: "📊",
          title: "Precificação Dinâmica",
          description:
            "Ajusta preços e promoções em tempo real para maximizar lucro.",
          result: "23% mais margem em 3 meses",
        },
        {
          icon: "🔍",
          title: "Busca Predictiva",
          description:
            "Autocompleta pesquisas e encontra produtos mesmo com erros.",
          result: "40% menos abandonos",
        },
        {
          icon: "💬",
          title: "Chatbot de Vendas",
          description: "Atendimento 24/7 que converte como um vendedor humano.",
          result: "35% dos fechamentos",
        },
        {
          icon: "📈",
          title: "Estoque Inteligente",
          description: "Prevê demanda e evita falta ou excesso de produtos.",
          result: "Redução de 60% em custos",
        },
        {
          icon: "🎯",
          title: "Anúncios Automatizados",
          description:
            "Cria e otimiza campanhas no Meta/Google sem intervenção.",
          result: "ROI 5x maior",
        },
      ],
      results: [
        {
          value: 320,
          unit: "%",
          label: "Aumento na conversão",
          percentage: 90,
        },
        {
          value: 5,
          unit: "x",
          label: "Retorno sobre investimento",
          percentage: 70,
        },
        { value: 68, unit: "%", label: "Redução de abandonos", percentage: 80 },
        { value: 24, unit: "/7", label: "Vendas automáticas", percentage: 100 },
      ],
      aiFlow: [
        {
          title: "Coleta de Dados",
          description: "IA analisa comportamento de usuários em tempo real.",
        },
        {
          title: "Padrões Ocultos",
          description: "Identifica tendências que humanos não percebem.",
        },
        {
          title: "Personalização",
          description: "Cada visitante recebe ofertas únicas.",
        },
        {
          title: "Automação",
          description: "Toma decisões de preço, estoque e marketing.",
        },
        {
          title: "Otimização Contínua",
          description: "Aprende e melhora sozinha a cada interação.",
        },
      ],
      pricingPlans: [
        {
          name: "Starter AI",
          price: "R$ 3.900/mês",
          aiLevel: "IA Básica",
          color: "#8b5cf6",
          features: [
            "Recomendações simples",
            "Relatórios automáticos",
            "Integração com ERP",
            "Suporte 12h/dia",
          ],
          power: 40,
          featured: false,
        },
        {
          name: "Growth AI",
          price: "R$ 7.900/mês",
          aiLevel: "IA Avançada",
          color: "#6366f1",
          features: [
            "Precificação dinâmica",
            "Chatbot de vendas",
            "Anúncios automáticos",
            "Suporte 24/7",
          ],
          power: 75,
          featured: true,
        },
        {
          name: "Enterprise AI",
          price: "R$ 14.900/mês",
          aiLevel: "IA Completa",
          color: "#4338ca",
          features: [
            "Machine Learning customizado",
            "Gestão de estoque preditiva",
            "CRM inteligente",
            "Equipe dedicada",
          ],
          power: 100,
          featured: false,
        },
      ],
      showModal: false,
      showSuccess: false,
      isSubmitting: false,
      selectedPlan: null,
      planForm: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    };
  },
  methods: {
    hoverFeature(index) {
      this.activeHover = index;
    },
    scrollToDemo() {
      document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
    },
    openPlanModal(plan) {
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
    async submitPlanRequest() {
      try {
        this.isSubmitting = true;

        const requestData = {
          nome: this.planForm.name,
          email: this.planForm.email,
          telefone: this.planForm.phone,
          mensagem: this.planForm.message,
          planName: this.selectedPlan.name,
          planPrice: this.selectedPlan.price,
          billingType: "mensal", // Ecommerce plans are typically monthly
          serviceName: "E-commerce IA",
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
  directives: {
    counter: {
      mounted(el, binding) {
        const target = binding.value;
        const duration = 1500;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = target + (binding.arg === "percent" ? "%" : "");
          }
        };

        updateCounter();
      },
    },
  },
};
</script>

<style scoped>
/* 🎨 Estilo Completo - E-commerce IA */
.ecommerce-page {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* 🌈 Hero Section - Futurista */
.hero-section {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
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
      rgba(251, 191, 36, 0.1) 0%,
      transparent 70%
    ),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
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

.ai-text {
  position: relative;
  display: inline-block;
}

.ai-text::after {
  content: "";
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 12px;
  background: rgba(251, 191, 36, 0.4);
  z-index: -1;
  border-radius: 4px;
  transform: skewX(-15deg);
}

.pulse-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #fbbf24;
  border-radius: 50%;
  margin-left: 8px;
  animation: pulse 1.5s infinite, float 3s ease-in-out infinite;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.3);
}

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

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.cta-button {
  background: #fbbf24;
  color: #1e293b;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
  position: relative;
  overflow: hidden;
}

.cta-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.cta-button:hover {
  background: #f59e0b;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
}

.cta-button:hover::after {
  animation: ripple 1s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

.trust-badges {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem 1.25rem;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.badge:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.badge span {
  font-size: 1.5rem;
  font-weight: 700;
  display: block;
  background: linear-gradient(90deg, #fbbf24, #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.badge small {
  font-size: 0.8rem;
  opacity: 0.8;
  display: block;
}

.hero-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.ai-dashboard {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;
}

.screen {
  background: #1e293b;
  border-radius: 20px;
  padding: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: rotateX(10deg) rotateY(-5deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.ai-dashboard:hover .screen {
  transform: rotateX(5deg) rotateY(0deg);
}

.ai-mockup {
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  position: relative;
}

.ai-header {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-chip {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ai-chip::before {
  content: "";
  width: 8px;
  height: 8px;
  background: #fbbf24;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.ai-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.ai-stats {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: #fbbf24;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #94a3b8;
}

.ai-graph {
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
}

.ai-graph::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(251, 191, 36, 0.3),
    transparent
  );
  animation: graphWave 3s infinite linear;
}

@keyframes graphWave {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.ai-recommendation {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.9);
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.ai-message {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.ai-avatar {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.ai-message p {
  margin: 0;
  font-size: 0.9rem;
  color: #e2e8f0;
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

/* 🧠 AI Features Grid */
.ai-features {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
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

.title-part {
  display: block;
}

.highlight {
  color: #4f46e5;
}

.section-subtitle {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  color: #64748b;
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.feature-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  margin-bottom: 1.5rem;
}

.feature-cta {
  color: #4f46e5;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.feature-cta:hover {
  gap: 1rem;
}

.ai-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(79, 70, 229, 0.9),
    rgba(123, 58, 237, 0.9)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
  text-align: center;
}

.ai-hover.active {
  opacity: 1;
}

.hover-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.hover-content p {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* 🎥 Demo Section */
.ai-demo {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.demo-text {
  flex: 1;
}

.demo-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.demo-text p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.demo-steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step p {
  margin: 0;
  color: #475569;
}

.step:nth-child(4) p {
  font-weight: 700;
  color: #4f46e5;
}

.demo-visual {
  flex: 1;
  position: relative;
}

.live-demo {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.live-demo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      135deg,
      transparent 60%,
      rgba(79, 70, 229, 0.05) 100%
    ),
    url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M0,0 L20,0 L20,20 L0,20 Z" fill="none" stroke="%23e2e8f0" stroke-width="0.5"/></svg>');
  opacity: 0.5;
}

.user-avatar {
  width: 50px;
  height: 50px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.ai-response {
  background: #4f46e5;
  color: white;
  border-radius: 12px;
  padding: 1rem;
  max-width: 80%;
  margin-left: auto;
  position: relative;
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

.ai-response::before {
  content: "";
  position: absolute;
  top: 20px;
  right: -8px;
  width: 0;
  height: 0;
  border-left: 10px solid #4f46e5;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
}

.message {
  margin-bottom: 1rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.product-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.buy-button {
  width: 100%;
  padding: 0.75rem;
  background: #fbbf24;
  color: #1e293b;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.buy-button:hover {
  background: #f59e0b;
}

/* 📊 Results Section */
.results-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.result-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.result-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
}

.result-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 0.5rem;
}

.result-label {
  color: #64748b;
  font-size: 1rem;
}

.result-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(79, 70, 229, 0.1);
  transition: height 1s ease;
}

/* 🔄 AI Flow Section */
.ai-flow {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.flow-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
}

.flow-container::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50px;
  width: 2px;
  background: #cbd5e1;
  transform: translateX(-50%);
  z-index: 1;
}

.flow-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  position: relative;
  z-index: 2;
}

.step-number {
  width: 50px;
  height: 50px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  position: relative;
}

.step-content {
  flex: 1;
  padding: 1rem 0;
}

.step-content h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.step-content p {
  color: #64748b;
}

.step-arrow {
  font-size: 2rem;
  color: #cbd5e1;
  position: absolute;
  left: 70px;
  top: 60px;
}

/* 💰 Pricing Section */
.pricing-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.pricing-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.pricing-card.featured {
  border: 2px solid #4f46e5;
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.2);
}

.pricing-card.featured::before {
  content: "RECOMENDADO";
  position: absolute;
  top: -10px;
  right: 20px;
  background: #4f46e5;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.ai-level {
  position: absolute;
  top: -15px;
  left: 20px;
  color: white;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
}

.pricing-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.price {
  font-size: 2.5rem;
  font-weight: 800;
  color: #4f46e5;
  margin-bottom: 0.5rem;
}

.price::before {
  content: "R$ ";
  font-size: 1.5rem;
}

.features {
  list-style-type: none;
  padding: 0;
  margin-bottom: 2rem;
}

.features li {
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  color: #475569;
}

.features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4f46e5;
}

.buy-button {
  width: 100%;
  padding: 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1.5rem;
}

.buy-button:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
}

.ai-power {
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
}

.power-bar {
  height: 6px;
  background: linear-gradient(90deg, #4f46e5, #8b5cf6);
  border-radius: 3px;
  margin-bottom: 0.5rem;
  transition: width 1s ease;
}

/* 🚀 Final CTA */
.final-cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.final-cta::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
      circle,
      rgba(251, 191, 36, 0.1) 0%,
      transparent 70%
    ),
    url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M30,30 L70,30 L70,70 L30,70 Z" fill="none" stroke="white" stroke-width="0.5" stroke-dasharray="5,5"/></svg>');
  opacity: 0.15;
  animation: rotate 120s linear infinite;
}

.cta-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.final-cta p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.guarantee {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  font-size: 0.9rem;
}

.guarantee span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 📱 Responsividade Avançada */
@media (max-width: 1024px) {
  .hero-content,
  .demo-container {
    flex-direction: column;
    text-align: center;
  }

  .flow-container::before {
    left: 25px;
  }

  .flow-step {
    padding-left: 60px;
  }

  .step-arrow {
    left: 35px;
    transform: rotate(90deg);
    top: 80px;
  }

  .pricing-card.featured {
    transform: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .cta-container {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .results-grid {
    grid-template-columns: 1fr 1fr;
  }

  .guarantee {
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .flow-step {
    flex-direction: column;
    padding-left: 0;
  }

  .step-number {
    margin-bottom: 1rem;
  }

  .step-arrow {
    display: none;
  }
}

/* Modal Styles */
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
  color: #4f46e5;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
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
.form-group textarea:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
}

.submit-button {
  background: #4f46e5;
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
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-button:disabled:hover {
  transform: none;
  box-shadow: none;
}

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
  background: #4f46e5;
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
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
}

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
</style>
