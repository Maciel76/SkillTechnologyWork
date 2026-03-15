const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export interface AgencyPortfolioProject {
  _id?: string;
  title: string;
  name: string;
  category: string;
  excerpt: string;
  description: string;
  client: {
    name: string;
    logo?: string;
  };
  year: string;
  duration?: string;
  thumbnail: string;
  images: string[];
  accentColor: string;
  technologies: string[];
  challenge: string;
  solution: string[];
  results: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  published: boolean;
  featured: boolean;
  agencyName: string;
  agencyDescription: string;
  agencyContactInfo: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface PortfolioResponse {
  data: AgencyPortfolioProject[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
  category?: string;
  total?: number;
}

export interface SinglePortfolioResponse {
  data: AgencyPortfolioProject;
  message?: string;
}

export interface StatsResponse {
  data: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    byCategory: Array<{ _id: string; count: number }>;
    byYear: Array<{ _id: string; count: number }>;
  };
}

class AgencyPortfolioService {
  // Listar projetos publicados (público)
  async getPublishedProjects(params?: {
    category?: string;
    featured?: boolean;
    limit?: number;
    page?: number;
  }): Promise<PortfolioResponse> {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/agency-portfolio?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos do portfólio');
    }

    return response.json();
  }

  // Listar projetos destacados (público)
  async getFeaturedProjects(limit?: number): Promise<PortfolioResponse> {
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append('limit', limit.toString());

    const response = await fetch(`${API_URL}/agency-portfolio/featured?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos destacados');
    }

    return response.json();
  }

  // Listar projetos por categoria (público)
  async getProjectsByCategory(category: string, params?: {
    published?: boolean;
    limit?: number;
  }): Promise<PortfolioResponse> {
    const queryParams = new URLSearchParams();

    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const response = await fetch(`${API_URL}/agency-portfolio/category/${category}?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos por categoria');
    }

    return response.json();
  }

  // Listar todos os projetos (admin)
  async getAllProjects(params?: {
    published?: boolean;
    featured?: boolean;
    category?: string;
    limit?: number;
    page?: number;
  }): Promise<PortfolioResponse> {
    const queryParams = new URLSearchParams();

    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/admin/agency-portfolio?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    return response.json();
  }

  // Obter projeto por ID
  async getProjectById(id: string): Promise<SinglePortfolioResponse> {
    const response = await fetch(`${API_URL}/agency-portfolio/${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projeto');
    }

    return response.json();
  }

  // Criar novo projeto
  async createProject(project: Omit<AgencyPortfolioProject, '_id' | 'createdAt' | 'updatedAt'>): Promise<SinglePortfolioResponse> {
    const response = await fetch(`${API_URL}/agency-portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar projeto');
    }

    return response.json();
  }

  // Atualizar projeto
  async updateProject(id: string, project: Partial<AgencyPortfolioProject>): Promise<SinglePortfolioResponse> {
    const response = await fetch(`${API_URL}/agency-portfolio/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar projeto');
    }

    return response.json();
  }

  // Deletar projeto
  async deleteProject(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/agency-portfolio/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar projeto');
    }

    return response.json();
  }

  // Alternar publicação
  async togglePublish(id: string): Promise<SinglePortfolioResponse> {
    const response = await fetch(`${API_URL}/agency-portfolio/${id}/publish`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao alternar publicação');
    }

    return response.json();
  }

  // Alternar destaque
  async toggleFeatured(id: string): Promise<SinglePortfolioResponse> {
    const response = await fetch(`${API_URL}/agency-portfolio/${id}/featured`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao alternar destaque');
    }

    return response.json();
  }

  // Obter estatísticas (admin)
  async getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_URL}/admin/agency-portfolio/stats`);

    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas');
    }

    return response.json();
  }
}

export default new AgencyPortfolioService();
