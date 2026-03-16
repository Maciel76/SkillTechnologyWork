<template>
  <div class="loja-digital">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-grid"></div>
      </div>
      <div class="hero-content">
        <span class="hero-badge">
          <i class="fas fa-bolt"></i> Produtos Digitais de Alta Qualidade
        </span>
        <h1 class="hero-title">
          Ferramentas <span class="highlight">Premium</span><br />
          para seu Negócio Digital
        </h1>
        <p class="hero-description">
          Softwares, plugins, cursos e templates criados por especialistas
          para acelerar seus resultados
        </p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">{{ publishedProducts.length }}+</span>
            <span class="stat-label">Produtos</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">5.0</span>
            <span class="stat-label">Avaliação</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Suporte</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Produtos em Destaque -->
    <section v-if="featuredProducts.length > 0" class="featured-section">
      <div class="section-header">
        
        <h2 class="section-title">Produtos em Destaque</h2>
        <p class="section-subtitle">Os produtos mais populares e recomendados pela nossa equipe</p>
      </div>
      <div class="featured-grid">
        <div
          v-for="product in featuredProducts"
          :key="product._id"
          class="featured-card"
          @click="viewProduct(product)"
        >
          <div class="featured-badge">
            <i class="fas fa-crown"></i>
            Destaque
          </div>
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" loading="lazy" />
            <div class="product-overlay">
              <button class="btn-demo" v-if="product.demoUrl" @click.stop="openDemo(product.demoUrl)">
                <i class="fas fa-play"></i>
                Demo
              </button>
              <button class="btn-details">
                <i class="fas fa-eye"></i>
                Ver Detalhes
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
              {{ product.shortDescription || product.description.substring(0, 100) + '...' }}
            </p>
            <div class="product-features" v-if="product.features && product.features.length > 0">
              <div
                v-for="(feature, index) in product.features.slice(0, 3)"
                :key="index"
                class="feature-item"
              >
                <i class="fas fa-check-circle"></i>
                {{ feature }}
              </div>
            </div>
            <div class="product-footer">
              <div class="price-section">
                <div v-if="product.salePrice" class="price-group">
                  <span class="old-price">R$ {{ formatPrice(product.price) }}</span>
                  <span class="current-price">R$ {{ formatPrice(product.salePrice) }}</span>
                  <span class="discount-badge">
                    {{ calculateDiscount(product.price, product.salePrice) }}% OFF
                  </span>
                </div>
                <div v-else>
                  <span class="current-price">R$ {{ formatPrice(product.price) }}</span>
                </div>
              </div>
              <button class="btn-buy" @click.stop="viewProduct(product)">
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
        <span class="section-badge"><i class="fas fa-box-open"></i> Catálogo</span>
        <h2 class="section-title">Todos os Produtos</h2>
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
            :class="['filter-btn', { active: selectedCategory === category.value }]"
            @click="filterByCategory(category.value)"
          >
            <i :class="category.icon"></i>
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Grid de Produtos -->
      <div v-if="loading" class="loading-state">
        <div class="loading-spinner"></div>
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
          @click="viewProduct(product)"
        >
          <div class="card-image-wrapper">
            <img :src="product.image" :alt="product.name" loading="lazy" />
            <div v-if="product.salePrice" class="discount-label">
              -{{ calculateDiscount(product.price, product.salePrice) }}%
            </div>
            <div class="card-category">
              <span class="category-tag" :class="product.category">
                {{ getCategoryLabel(product.category) }}
              </span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="product-title">{{ product.name }}</h3>
            <p class="product-desc">
              {{ product.shortDescription || product.description.substring(0, 80) + '...' }}
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
              <button class="btn-view" @click.stop="viewProduct(product)">
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recursos e Benefícios -->
    <section class="benefits-section">
      <div class="section-header">
        <span class="section-badge"><i class="fas fa-shield-alt"></i> Garantias</span>
        <h2 class="section-title">Por que Escolher Nossos Produtos?</h2>
      </div>
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <i class="fas fa-download"></i>
          </div>
          <h3>Download Imediato</h3>
          <p>Acesso instantâneo após a compra, sem espera</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon sync">
            <i class="fas fa-sync"></i>
          </div>
          <h3>Atualizações Grátis</h3>
          <p>Receba todas as atualizações futuras sem custo extra</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon headset">
            <i class="fas fa-headset"></i>
          </div>
          <h3>Suporte Premium</h3>
          <p>Atendimento dedicado 24/7 por especialistas</p>
        </div>
        <div class="benefit-card">
          <div class="benefit-icon shield">
            <i class="fas fa-shield-alt"></i>
          </div>
          <h3>Pagamento Seguro</h3>
          <p>Transações protegidas e criptografadas</p>
        </div>
      </div>
    </section>

    <!-- CTA Newsletter -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Fique por dentro das novidades</h2>
        <p>Receba em primeira mão nossos lançamentos e ofertas exclusivas</p>
      </div>
    </section>

    <!-- Modal de Produto -->
    <Teleport to="body">
      <Transition name="modal-fade">
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
                <div v-if="selectedProduct.salePrice" class="modal-discount-badge">
                  -{{ calculateDiscount(selectedProduct.price, selectedProduct.salePrice) }}%
                </div>
              </div>
              <div class="modal-details">
                <span class="category-tag" :class="selectedProduct.category">
                  {{ getCategoryLabel(selectedProduct.category) }}
                </span>
                <h2>{{ selectedProduct.name }}</h2>
                <p class="modal-description">{{ selectedProduct.description }}</p>

                <div
                  v-if="selectedProduct.features && selectedProduct.features.length > 0"
                  class="features-list"
                >
                  <h4><i class="fas fa-check-double"></i> Recursos inclusos:</h4>
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
                      R$ {{ formatPrice(selectedProduct.salePrice || selectedProduct.price) }}
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
                    <button class="btn-buy-full" @click="buyViaWhatsApp(selectedProduct)">
                      <i class="fab fa-whatsapp"></i>
                      Comprar via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
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
    buyViaWhatsApp(product: Product) {
      const price = product.salePrice || product.price;
      const message = `Olá! Tenho interesse no produto:\n\n` +
        `*${product.name}*\n` +
        `Categoria: ${this.getCategoryLabel(product.category)}\n` +
        `Valor: R$ ${this.formatPrice(price)}\n\n` +
        `Gostaria de mais informações para finalizar a compra.`;
      const phone = '5562982809010';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
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
  background: #f8fafc;
}

