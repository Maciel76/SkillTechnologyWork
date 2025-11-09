<template>
  <div class="ecommerce-management">
    <div class="section-header">
      <h2>Gerenciamento de Produtos Digitais</h2>
      <button class="btn-primary" @click="showProductModal = true">
        <i class="fas fa-plus"></i> Novo Produto
      </button>
    </div>

    <!-- Estatísticas -->
    <div class="ecommerce-stats">
      <div class="ecommerce-stat">
        <div class="stat-icon">
          <i class="fas fa-box"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats?.total || 0 }}</h3>
          <p>Total de Produtos</p>
        </div>
      </div>
      <div class="ecommerce-stat published">
        <div class="stat-icon">
          <i class="fas fa-check-circle"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats?.published || 0 }}</h3>
          <p>Publicados</p>
        </div>
      </div>
      <div class="ecommerce-stat draft">
        <div class="stat-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats?.draft || 0 }}</h3>
          <p>Rascunhos</p>
        </div>
      </div>
      <div class="ecommerce-stat sales">
        <div class="stat-icon">
          <i class="fas fa-shopping-cart"></i>
        </div>
        <div class="stat-content">
          <h3>{{ stats?.sales?.totalSales || 0 }}</h3>
          <p>Total de Vendas</p>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="filters-section">
      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Buscar produtos..."
          @input="handleSearch"
        />
      </div>
      <div class="filter-group">
        <select v-model="filterCategory" @change="applyFilters">
          <option value="">Todas as Categorias</option>
          <option value="software">Software</option>
          <option value="plugin">Plugin</option>
          <option value="tutorial">Tutorial</option>
          <option value="curso">Curso</option>
          <option value="ebook">E-book</option>
          <option value="template">Template</option>
          <option value="outros">Outros</option>
        </select>
        <select v-model="filterPublished" @change="applyFilters">
          <option value="">Todos os Status</option>
          <option value="true">Publicados</option>
          <option value="false">Rascunhos</option>
        </select>
      </div>
    </div>

    <!-- Tabela de Produtos -->
    <div class="products-table-container">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> Carregando produtos...
      </div>
      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>
      <table v-else-if="products.length > 0" class="data-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Vendas</th>
            <th>Status</th>
            <th>Destaque</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id">
            <td>
              <div class="product-info">
                <img :src="product.image" :alt="product.name" />
                <div class="product-details">
                  <span class="product-name">{{ product.name }}</span>
                  <span class="product-version" v-if="product.version">
                    v{{ product.version }}
                  </span>
                </div>
              </div>
            </td>
            <td>
              <span class="category-badge" :class="product.category">
                {{ getCategoryLabel(product.category) }}
              </span>
            </td>
            <td>
              <div class="price-info">
                <span class="price">R$ {{ formatPrice(product.price) }}</span>
                <span v-if="product.salePrice" class="sale-price">
                  R$ {{ formatPrice(product.salePrice) }}
                </span>
              </div>
            </td>
            <td>{{ product.sales || 0 }}</td>
            <td>
              <button
                class="status-toggle"
                :class="{ active: product.published }"
                @click="togglePublish(product)"
                :title="
                  product.published ? 'Despublicar produto' : 'Publicar produto'
                "
              >
                <i
                  :class="product.published ? 'fas fa-eye' : 'fas fa-eye-slash'"
                ></i>
                {{ product.published ? "Publicado" : "Rascunho" }}
              </button>
            </td>
            <td>
              <button
                class="featured-toggle"
                :class="{ active: product.featured }"
                @click="toggleFeatured(product)"
                :title="
                  product.featured ? 'Remover destaque' : 'Marcar como destaque'
                "
              >
                <i
                  :class="product.featured ? 'fas fa-star' : 'far fa-star'"
                ></i>
              </button>
            </td>
            <td>
              <div class="action-buttons">
                <button
                  class="action-btn edit"
                  @click="editProduct(product)"
                  title="Editar produto"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  class="action-btn delete"
                  @click="confirmDelete(product)"
                  title="Deletar produto"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <i class="fas fa-box-open"></i>
        <p>Nenhum produto encontrado</p>
        <button class="btn-primary" @click="showProductModal = true">
          Criar Primeiro Produto
        </button>
      </div>
    </div>

    <!-- Modal de Produto -->
    <div v-if="showProductModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingProduct ? "Editar Produto" : "Novo Produto" }}</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <form @submit.prevent="saveProduct" class="product-form">
          <div class="form-grid">
            <div class="form-group full-width">
              <label>Nome do Produto *</label>
              <input
                type="text"
                v-model="productForm.name"
                required
                placeholder="Ex: Plugin WordPress Premium"
              />
            </div>

            <div class="form-group">
              <label>Categoria *</label>
              <select v-model="productForm.category" required>
                <option value="">Selecione...</option>
                <option value="software">Software</option>
                <option value="plugin">Plugin</option>
                <option value="tutorial">Tutorial</option>
                <option value="curso">Curso</option>
                <option value="ebook">E-book</option>
                <option value="template">Template</option>
                <option value="outros">Outros</option>
              </select>
            </div>

            <div class="form-group">
              <label>Preço (R$) *</label>
              <input
                type="number"
                v-model.number="productForm.price"
                required
                min="0"
                step="0.01"
                placeholder="99.90"
              />
            </div>

            <div class="form-group">
              <label>Preço Promocional (R$)</label>
              <input
                type="number"
                v-model.number="productForm.salePrice"
                min="0"
                step="0.01"
                placeholder="79.90"
              />
            </div>

            <div class="form-group">
              <label>Versão</label>
              <input
                type="text"
                v-model="productForm.version"
                placeholder="1.0.0"
              />
            </div>

            <div class="form-group full-width">
              <label>Descrição Curta</label>
              <input
                type="text"
                v-model="productForm.shortDescription"
                maxlength="200"
                placeholder="Breve descrição do produto (máx. 200 caracteres)"
              />
            </div>

            <div class="form-group full-width">
              <label>Descrição Completa *</label>
              <textarea
                v-model="productForm.description"
                required
                rows="4"
                placeholder="Descrição detalhada do produto..."
              ></textarea>
            </div>

            <div class="form-group full-width">
              <label>URL da Imagem Principal *</label>
              <input
                type="url"
                v-model="productForm.image"
                required
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div class="form-group">
              <label>URL de Demonstração</label>
              <input
                type="url"
                v-model="productForm.demoUrl"
                placeholder="https://demo.exemplo.com"
              />
            </div>

            <div class="form-group">
              <label>Tamanho do Arquivo</label>
              <input
                type="text"
                v-model="productForm.fileSize"
                placeholder="Ex: 25 MB"
              />
            </div>

            <div class="form-group">
              <label>Formato</label>
              <input
                type="text"
                v-model="productForm.format"
                placeholder="Ex: ZIP, PDF, MP4"
              />
            </div>

            <div class="form-group">
              <label>Idioma</label>
              <input
                type="text"
                v-model="productForm.language"
                placeholder="Português"
              />
            </div>

            <div class="form-group full-width">
              <label>Recursos (separados por vírgula)</label>
              <input
                type="text"
                v-model="featuresInput"
                placeholder="Recurso 1, Recurso 2, Recurso 3"
              />
            </div>

            <div class="form-group full-width">
              <label>Tags (separadas por vírgula)</label>
              <input
                type="text"
                v-model="tagsInput"
                placeholder="wordpress, plugin, ecommerce"
              />
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="productForm.published" />
                Publicar imediatamente
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="productForm.featured" />
                Marcar como destaque
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="productForm.supportIncluded" />
                Inclui suporte
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="productForm.updates" />
                Atualizações incluídas
              </label>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeModal">
              Cancelar
            </button>
            <button type="submit" class="btn-primary" :disabled="loading">
              <i class="fas fa-save"></i>
              {{ editingProduct ? "Atualizar" : "Criar Produto" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div
      v-if="showDeleteModal"
      class="modal-overlay"
      @click="showDeleteModal = false"
    >
      <div class="modal-content small" @click.stop>
        <div class="modal-header">
          <h3>Confirmar Exclusão</h3>
          <button class="close-btn" @click="showDeleteModal = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <p>
            Tem certeza que deseja excluir o produto
            <strong>{{ productToDelete?.name }}</strong
            >?
          </p>
          <p class="warning-text">Esta ação não pode ser desfeita.</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn-secondary"
            @click="showDeleteModal = false"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="btn-danger"
            @click="deleteProduct"
            :disabled="loading"
          >
            <i class="fas fa-trash"></i> Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useProductStore } from "@/stores/productStore";

export default defineComponent({
  name: "EcommerceManagement",

  data() {
    return {
      productStore: useProductStore(),
      searchQuery: "",
      filterCategory: "",
      filterPublished: "",
      showProductModal: false,
      showDeleteModal: false,
      editingProduct: null,
      productToDelete: null,
      productForm: {
        name: "",
        description: "",
        shortDescription: "",
        price: 0,
        salePrice: undefined,
        category: "",
        image: "",
        demoUrl: "",
        version: "",
        fileSize: "",
        format: "",
        language: "Português",
        published: false,
        featured: false,
        supportIncluded: false,
        updates: true,
      },
      featuresInput: "",
      tagsInput: "",
      searchTimeout: null,
    };
  },

  computed: {
    products() {
      return this.productStore.products;
    },
    stats() {
      return this.productStore.stats;
    },
    loading() {
      return this.productStore.loading;
    },
    error() {
      return this.productStore.error;
    },
  },

  methods: {
    async loadProducts() {
      await this.productStore.fetchAllProducts();
      await this.productStore.fetchStats();
    },

    async applyFilters() {
      const params = {};
      if (this.filterCategory) params.category = this.filterCategory;
      if (this.filterPublished !== "")
        params.published = this.filterPublished === "true";

      await this.productStore.fetchAllProducts(params);
    },

    handleSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(async () => {
        const params = {};
        if (this.searchQuery) params.search = this.searchQuery;
        if (this.filterCategory) params.category = this.filterCategory;
        if (this.filterPublished !== "")
          params.published = this.filterPublished === "true";

        await this.productStore.fetchAllProducts(params);
      }, 500);
    },

    editProduct(product) {
      this.editingProduct = product;
      this.productForm = {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription || "",
        price: product.price,
        salePrice: product.salePrice,
        category: product.category,
        image: product.image,
        demoUrl: product.demoUrl || "",
        version: product.version || "",
        fileSize: product.fileSize || "",
        format: product.format || "",
        language: product.language || "Português",
        published: product.published,
        featured: product.featured || false,
        supportIncluded: product.supportIncluded || false,
        updates: product.updates !== false,
      };
      this.featuresInput = product.features?.join(", ") || "";
      this.tagsInput = product.tags?.join(", ") || "";
      this.showProductModal = true;
    },

    async saveProduct() {
      try {
        const productData = {
          ...this.productForm,
          features: this.featuresInput
            ? this.featuresInput.split(",").map((f) => f.trim())
            : [],
          tags: this.tagsInput
            ? this.tagsInput.split(",").map((t) => t.trim())
            : [],
          type: "digital",
        };

        if (this.editingProduct && this.editingProduct._id) {
          await this.productStore.updateProduct(
            this.editingProduct._id,
            productData
          );
        } else {
          await this.productStore.createProduct(productData);
        }

        this.closeModal();
        await this.loadProducts();
      } catch (error) {
        console.error("Erro ao salvar produto:", error);
      }
    },

    async togglePublish(product) {
      if (!product._id) {
        console.error("ID do produto não encontrado");
        return;
      }
      try {
        await this.productStore.togglePublish(product._id);
        await this.productStore.fetchStats();
      } catch (error) {
        console.error("Erro ao alternar publicação:", error);
      }
    },

    async toggleFeatured(product) {
      if (!product._id) {
        console.error("ID do produto não encontrado");
        return;
      }
      try {
        await this.productStore.toggleFeatured(product._id);
        await this.productStore.fetchStats();
      } catch (error) {
        console.error("Erro ao alternar destaque:", error);
      }
    },

    confirmDelete(product) {
      this.productToDelete = product;
      this.showDeleteModal = true;
    },

    async deleteProduct() {
      if (!this.productToDelete || !this.productToDelete._id) return;

      try {
        await this.productStore.deleteProduct(this.productToDelete._id);
        this.showDeleteModal = false;
        this.productToDelete = null;
        await this.loadProducts();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
      }
    },

    closeModal() {
      this.showProductModal = false;
      this.editingProduct = null;
      this.resetForm();
    },

    resetForm() {
      this.productForm = {
        name: "",
        description: "",
        shortDescription: "",
        price: 0,
        salePrice: undefined,
        category: "",
        image: "",
        demoUrl: "",
        version: "",
        fileSize: "",
        format: "",
        language: "Português",
        published: false,
        featured: false,
        supportIncluded: false,
        updates: true,
      };
      this.featuresInput = "";
      this.tagsInput = "";
    },

    getCategoryLabel(category) {
      const labels = {
        software: "Software",
        plugin: "Plugin",
        tutorial: "Tutorial",
        curso: "Curso",
        ebook: "E-book",
        template: "Template",
        outros: "Outros",
      };
      return labels[category] || category;
    },

    formatPrice(price) {
      return price.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  },

  mounted() {
    this.loadProducts();
  },
});
</script>

<style scoped>
.ecommerce-management {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.section-header h2 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary, #1f2937);
}

.btn-primary {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 82, 255, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(239, 68, 68, 0.3);
}

/* Estatísticas */
.ecommerce-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.ecommerce-stat {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s ease;
}

.ecommerce-stat:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
}

