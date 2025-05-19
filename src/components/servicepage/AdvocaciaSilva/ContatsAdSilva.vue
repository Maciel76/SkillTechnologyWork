<template>
  <section id="contato" class="contact-section">
    <div class="container">
      <div class="contact-info">
        <h2 class="section-title">Entre em Contato</h2>
        <p>Preencha o formulário ou utilize nossos canais diretos</p>

        <div class="contact-methods">
          <div class="contact-item">
            <img src="https://api.iconify.design/mdi:email.svg" alt="Email" />
            <span>contato@silvaassociados.com.br</span>
          </div>
          <div class="contact-item">
            <img
              src="https://api.iconify.design/mdi:phone.svg"
              alt="Telefone"
            />
            <span>(11) 1234-5678</span>
          </div>
          <div class="contact-item">
            <img
              src="https://api.iconify.design/mdi:map-marker.svg"
              alt="Endereço"
            />
            <span>Av. Paulista, 1000 - São Paulo/SP</span>
          </div>
        </div>
      </div>

      <form class="contact-form" @submit.prevent="submitForm">
        <div class="form-group">
          <input
            type="text"
            v-model="form.name"
            placeholder="Seu Nome"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            v-model="form.email"
            placeholder="Seu Email"
            required
          />
        </div>
        <div class="form-group">
          <input type="tel" v-model="form.phone" placeholder="Seu Telefone" />
        </div>
        <div class="form-group">
          <select v-model="form.subject" required>
            <option value="" disabled selected>Assunto</option>
            <option value="consulta">Consulta</option>
            <option value="duvida">Dúvida</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        <div class="form-group">
          <textarea
            v-model="form.message"
            placeholder="Sua Mensagem"
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-btn">Enviar Mensagem</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactForm",
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    submitForm() {
      // Simulação de envio
      console.log("Formulário enviado:", this.form);
      alert("Mensagem enviada com sucesso!");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped>
.contact-section {
  background: var(--primary);
  color: white;
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.section-title {
  color: white;
  font-size: 2.2rem;
  margin-bottom: 20px;
  position: relative;
}

.section-title:after {
  content: "";
  display: block;
  width: 80px;
  height: 3px;
  background: var(--secondary);
  margin: 15px 0;
}

.contact-methods {
  margin-top: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.contact-item img {
  width: 24px;
  height: 24px;
  margin-right: 15px;
  opacity: 0.9;
}

.contact-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.form-group textarea {
  min-height: 120px;
  resize: vertical;
}

.submit-btn {
  background: var(--secondary);
  color: var(--dark);
  border: none;
  padding: 12px 30px;
  border-radius: 4px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
}

.submit-btn:hover {
  background: #c9a227;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }

  .contact-info {
    margin-bottom: 40px;
  }
}
</style>
