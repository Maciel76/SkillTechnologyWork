// composables/useStats.js
import { ref } from "vue";

// Caminho relativo mandava a chamada para o dev server, que devolve o
// index.html do site: o JSON.parse quebrava com "Unexpected token <".
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5006/api";

export function useStats() {
  const stats = ref({
    totalVisitors: 0,
    uniqueVisitors: 0,
    pageViews: 0,
  });

  const loading = ref(false);

  // Gerar ID único para o visitante
  const getVisitorId = () => {
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      visitorId =
        "visitor_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("visitorId", visitorId);
    }
    return visitorId;
  };

  // Registrar visita
  const registerVisit = async (type = "pageview") => {
    try {
      const visitorId = getVisitorId();
      const isUnique = !sessionStorage.getItem("hasVisited");

      const response = await fetch(`${API_URL}/stats/visit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Visitor-ID": visitorId,
        },
        body: JSON.stringify({
          type: isUnique ? "unique" : "pageview",
        }),
      });

      if (response.ok) {
        sessionStorage.setItem("hasVisited", "true");
      }
    } catch {
      // Registrar visita é acessório: nunca deve quebrar a página
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      loading.value = true;
      const response = await fetch(`${API_URL}/stats`);
      if (response.ok) {
        const data = await response.json();
        stats.value = data;
      }
    } catch {
      // Falha de rede: mantém os zeros em vez de quebrar o painel
    } finally {
      loading.value = false;
    }
  };

  return {
    stats,
    loading,
    registerVisit,
    fetchStats,
  };
}
