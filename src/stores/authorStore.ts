import { defineStore } from 'pinia';
import authorService, { Author } from '@/services/authorService';

interface AuthorState {
  authors: Author[];
  publishedAuthors: Author[];
  loading: boolean;
  error: string | null;
}

export const useAuthorStore = defineStore('author', {
  state: (): AuthorState => ({
    authors: [],
    publishedAuthors: [],
    loading: false,
    error: null,
  }),

  getters: {
    getTotalAuthors: (state) => state.authors.length,

    getAuthorById: (state) => (id: string) =>
      state.authors.find((author) => author._id === id) || null,

    // Autores com perfil no ar
    getVisibleAuthors: (state) => state.authors.filter((author) => author.published),
  },

  actions: {
    // Listar todos (admin)
    async fetchAllAuthors() {
      this.loading = true;
      this.error = null;

      try {
        const response = await authorService.getAllAuthors();
        this.authors = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar autores';
        console.error('Erro ao buscar autores:', error);
      } finally {
        this.loading = false;
      }
    },

    // Listar publicados (público)
    async fetchPublishedAuthors() {
      this.loading = true;
      this.error = null;

      try {
        const response = await authorService.getPublishedAuthors();
        this.publishedAuthors = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar autores';
        console.error('Erro ao buscar autores publicados:', error);
      } finally {
        this.loading = false;
      }
    },

    async createAuthor(author: Omit<Author, '_id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authorService.createAuthor(author);
        this.authors.push(response.data);
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao criar autor';
        console.error('Erro ao criar autor:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateAuthor(id: string, author: Partial<Author>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await authorService.updateAuthor(id, author);
        const index = this.authors.findIndex((item) => item._id === id);
        if (index !== -1) {
          // Mantém o projectsCount, que só vem na listagem admin.
          this.authors[index] = {
            ...response.data,
            projectsCount: this.authors[index].projectsCount,
          };
        }
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao atualizar autor';
        console.error('Erro ao atualizar autor:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAuthor(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await authorService.deleteAuthor(id);
        this.authors = this.authors.filter((item) => item._id !== id);
      } catch (error: any) {
        this.error = error.message || 'Erro ao deletar autor';
        console.error('Erro ao deletar autor:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async togglePublish(id: string) {
      this.error = null;

      try {
        const response = await authorService.togglePublish(id);
        const index = this.authors.findIndex((item) => item._id === id);
        if (index !== -1) {
          this.authors[index] = {
            ...response.data,
            projectsCount: this.authors[index].projectsCount,
          };
        }
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao alternar publicação';
        console.error('Erro ao alternar publicação do autor:', error);
        throw error;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});
