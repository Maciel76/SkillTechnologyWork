<template>
  <div class="pagina-ajuste">
    <!-- Hero Section Imersivo -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="title-line">Identidade Visual</span>
            <span class="title-line highlight"
              >que <span class="pulse-text">Cativa</span> &
              <span class="rotate-text">Diferencia</span></span
            >
          </h1>
          <p class="hero-subtitle">
            Sua marca não é apenas um logo - é uma experiência emocional
            memorável
          </p>
          <div class="cta-container-hero">
            <button class="cta-button">Quero minha Identidade Visual</button>
            <div class="trust-badges">
              <div class="badge">
                <span>+150</span>
                <small>Marcas Transformadas</small>
              </div>
              <div class="badge">
                <span>100%</span>
                <small>Briefing Estratégico</small>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="brand-morph">
            <!-- Ícones com Font Awesome -->
            <div class="morph-item" style="--delay: 0s">
              <i class="fa-solid fa-pen-nib morph-icon"></i>
              <span class="morph-name">Logo</span>
            </div>
            <div class="morph-item" style="--delay: 0.2s">
              <i class="fa-solid fa-palette morph-icon"></i>
              <span class="morph-name">Cores</span>
            </div>
            <div class="morph-item" style="--delay: 0.4s">
              <i class="fa-solid fa-font morph-icon"></i>
              <span class="morph-name">Tipografia</span>
            </div>
            <div class="morph-item" style="--delay: 0.6s">
              <i class="fa-solid fa-camera-retro morph-icon"></i>
              <span class="morph-name">Fotografia</span>
            </div>
            <div class="morph-item" style="--delay: 0.8s">
              <i class="fa-solid fa-star-of-life morph-icon"></i>
              <span class="morph-name">Ícones</span>
            </div>
            <div class="morph-item" style="--delay: 1s">
              <i class="fa-solid fa-puzzle-piece morph-icon"></i>
              <span class="morph-name">Patterns</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>Explore o Processo</span>
        <div class="arrow"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "PaginaAjuste",
  data() {
    return {
      morphItems: [
        {
          name: "Logo",
          icon: "🖋️",
          style: { top: "10%", left: "5%", "--delay": "0s" },
        },
        {
          name: "Cores",
          icon: "🎨",
          style: { top: "60%", left: "15%", "--delay": "0.2s" },
        },
        {
          name: "Tipografia",
          icon: "🔤",
          style: { top: "30%", left: "30%", "--delay": "0.4s" },
        },
        {
          name: "Fotografia",
          icon: "📸",
          style: { top: "70%", left: "50%", "--delay": "0.6s" },
        },
        {
          name: "Ícones",
          icon: "✨",
          style: { top: "20%", left: "65%", "--delay": "0.8s" },
        },
        {
          name: "Patterns",
          icon: "🧩",
          style: { top: "50%", left: "80%", "--delay": "1s" },
        },
      ],
      includes: [
        {
          icon: "🆔",
          title: "Identidade Primária",
          items: [
            "Design de Logo Principal",
            "Versões Alternativas",
            "Favicon & App Icon",
            "Área de Proteção",
            "Uso em Fundos Claros/Escuros",
            "Sistema de Redução",
          ],
        },
        {
          icon: "🎨",
          title: "Sistema de Cores",
          items: [
            "Paleta Primária (3-5 cores)",
            "Paleta Secundária",
            "Gradientes Autorais",
            "Cores para Dark Mode",
            "Combinações Aprovadas",
            "Guia de Aplicação",
          ],
        },
        {
          icon: "🖋️",
          title: "Tipografia",
          items: [
            "Família Primária (1-2 fontes)",
            "Hierarquia Tipográfica",
            "Web Fonts Configuradas",
            "Fallback Fonts",
            "Espaçamento e Leading",
            "Sistema de Escala",
          ],
        },
        {
          icon: "📸",
          title: "Diretrizes de Imagem",
          items: [
            "Estilo Fotográfico",
            "Direção de Arte",
            "Tratamento de Imagem",
            "Biblioteca de Referência",
            "Ilustrações Customizadas",
            "Ícones Exclusivos",
          ],
        },
        {
          icon: "🧩",
          title: "Elementos Gráficos",
          items: [
            "Patterns Exclusivos",
            "Texturas Autorais",
            "Formas e Elementos",
            "Sistema de Grid",
            "Efeitos Visuais",
            "Animação Básica",
          ],
        },
        {
          icon: "📱",
          title: "Aplicações Práticas",
          items: [
            "Templates para Redes Sociais",
            "Apresentações Corporativas",
            "Material Institucional",
            "Uniforme e Sinalização",
            "Embalagens e Produtos",
            "Merchandising",
          ],
        },
      ],
      processSteps: [
        {
          title: "Descoberta da Marca",
          description:
            "Workshop estratégico para extrair essência, valores e público-alvo",
          visual:
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Pesquisa e Análise",
          description: "Benchmarking de concorrentes e tendências de mercado",
          visual:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Conceituação",
          description: "Desenvolvimento de 3 direções criativas distintas",
          visual:
            "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Design e Refinamento",
          description: "Criação do sistema visual e aplicações práticas",
          visual:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "Manual da Marca",
          description: "Documentação completa com diretrizes de aplicação",
          visual:
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ],
      portfolioItems: [
        {
          client: "Urban Café",
          industry: "Gastronomia",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Urban+Café",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Embalagem",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Site",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Uniforme",
          ],
          colorHue: 30,
          stats: {
            growth: 3.2,
            recognition: 87,
          },
          features: [
            "Logo Responsivo",
            "Paleta Terrosa",
            "Tipografia Orgânica",
          ],
        },
        {
          client: "Nexus Tech",
          industry: "Tecnologia",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Nexus+Tech",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=App",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Apresentação",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Office",
          ],
          colorHue: 220,
          stats: {
            growth: 4.5,
            recognition: 92,
          },
          features: [
            "Sistema Modular",
            "Gradientes Digitais",
            "Ícones Pixel-Perfect",
          ],
        },
        {
          client: "Viva Verde",
          industry: "Sustentabilidade",
          logo: "https://via.placeholder.com/150x80/f1f5f9/64748b?text=Viva+Verde",
          applications: [
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Embalagem",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Social+Media",
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Sinalização",
          ],
          colorHue: 140,
          stats: {
            growth: 2.8,
            recognition: 95,
          },
          features: [
            "Ilustrações Manuais",
            "Texturas Naturais",
            "Fotografia Autoral",
          ],
        },
      ],
      tabs: [
        {
          id: "basic",
          label: "Branding Essencial",
          title: "Identidade Visual Básica",
          description:
            "Tudo que você precisa para lançar sua marca com personalidade",
          visual:
            "https://via.placeholder.com/500x400/f1f5f9/64748b?text=Essencial",
          features: [
            "Logo Principal + 2 Alternativas",
            "Paleta de Cores (3 primárias + 2 secundárias)",
            "1 Família Tipográfica",
            "Diretrizes Básicas de Aplicação",
            "Favicon e Ícone de App",
            "5 Templates para Redes Sociais",
          ],
          price: "R$ 4.900",
          time: "3-4 semanas",
        },
        {
          id: "complete",
          label: "Branding Completo",
          title: "Sistema de Identidade Visual",
          description:
            "Solução abrangente para marcas que querem dominar seu mercado",
          visual:
            "https://via.placeholder.com/500x400/f1f5f9/64748b?text=Completo",
          features: [
            "Tudo do Pacote Essencial +",
            "Sistema de Ícones Customizados",
            "2 Famílias Tipográficas (Display e Texto)",
            "Patterns e Elementos Gráficos Exclusivos",
            "Diretrizes de Fotografia e Ilustração",
            "Manual da Marca Digital (50+ páginas)",
            "20 Templates para Mídias Sociais",
          ],
          price: "R$ 9.900",
          time: "6-8 semanas",
        },
        {
          id: "premium",
          label: "Branding Corporativo",
          title: "Identidade Visual Premium",
          description:
            "Experiência completa para marcas que exigem excelência absoluta",
          visual:
            "https://via.placeholder.com/500x400/f1f5f9/64748b?text=Premium",
          features: [
            "Tudo do Pacote Completo +",
            "Workshop de Branding Presencial",
            "Sistema 3D e Motion Design",
            "Fotografia Profissional (1 dia de ensaio)",
            "Ilustrações Completamente Exclusivas",
            "Aplicações em Produtos Físicos",
            "Treinamento para Equipe Interna",
            "Consultoria de 3 meses",
          ],
          price: "R$ 19.900+",
          time: "10-12 semanas",
        },
      ],
      brandingElements: [
        {
          title: "Logo Design",
          description: "Símbolo único que encapsula a essência da sua marca",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Logo+Design",
          bgColor: "#f1f5f9",
          importance: 95,
        },
        {
          title: "Sistema de Cores",
          description: "Paleta estratégica que evoca as emoções certas",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Color+System",
          bgColor: "#e0f2fe",
          importance: 90,
        },
        {
          title: "Tipografia",
          description: "Fontes que dão voz e personalidade à sua marca",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Typography",
          bgColor: "#ecfdf5",
          importance: 85,
        },
        {
          title: "Fotografia",
          description: "Estilo visual consistente em todas as imagens",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Photography",
          bgColor: "#fef2f2",
          importance: 80,
        },
        {
          title: "Elementos Gráficos",
          description:
            "Padrões, ícones e texturas que complementam a identidade",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Graphics",
          bgColor: "#f5f3ff",
          importance: 75,
        },
        {
          title: "Tom de Voz",
          description: "Personalidade verbal que reforça sua identidade visual",
          image:
            "https://via.placeholder.com/300x200/f1f5f9/64748b?text=Tone+of+Voice",
          bgColor: "#fffbeb",
          importance: 70,
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Estilos Base */
.pagina-ajuste {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  padding: 8rem 0 10rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
      circle at 20% 30%,
      rgba(251, 191, 36, 0.1) 0%,
      transparent 30%
    ),
    radial-gradient(
      circle at 80% 70%,
      rgba(79, 70, 229, 0.1) 0%,
      transparent 30%
    );
}

.hero-content {
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
}

.title-line {
  display: block;
}

.highlight {
  position: relative;
  display: inline-block;
}

.highlight::after {
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

.pulse-text {
  animation: pulse 2s infinite;
}

.rotate-text {
  display: inline-block;
  animation: rotateWords 8s infinite;
}

@keyframes rotateWords {
  0%,
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  25%,
  45% {
    opacity: 0;
    transform: translateY(-20px);
  }
  50%,
  70% {
    opacity: 1;
    transform: translateY(0);
  }
  75%,
  95% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.cta-container-hero {
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

.cta-button:hover {
  background: #f59e0b;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(251, 191, 36, 0.4);
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

.brand-morph {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  height: 100%;
}

.morph-item {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  animation: float 5s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.morph-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.morph-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e293b;
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

/* ... (mantenha todos os outros estilos anteriores) ... */

.morph-icon {
  width: 32px;
  height: 32px;
  margin-bottom: 0.5rem;
  filter: invert(26%) sepia(89%) saturate(1550%) hue-rotate(230deg)
    brightness(95%) contrast(90%);
}

/* Responsividade */
@media (max-width: 1024px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-visual {
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .tabs-header button {
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }

  .tabs-header button.active::after {
    display: none;
  }
  /* Responsividade */
  @media (max-width: 768px) {
    .morph-icon {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
