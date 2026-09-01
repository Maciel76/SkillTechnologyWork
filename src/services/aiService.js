// src/services/aiService.js
// Integracao de IA (DeepSeek). A chave e salva no backend e nunca
// volta inteira para o navegador — so uma versao mascarada.

import api from "./api";

const extrairErro = (error, padrao) => {
  if (error.response) {
    return new Error(error.response.data?.message || padrao);
  }
  return new Error("Nao foi possivel conectar ao servidor.");
};

// Identifica a conversa do visitante para o backend nao duplicar o lead
const CHAVE_SESSAO = "aiSessionId";

export const getSessionId = () => {
  let id = sessionStorage.getItem(CHAVE_SESSAO);
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `s-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(CHAVE_SESSAO, id);
  }
  return id;
};

export const getConfig = async () => {
  try {
    const { data } = await api.get("/ai/config");
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao carregar a configuracao de IA.");
  }
};

export const updateConfig = async (payload) => {
  try {
    const { data } = await api.put("/ai/config", payload);
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao salvar a configuracao de IA.");
  }
};

export const removeKey = async () => {
  try {
    const { data } = await api.delete("/ai/config/key");
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao remover a chave.");
  }
};

export const testConnection = async () => {
  try {
    const { data } = await api.post("/ai/test");
    return data;
  } catch (error) {
    throw extrairErro(error, "Falha ao testar a conexao.");
  }
};

export const chat = async (messages) => {
  try {
    const { data } = await api.post("/ai/chat", { messages });
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao conversar com a IA.");
  }
};

// Atendimento do site (HeroPrompt) — rota publica, sem token.
// O prompt de sistema e os limites ficam no servidor.
export const publicChat = async (messages, categoria) => {
  try {
    const { data } = await api.post("/ai/public/chat", {
      messages,
      categoria,
      sessionId: getSessionId(),
    });
    return data.content;
  } catch (error) {
    throw extrairErro(error, "Nao foi possivel falar com o assistente agora.");
  }
};

// Leads capturados pelo assistente (painel)

// Pede para a IA ler o artigo e preencher a ficha do post:
// titulo, resumo, slug, categorias, tags, tempo de leitura e capa.
// As categorias vao junto para a IA escolher so as que existem no painel.
export const analisarArtigo = async (conteudo, categoriasDisponiveis) => {
  try {
    const { data } = await api.post("/ai/blog/analisar", {
      conteudo,
      categoriasDisponiveis,
    });
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao analisar o artigo.");
  }
};
export const getLeads = async (status) => {
  try {
    const { data } = await api.get("/ai/leads", {
      params: status && status !== "todos" ? { status } : {},
    });
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao carregar os leads.");
  }
};

export const updateLeadStatus = async (id, status) => {
  try {
    const { data } = await api.patch(`/ai/leads/${id}`, { status });
    return data;
  } catch (error) {
    throw extrairErro(error, "Erro ao atualizar o lead.");
  }
};

export const deleteLead = async (id) => {
  try {
    await api.delete(`/ai/leads/${id}`);
  } catch (error) {
    throw extrairErro(error, "Erro ao remover o lead.");
  }
};

export default {
  getConfig,
  analisarArtigo,
  updateConfig,
  removeKey,
  testConnection,
  chat,
  publicChat,
  getSessionId,
  getLeads,
  updateLeadStatus,
  deleteLead,
};