/* ─── Hero Section ─── */
.hero-section {
  position: relative;
  background: linear-gradient(160deg, #183253 0%, #1074d1 50%, #2266c0 100%);
  padding: 140px 20px 100px;
  overflow: hidden;
  color: white;
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  top: -200px;
  right: -150px;
  animation: float 8s ease-in-out infinite;
}

.shape-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%);
  bottom: -50px;
  left: -50px;
  animation: float 6s ease-in-out infinite reverse;
}

.shape-3 {
  width: 150px;
  height: 150px;
  border: 2px solid rgba(255,255,255,0.08);
  top: 20%;
  left: 15%;
  animation: float 10s ease-in-out infinite;
}

.shape-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  border-radius: 0;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.12);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.15);
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 32px;
  color: #fbbf24;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 24px;
  line-height: 1.1;
  letter-spacing: -1px;
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
  opacity: 0.85;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

.hero-stats {
  display: inline-flex;
  align-items: center;
  gap: 32px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 24px 48px;
  border-radius: 20px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.2);
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stat-number {
  font-size: 32px;
  font-weight: 800;
  color: #fbbf24;
}

.stat-label {
  font-size: 13px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
}

/* ─── Section Headers ─── */
.section-header {
  margin-top: 80px;
  text-align: center;
  margin-bottom: 48px;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, rgba(0,82,255,0.08), rgba(0,82,255,0.04));
  border: 1px solid rgba(0,82,255,0.12);
  color: #0052ff;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 40px;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 18px;
  color: #64748b;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ─── Featured Section ─── */
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
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(0,0,0,0.04);
  cursor: pointer;
}

.featured-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 24px 64px rgba(0,82,255,0.15);
  border-color: rgba(0,82,255,0.1);
}

.featured-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(245,158,11,0.3);
}

.product-image-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.product-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.featured-card:hover .product-image-wrapper img {
  transform: scale(1.08);
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.8) 100%);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  padding-bottom: 24px;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.featured-card:hover .product-overlay {
  opacity: 1;
}

