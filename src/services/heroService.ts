import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5006/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface HeroSlide {
  _id?: string;
  image: string;
  alt: string;
  h1: string;
  p: string;
  link: string;
  ctaText: string;
  order: number;
}

export interface Technology {
  _id?: string;
  name: string;
  icon: string;
  order: number;
}

export interface HeroConfig {
  _id?: string;
  slides: HeroSlide[];
  technologies?: Technology[];
  updatedAt?: string;
  createdAt?: string;
}

const heroService = {
  // Buscar configuração do hero
  async getConfig(): Promise<HeroConfig> {
    const response = await api.get('/hero-config');
    return response.data;
  },

  // Atualizar todos os slides
  async updateConfig(slides: HeroSlide[]): Promise<HeroConfig> {
    const response = await api.put('/hero-config', { slides });
    return response.data;
  },

  // Adicionar um slide
  async addSlide(slide: Partial<HeroSlide>): Promise<HeroConfig> {
    const response = await api.post('/hero-config/slides', slide);
    return response.data;
  },

  // Remover um slide
  async removeSlide(slideId: string): Promise<HeroConfig> {
    const response = await api.delete(`/hero-config/slides/${slideId}`);
    return response.data;
  },

  // Atualizar a faixa de tecnologias
  async updateTechnologies(technologies: Technology[]): Promise<HeroConfig> {
    const response = await api.put('/hero-config/technologies', { technologies });
    return response.data;
  },

  // Upload de imagem
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    // Sem Content-Type manual: o browser precisa gerar o boundary do
    // multipart. Forcar o header derrubava o parse no servidor.
    const response = await api.post('/hero-config/upload', formData, {
      timeout: 120000,
    });
    return response.data.url;
  },

  // Resetar para slides padrão
  async reset(): Promise<HeroConfig> {
    const response = await api.put('/hero-config/reset');
    return response.data;
  },
};

export default heroService;
