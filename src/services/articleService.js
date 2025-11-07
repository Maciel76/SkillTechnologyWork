import api from "./api";

const articleService = {
  // Buscar artigos publicados (público)
  async getPublishedArticles(params = {}) {
    try {
      const response = await api.get("/blog/posts", { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar artigos publicados:", error);
      throw new Error(error.response?.data?.error || "Erro ao buscar artigos");
    }
  },

  // Buscar todos os artigos (admin)
  async getArticles(params = {}) {
    try {
      const response = await api.get("/blog/admin/posts", { params });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar artigos:", error);
      throw new Error(error.response?.data?.error || "Erro ao buscar artigos");
    }
  },

  // Buscar artigo por ID
  async getArticle(id) {
    try {
      const response = await api.get(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Erro ao buscar artigo");
    }
  },

  // Criar artigo
  async createArticle(articleData) {
    try {
      console.log("Enviando artigo:", articleData);
      const response = await api.post("/blog/posts", articleData);
      console.log("Resposta do servidor:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar artigo:", error.response?.data);
      throw new Error(error.response?.data?.error || error.response?.data?.details || "Erro ao criar artigo");
    }
  },

  // Atualizar artigo
  async updateArticle(id, articleData) {
    try {
      const response = await api.put(`/blog/posts/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao atualizar artigo"
      );
    }
  },

  // Deletar artigo
  async deleteArticle(id) {
    try {
      const response = await api.delete(`/blog/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Erro ao deletar artigo");
    }
  },

  // Buscar estatísticas
  async getStats() {
    try {
      const response = await api.get("/blog/admin/posts/stats");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao buscar estatísticas"
      );
    }
  },

  // Marcar como destaque
  async featureArticle(id) {
    try {
      const response = await api.put(`/blog/posts/${id}`, { destaque: true });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Erro ao marcar como destaque"
      );
    }
  },
};

export default articleService;
