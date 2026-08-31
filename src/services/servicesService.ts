import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export interface ServiceItem {
  _id?: string;
  title: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
  image: string;
  link: string;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const servicesService = {
  // Público — serviços publicados
  async getPublished(): Promise<ServiceItem[]> {
    const res = await api.get('/services');
    return res.data.data || [];
  },

  // Admin — todos os serviços
  async getAll(): Promise<ServiceItem[]> {
    const res = await api.get('/admin/services');
    return res.data.data || [];
  },

  async create(service: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await api.post('/services', service);
    return res.data.data;
  },

  async update(id: string, service: Partial<ServiceItem>): Promise<ServiceItem> {
    const res = await api.put(`/services/${id}`, service);
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  },

  async togglePublish(id: string): Promise<ServiceItem> {
    const res = await api.patch(`/services/${id}/publish`);
    return res.data.data;
  },

  async reorder(ids: string[]): Promise<ServiceItem[]> {
    const res = await api.put('/services/reorder', { ids });
    return res.data.data || [];
  },

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/services/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url;
  },
};

export default servicesService;
