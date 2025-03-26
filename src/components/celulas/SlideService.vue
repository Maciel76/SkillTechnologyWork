<template>
    <main>
      <!-- SliderService-->
      <section class="hero-section">
        <div class="hero-content">
          <h1>Potencialize Seu Negócio com <span class="highlight">Soluções de IA</span> Sob Medida</h1>
          <p>Automatização, personalização e escalabilidade para sua empresa crescer mais rápido</p>
          <button class="cta-button">Conhecer Soluções</button>
        </div>
        <div class="hero-image">
          <img src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="AI Solutions" loading="lazy" />
        </div>
      </section>
    </main>
  </template>
    
  <script>
  export default {
    name: 'SlideService',
  };
  </script>
  
  <style scoped >
  /* Hero Section */
  .hero-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6rem 5%;
    gap: 4rem;
    background: #ffffff; /* Substituído --page-bg */
    min-height: 80vh; /* Altura mínima para ocupar a tela */
  }
  
  [data-theme="dark"] .hero-section {
    background: #1A1D1F; /* Substituído --page-bg */
  }
  
  .hero-content {
    flex: 1;
    max-width: 600px;
  }
  
  .hero-content h1 {
    font-size: 3.5rem;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    color: #1A1D1F; /* Substituído --text-primary */
  }
  
  [data-theme="dark"] .hero-content h1 {
    color: #ffffff; /* Substituído --text-primary */
  }
  
  .hero-content .highlight {
    color: #0052FF; /* Substituído --primary-color */
  }
  
  .hero-content p {
    font-size: 1.2rem;
    color: #666666; /* Substituído --text-secondary */
    margin-bottom: 2rem;
  }
  
  [data-theme="dark"] .hero-content p {
    color: #9CA3AF; /* Substituído --text-secondary */
  }
  
  .cta-button {
    padding: 1rem 2rem;
    background: #2c6add; /* Substituído --accent-color1 */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .cta-button:hover {
    background: #0052FF; /* Substituído --primary-color */
  }
  
  .hero-image {
    flex: 1;
    max-width: auto;
  }
  
  .hero-image img {
    width: 100%;
    height: auto;
    border-radius: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); /* Substituído --card-shadow */
  }
  
  [data-theme="dark"] .hero-image img {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3); /* Substituído --card-shadow */
  }
  
  /* Responsividade */
  @media (max-width: 1024px) {
    .hero-section {
      flex-direction: column;
      text-align: center;
      gap: 2rem;
      padding: 4rem 5%;
    }
  
    .hero-content {
      max-width: 100%;
    }
  
    .hero-content h1 {
      font-size: 2.5rem;
    }
  
    .hero-content p {
      font-size: 1rem;
    }
  
    .cta-button {
      width: 100%;
      max-width: 300px;
    }
  }
  
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2rem;
    }
  
    .hero-content p {
      font-size: 0.9rem;
    }
  
    .hero-image img {
      border-radius: 12px;
    }
  }
  </style>