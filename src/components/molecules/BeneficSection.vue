<template>
    <div class="benefits-section">
      <h2>Por que escolher {{ title }}?</h2>
      <div class="benefits-grid">
        <div class="benefit">
          <img src="https://api.iconify.design/heroicons:bolt.svg" alt="Rapidez" />
          <h3>Rápido e Eficiente</h3>
          <p>Automatize tarefas e aumente a produtividade da sua equipe.</p>
        </div>
        <div class="benefit">
          <img src="https://api.iconify.design/heroicons:shield-check.svg" alt="Segurança" />
          <h3>Segurança Garantida</h3>
          <p>Proteja seus dados com criptografia de ponta a ponta.</p>
        </div>
        <div class="benefit">
          <img src="https://api.iconify.design/ix:support.svg" alt="Suporte" />
          <h3>Suporte 24/7</h3>
          <p>Nossa equipe está sempre disponível para ajudar.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BenefitsSection',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .benefits-section {
    margin-top: 4rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .benefits-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }
  
  .benefits-grid {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .benefit {
    text-align: center;
    max-width: 300px;
  }
  
  .benefit img {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
  }
  
  .benefit h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #333;
  }
  
  .benefit p {
    font-size: 1rem;
    color: #555;
  }
  
  @media (max-width: 768px) {
    .benefits-grid {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>