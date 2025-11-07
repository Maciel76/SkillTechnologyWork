import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

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

const subscriptionService = {
  async subscribe(data: { name: string; email: string }): Promise<SubscriptionResponse> {
    const response = await axios.post(`${API_URL}/subscribe`, data);
    return response.data;
  },

  async unsubscribe(email: string): Promise<SubscriptionResponse> {
    const response = await axios.post(`${API_URL}/unsubscribe`, { email });
    return response.data;
  },
};

export default subscriptionService;
