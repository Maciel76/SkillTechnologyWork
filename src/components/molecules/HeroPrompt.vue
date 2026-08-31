<template>
  <section class="hero-prompt" :class="{ 'chat-mode': emConversa }">
    <div class="hero-inner">
      <!-- Vitrine: some assim que a conversa começa -->
      <template v-if="!emConversa">
        <h1 class="hero-title">
          Transformamos sua ideia em <span>software de verdade</span>
        </h1>

        <p class="hero-subtitle">
          Aplicamos IA ao seu negócio para
          <span class="underline">automatizar o que hoje é feito na mão</span>
        </p>

        <!-- Categorias: trocam o placeholder e as sugestões -->
        <div class="hero-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            type="button"
            class="tab"
            :class="{ active: tab.key === activeTab }"
            @click="selectTab(tab.key)"
          >
            <font-awesome-icon :icon="tab.icon" />
            <span>{{ tab.label }}</span>
          </button>
        </div>
      </template>

      <!-- Barra do chat: só no modo conversa -->
      <div v-if="emConversa" class="chat-bar">
        <span class="chat-bar-title">
          <font-awesome-icon icon="robot" />
          Assistente SkillTechnology
        </span>
        <button type="button" class="chat-bar-close" @click="novaConversa">
          <font-awesome-icon icon="xmark" />
          <span>Encerrar</span>
        </button>
      </div>

      <!-- Conversa -->
      <div
        v-if="emConversa"
        ref="chatBox"
        class="chat"
        @scroll="aoRolar"
      >
        <div
          v-for="(msg, index) in mensagens"
          :key="index"
          class="bubble"
          :class="msg.role === 'user' ? 'bubble-user' : 'bubble-bot'"
        >
          <span v-if="msg.role === 'assistant'" class="bubble-tag">
            <font-awesome-icon icon="robot" />
            Assistente SkillTechnology
          </span>
          <p><span class="texto">{{ msg.content }}</span><span
            v-if="msg.role === 'assistant' && index === ultimoIndice && digitando"
            class="cursor"
          ></span></p>
        </div>

        <div v-if="carregando" class="bubble bubble-bot">
          <span class="bubble-tag">
            <font-awesome-icon icon="robot" />
            Assistente SkillTechnology
          </span>
          <p class="typing"><span></span><span></span><span></span></p>
        </div>
      </div>

      <p v-if="erroChat" class="chat-error">
        <font-awesome-icon icon="triangle-exclamation" />
        {{ erroChat }}
      </p>

      <!-- Campo da ideia: agora é o chat do assistente -->
      <div class="prompt-card">
        <textarea
          ref="promptField"
          v-model="prompt"
          class="prompt-input"
          :rows="emConversa ? 2 : 3"
          :placeholder="
            emConversa ? 'Escreva sua resposta...' : currentTab.placeholder
          "
          @keydown.enter.ctrl.prevent="submit"
          @keydown.enter.meta.prevent="submit"
        ></textarea>

        <div v-if="attachment" class="attachment">
          <img :src="attachment.preview" :alt="attachment.name" />
          <span class="attachment-name">{{ attachment.name }}</span>
          <button
            type="button"
            class="attachment-remove"
            @click="removeAttachment"
          >
            <font-awesome-icon icon="xmark" />
          </button>
        </div>

        <div class="prompt-actions">
          <button type="button" class="attach-button" @click="openFilePicker">
            <font-awesome-icon icon="image" />
            <span>Anexar imagem</span>
          </button>
          <input
            ref="fileField"
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleFile"
          />

          <button
            type="button"
            class="send-button"
            :disabled="!prompt.trim() || ocupado"
            @click="submit"
          >
            <span>{{ carregando ? "Enviando..." : botaoLabel }}</span>
            <font-awesome-icon icon="arrow-right" />
          </button>
        </div>
      </div>

      <!-- Caminho para virar lead -->
      <div v-if="emConversa" class="chat-footer">
        <button type="button" class="team-button" @click="falarComEquipe">
          <font-awesome-icon icon="arrow-right" />
          Falar com a equipe
        </button>
      </div>

      <template v-if="!emConversa">
        <div class="hero-suggestions">
          <span class="suggestions-label">Experimente</span>
          <button
            v-for="chip in currentTab.chips"
            :key="chip.label"
            type="button"
            class="chip"
            @click="useChip(chip)"
          >
            {{ chip.label }}
          </button>
        </div>

        <p class="hero-trust">
          <font-awesome-icon icon="circle-check" />
          Mais de 200 projetos entregues para empresas de todo o Brasil
        </p>
      </template>
    </div>
  </section>
