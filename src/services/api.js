import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5006/api",
  // 10s derrubava upload de imagem em producao: a conexao do usuario e bem
  // mais lenta que o localhost. Envios de arquivo passam timeout proprio.
  timeout: 30000,
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
      // Limpa a sessão inteira: apagar só o token deixava o "user" para trás,
      // o app continuava se achando logado e voltava para o dashboard.
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Guarda de onde veio para voltar depois de entrar de novo
      if (!window.location.pathname.startsWith("/login")) {
        const destino = encodeURIComponent(
          window.location.pathname + window.location.search
        );
        window.location.href = `/login?redirect=${destino}`;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
