const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  salePrice?: number;
  category: 'software' | 'plugin' | 'tutorial' | 'curso' | 'ebook' | 'template' | 'outros';
  type: 'digital';
  image: string;
  images?: string[];
  downloadUrl?: string;
  demoUrl?: string;
  features?: string[];
  requirements?: string[];
  version?: string;
  fileSize?: string;
  format?: string;
  language?: string;
  tags?: string[];
  published: boolean;
  featured?: boolean;
  stock?: number;
  sales?: number;
  rating?: number;
  reviews?: number;
  author?: string;
  license?: string;
  supportIncluded?: boolean;
  updates?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ProductResponse {
  success: boolean;
  data: Product;
  message?: string;
}

export interface StatsResponse {
  success: boolean;
  data: {
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
  };
}

class ProductService {
  // Listar produtos publicados (público)
  async getPublishedProducts(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
    sort?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.search) queryParams.append('search', params.search);

    const response = await fetch(
      `${API_URL}/products/published?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos publicados');
    }

    return response.json();
  }

  // Listar todos os produtos (admin)
  async getAllProducts(params?: {
    category?: string;
    published?: boolean;
    featured?: boolean;
    limit?: number;
    page?: number;
    sort?: string;
    search?: string;
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.search) queryParams.append('search', params.search);

    const response = await fetch(`${API_URL}/products?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar todos os produtos');
    }

    return response.json();
  }

  // Buscar produto por ID
  async getProductById(id: string): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar produto');
    }

    return response.json();
  }

  // Buscar produto por slug (público)
  async getProductBySlug(slug: string): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products/slug/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar produto');
    }

    return response.json();
  }

  // Criar novo produto (admin)
  async createProduct(product: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar produto');
    }

    return response.json();
  }

  // Atualizar produto (admin)
  async updateProduct(id: string, product: Partial<Product>): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar produto');
    }

    return response.json();
  }

  // Deletar produto (admin)
  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }

    return response.json();
  }

  // Alternar publicação (admin)
  async togglePublish(id: string): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products/${id}/publish`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao alternar publicação');
    }

    return response.json();
  }

  // Alternar destaque (admin)
  async toggleFeatured(id: string): Promise<ProductResponse> {
    const response = await fetch(`${API_URL}/products/${id}/featured`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao alternar destaque');
    }

    return response.json();
  }

  // Buscar estatísticas (admin)
  async getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_URL}/products/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas');
    }

    return response.json();
  }
}

export default new ProductService();
