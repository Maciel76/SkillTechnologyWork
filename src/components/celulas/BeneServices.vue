<template>
    <main>
      <!-- Conteúdo da página -->
      <section class="benefits-section">
        <h2>Por que escolher nossa IA?</h2>
        <div class="benefits-grid">
            <div class="benefit-card">
                <img src="https://api.iconify.design/heroicons:currency-dollar.svg" alt="Cost">
                <h3>Redução de Custos</h3>
                <p>Automatização de processos reduzindo a necessidade de tarefas manuais.</p>
            </div>
            <div class="benefit-card">
                <img src="https://api.iconify.design/heroicons:arrow-trending-up.svg" alt="Productivity">
                <h3>Aumento de Produtividade</h3>
                <p>Ferramentas que otimizam fluxos de trabalho e aceleram a entrega.</p>
            </div>
            <div class="benefit-card">
                <img src="https://api.iconify.design/heroicons:user-group.svg" alt="Experience">
                <h3>Melhor Experiência</h3>
                <p>Personalização em massa para atender cada cliente de forma única.</p>
            </div>
            <div class="benefit-card">
                <img src="https://api.iconify.design/heroicons:arrow-path.svg" alt="Scalability">
                <h3>Escalabilidade</h3>
                <p>Soluções que acompanham o crescimento do negócio sem perder desempenho.</p>
            </div>
        </div>
    </section>
    </main>  
</template>

<script>  
export default {
  name: 'BeneficioPage',
};
</script>

<style scoped >
/* Estilos globais ou específicos da página */

/* Benefits Section */
.benefits-section {
    padding: 5rem 5%; /* Substituído --section-padding */
    background: #E5E7EB; /* Substituído --secondary-color */
}

.benefits-section h2 {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 3rem;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.benefit-card {
    text-align: center;
    padding: 2rem;
}

.benefit-card img {
    width: 48px;
    height: 48px;
    margin-bottom: 1.5rem;
    color: #0052FF; /* Substituído --primary-color */
}

/* Responsive Design */
@media (max-width: 1024px) {
    .hero-sectionn {
        flex-direction: column;
        text-align: center;
    }

    .services-grid,
    .benefits-grid,
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .testimonials-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .hero-contentn h1 {
        font-size: 2.5rem;
    }

    .services-grid,
    .benefits-grid,
    .features-grid {
        grid-template-columns: 1fr;
    }

    .contact-form {
        padding: 0 1rem;
    }
}
</style>