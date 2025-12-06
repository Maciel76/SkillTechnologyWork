import { defineStore } from 'pinia';
import agencyPortfolioService, { AgencyPortfolioProject } from '@/services/agencyPortfolioService';

interface PortfolioState {
  projects: AgencyPortfolioProject[];
  publishedProjects: AgencyPortfolioProject[];
  featuredProjects: AgencyPortfolioProject[];
  currentProject: AgencyPortfolioProject | null;
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    published: number;
    draft: number;
    featured: number;
    byCategory: Array<{ _id: string; count: number }>;
    byYear: Array<{ _id: string; count: number }>;
  } | null;
}

export const useAgencyPortfolioStore = defineStore('agencyPortfolio', {
  state: (): PortfolioState => ({
    projects: [],
    publishedProjects: [],
    featuredProjects: [],
    currentProject: null,
    loading: false,
    error: null,
    stats: null,
  }),

  getters: {
    // Projetos publicados
    getPublishedProjects: (state) => state.publishedProjects,

    // Projetos destacados
    getFeaturedProjects: (state) => state.featuredProjects,

    // Projetos por categoria
    getProjectsByCategory: (state) => (category: string) => {
      return state.projects.filter((project) => project.category === category);
    },

    // Total de projetos
    getTotalProjects: (state) => state.projects.length,

    // Projetos rascunho
    getDraftProjects: (state) => state.projects.filter((project) => !project.published),

    // Projetos destacados publicados
    getPublishedFeaturedProjects: (state) => {
      return state.publishedProjects.filter((project) => project.featured);
    },
  },

  actions: {
    // Buscar projetos publicados (público)
    async fetchPublishedProjects(params?: {
      category?: string;
      featured?: boolean;
      limit?: number;
      page?: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.getPublishedProjects(params);
        this.publishedProjects = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar projetos';
        console.error('Erro ao buscar projetos publicados:', error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar projetos destacados (público)
    async fetchFeaturedProjects(limit?: number) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.getFeaturedProjects(limit);
        this.featuredProjects = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar projetos destacados';
        console.error('Erro ao buscar projetos destacados:', error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar projetos por categoria (público)
    async fetchProjectsByCategory(category: string, params?: {
      published?: boolean;
      limit?: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.getProjectsByCategory(category, params);
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar projetos da categoria';
        console.error('Erro ao buscar projetos por categoria:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },

    // Buscar todos os projetos (admin)
    async fetchAllProjects(params?: {
      published?: boolean;
      featured?: boolean;
      category?: string;
      limit?: number;
      page?: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.getAllProjects(params);
        this.projects = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar projetos';
        console.error('Erro ao buscar todos os projetos:', error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar projeto por ID
    async fetchProjectById(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.getProjectById(id);
        this.currentProject = response.data;
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar projeto';
        console.error('Erro ao buscar projeto:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Criar novo projeto
    async createProject(project: Omit<AgencyPortfolioProject, '_id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.createProject(project);
        this.projects.push(response.data);

        // Se foi publicado, adiciona também aos projetos publicados
        if (response.data.published) {
          this.publishedProjects.push(response.data);

          // Se é destacado, adiciona aos destacados
          if (response.data.featured) {
            this.featuredProjects.push(response.data);
          }
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao criar projeto';
        console.error('Erro ao criar projeto:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Atualizar projeto
    async updateProject(id: string, project: Partial<AgencyPortfolioProject>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await agencyPortfolioService.updateProject(id, project);

        // Atualizar na lista de projetos
        const index = this.projects.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.projects[index] = response.data;
        }

        // Atualizar na lista de projetos publicados
        const pubIndex = this.publishedProjects.findIndex((p) => p._id === id);
        if (response.data.published) {
          if (pubIndex !== -1) {
            this.publishedProjects[pubIndex] = response.data;
          } else {
            this.publishedProjects.push(response.data);
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedProjects.splice(pubIndex, 1);
          }
        }

        // Atualizar na lista de projetos destacados
        const featIndex = this.featuredProjects.findIndex((p) => p._id === id);
        if (response.data.featured && response.data.published) {
          if (featIndex !== -1) {
            this.featuredProjects[featIndex] = response.data;
          } else {
            this.featuredProjects.push(response.data);
          }
        } else {
          if (featIndex !== -1) {
            this.featuredProjects.splice(featIndex, 1);
          }
        }

        // Atualizar projeto atual se for o mesmo
        if (this.currentProject?._id === id) {
          this.currentProject = response.data;
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao atualizar projeto';
        console.error('Erro ao atualizar projeto:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Deletar projeto
    async deleteProject(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await agencyPortfolioService.deleteProject(id);

        // Remover da lista de projetos
        this.projects = this.projects.filter((p) => p._id !== id);

        // Remover da lista de projetos publicados
        this.publishedProjects = this.publishedProjects.filter((p) => p._id !== id);

        // Remover da lista de projetos destacados
        this.featuredProjects = this.featuredProjects.filter((p) => p._id !== id);

        // Limpar projeto atual se for o mesmo
        if (this.currentProject?._id === id) {
          this.currentProject = null;
        }
      } catch (error: any) {
        this.error = error.message || 'Erro ao deletar projeto';
        console.error('Erro ao deletar projeto:', error);
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
        const response = await agencyPortfolioService.togglePublish(id);

        // Atualizar na lista de projetos
        const index = this.projects.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.projects[index] = response.data;
        }

        // Atualizar na lista de projetos publicados
        const pubIndex = this.publishedProjects.findIndex((p) => p._id === id);
        if (response.data.published) {
          if (pubIndex === -1) {
            this.publishedProjects.push(response.data);
          } else {
            this.publishedProjects[pubIndex] = response.data;
          }

          // Se é destacado, adiciona aos destacados
          if (response.data.featured) {
            const featIndex = this.featuredProjects.findIndex((p) => p._id === id);
            if (featIndex === -1) {
              this.featuredProjects.push(response.data);
            }
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedProjects.splice(pubIndex, 1);
          }
          // Remove dos destacados também
          this.featuredProjects = this.featuredProjects.filter((p) => p._id !== id);
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao alternar publicação';
        console.error('Erro ao alternar publicação:', error);
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
        const response = await agencyPortfolioService.toggleFeatured(id);

        // Atualizar na lista de projetos
        const index = this.projects.findIndex((p) => p._id === id);
        if (index !== -1) {
          this.projects[index] = response.data;
        }

        // Atualizar na lista de projetos publicados
        const pubIndex = this.publishedProjects.findIndex((p) => p._id === id);
        if (pubIndex !== -1) {
          this.publishedProjects[pubIndex] = response.data;
        }

        // Atualizar na lista de projetos destacados
        const featIndex = this.featuredProjects.findIndex((p) => p._id === id);
        if (response.data.featured && response.data.published) {
          if (featIndex === -1) {
            this.featuredProjects.push(response.data);
          } else {
            this.featuredProjects[featIndex] = response.data;
          }
        } else {
          if (featIndex !== -1) {
            this.featuredProjects.splice(featIndex, 1);
          }
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao alternar destaque';
        console.error('Erro ao alternar destaque:', error);
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
        const response = await agencyPortfolioService.getStats();
        this.stats = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar estatísticas';
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        this.loading = false;
      }
    },

    // Limpar erro
    clearError() {
      this.error = null;
    },

    // Limpar projeto atual
    clearCurrentProject() {
      this.currentProject = null;
    },
  },
});
