const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export interface Event {
  _id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  day: string;
  month: string;
  fullDate: string;
  time: string;
  location: string;
  image: string;
  gallery: string[];
  status: 'planejado' | 'confirmado' | 'cancelado' | 'realizado';
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EventsResponse {
  data: Event[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface EventResponse {
  data: Event;
  message?: string;
}

export interface StatsResponse {
  data: {
    total: number;
    published: number;
    draft: number;
    upcoming: number;
    past: number;
    byStatus: Array<{ _id: string; count: number }>;
  };
}

class EventService {
  // Listar eventos publicados (público)
  async getPublishedEvents(params?: {
    status?: string;
    upcoming?: boolean;
    limit?: number;
    page?: number;
  }): Promise<EventsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.status) queryParams.append('status', params.status);
    if (params?.upcoming) queryParams.append('upcoming', 'true');
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/events?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }

    return response.json();
  }

  // Listar eventos futuros
  async getUpcomingEvents(limit = 5): Promise<EventsResponse> {
    const response = await fetch(`${API_URL}/events/upcoming?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos futuros');
    }

    return response.json();
  }

  // Listar eventos passados
  async getPastEvents(limit = 5): Promise<EventsResponse> {
    const response = await fetch(`${API_URL}/events/past?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos passados');
    }

    return response.json();
  }

  // Listar todos os eventos (admin)
  async getAllEvents(params?: {
    published?: boolean;
    status?: string;
    limit?: number;
    page?: number;
  }): Promise<EventsResponse> {
    const queryParams = new URLSearchParams();

    if (params?.published !== undefined) queryParams.append('published', params.published.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const response = await fetch(`${API_URL}/admin/events?${queryParams.toString()}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }

    return response.json();
  }

  // Obter evento por ID
  async getEventById(id: string): Promise<EventResponse> {
    const response = await fetch(`${API_URL}/events/${id}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar evento');
    }

    return response.json();
  }

  // Criar novo evento
  async createEvent(event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<EventResponse> {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao criar evento');
    }

    return response.json();
  }

  // Atualizar evento
  async updateEvent(id: string, event: Partial<Event>): Promise<EventResponse> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao atualizar evento');
    }

    return response.json();
  }

  // Deletar evento
  async deleteEvent(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao deletar evento');
    }

    return response.json();
  }

  // Alternar publicação
  async togglePublish(id: string): Promise<EventResponse> {
    const response = await fetch(`${API_URL}/events/${id}/publish`, {
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
    const response = await fetch(`${API_URL}/admin/events/stats`);

    if (!response.ok) {
      throw new Error('Erro ao buscar estatísticas');
    }

    return response.json();
  }
}

export default new EventService();
