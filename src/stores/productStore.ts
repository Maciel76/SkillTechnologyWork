import { defineStore } from "pinia";
import productService, { Product } from "@/services/productService";

interface ProductState {
  products: Product[];
  publishedProducts: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    byCategory: Array<{ _id: string; count: number }>;
    sales: {
      totalSales: number;
      totalRevenue: number;
    };
    topProducts: Array<{
      _id: string;
      name: string;
      sales: number;
      price: number;
      image: string;
    }>;
  } | null;
}

export const useProductStore = defineStore("product", {
  state: (): ProductState => ({
    products: [],
    publishedProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
    stats: null,
  }),

  getters: {
    // Produtos publicados
    getPublishedProducts: (state) => state.publishedProducts,

    // Produtos por categoria
    getProductsByCategory: (state) => (category: string) => {
      return state.publishedProducts.filter(
        (product) => product.category === category
      );
    },

    // Produtos em destaque
    getFeaturedProducts: (state) => {
      return state.publishedProducts.filter((product) => product.featured);
    },

    // Total de produtos
    getTotalProducts: (state) => state.products.length,

    // Produtos rascunho
    getDraftProducts: (state) =>
      state.products.filter((product) => !product.published),

    // Produtos publicados (admin)
    getPublishedProductsAdmin: (state) =>
      state.products.filter((product) => product.published),

    // Produto atual
    getCurrentProduct: (state) => state.currentProduct,
  },

  actions: {
    // Buscar produtos publicados (público)
    async fetchPublishedProducts(params?: {
      category?: string;
      featured?: boolean;
      limit?: number;
      page?: number;
      sort?: string;
      search?: string;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.getPublishedProducts(params);
        this.publishedProducts = response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao carregar produtos";
        console.error("Erro ao buscar produtos publicados:", error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar todos os produtos (admin)
    async fetchAllProducts(params?: {
      category?: string;
      published?: boolean;
      featured?: boolean;
      limit?: number;
      page?: number;
      sort?: string;
      search?: string;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.getAllProducts(params);
        this.products = response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao carregar produtos";
        console.error("Erro ao buscar todos os produtos:", error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar produto por ID
    async fetchProductById(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.getProductById(id);
        this.currentProduct = response.data;
        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao carregar produto";
        console.error("Erro ao buscar produto:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Buscar produto por slug
    async fetchProductBySlug(slug: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.getProductBySlug(slug);
        this.currentProduct = response.data;
        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao carregar produto";
        console.error("Erro ao buscar produto:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Criar novo produto
    async createProduct(
      product: Omit<Product, "_id" | "createdAt" | "updatedAt">
    ) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.createProduct(product);
        this.products.push(response.data);

        // Se foi publicado, adiciona também aos produtos publicados
        if (response.data.published) {
          this.publishedProducts.push(response.data);
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao criar produto";
        console.error("Erro ao criar produto:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Atualizar produto
    async updateProduct(id: string, product: Partial<Product>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.updateProduct(id, product);

        // Atualizar na lista de produtos
        const index = this.products.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }

        // Atualizar na lista de produtos publicados
        const pubIndex = this.publishedProducts.findIndex((p) => p._id === id);
        if (response.data.published) {
          if (pubIndex !== -1) {
            this.publishedProducts[pubIndex] = response.data;
          } else {
            this.publishedProducts.push(response.data);
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedProducts.splice(pubIndex, 1);
          }
        }

        // Atualizar produto atual se for o mesmo
        if (this.currentProduct?._id === id) {
          this.currentProduct = response.data;
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao atualizar produto";
        console.error("Erro ao atualizar produto:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Deletar produto
    async deleteProduct(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await productService.deleteProduct(id);

        // Remover da lista de produtos
        this.products = this.products.filter((p) => p._id !== id);

        // Remover da lista de produtos publicados
        this.publishedProducts = this.publishedProducts.filter(
          (p) => p._id !== id
        );

        // Limpar produto atual se for o mesmo
        if (this.currentProduct?._id === id) {
          this.currentProduct = null;
        }
      } catch (error: any) {
        this.error = error.message || "Erro ao deletar produto";
        console.error("Erro ao deletar produto:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Alternar publicação
    async togglePublish(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.togglePublish(id);

        // Atualizar na lista de produtos
        const index = this.products.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }

        // Atualizar na lista de produtos publicados
        const pubIndex = this.publishedProducts.findIndex((p) => p._id === id);
        if (response.data.published) {
          if (pubIndex === -1) {
            this.publishedProducts.push(response.data);
          } else {
            this.publishedProducts[pubIndex] = response.data;
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedProducts.splice(pubIndex, 1);
          }
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao alternar publicação";
        console.error("Erro ao alternar publicação:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Alternar destaque
    async toggleFeatured(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.toggleFeatured(id);

        // Atualizar na lista de produtos
        const index = this.products.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.products[index] = response.data;
        }

        // Atualizar na lista de produtos publicados
        const pubIndex = this.publishedProducts.findIndex((p) => p._id === id);
        if (pubIndex !== -1) {
          this.publishedProducts[pubIndex] = response.data;
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao alternar destaque";
        console.error("Erro ao alternar destaque:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Buscar estatísticas (admin)
    async fetchStats() {
      this.loading = true;
      this.error = null;

      try {
        const response = await productService.getStats();
        this.stats = response.data;
      } catch (error: any) {
        this.error = error.message || "Erro ao carregar estatísticas";
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        this.loading = false;
      }
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },

    // Limpar produto atual
    clearCurrentProduct() {
      this.currentProduct = null;
    },
  },
});