.ecommerce-stat.published .stat-icon {
  background: linear-gradient(135deg, #10b981, #059669);
}

.ecommerce-stat.draft .stat-icon {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.ecommerce-stat.sales .stat-icon {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
}

.stat-content h3 {
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  color: #1f2937;
}

.stat-content p {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  margin: 4px 0 0;
}

/* Filtros */
.filters-section {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 300px;
  position: relative;
}

.search-box i {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.search-box input {
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #0052ff;
  box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.1);
}

.filter-group {
  display: flex;
  gap: 12px;
}

.filter-group select {
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #0052ff;
  box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.1);
}

/* Tabela */
.products-table-container {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table thead {
  background: linear-gradient(135deg, #0052ff, #0041cc);
  color: white;
}

.data-table th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.data-table tbody tr {
  border-bottom: 1px solid #f3f4f6;
  transition: all 0.3s ease;
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.data-table td {
  padding: 16px;
  font-size: 14px;
  color: #374151;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-info img {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #f3f4f6;
}

.product-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.product-name {
  font-weight: 600;
  color: #1f2937;
}

.product-version {
  font-size: 12px;
  color: #6b7280;
}

.category-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.category-badge.software {
  background: #dbeafe;
  color: #1e40af;
}
.category-badge.plugin {
  background: #fce7f3;
  color: #be185d;
}
.category-badge.tutorial {
  background: #fef3c7;
  color: #92400e;
}
.category-badge.curso {
  background: #e0e7ff;
  color: #3730a3;
}
.category-badge.ebook {
  background: #ddd6fe;
  color: #5b21b6;
}
.category-badge.template {
  background: #d1fae5;
  color: #065f46;
}
.category-badge.outros {
  background: #f3f4f6;
  color: #374151;
}

.price-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.price {
  font-weight: 600;
  color: #1f2937;
}

.sale-price {
  font-size: 12px;
  color: #10b981;
  font-weight: 600;
}

.status-toggle {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
  background: #fee2e2;
  color: #991b1b;
}

.status-toggle.active {
  background: #d1fae5;
  color: #065f46;
}

.status-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.featured-toggle {
  padding: 8px 12px;
  border-radius: 6px;
  border: 2px solid #e5e7eb;
  background: white;
  cursor: pointer;
  font-size: 18px;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.featured-toggle.active {
  color: #f59e0b;
  border-color: #f59e0b;
  background: #fffbeb;
}

.featured-toggle:hover {
  transform: scale(1.1);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.action-btn.edit {
  background: #dbeafe;
  color: #1e40af;
}

.action-btn.edit:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-2px);
}

.action-btn.delete {
  background: #fee2e2;
  color: #991b1b;
}

.action-btn.delete:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
}

/* Estados */
.loading-state,
.error-state,
.empty-state {
  padding: 64px 32px;
  text-align: center;
  color: #6b7280;
}

.loading-state i,
.error-state i,
.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
  display: block;
}

.empty-state {
  background: #f9fafb;
}

.empty-state p {
  font-size: 18px;
  margin-bottom: 24px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.modal-content.small {
  max-width: 500px;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #9ca3af;
  cursor: pointer;
  padding: 8px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #374151;
  transform: rotate(90deg);
}

.modal-body {
  padding: 24px;
}

.modal-body p {
  font-size: 16px;
  color: #374151;
  margin-bottom: 12px;
}

.warning-text {
  color: #dc2626;
  font-weight: 600;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Formulário */
.product-form {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #0052ff;
  box-shadow: 0 0 0 3px rgba(0, 82, 255, 0.1);
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .ecommerce-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters-section {
    flex-direction: column;
  }

  .search-box {
    min-width: 100%;
  }

  .filter-group {
    flex-direction: column;
  }

  .filter-group select {
    width: 100%;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .data-table {
    font-size: 12px;
  }

  .data-table th,
  .data-table td {
    padding: 12px 8px;
  }

  .product-info img {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .ecommerce-stats {
    grid-template-columns: 1fr;
  }
}
</style>
