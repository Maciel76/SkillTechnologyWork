import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL || "http://localhost:3000/api";

export interface Subscription {
  _id?: string;
  name: string;
  email: string;
  subscribedAt?: Date;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubscriptionResponse {
  message: string;
  data?: Subscription;
}

export interface SubscriptionStats {
  total: number;
  active: number;
  inactive: number;
}

const subscriptionService = {
  async subscribe(data: {
    name: string;
    email: string;
  }): Promise<SubscriptionResponse> {
    const response = await axios.post(`${API_URL}/subscribe`, data);
    return response.data;
  },

  async unsubscribe(email: string): Promise<SubscriptionResponse> {
    const response = await axios.post(`${API_URL}/unsubscribe`, { email });
    return response.data;
  },

  // Métodos para admin
  async listAll(): Promise<Subscription[]> {
    try {
      const response = await axios.get(`${API_URL}/admin/subscriptions`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar subscriptions:", error);
      throw error;
    }
  },

  async getStats(): Promise<SubscriptionStats> {
    try {
      const response = await axios.get(`${API_URL}/admin/subscriptions/stats`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      throw error;
    }
  },

  async deleteSubscription(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/admin/subscriptions/${id}`);
    } catch (error) {
      console.error("Erro ao excluir subscription:", error);
      throw error;
    }
  },
};

export default subscriptionService;
