import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "http://localhost:3000/api";

export interface Contact {
  _id?: string;
  nome: string;
  email: string;
  telefone?: string;
  empresa?: string;
  mensagem: string;
  assunto?: string;
  lido: boolean;
  respondido: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContactResponse {
  message: string;
  data?: Contact;
}

export interface ContactStats {
  total: number;
  lidos: number;
  naoLidos: number;
  respondidos: number;
  naoRespondidos: number;
  byAssunto: {
    orcamento: number;
    duvida: number;
    parceria: number;
    outro: number;
  };
}

const contactService = {
  async create(data: {
    nome: string;
    email: string;
    telefone?: string;
    empresa?: string;
    mensagem: string;
    assunto?: string;
  }): Promise<ContactResponse> {
    const response = await axios.post(`${API_URL}/contatos`, data);
    return response.data;
  },

  // Métodos para admin
  async listAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    assunto?: string;
    lido?: boolean;
    respondido?: boolean;
  }): Promise<any> {
    try {
      // Adicionar limite padrão se não especificado
      const queryParams = {
        ...params,
        limit: params?.limit || 100,
      };

      const response = await axios.get(`${API_URL}/contatos`, { params: queryParams });

      console.log("=== SERVICE DEBUG ===");
      console.log("Axios response completa:", response);
      console.log("Axios response.data:", response.data);
      console.log("Tipo de response.data:", typeof response.data);
      console.log("É array?", Array.isArray(response.data));
      console.log("===================");

      return response.data; // Retorna { data: [...], pagination: {...} }
    } catch (error) {
      console.error("Erro ao buscar contatos:", error);
      throw error;
    }
  },

  async getStats(): Promise<ContactStats> {
    try {
      const response = await axios.get(`${API_URL}/contatos/stats`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<Contact> {
    try {
      const response = await axios.get(`${API_URL}/contatos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar contato:", error);
      throw error;
    }
  },

  async markAsRead(id: string): Promise<ContactResponse> {
    try {
      const response = await axios.patch(`${API_URL}/contatos/${id}/lido`);
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar como lido:", error);
      throw error;
    }
  },

  async markAsResponded(id: string): Promise<ContactResponse> {
    try {
      const response = await axios.patch(`${API_URL}/contatos/${id}/respondido`);
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar como respondido:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/contatos/${id}`);
    } catch (error) {
      console.error("Erro ao excluir contato:", error);
      throw error;
    }
  },

  async bulkMarkAsRead(ids: string[]): Promise<void> {
    try {
      await Promise.all(ids.map((id) => this.markAsRead(id)));
    } catch (error) {
      console.error("Erro ao marcar múltiplos como lidos:", error);
      throw error;
    }
  },

  async bulkDelete(ids: string[]): Promise<void> {
    try {
      await Promise.all(ids.map((id) => this.delete(id)));
    } catch (error) {
      console.error("Erro ao excluir múltiplos contatos:", error);
      throw error;
    }
  },
};

export default contactService;
