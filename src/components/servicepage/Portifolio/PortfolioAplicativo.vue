<template>
    <section class="portfolio-section">
      <h2>Portfólio Aplicativos</h2>
      <div class="portfolio-filters">
        <button @click="filterPortfolio('all')">Todos</button>
        <button @click="filterPortfolio('technology')">Tecnologia</button>
        <button @click="filterPortfolio('ecommerce')">E-commerce</button>
        <button @click="filterPortfolio('blog')">Blog</button>
        <button @click="filterPortfolio('restaurant')">Restaurante</button>
        <button @click="filterPortfolio('fitness')">Fitness</button>
      </div>
      <div class="portfolio-grid">
        <div
          v-for="(item, index) in filteredItems"
          :key="index"
          class="portfolio-item"
          :data-category="item.category"
        >
          <img :src="item.image" :alt="item.description" loading="lazy" />
          <div class="portfolio-overlay">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'PortfoWebsite',
    data() {
      return {
        portfolioItems: [
          {
            image: 'https://images.unsplash.com/photo-1726064855857-46c37dc43c78?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Website para empresa de tecnologia',
            category: 'technology',
          },
          {
            image: 'https://images.unsplash.com/photo-1740165886179-c2be3d6447ca?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Loja virtual para e-commerce',
            category: 'ecommerce',
          },
          {
            image: 'https://images.unsplash.com/photo-1740141340584-a749ceac44a1?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Blog pessoal com design moderno',
            category: 'blog',
          },
          {
            image: 'https://images.unsplash.com/photo-1739775225955-ba1ba496d28d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Portfólio criativo para designer',
            category: 'portfolio',
          },
          {
            image: 'https://images.unsplash.com/photo-1740257862940-66edfed66a6a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Website para restaurante gourmet',
            category: 'restaurant',
          },
          {
            image: 'https://images.unsplash.com/photo-1740137660688-3d3f2b5422b6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Site para academia e fitness',
            category: 'fitness',
          },
        ],
        filteredItems: [],
      };
    },
    methods: {
      filterPortfolio(category) {
        if (category === 'all') {
          this.filteredItems = this.portfolioItems;
        } else {
          this.filteredItems = this.portfolioItems.filter(
            (item) => item.category === category
          );
        }
      },
    },
    mounted() {
      // Inicializa o portfólio com todos os iten s
      this.filteredItems = this.portfolioItems;
    },
  };
  </script>
  
  <style scoped >
  .portfolio-section {
    padding: 40px 20px;
    background-color: #f9f9f9;
    text-align: center;
  }
  
  .portfolio-section h2 {
    margin-bottom: 20px;
    font-size: 2rem;
    color: #333;
  }
  
  .portfolio-filters {
    margin-bottom: 20px;
  }
  
  .portfolio-filters button {
    margin: 5px;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .portfolio-filters button:hover {
    background-color: #0056b3;
  }
  
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    padding: 0 20px;
  }
  
  .portfolio-item {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .portfolio-item img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
  }
  
  .portfolio-item:hover img {
    transform: scale(1.1);
  }
  
  .portfolio-overlay {
    position: absolute;
    bottom: -100%;
    left: 0;
    right: 0;
    background: rgba(230, 215, 215, 0.7);
    color: #fff;
    padding: 20px;
    text-align: center;
    transition: bottom 0.3s ease;
  }
  
  .portfolio-item:hover .portfolio-overlay {
    bottom: 0;
  }
  
  .portfolio-overlay p {
    margin: 0;
    font-size: 1rem;
  }
  </style>