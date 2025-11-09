<template>
  <div class="loja-digital">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">
          Produtos Digitais
          <span class="highlight">Premium</span>
        </h1>
        <p class="hero-description">
          Softwares, plugins, cursos e templates profissionais para impulsionar
          seu negócio digital
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ publishedProducts.length }}+</span>
            <span class="stat-label">Produtos</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">5.0</span>
            <span class="stat-label">Avaliação</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Suporte</span>
          </div>
        </div>
      </div>
      <div class="hero-decoration">
        <div class="decoration-circle"></div>
        <div class="decoration-dots"></div>
      </div>
    </section>

    <!-- Produtos em Destaque -->
    <section v-if="featuredProducts.length > 0" class="featured-section">
      <div class="section-header"></div>
      <h2 class="section-title">
        <i class="fas fa-star"></i>
        Produtos em Destaque
      </h2>
      <p class="section-subtitle">Os produtos mais populares e recomendados</p>
      <div class="featured-grid">
        <div
          v-for="product in featuredProducts"
          :key="product._id"
          class="featured-card"
        >
          <div class="featured-badge">
            <i class="fas fa-star"></i>
            Destaque
          </div>
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" />
            <div class="product-overlay">
              <button class="btn-demo" v-if="product.demoUrl">
                <i class="fas fa-play"></i>
                Demo
              </button>
            </div>
          </div>
          <div class="product-content">
            <div class="product-meta">
              <span class="category-tag" :class="product.category">
                {{ getCategoryLabel(product.category) }}
              </span>
              <span v-if="product.version" class="version-tag">
                v{{ product.version }}
              </span>
            </div>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-description">
              {{
                product.shortDescription ||
                product.description.substring(0, 100) + "..."
              }}
            </p>
            <div
              class="product-features"
              v-if="product.features && product.features.length > 0"
            >
              <div
                v-for="(feature, index) in product.features.slice(0, 3)"
                :key="index"
                class="feature-item"
              >
                <i class="fas fa-check"></i>
                {{ feature }}
              </div>
            </div>
            <div class="product-footer">
              <div class="price-section">
                <div v-if="product.salePrice" class="price-group">
                  <span class="old-price"
                    >R$ {{ formatPrice(product.price) }}</span
                  >
                  <span class="current-price"
                    >R$ {{ formatPrice(product.salePrice) }}</span
                  >
                  <span class="discount-badge">
                    {{ calculateDiscount(product.price, product.salePrice) }}%
                    OFF
                  </span>
                </div>
                <div v-else>
                  <span class="current-price"
                    >R$ {{ formatPrice(product.price) }}</span
                  >
                </div>
              </div>
              <button class="btn-buy" @click="viewProduct(product)">
                <i class="fas fa-shopping-cart"></i>
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtros e Busca -->
    <section class="products-section">
      <div class="section-header">
        <h2 class="section-title">
          <i class="fas fa-box-open"></i>
          Todos os Produtos
        </h2>
      </div>

      <div class="filters-container">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Buscar produtos..."
            @input="handleSearch"
          />
        </div>
        <div class="category-filters">
          <button
            v-for="category in categories"
            :key="category.value"
            :class="[
              'filter-btn',
              { active: selectedCategory === category.value },
            ]"
            @click="filterByCategory(category.value)"
          >
            <i :class="category.icon"></i>
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Grid de Produtos -->
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Carregando produtos...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-triangle"></i>
        <p>{{ error }}</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>Nenhum produto encontrado</p>
      </div>

      <div v-else class="products-grid">
        <div
          v-for="product in filteredProducts"
          :key="product._id"
          class="product-card"
        >
          <div class="card-image-wrapper">
            <img :src="product.image" :alt="product.name" />
            <div v-if="product.salePrice" class="discount-label">
              -{{ calculateDiscount(product.price, product.salePrice) }}%
            </div>
          </div>
          <div class="card-content">
            <span class="category-tag" :class="product.category">
              {{ getCategoryLabel(product.category) }}
            </span>
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-desc">
              {{
                product.shortDescription ||
                product.description.substring(0, 80) + "..."
              }}
            </p>
            <div class="card-footer">
              <div class="price-info">
                <span v-if="product.salePrice" class="original-price">
                  R$ {{ formatPrice(product.price) }}
                </span>
                <span class="final-price">
                  R$ {{ formatPrice(product.salePrice || product.price) }}
                </span>
              </div>
              <button class="btn-view" @click="viewProduct(product)">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recursos e Benefícios -->
    <section class="benefits-section">
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-download"></i>
          </div>
          <h3>Download Imediato</h3>
          <p>Acesso instantâneo após a compra</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-sync"></i>
          </div>
          <h3>Atualizações Grátis</h3>
          <p>Receba todas as atualizações futuras</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-headset"></i>
          </div>
          <h3>Suporte Premium</h3>
          <p>Atendimento dedicado 24/7</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Pagamento Seguro</h3>
          <p>Transações protegidas e criptografadas</p>
        </div>
      </div>
    </section>

    <!-- Modal de Produto (Opcional - você pode criar uma página de detalhes depois) -->
    <div
      v-if="selectedProduct"
      class="product-modal"
      @click="selectedProduct = null"
    >
      <div class="modal-content" @click.stop>
        <button class="close-modal" @click="selectedProduct = null">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-body">
          <div class="modal-image">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" />
          </div>
          <div class="modal-details">
            <span class="category-tag" :class="selectedProduct.category">
              {{ getCategoryLabel(selectedProduct.category) }}
            </span>
            <h2>{{ selectedProduct.name }}</h2>
            <p class="modal-description">{{ selectedProduct.description }}</p>

            <div
              v-if="
                selectedProduct.features && selectedProduct.features.length > 0
              "
              class="features-list"
            >
              <h4>Recursos:</h4>
              <ul>
                <li
                  v-for="(feature, index) in selectedProduct.features"
                  :key="index"
                >
                  <i class="fas fa-check-circle"></i>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="product-info-grid">
              <div v-if="selectedProduct.version" class="info-item">
                <i class="fas fa-code-branch"></i>
                <span>Versão {{ selectedProduct.version }}</span>
              </div>
              <div v-if="selectedProduct.fileSize" class="info-item">
                <i class="fas fa-hdd"></i>
                <span>{{ selectedProduct.fileSize }}</span>
              </div>
              <div v-if="selectedProduct.format" class="info-item">
                <i class="fas fa-file"></i>
                <span>{{ selectedProduct.format }}</span>
              </div>
              <div v-if="selectedProduct.language" class="info-item">
                <i class="fas fa-language"></i>
                <span>{{ selectedProduct.language }}</span>
              </div>
            </div>

            <div class="modal-footer">
              <div class="modal-price">
                <span v-if="selectedProduct.salePrice" class="old-price">
                  R$ {{ formatPrice(selectedProduct.price) }}
                </span>
                <span class="current-price">
                  R$
                  {{
                    formatPrice(
                      selectedProduct.salePrice || selectedProduct.price
                    )
                  }}
                </span>
              </div>
              <div class="modal-actions">
                <button
                  v-if="selectedProduct.demoUrl"
                  class="btn-demo-full"
                  @click="openDemo(selectedProduct.demoUrl)"
                >
                  <i class="fas fa-play"></i>
                  Ver Demo
                </button>
                <button class="btn-buy-full">
                  <i class="fas fa-shopping-cart"></i>
                  Comprar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useProductStore } from "../../stores/productStore";
