// src/services/authService.js
// Simple authentication service using localStorage

const ADMIN_USER = "Maciel76";
const ADMIN_PASSWORD = "Skill317269@#$"; // In a real app, this would be handled by a backend

export const login = async (username, password) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Basic validation
  if (!username || !password) {
    throw new Error("Por favor, preencha todos os campos");
  }

  // Check credentials (in a real app, this would be an API call)
  if (username === ADMIN_USER && password === ADMIN_PASSWORD) {
    // Store user info in localStorage
    const user = {
      id: 1,
      username: username,
      role: "admin",
      isAuthenticated: true,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Credenciais inválidas. Tente novamente.");
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // Clean up any tokens
};

export const isAuthenticated = () => {
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