</template>

<script>
import { ref, computed, watch, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";
import aiService from "@/services/aiService";

// Ritmo da digitação: ~110 caracteres por segundo
const PASSO_CARACTERES = 2;
const INTERVALO_MS = 18;
// Distância do fim em que ainda consideramos que o usuário está "no fim"
const MARGEM_FIM_PX = 60;

export default {
  name: "HeroPrompt",
  setup() {
    const router = useRouter();

    const tabs = ref([
      {
        key: "integrar",
        label: "Integrar ao meu sistema",
        icon: "plug",
        placeholder:
          "Já uso um ERP e quero conectar uma IA que leia os pedidos e responda meus clientes sozinha...",
        chips: [
          {
            label: "IA no meu ERP ou CRM",
            text: "Quero conectar uma IA ao ERP que já uso, sem trocar de sistema.",
          },
          {
            label: "Conectar ao WhatsApp",
            text: "Quero ligar meu sistema atual ao WhatsApp com um atendimento feito por IA.",
          },
          {
            label: "Ler notas e contratos",
            text: "Preciso de uma IA que leia notas fiscais e contratos e jogue os dados no meu sistema.",
          },
          {
            label: "Unir planilhas e sistemas",
            text: "Quero integrar minhas planilhas e sistemas para a IA trabalhar com tudo em um lugar só.",
          },
        ],
      },
      {
        key: "criar",
        label: "Criar sistema com IA",
        icon: "layer-group",
        placeholder:
          "Quero um CRM com IA que priorize os melhores leads e escreva os follow-ups da minha equipe...",
        chips: [
          {
            label: "CRM com IA",
            text: "Quero um CRM com IA que priorize leads e sugira o próximo contato com cada cliente.",
          },
          {
            label: "ERP inteligente",
            text: "Preciso de um ERP com IA para prever compras e evitar ruptura de estoque.",
          },
          {
            label: "Portal do RH com IA",
            text: "Quero um portal de RH com IA para triagem de currículos e respostas aos funcionários.",
          },
          {
            label: "Dashboard preditivo",
            text: "Quero um dashboard com IA que aponte tendências e me avise quando algo sair do normal.",
          },
        ],
      },
      {
        key: "automatizar",
        label: "Automatizar operação",
        icon: "bolt",
        placeholder:
          "Quero acabar com o trabalho manual de lançar pedidos e montar relatórios todo dia...",
        chips: [
          {
            label: "Lançamentos automáticos",
            text: "Quero automatizar os lançamentos que hoje minha equipe faz na mão todo dia.",
          },
          {
            label: "Relatórios automáticos",
            text: "Quero relatórios gerados por IA e enviados sozinhos toda semana.",
          },
          {
            label: "Aprovações e fluxos",
            text: "Preciso automatizar aprovações internas para nada mais travar por e-mail.",
          },
          {
            label: "Cobrança e financeiro",
            text: "Quero automatizar cobranças, lembretes e conciliação do financeiro.",
          },
        ],
      },
      {
        key: "atendimento",
        label: "Atendimento com IA",
        icon: "robot",
        placeholder:
          "Quero um assistente de IA que atenda no WhatsApp, tire dúvidas e agende horários sozinho...",
        chips: [
          {
            label: "Assistente no WhatsApp",
            text: "Quero um assistente de IA atendendo meus clientes no WhatsApp 24 horas por dia.",
          },
          {
            label: "Chat no meu site",
            text: "Quero um chat com IA no meu site que responda dúvidas e capte contatos.",
          },
          {
            label: "Agendamento automático",
            text: "Quero uma IA que agende horários com os clientes e envie os lembretes.",
          },
          {
            label: "Suporte com IA",
            text: "Preciso de uma IA que responda o suporte e só passe para a equipe o que for complexo.",
          },
        ],
      },
    ]);

    const activeTab = ref("integrar");
    // Já começa com o texto da aba ativa preenchido
    const prompt = ref(
      (tabs.value[0].placeholder || "").replace(/\.{3}$/, "."),
    );
    const promptField = ref(null);
    const fileField = ref(null);
    const attachment = ref(null);

    // Conversa com o assistente
    const mensagens = ref([]);
    const carregando = ref(false);
    const digitando = ref(false);
    const erroChat = ref(null);
    const chatBox = ref(null);
    // Enquanto o usuário estiver no fim, o scroll segue a digitação
    const seguirScroll = ref(true);
    let timerDigitacao = null;

    const currentTab = computed(
      () =>
        tabs.value.find((tab) => tab.key === activeTab.value) || tabs.value[0],
    );

    const emConversa = computed(() => mensagens.value.length > 0);
    const ocupado = computed(() => carregando.value || digitando.value);
    const ultimoIndice = computed(() => mensagens.value.length - 1);

    const botaoLabel = computed(() =>
      emConversa.value ? "Enviar" : "Quero começar",
    );

    const focusPrompt = () => {
      nextTick(() => promptField.value?.focus());
    };

    // Só arrasta a tela se o usuário não tiver subido para reler
    const rolarParaFim = (forcar = false) => {
      nextTick(() => {
        const el = chatBox.value;
        if (!el) return;
        if (forcar || seguirScroll.value) {
          el.scrollTop = el.scrollHeight;
        }
      });
    };

    const aoRolar = () => {
      const el = chatBox.value;
      if (!el) return;
      const distanciaDoFim = el.scrollHeight - el.scrollTop - el.clientHeight;
      seguirScroll.value = distanciaDoFim < MARGEM_FIM_PX;
    };

    const pararDigitacao = () => {
      if (timerDigitacao) {
        clearTimeout(timerDigitacao);
        timerDigitacao = null;
      }
      digitando.value = false;
    };

    // Revela a resposta caractere a caractere
    const animarDigitacao = (texto) => {
      const indice = mensagens.value.length;
      mensagens.value.push({ role: "assistant", content: "" });
      digitando.value = true;

      let i = 0;
      const passo = () => {
        i = Math.min(i + PASSO_CARACTERES, texto.length);
        mensagens.value[indice].content = texto.slice(0, i);
        rolarParaFim();

        if (i < texto.length) {
          timerDigitacao = setTimeout(passo, INTERVALO_MS);
        } else {
          pararDigitacao();
        }
      };

      passo();
    };

    // O texto da aba já entra no campo, pronto para enviar —
    // o placeholder sozinho obrigava o visitante a digitar tudo.
    const textoDaAba = (tab) => (tab?.placeholder || "").replace(/\.{3}$/, ".");

    const selectTab = (key) => {
      activeTab.value = key;
      const tab = tabs.value.find((t) => t.key === key);
      prompt.value = textoDaAba(tab);
      focusPrompt();
    };

    const useChip = (chip) => {
      prompt.value = chip.text;
      focusPrompt();
    };

    const openFilePicker = () => {
      fileField.value?.click();
    };

    const clearPreview = () => {
      if (attachment.value?.preview) {
        URL.revokeObjectURL(attachment.value.preview);
      }
    };

    const handleFile = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      clearPreview();
      attachment.value = {
        name: file.name,
        preview: URL.createObjectURL(file),
        file,
      };
    };

    const removeAttachment = () => {
      clearPreview();
      attachment.value = null;
      if (fileField.value) fileField.value.value = "";
    };

    // O envio conversa com o assistente em vez de sair da página
    const submit = async () => {
      const texto = prompt.value.trim();
      if (!texto || ocupado.value) return;

      erroChat.value = null;
      mensagens.value.push({ role: "user", content: texto });
      prompt.value = "";
      carregando.value = true;
      // Mensagem própria sempre traz a tela de volta para o fim
      seguirScroll.value = true;
      rolarParaFim(true);

      try {
        const resposta = await aiService.publicChat(
          mensagens.value.map((m) => ({ role: m.role, content: m.content })),
          currentTab.value.label,
        );
        carregando.value = false;
        // Resposta vazia deixaria um balão em branco na tela
        animarDigitacao(
          (resposta || "").trim() ||
            "Não consegui formular uma resposta agora. Pode reformular a pergunta?",
        );
      } catch (error) {
        carregando.value = false;
        erroChat.value = error.message;
        rolarParaFim();
      }
    };

    // Caminho para virar lead: leva a conversa para a página de contato
    const falarComEquipe = () => {
      const primeira = mensagens.value.find((m) => m.role === "user");

      sessionStorage.setItem(
        "heroPrompt",
        JSON.stringify({
          categoria: currentTab.value.label,
          mensagem: primeira?.content || prompt.value.trim(),
          anexo: attachment.value?.name || null,
          conversa: mensagens.value,
        }),
      );

      router.push({ name: "contato" });
    };

    const novaConversa = () => {
      pararDigitacao();
      mensagens.value = [];
      erroChat.value = null;
      prompt.value = "";
      carregando.value = false;
      seguirScroll.value = true;
      focusPrompt();
    };

    // Em conversa a tela é só o chat: trava a rolagem do resto da página.
    // Precisa ser no <html> também — só no <body> não segura quando quem
    // rola é o documentElement.
    const travarPagina = (travar) => {
      const valor = travar ? "hidden" : "";
      document.documentElement.style.overflow = valor;
      document.body.style.overflow = valor;
    };

    watch(emConversa, (ativo) => {
      travarPagina(ativo);
      if (ativo) window.scrollTo(0, 0);
    });

    onBeforeUnmount(() => {
      pararDigitacao();
      clearPreview();
      travarPagina(false);
    });

    return {
      tabs,
      activeTab,
      currentTab,
      prompt,
      promptField,
      fileField,
      attachment,
      mensagens,
      carregando,
      digitando,
      erroChat,
      chatBox,
      emConversa,
      ocupado,
      ultimoIndice,
      botaoLabel,
      aoRolar,
      selectTab,
      useChip,
      openFilePicker,
      handleFile,
      removeAttachment,
      submit,
      falarComEquipe,
      novaConversa,
    };
  },
};
</script>