import type { Product } from "../../services/productService";

export default defineComponent({
  name: "LojaView",
  setup() {
    const productStore = useProductStore();
    return { productStore };
  },
  data() {
    return {
      searchQuery: "",
      selectedCategory: "",
      selectedProduct: null as Product | null,
      searchTimeout: null as any,
      categories: [
        { value: "", label: "Todos", icon: "fas fa-th" },
        { value: "software", label: "Software", icon: "fas fa-laptop-code" },
        { value: "plugin", label: "Plugins", icon: "fas fa-plug" },
        { value: "curso", label: "Cursos", icon: "fas fa-graduation-cap" },
        { value: "tutorial", label: "Tutoriais", icon: "fas fa-book" },
        { value: "ebook", label: "E-books", icon: "fas fa-book-open" },
        { value: "template", label: "Templates", icon: "fas fa-paint-brush" },
        { value: "outros", label: "Outros", icon: "fas fa-ellipsis-h" },
      ],
    };
  },
  computed: {
    publishedProducts(): Product[] {
      return this.productStore.publishedProducts;
    },
    featuredProducts(): Product[] {
      return this.productStore.getFeaturedProducts;
    },
    filteredProducts(): Product[] {
      let products = this.publishedProducts;

      // Filtrar produtos em destaque da lista principal
      products = products.filter((p: Product) => !p.featured);

      if (this.selectedCategory) {
        products = products.filter(
          (p: Product) => p.category === this.selectedCategory
        );
      }

      return products;
    },
    loading(): boolean {
      return this.productStore.loading;
    },
    error(): string | null {
      return this.productStore.error;
    },
  },
  methods: {
    async loadProducts() {
      await this.productStore.fetchPublishedProducts({ limit: 100 });
    },
    filterByCategory(category: string) {
      this.selectedCategory = category;
    },
    handleSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        const params: any = { limit: 100 };
        if (this.searchQuery) params.search = this.searchQuery;
        if (this.selectedCategory) params.category = this.selectedCategory;

        await this.productStore.fetchPublishedProducts(params);
      }, 500);
    },
    viewProduct(product: Product) {
      this.selectedProduct = product;
    },
    openDemo(url: string) {
      window.open(url, "_blank");
    },
    getCategoryLabel(category: string): string {
      const categoryMap: Record<string, string> = {
        software: "Software",
        plugin: "Plugin",
        tutorial: "Tutorial",
        curso: "Curso",
        ebook: "E-book",
        template: "Template",
        outros: "Outros",
      };
      return categoryMap[category] || category;
    },
    formatPrice(price: number): string {
      return price.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    calculateDiscount(originalPrice: number, salePrice: number): number {
      return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
    },
  },
  mounted() {
    this.loadProducts();
  },
});
</script>

