import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5006/api",
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação se necessário
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    // O próprio login responde 401 em credencial errada; nesse caso não
    // redirecionamos, senão a tela recarrega e perde a mensagem de erro.
    const isLoginRequest = url.includes("/auth/login") || url.includes("/auth/admin/login");
    // Rota publica do site: visitante nunca deve ser mandado para o login
    const isPublicAi = url.includes("/ai/public/");

    if (error.response?.status === 401 && !isLoginRequest && !isPublicAi) {
      // Redirecionar para login se não autorizado
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