<style scoped>
.hero-prompt {
  position: relative;
  padding: 5rem 5% 5.5rem;
  background-color: #f6f5f1;
  background-image:
    linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
  overflow: hidden;
  transition: padding 0.35s ease;
}

.hero-inner {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
}

/* ---- Modo conversa: o hero vira o chat ---- */
/* Altura definida (não min-height): sem isso a seção cresce com o texto
   e quem rola vira a página, não o chat. */
.hero-prompt.chat-mode {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  padding: 1.5rem 5% 2rem;
}

.hero-prompt.chat-mode .hero-inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  max-width: 820px;
  min-height: 0;
}

.hero-prompt.chat-mode .chat {
  flex: 1;
  max-height: none;
  min-height: 0;
}

.hero-title {
  font-size: 3.4rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #131a4d;
}

.hero-title span {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  margin-top: 1.25rem;
  font-size: 1.2rem;
  color: #3d4570;
}

.hero-subtitle .underline {
  display: inline-block;
  border-bottom: 2px solid #7c6ef2;
  padding-bottom: 2px;
}

/* Categorias */
.hero-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin: 2.25rem 0 1.5rem;
}

.tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  border: 1px solid #dcdcd4;
  border-radius: 10px;
  background: transparent;
  color: #4b5280;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab:hover {
  border-color: #b9b7f0;
  color: #131a4d;
}

