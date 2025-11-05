import { defineStore } from 'pinia';
import eventService, { Event } from '@/services/eventService';

interface EventState {
  events: Event[];
  publishedEvents: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
  stats: {
    total: number;
    published: number;
    draft: number;
    upcoming: number;
    past: number;
    byStatus: Array<{ _id: string; count: number }>;
  } | null;
}

export const useEventStore = defineStore('event', {
  state: (): EventState => ({
    events: [],
    publishedEvents: [],
    currentEvent: null,
    loading: false,
    error: null,
    stats: null,
  }),

  getters: {
    // Eventos publicados
    getPublishedEvents: (state) => state.publishedEvents,

    // Eventos por status
    getEventsByStatus: (state) => (status: string) => {
      return state.events.filter((event) => event.status === status);
    },

    // Eventos futuros publicados
    getUpcomingPublishedEvents: (state) => {
      const now = new Date();
      return state.publishedEvents.filter(
        (event) => new Date(event.date) >= now
      );
    },

    // Eventos passados publicados
    getPastPublishedEvents: (state) => {
      const now = new Date();
      return state.publishedEvents.filter(
        (event) => new Date(event.date) < now
      );
    },

    // Total de eventos
    getTotalEvents: (state) => state.events.length,

    // Eventos rascunho
    getDraftEvents: (state) => state.events.filter((event) => !event.published),
  },

  actions: {
    // Buscar eventos publicados (público)
    async fetchPublishedEvents(params?: {
      status?: string;
      upcoming?: boolean;
      limit?: number;
      page?: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.getPublishedEvents(params);
        this.publishedEvents = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar eventos';
        console.error('Erro ao buscar eventos publicados:', error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar todos os eventos (admin)
    async fetchAllEvents(params?: {
      published?: boolean;
      status?: string;
      limit?: number;
      page?: number;
    }) {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.getAllEvents(params);
        this.events = response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar eventos';
        console.error('Erro ao buscar todos os eventos:', error);
      } finally {
        this.loading = false;
      }
    },

    // Buscar evento por ID
    async fetchEventById(id: string) {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.getEventById(id);
        this.currentEvent = response.data;
        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao carregar evento';
        console.error('Erro ao buscar evento:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Criar novo evento
    async createEvent(event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.createEvent(event);
        this.events.push(response.data);

        // Se foi publicado, adiciona também aos eventos publicados
        if (response.data.published) {
          this.publishedEvents.push(response.data);
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao criar evento';
        console.error('Erro ao criar evento:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Atualizar evento
    async updateEvent(id: string, event: Partial<Event>) {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.updateEvent(id, event);

        // Atualizar na lista de eventos
        const index = this.events.findIndex((e) => e._id === id);
        if (index !== -1) {
          this.events[index] = response.data;
        }

        // Atualizar na lista de eventos publicados
        const pubIndex = this.publishedEvents.findIndex((e) => e._id === id);
        if (response.data.published) {
          if (pubIndex !== -1) {
            this.publishedEvents[pubIndex] = response.data;
          } else {
            this.publishedEvents.push(response.data);
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedEvents.splice(pubIndex, 1);
          }
        }

        // Atualizar evento atual se for o mesmo
        if (this.currentEvent?._id === id) {
          this.currentEvent = response.data;
        }

        return response.data;
      } catch (error: any) {
        this.error = error.message || 'Erro ao atualizar evento';
        console.error('Erro ao atualizar evento:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Deletar evento
    async deleteEvent(id: string) {
      this.loading = true;
      this.error = null;

      try {
        await eventService.deleteEvent(id);

        // Remover da lista de eventos
        this.events = this.events.filter((e) => e._id !== id);

        // Remover da lista de eventos publicados
        this.publishedEvents = this.publishedEvents.filter((e) => e._id !== id);

        // Limpar evento atual se for o mesmo
        if (this.currentEvent?._id === id) {
          this.currentEvent = null;
        }
      } catch (error: any) {
        this.error = error.message || 'Erro ao deletar evento';
        console.error('Erro ao deletar evento:', error);
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
        const response = await eventService.togglePublish(id);

        // Atualizar na lista de eventos
        const index = this.events.findIndex((e) => e._id === id);
        if (index !== -1) {
          this.events[index] = response.data;
        }

        // Atualizar na lista de eventos publicados
        const pubIndex = this.publishedEvents.findIndex((e) => e._id === id);
        if (response.data.published) {
          if (pubIndex === -1) {
            this.publishedEvents.push(response.data);
          } else {
            this.publishedEvents[pubIndex] = response.data;
          }
        } else {
          if (pubIndex !== -1) {
            this.publishedEvents.splice(pubIndex, 1);
          }
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

    // Buscar estatísticas (admin)
    async fetchStats() {
      this.loading = true;
      this.error = null;

      try {
        const response = await eventService.getStats();
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

    // Limpar evento atual
    clearCurrentEvent() {
      this.currentEvent = null;
    },
  },
});
