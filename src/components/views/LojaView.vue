<template>
    <div>
      <!-- Hero Section with Slider -->
      <section class="hero-slider">
        <div class="slider-container">
          <div v-for="(slide, index) in slides" :key="index" :class="['slide', { active: currentSlide === index }]">
            <div class="slide-content">
              <h1>{{ slide.title }}</h1>
              <p>{{ slide.description }}</p>
              <a href="#products" class="cta-button">{{ slide.buttonText }}</a>
            </div>
            <div class="slide-bg" :style="{ backgroundImage: `url(${slide.backgroundImage})` }"></div>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevSlide" class="prev-slide">❮</button>
          <button @click="nextSlide" class="next-slide">❯</button>
        </div>
      </section>
  
      <!-- Products/Services Section -->
      <section id="products" class="products-section">
        <div class="section-header">
          <h2>Nossas Soluções de IA</h2>
          <div class="category-filter">
            <button
              v-for="category in categories"
              :key="category"
              :class="['filter-btn', { active: selectedCategory === category }]"
              @click="filterProducts(category)"
            >
              {{ category }}
            </button>
          </div>
        </div>
        <div class="products-grid">
          <div v-for="product in filteredProducts" :key="product.id" class="product-card">
            <img :src="product.image" :alt="product.title" class="product-image" />
            <div class="product-content">
              <h3 class="product-title">{{ product.title }}</h3>
              <p class="product-description">{{ product.description }}</p>
              <div class="product-price">
                R$ {{ product.price.toLocaleString('pt-BR') }}
                <small>/mês</small>
              </div>
              <button class="product-button">
                <router-link :to="`/produtos/${product.id}`" class="btn-carrinho">
                  <span>Detalhes do Produto</span>
                </router-link>
                
                <img src="https://api.iconify.design/heroicons:shopping-cart.svg" alt="Cart" />
              </button>
            </div>
          </div>
        </div>
      </section>     
        
    </div>
  </template>
  
  <script>
  export default {
    name: 'EcommerceView',
    components: {
    },
    data() {
      return {
        // Dados do slider
        slides: [
          {
            title: "Transforme Seu Negócio com IA",
            description: "Soluções inteligentes para automatizar e escalar seu negócio",
            buttonText: "Explorar Soluções",
            backgroundImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
          },
          {
            title: "Automatize Processos com IA",
            description: "Tecnologia de ponta para otimizar suas operações",
            buttonText: "Descobrir Mais",
            backgroundImage: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D5",
          },
          {
            title: "Automatize Processos com IA",
            description: "Tecnologia de ponta para otimizar suas operações",
            buttonText: "Descobrir Mais",
            backgroundImage: "https://plus.unsplash.com/premium_photo-1683121718643-fb18d2668d53?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          },
        ],
        currentSlide: 0,
  
        // Dados dos produtos
        products: [
          {
            id: 1,
            title: "AI Chatbot Enterprise",
            description: "Chatbot avançado com IA para atendimento ao cliente 24/7, integração multicanal e análise de sentimentos.",
            price: 2499.99,
            category: "chatbot",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
          {
            id: 2,
            title: "Análise Preditiva de Dados",
            description: "Sistema de análise de dados com IA para previsão de tendências de mercado e comportamento do consumidor.",
            price: 3999.99,
            category: "analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
          {
            id: 3,
            title: "Marketing Automation Pro",
            description: "Plataforma de automação de marketing com IA para personalização de campanhas e otimização de conversão.",
            price: 1999.99,
            category: "marketing",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          },
          {
            id: 4,
            title: "Smart Content Generator",
            description: "Gerador de conteúdo inteligente com IA para blogs, redes sociais e email marketing.",
            price: 899.99,
            category: "marketing",
            image: "https://images.unsplash.com/photo-1542435503-956c469947f6",
          },
          {
            id: 5,
            title: "Business Intelligence Suite",
            description: "Suite completa de BI com dashboards inteligentes e relatórios automatizados.",
            price: 4999.99,
            category: "analytics",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
          {
            id: 6,
            title: "Customer Service Bot",
            description: "Chatbot especializado em suporte técnico com aprendizado contínuo e integração com CRM.",
            price: 1499.99,
            category: "chatbot",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          },
        ],
        selectedCategory: "all",
        categories: ["all", "chatbot", "analytics", "marketing"],
      };
    },
    computed: {
      // Filtra os produtos com base na categoria selecionada
      filteredProducts() {
        if (this.selectedCategory === "all") {
          return this.products;
        }
        return this.products.filter((product) => product.category === this.selectedCategory);
      },
    },
    methods: {
      // Navegação do slider
      nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      },
      prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      },
      // Filtra os produtos por categoria
      filterProducts(category) {
        this.selectedCategory = category;
      },
    },
    mounted() {
      // Auto-avanço do slider
      setInterval(this.nextSlide, 5000);
    },
  };
  </script>
  
  <style scoped>
  /* Adicione seus estilos aqui, se necessário */
  .btn-carrinho {
    text-decoration: none;
    color: inherit;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  /* Global Styles */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: #ffffff; /* Substituído --bg-primary */
    color: #1f2937; /* Substituído --text-primary */
    transition: all 0.3s ease; /* Substituído --transition */
    line-height: 1.6;
  }

  [data-theme='dark'] body {
    background-color: #1f2937; /* Substituído --bg-primary */
    color: #f3f4f6; /* Substituído --text-primary */
  }

  /* Header Styles */
  .header {
    background-color: #ffffff; /* Substituído --bg-primary */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(10px);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    height: 40px;
    transition: transform 0.3s ease;
  }

  .logo:hover img {
    transform: scale(1.05);
  }

  .main-nav {
    display: flex;
    gap: 2rem;
  }

  .nav-link {
    color: #1f2937; /* Substituído --text-primary */
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease; /* Substituído --transition */
    position: relative;
    padding: 0.5rem 0;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #0052FF; /* Substituído --primary-color */
    transition: width 0.3s ease;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .theme-toggle, .account-button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1f2937; /* Substituído --text-primary */
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.3s ease; /* Substituído --transition */
    font-weight: 500;
  }

  .theme-toggle:hover, .account-button:hover {
    background-color: #f3f4f6; /* Substituído --bg-secondary */
    transform: translateY(-2px);
  }

  /* Hero Slider */
  .hero-slider {
    margin-top: 80px;
    position: relative;
    height: 600px;
    overflow: hidden;
  }

  .slider-container {
    height: 100%;
    position: relative;
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
  }

  .slide.active {
    opacity: 1;
  }

  .slide-content {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 6rem 2rem;
    color: white;
  }

  .slide-content h1 {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    animation: slideUp 0.8s ease-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .slide-content p {
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
    animation: slideUp 0.8s ease-out 0.2s;
    opacity: 0;
    animation-fill-mode: forwards;
    max-width: 600px;
  }

  .slide-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: brightness(0.6);
    transform: scale(1.1);
    transition: transform 8s ease;
  }

  .slide.active .slide-bg {
    transform: scale(1);
  }

  .cta-button {
    display: inline-block;
    background-color: #0052FF; /* Substituído --primary-color */
    color: rgb(255, 255, 255);
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 2rem;
    font-weight: 600;
    transition: all 0.3s ease; /* Substituído --transition */
    border: 2px solid transparent;
    animation: slideUp 0.8s ease-out 0.4s;
    opacity: 0;
    animation-fill-mode: forwards;
    transition: transform 0.5s ease;
  }

  .cta-button:hover {
    border-color: rgb(48, 50, 175);
    color: #10b981; /* Substituído --success-color */
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  /* Products Section */
  .products-section {
    max-width: 1200px;
    margin: 6rem auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #0052FF, #E5E7EB); /* Substituído --primary-color e --secondary-color */
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .category-filter {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 2rem 0;
    flex-wrap: wrap;
  }

  .filter-btn {
    background: none;
    border: 2px solid #0052FF; /* Substituído --primary-color */
    color: #0052FF; /* Substituído --primary-color */
    padding: 0.75rem 2rem;
    border-radius: 2rem;
    cursor: pointer;
    transition: all 0.3s ease; /* Substituído --transition */
    font-weight: 600;
  }

  .filter-btn.active, .filter-btn:hover {
    background-color: #0052FF; /* Substituído --primary-color */
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-top: 3rem;
  }

  .product-card {
    background-color: #f3f4f6; /* Substituído --bg-secondary */
    border-radius: 1.5rem;
    overflow: hidden;
    transition: all 0.3s ease; /* Substituído --transition */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    animation: 3s ease-in-out 0s 1 slideUp;
    transition: transform 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    animation: 3s ease-in-out 0s 1 slideUp;
    transform: scale(1.1);
  }

  .product-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .product-card:hover .product-image {
    transform: scale(1.1);
  }

  .product-content {
    padding: 2rem;
  }

  .product-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1f2937; /* Substituído --text-primary */
  }

  .product-description {
    color: #4b5563; /* Substituído --text-secondary */
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .product-price {
    font-size: 1.75rem;
    font-weight: 800;
    color: #0052FF; /* Substituído --primary-color */
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .product-price small {
    font-size: 1rem;
    color: #4b5563; /* Substituído --text-secondary */
    font-weight: normal;
  }

  .product-button {
    background-color: #0052FF; /* Substituído --primary-color */
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.3s ease; /* Substituído --transition */
    width: 100%;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .product-button:hover {
    background-color: #f59e0b; /* Substituído --warning-color */
    color: white;
    transform: translateY(-2px);
  }

  /* Animations */
  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 2rem;
    }

    .main-nav {
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .nav-link {
      width: 100%;
      text-align: center;
      padding: 0.75rem 0;
    }

    .slide-content h1 {
      font-size: 2.5rem;
    }

    .slide-content p {
      font-size: 1.25rem;
    }

    .products-grid {
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      padding: 0 1rem;
    }

    .product-card {
      margin-bottom: 1rem;
    }
  }
</style>