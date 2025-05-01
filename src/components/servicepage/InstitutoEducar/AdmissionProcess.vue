<template>
  <section class="section" id="admission">
    <div class="container">
      <h2 class="section-title">Processo de Matrícula</h2>
      <div class="admission-content">
        <div class="admission-steps">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
        <div class="admission-form">
          <h3>Solicite informações</h3>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <input type="text" placeholder="Nome completo" required />
            </div>
            <div class="form-group">
              <input type="email" placeholder="E-mail" required />
            </div>
            <div class="form-group">
              <input type="tel" placeholder="Telefone" required />
            </div>
            <div class="form-group">
              <select required>
                <option value="" disabled selected>Interesse</option>
                <option>Educação Infantil</option>
                <option>Ensino Fundamental</option>
                <option>Ensino Médio</option>
                <option>Atividades Extracurriculares</option>
              </select>
            </div>
            <button type="submit" class="btn btn-accent">
              Enviar solicitação
            </button>
          </form>
        </div>
      </div>
      <div class="cta">
        <p>Pronto para fazer parte do Instituto Educar?</p>
        <a href="#" class="btn">Matrícula Online</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdmissionProcess",
  data() {
    return {
      steps: [
        {
          title: "Visita à Escola",
          description:
            "Agende uma visita para conhecer nossa estrutura e proposta pedagógica.",
        },
        {
          title: "Documentação",
          description:
            "Envie os documentos necessários para análise da nossa equipe.",
        },
        {
          title: "Entrevista",
          description:
            "Conversa com a coordenação pedagógica para alinhar expectativas.",
        },
        {
          title: "Matrícula",
          description:
            "Finalização do processo com pagamento da taxa de matrícula.",
        },
      ],
    };
  },
  methods: {
    submitForm() {
      alert("Solicitação enviada com sucesso! Entraremos em contato em breve.");
    },
  },
};
</script>

<style scoped>
.admission-content {
  display: flex;
  gap: 50px;
  margin-bottom: 50px;
}

.admission-steps {
  flex: 1;
}

.step {
  display: flex;
  margin-bottom: 30px;
}

.step-number {
  width: 50px;
  height: 50px;
  background: var(--secondary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 20px;
  flex-shrink: 0;
}

.step-content h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.step-content p {
  color: #666;
}

.admission-form {
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.admission-form h3 {
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: "Poppins", sans-serif;
}

.cta {
  text-align: center;
  padding: 30px;
  background: var(--light-color);
  border-radius: 10px;
}

.cta p {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

@media (max-width: 992px) {
  .admission-content {
    flex-direction: column;
  }
}
</style>
