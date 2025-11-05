<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1>Vamos conversar sobre seu projeto</h1>
        <p>
          Preencha o formulário ou entre em contato diretamente por um dos
          nossos canais
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <div class="contact-container">
      <!-- Contact Form -->
      <div class="contact-forrm">
        <h2>Envie sua mensagem</h2>

        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nome completo</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              @blur="validateField('name')"
              :class="{ error: errors.name }"
              placeholder="Digite seu nome"
            />
            <span class="error-message" v-if="errors.name">{{
              errors.name
            }}</span>
          </div>

          <div class="form-group">
            <label for="email">E-mail</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              @blur="validateField('email')"
              :class="{ error: errors.email }"
              placeholder="seu@email.com"
            />
            <span class="error-message" v-if="errors.email">{{
              errors.email
            }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Telefone (opcional)</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              @blur="validateField('phone')"
              :class="{ error: errors.phone }"
              placeholder="(00) 00000-0000"
              v-mask="'(##) #####-####'"
            />
            <span class="error-message" v-if="errors.phone">{{
              errors.phone
            }}</span>
          </div>

          <div class="form-group">
            <label for="subject">Assunto</label>
            <select
              id="subject"
              v-model="form.subject"
              @blur="validateField('subject')"
              :class="{ error: errors.subject }"
            >
              <option value="" disabled selected>Selecione um assunto</option>
              <option value="orcamento">Orçamento</option>
              <option value="duvida">Dúvida</option>
              <option value="parceria">Parceria</option>
              <option value="outro">Outro</option>
            </select>
            <span class="error-message" v-if="errors.subject">{{
              errors.subject
            }}</span>
          </div>

          <div class="form-group">
            <label for="message">Mensagem</label>
            <textarea
              id="message"
              v-model="form.message"
              @blur="validateField('message')"
              :class="{ error: errors.message }"
              rows="5"
              placeholder="Descreva seu projeto ou dúvida..."
            ></textarea>
            <span class="error-message" v-if="errors.message">{{
              errors.message
            }}</span>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Enviar Mensagem</span>
            <span v-else>Enviando...</span>
          </button>

          <!-- Animação de Sucesso -->
          <div class="success-animation-container" v-if="showSuccessAnimation">
            <div class="success-animation">
              <div class="success-animation__circle"></div>
              <div class="success-animation__checkmark"></div>
            </div>
            <div class="success-animation__message">
              Mensagem enviada com sucesso! Entraremos em contato em breve.
            </div>
          </div>

          <div class="error-message" v-if="submitError">
            {{
              errorMessage ||
              "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde."
            }}
          </div>
        </form>
      </div>

      <!-- Contact Info -->
      <div class="contact-info">
        <h2>Outras formas de contato</h2>

        <div class="info-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"
              />
              <path
                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"
              />
            </svg>
          </div>
          <div class="content">
            <h3>E-mail</h3>
            <p>Contato@skilltchnologywork.com</p>
            <a href="mailto:stwprogect@gmail.com">Enviar e-mail</a>
          </div>
        </div>

        <div class="info-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="content">
            <h3>Telefone</h3>
            <p>(63) 98280-9010</p>
            <a href="tel:+5511987654321">Ligar agora</a>
          </div>
        </div>

        <div class="info-card">
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="content">
            <h3>Endereço</h3>
            <p>Setor central</p>
            <p>Goiania-Go; CEP 74370-535</p>
            <a href="https://maps.google.com" target="_blank">Ver no mapa</a>
          </div>
        </div>

        <div class="social-links">
          <h3>Redes sociais</h3>
          <div class="links">
            <a href="#" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                />
              </svg>
            </a>
            <a href="#" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"
                />
              </svg>
            </a>
            <a href="#" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a href="#" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      showSuccessAnimation: false,
    };
  },
  methods: {
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
        this.errors.subject = "Por favor, selecione um assunto";
      } else if (field === "message" && !this.form.message.trim()) {
        this.errors.message = "Por favor, insira sua mensagem";
      }
    },
    validateForm() {
      this.validateField("name");
      this.validateField("email");
      this.validateField("phone");
      this.validateField("subject");
      this.validateField("message");

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
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;
      this.errorMessage = "";
      this.showSuccessAnimation = false;

      try {
        // Preparar dados para enviar ao backend
        const contactData = {
          nome: this.form.name,
          email: this.form.email,
          telefone: this.form.phone || null,
          mensagem: this.form.message,
          assunto: this.form.subject,
        };

        // Enviar para o backend
        const response = await fetch("http://localhost:3000/api/contatos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Erro ao enviar mensagem");
        }

        // Sucesso
        console.log("Contato enviado com sucesso:", result);
        this.submitSuccess = true;
        this.showSuccessAnimation = true;
        this.resetForm();

        // Esconder animação de sucesso após 5 segundos
        setTimeout(() => {
          this.showSuccessAnimation = false;
        }, 5000);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        this.submitError = true;
        this.errorMessage =
          error.message ||
          "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.";

        // Esconder mensagem de erro após 5 segundos
        setTimeout(() => {
          this.submitError = false;
          this.errorMessage = "";
        }, 5000);
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
.contact-page {
  font-family: "Inter", sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Hero Section */
.contact-hero {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  padding: 80px 20px;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Container */
.contact-container {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}

/* Contact Form */
.contact-forrm {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  position: relative;
}

.contact-forrm h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1e293b;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1e293b;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #ef4444;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 5px;
  display: block;
}

.submit-btn {
  background: linear-gradient(135deg, #3b82f6, #6366f1);
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 10px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Animação de Sucesso */
.success-animation-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  z-index: 10;
  animation: fadeIn 0.5s ease;
}

.success-animation {
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 20px;
}

.success-animation__circle {
  width: 80px;
  height: 80px;
  background-color: #10b981;
  border-radius: 50%;
  animation: scaleIn 0.5s ease;
}

.success-animation__checkmark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 20px;
  border-left: 4px solid white;
  border-bottom: 4px solid white;
  transform-origin: center;
  transform: translate(-50%, -60%) rotate(-45deg) scale(0);
  animation: checkmark 0.5s ease 0.5s forwards;
}

.success-animation__message {
  font-size: 1.2rem;
  font-weight: 600;
  color: #10b981;
  text-align: center;
  max-width: 80%;
  animation: fadeIn 0.5s ease 0.8s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes checkmark {
  0% {
    transform: translate(-50%, -60%) rotate(-45deg) scale(0);
  }
  70% {
    transform: translate(-50%, -60%) rotate(-45deg) scale(1.1);
  }
  100% {
    transform: translate(-50%, -60%) rotate(-45deg) scale(1);
  }
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 12px;
  border-radius: 6px;
  margin-top: 20px;
  text-align: center;
}

/* Contact Info */
.contact-info h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1e293b;
}

.info-card {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: flex-start;
}

.info-card .icon {
  width: 50px;
  height: 50px;
  background: #eff6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #3b82f6;
}

.info-card .icon svg {
  width: 24px;
  height: 24px;
}

.info-card .content h3 {
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #1e293b;
}

.info-card .content p {
  color: #64748b;
  margin-bottom: 8px;
}

.info-card .content a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.info-card .content a:hover {
  text-decoration: underline;
}

/* Social Links */
.social-links h3 {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #1e293b;
}

.social-links .links {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background: #eff6ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #3b82f6;
  color: white;
  transform: translateY(-3px);
}

.social-icon svg {
  width: 20px;
  height: 20px;
}
</style>
