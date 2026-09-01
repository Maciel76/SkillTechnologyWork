<template>
  <main class="contato-pagina">
    <!-- Abertura -->
    <section class="contato-hero">
      <div class="hero-inner">
        <h1>
          Vamos conversar sobre
          <span class="gradiente">o seu projeto</span>
        </h1>
        <p>
          Conte o que sua operação precisa. Respondemos em até 24h, com
          diagnóstico gratuito e sem compromisso.
        </p>
      </div>
    </section>

    <section class="contato-corpo">
      <div class="corpo-inner">
        <!-- Formulário -->
        <div class="form-card">
          <h2>Envie sua mensagem</h2>

          <form @submit.prevent="submitForm" novalidate>
            <div class="campos-duplos">
              <div class="campo">
                <label for="name">Nome completo *</label>
                <input
                  id="name"
                  type="text"
                  v-model="form.name"
                  :class="{ erro: errors.name }"
                  placeholder="Digite seu nome"
                  @blur="validateField('name')"
                />
                <span v-if="errors.name" class="campo-erro">{{
                  errors.name
                }}</span>
              </div>

              <div class="campo">
                <label for="email">E-mail *</label>
                <input
                  id="email"
                  type="email"
                  v-model="form.email"
                  :class="{ erro: errors.email }"
                  placeholder="seu@email.com"
                  @blur="validateField('email')"
                />
                <span v-if="errors.email" class="campo-erro">{{
                  errors.email
                }}</span>
              </div>
            </div>

            <div class="campos-duplos">
              <div class="campo">
                <label for="phone">Telefone</label>
                <input
                  id="phone"
                  type="tel"
                  v-model="form.phone"
                  :class="{ erro: errors.phone }"
                  placeholder="(00) 00000-0000"
                  maxlength="15"
                  @input="formatarTelefone"
                  @blur="validateField('phone')"
                />
                <span v-if="errors.phone" class="campo-erro">{{
                  errors.phone
                }}</span>
              </div>

              <div class="campo">
                <label for="subject">O que você precisa? *</label>
                <select
                  id="subject"
                  v-model="form.subject"
                  :class="{ erro: errors.subject }"
                  @blur="validateField('subject')"
                >
                  <option value="" disabled>Selecione</option>
                  <option
                    v-for="assunto in assuntos"
                    :key="assunto.valor"
                    :value="assunto.valor"
                  >
                    {{ assunto.rotulo }}
                  </option>
                </select>
                <span v-if="errors.subject" class="campo-erro">{{
                  errors.subject
                }}</span>
              </div>
            </div>

            <div class="campo">
              <label for="message">Mensagem *</label>
              <textarea
                id="message"
                v-model="form.message"
                :class="{ erro: errors.message }"
                rows="6"
                placeholder="Descreva sua operação, o que trava hoje e onde você quer chegar..."
                @blur="validateField('message')"
              ></textarea>
              <span v-if="errors.message" class="campo-erro">{{
                errors.message
              }}</span>
            </div>

            <p v-if="submitError" class="aviso erro">
              <font-awesome-icon icon="triangle-exclamation" />
              {{ errorMessage }}
            </p>

            <p v-if="submitSuccess" class="aviso sucesso">
              <font-awesome-icon icon="circle-check" />
              Mensagem enviada! Entraremos em contato em breve.
            </p>

            <button type="submit" class="botao-enviar" :disabled="isSubmitting">
              <span v-if="isSubmitting">Enviando...</span>
              <span v-else>Enviar mensagem</span>
              <font-awesome-icon v-if="!isSubmitting" icon="paper-plane" />
            </button>
          </form>
        </div>

        <!-- Canais -->
        <aside class="canais">
          <h2>Outras formas de falar com a gente</h2>

          <a
            v-for="canal in canais"
            :key="canal.titulo"
            :href="canal.href"
            :target="canal.externo ? '_blank' : null"
            :rel="canal.externo ? 'noopener' : null"
            class="canal-card"
          >
            <span class="canal-icone">
              <font-awesome-icon :icon="canal.icone" />
            </span>
            <span class="canal-texto">
              <strong>{{ canal.titulo }}</strong>
              <span>{{ canal.valor }}</span>
              <span v-if="canal.extra" class="canal-extra">{{
                canal.extra
              }}</span>
            </span>
          </a>

          <div class="canal-nota">
            <font-awesome-icon icon="clock" />
            Segunda a sexta, das 8h às 18h
          </div>

          <div class="redes">
            <h3>Redes sociais</h3>
            <div class="redes-botoes">
              <a
                v-for="rede in redes"
                :key="rede.nome"
                :href="rede.href"
                :aria-label="rede.nome"
                class="rede-botao"
                :style="{ '--cor': rede.cor }"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path :d="rede.path" />
                </svg>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "ContactPage",

  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
      errors: {},
      isSubmitting: false,
      submitSuccess: false,
      submitError: false,
      errorMessage: "",

      // Mesmos caminhos oferecidos na home e na página de serviços
      assuntos: [
        { valor: "integrar-ia", rotulo: "IA no sistema que já uso" },
        { valor: "criar-sistema", rotulo: "Criar um sistema com IA" },
        { valor: "automacao", rotulo: "Automatizar processos" },
        { valor: "atendimento-ia", rotulo: "Atendimento com IA" },
        { valor: "site-loja", rotulo: "Site ou loja virtual" },
        { valor: "aplicativo", rotulo: "Aplicativo" },
        { valor: "outro", rotulo: "Outro assunto" },
      ],

      canais: [
        {
          icone: "envelope",
          titulo: "E-mail",
          valor: "contato@skilltechnologywork.com",
          href: "mailto:contato@skilltechnologywork.com",
        },
        {
          icone: "phone",
          titulo: "Telefone e WhatsApp",
          valor: "(63) 98280-9010",
          href: "tel:+5563982809010",
        },
        {
          icone: "location-dot",
          titulo: "Endereço",
          valor: "Setor Central",
          extra: "Goiânia - GO, CEP 74370-535",
          href: "https://maps.google.com/?q=Setor+Central+Goiania+GO",
          externo: true,
        },
      ],

      redes: [
        {
          nome: "Facebook",
          cor: "#1877f2",
          href: "#",
          path: "M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z",
        },
        {
          nome: "Instagram",
          cor: "#e1306c",
          href: "#",
          path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z",
        },
        {
          nome: "YouTube",
          cor: "#ff0000",
          href: "https://www.youtube.com/@elenavossia",
          path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
        },
        {
          nome: "LinkedIn",
          cor: "#0a66c2",
          href: "#",
          path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
        },
        {
          nome: "WhatsApp",
          cor: "#25d366",
          href: "https://wa.me/5563982809010",
          path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
        },
      ],
    };
  },

  methods: {
    // A máscara era feita por v-mask, uma diretiva que nunca foi
    // registrada no projeto — o campo ficava sem formatação nenhuma.
    formatarTelefone() {
      const numeros = this.form.phone.replace(/\D/g, "").slice(0, 11);

      if (numeros.length <= 2) {
        this.form.phone = numeros;
      } else if (numeros.length <= 6) {
        this.form.phone = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
      } else if (numeros.length <= 10) {
        this.form.phone = `(${numeros.slice(0, 2)}) ${numeros.slice(
          2,
          6
        )}-${numeros.slice(6)}`;
      } else {
        this.form.phone = `(${numeros.slice(0, 2)}) ${numeros.slice(
          2,
          7
        )}-${numeros.slice(7)}`;
      }
    },

    validateField(field) {
      this.errors[field] = "";

      if (field === "name" && !this.form.name.trim()) {
        this.errors.name = "Por favor, insira seu nome";
      } else if (field === "email") {
        if (!this.form.email.trim()) {
          this.errors.email = "Por favor, insira seu e-mail";
        } else if (!this.validateEmail(this.form.email)) {
          this.errors.email = "Por favor, insira um e-mail válido";
        }
      } else if (
        field === "phone" &&
        this.form.phone &&
        !this.validatePhone(this.form.phone)
      ) {
        this.errors.phone = "Por favor, insira um telefone válido";
      } else if (field === "subject" && !this.form.subject) {
        this.errors.subject = "Selecione o que você precisa";
      } else if (field === "message" && !this.form.message.trim()) {
        this.errors.message = "Por favor, insira sua mensagem";
      }
    },

    validateForm() {
      ["name", "email", "phone", "subject", "message"].forEach((campo) =>
        this.validateField(campo)
      );
      return !Object.values(this.errors).some((error) => error);
    },

    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },

    validatePhone(phone) {
      const cleaned = phone.replace(/\D/g, "");
      return cleaned.length === 10 || cleaned.length === 11;
    },

    async submitForm() {
      if (!this.validateForm()) return;

      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;
      this.errorMessage = "";

      try {
        const contactData = {
          nome: this.form.name,
          email: this.form.email,
          telefone: this.form.phone || null,
          mensagem: this.form.message,
          assunto: this.form.subject,
        };

        const apiUrl =
          import.meta.env.VITE_API_URL || "http://localhost:5006/api";
        const response = await fetch(`${apiUrl}/contatos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Erro ao enviar mensagem");
        }

        this.submitSuccess = true;
        this.resetForm();

        setTimeout(() => {
          this.submitSuccess = false;
        }, 6000);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        this.submitError = true;
        this.errorMessage =
          error.message ||
          "Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.";

        setTimeout(() => {
          this.submitError = false;
          this.errorMessage = "";
        }, 6000);
      } finally {
        this.isSubmitting = false;
      }
    },

    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      };
      this.errors = {};
    },
  },
};
</script>

<style scoped>
.contato-pagina {
  font-family: "Inter", sans-serif;
}

/* Abertura */
.contato-hero {
  padding: 5rem 5% 4.5rem;
  text-align: center;
  background-color: #f6f5f1;
  background-image: linear-gradient(rgba(26, 35, 90, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 35, 90, 0.05) 1px, transparent 1px);
  background-size: 120px 120px;
}

.hero-inner {
  max-width: 720px;
  margin: 0 auto;
}

.contato-hero h1 {
  margin: 0;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #131a4d;
}

.gradiente {
  background: linear-gradient(90deg, #0052ff, #7c6ef2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.contato-hero p {
  margin: 1.25rem auto 0;
  max-width: 560px;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #3d4570;
}

/* Corpo */
.contato-corpo {
  padding: 4rem 5% 5rem;
  background: #fff;
}

.corpo-inner {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  align-items: start;
  gap: 2.5rem;
  max-width: 1180px;
  margin: 0 auto;
}

/* Formulário */
.form-card {
  padding: 2.25rem;
  border: 1px solid #e6e5df;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(19, 26, 77, 0.07);
}

.form-card h2,
.canais h2 {
  margin: 0 0 1.75rem;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #131a4d;
}

.campos-duplos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.15rem;
}

.campo {
  display: grid;
  align-content: start;
  gap: 0.45rem;
  margin-bottom: 1.15rem;
}

.campo label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #4b5280;
}

.campo input,
.campo select,
.campo textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid #e2e1da;
  border-radius: 10px;
  background: #fbfbf9;
  font-family: inherit;
  font-size: 0.98rem;
  color: #131a4d;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.campo textarea {
  resize: vertical;
  line-height: 1.6;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  outline: none;
  border-color: #7c6ef2;
  background: #fff;
}

.campo input.erro,
.campo select.erro,
.campo textarea.erro {
  border-color: #dc2626;
  background: #fef2f2;
}

.campo-erro {
  font-size: 0.82rem;
  color: #dc2626;
}

.aviso {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 1.15rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 0.92rem;
}

.aviso.erro {
  background: #fef2f2;
  color: #dc2626;
}

.aviso.sucesso {
  background: #f0fdf4;
  color: #16a34a;
}

.botao-enviar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  padding: 0.95rem 1.5rem;
  border: none;
  border-radius: 10px;
  background: #0052ff;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(0, 82, 255, 0.25);
  transition: background 0.2s ease, transform 0.2s ease;
}

.botao-enviar:hover:not(:disabled) {
  background: #0040c9;
  transform: translateY(-1px);
}

.botao-enviar:disabled {
  background: #c3cbe6;
  cursor: not-allowed;
  box-shadow: none;
}

/* Canais */
.canal-card {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  margin-bottom: 0.85rem;
  padding: 1.15rem;
  border: 1px solid #e6e5df;
  border-radius: 14px;
  background: #fbfbf9;
  text-decoration: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease,
    transform 0.25s ease;
}

.canal-card:hover {
  border-color: #d5d3f5;
  box-shadow: 0 14px 32px rgba(19, 26, 77, 0.08);
  transform: translateY(-2px);
}

.canal-icone {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(0, 82, 255, 0.08);
  color: #0052ff;
  font-size: 1rem;
}

.canal-texto {
  display: grid;
  gap: 0.15rem;
  min-width: 0;
}

.canal-texto strong {
  font-size: 0.95rem;
  font-weight: 700;
  color: #131a4d;
}

.canal-texto span {
  font-size: 0.9rem;
  color: #6b7194;
  overflow-wrap: anywhere;
}

.canal-extra {
  font-size: 0.85rem !important;
  color: #9aa0b8 !important;
}

.canal-nota {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.85rem 1rem;
  border: 1px dashed #e2e1da;
  border-radius: 10px;
  font-size: 0.88rem;
  color: #6b7194;
}

.canal-nota svg {
  color: #7c6ef2;
}

/* Redes */
.redes {
  margin-top: 2rem;
}

.redes h3 {
  margin: 0 0 0.9rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa0b8;
}

.redes-botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.rede-botao {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid #e2e1da;
  border-radius: 12px;
  background: #fff;
  color: #9aa0b8;
  transition: all 0.25s ease;
}

.rede-botao svg {
  width: 19px;
  height: 19px;
}

.rede-botao:hover {
  border-color: var(--cor);
  background: var(--cor);
  color: #fff;
  transform: translateY(-2px);
}

/* Responsivo */
@media (max-width: 900px) {
  .corpo-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .contato-hero {
    padding: 3.5rem 1.25rem;
    background-size: 80px 80px;
  }

  .contato-hero h1 {
    font-size: 2.05rem;
  }

  .contato-hero p {
    font-size: 1rem;
  }

  .contato-corpo {
    padding: 2.5rem 1.25rem 3.5rem;
  }

  .form-card {
    padding: 1.5rem 1.25rem;
  }

  .form-card h2,
  .canais h2 {
    font-size: 1.3rem;
    margin-bottom: 1.35rem;
  }

  .campos-duplos {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>
