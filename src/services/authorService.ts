import { RecentProject } from './recentProjectService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';

export interface AuthorSocials {
  github?: string;
  linkedin?: string;
  instagram?: string;
  behance?: string;
  website?: string;
  whatsapp?: string;
}

export interface Author {
  _id?: string;
  name: string;
  slug?: string;
  role?: string;
  headline?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
  email?: string;
  location?: string;
  skills?: string[];
  highlights?: { value: string; label: string }[];
  socials?: AuthorSocials;
  available?: boolean;
  featured?: boolean;
  published?: boolean;
  position?: number;
  /** Preenchido só na listagem admin: quantos projetos publicados o autor assina. */
  projectsCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthorsResponse {
  data: Author[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface AuthorResponse {
  data: Author;
  message?: string;
}

export interface AuthorProfileResponse {
  data: {
    author: Author;
    projects: RecentProject[];
  };
}

class AuthorService {
  // Listar autores publicados (público)
  async getPublishedAuthors(params?: { limit?: number; page?: number }): Promise<AuthorsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/authors?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar autores');
    }

    return response.json();
  }

  /**
   * Perfil público de um autor: dados dele + os projetos que o marcam.
   * É a chamada única que alimenta a página /portfolio/autor/:slug.
   */
  async getProfileBySlug(slug: string): Promise<AuthorProfileResponse> {
    const response = await fetch(`${API_URL}/authors/${encodeURIComponent(slug)}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Autor não encontrado');
      }
      throw new Error('Erro ao buscar o perfil do autor');
    }

    return response.json();
  }

  // Listar todos os autores (admin)
  async getAllAuthors(params?: {
    published?: boolean;
    limit?: number;
    page?: number;
  }): Promise<AuthorsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/admin/authors?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar autores');
    }

    return response.json();
  }

  // Criar autor
  async createAuthor(author: Omit<Author, '_id' | 'createdAt' | 'updatedAt'>): Promise<AuthorResponse> {
    const response = await fetch(`${API_URL}/authors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Erro ao criar autor');
    }

    return response.json();
  }

  // Atualizar autor
  async updateAuthor(id: string, author: Partial<Author>): Promise<AuthorResponse> {
    const response = await fetch(`${API_URL}/authors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Erro ao atualizar autor');
    }

    return response.json();
  }

  // Deletar autor
  async deleteAuthor(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/authors/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Erro ao deletar autor');
    }

    return response.json();
  }

  // Alternar publicação do perfil
  async togglePublish(id: string): Promise<AuthorResponse> {
    const response = await fetch(`${API_URL}/authors/${id}/publish`, { method: 'PATCH' });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Erro ao alternar publicação');
    }

    return response.json();
  }

  // Enviar avatar/capa e receber a URL salva no servidor
  async uploadImage(file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/authors/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || 'Erro ao enviar a imagem');
    }

    const data = await response.json();
    return { url: this.resolveImageUrl(data.url) };
  }

  // Converte /uploads/... em URL completa do servidor
  resolveImageUrl(url: string): string {
    if (!url) return '';
    if (/^(https?:|data:|blob:)/.test(url)) return url;
    const base = API_URL.replace(/\/api\/?$/, '');
    return `${base}${url.startsWith('/') ? url : '/' + url}`;
  }
}

export default new AuthorService();