.tab.active {
  background: #fff;
  border-color: #fff;
  color: #131a4d;
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(19, 26, 77, 0.1);
}

/* Barra do chat */
.chat-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.25rem 0.85rem;
  border-bottom: 1px solid #e6e5df;
  margin-bottom: 0.85rem;
}

.chat-bar-title {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1rem;
  font-weight: 700;
  color: #131a4d;
}

.chat-bar-title svg {
  color: #7c6ef2;
}

.chat-bar-close {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  background: transparent;
  color: #6b7194;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.3rem 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.chat-bar-close:hover {
  background: rgba(19, 26, 77, 0.06);
  color: #131a4d;
}

/* Conversa */
.chat {
  text-align: left;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.25rem 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bubble {
  max-width: 85%;
  padding: 0.85rem 1.05rem;
  border-radius: 14px;
  font-size: 1rem;
  line-height: 1.6;
  animation: entrar 0.25s ease;
}

@keyframes entrar {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bubble p {
  white-space: pre-wrap;
}

.bubble-user {
  align-self: flex-end;
  background: #0052ff;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.bubble-bot {
  align-self: flex-start;
  background: #fff;
  color: #131a4d;
  border: 1px solid #e6e5df;
  border-bottom-left-radius: 4px;
}

.bubble-tag {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #7c6ef2;
  margin-bottom: 0.35rem;
}

/* Cursor que pisca enquanto o texto é revelado */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  vertical-align: text-bottom;
  margin-left: 2px;
  background: #7c6ef2;
  animation: piscar 0.9s steps(2, start) infinite;
}

@keyframes piscar {
  to {
    visibility: hidden;
  }
}

/* Três pontinhos enquanto a resposta não chega */
.typing {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.typing span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b9b7f0;
  animation: pulsar 1.2s infinite ease-in-out;
}

.typing span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulsar {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

.chat-error {
  margin: 0.85rem 0;
  padding: 0.7rem 1rem;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 10px;
  color: #b91c1c;
  font-size: 0.9rem;
  text-align: left;
}

.chat-error svg {
  margin-right: 0.35rem;
}

/* Campo da ideia */
.prompt-card {
  background: #fff;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.08);
  padding: 1.25rem 1.25rem 0.75rem;
  text-align: left;
}

.chat-mode .prompt-card {
  margin-top: 0.85rem;
  padding: 0.85rem 1rem 0.6rem;
  box-shadow: 0 10px 28px rgba(19, 26, 77, 0.08);
}

.prompt-input {
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #131a4d;
  background: transparent;
  min-height: 92px;
}

.chat-mode .prompt-input {
  min-height: 56px;
  font-size: 1rem;
}

.prompt-input::placeholder {
  color: #9aa0b8;
}

.attachment {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.75rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid #e6e5df;
  border-radius: 8px;
  max-width: 100%;
}

.attachment img {
  width: 28px;
  height: 28px;
  border-radius: 5px;
  object-fit: cover;
}

.attachment-name {
  font-size: 0.85rem;
  color: #4b5280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 220px;
}

.attachment-remove {
  border: none;
  background: transparent;
  color: #9aa0b8;
  cursor: pointer;
  padding: 0 2px;
}

.attachment-remove:hover {
  color: #131a4d;
}

.prompt-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-top: 1px solid #f0efe9;
  padding-top: 0.75rem;
}

.file-input {
  display: none;
}

.attach-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: transparent;
  color: #6b7194;
  font-size: 0.92rem;
  cursor: pointer;
  padding: 0.4rem 0;
}

