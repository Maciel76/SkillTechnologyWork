const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export interface RecentProject {
  _id?: string;
  title: string;
  category: string;
  client: string;
  year: string;
  thumbnail: string;
  images: string[];
  technologies: string[];
  challenge: string;
  solution: string[];
  results: string[];
  liveUrl: string;
  githubUrl: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsResponse {
  data: RecentProject[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ProjectResponse {
  data: RecentProject;
  message?: string;
}

export interface StatsResponse {
  data: {
    total: number;
    published: number;
    draft: number;
    byCategory: Array<{ _id: string; count: number }>;
    byYear: Array<{ _id: string; count: number }>;
  };
}

class RecentProjectService {
  // Listar projetos publicados (público)
  async getPublishedProjects(params?: {
    category?: string;
    limit?: number;
    page?: number;
  }): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/recent-projects?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    return response.json();
  }

  // Listar todos os projetos (admin)
  async getAllProjects(params?: {
    published?: boolean;
    category?: string;
    limit?: number;
    page?: number;
  }): Promise<ProjectsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/admin/recent-projects?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projetos');
    }

    return response.json();
  }

  // Obter projeto por ID
  async getProjectById(id: string): Promise<ProjectResponse> {
    const response = await fetch(`${API_URL}/recent-projects/${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar projeto');
    }

    return response.json();
  }

  // Criar novo projeto
  async createProject(project: Omit<RecentProject, '_id' | 'createdAt' | 'updatedAt'>): Promise<ProjectResponse> {
    const response = await fetch(`${API_URL}/recent-projects`, {
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
  async updateProject(id: string, project: Partial<RecentProject>): Promise<ProjectResponse> {
    const response = await fetch(`${API_URL}/recent-projects/${id}`, {
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
    const response = await fetch(`${API_URL}/recent-projects/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar projeto');
    }

    return response.json();
  }

  // Alternar publicação
  async togglePublish(id: string): Promise<ProjectResponse> {
    const response = await fetch(`${API_URL}/recent-projects/${id}/publish`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao alternar publicação');
    }

    return response.json();
  }

  // Obter estatísticas (admin)
  async getStats(): Promise<StatsResponse> {
    const response = await fetch(`${API_URL}/admin/recent-projects/stats`);

    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas');
    }

    return response.json();
  }
}

export default new RecentProjectService();
