<template>
  <div class="ti-services-page">
    <!-- Seção Hero - Destaque -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Assistência Técnica em TI</span>
            <span class="title-line highlight">
              <span class="tech-text">No Seu Domicílio</span>
              <span class="pulse-dot"></span>
            </span>
          </h1>
          <p class="hero-subtitle">Soluções rápidas e personalizadas sem você precisar sair de casa. Atendimento profissional no conforto do seu lar.</p>
          <div class="cta-container">
            <button class="cta-button" @click="scrollToServices">Agendar Visita</button>
            <div class="trust-badges">
              <div class="badge">
                <span>24h</span>
                <small>Atendimento Urgente</small>
              </div>
              <div class="badge">
                <span>100%</span>
                <small>Satisfação Garantida</small>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="technician-mockup">
            <div class="laptop-screen">
              <div class="screen-content">
                <div class="diagnostic-tool">
                  <div class="tool-header">
                    <div class="status-chip">ONLINE</div>
                    <h3>Diagnóstico Rápido</h3>
                  </div>
                  <div class="scan-animation">
                    <div class="scan-line"></div>
                  </div>
                  <div class="issues-found">
                    <div class="issue">
                      <span class="issue-icon">⚠️</span>
                      <span class="issue-text">12 arquivos maliciosos</span>
                    </div>
                    <div class="issue">
                      <span class="issue-icon">⚠️</span>
                      <span class="issue-text">Driver desatualizado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="technician-tools">
              <div class="tool" v-for="(tool, index) in tools" :key="index" :style="{ transform: `rotate(${tool.rotation}deg)` }">
                {{ tool.icon }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Conheça nossos serviços</span>
        <div class="arrow"></div>
      </div>
    </section>

    <!-- Seção de Serviços -->
    <section class="services-section" id="services">
      <h2 class="section-title">
        <span class="title-part">Soluções Completas</span>
        <span class="title-part highlight">Para Seus Equipamentos</span>
      </h2>
      <p class="section-subtitle">Problemas com tecnologia não precisam ser estressantes. Nós resolvemos no local.</p>
      
      <div class="services-grid">
        <div class="service-card" v-for="(service, index) in services" :key="index" @mouseenter="hoverService(index)">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <div class="service-time">
            <span class="time-icon">⏱️</span>
            <span class="time-text">{{ service.time }}</span>
          </div>
          <div class="service-hover" :class="{ active: activeHover === index }">
            <div class="hover-content">
              <h4>{{ service.solution }}</h4>
              <p>Resolução garantida</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Processo de Atendimento -->
    <section class="process-section">
      <div class="process-container">
        <div class="process-text">
          <h2>Como Funciona o <span class="highlight">Atendimento Domiciliar</span></h2>
          <p>Serviço profissional sem você precisar sair de casa:</p>
          <div class="process-steps">
            <div class="step" v-for="(step, index) in processSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="process-visual">
          <div class="service-animation">
            <div class="home-icon">🏠</div>
            <div class="technician-icon">👨‍💻</div>
            <div class="connection-line"></div>
            <div class="tools-animation">
              <div class="rotating-tool" v-for="(tool, index) in animatedTools" :key="index" :style="{ transform: `rotate(${tool.rotation}deg)` }">
                {{ tool.icon }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Benefícios -->
    <section class="benefits-section">
      <h2 class="section-title">Por Que Escolher <span class="highlight">Nosso Serviço</span></h2>
      
      <div class="benefits-grid">
        <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
          <div class="benefit-icon">{{ benefit.icon }}</div>
          <h3>{{ benefit.title }}</h3>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </section>

    <!-- Seção de Emergência -->
    <section class="emergency-section">
      <div class="emergency-content">
        <div class="emergency-text">
          <h2>Problema <span class="highlight">Urgente?</span></h2>
          <p>Atendimento emergencial 24 horas para resolver suas crises tecnológicas.</p>
          <button class="emergency-button">
            <span class="phone-icon">📞</span>
            Chamar Agora
          </button>
        </div>
        <div class="emergency-visual">
          <div class="emergency-animation">
            <div class="warning-sign">⚠️</div>
            <div class="pulse-ring"></div>
            <div class="pulse-ring delay-1"></div>
            <div class="pulse-ring delay-2"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Depoimentos -->
    <section class="testimonials-section">
      <h2 class="section-title">O Que Dizem <span class="highlight">Nossos Clientes</span></h2>
      
      <div class="testimonials-slider">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
          <div class="client-avatar">{{ testimonial.avatar }}</div>
          <div class="client-rating">
            <span v-for="star in 5" :key="star">⭐</span>
          </div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="client-info">
            <strong>{{ testimonial.name }}</strong>
            <span>{{ testimonial.location }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Área de Cobertura -->
    <section class="coverage-section">
      <h2 class="section-title">Atendemos em <span class="highlight">Toda a Região</span></h2>
      
      <div class="coverage-map">
        <div class="map-outline">
          <div class="neighborhood" v-for="(area, index) in coverageAreas" :key="index" 
               :style="{ top: area.top, left: area.left }"
               @mouseenter="highlightArea(index)">
            {{ area.name }}
          </div>
        </div>
        <div class="coverage-legend">
          <div class="legend-item" v-for="(area, index) in coverageAreas" :key="index">
            <div class="area-color" :style="{ background: areaColors[index] }"></div>
            <span>{{ area.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Seção de Contato Final -->
    <section class="final-cta">
      <div class="cta-content">
        <h2>Precisa de <span class="highlight">Agora Mesmo?</span></h2>
        <p>Entre em contato e agende sua visita técnica sem compromisso.</p>
        <div class="contact-methods">
          <a href="#" class="contact-button whatsapp">
            <span class="icon">💬</span>
            WhatsApp
          </a>
          <a href="#" class="contact-button phone">
            <span class="icon">📞</span>
            Ligação
          </a>
          <a href="#" class="contact-button email">
            <span class="icon">✉️</span>
            E-mail
          </a>
        </div>
        <div class="working-hours">
          <span>🕒 Atendimento: Seg-Sáb 8h-20h | Emergências 24h</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TIServices',
  data() {
    return {
      activeHover: null,
      highlightedArea: null,
      tools: [
        { icon: "🛠️", rotation: -5 },
        { icon: "💻", rotation: 3 },
        { icon: "🔧", rotation: 7 },
        { icon: "🧰", rotation: -3 }
      ],
      services: [
        {
          icon: "🖥️",
          title: "Manutenção de Computadores",
          description: "Conserto, limpeza e upgrade de desktops e notebooks.",
          time: "1-2 horas",
          solution: "Diagnóstico gratuito e orçamento na hora"
        },
        {
          icon: "🧹",
          title: "Limpeza Profissional",
          description: "Remoção de poeira e resíduos que afetam o desempenho.",
          time: "1 hora",
          solution: "Aumento da vida útil do equipamento"
        },
        {
          icon: "🔄",
          title: "Formatação e Instalação",
          description: "Sistema operacional, drivers e programas essenciais.",
          time: "2-3 horas",
          solution: "Computador rápido como novo"
        },
        {
          icon: "🛡️",
          title: "Remoção de Vírus",
          description: "Eliminação de malware e proteção contra ameaças.",
          time: "1-3 horas",
          solution: "Segurança digital garantida"
        },
        {
          icon: "🎮",
          title: "Montagem PC Gamer",
          description: "Consultoria para montar o PC ideal para seus jogos.",
          time: "Varia",
          solution: "Configuração otimizada para performance"
        },
        {
          icon: "📶",
          title: "Problemas de Rede",
          description: "Configuração de Wi-Fi, roteadores e conexões.",
          time: "1-2 horas",
          solution: "Conexão estável e rápida"
        }
      ],
      processSteps: [
        {
          title: "Você nos chama",
          description: "Por telefone, WhatsApp ou formulário online."
        },
        {
          title: "Agendamento",
          description: "Marcamos a visita no horário que for melhor para você."
        },
        {
          title: "Diagnóstico",
          description: "Avaliação profissional no local com orçamento imediato."
        },
        {
          title: "Execução",
          description: "Realizamos o serviço com equipamentos profissionais."
        },
        {
          title: "Garantia",
          description: "Testamos tudo e deixamos seu equipamento perfeito."
        }
      ],
      benefits: [
        {
          icon: "🏠",
          title: "Comodidade",
          description: "Você não precisa se deslocar com equipamentos pesados."
        },
        {
          icon: "⏱️",
          title: "Rapidez",
          description: "Solução imediata sem esperar dias em assistências."
        },
        {
          icon: "👨‍💼",
          title: "Profissionalismo",
          description: "Técnicos certificados com anos de experiência."
        },
        {
          icon: "💵",
          title: "Preço Justo",
          description: "Orçamento transparente sem custos ocultos."
        },
        {
          icon: "🛡️",
          title: "Segurança",
          description: "Seus dados protegidos durante todo o processo."
        },
        {
          icon: "📝",
          title: "Garantia",
          description: "Todos os serviços com garantia por 90 dias."
        }
      ],
      testimonials: [
        {
          avatar: "👩",
          text: "Salvaram meu notebook que tinha todos os trabalhos da faculdade. Chegaram em menos de 2 horas!",
          name: "Ana Carolina",
          location: "Jardim das Flores"
        },
        {
          avatar: "👨",
          text: "Montaram um PC gamer incrível dentro do meu orçamento. O atendimento foi impecável.",
          name: "Carlos Eduardo",
          location: "Centro"
        },
        {
          avatar: "👵",
          text: "Pacientes e atenciosos, explicaram tudo para mim que não entendo nada de computador.",
          name: "Dona Maria",
          location: "Vila Nova"
        }
      ],
      coverageAreas: [
        { name: "Centro", top: "30%", left: "50%" },
        { name: "Jardim das Flores", top: "40%", left: "60%" },
        { name: "Vila Nova", top: "50%", left: "45%" },
        { name: "Bela Vista", top: "35%", left: "35%" },
        { name: "Parque das Árvores", top: "60%", left: "55%" }
      ],
      areaColors: ["#4f46e5", "#8b5cf6", "#6366f1", "#a855f7", "#7e22ce"],
      animatedTools: [
        { icon: "🛠️", rotation: 0 },
        { icon: "🔧", rotation: 0 },
        { icon: "💻", rotation: 0 },
        { icon: "📱", rotation: 0 }
      ]
    }
  },
  methods: {
    hoverService(index) {
      this.activeHover = index;
    },
    highlightArea(index) {
      this.highlightedArea = index;
    },
    scrollToServices() {
      document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    },
    animateTools() {
      setInterval(() => {
        this.animatedTools.forEach(tool => {
          tool.rotation = (tool.rotation + 2) % 360;
        });
      }, 50);
    }
  },
  mounted() {
    this.animateTools();
  }
}
</script>

<style scoped>
/* Estilos Base */
.ti-services-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

/* Seção Hero */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 2rem 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: 
    radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%),
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
  content: '';
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
  gap: 2rem;
  flex-wrap: wrap;
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
  position: relative;
  overflow: hidden;
}

.cta-button:hover {
  background: #4f46e5;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(79, 70, 229, 0.4);
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
  color: white;
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

.technician-mockup {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  perspective: 1000px;
}

.laptop-screen {
  background: #1e293b;
  border-radius: 20px;
  padding: 12px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: rotateX(10deg) rotateY(-5deg);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;
}

.technician-mockup:hover .laptop-screen {
  transform: rotateX(5deg) rotateY(0deg);
}

.screen-content {
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  position: relative;
}

.diagnostic-tool {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tool-header {
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.status-chip {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-chip::before {
  content: '';
  width: 8px;
  height: 8px;
  background: #fbbf24;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

.tool-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: white;
}

.scan-animation {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  margin: 1.5rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.7), transparent);
  animation: scan 3s infinite linear;
}

@keyframes scan {
  0% { top: 0%; }
  100% { top: 100%; }
}

.issues-found {
  padding: 1rem;
  background: rgba(15, 23, 42, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.issue {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.technician-tools {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.tool {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
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

/* Seção de Serviços */
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2);
}

.service-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #6366f1;
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

.service-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6366f1;
  font-weight: 600;
}

.service-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(139, 92, 246, 0.9));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 2rem;
  text-align: center;
}

.service-hover.active {
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

/* Seção de Processo */
.process-section {
  padding: 6rem 2rem;
  background: #f8fafc;
}

.process-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.process-text {
  flex: 1;
}

.process-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}

.process-text p {
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #1e293b;
}

.step-content p {
  margin: 0;
  color: #64748b;
}

.process-visual {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.service-animation {
  position: relative;
  width: 100%;
  height: 100%;
}

.home-icon {
  position: absolute;
  top: 20%;
  left: 20%;
  font-size: 5rem;
  z-index: 2;
}

.technician-icon {
  position: absolute;
  top: 50%;
  right: 20%;
  font-size: 3rem;
  z-index: 2;
  background: white;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.connection-line {
  position: absolute;
  top: 35%;
  left: 30%;
  width: 40%;
  height: 4px;
  background: #6366f1;
  transform: rotate(20deg);
}

.tools-animation {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.rotating-tool {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

/* Seção de Benefícios */
.benefits-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.benefit-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;
}

.benefit-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
}

.benefit-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #6366f1;
}

.benefit-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e293b;
}

.benefit-card p {
  color: #64748b;
}

/* Seção de Emergência */
.emergency-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.emergency-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 4rem;
}

.emergency-text {
  flex: 1;
}

.emergency-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.emergency-text p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.emergency-button {
  background: white;
  color: #dc2626;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.emergency-button:hover {
  background: #fecaca;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 255, 255, 0.4);
}

.emergency-visual {
  flex: 1;
  position: relative;
  min-height: 300px;
}

.emergency-animation {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.warning-sign {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  z-index: 2;
}

.pulse-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid white;
  border-radius: 50%;
  opacity: 0;
  animation: pulse-ring 3s infinite;
}

.pulse-ring.delay-1 {
  animation-delay: 1s;
}

.pulse-ring.delay-2 {
  animation-delay: 2s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Seção de Depoimentos */
.testimonials-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-slider {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.testimonial-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.client-avatar {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1rem;
}

.client-rating {
  margin-bottom: 1rem;
  color: #fbbf24;
}

.testimonial-text {
  font-style: italic;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.client-info {
  display: flex;
  flex-direction: column;
}

.client-info strong {
  color: #1e293b;
}

.client-info span {
  color: #64748b;
  font-size: 0.9rem;
}

/* Seção de Cobertura */
.coverage-section {
  padding: 6rem 2rem;
  background: #f8fafc;
  max-width: 1200px;
  margin: 0 auto;
}

.coverage-map {
  margin-top: 3rem;
  display: flex;
  gap: 2rem;
}

.map-outline {
  flex: 2;
  position: relative;
  height: 400px;
  background: #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.neighborhood {
  position: absolute;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.neighborhood:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.coverage-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.area-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

/* Seção Final CTA */
.final-cta {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #1e293b, #0f172a);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.final-cta h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.final-cta p {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.contact-button {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.contact-button.whatsapp {
  background: #25D366;
  color: white;
}

.contact-button.phone {
  background: white;
  color: #1e293b;
}

.contact-button.email {
  background: #6366f1;
  color: white;
}

.contact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.working-hours {
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Animações */
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
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
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content,
  .process-container,
  .emergency-content {
    flex-direction: column;
    text-align: center;
  }
  
  .process-visual {
    order: -1;
    margin-bottom: 3rem;
  }
  
  .coverage-map {
    flex-direction: column;
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
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 6rem 1.5rem 8rem;
  }
  
  .contact-methods {
    flex-direction: column;
    align-items: center;
  }
  
  .contact-button {
    width: 100%;
    justify-content: center;
  }
}
</style>