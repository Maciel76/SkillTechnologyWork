// composables/useStats.js
import { ref, onMounted } from "vue";

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

      const response = await fetch("/api/stats/visit", {
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
    } catch (error) {
      console.error("Erro ao registrar visita:", error);
    }
  };

  // Buscar estatísticas
  const fetchStats = async () => {
    try {
      loading.value = true;
      const response = await fetch("/api/stats");
      if (response.ok) {
        const data = await response.json();
        stats.value = data;
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
    } finally {
      loading.value = false;
    }
  };

  // Comentado para evitar erro 404 - descomentar quando a rota /api/stats for implementada
  // onMounted(() => {
  //   fetchStats();
  // });

  return {
    stats,
    loading,
    registerVisit,
    fetchStats,
  };
}
