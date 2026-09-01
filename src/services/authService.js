// src/services/authService.js
// Autenticação via backend — as credenciais ficam em backend/.env,
// nunca no bundle do frontend.

import api from "./api";

export const login = async (username, password) => {
  // Basic validation
  if (!username || !password) {
    throw new Error("Por favor, preencha todos os campos");
  }

  try {
    const { data } = await api.post("/auth/admin/login", { username, password });

    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("authToken", data.token);

    return data.user;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Credenciais inválidas. Tente novamente."
      );
    }
    throw new Error("Não foi possível conectar ao servidor. Tente novamente.");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("authToken");
  localStorage.removeItem("token"); // Clean up any legacy tokens
};

export const isAuthenticated = () => {
  // O token é a fonte de verdade: sem ele o backend responde 401.
  // Checar só o "user" deixava o app se achando logado sem sessão,
  // e qualquer rota protegida entrava em loop de redirecionamento.
  const token = localStorage.getItem("authToken");
  if (!token) return false;

  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    return userData.isAuthenticated === true;
  }
  return false;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === "admin" && user.isAuthenticated === true;
};
