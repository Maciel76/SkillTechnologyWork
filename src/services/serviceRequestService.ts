import api from "./api";

export interface ServiceRequest {
  _id?: string;
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem?: string;
  planName: string;
  planPrice: string;
  billingType: 'mensal' | 'anual';
  serviceName: string;
  status: 'pendente' | 'em_analise' | 'aprovado' | 'recusado' | 'concluido';
  lido: boolean;
  respondido: boolean;
  observacoes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceRequestResponse {
  success: boolean;
  message: string;
  data?: ServiceRequest;
}

export interface ServiceRequestStats {
  total: number;
  porStatus: {
    pendentes: number;
    emAnalise: number;
    aprovados: number;
    recusados: number;
    concluidos: number;
  };
  naoLidos: number;
  naoRespondidos: number;
  porServico: Array<{
    serviceName: string;
    count: number;
  }>;
}

const serviceRequestService = {
  async create(data: {
    nome: string;
    email: string;
    telefone: string;
    mensagem?: string;
    planName: string;
    planPrice: string;
    billingType: 'mensal' | 'anual';
    serviceName: string;
  }): Promise<ServiceRequestResponse> {
    const response = await api.post(`/service-requests`, data);
    return response.data;
  },

  // Métodos para admin
  async listAll(params?: {
    page?: number;
    limit?: number;
    status?: string;
    lido?: boolean;
    respondido?: boolean;
    serviceName?: string;
    search?: string;
  }): Promise<any> {
    try {
      const queryParams = {
        ...params,
        limit: params?.limit || 100,
      };

      const response = await api.get(`/service-requests`, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar solicitações de serviço:", error);
      throw error;
    }
  },

  async getStats(): Promise<ServiceRequestStats> {
    try {
      const response = await api.get(`/service-requests/stats`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<ServiceRequest> {
    try {
      const response = await api.get(`/service-requests/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar solicitação:", error);
      throw error;
    }
  },

  async updateStatus(
    id: string,
    status: string,
    observacoes?: string
  ): Promise<ServiceRequestResponse> {
    try {
      const response = await api.patch(
        `/service-requests/${id}/status`,
        { status, observacoes }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      throw error;
    }
  },

  async markAsRead(id: string): Promise<ServiceRequestResponse> {
    try {
      const response = await api.patch(
        `/service-requests/${id}/lido`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar como lido:", error);
      throw error;
    }
  },

  async markAsResponded(id: string): Promise<ServiceRequestResponse> {
    try {
      const response = await api.patch(
        `/service-requests/${id}/respondido`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao marcar como respondido:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/service-requests/${id}`);
    } catch (error) {
      console.error("Erro ao excluir solicitação:", error);
      throw error;
    }
  },

  async bulkMarkAsRead(ids: string[]): Promise<void> {
    try {
      await Promise.all(ids.map((id) => this.markAsRead(id)));
    } catch (error) {
      console.error("Erro ao marcar múltiplas como lidas:", error);
      throw error;
    }
  },

  async bulkDelete(ids: string[]): Promise<void> {
    try {
      await Promise.all(ids.map((id) => this.delete(id)));
    } catch (error) {
      console.error("Erro ao excluir múltiplas solicitações:", error);
      throw error;
    }
  },
};

export default serviceRequestService;