.attach-button:hover {
  color: #0052ff;
}

.send-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.3rem;
  background: #0052ff;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: #0040c9;
  transform: translateY(-1px);
}

.send-button:disabled {
  background: #c3cbe6;
  cursor: not-allowed;
}

/* Ação de virar lead */
.chat-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.85rem;
}

.team-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #0052ff;
  border-radius: 8px;
  background: #fff;
  color: #0052ff;
  padding: 0.6rem 1.2rem;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.team-button:hover {
  background: #0052ff;
  color: #fff;
}

/* Sugestões */
.hero-suggestions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.75rem;
}

.suggestions-label {
  font-size: 0.9rem;
  color: #6b7194;
  margin-right: 0.25rem;
}

.chip {
  border: 1px solid #e2e1da;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.45rem 1rem;
  font-size: 0.88rem;
  color: #4b5280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover {
  background: #fff;
  border-color: #7c6ef2;
  color: #131a4d;
}

.hero-trust {
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #6b7194;
}

.hero-trust svg {
  color: #22c55e;
  margin-right: 0.35rem;
}

/* Responsivo */
@media (max-width: 768px) {
  .hero-prompt {
    padding: 2.5rem 1.25rem 3rem;
    background-size: 80px 80px;
  }

  .hero-prompt.chat-mode {
    padding: 1rem 1rem 1.25rem;
    /* Em celular, 100vh estoura com a barra do navegador */
    height: 100svh;
    max-height: 100svh;
  }

  .hero-title {
    font-size: 1.95rem;
  }

  .hero-subtitle {
    margin-top: 0.9rem;
    font-size: 1rem;
  }

  /* Categorias e sugestões viram faixas roláveis no celular */
  .hero-tabs,
  .hero-suggestions {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    padding: 0 1.25rem 0.25rem;
    scroll-snap-type: x proximity;
  }

  .hero-tabs::-webkit-scrollbar,
  .hero-suggestions::-webkit-scrollbar {
    display: none;
  }

  .hero-tabs {
    margin-top: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .hero-suggestions {
    margin-top: 1.25rem;
  }

  .tab,
  .chip,
  .suggestions-label {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }

  .tab {
    padding: 0.55rem 0.9rem;
    font-size: 0.88rem;
  }

  .bubble {
    max-width: 92%;
    font-size: 0.95rem;
  }

  .prompt-card {
    padding: 1rem 1rem 0.9rem;
    border-radius: 14px;
  }

  .prompt-input {
    min-height: 96px;
    font-size: 1rem;
  }

  .chat-mode .prompt-input {
    min-height: 48px;
  }

  /* Botão principal ocupa a largura toda: alvo maior no toque */
  .prompt-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .send-button {
    width: 100%;
    justify-content: center;
    padding: 0.85rem 1rem;
  }

  .chat-mode .prompt-actions {
    flex-direction: row;
    align-items: center;
  }

  .chat-mode .send-button {
    width: auto;
    padding: 0.7rem 1.1rem;
  }

  .team-button {
    width: 100%;
    justify-content: center;
  }

  .hero-trust {
    margin-top: 1.5rem;
    font-size: 0.85rem;
  }
}
</style>
