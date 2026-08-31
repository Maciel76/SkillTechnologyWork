<template>
  <section class="hero-prompt">
    <div class="hero-inner">
      <h1 class="hero-title">
        Sua ideia vira <span>software de verdade</span>
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

      <!-- Campo da ideia: vira o chat do assistente no futuro -->
      <div class="prompt-card">
        <textarea
          ref="promptField"
          v-model="prompt"
          class="prompt-input"
          rows="3"
          :placeholder="currentTab.placeholder"
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
            :disabled="!prompt.trim()"
            @click="submit"
          >
            <span>Quero começar</span>
            <font-awesome-icon icon="arrow-right" />
          </button>
        </div>
      </div>

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
    </div>
  </section>
</template>

<script>
import { ref, computed, onBeforeUnmount, nextTick } from "vue";
import { useRouter } from "vue-router";

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
    const prompt = ref("");
    const promptField = ref(null);
    const fileField = ref(null);
    const attachment = ref(null);

    const currentTab = computed(
      () =>
        tabs.value.find((tab) => tab.key === activeTab.value) || tabs.value[0]
    );

    const focusPrompt = () => {
      nextTick(() => promptField.value?.focus());
    };

    const selectTab = (key) => {
      activeTab.value = key;
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

    // Por enquanto o envio leva a ideia para a página de contato.
    // Quando o assistente entrar no ar, é aqui que a conversa começa.
    const submit = () => {
      const ideia = prompt.value.trim();
      if (!ideia) return;

      sessionStorage.setItem(
        "heroPrompt",
        JSON.stringify({
          categoria: currentTab.value.label,
          mensagem: ideia,
          anexo: attachment.value?.name || null,
        })
      );

      router.push({ name: "contato" });
    };

    onBeforeUnmount(clearPreview);

    return {
      tabs,
      activeTab,
      currentTab,
      prompt,
      promptField,
      fileField,
      attachment,
      selectTab,
      useChip,
      openFilePicker,
      handleFile,
      removeAttachment,
      submit,
    };
  },
};
</script>

<style scoped>
.hero-prompt {
  position: relative;
  padding: 5rem 5% 5.5rem;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
  overflow: hidden;
}

.hero-inner {
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
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

/* Campo da ideia */
.prompt-card {
  background: #fff;
  border: 1px solid #e6e5df;
  border-radius: 16px;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.08);
  padding: 1.25rem 1.25rem 0.75rem;
  text-align: left;
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
  transition: background 0.2s ease, transform 0.2s ease;
}

.send-button:hover:not(:disabled) {
  background: #0040c9;
  transform: translateY(-1px);
}

.send-button:disabled {
  background: #c3cbe6;
  cursor: not-allowed;
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

  .prompt-card {
    padding: 1rem 1rem 0.9rem;
    border-radius: 14px;
  }

  .prompt-input {
    min-height: 96px;
    font-size: 1rem;
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

  .hero-trust {
    margin-top: 1.5rem;
    font-size: 0.85rem;
  }
}
</style>