<style scoped>
.loja-digital {
  min-height: 100vh;
  background: #f9fafb;
}

/* Hero Section */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #0052ff 0%, #0041cc 100%);
  padding: 120px 20px 80px;
  overflow: hidden;
  color: white;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.2;
}

.highlight {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 20px;
  margin-bottom: 48px;
  opacity: 0.95;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-number {
  font-size: 36px;
  font-weight: 700;
  color: #fbbf24;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  top: -200px;
  right: -200px;
}

.decoration-dots {
  position: absolute;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
  bottom: -100px;
  left: -100px;
}

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.section-title i {
  color: #0052ff;
}

.section-subtitle {
  font-size: 18px;
  color: #6b7280;
}

/* Featured Section */
.featured-section {
  max-width: 1200px;
  margin: -60px auto 80px;
  padding: 0 20px;
  position: relative;
  z-index: 3;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
}

.featured-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  position: relative;
}

.featured-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
}

.product-image-wrapper {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.featured-card:hover .product-image-wrapper img {
  transform: scale(1.1);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.featured-card:hover .product-overlay {
  opacity: 1;
}

.btn-demo {
  background: white;
  color: #0052ff;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-demo:hover {
  transform: scale(1.05);
}

.product-content {
  padding: 28px;
}

.product-meta {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.category-tag {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.category-tag.software {
  background: #dbeafe;
  color: #1e40af;
}
.category-tag.plugin {
  background: #fce7f3;
  color: #be185d;
}
.category-tag.tutorial {
  background: #fef3c7;
  color: #92400e;
}
.category-tag.curso {
  background: #e0e7ff;
  color: #3730a3;
}
.category-tag.ebook {
  background: #ddd6fe;
  color: #5b21b6;
}
.category-tag.template {
  background: #d1fae5;
  color: #065f46;
}
.category-tag.outros {
  background: #f3f4f6;
  color: #374151;
}

.version-tag {
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  padding: 4px 10px;
  border-radius: 12px;
}

.product-name {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
  line-height: 1.3;
}

.product-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 15px;
}

.product-features {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #374151;
  font-size: 14px;
}

.feature-item i {
  color: #10b981;
  font-size: 12px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.price-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.old-price {
  font-size: 14px;
  color: #9ca3af;
  text-decoration: line-through;
}

.current-price {
  font-size: 28px;
  font-weight: 700;
  color: #0052ff;
}

.discount-badge {
  font-size: 12px;
  background: #dcfce7;
  color: #065f46;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 600;
}

.btn-buy {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-buy:hover {
  transform: translateX(4px);
  box-shadow: 0 8px 16px rgba(0, 82, 255, 0.3);
}

/* Products Section */
.products-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.filters-container {
  margin-bottom: 48px;
}

.search-bar {
  position: relative;
  max-width: 500px;
  margin: 0 auto 32px;
}

.search-bar i {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 18px;
}

.search-bar input {
  width: 100%;
  padding: 16px 20px 16px 56px;
  border: 2px solid #e5e7eb;
  border-radius: 50px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: #0052ff;
  box-shadow: 0 0 0 4px rgba(0, 82, 255, 0.1);
}

.category-filters {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 24px;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  color: #6b7280;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-btn:hover {
  border-color: #0052ff;
  color: #0052ff;
}

.filter-btn.active {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  border-color: #0052ff;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.card-image-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.product-card:hover .card-image-wrapper img {
  transform: scale(1.1);
}

.discount-label {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
}

.card-content {
  padding: 24px;
}

.product-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 12px 0 8px;
  line-height: 1.3;
}

.product-desc {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.original-price {
  font-size: 13px;
  color: #9ca3af;
  text-decoration: line-through;
}

.final-price {
  font-size: 22px;
  font-weight: 700;
  color: #0052ff;
}

.btn-view {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-view:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 82, 255, 0.3);
}

/* Benefits Section */
.benefits-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 60px 20px;
  background: white;
  border-radius: 24px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.benefit-card {
  text-align: center;
  padding: 32px 24px;
}

.benefit-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #0052ff, #0041cc);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: white;
}

.benefit-card h3 {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.benefit-card p {
  color: #6b7280;
  line-height: 1.6;
}

/* States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #6b7280;
}

.loading-state i,
.error-state i,
.empty-state i {
  font-size: 64px;
  margin-bottom: 24px;
  display: block;
  color: #9ca3af;
}

.loading-state i {
  color: #0052ff;
}

.error-state i {
  color: #ef4444;
}

/* Product Modal */
.product-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.modal-content {
  background: white;
  border-radius: 24px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 20px;
  z-index: 10;
  transition: all 0.3s ease;
}

.close-modal:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 40px;
}

.modal-image {
  border-radius: 16px;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-details h2 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
}

.modal-description {
  color: #6b7280;
  line-height: 1.8;
  font-size: 16px;
}

.features-list h4 {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16px;
}

.features-list ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #374151;
}

.features-list i {
  color: #10b981;
  font-size: 18px;
}

.product-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
  font-size: 14px;
  color: #374151;
}

.info-item i {
  color: #0052ff;
  font-size: 18px;
}

.modal-footer {
  padding-top: 24px;
  border-top: 2px solid #f3f4f6;
}

.modal-price {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.modal-price .old-price {
  font-size: 18px;
}

.modal-price .current-price {
  font-size: 40px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-demo-full,
.btn-buy-full {
  flex: 1;
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.btn-demo-full {
  background: #f3f4f6;
  color: #374151;
}

.btn-demo-full:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.btn-buy-full {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
}

.btn-buy-full:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 82, 255, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .modal-body {
    grid-template-columns: 1fr;
  }

  .featured-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 40px;
  }

  .hero-description {
    font-size: 18px;
  }

  .section-title {
    font-size: 28px;
  }

  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .category-filters {
    gap: 8px;
  }

  .filter-btn {
    padding: 10px 16px;
    font-size: 14px;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 32px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