.btn-demo,
.btn-details {
  background: rgba(255,255,255,0.95);
  color: #0f172a;
  padding: 10px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.btn-demo:hover,
.btn-details:hover {
  background: white;
  transform: translateY(-2px);
}

.product-content {
  padding: 28px;
}

.product-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: center;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-tag.software { background: #dbeafe; color: #1e40af; }
.category-tag.plugin { background: #fce7f3; color: #be185d; }
.category-tag.tutorial { background: #fef3c7; color: #92400e; }
.category-tag.curso { background: #e0e7ff; color: #3730a3; }
.category-tag.ebook { background: #ede9fe; color: #5b21b6; }
.category-tag.template { background: #d1fae5; color: #065f46; }
.category-tag.outros { background: #f1f5f9; color: #475569; }

.version-tag {
  font-size: 11px;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 8px;
  font-weight: 600;
}

.product-name {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
  line-height: 1.3;
}

.product-description {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 15px;
}

.product-features {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #334155;
  font-size: 14px;
}

.feature-item i {
  color: #10b981;
  font-size: 14px;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid #f1f5f9;
}

.price-section { display: flex; flex-direction: column; gap: 4px; }
.price-group { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

.old-price {
  font-size: 14px;
  color: #94a3b8;
  text-decoration: line-through;
}

.current-price {
  font-size: 28px;
  font-weight: 800;
  color: #0052ff;
}

.discount-badge {
  font-size: 11px;
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #15803d;
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
}

.btn-buy {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  padding: 14px 28px;
  border: none;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
}

.btn-buy:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,82,255,0.35);
}

/* ─── Products Section ─── */
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
  max-width: 520px;
  margin: 0 auto 32px;
}

.search-bar i {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 18px;
}

.search-bar input {
  width: 100%;
  padding: 18px 24px 18px 56px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
  color: #0f172a;
}

.search-bar input:focus {
  outline: none;
  border-color: #0052ff;
  box-shadow: 0 0 0 4px rgba(0,82,255,0.08);
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.category-filters {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 22px;
  border: 2px solid #e2e8f0;
  background: white;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  color: #64748b;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.filter-btn:hover {
  border-color: #0052ff;
  color: #0052ff;
  background: rgba(0,82,255,0.03);
}

.filter-btn.active {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(0,82,255,0.3);
}

/* ─── Products Grid ─── */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 28px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.04);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,82,255,0.12);
  border-color: rgba(0,82,255,0.08);
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
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover .card-image-wrapper img {
  transform: scale(1.08);
}

.discount-label {
  position: absolute;
  top: 14px;
  left: 14px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(239,68,68,0.3);
}

.card-category {
  position: absolute;
  bottom: 14px;
  left: 14px;
}

.card-content {
  padding: 24px;
}

.product-title {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px;
  line-height: 1.4;
}

.product-desc {
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.price-info { display: flex; flex-direction: column; gap: 2px; }

.original-price {
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;
}

.final-price {
  font-size: 22px;
  font-weight: 800;
  color: #0052ff;
}

.btn-view {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 16px;
}

.btn-view:hover {
  transform: scale(1.1) rotate(-10deg);
  box-shadow: 0 8px 24px rgba(0,82,255,0.35);
}

/* ─── Benefits Section ─── */
.benefits-section {
  max-width: 1200px;
  margin: 100px auto;
  padding: 0 20px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.benefit-card {
  text-align: center;
  padding: 40px 24px;
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(0,0,0,0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0,82,255,0.08);
  border-color: rgba(0,82,255,0.08);
}

.benefit-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #0052ff, #0041cc);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: white;
  transition: transform 0.3s ease;
}

.benefit-icon.sync { background: linear-gradient(135deg, #10b981, #059669); }
.benefit-icon.headset { background: linear-gradient(135deg, #8b5cf6, #6d28d9); }
.benefit-icon.shield { background: linear-gradient(135deg, #f59e0b, #d97706); }

.benefit-card:hover .benefit-icon {
  transform: scale(1.1) rotate(-5deg);
}

.benefit-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.benefit-card p {
  color: #64748b;
  line-height: 1.6;
  font-size: 14px;
}

/* ─── CTA Section ─── */
.cta-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}

.cta-content {
  background: linear-gradient(160deg, #183253 0%, #1074d1 50%, #2266c0 100%);
  border-radius: 32px;
  padding: 64px 48px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-content::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(251,191,36,0.1);
  top: -200px;
  right: -100px;
  pointer-events: none;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
  position: relative;
}

.cta-content p {
  font-size: 18px;
  opacity: 0.85;
  position: relative;
}

/* ─── States ─── */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #64748b;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e2e8f0;
  border-top-color: #0052ff;
  border-radius: 50%;
  margin: 0 auto 24px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-state i,
.empty-state i {
  font-size: 64px;
  margin-bottom: 24px;
  display: block;
  color: #cbd5e1;
}

.error-state i { color: #f87171; }

/* ─── Product Modal ─── */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .modal-content {
  transform: translateY(30px) scale(0.95);
}
.modal-fade-leave-to .modal-content {
  transform: translateY(30px) scale(0.95);
}

.product-modal {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.7);
  backdrop-filter: blur(12px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.product-modal > .modal-content {
  background: white;
  border-radius: 28px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 64px rgba(0,0,0,0.3);
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(15,23,42,0.6);
  backdrop-filter: blur(4px);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 18px;
  z-index: 10;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-modal:hover {
  background: rgba(15,23,42,0.85);
  transform: rotate(90deg);
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.modal-image {
  position: relative;
  overflow: hidden;
  border-radius: 28px 0 0 28px;
  min-height: 400px;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-discount-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(239,68,68,0.3);
}

.modal-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
}

.modal-details h2 {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.3;
}

.modal-description {
  color: #64748b;
  line-height: 1.8;
  font-size: 15px;
}

.features-list h4 {
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.features-list h4 i {
  color: #0052ff;
}

.features-list ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.features-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #334155;
  font-size: 14px;
}

.features-list li i {
  color: #10b981;
  font-size: 16px;
}

.product-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: #f8fafc;
  border-radius: 12px;
  font-size: 14px;
  color: #334155;
  border: 1px solid #f1f5f9;
}

.info-item i {
  color: #0052ff;
  font-size: 16px;
}

.modal-footer {
  padding-top: 20px;
  border-top: 2px solid #f1f5f9;
}

.modal-price {
  margin-bottom: 20px;
  display: flex;
  align-items: baseline;
  gap: 16px;
}

.modal-price .old-price { font-size: 18px; }
.modal-price .current-price { font-size: 36px; }

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-demo-full,
.btn-buy-full {
  flex: 1;
  padding: 16px 28px;
  border: none;
  border-radius: 16px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-demo-full {
  background: #f1f5f9;
  color: #334155;
}

.btn-demo-full:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.btn-buy-full {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
}

.btn-buy-full:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0,82,255,0.4);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .modal-body {
    grid-template-columns: 1fr;
  }
  .modal-image {
    border-radius: 28px 28px 0 0;
    min-height: 280px;
    max-height: 320px;
  }
  .featured-grid {
    grid-template-columns: 1fr;
  }
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 100px 16px 80px;
  }
  .hero-title {
    font-size: 36px;
  }
  .hero-description {
    font-size: 16px;
  }
  .hero-stats {
    padding: 20px 28px;
    gap: 20px;
  }
  .stat-number {
    font-size: 24px;
  }
  .section-title {
    font-size: 28px;
  }
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 20px;
  }
  .category-filters {
    gap: 8px;
  }
  .filter-btn {
    padding: 10px 16px;
    font-size: 13px;
  }
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .benefit-card {
    padding: 28px 20px;
  }
  .cta-content {
    padding: 48px 24px;
  }
  .cta-content h2 {
    font-size: 28px;
  }
  .modal-details {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }
  .hero-badge {
    font-size: 12px;
    padding: 8px 16px;
  }
  .hero-stats {
    flex-direction: column;
    gap: 16px;
    padding: 20px 24px;
  }
  .stat-divider {
    width: 60px;
    height: 1px;
  }
  .products-grid {
    grid-template-columns: 1fr;
  }
  .modal-actions {
    flex-direction: column;
  }
  .product-info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
