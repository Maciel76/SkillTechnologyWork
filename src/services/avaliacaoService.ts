const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5006/api";

export interface Avaliacao {
  _id?: string;
  nome: string;
  cargo?: string;
  empresa: string;
  avaliacao: string;
  nota?: number;
  aprovado?: boolean;
  createdAt?: string;
}

export interface AvaliacoesResponse {
  data: Avaliacao[];
  total?: number;
}

class AvaliacaoService {
  // Depoimentos já aprovados no painel (público)
  async getAprovadas(): Promise<AvaliacoesResponse> {
    const response = await fetch(`${API_URL}/avaliacoes/aprovadas`);

    if (!response.ok) {
      throw new Error("Erro ao buscar avaliações");
    }

    return response.json();
  }

  // Enviar avaliação: entra como pendente até ser aprovada
  async enviar(
    avaliacao: Omit<Avaliacao, "_id" | "aprovado" | "createdAt">
  ): Promise<{ message: string; data: Avaliacao }> {
    const response = await fetch(`${API_URL}/avaliacoes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(avaliacao),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Erro ao enviar avaliação");
    }

    return data;
  }
}

export default new AvaliacaoService();
